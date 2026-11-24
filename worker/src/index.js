// Profiley share-link API on Cloudflare Workers + D1. Replaces Firebase Firestore.
//
//   POST /api/share              create a link        -> 201 { id, ownerToken }
//   GET  /api/share/:id          open a link          -> 200 { resume, expiresAt, createdAt } | 404 | 410 { error: expired|revoked }
//   GET  /api/share/:id/stats    owner only (Bearer)  -> { views, revoked, expiresAt, createdAt }
//   POST /api/share/:id/revoke   owner only (Bearer)  -> { ok: true }; the stored resume is deleted
//
// The owner token is returned once at creation and kept in the creator's browser; only its SHA-256 is stored.
// Links imported from Firebase have no owner, so they cannot be turned off from the web.

const ID_PATTERN = /^(?!__.*__$)[A-Za-z0-9_-]{1,64}$/;
const RESERVED = new Set([
  'admin', 'api', 'app', 'assets', 'editor', 'favicon', 'index', 'laksh', 'login', 'new',
  'og-image', 'robots', 'signup', 'sitemap', 'static', 'vite', 'sitemap.xml', 'site.webmanifest'
]);
const MAX_BYTES = 950_000;
const MAX_EXPIRY_DAYS = 400;
const CREATES_PER_HOUR = 20;

const json = (body, status, cors, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...cors, ...extra }
  });

const corsFor = (request, env) => {
  const origin = request.headers.get('origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  const ok = allowed.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return ok
    ? {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type, authorization',
        'access-control-max-age': '86400',
        vary: 'origin'
      }
    : { vary: 'origin' };
};

const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const sha256 = async (text) => toHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));

const randomString = (bytes, alphabet) => {
  const out = [];
  const buf = crypto.getRandomValues(new Uint8Array(bytes));
  for (const b of buf) out.push(alphabet[b % alphabet.length]);
  return out.join('');
};
const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const HEX = '0123456789abcdef';

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Only the shape the app produces is accepted; the cover letter is private and is dropped if present. */
const cleanResume = (resume) => {
  if (!isObject(resume) || !isObject(resume.data) || !isObject(resume.config) || !Array.isArray(resume.sectionOrder)) return null;
  const { letter, ...data } = resume.data; // eslint-disable-line no-unused-vars
  return { data, config: resume.config, sectionOrder: resume.sectionOrder };
};

const parseExpiry = (value) => {
  if (value == null || value === '') return { ok: true, value: null };
  const t = Date.parse(value);
  const now = Date.now();
  if (!Number.isFinite(t) || t <= now || t > now + MAX_EXPIRY_DAYS * 86_400_000) return { ok: false };
  return { ok: true, value: new Date(t).toISOString() };
};

const bearer = (request) => (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();

const ownerOk = async (row, token) => Boolean(row?.owner_hash && token && (await sha256(token)) === row.owner_hash);

export default {
  async fetch(request, env, ctx) {
    const cors = corsFor(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean); // ['api','share', id?, action?]
    if (parts[0] !== 'api' || parts[1] !== 'share') return json({ error: 'not_found' }, 404, cors);
    const id = parts[2];
    const action = parts[3];

    // ---- create ----
    if (request.method === 'POST' && !id) {
      const text = await request.text();
      if (text.length > MAX_BYTES) return json({ error: 'too_large', message: 'Profile is too large (Max 1MB). Remove the photo or use a smaller one.' }, 413, cors);
      let body;
      try { body = JSON.parse(text); } catch { return json({ error: 'bad_json' }, 400, cors); }

      const resume = cleanResume(body?.resume);
      if (!resume) return json({ error: 'bad_resume' }, 400, cors);
      const expiry = parseExpiry(body?.expiresAt);
      if (!expiry.ok) return json({ error: 'bad_expiry' }, 400, cors);

      // Rate limit by hashed IP.
      const ip = await sha256(`${request.headers.get('cf-connecting-ip') || 'unknown'}|profiley`);
      const since = Date.now() - 3_600_000;
      const recent = await env.DB.prepare('SELECT COUNT(*) AS n FROM creates WHERE ip = ? AND ts > ?').bind(ip, since).first();
      if ((recent?.n ?? 0) >= CREATES_PER_HOUR) return json({ error: 'rate_limited', message: 'Too many links created. Try again in an hour.' }, 429, cors);

      let slug = typeof body.slug === 'string' ? body.slug.trim() : '';
      if (slug && (!ID_PATTERN.test(slug))) return json({ error: 'bad_slug', message: "That URL isn't valid. Use letters, numbers, - or _." }, 400, cors);
      if (slug && RESERVED.has(slug.toLowerCase())) return json({ error: 'unavailable', message: 'URL unavailable' }, 409, cors);

      const ownerToken = randomString(40, BASE62 + HEX);
      const ownerHash = await sha256(ownerToken);
      const now = new Date().toISOString();
      const row = JSON.stringify(resume);

      for (let attempt = 0; attempt < 3; attempt += 1) {
        const newId = slug || randomString(20, BASE62);
        const res = await env.DB
          .prepare('INSERT OR IGNORE INTO resumes (id, data, created_at, expires_at, owner_hash) VALUES (?, ?, ?, ?, ?)')
          .bind(newId, row, now, expiry.value, ownerHash)
          .run();
        if (res.meta.changes === 1) {
          ctx.waitUntil(
            env.DB.batch([
              env.DB.prepare('INSERT INTO creates (ip, ts) VALUES (?, ?)').bind(ip, Date.now()),
              env.DB.prepare('DELETE FROM creates WHERE ts < ?').bind(Date.now() - 86_400_000)
            ])
          );
          return json({ id: newId, ownerToken }, 201, cors);
        }
        if (slug) return json({ error: 'unavailable', message: 'URL unavailable' }, 409, cors);
      }
      return json({ error: 'busy' }, 503, cors);
    }

    if (!id || !ID_PATTERN.test(id)) return json({ error: 'not_found' }, 404, cors);

    // ---- open ----
    if (request.method === 'GET' && !action) {
      const row = await env.DB.prepare('SELECT data, created_at, expires_at, revoked FROM resumes WHERE id = ?').bind(id).first();
      if (!row) return json({ error: 'not_found' }, 404, cors);
      if (row.revoked) return json({ error: 'revoked' }, 410, cors);
      if (row.expires_at && Date.parse(row.expires_at) <= Date.now()) return json({ error: 'expired', expiresAt: row.expires_at }, 410, cors);
      ctx.waitUntil(env.DB.prepare('UPDATE resumes SET views = views + 1 WHERE id = ?').bind(id).run());
      return json({ resume: JSON.parse(row.data), expiresAt: row.expires_at, createdAt: row.created_at }, 200, cors);
    }

    // ---- owner actions ----
    if ((request.method === 'GET' && action === 'stats') || (request.method === 'POST' && action === 'revoke')) {
      const row = await env.DB.prepare('SELECT owner_hash, views, revoked, expires_at, created_at FROM resumes WHERE id = ?').bind(id).first();
      if (!row || !(await ownerOk(row, bearer(request)))) return json({ error: 'forbidden' }, 403, cors);
      if (action === 'stats') {
        return json({ views: row.views, revoked: Boolean(row.revoked), expiresAt: row.expires_at, createdAt: row.created_at }, 200, cors);
      }
      await env.DB.prepare('UPDATE resumes SET revoked = 1, data = NULL WHERE id = ?').bind(id).run();
      return json({ ok: true }, 200, cors);
    }

    return json({ error: 'not_found' }, 404, cors);
  }
};
