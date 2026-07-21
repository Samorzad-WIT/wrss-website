import express from 'express'
import cors from 'cors'
import { ensureSchema } from './db.js'
import publicRoutes from './routes-public.js'
import adminRoutes from './routes-admin.js'

const PORT = process.env.PORT || 3000
const ORIGIN = process.env.CORS_ORIGIN || '*'

await ensureSchema()

const app = express()
app.use(cors({ origin: ORIGIN }))
app.use(express.json())

app.use(publicRoutes)
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => console.log(`wrss-api listening on :${PORT}`))
