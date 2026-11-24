// Cover letter: data shape, a free starter draft, and the copy-paste prompt for Claude.
// The letter lives in `data.letter`, so it is saved, undone, duplicated and backed up with the resume.
// It is stripped before a share link is published (see App.jsx).

export const LETTER_LIMITS = { field: 120, body: 6000, jobDescription: 12000 };

const clip = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');

export const emptyLetter = () => ({ recipient: '', company: '', role: '', date: '', body: '', jobDescription: '' });

export const normalizeLetter = (raw) => {
  const l = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  return {
    recipient: clip(l.recipient, LETTER_LIMITS.field),
    company: clip(l.company, LETTER_LIMITS.field),
    role: clip(l.role, LETTER_LIMITS.field),
    date: clip(l.date, 40),
    body: clip(l.body, LETTER_LIMITS.body),
    jobDescription: clip(l.jobDescription, LETTER_LIMITS.jobDescription)
  };
};

export const todayText = () =>
  new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export const greetingFor = (letter) => `Dear ${letter.recipient.trim() || 'Hiring Manager'},`;

export const paragraphsOf = (body) =>
  (body || '')
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);

/**
 * A scaffold built only from what is already in the resume. Bracketed prompts mark the parts only the
 * writer can supply, so the draft never invents a reason, a number or a claim.
 */
export const starterDraft = (data, letter) => {
  const role = letter.role.trim() ? `the ${letter.role.trim()} role` : 'the open position';
  const company = letter.company.trim().replace(/[.\s]+$/, '');
  const jobs = (data.experience || []).filter((e) => e.role || e.company).slice(0, 2);

  const intro = `I am writing to apply for ${role}${company ? ` at ${company}` : ''}. [One sentence on why this role and this company.]`;

  const proof = jobs.length
    ? `Most recently I worked as ${jobs.map((j) => [j.role, j.company && `at ${j.company}`].filter(Boolean).join(' ')).join(', and before that as ')}. [Name the one result from that work that matters most for this job, with a number if you have one.]`
    : '[Describe the one piece of work or project that best shows you can do this job, with a number if you have one.]';

  const close = `I would welcome the chance to talk about how I can contribute${company ? ` to ${company}` : ''}. Thank you for your time and consideration.`;

  return [intro, proof, close].join('\n\n');
};

/** The prompt to paste into claude.ai. Only career content is included, never contact details or the photo. */
export const buildLetterPrompt = (data, letter) => {
  const jobs = (data.experience || []).map((e) => `- ${e.role || ''} at ${e.company || ''} (${e.year || ''}): ${(e.details || '').replace(/\n+/g, ' ')}`).join('\n');
  const edu = (data.education || []).map((e) => `- ${e.degree || ''}, ${e.institution || ''} (${e.year || ''})`).join('\n');
  const skills = (data.skills || []).map((s) => (typeof s === 'string' ? s : s?.name)).filter(Boolean).join(', ');
  const wins = (data.achievements || []).map((a) => `- ${a}`).join('\n');

  return `Write the body of a cover letter for me.

Rules:
- Use ONLY facts that appear in my resume below. Do not invent employers, numbers, tools, awards or reasons. If something would help but is missing, leave out that claim.
- 3 short paragraphs, about 220 words in total. Plain, specific, first person. No cliches ("passionate", "team player", "fast-paced"), no flattery, no em dashes.
- Open with the role and why my experience fits it. Use the middle paragraph for the two or three most relevant things from my resume, matched to the job description. Close with a short, polite call to talk.
- Reply with ONLY the body text. Paragraphs separated by a blank line. No greeting, no sign-off, no subject line, no markdown, no commentary.

Role: ${letter.role.trim() || '(not given)'}
Company: ${letter.company.trim() || '(not given)'}

Job description:
${letter.jobDescription.trim() || '(not given: write it for the role and company above)'}

My resume
Headline: ${data.personal?.title || ''}
Summary: ${data.personal?.summary || ''}
Experience:
${jobs || '(none)'}
Education:
${edu || '(none)'}
Skills: ${skills || '(none)'}
Achievements:
${wins || '(none)'}`;
};

/** Turns a pasted chat reply into clean body text. */
export const cleanLetterReply = (text, name = '') => {
  let t = (typeof text === 'string' ? text : '').replace(/\r/g, '').trim();
  t = t.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '').trim();
  const lines = t.split('\n');
  // Drop a greeting or sign-off if the reply included one anyway; the page adds both.
  while (lines.length && /^(dear\b|hi\b|hello\b|subject:)/i.test(lines[0].trim())) lines.shift();
  while (lines.length && /^(sincerely|best regards|kind regards|regards|yours (sincerely|faithfully)|best|thank you)[,.!]?$/i.test(lines[lines.length - 1].trim())) lines.pop();
  if (name && lines.length && lines[lines.length - 1].trim().toLowerCase() === name.trim().toLowerCase()) lines.pop();
  while (lines.length && /^(sincerely|best regards|kind regards|regards|yours (sincerely|faithfully)|best)[,.!]?$/i.test(lines[lines.length - 1].trim())) lines.pop();
  return lines.join('\n').trim().slice(0, LETTER_LIMITS.body);
};
