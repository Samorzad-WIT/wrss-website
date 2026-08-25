import https from 'node:https'
import * as cheerio from 'cheerio'

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
  const $ = cheerio.load(html)

  const members = []

  $('.person-box').each((_, el) => {
    const $el = $(el)
    const firstName = $el.find('span.name').not('.second').first().text().trim()
    const lastName = $el.find('span.name.second').first().text().trim()

    let roleRaw = $el.find('div.desc').first().text().trim()
    if (roleRaw) {
      roleRaw = roleRaw.split('\n')[0].trim()
    }

    const imgSrc = $el.find('img').attr('src')

    if (!firstName || !lastName) return

    members.push({
      name: `${firstName} ${lastName}`,
      role: roleRaw || 'Członek WRSS',
      // dla 'pustej osoby przypisujemy Członek WRSS '
      imageUrl: imgSrc && imgSrc.includes('.webp') ? BASE + imgSrc : '',
    })
  })

  return members
}
