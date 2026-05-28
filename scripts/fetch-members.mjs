import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../src/data/members-auto.ts');
const BASE = 'https://samorzad.pwr.edu.pl';
const URL = `${BASE}/w4/czlonkowie`;

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(get(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

let html;
try {
  html = await get(URL);
} catch (err) {
  console.warn('⚠  fetch-members: nie można pobrać strony PWr – zostawiam obecne dane.', err.message);
  process.exit(0);
}

const members = [];
const blockRegex = /<div class="person-box">([\s\S]*?)<div class="person-hover-info">/g;
let m;

while ((m = blockRegex.exec(html)) !== null) {
  const block = m[1];
  const imgMatch = block.match(/src="([^"]*\.webp)"/);
  const firstName = block.match(/<span class="name">([^<]+)<\/span>/)?.[1]?.trim();
  const lastName = block.match(/<span class="name second">([^<]+)<\/span>/)?.[1]?.trim();
  const roleRaw = block.match(/<div class="desc">([^<\n]+)/)?.[1]?.trim();

  if (!firstName || !lastName) continue;

  const name = `${firstName} ${lastName}`;
  const role = roleRaw ?? 'Członek WRSS';
  const imageUrl = imgMatch ? BASE + imgMatch[1] : null;

  members.push({ name, role, imageUrl });
}

if (members.length === 0) {
  console.warn('⚠  fetch-members: nie znaleziono członków w HTML – zostawiam obecne dane.');
  process.exit(0);
}

const ts = `// Automatycznie generowane przez scripts/fetch-members.mjs – nie edytuj ręcznie
export interface ScrapedMember {
  name: string;
  role: string;
  imageUrl: string | null;
}

export const membersAuto: ScrapedMember[] = ${JSON.stringify(members, null, 2)};
`;

fs.writeFileSync(OUT, ts, 'utf-8');
console.log(`✓ fetch-members: pobrano ${members.length} członków → src/data/members-auto.ts`);
