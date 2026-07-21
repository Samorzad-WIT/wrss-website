import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS visit_counter (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      count BIGINT NOT NULL DEFAULT 0,
      CONSTRAINT single_row CHECK (id = 1)
    );
    INSERT INTO visit_counter (id, count) VALUES (1, 0)
    ON CONFLICT (id) DO NOTHING;

    CREATE TABLE IF NOT EXISTS sections (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      size TEXT NOT NULL DEFAULT 'small' CHECK (size IN ('large', 'small')),
      source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('auto', 'manual')),
      sort_order INT NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      section_id INT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      photo_object_position TEXT,
      sort_order INT NOT NULL DEFAULT 0
    );

    INSERT INTO sections (slug, title, size, source, sort_order)
    VALUES ('obecny-zarzad', 'Obecny Zarząd', 'large', 'auto', 0)
    ON CONFLICT (slug) DO NOTHING;
  `)
}
