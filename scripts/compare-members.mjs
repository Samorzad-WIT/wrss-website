import https from 'node:https'
import fs from 'node:fs'

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

function parseMembersFromWebsite(html) {
  const members = []
  // Split by person-box
  const chunks = html.split(/<div[^>]*class="[^"]*person-box[^"]*"[^>]*>/i)

  let idCounter = 1

  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i]

    const firstNameMatch = chunk.match(/<span[^>]*class="name(?!\s+second)"[^>]*>([^<]+)<\/span>/i)
    const lastNameMatch = chunk.match(/<span[^>]*class="name\s+second"[^>]*>([^<]+)<\/span>/i)

    const firstName = firstNameMatch ? firstNameMatch[1].trim() : ''
    const lastName = lastNameMatch ? lastNameMatch[1].trim() : ''

    if (!firstName && !lastName) continue

    members.push(`${firstName} ${lastName}`.trim())

    idCounter++
  }

  return members
}

function getMembersFromFile(file) {
  if (fs.existsSync(file)){
    const members = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean)

    return members
  } else {
    return null
  }
}

console.log('compare-members: pobieram skład zarządu z samorzad.pwr.edu.pl...')

try {
  const html = await get(URL)
  const membersFromWebsite = parseMembersFromWebsite(html)

  const file = process.argv[2]
  const membersFromFile = getMembersFromFile(file)

  if (membersFromFile === null) {
    console.warn('compare-members: nie znaleziono pliku .txt')
    process.exit(0)
  } else if (membersFromFile.length === 0) {
    console.warn('compare-members: plik .txt jest pusty')
    process.exit(0)
  }

  if (membersFromWebsite.length === 0) {
    console.warn('compare-members: nie znaleziono osób na stronie PWr.')
    process.exit(0)
  }

  const onlyOnWebsite = membersFromWebsite.filter(name => !membersFromFile.includes(name))
  const onlyInFile = membersFromFile.filter(name => !membersFromWebsite.includes(name))

  console.log("\ncompare-members: Osoby do dodania na stronę (są w pliku, nie ma na stronie):")
  for (let name of onlyInFile) {
    console.log("compare-members: " + name + " (Dodaj)")
  }

  console.log("\ncompare-members: Osoby do usunięcia ze strony (są na stronie, nie ma w pliku):")
  for (let name of onlyOnWebsite) {
    console.log("compare-members: " + name + " (Usuń)")
  }
} catch (err) {
  console.warn(`⚠ compare-members: nie udało się pobrać danych (${err.message}).`)
}