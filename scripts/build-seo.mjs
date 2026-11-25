// Builds the static SEO guide pages into dist/ after `vite build`:
//   dist/guides/index.html, dist/guides/<slug>/index.html, dist/sitemap.xml
// Content lives in scripts/seo/content/*.mjs (arrays of page objects, see the checks below for the shape).
// Inline markup in text: **bold**, [[slug|link text]] (internal guide link). Everything else is escaped.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const ORIGIN = 'https://resumedeck.lakshpradhwani.com';
const UPDATED = '2026-11-25';
const UPDATED_LABEL = '25 November 2026';

const CATEGORIES = [
  ['ats', 'ATS basics', 'How applicant tracking systems read a resume, and how to write for them.'],
  ['fresher', 'Fresher resume basics', 'Format, objective, photo, education and the other questions every Indian fresher asks.'],
  ['sections', 'Resume sections and bullets', 'How to write skills, projects, internships and achievements so they get read.'],
  ['roles', 'Resume guides by role', 'What a fresher resume should show for a specific job or course.'],
  ['search', 'Job and internship search', 'Applying, tailoring, cover letters and sharing your resume.'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- load + validate content -------------------------------------------------
const dir = join(ROOT, 'scripts', 'seo', 'content');
const pages = [];
for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(join(dir, f)).href);
  if (mod.default) pages.push(...mod.default);
}
// Expansion files (ex-*.mjs) export `extras`: { slug: { sections: [...], faq: [...] } }, appended to the base page.
for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(join(dir, f)).href);
  for (const [slug, add] of Object.entries(mod.extras || {})) {
    const page = pages.find((x) => x.slug === slug);
    if (!page) { console.error(`extras for unknown slug ${slug} in ${f}`); process.exit(1); }
    page.sections.push(...(add.sections || []));
    page.faq.push(...(add.faq || []));
  }
}
const bySlug = new Map();
const problems = [];
for (const p of pages) {
  const where = `[${p.slug}]`;
  if (!/^[a-z0-9-]+$/.test(p.slug || '')) problems.push(`${where} bad slug`);
  if (bySlug.has(p.slug)) problems.push(`${where} duplicate slug`);
  bySlug.set(p.slug, p);
  if (!CATEGORIES.some((c) => c[0] === p.cat)) problems.push(`${where} unknown category ${p.cat}`);
  if (!p.title || p.title.length > 62) problems.push(`${where} title missing or over 62 chars (${p.title?.length})`);
  if (!p.desc || p.desc.length < 90 || p.desc.length > 160) problems.push(`${where} desc length ${p.desc?.length} (want 90-160)`);
  if (!p.h1) problems.push(`${where} no h1`);
  if (!p.intro?.length) problems.push(`${where} no intro`);
  if ((p.sections?.length || 0) < 3) problems.push(`${where} needs 3+ sections`);
  if ((p.faq?.length || 0) < 2) problems.push(`${where} needs 2+ faq`);
}
const text = (p) => JSON.stringify([p.intro, p.sections, p.faq]);
for (const p of pages) {
  const t = text(p);
  if (/—|–/.test(t + p.title + p.desc + p.h1)) problems.push(`[${p.slug}] contains an em/en dash`);
  for (const m of t.matchAll(/\[\[([a-z0-9-]+)\|/g)) if (!bySlug.has(m[1])) problems.push(`[${p.slug}] links to unknown guide ${m[1]}`);
  for (const r of p.related || []) if (!bySlug.has(r)) problems.push(`[${p.slug}] related unknown ${r}`);
}
if (problems.length) {
  console.error('SEO content problems:\n' + problems.map((x) => ' - ' + x).join('\n'));
  process.exit(1);
}

// ---- rendering ---------------------------------------------------------------
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[\[([a-z0-9-]+)\|(.+?)\]\]/g, (_, slug, label) => `<a href="/guides/${slug}/">${label}</a>`);

const wordCount = (p) => text(p).replace(/"(h|p|ul|ol|ex|after|exLabel|intro|sections|faq)":/g, ' ').replace(/[\[\]{}",]+/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

const CSS = `
:root{--bg:#f3f0ea;--panel:#fbfaf7;--line:#e3ded4;--ink:#1c1b19;--ink2:#4e4a43;--ink3:#726d64;--acc:#2f5d50;--accsoft:#e3eee9;--accfg:#fff}
@media(prefers-color-scheme:dark){:root{--bg:#131211;--panel:#1b1a18;--line:#312e2a;--ink:#eeebe5;--ink2:#c1bcb3;--ink3:#928d83;--acc:#6cb098;--accsoft:#1e322c;--accfg:#0c1813}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.7 Geist,Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
a{color:var(--acc);text-underline-offset:3px}a:hover{text-decoration-thickness:2px}
.top{border-bottom:1px solid var(--line);background:var(--panel)}
.bar{max-width:720px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{font:400 24px/1 "Instrument Serif",Georgia,serif;color:var(--ink);text-decoration:none}
.bar nav{display:flex;gap:18px;align-items:center;font-size:15px}
.bar nav a{color:var(--ink2);text-decoration:none}.bar nav a.btn{color:var(--accfg)}
.btn{display:inline-block;background:var(--acc);color:var(--accfg);padding:10px 18px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px}
.btn:hover{opacity:.9}
main{max-width:720px;margin:0 auto;padding:36px 20px 24px}
.crumbs{font-size:14px;color:var(--ink3);margin:0 0 18px}.crumbs a{color:var(--ink3)}
h1{font:400 clamp(32px,5.5vw,44px)/1.15 "Instrument Serif",Georgia,serif;margin:0 0 14px;letter-spacing:-.01em}
h2{font:400 28px/1.25 "Instrument Serif",Georgia,serif;margin:38px 0 8px}
h3{font-size:17px;margin:22px 0 4px}
p{margin:0 0 14px}ul,ol{margin:0 0 16px;padding-left:22px}li{margin:0 0 7px}
.meta{font-size:14px;color:var(--ink3);margin:0 0 26px}
.ex{background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--acc);border-radius:8px;padding:12px 16px;margin:0 0 16px;font-size:16px}
.ex b{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);margin-bottom:4px}
.ex ul{margin:0;padding-left:18px}
.cta{background:var(--accsoft);border:1px solid var(--line);border-radius:14px;padding:22px 22px 8px;margin:40px 0 8px}
.cta h2{margin:0 0 6px;font-size:26px}
.faq details{border-top:1px solid var(--line);padding:12px 0}.faq details:last-child{border-bottom:1px solid var(--line)}
.faq summary{cursor:pointer;font-weight:600}.faq p{margin:8px 0 0;color:var(--ink2)}
.rel{display:grid;gap:8px;padding:0;list-style:none}.rel li{margin:0}
.rel a{display:block;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:11px 14px;text-decoration:none;color:var(--ink)}
.rel a:hover{border-color:var(--acc)}
footer{max-width:720px;margin:0 auto;padding:24px 20px 48px;font-size:14px;color:var(--ink3);border-top:1px solid var(--line)}
footer a{color:var(--ink2)}
.cats h2{margin-top:34px}.cats .d{color:var(--ink3);margin:0 0 10px;font-size:15px}
.cats ul{list-style:none;padding:0;display:grid;gap:6px}.cats li{margin:0}
.cats a{display:block;background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 14px;color:var(--ink);text-decoration:none}
.cats a:hover{border-color:var(--acc)}
`;

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Instrument+Serif&display=swap">';

const shell = ({ title, desc, path, ogType = 'article', jsonld = [], body }) => `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${ORIGIN}${path}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f3f0ea" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131211" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="ResumeDeck">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${ORIGIN}${path}">
<meta property="og:image" content="${ORIGIN}/og-image.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ORIGIN}/og-image.png">
${FONTS}
<style>${CSS}</style>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<header class="top"><div class="bar"><a class="brand" href="/">ResumeDeck</a><nav><a href="/guides/">Guides</a><a class="btn" href="/">Build your resume</a></nav></div></header>
${body}
<footer><p>ResumeDeck is a free ATS resume builder for students and freshers. No account, no watermark. Built by <a href="https://lakshpradhwani.com">Laksh Pradhwani</a>.</p><p><a href="/">Resume builder</a> &middot; <a href="/guides/">All guides</a> &middot; <a href="/sitemap.xml">Sitemap</a></p></footer>
</body>
</html>
`;

const renderSection = (s) => {
  let out = `<h2>${inline(s.h)}</h2>\n`;
  for (const para of s.p || []) out += `<p>${inline(para)}</p>\n`;
  if (s.ul) out += `<ul>${s.ul.map((x) => `<li>${inline(x)}</li>`).join('')}</ul>\n`;
  if (s.ol) out += `<ol>${s.ol.map((x) => `<li>${inline(x)}</li>`).join('')}</ol>\n`;
  if (s.ex) out += `<div class="ex"><b>${esc(s.exLabel || 'Example')}</b><ul>${s.ex.map((x) => `<li>${inline(x)}</li>`).join('')}</ul></div>\n`;
  if (s.after) for (const para of s.after) out += `<p>${inline(para)}</p>\n`;
  return out;
};

const renderPage = (p) => {
  const path = `/guides/${p.slug}/`;
  const cat = CATEGORIES.find((c) => c[0] === p.cat);
  const related = (p.related?.length ? p.related : pages.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 3).map((x) => x.slug))
    .map((s) => bySlug.get(s)).filter(Boolean);
  const body = `<main>
<p class="crumbs"><a href="/">ResumeDeck</a> / <a href="/guides/">Guides</a> / ${esc(cat[1])}</p>
<article>
<h1>${inline(p.h1)}</h1>
<p class="meta">By Laksh Pradhwani &middot; Updated ${UPDATED_LABEL} &middot; ${Math.max(2, Math.round(wordCount(p) / 210))} min read</p>
${p.intro.map((x) => `<p>${inline(x)}</p>`).join('\n')}
${p.sections.map(renderSection).join('')}
<aside class="cta"><h2>${esc(p.ctaTitle || 'Build it in ResumeDeck, free')}</h2><p>${inline(p.cta || 'Pick a template, type your details, and see the one-page A4 resume update live. ResumeDeck is free, needs no account, and exports a PDF with real selectable text.')}</p><p><a class="btn" href="/">Open the resume builder</a></p></aside>
<section class="faq"><h2>Frequently asked questions</h2>
${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${inline(a)}</p></details>`).join('\n')}
</section>
${related.length ? `<h2>Keep reading</h2><ul class="rel">${related.map((r) => `<li><a href="/guides/${r.slug}/">${esc(r.h1.replace(/\*\*/g, ''))}</a></li>`).join('')}<li><a href="/guides/">Browse all resume guides</a></li></ul>` : ''}
</article>
</main>`;
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: p.h1.replace(/\*\*/g, ''),
      description: p.desc,
      datePublished: UPDATED,
      dateModified: UPDATED,
      inLanguage: 'en-IN',
      mainEntityOfPage: `${ORIGIN}${path}`,
      image: `${ORIGIN}/og-image.png`,
      author: { '@type': 'Person', name: 'Laksh Pradhwani', url: 'https://lakshpradhwani.com' },
      publisher: { '@type': 'Organization', name: 'ResumeDeck', url: ORIGIN, logo: { '@type': 'ImageObject', url: `${ORIGIN}/icon-512.png` } },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/\*\*/g, '').replace(/\[\[[a-z0-9-]+\|(.+?)\]\]/g, '$1') } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ResumeDeck', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${ORIGIN}/guides/` },
        { '@type': 'ListItem', position: 3, name: p.h1.replace(/\*\*/g, ''), item: `${ORIGIN}${path}` },
      ],
    },
  ];
  return shell({ title: `${p.title} | ResumeDeck`, desc: p.desc, path, jsonld, body });
};

const renderIndex = () => {
  const body = `<main>
<p class="crumbs"><a href="/">ResumeDeck</a> / Guides</p>
<h1>Resume guides for students and freshers</h1>
<p>${pages.length} plain-language guides on writing a resume that gets read, by people and by applicant tracking systems. Written for Indian students, freshers and first-time job and internship seekers. Every guide ends with a free tool to build the resume itself.</p>
<div class="cats">
${CATEGORIES.map(([id, name, d]) => `<h2>${esc(name)}</h2><p class="d">${esc(d)}</p><ul>${pages.filter((p) => p.cat === id).map((p) => `<li><a href="/guides/${p.slug}/">${esc(p.h1.replace(/\*\*/g, ''))}</a></li>`).join('')}</ul>`).join('\n')}
</div>
<aside class="cta"><h2>Ready to write yours?</h2><p>ResumeDeck is a free ATS resume builder for students and freshers. No account, no watermark.</p><p><a class="btn" href="/">Open the resume builder</a></p></aside>
</main>`;
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resume guides for students and freshers',
      url: `${ORIGIN}/guides/`,
      hasPart: pages.map((p) => ({ '@type': 'Article', headline: p.h1.replace(/\*\*/g, ''), url: `${ORIGIN}/guides/${p.slug}/` })),
    },
  ];
  return shell({
    title: 'Resume Guides for Students and Freshers | ResumeDeck',
    desc: `${pages.length} free guides on ATS resumes, fresher resume format, skills, projects, internships and cover letters for Indian students.`,
    path: '/guides/',
    ogType: 'website',
    jsonld,
    body,
  });
};

// ---- write -------------------------------------------------------------------
if (!existsSync(DIST)) {
  console.error('dist/ not found: run `vite build` first.');
  process.exit(1);
}
const write = (rel, content) => {
  const file = join(DIST, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};
write('guides/index.html', renderIndex());
for (const p of pages) write(`guides/${p.slug}/index.html`, renderPage(p));

const urls = [
  { loc: '/', pri: '1.0', freq: 'weekly' },
  { loc: '/guides/', pri: '0.9', freq: 'weekly' },
  ...pages.map((p) => ({ loc: `/guides/${p.slug}/`, pri: '0.7', freq: 'monthly' })),
  { loc: '/laksh', pri: '0.4', freq: 'monthly' },
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${ORIGIN}${u.loc}</loc><lastmod>${UPDATED}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.pri}</priority></url>`).join('\n') +
    `\n</urlset>\n`,
);
const per = pages.map((p) => [p.slug, wordCount(p)]).sort((a, b) => a[1] - b[1]); console.log("lowest:", per.slice(0, 5).map((x) => x.join("=")).join(", "));
const total = pages.reduce((n, p) => n + wordCount(p), 0);
console.log(`SEO: ${pages.length} guides + index, ${total} words (avg ${Math.round(total / pages.length)}), sitemap with ${urls.length} URLs.`);
