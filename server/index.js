import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg
const PORT = process.env.PORT || 3000
const ORIGIN = process.env.CORS_ORIGIN || '*'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

await pool.query(`
  CREATE TABLE IF NOT EXISTS visit_counter (
    id SMALLINT PRIMARY KEY DEFAULT 1,
    count BIGINT NOT NULL DEFAULT 0,
    CONSTRAINT single_row CHECK (id = 1)
  );
  INSERT INTO visit_counter (id, count) VALUES (1, 0)
  ON CONFLICT (id) DO NOTHING;
`)

const app = express()
app.use(cors({ origin: ORIGIN }))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.get('/api/visits', async (_req, res) => {
  const { rows } = await pool.query('SELECT count FROM visit_counter WHERE id = 1')
  res.json({ count: Number(rows[0].count) })
})

app.post('/api/visits', async (_req, res) => {
  const { rows } = await pool.query(
    'UPDATE visit_counter SET count = count + 1 WHERE id = 1 RETURNING count',
  )
  res.json({ count: Number(rows[0].count) })
})

app.listen(PORT, () => console.log(`wrss-api listening on :${PORT}`))
