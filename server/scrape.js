import https from 'node:https'

const BASE = 'https://samorzad.pwr.edu.pl'
const URL = `${BASE}/wydzial-informatyki-i-telekomunikacji/czlonkowie`

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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

export async function scrapeCurrentBoard() {
  const html = await get(URL)

  const members = []
  const blockRegex = /<div class="person-box">([\s\S]*?)<div class="person-hover-info">/g
  let m

  while ((m = blockRegex.exec(html)) !== null) {
    const block = m[1]
    const imgMatch = block.match(/src="([^"]*\.webp)"/)
    const firstName = block.match(/<span class="name">([^<]+)<\/span>/)?.[1]?.trim()
    const lastName = block.match(/<span class="name second">([^<]+)<\/span>/)?.[1]?.trim()
    const roleRaw = block.match(/<div class="desc">([^<\n]+)/)?.[1]?.trim()

    if (!firstName || !lastName) continue

    members.push({
      name: `${firstName} ${lastName}`,
      role: roleRaw ?? 'Członek WRSS',
      imageUrl: imgMatch ? BASE + imgMatch[1] : '',
    })
  }

  return members
}
