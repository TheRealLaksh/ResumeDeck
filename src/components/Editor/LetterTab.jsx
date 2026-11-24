import React, { useState } from 'react';
import { ClipboardCheck, Copy, FileText, RotateCcw, Wand2 } from 'lucide-react';
import { PanelHeading, TextAreaField, TextField } from '../UI/FormElements';
import {
  LETTER_LIMITS,
  buildLetterPrompt,
  cleanLetterReply,
  emptyLetter,
  normalizeLetter,
  starterDraft
} from '../../letter/letter';

const LetterTab = ({ data, setData, notify, notifyUndo, onDownloadPdf, onPrint, isExportingPdf }) => {
  const letter = normalizeLetter(data.letter ?? emptyLetter());
  const [reply, setReply] = useState('');
  const [copied, setCopied] = useState(false);

  const update = (patch) => setData((d) => ({ ...d, letter: normalizeLetter({ ...d.letter, ...patch }) }));

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildLetterPrompt(data, letter));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      notify?.("Couldn't copy. Allow clipboard access and try again.", 'error');
    }
  };

  const useReply = () => {
    const cleaned = cleanLetterReply(reply, data.personal?.name);
    if (!cleaned) {
      notify?.('Paste Claude\'s reply first.', 'error');
      return;
    }
    update({ body: cleaned });
    setReply('');
    notifyUndo?.('Letter text replaced');
  };

  const useStarter = () => {
    update({ body: starterDraft(data, letter) });
    notifyUndo?.('Starter draft added');
  };

  const clearLetter = () => {
    update({ body: '' });
    notifyUndo?.('Letter text cleared');
  };

  return (
    <div className="animate-rise space-y-5">
      <PanelHeading title="Cover letter" subtitle="Uses your resume's name, contact details, colour and font." />

      <div className="grid grid-cols-2 gap-3">
        <TextField label="Company" value={letter.company} maxLength={LETTER_LIMITS.field} onChange={(e) => update({ company: e.target.value })} placeholder="Acme Inc." />
        <TextField label="Role" value={letter.role} maxLength={LETTER_LIMITS.field} onChange={(e) => update({ role: e.target.value })} placeholder="Frontend Intern" />
        <TextField label="Recipient" optional value={letter.recipient} maxLength={LETTER_LIMITS.field} onChange={(e) => update({ recipient: e.target.value })} placeholder="Ms. Rao" hint="Blank reads Dear Hiring Manager." />
        <TextField label="Date" optional value={letter.date} maxLength={40} onChange={(e) => update({ date: e.target.value })} placeholder="Today" hint="Blank uses today's date." />
      </div>

      <TextAreaField
        label="Job description"
        optional
        rows={5}
        value={letter.jobDescription}
        maxLength={LETTER_LIMITS.jobDescription}
        onChange={(e) => update({ jobDescription: e.target.value })}
        placeholder="Paste the job post so the letter can be matched to it."
        hint="Only used to build the prompt below. It is not printed."
      />

      <section className="rounded-2xl border border-line bg-sunken p-3.5">
        <p className="text-[13px] font-semibold text-ink">Write it with Claude (free)</p>
        <ol className="mt-1.5 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-ink-2">
          <li>Copy the prompt. It holds your career details only, no phone, email or photo.</li>
          <li>Paste it into claude.ai and send it.</li>
          <li>Paste the reply below and press Use reply.</li>
        </ol>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary" onClick={copyPrompt}>
            {copied ? <ClipboardCheck size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy prompt'}
          </button>
        </div>
        <TextAreaField
          className="mt-3"
          label="Claude's reply"
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Paste the reply here"
        />
        <button type="button" className="btn btn-primary mt-2" onClick={useReply} disabled={!reply.trim()}>
          <Wand2 size={15} />Use reply
        </button>
      </section>

      <TextAreaField
        label="Letter text"
        rows={12}
        value={letter.body}
        maxLength={LETTER_LIMITS.body}
        onChange={(e) => update({ body: e.target.value })}
        placeholder="Leave a blank line between paragraphs. The greeting and sign-off are added for you."
      />
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-secondary" onClick={useStarter}><FileText size={15} />Starter draft</button>
        <button type="button" className="btn btn-ghost" onClick={clearLetter} disabled={!letter.body}><RotateCcw size={15} />Clear</button>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line pt-4">
        <button type="button" className="btn btn-primary" onClick={onDownloadPdf} disabled={isExportingPdf}>Download letter PDF</button>
        <button type="button" className="btn btn-secondary" onClick={onPrint}>Print</button>
      </div>
    </div>
  );
};

export default LetterTab;
