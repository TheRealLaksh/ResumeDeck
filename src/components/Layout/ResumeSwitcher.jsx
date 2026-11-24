import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Copy, FilePlus, Pencil, Trash2 } from 'lucide-react';
import { MAX_RESUMES } from '../../utils/resumeLibrary';

/** Dropdown for the resumes saved in this browser: switch, create, duplicate, rename, delete. */
const ResumeSwitcher = ({ library, onSwitch, onCreate, onDuplicate, onRename, onDelete, compact = false }) => {
  const [open, setOpen] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const rootRef = useRef(null);

  const active = library.items.find((i) => i.id === library.activeId) ?? library.items[0];
  const canAdd = library.items.length < MAX_RESUMES;
  const canDelete = library.items.length > 1;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    setRenamingId(null);
    setConfirmId(null);
    setOpen((o) => !o);
  };

  const commitRename = () => {
    if (renamingId && draft.trim()) onRename(renamingId, draft);
    setRenamingId(null);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={`btn btn-ghost ${compact ? 'btn-icon' : ''} max-w-[14rem]`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Resume: ${active.name}. Switch resume`}
        onClick={toggle}
      >
        {!compact && <span className="truncate text-[13px] font-medium">{active.name}</span>}
        <ChevronDown size={15} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[120] mt-2 w-72 rounded-2xl border border-line bg-panel p-1.5 shadow-pop"
        >
          <p className="px-2.5 pb-1 pt-1.5 font-numeric text-[10px] uppercase tracking-wider text-ink-3">
            Saved in this browser ({library.items.length}/{MAX_RESUMES})
          </p>
          <ul className="max-h-64 overflow-y-auto">
            {library.items.map((item) => (
              <li key={item.id} className="group flex items-center gap-1 rounded-xl px-1 hover:bg-canvas">
                {renamingId === item.id ? (
                  <input
                    autoFocus
                    value={draft}
                    maxLength={60}
                    aria-label="Resume name"
                    className="m-1 h-8 min-w-0 flex-1 rounded-lg border border-line bg-panel px-2 text-[13px] text-ink outline-none focus:border-accent"
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename();
                      if (e.key === 'Escape') setRenamingId(null);
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={item.id === active.id}
                    className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 text-left text-[13px] text-ink"
                    onClick={() => { setOpen(false); if (item.id !== active.id) onSwitch(item.id); }}
                  >
                    <Check size={14} className={item.id === active.id ? 'text-accent' : 'opacity-0'} />
                    <span className="truncate">{item.name}</span>
                  </button>
                )}
                {renamingId !== item.id && (
                  <>
                    <button
                      type="button"
                      className="btn btn-ghost btn-icon h-8 w-8"
                      aria-label={`Rename ${item.name}`}
                      onClick={() => { setRenamingId(item.id); setDraft(item.name); }}
                    >
                      <Pencil size={14} />
                    </button>
                    {canDelete && (
                      confirmId === item.id ? (
                        <button
                          type="button"
                          className="btn btn-sm rounded-lg bg-danger px-2 text-[12px] font-semibold text-white"
                          onClick={() => { setConfirmId(null); setOpen(false); onDelete(item.id); }}
                        >
                          Delete?
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-ghost btn-icon h-8 w-8"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => setConfirmId(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      )
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex gap-1.5 border-t border-line p-1.5">
            <button type="button" role="menuitem" className="btn btn-secondary flex-1" disabled={!canAdd} onClick={() => { setOpen(false); onCreate(); }}>
              <FilePlus size={15} />New
            </button>
            <button type="button" role="menuitem" className="btn btn-secondary flex-1" disabled={!canAdd} onClick={() => { setOpen(false); onDuplicate(); }}>
              <Copy size={15} />Duplicate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSwitcher;
