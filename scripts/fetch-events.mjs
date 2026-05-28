import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EVENTS_FILE = path.join(__dirname, '../src/data/events.ts');
const OUT = path.join(__dirname, '../src/data/events-banners.ts');
const IMAGES_DIR = path.join(__dirname, '../public/images/events');

const FB_HEADERS = {
  'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

function getHtml(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: FB_HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(getHtml(res.headers.location, redirects + 1));
        return;
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    });
    req.setTimeout(12000, () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

function downloadImage(url, destPath, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 8) return reject(new Error('too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: FB_HEADERS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(downloadImage(res.headers.location, destPath, redirects + 1));
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', (e) => { fs.unlink(destPath, () => {}); reject(e); });
    });
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

function extractOgImage(html) {
  const m =
    html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) ??
    html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
  return m ? m[1].replace(/&amp;/g, '&') : null;
}

function extractEventId(url) {
  const m = url.match(/facebook\.com\/events\/(\d+)/);
  return m ? m[1] : null;
}

fs.mkdirSync(IMAGES_DIR, { recursive: true });

const eventsTs = fs.readFileSync(EVENTS_FILE, 'utf-8');
const pairs = [];
const blockRegex = /id:\s*(\d+)[\s\S]*?facebookUrl:\s*"([^"]+)"/g;
let m;
while ((m = blockRegex.exec(eventsTs)) !== null) {
  const id = parseInt(m[1]);
  const eventId = extractEventId(m[2]);
  if (eventId) pairs.push({ id, url: `https://www.facebook.com/events/${eventId}` });
}

if (pairs.length === 0) {
  console.log('fetch-events: brak wydarzeń z ID na Facebooku — pomijam.');
  process.exit(0);
}

console.log(`fetch-events: pobieram banery dla ${pairs.length} wydarzeń...`);

const banners = {};

await Promise.all(
  pairs.map(async ({ id, url }) => {
    const destPath = path.join(IMAGES_DIR, `fb-event-${id}.jpg`);
    try {
      const { status, html } = await getHtml(url);
      if (status !== 200) { console.warn(`  ⚠  event ${id}: HTTP ${status}`); return; }

      const ogImageUrl = extractOgImage(html);
      if (!ogImageUrl) { console.warn(`  ⚠  event ${id}: brak og:image`); return; }

      await downloadImage(ogImageUrl, destPath);
      banners[id] = `/images/events/fb-event-${id}.jpg`;
      console.log(`  ✓ event ${id}: zapisano baner`);
    } catch (e) {
      console.warn(`  ⚠  event ${id}: ${e.message}`);
      if (fs.existsSync(destPath)) {
        banners[id] = `/images/events/fb-event-${id}.jpg`;
        console.log(`  ↩  event ${id}: użyto poprzedniego pliku`);
      }
    }
  }),
);

const ts = `// Automatycznie generowane przez scripts/fetch-events.mjs – nie edytuj ręcznie
export const eventBanners: Record<number, string> = ${JSON.stringify(banners, null, 2)};
`;

fs.writeFileSync(OUT, ts, 'utf-8');
console.log(`✓ fetch-events: zapisano ${Object.keys(banners).length} banerów → src/data/events-banners.ts`);
