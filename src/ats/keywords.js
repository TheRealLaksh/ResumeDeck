// Keyword gap: which words in a job post does the resume already use, and which does it lack?
// Runs entirely in the browser with no AI and no network, so it is instant and private.
//
// Terms come from two places: a curated list of skills (with aliases, so "JS" counts as JavaScript)
// and words the job post repeats. Matching uses word boundaries and plural forms, never partial words.

// [display name, kind, ...aliases]
const SKILLS = [
  ['JavaScript', 'skill', 'js', 'ecmascript', 'es6'], ['TypeScript', 'skill', 'ts'], ['Python', 'skill'], ['Java', 'skill'],
  ['C++', 'skill'], ['C#', 'skill'], ['Golang', 'skill', 'go lang'], ['Rust', 'skill'], ['Kotlin', 'skill'], ['Swift', 'skill'], ['PHP', 'skill'],
  ['SQL', 'skill'], ['NoSQL', 'skill'], ['MySQL', 'skill'], ['PostgreSQL', 'skill', 'postgres'], ['MongoDB', 'skill', 'mongo'],
  ['Firebase', 'skill'], ['Redis', 'skill'], ['Supabase', 'skill'],
  ['React', 'skill', 'react.js', 'reactjs'], ['React Native', 'skill'], ['Next.js', 'skill', 'nextjs'], ['Vue', 'skill', 'vue.js', 'vuejs'],
  ['Angular', 'skill'], ['Node.js', 'skill', 'node', 'nodejs'], ['Express.js', 'skill', 'expressjs'], ['Django', 'skill'], ['Flask', 'skill'],
  ['FastAPI', 'skill'], ['Spring Boot', 'skill', 'spring'], ['HTML', 'skill', 'html5'], ['CSS', 'skill', 'css3'], ['Tailwind CSS', 'skill', 'tailwind'],
  ['Sass', 'skill', 'scss'], ['Redux', 'skill'], ['GraphQL', 'skill'], ['REST APIs', 'skill', 'rest api', 'restful'], ['API', 'skill', 'apis'],
  ['Git', 'skill'], ['GitHub', 'skill'], ['Docker', 'skill'], ['Kubernetes', 'skill', 'k8s'], ['AWS', 'skill', 'amazon web services'],
  ['Azure', 'skill'], ['GCP', 'skill', 'google cloud'], ['Vercel', 'skill'], ['CI/CD', 'skill', 'continuous integration', 'continuous deployment'],
  ['Linux', 'skill'], ['Bash', 'skill', 'shell scripting'], ['Machine Learning', 'skill', 'ml'], ['Deep Learning', 'skill'],
  ['NLP', 'skill', 'natural language processing'], ['Computer Vision', 'skill'], ['PyTorch', 'skill'], ['TensorFlow', 'skill'],
  ['scikit-learn', 'skill', 'sklearn'], ['Pandas', 'skill'], ['NumPy', 'skill'], ['Data Analysis', 'skill', 'data analytics'],
  ['Data Science', 'skill'], ['Data Visualization', 'skill', 'data visualisation'], ['Tableau', 'skill'], ['Power BI', 'skill'], ['Excel', 'skill'],
  ['Statistics', 'skill', 'statistical analysis'], ['A/B Testing', 'skill', 'ab testing'], ['ETL', 'skill'], ['LLMs', 'skill', 'llm', 'large language models', 'large language model'],
  ['RAG', 'skill', 'retrieval augmented generation', 'retrieval-augmented generation'], ['Prompt Engineering', 'skill'], ['Generative AI', 'skill', 'genai', 'gen ai'],
  ['Agile', 'skill'], ['Scrum', 'skill'], ['Jira', 'skill'], ['Figma', 'skill'], ['UI/UX', 'skill', 'ux', 'ui design', 'ux design', 'user experience'],
  ['Responsive Design', 'skill'], ['Accessibility', 'skill', 'wcag', 'a11y'], ['Testing', 'skill', 'unit testing', 'test automation'], ['Jest', 'skill'],
  ['Playwright', 'skill'], ['Cypress', 'skill'], ['Selenium', 'skill'], ['DevOps', 'skill'], ['Microservices', 'skill'], ['System Design', 'skill'],
  ['Algorithms', 'skill'], ['Data Structures', 'skill'], ['OOP', 'skill', 'object oriented', 'object-oriented'], ['SEO', 'skill', 'search engine optimization', 'search engine optimisation'],
  ['Google Analytics', 'skill'], ['Content Marketing', 'skill'], ['Social Media', 'skill'], ['Email Marketing', 'skill'], ['Copywriting', 'skill'],
  ['Shopify', 'skill'], ['WordPress', 'skill'], ['Photoshop', 'skill'], ['Project Management', 'skill'], ['Stakeholder Management', 'skill'],
  ['Communication', 'soft', 'communicate', 'communicating'], ['Leadership', 'soft'], ['Problem Solving', 'soft', 'problem-solving'],
  ['Collaboration', 'soft', 'collaborate', 'collaborating', 'teamwork', 'cross-functional'], ['Time Management', 'soft']
];

// Words that say nothing about fit, including the usual job-post boilerplate.
const STOP = new Set(`a about above across after again all also an and any are as at be because been before being below between both but by can could did do does doing down during each either else etc few for from further had has have having he her here hers him his how i if in including into is it its itself just may me might more most must my no nor not now of off on once only or other our ours out over own per same shall she should so some such than that the their theirs them then there these they this those through to too under until up upon us use used using very via was we were what when where which while who whom why will with within without would you your yours
experience experienced years year team teams work working works ability able strong skills skill looking role roles position positions company candidate candidates responsibilities responsibility requirements requirement qualifications qualification preferred required plus bonus including include includes etc job jobs opportunity opportunities join joining help helping new best good great excellent knowledge understanding familiarity proficiency proficient solid proven demonstrated passion passionate environment business people need needs well make making across various multiple related relevant based
apply application applications hiring salary benefits location remote hybrid full time part time employer equal employment day days week month months one two three first high level highly like etc take get gets provide provides providing ensure ensuring support supporting develop developing development build building`.split(/\s+/));

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

const termRegex = (term) => {
  const t = esc(term.toLowerCase()).replace(/\\\//g, '[/ ]?').replace(/\s+/g, '[\\s-]+');
  const plural = /^[a-z]{4,}$/.test(term.toLowerCase()) ? '(?:s|es)?' : '';
  return new RegExp(`(?:^|[^a-z0-9+#.])${t}${plural}(?![a-z0-9+#])`, 'i');
};

const SKILL_ENTRIES = SKILLS.map(([display, kind, ...aliases]) => ({
  display,
  kind,
  patterns: [display, ...aliases].map(termRegex),
  words: [display, ...aliases].join(' ').toLowerCase().split(/[^a-z0-9+#]+/).filter(Boolean)
}));

const clean = (text) =>
  (text || '')
    .replace(/https?:\/\/\S+|\S+@\S+\.\S+/g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-');

// Aliases overlap ("node.js" also contains "node"), so take the best single pattern instead of adding them up.
const countMatches = (patterns, text) =>
  Math.max(0, ...patterns.map((re) => (text.match(new RegExp(re.source, 'gi')) || []).length));

/** The resume split by section, so a keyword can be reported as "only in Skills" etc. */
export const resumeSections = (data) => {
  const skills = (data.skills || []).map((s) => (typeof s === 'string' ? s : s?.name || '')).join(' \n ');
  const experience = (data.experience || []).map((e) => `${e.role || ''} ${e.company || ''} ${e.details || ''}`).join(' \n ');
  const education = (data.education || []).map((e) => `${e.degree || ''} ${e.institution || ''} ${e.details || ''}`).join(' \n ');
  const other = [
    data.personal?.title,
    data.personal?.summary,
    ...(data.achievements || []),
    ...(data.community || []),
    ...Object.values(data.custom || {}).map((c) => `${c.title || ''} ${c.content || ''}`)
  ].join(' \n ');
  return {
    Skills: clean(skills).toLowerCase(),
    Experience: clean(experience).toLowerCase(),
    Education: clean(education).toLowerCase(),
    Other: clean(other).toLowerCase()
  };
};

const whereFound = (patterns, sections) =>
  Object.entries(sections).filter(([, text]) => patterns.some((re) => re.test(text))).map(([name]) => name);

/**
 * @returns {{ tooShort: boolean, coverage: number, items: Array<{term, kind, count, weight, found, where}> }}
 * `coverage` is the weighted share of the job post's keywords that the resume already uses.
 */
export const analyzeKeywords = (jobText, data) => {
  const jd = clean(jobText);
  if (jd.trim().length < 40) return { tooShort: true, coverage: 0, items: [] };
  const sections = resumeSections(data);
  const lower = jd.toLowerCase();
  const items = [];
  const claimed = new Set();

  SKILL_ENTRIES.forEach((entry) => {
    const count = countMatches(entry.patterns, lower);
    if (count === 0) return;
    entry.words.forEach((w) => claimed.add(w));
    const where = whereFound(entry.patterns, sections);
    items.push({ term: entry.display, kind: entry.kind, count, weight: 2 + Math.min(count, 3), found: where.length > 0, where });
  });

  // Words the post repeats that are not in the curated list: tools, domains, acronyms.
  const freq = new Map();
  (lower.match(/[a-z][a-z0-9+#.-]{2,}/g) || []).forEach((raw) => {
    const w = raw.replace(/[.-]+$/, '');
    if (w.length < 4 || STOP.has(w) || claimed.has(w) || /^\d/.test(w)) return;
    freq.set(w, (freq.get(w) || 0) + 1);
  });
  const acronyms = new Set(jd.match(/\b[A-Z]{2,5}\b/g) || []);
  [...freq.entries()]
    .filter(([w, n]) => n >= 2 || acronyms.has(w.toUpperCase()))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .forEach(([w, count]) => {
      const pattern = [termRegex(w)];
      const where = whereFound(pattern, sections);
      items.push({ term: w, kind: 'term', count, weight: 1 + Math.min(count, 3) / 2, found: where.length > 0, where });
    });

  items.sort((a, b) => b.weight - a.weight || b.count - a.count);
  const total = items.reduce((n, i) => n + i.weight, 0);
  const got = items.filter((i) => i.found).reduce((n, i) => n + i.weight, 0);
  return { tooShort: false, coverage: total ? Math.round((got / total) * 100) : 0, items };
};
