import React, { useEffect, useRef, useState } from 'react';
import { X, Link as LinkIcon, Loader2, Copy, Check, ExternalLink } from 'lucide-react';
import { formatDay, isExpired } from '../../utils/shareLinks';
import { fetchShareStats } from '../../shareApi';

const ShareModal = ({
  isOpen, onClose, customSlug, setCustomSlug, shareError,
  handleGenerateLink, isGeneratingLink, shareUrl, linkCopied, handleCopyShareUrl,
  shareExpiry, setShareExpiry, expiryOptions = [], shareExpiresAt, myLinks = [], onForgetLink, onRevokeLink
}) => {
  const dialogRef = useRef(null);
  const [views, setViews] = useState({}); // link id -> view count
  const [confirmId, setConfirmId] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [linkError, setLinkError] = useState('');

  // View counts come from the server, only for links whose owner token this browser holds.
  useEffect(() => {
    if (!isOpen) return undefined;
    let cancelled = false;
    myLinks.filter((l) => l.ownerToken && !l.revoked).forEach((l) => {
      fetchShareStats(l.id, l.ownerToken).then((s) => { if (!cancelled && s) setViews((v) => ({ ...v, [l.id]: s.views })); }).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [isOpen, myLinks]);

  const turnOff = async (link) => {
    setBusyId(link.id);
    setLinkError('');
    try {
      await onRevokeLink(link);
    } catch (e) {
      setLinkError(e.message || "Couldn't turn this link off.");
    } finally {
      setBusyId(null);
      setConfirmId(null);
    }
  };

  // Escape closes, Tab stays inside the dialog, and focus returns to what opened it.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll('button:not([disabled]), input, a[href]');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/40 p-4 backdrop-blur-[2px] animate-fade sm:items-center"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="w-full max-w-md animate-pop rounded-3xl border border-line bg-panel p-6 shadow-pop"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-ink"><LinkIcon size={18} /></span>
            <h2 id="share-modal-title" className="font-display text-[28px] leading-none tracking-tight text-ink">Share your resume</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
              Anyone with the link can view a read-only copy. It's a snapshot, so later edits won't change it.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="btn btn-ghost btn-icon -mr-2 -mt-1"><X size={18} /></button>
        </div>

        {shareUrl ? (
          <>
            <label htmlFor="share-url" className="label">Your link {linkCopied && <span className="font-normal text-accent-ink">· copied</span>}</label>
            <div className="flex gap-2">
              <input id="share-url" readOnly value={shareUrl} onFocus={(e) => e.target.select()} className="input font-numeric text-[13px]" />
              <button onClick={handleCopyShareUrl} className="btn btn-primary btn-icon !h-10 !w-10" aria-label="Copy link">
                {linkCopied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-ink-3">{shareExpiresAt ? `Stops opening on ${formatDay(shareExpiresAt)}.` : 'This link does not expire.'}</p>
            <button onClick={onClose} className="btn btn-secondary mt-4 h-10 w-full">Done</button>
          </>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleGenerateLink(); }}>
            <label htmlFor="share-slug" className="label">Custom address <span className="font-normal text-ink-3">(optional)</span></label>
            <div className="flex items-stretch">
              <span className="flex items-center rounded-l-xl border border-r-0 border-line bg-sunken px-3 font-numeric text-[13px] text-ink-3">{window.location.host}/</span>
              <input
                id="share-slug"
                autoFocus
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="priya-raman"
                maxLength={64}
                autoCapitalize="none"
                spellCheck={false}
                aria-describedby={shareError ? 'share-error' : undefined}
                aria-invalid={shareError ? true : undefined}
                className="input min-w-0 !rounded-l-none"
              />
            </div>
            {expiryOptions.length > 0 && (
              <div className="mt-4">
                <label htmlFor="share-expiry" className="label">Link expires</label>
                <select id="share-expiry" value={shareExpiry} onChange={(e) => setShareExpiry(e.target.value)} className="input">
                  {expiryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <p className="hint mt-1.5">After this date the link stops opening. You can also turn it off any time from the list below.</p>
              </div>
            )}
            {shareError && <p id="share-error" role="alert" className="mt-2 text-xs font-medium text-danger">{shareError}</p>}
            <button type="submit" disabled={isGeneratingLink} className="btn btn-primary mt-5 h-10 w-full">
              {isGeneratingLink && <Loader2 size={16} className="animate-spin" />}
              {isGeneratingLink ? 'Creating...' : 'Create link'}
            </button>
          </form>
        )}

        {myLinks.length > 0 && (
          <section className="mt-6 border-t border-line pt-4" aria-label="Links you created">
            <h3 className="eyebrow mb-2">Your links from this browser</h3>
            <ul className="max-h-40 space-y-1 overflow-y-auto">
              {myLinks.map((l) => (
                <li key={l.id} className="flex items-center gap-2 rounded-xl px-1 py-1 hover:bg-canvas">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-numeric text-[12px] text-ink">/{l.id}</p>
                    <p className="text-[11px] text-ink-3">
                      {l.revoked ? 'Turned off' : l.expiresAt ? (isExpired(l.expiresAt) ? `Expired ${formatDay(l.expiresAt)}` : `Expires ${formatDay(l.expiresAt)}`) : 'No expiry'}
                      {views[l.id] != null && !l.revoked ? ` · ${views[l.id]} ${views[l.id] === 1 ? 'view' : 'views'}` : ''}
                    </p>
                  </div>
                  {l.ownerToken && !l.revoked && (
                    confirmId === l.id ? (
                      <button type="button" className="btn btn-sm rounded-lg bg-danger px-2 text-[12px] font-semibold text-white" disabled={busyId === l.id} onClick={() => turnOff(l)}>
                        {busyId === l.id ? 'Turning off' : 'Turn off?'}
                      </button>
                    ) : (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmId(l.id)}>Turn off</button>
                    )
                  )}
                  <a className="btn btn-ghost btn-icon h-8 w-8" href={l.url} target="_blank" rel="noreferrer" aria-label={`Open ${l.id}`}><ExternalLink size={14} /></a>
                  <button type="button" className="btn btn-ghost btn-icon h-8 w-8" aria-label={`Remove ${l.id} from this list`} onClick={() => onForgetLink?.(l.id)}><X size={14} /></button>
                </li>
              ))}
            </ul>
            {linkError && <p role="alert" className="mt-2 text-xs font-medium text-danger">{linkError}</p>}
            <p className="hint mt-2">Turn off deletes the shared copy for good. Removing a link from this list only tidies it; the link keeps working until it expires or you turn it off.</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ShareModal;
