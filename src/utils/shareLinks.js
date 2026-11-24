// Share link helpers: expiry choices and the list of links created from this browser.
// Expiry is stored on the shared document and enforced when the link is opened (see App.jsx).
// It is a courtesy, not access control: Profiley has no sign-in, so the stored data can still be read
// by anyone who knows the document id. Links also cannot be switched off yet (nothing can edit a published doc).

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

export const addLink = ({ id, url, expiresAt, name }) =>
  saveLinks([{ id, url, expiresAt: expiresAt || null, name: name || '', createdAt: new Date().toISOString() }, ...loadLinks().filter((l) => l.id !== id)]);

export const forgetLink = (id) => saveLinks(loadLinks().filter((l) => l.id !== id));
