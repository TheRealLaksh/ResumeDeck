import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { analyzeKeywords } from '../../../ats/keywords';
import { TextAreaField } from '../../UI/FormElements';
import { ScoreRing } from './AtsPanel';

const STORE_KEY = 'profiley_kw_jd';
const MAX_JD = 12000;

const readStored = () => {
  try { return sessionStorage.getItem(STORE_KEY) || ''; } catch { return ''; }
};

const label = (score) => (score >= 80 ? 'Strong coverage' : score >= 60 ? 'Good coverage' : score >= 40 ? 'Gaps to close' : 'Many gaps');

const skillNames = (data) => (data.skills || []).map((s) => (typeof s === 'string' ? s : s?.name || '').toLowerCase());

/** Free, instant keyword check: paste a job post, see which of its terms the resume already uses. */
const KeywordPanel = ({ data, setData, notifyUndo }) => {
  const [jd, setJd] = useState(readStored);

  const onChange = (value) => {
    setJd(value);
    try { sessionStorage.setItem(STORE_KEY, value); } catch { /* not remembered */ }
  };

  const result = useMemo(() => analyzeKeywords(jd, data), [jd, data]);
  const have = useMemo(() => new Set(skillNames(data)), [data]);

  const missing = result.items.filter((i) => !i.found);
  const found = result.items.filter((i) => i.found);
  const skillsOnly = found.filter((i) => i.where.length === 1 && i.where[0] === 'Skills' && i.kind !== 'term');

  const addSkill = (term) => {
    setData((d) => {
      const names = skillNames(d);
      if (names.includes(term.toLowerCase())) return d;
      return { ...d, skills: [...(d.skills || []), term] };
    });
    notifyUndo?.(`Added ${term} to Skills`);
  };

  return (
    <div className="space-y-5">
      <TextAreaField
        label="Job description"
        rows={7}
        value={jd}
        maxLength={MAX_JD}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job post. The check runs as you type, in this browser only."
        hint="Nothing is sent anywhere. For rewrite suggestions use Job match."
      />

      {result.tooShort ? (
        <p className="card px-4 py-5 text-center text-[13px] text-ink-3">Paste a job post above to see which of its keywords your resume already has.</p>
      ) : result.items.length === 0 ? (
        <p className="card px-4 py-5 text-center text-[13px] text-ink-3">No clear keywords found in that text. Try the full job post.</p>
      ) : (
        <>
          <div className="card flex items-center gap-4 p-4">
            <ScoreRing score={result.coverage} label={label(result.coverage)} caption="Keyword coverage" />
            <div className="min-w-0">
              <p className="eyebrow">Keyword coverage</p>
              <p className="font-display text-[26px] leading-tight text-ink">{label(result.coverage)}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-3">
                {found.length} of {result.items.length} keywords from the post are in your resume.
              </p>
            </div>
          </div>

          {missing.length > 0 && (
            <section>
              <h3 className="eyebrow mb-2 px-1">Missing from your resume</h3>
              <ul className="card divide-y divide-line">
                {missing.map((k) => (
                  <li key={k.term} className="flex items-center gap-3 px-3.5 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{k.term}</p>
                      <p className="text-[11px] text-ink-3">Mentioned {k.count} {k.count === 1 ? 'time' : 'times'}</p>
                    </div>
                    {k.kind !== 'term' && !have.has(k.term.toLowerCase()) && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => addSkill(k.term)} aria-label={`Add ${k.term} to Skills`}>
                        <Plus size={14} />Skills
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <p className="hint px-1">Only add what you really have. Plain words from the post are shown too: use one if it truthfully describes your work.</p>
            </section>
          )}

          {skillsOnly.length > 0 && (
            <section>
              <h3 className="eyebrow mb-2 px-1">Only in your Skills list</h3>
              <ul className="flex flex-wrap gap-1.5">
                {skillsOnly.map((k) => <li key={k.term} className="rounded-full bg-sunken px-2.5 py-1 text-xs font-medium text-ink-2">{k.term}</li>)}
              </ul>
              <p className="hint px-1">Use these in a bullet under Experience too. Recruiters and parsers trust a skill more when it shows up in real work.</p>
            </section>
          )}

          {found.length > 0 && (
            <section>
              <h3 className="eyebrow mb-2 px-1">Already in your resume</h3>
              <ul className="flex flex-wrap gap-1.5">
                {found.map((k) => (
                  <li key={k.term} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-ink" title={`Found in: ${k.where.join(', ')}`}>{k.term}</li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default KeywordPanel;
