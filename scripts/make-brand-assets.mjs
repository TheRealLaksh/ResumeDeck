// Regenerates the ResumeDeck icon set and social card from the mark below. Run: node scripts/make-brand-assets.mjs
// Needs the Playwright dev dependency and an installed Chrome (or run `npx playwright install chromium` and drop the channel).
// Writes into public/: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, icon-512-maskable.png, og-image.png
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (f) => path.join(root, 'public', f);

// The "Page-R": a page with a folded corner whose silhouette is an R.
const MARK = 'M20 6 H38 L50 18 V30 A8 8 0 0 1 42 38 H40 L51 54.5 A4 4 0 0 1 47.7 60 H43.6 L32.6 38 H26 V54 A4 4 0 0 1 22 58 H18 A4 4 0 0 1 14 54 V12 A6 6 0 0 1 20 6 Z M26 16 H32 A6 6 0 0 1 32 28 H26 Z';
const FOLD = 'M38 6 V14 A4 4 0 0 0 42 18 H50 Z';

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>.bg{fill:#2F5D50}.pg{fill:#F3F0EA}.fd{fill:#9CC7B7}@media (prefers-color-scheme:dark){.bg{fill:#1B2A25}.pg{fill:#6CB098}.fd{fill:#A9D2C2}}</style><rect class="bg" width="64" height="64" rx="14"/><g transform="translate(8.4 8) scale(0.74)"><path class="pg" d="${MARK}" fill-rule="evenodd"/><path class="fd" d="${FOLD}"/></g></svg>`;
fs.writeFileSync(pub('favicon.svg'), faviconSvg);

const tile = (size, { maskable = false } = {}) => {
  const scale = maskable ? 0.52 : 0.74;
  const t = (64 - 64 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"><rect fill="#2F5D50" width="64" height="64" rx="${maskable ? 0 : 14}"/><g transform="translate(${t} ${t}) scale(${scale})"><path fill="#F3F0EA" d="${MARK}" fill-rule="evenodd"/><path fill="#9CC7B7" d="${FOLD}"/></g></svg>`;
};

const ogHtml = `<!doctype html><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@500&display=swap" rel="stylesheet">
<body style="margin:0;width:1200px;height:630px;background:#F3F0EA;display:grid;place-items:center">
<div style="box-sizing:border-box;width:1128px;height:558px;border:1px solid #E4DFD4;border-radius:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px">
<svg viewBox="0 0 284 64" width="710" height="160"><path d="${MARK}" fill-rule="evenodd" fill="#2F5D50"/><path d="${FOLD}" fill="#6CB098"/><text x="76" y="46" font-family="'Instrument Serif', serif" font-size="46" fill="#1C1B19">Resume<tspan fill="#2F5D50">Deck</tspan></text></svg>
<div style="font:500 30px Geist, system-ui, sans-serif;color:#4A4640">Free ATS resume builder for students and freshers</div>
</div></body>`;

const browser = await chromium.launch(process.env.CI ? {} : { channel: 'chrome' });
const page = await browser.newPage();

const shot = async (html, w, h, file, omitBackground = false) => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: pub(file), omitBackground });
};

const body = (svg) => `<body style="margin:0;background:transparent">${svg}</body>`;
await shot(body(tile(192)), 192, 192, 'icon-192.png', true);
await shot(body(tile(512)), 512, 512, 'icon-512.png', true);
await shot(body(tile(512, { maskable: true })), 512, 512, 'icon-512-maskable.png');
await shot(body(tile(180, { maskable: true })), 180, 180, 'apple-touch-icon.png');
await shot(ogHtml, 1200, 630, 'og-image.png');

// favicon.ico: a 48x48 PNG wrapped in an ICO container (valid for every current browser).
await shot(body(tile(48)), 48, 48, '_ico48.png', true);
const png = fs.readFileSync(pub('_ico48.png'));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6); header.writeUInt8(48, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
fs.writeFileSync(pub('favicon.ico'), Buffer.concat([header, png]));
fs.unlinkSync(pub('_ico48.png'));

await browser.close();
console.log('brand assets written to public/');
