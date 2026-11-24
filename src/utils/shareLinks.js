// Share link helpers: expiry choices and the list of links created from this browser.
// The server (Cloudflare Worker + D1, see /worker) enforces expiry and turn-off, and never sends an expired or
// turned-off resume. Each link created here keeps its owner token in this browser; that token is what allows
// turning the link off and reading its view count. Clear site data and the tokens are gone (the links stay live).

const LINKS_KEY = 'profiley_links';
const MAX_LINKS = 30;

export const EXPIRY_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: '1', label: '1 day' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' }
];

/** ISO timestamp for an expiry choice, or null for "never". */
export const expiresAtFor = (choice) => {
  const days = Number(choice);
  if (!Number.isFinite(days) || days <= 0) return null;
  return new Date(Date.now() + days * 86_400_000).toISOString();
};

export const isExpired = (expiresAt) => {
  if (typeof expiresAt !== 'string') return false;
  const t = Date.parse(expiresAt);
  return Number.isFinite(t) && t <= Date.now();
};

export const formatDay = (iso) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
};

export const loadLinks = () => {
  try {
    const list = JSON.parse(localStorage.getItem(LINKS_KEY) || '[]');
    return Array.isArray(list)
      ? list.filter((l) => l && typeof l.id === 'string' && typeof l.url === 'string').slice(0, MAX_LINKS)
      : [];
  } catch {
    return [];
  }
};

const saveLinks = (list) => {
  try {
    localStorage.setItem(LINKS_KEY, JSON.stringify(list.slice(0, MAX_LINKS)));
  } catch {
    // The list is a convenience; the link itself still works.
  }
  return list;
};

export const addLink = ({ id, url, expiresAt, name, ownerToken }) =>
  saveLinks([{ id, url, expiresAt: expiresAt || null, name: name || '', ownerToken: ownerToken || '', createdAt: new Date().toISOString() }, ...loadLinks().filter((l) => l.id !== id)]);

export const markRevoked = (id) => saveLinks(loadLinks().map((l) => (l.id === id ? { ...l, revoked: true, ownerToken: '' } : l)));

export const forgetLink = (id) => saveLinks(loadLinks().filter((l) => l.id !== id));
