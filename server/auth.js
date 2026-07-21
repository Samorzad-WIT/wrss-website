import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

export async function login(username, password) {
  if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    throw new Error('Admin auth not configured on server')
  }
  if (username !== ADMIN_USERNAME) return null

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  if (!valid) return null

  return jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '12h' })
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })

  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
