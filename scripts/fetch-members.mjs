import https from 'node:https'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_FILE = path.join(__dirname, '../src/data/members.ts')

const BASE = 'https://samorzad.pwr.edu.pl'
const URL = `${BASE}/wydzial-informatyki-i-telekomunikacji/czlonkowie`

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(get(res.headers.location))
          return
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} fetching ${url}`))
          return
        }
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

function parseMembers(html) {
  const members = []
  // Split by person-box
  const chunks = html.split(/<div[^>]*class="[^"]*person-box[^"]*"[^>]*>/i)

  let idCounter = 1

  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i]

    const firstNameMatch = chunk.match(/<span[^>]*class="name(?!\s+second)"[^>]*>([^<]+)<\/span>/i)
    const lastNameMatch = chunk.match(/<span[^>]*class="name\s+second"[^>]*>([^<]+)<\/span>/i)
    const descMatch = chunk.match(/<div[^>]*class="desc"[^>]*>([\s\S]*?)<\/div>/i)
    const imgMatch = chunk.match(/<img[^>]*src="([^"]+)"/i)

    const firstName = firstNameMatch ? firstNameMatch[1].trim() : ''
    const lastName = lastNameMatch ? lastNameMatch[1].trim() : ''

    if (!firstName && !lastName) continue

    let role = 'Członek WRSS'
    if (descMatch) {
      const cleanDesc = descMatch[1].replace(/<[^>]+>/g, '').trim()
      role = cleanDesc.split('\n')[0].trim() || 'Członek WRSS'
    }

    let imageUrl = ''
    if (imgMatch && imgMatch[1]) {
      const src = imgMatch[1]
      imageUrl = src.startsWith('http') ? src : BASE + src
    }

    members.push({
      id: idCounter,
      section_id: 1,
      name: `${firstName} ${lastName}`.trim(),
      role,
      image_url: imageUrl,
      photo_object_position: 'center 20%',
      sort_order: idCounter,
    })

    idCounter++
  }

  return members
}

console.log('fetch-members: pobieram skład zarządu z samorzad.pwr.edu.pl...')

try {
  const html = await get(URL)
  const members = parseMembers(html)

  if (members.length === 0) {
    console.warn('fetch-members: nie znaleziono osób na stronie PWr. Plik nie został zmieniony.')
    process.exit(0)
  }

  // Filtrujemy tylko osoby pełniące funkcje w Zarządzie (Przewodniczący, Wice, Koordynatorzy, Sekretarz)
  const boardMembers = members.filter(
    (m) =>
      m.role.toLowerCase().includes('przewodnicz') ||
      m.role.toLowerCase().includes('koordynator') ||
  )

  const sections = [
    {
      id: 1,
      slug: 'zarzad-obecny',
      title: 'Obecny Zarząd',
      size: 'large',
      source: 'auto',
      sort_order: 1,
      members: boardMembers.length > 0 ? boardMembers : members,
    },
  ]

  const outputContent = `// Automatycznie generowane przez scripts/fetch-members.mjs – nie edytuj ręcznie
import type { Section } from '../types'

export const defaultMembers: Section[] = ${JSON.stringify(sections, null, 2)}
`

  fs.writeFileSync(OUT_FILE, outputContent, 'utf-8')
  console.log(`✓ fetch-members: pomyślnie zaktualizowano ${sections[0].members.length} członków Zarządu w src/data/members.ts`)
} catch (err) {
  console.warn(`⚠ fetch-members: nie udało się pobrać danych (${err.message}). Zachowano poprzedni stan.`)
}

