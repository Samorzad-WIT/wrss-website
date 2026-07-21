import express from 'express'
import { pool } from './db.js'

const router = express.Router()

router.get('/health', (_req, res) => res.json({ ok: true }))

router.get('/api/visits', async (_req, res) => {
  const { rows } = await pool.query('SELECT count FROM visit_counter WHERE id = 1')
  res.json({ count: Number(rows[0].count) })
})

router.post('/api/visits', async (_req, res) => {
  const { rows } = await pool.query(
    'UPDATE visit_counter SET count = count + 1 WHERE id = 1 RETURNING count',
  )
  res.json({ count: Number(rows[0].count) })
})

router.get('/api/members', async (_req, res) => {
  const { rows: sections } = await pool.query(
    'SELECT * FROM sections ORDER BY sort_order, id',
  )
  const { rows: members } = await pool.query(
    'SELECT * FROM members ORDER BY section_id, sort_order, id',
  )

  const bySection = new Map(sections.map((s) => [s.id, { ...s, members: [] }]))
  for (const m of members) {
    bySection.get(m.section_id)?.members.push(m)
  }

  res.json([...bySection.values()])
})

export default router
