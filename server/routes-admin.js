import express from 'express'
import rateLimit from 'express-rate-limit'
import { pool } from './db.js'
import { login, requireAdmin } from './auth.js'
import { scrapeCurrentBoard } from './scrape.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const { username, password } = req.body ?? {}
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' })

  try {
    const token = await login(username, password)
    if (!token) return res.status(401).json({ error: 'Invalid credentials' })
    res.json({ token })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.use(requireAdmin)

// --- Sections ---

router.get('/sections', asyncHandler(async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM sections ORDER BY sort_order, id')
  res.json(rows)
})

router.post('/sections', asyncHandler(async (req, res) => {
  const { slug, title, size = 'small', source = 'manual' } = req.body ?? {}
  if (!slug || !title) return res.status(400).json({ error: 'slug and title required' })

  const { rows } = await pool.query(
    `INSERT INTO sections (slug, title, size, source, sort_order)
     VALUES ($1, $2, $3, $4, COALESCE((SELECT MAX(sort_order) + 1 FROM sections), 0))
     RETURNING *`,
    [slug, title, size, source],
  )
  res.status(201).json(rows[0])
})

router.patch('/sections/:id', asyncHandler(async (req, res) => {
  const { title, size } = req.body ?? {}
  const { rows } = await pool.query(
    `UPDATE sections SET title = COALESCE($1, title), size = COALESCE($2, size)
     WHERE id = $3 RETURNING *`,
    [title ?? null, size ?? null, req.params.id],
  )
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(rows[0])
})

router.delete('/sections/:id', asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM sections WHERE id = $1', [req.params.id])
  res.status(204).end()
})

router.post('/sections/reorder', asyncHandler(async (req, res) => {
  const { ids } = req.body ?? {}
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids array required' })

  await Promise.all(
    ids.map((id, index) => pool.query('UPDATE sections SET sort_order = $1 WHERE id = $2', [index, id])),
  )
  res.status(204).end()
})

// --- Members ---

router.get('/members', asyncHandler(async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM members ORDER BY section_id, sort_order, id')
  res.json(rows)
})

router.post('/members', asyncHandler(async (req, res) => {
  const { section_id, name, role = '', image_url = '', photo_object_position = null } =
    req.body ?? {}
  if (!section_id || !name) return res.status(400).json({ error: 'section_id and name required' })

  const { rows } = await pool.query(
    `INSERT INTO members (section_id, name, role, image_url, photo_object_position, sort_order)
     VALUES ($1, $2, $3, $4, $5, COALESCE((SELECT MAX(sort_order) + 1 FROM members WHERE section_id = $1), 0))
     RETURNING *`,
    [section_id, name, role, image_url, photo_object_position],
  )
  res.status(201).json(rows[0])
})

router.patch('/members/:id', asyncHandler(async (req, res) => {
  const { name, role, image_url, photo_object_position, section_id } = req.body ?? {}
  const { rows } = await pool.query(
    `UPDATE members SET
       name = COALESCE($1, name),
       role = COALESCE($2, role),
       image_url = COALESCE($3, image_url),
       photo_object_position = COALESCE($4, photo_object_position),
       section_id = COALESCE($5, section_id)
     WHERE id = $6 RETURNING *`,
    [
      name ?? null,
      role ?? null,
      image_url ?? null,
      photo_object_position ?? null,
      section_id ?? null,
      req.params.id,
    ],
  )
  if (!rows[0]) return res.status(404).json({ error: 'Not found' })
  res.json(rows[0])
})

router.delete('/members/:id', asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM members WHERE id = $1', [req.params.id])
  res.status(204).end()
})

router.post('/members/reorder', asyncHandler(async (req, res) => {
  const { section_id, ids } = req.body ?? {}
  if (!section_id || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'section_id and ids array required' })
  }

  await Promise.all(
    ids.map((id, index) =>
      pool.query('UPDATE members SET sort_order = $1 WHERE id = $2 AND section_id = $3', [
        index,
        id,
        section_id,
      ]),
    ),
  )
  res.status(204).end()
})

// --- Sync current board from PWr site ---

router.post('/sync-members', asyncHandler(async (_req, res) => {
  const { rows: sectionRows } = await pool.query(
    "SELECT id FROM sections WHERE source = 'auto' ORDER BY id LIMIT 1",
  )
  const sectionId = sectionRows[0]?.id
  if (!sectionId) return res.status(400).json({ error: 'No auto section configured' })

  let scraped
  try {
    scraped = await scrapeCurrentBoard()
  } catch (e) {
    return res.status(502).json({ error: `Scrape failed: ${e.message}` })
  }

  scraped = scraped.filter((m) => m.role !== 'Członek WRSS')
  if (scraped.length === 0) {
    return res.status(502).json({ error: 'No members found on PWr page' })
  }

  const { rows: existing } = await pool.query(
    'SELECT id, name FROM members WHERE section_id = $1',
    [sectionId],
  )
  const existingByName = new Map(existing.map((m) => [m.name, m.id]))

  let created = 0
  let updated = 0

  for (const [i, member] of scraped.entries()) {
    const existingId = existingByName.get(member.name)
    if (existingId) {
      await pool.query(
        'UPDATE members SET role = $1, image_url = $2, sort_order = $3 WHERE id = $4',
        [member.role, member.imageUrl, i, existingId],
      )
      updated++
    } else {
      await pool.query(
        `INSERT INTO members (section_id, name, role, image_url, sort_order)
         VALUES ($1, $2, $3, $4, $5)`,
        [sectionId, member.name, member.role, member.imageUrl, i],
      )
      created++
    }
  }

  res.json({ created, updated, total: scraped.length })
})

export default router
