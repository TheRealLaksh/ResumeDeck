// A small library of saved resumes kept in this browser's localStorage.
// The first resume ("main") keeps using the original storage keys, so nothing needs migrating and
// older drafts open exactly as before. Others live under `resumedeck_resume_<id>` (see resumeData.js).

const LIBRARY_KEY = 'resumedeck_library';
const BACKUP_KEY = 'resumedeck_last_backup';
export const MAIN_ID = 'main';
export const MAX_RESUMES = 12;
const BACKUP_REMINDER_DAYS = 14;

const defaultLibrary = () => ({ activeId: MAIN_ID, items: [{ id: MAIN_ID, name: 'My resume', updatedAt: 0 }] });

const clean = (raw) => {
  const items = Array.isArray(raw?.items)
    ? raw.items
        .filter((i) => i && typeof i.id === 'string' && /^[\w-]+$/.test(i.id))
        .map((i) => ({
          id: i.id,
          name: typeof i.name === 'string' && i.name.trim() ? i.name.trim().slice(0, 60) : 'Untitled resume',
          updatedAt: Number.isFinite(i.updatedAt) ? i.updatedAt : 0
        }))
    : [];
  if (items.length === 0) return defaultLibrary();
  const activeId = items.some((i) => i.id === raw.activeId) ? raw.activeId : items[0].id;
  return { activeId, items };
};

export const getLibrary = () => {
  try {
    const stored = localStorage.getItem(LIBRARY_KEY);
    return stored ? clean(JSON.parse(stored)) : defaultLibrary();
  } catch {
    return defaultLibrary();
  }
};

const writeLibrary = (library) => {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch {
    // Storage is full or blocked; the editor reports that when it saves the resume itself.
  }
  return library;
};

export const getActiveId = () => getLibrary().activeId;

export const setActiveId = (id) => {
  const library = getLibrary();
  if (!library.items.some((i) => i.id === id)) return library;
  return writeLibrary({ ...library, activeId: id });
};

/** Adds an entry and makes it active. The caller writes the resume content under the returned id. */
export const addResume = (name) => {
  const library = getLibrary();
  if (library.items.length >= MAX_RESUMES) return { library, id: null };
  const id = `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const entry = { id, name: (name || 'Untitled resume').trim().slice(0, 60) || 'Untitled resume', updatedAt: Date.now() };
  return { id, library: writeLibrary({ activeId: id, items: [...library.items, entry] }) };
};

export const renameResume = (id, name) => {
  const library = getLibrary();
  const trimmed = (name || '').trim().slice(0, 60);
  if (!trimmed) return library;
  return writeLibrary({ ...library, items: library.items.map((i) => (i.id === id ? { ...i, name: trimmed } : i)) });
};

export const touchResume = (id) => {
  const library = getLibrary();
  if (!library.items.some((i) => i.id === id)) return library;
  return writeLibrary({ ...library, items: library.items.map((i) => (i.id === id ? { ...i, updatedAt: Date.now() } : i)) });
};

/** Removes the entry (never the last one). The caller removes the stored content. */
export const removeResume = (id) => {
  const library = getLibrary();
  if (library.items.length <= 1) return library;
  const items = library.items.filter((i) => i.id !== id);
  const activeId = library.activeId === id ? items[0].id : library.activeId;
  return writeLibrary({ activeId, items });
};

// --- Backup reminder ---

export const markBackup = () => {
  try {
    localStorage.setItem(BACKUP_KEY, String(Date.now()));
  } catch {
    // Not remembered; the reminder may show again.
  }
};

/** True when there is real content and no backup was downloaded in the last two weeks. */
export const backupIsDue = (data) => {
  const hasContent = Boolean(data?.personal?.name?.trim()) && ((data.experience?.length ?? 0) + (data.education?.length ?? 0)) > 0;
  if (!hasContent) return false;
  try {
    const last = Number(localStorage.getItem(BACKUP_KEY));
    return !last || Date.now() - last > BACKUP_REMINDER_DAYS * 86_400_000;
  } catch {
    return false;
  }
};
