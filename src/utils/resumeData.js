import { initialData, initialConfig, initialSections } from '../data/constants';
import { sanitizeUrl, sanitizeImageSrc } from './safeUrl';
import { getActiveId, touchResume, MAIN_ID } from './resumeLibrary';

const STORAGE_KEYS = {
  data: 'profiley_data',
  config: 'profiley_config',
  order: 'profiley_order'
};

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const asString = (value, fallback = '') => (typeof value === 'string' ? value : fallback);
const asObjectList = (value) => (Array.isArray(value) ? value.filter(isPlainObject) : []);
const asStringList = (value) => (Array.isArray(value) ? value.filter((v) => typeof v === 'string') : []);

// Items need a stable id because the editor uses it as a React key.
const withIds = (items, prefix) =>
  items.map((item, index) => ({ ...item, id: item.id ?? `${prefix}-${index}` }));

const normalizeSkills = (value) =>
  (Array.isArray(value) ? value : []).filter(
    (skill) => typeof skill === 'string' || (isPlainObject(skill) && typeof skill.name === 'string')
  );

const normalizeCustom = (value) => {
  if (!isPlainObject(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, section]) => isPlainObject(section))
      .map(([id, section]) => [id, { title: asString(section.title), content: asString(section.content) }])
  );
};

const normalizeSections = (value) => {
  if (!Array.isArray(value)) return initialSections;
  const sections = value.filter((s) => isPlainObject(s) && typeof s.id === 'string');
  return sections.length > 0
    ? sections.map((s) => ({ ...s, label: asString(s.label, s.id), visible: s.visible !== false }))
    : initialSections;
};

/**
 * Accepts anything that came from localStorage or Firestore and returns a
 * structure the editor and preview can render without crashing. Unsafe URLs
 * and images are dropped here as well as at render time.
 */
export const normalizeData = (raw) => {
  const source = isPlainObject(raw) ? raw : {};
  const personal = isPlainObject(source.personal) ? source.personal : {};

  return {
    personal: {
      name: asString(personal.name),
      title: asString(personal.title),
      email: asString(personal.email),
      phone: asString(personal.phone),
      location: asString(personal.location),
      linkedin: sanitizeUrl(personal.linkedin),
      portfolio: sanitizeUrl(personal.portfolio),
      github: sanitizeUrl(personal.github),
      photoUrl: sanitizeImageSrc(personal.photoUrl),
      summary: asString(personal.summary)
    },
    education: withIds(asObjectList(source.education), 'edu'),
    experience: withIds(asObjectList(source.experience), 'exp'),
    skills: normalizeSkills(source.skills),
    achievements: asStringList(source.achievements),
    community: asStringList(source.community),
    custom: normalizeCustom(source.custom)
  };
};

export const normalizeConfig = (raw) => ({ ...initialConfig, ...(isPlainObject(raw) ? raw : {}) });
export const normalizeSectionOrder = normalizeSections;

export const normalizeResume = (raw) => {
  const source = isPlainObject(raw) ? raw : {};
  return {
    data: normalizeData(source.data),
    config: normalizeConfig(source.config),
    sectionOrder: normalizeSectionOrder(source.sectionOrder)
  };
};

// --- localStorage (can be blocked, full, or hold hand-edited/corrupt JSON) ---

const readJson = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? undefined : JSON.parse(stored);
  } catch {
    return undefined;
  }
};

const resumeKey = (id) => `profiley_resume_${id}`;

/** An empty resume (no sample content) for "New resume". */
export const blankResume = () => normalizeResume({ data: {}, config: initialConfig, sectionOrder: initialSections });

/** Returns the saved draft for a library entry (default: the active one), or null when nothing usable is stored. */
export const loadLocalResume = (id = getActiveId()) => {
  if (id !== MAIN_ID) {
    const stored = readJson(resumeKey(id));
    return stored === undefined ? null : normalizeResume(stored);
  }
  const data = readJson(STORAGE_KEYS.data);
  const config = readJson(STORAGE_KEYS.config);
  const sectionOrder = readJson(STORAGE_KEYS.order);
  if (data === undefined && config === undefined && sectionOrder === undefined) return null;
  return normalizeResume({ data: data ?? initialData, config, sectionOrder });
};

/** Returns true when everything was written, false when storage refused (quota, private mode). */
export const saveLocalResume = ({ data, config, sectionOrder }, id = getActiveId()) => {
  try {
    if (id !== MAIN_ID) {
      localStorage.setItem(resumeKey(id), JSON.stringify({ data, config, sectionOrder }));
    } else {
      localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(data));
      localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
      localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(sectionOrder));
    }
    touchResume(id);
    return true;
  } catch {
    return false;
  }
};

export const deleteLocalResume = (id) => {
  try {
    if (id === MAIN_ID) Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    else localStorage.removeItem(resumeKey(id));
  } catch {
    // Nothing to remove if storage is blocked.
  }
};

/** Used by "Use Template": keep the look, start with an empty draft. */
export const saveLocalDesignOnly = ({ config, sectionOrder }) => {
  try {
    const id = getActiveId();
    if (id !== MAIN_ID) {
      localStorage.setItem(resumeKey(id), JSON.stringify({ data: {}, config, sectionOrder }));
      return;
    }
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
    localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(sectionOrder));
    localStorage.removeItem(STORAGE_KEYS.data);
  } catch {
    // Nothing to do: the editor simply opens with the defaults.
  }
};
