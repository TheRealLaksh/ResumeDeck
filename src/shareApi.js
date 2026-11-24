// Client for the ResumeDeck share API (Cloudflare Worker + D1, see /worker). Replaces Firebase Firestore.
// Sharing works without sign-in: creating a link returns an owner token that the browser keeps, and that token
// is what allows turning the link off or reading its view count later.

const API_BASE = (import.meta.env?.VITE_SHARE_API || 'https://resumedeck-api.lakshpradhwani.com').replace(/\/+$/, '');

// Paths the site itself serves or may serve; they must never become resume links.
const RESERVED_SLUGS = new Set([
  'admin', 'api', 'app', 'assets', 'editor', 'favicon', 'index', 'login', 'new',
  'og-image', 'robots', 'signup', 'sitemap', 'static', 'vite'
]);

const RESUME_ID_PATTERN = /^(?!__.*__$)[A-Za-z0-9_-]{1,64}$/;

/** Whether a URL path segment can be a resume id (avoids lookups for /robots.txt, /assets/x.js, ...). */
export const isValidResumeId = (id) => typeof id === 'string' && RESUME_ID_PATTERN.test(id);

export const makeSlug = (input) =>
  input.trim().replace(/[^a-zA-Z0-9-_]/g, '-').slice(0, 64);

class ShareError extends Error {}

const request = async (path, options = {}) => {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, options);
  } catch {
    throw new ShareError("Couldn't reach the share service. Check your connection and try again.");
  }
  let body = null;
  try { body = await res.json(); } catch { /* empty body */ }
  return { res, body };
};

const create = async (resumeData, { slug = '', expiresAt = null } = {}) => {
  const { res, body } = await request('/api/share', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ resume: resumeData, slug: slug || undefined, expiresAt })
  });
  if (res.status === 201) return { id: body.id, ownerToken: body.ownerToken };
  throw new ShareError(body?.message || 'Failed to generate link.');
};

/** Resolves { id, ownerToken }. */
export const saveResumeToDB = (resumeData, { expiresAt = null } = {}) => create(resumeData, { expiresAt });

export const saveResumeWithSlug = (slug, resumeData, { expiresAt = null } = {}) => {
  if (!isValidResumeId(slug)) throw new ShareError("That URL isn't valid. Use letters, numbers, - or _.");
  if (RESERVED_SLUGS.has(slug.toLowerCase())) throw new ShareError('URL unavailable');
  return create(resumeData, { slug, expiresAt });
};

/**
 * Resolves { resume, expiresAt } for a live link, { unavailable: 'expired' | 'revoked' } for a link that was
 * closed, or null when it doesn't exist. Network failures reject, so callers can tell "missing" from "couldn't load".
 */
export const fetchResumeFromDB = async (id) => {
  if (!isValidResumeId(id) || RESERVED_SLUGS.has(id.toLowerCase())) return null;
  const { res, body } = await request(`/api/share/${encodeURIComponent(id)}`);
  if (res.status === 200) return { resume: body.resume, expiresAt: body.expiresAt };
  if (res.status === 410) return { unavailable: body?.error === 'revoked' ? 'revoked' : 'expired' };
  if (res.status === 404) return null;
  throw new ShareError("Couldn't load that resume.");
};

/** Owner only: { views, revoked, expiresAt, createdAt }, or null when the token is not accepted. */
export const fetchShareStats = async (id, ownerToken) => {
  if (!ownerToken) return null;
  const { res, body } = await request(`/api/share/${encodeURIComponent(id)}/stats`, { headers: { authorization: `Bearer ${ownerToken}` } });
  return res.status === 200 ? body : null;
};

/** Owner only: turns the link off for good and deletes the stored copy. */
export const revokeShare = async (id, ownerToken) => {
  const { res } = await request(`/api/share/${encodeURIComponent(id)}/revoke`, { method: 'POST', headers: { authorization: `Bearer ${ownerToken}` } });
  if (res.status !== 200) throw new ShareError("Couldn't turn this link off. It may belong to another browser.");
};
