# ResumeDeck handoff (formerly Profiley)

## Project
ResumeDeck: a React resume builder with real-time WYSIWYG editing, 16 templates, drag-and-drop layouts, Cloudflare D1 share links (no sign-in) and client-side PDF export. Built by Laksh as a personal project (2025); his own resume is published at `/laksh` (since 18 Oct 2026 a hand-built page, not a Firestore share; see Code map).

## Links
- Live: https://resumedeck.lakshpradhwani.com. Old address https://profiley.lakshpradhwani.com 301-redirects here (Worker `profiley-redirect`, code in `redirect/`); `profiley.lakshp.live` is dead.
- Repo: https://github.com/TheRealLaksh/ResumeDeck (renamed from Profiley-Resume-Builder on 25 Nov 2026; GitHub redirects the old URL). Hosting: Cloudflare Worker `resumedeck-web` (static assets + /api/ai, `wrangler.toml`, deploy with `npm run deploy:cf`). Other Workers: `resumedeck-share` (+ D1 `resumedeck-share`, `worker/`), `profiley-redirect` (old address, `redirect/`), `profiley-share` (old api address proxy, `worker-legacy/`). The old Vercel project is no longer used.
- Local: `C:\Users\laksh\OneDrive\Documents\Personal Projects\Profiley-Resume-Builder` (folder name unchanged on purpose)
- Obsidian: `05 Resources\Domains.md`, domain audit `05 Resources\lakshp.live Usage Audit.md`, `02 Projects\Past Projects (2025).md`

## Stack, run, deploy
React 19, Vite, Tailwind, Cloudflare Worker + D1 (share links), html2canvas + jsPDF/html2pdf, lucide-react.
`npm run dev` / `npm run build` / `npm run lint` / `npm test` (Playwright, 17 tests in `tests/`: saved resumes, cover letter, keyword gap, PDF downloads, backup reminder, share links with the API mocked so nothing touches the real database; locally uses installed Chrome, CI uses Playwright Chromium; `.github/workflows/ci.yml` runs lint, build and tests on every push and PR). Deploy = push to `main`. `vercel.json` rewrites everything to `index.html` (SPA).

## Code map
- `index.html`: meta, canonical, og/twitter tags
- `src/data/initialState.js`: default resume data (email, portfolio link)
- `src/components/Modals/ShareModal.jsx`: share dialog
- `src/App.jsx`: app shell (theme, history, shortcuts, share/PDF/print wiring); `src/components/Layout/` top bar, zoom dock, footer, skeleton; `src/hooks/useCanvasZoom.js` fit/zoom/pinch
- `src/components/Editor/`: `ContentTab.jsx` (sections list) + `editors/` per section, `DesignTab.jsx` + `TemplateThumb.jsx` (live thumbnails), `ExportTab.jsx`
- `src/components/Preview/ResumeDocument.jsx`: the A4 page; every look is driven by config keys (see `initialConfig` in `src/data/initialState.js`); `src/data/templates.js` has the 16 templates
- `src/index.css` + `tailwind.config.js`: design tokens (CSS variables, `.dark` class), button/input component classes
- `src/ai/`: `tasks.js` (shared prompts/schemas/limits for tailor + parse, used by server and browser), `client.js` (server first, falls back to the user's own key), `useAiStatus.js`; `api/ai.js` is the Vercel function (same-origin check, size caps, per-IP in-memory rate limit)
- `src/ats/analyze.js`: ATS reading emulation and scored checks; UI in `Editor/ReviewTab.jsx` + `Editor/review/` (AtsPanel, TailorPanel, AiSetup)
- `src/import/`: `formats.js` (backup, JSON Resume), `pdfText.js` (pdf.js, lazy), `heuristic.js` (no-AI reader), `fromAi.js`; UI in `Modals/ImportModal.jsx`
- `src/components/Preview/Editable.jsx` + `editContext.js`: click-to-edit on the main canvas only (not shared/read-only, thumbs or print)
- `src/utils/pdfManager.js`: Download PDF (html2canvas image per page + invisible text layer + link annotations, page breaks planned in text gaps, fit-to-one-page shrink up to 15%, margins and sidebar colour on continuation pages) and `printResume` (browser print with the same fit via the `--print-fit` CSS variable)
- `src/utils/resumeLibrary.js` + `components/Layout/ResumeSwitcher.jsx`: multiple saved resumes in localStorage (max 12). Entry `main` keeps the original `resumedeck_data/config/order` keys (no migration); others use `resumedeck_resume_<id>`; metadata in `resumedeck_library`. Also the backup reminder (`resumedeck_last_backup`, toast 20 s after load when real content has no backup in 14 days).
- Cover letter: `src/letter/letter.js` (data shape in `data.letter`, starter draft, Claude copy-paste prompt, reply cleaner), `components/Editor/LetterTab.jsx`, `components/Preview/LetterDocument.jsx` (A4 page with `data-resume-paper`, so PDF/print/fit reuse the resume pipeline; shown whenever the Letter tab is active, desktop and mobile). The letter is private: stripped from share links, but kept in backups and per saved resume. File name `<Name>_Cover_Letter.pdf`.
- Keyword gap: `src/ats/keywords.js` (curated skill list with aliases + repeated words from the post, word-boundary matching, weighted coverage, where each term is found) and `Editor/review/KeywordPanel.jsx` (Review > Keywords: paste a job post, live coverage ring, missing / only-in-Skills / found lists, one-click "add to Skills" with undo). Local only, no AI, JD kept in sessionStorage.
- Share links (moved off Firebase on 25 Nov 2026): Cloudflare Worker `profiley-share` + D1 database `profiley-share` (id in `worker/wrangler.toml`), URL https://resumedeck-api.lakshpradhwani.com (custom domain, added 25 Nov; the workers.dev address https://profiley-share.laksh-pradhwani.workers.dev still works), code in `worker/` (`src/index.js`, `schema.sql`; deploy with `cd worker && npx wrangler deploy`, wrangler is logged in as laksh.pradhwani@gmail.com). Endpoints: POST /api/share (create, returns id + ownerToken), GET /api/share/:id (410 expired/revoked), GET .../stats and POST .../revoke (Bearer owner token). Only the SHA-256 of the owner token is stored. Create is rate limited (20/h per hashed IP); expiry and turn-off are enforced server-side, turn-off deletes the stored copy. Client: `src/shareApi.js` (API base in `VITE_SHARE_API`, defaults to the workers.dev URL), `src/utils/shareLinks.js` (`resumedeck_links` list incl. owner tokens, so clearing site data loses the ability to turn links off, the links stay live), ShareModal (expiry, views, Turn off), `components/Layout/LinkUnavailable.jsx`. The cover letter is stripped before sharing. Links imported from Firebase have no owner token (cannot be turned off from the web).
- `src/components/UI/Logo.jsx`: the logo (page-shaped P + outlined Instrument Serif wordmark, inline SVG, colours from theme tokens incl. `--c-accent-fold`); used by TopBar, AppSkeleton, MobileLayout
- `src/laksh/` (merged to `main` and LIVE since 18 Oct 2026; branch `feat/laksh-resume-custom` can be deleted): Laksh's own resume at `/laksh`. **Default `/laksh` = the standard ResumeDeck read-only view** (`LakshClassic.jsx` renders `App` with `preset` from `classic.js`). Since the 18 Oct research (vault note `01 About Me/Top Package Resume Research (Oct 2026).md`) it is the strict one-page version: ATS Friendly template, no photo, no summary, Education first (all schools, no marks), Experience, Projects (with visible URLs and proof: tests, audits), grouped Skills, Awards. New builder features it uses: `personal.github` field (editor + header) and the `showLinkUrls` config key (prints the real URL instead of the label "LinkedIn"). It overflows A4 by about 6%, which the app's fit-to-one-page print/PDF handles. Real numbers added 18 Oct (from Laksh): ShiftsDeal 120+ venues listed, freelance 5+ sites delivered (not live yet, so no live count). Unified Mentor users: Laksh chose to skip it (24 Nov), leave it out (Calibridge Lighthouse added 24 Nov). A "Creative view" switch (`ViewSwitch.jsx`, `switch.css`; shown by TopBar and MobileLayout via the `viewSwitch` prop when read-only) goes to `/laksh?view=creative`, the hand-built page; its switch goes back. Strict readers therefore never see the creative page unless they opt in. `main.jsx` lazy-loads both (App and Firebase load only for the standard view and other paths). `content.js` holds all the facts + lens rules (client / recruiter / dev, `?lens=` param, saved in localStorage), `LakshResume.jsx` the page (hero, tinted sections, timeline, project cards with live up/down pings, changelog diff, live ATS card that runs `ats/analyze.js` on the print sheet), `Sheet.jsx` the A4 text version (table with repeating spacer rows so `@page` margin stays 0 and the browser adds no header/footer; printed via the PDF button), `hooks.js` (reveal-on-view, count-up, magnet, tilt, status, scroll progress), `laksh.css` (scoped to `.lk`, light + dark). Photo: `public/laksh/photo.webp`.
- `src/laksh/mu.js` + `MuResume.jsx` + `mu.css`: **`/laksh-mu`** (live 24 Nov 2026), Laksh's resume in the Masters' Union format (legal page, label | content | date table, Calibri 9 pt shrinking to 8 pt to fit). "Download PDF" = browser print (selectable text). index.css hides `#root` when printing, so mu.css overrides it for this page only. Facts copied from `content.js`; keep them in sync by hand. Not linked from /laksh (Laksh chose "/laksh-mu only"). A matching Word file is made outside the repo from his MU template.
- `public/`: `favicon.svg` (adaptive tile, light/dark), `favicon.ico`, `apple-touch-icon.png`, `icon-192/512(.maskable).png` + `site.webmanifest`, og-image.png, `_redirects`, `robots.txt` (served; moved here by the merged PR #1 `claude/pensive-meitner-opz77b`, which also hardened sharing/saved data, fixed preview/PDF export and dropped unused dependencies)

## Status
Merged to `main` and deployed (9 Oct 2026): AI "tailor to job", ATS check, click-to-edit and import/export (PDF/text/backup/JSON Resume), on top of the PR #2 redesign (design system with light/dark, new editor, mobile fit/pinch, 16 templates). Lint, `npm run build`, API handler test (stubbed fetch) and Playwright suites pass. Real Anthropic calls and real Firestore shares are untested (no key / no Firestore in the sandbox). `ANTHROPIC_API_KEY` is deliberately NOT set (Laksh doesn't want to pay): with no server key and no user key, Job match runs in a free copy-paste mode (Copy prompt, run it in claude.ai or Claude in Chrome, paste the JSON reply back; `buildManualPrompt`/`parseManualReply` in `src/ai/tasks.js`, UI in `TailorPanel.jsx`). Import's AI read is still key-only; the basic reader is free. Print CSS caps letter-spacing at 0.05em so the text PDF extracts cleanly. `vercel.json` rewrite excludes `/api/`. Domain migration: the default email is `work@lakshpradhwani.com` (Cloudflare Email Routing forwards it to Laksh's Gmail).

## Next steps
0000. `/laksh` is live (standard strict view by default, `?view=creative` for the creative page). Verified on production 18 Oct: switch, numbers, lenses, ATS score 94, live status pings. Unified Mentor users number skipped by Laksh on 24 Nov; test-print to PDF in Chrome (fit to one page); old Firestore doc `laksh` is unused and can be deleted in the Firebase console.
000. Review `feat/laksh-resume-custom` at `/laksh` on a preview, then merge to `main` (push deploys live; Laksh said push only when he says). The old Firestore doc `laksh` is untouched (Laksh chose replace and delete; deleting it needs Firebase access, so it just stops being used). Not tested: window.print() in real Chrome PDF output beyond the on-screen sheet, Safari/Firefox.
00. PDF audit fixes (9 Oct 2026) are on branch `claude/pensive-meitner-opz77b`, not yet merged: after merging, download a PDF from production in a few templates and check the text selects/searches.
0. Do NOT set `ANTHROPIC_API_KEY` unless Laksh decides to pay. Try Review > Job match (copy-paste mode) on production.
4. Check the `/laksh` public resume page and the exported PDF carry the new links.

## Open questions / waiting on
- RENAME FOLLOW-UPS (25 Nov 2026): (1) Auto-deploy to Cloudflare on push is NOT set up (deploy by hand with `npm run deploy:cf`); needs a Cloudflare API token as a GitHub secret, or Workers Builds connected in the dashboard, Laksh to approve. (2) The old Vercel project `profiley-resume-builder` is unused but still exists; delete it (and the leftover profiley domain entry there) only on Laksh's say-so. (3) SEO phase is next: readable landing text for Google, meta/schema, Search Console sitemap for resumedeck.lakshpradhwani.com (needs Laksh's Google login). (4) LinkedIn Featured link still points at the old profiley address (LinkedIn cannot edit a link's URL; it redirects). (5) The old D1 `profiley-share` is kept as a backup; delete once happy. (6) Portfolio chatbot `feat/chat-v3` has a local rename commit, not pushed. (7) PDFs/Google Docs of the resume that still say Profiley are Laksh's to re-export.
- Firebase project `profiley-76c8a` was DELETED on 25 Nov 2026 at Laksh's request (recoverable for about 30 days from the Google Cloud console, project owner account). The 6 shared resumes and the old `laksh` doc (now `laksh-old`) live in D1. Remove the now-unused `VITE_FIREBASE_*` env vars in Vercel.
- Server key stays off (cost); AI is copy-paste or bring-your-own-key only.
- Old domain `profiley.lakshp.live` must be removed by hand in the Vercel dashboard (Domains); no tool available for it.
- After the 24 Nov deploy: submit `https://resumedeck.lakshpradhwani.com/sitemap.xml` in Google Search Console (needs Laksh's login) and re-scrape the OG card if previews look stale.
- Email forwarding for work@ and me@lakshpradhwani.com is set up (Cloudflare Email Routing); a real delivery test mail has not been sent yet.

## Decisions not to undo
- `/laksh` (18 Oct 2026): hand-built, not a template. Public data rules: no phone, no marks, no client names (Bestow's), shooting = just "National-level shooter", ShiftsDeal title = "Tech & Growth Intern" (matches LinkedIn), freelance listed without client names, Delhi NCR. Animation = entrance + hover micro-motion only (Laksh declined pinned scroll scenes, scroll-fill text and cursor effects). Light + dark. The ATS card downgrades two checks on purpose (phone left off; image-PDF tip n/a) and says so.
- Logo (9 Oct 2026): "Page-P", a P whose silhouette is a dog-eared page (spruce body, lighter fold), wordmark in Instrument Serif with an accent-coloured i-dot. Chosen over a document-icon-with-P (too generic) and a stacked-layers P (reads as a drop shadow). Source art and exports: Obsidian `05 Resources/ResumeDeck Logo/`. The old glowing 3D neon favicon is retired; don't bring it back.
- Domain is lakshpradhwani.com. Never reintroduce lakshp.live.
- Laksh chose small commits, pushed after each (every push to `main` goes live). Session of 8 Oct 2026.

## Session log (newest first)
- 2026-11-25: RENAMED Profiley -> ResumeDeck (new name, resumedeck.lakshpradhwani.com, new Page-R logo, tagline "Free ATS resume builder for students and freshers"), and moved hosting from Vercel to Cloudflare. Share API is now Worker `resumedeck-share` + D1 `resumedeck-share` at resumedeck-api.lakshpradhwani.com (old D1 `profiley-share` kept as backup; Worker `profiley-share` now only proxies the old api address). localStorage keys are `resumedeck_*`; saved drafts move from the old address through `public/transfer.html` + the redirect Worker's hand-over page. Older backups with app "profiley" still import. Earlier log lines below keep the old name on purpose.
- 2026-11-25: added automated tests + CI. `@playwright/test`, `playwright.config.js`, `tests/editor.spec.js` + `tests/share.spec.js` + `tests/helpers.js`, `.github/workflows/ci.yml`, `npm test`. 17 tests pass locally (Chrome). The CI workflow has not run on GitHub yet when this was written. Eslint now ignores test output and treats tests/worker as Node.
- 2026-11-25: copied the old Firestore `laksh` doc into D1 as `laksh-old` (the slug `laksh` is reserved for the hand-built page), then deleted the Firebase project on Laksh's confirmation.
- 2026-11-25: attached `profiley-api.lakshpradhwani.com` to the Worker (Laksh approved the DNS change) and pointed `src/shareApi.js` at it.
- 2026-11-25: moved share links off Firebase to Cloudflare Worker + D1 (Laksh's choice). Real turn-off and view counter now work. Published Firestore rules first (locked down), then built and deployed the Worker, copied the 6 existing shared resumes, removed the `firebase` dependency and `src/firebase.js`. Tested end to end (create, open, stats, turn off, expired page) against the live Worker; lint + build pass.
- 2026-11-24: share link controls (chosen: expiry + My links + rules file; turn-off and view counter deliberately not built, they need Firebase Auth or server-side code). Lint + build pass; modal list/expiry select checked in the browser, helpers run in node. Not tested: creating a real link (would write to production Firestore) or opening an expired one.
- 2026-11-24: added the free ATS keyword gap (Review > Keywords). Lint + build pass; node sample run and in-browser check (coverage, missing list, add-to-Skills). Fixed alias false positives (js inside node.js, 'rest', double counts). Not tested: desktop-width layout of the new mode, very long posts.
- 2026-11-24: added the cover letter builder (Letter tab: company/role/recipient/date, job description, free Claude copy-paste prompt + Use reply, starter draft, letter preview and PDF/print). Lint + build pass; checked in the browser (typing, starter draft, reply cleanup, preview, mobile nav with 6 tabs). Not tested: the letter PDF download itself, multi-page letters, a real share link without the letter.
- 2026-11-24: added multiple saved resumes (new blank, duplicate, rename, delete, switch; TopBar dropdown, icon on mobile) and a backup-file reminder toast. Lint + build pass; checked in the browser (create, switch, duplicate, delete active, reminder toast). Not tested: mobile width, the backup download click itself.
- 2026-11-24: added `/laksh-mu` (MU-format resume + PDF button); ShiftsDeal role now lists SEO for venue listings and technology collaborations with large brands (generic, no names, no numbers) in both /laksh views; marks stay off. Lint, build and a headless Chrome print (one legal page, text selectable) pass. Pushed to main. Note: local `main` branch is stale and diverged; work from `laksh-numbers` (= origin/main) and push `laksh-numbers:main`. Other uncommitted edits in the tree (resume switcher) are not mine.
- 2026-11-24: Laksh chose to skip the Unified Mentor user count; /laksh numbers are done.
- 2026-11-24: added the Calibridge Lighthouse result (measured by me on production, mobile: performance, accessibility, best practices, SEO all 100) to both /laksh views. Unified Mentor user count still missing (only Laksh knows it).
- 2026-11-24: SEO pass: real `public/sitemap.xml` (/ and /laksh), robots blocks /api/, JSON-LD WebApplication + og:site_name/image size/alt in `index.html`, `setHead()` in `main.jsx` (/laksh gets its own canonical + description; share-link paths get self canonical and noindex). Lint + build pass. Pushed to main. Local browser-pane data cleared on request.
- 2026-10-18: merged `feat/laksh-resume-custom` into `main` (fast-forward) and deployed on Laksh's say-so; checked both views on production.
- 2026-10-18: added Laksh's real numbers to both views (ShiftsDeal 120+ venues, freelance 5+ sites delivered).
- 2026-10-18: deep research on ₹60L-1Cr CS/AI resumes (8 real resumes read; Reddit unreadable; report in the vault) and rebuilt the standard `/laksh` view from its blueprint; added the `github` field and `showLinkUrls`. Lint passes; checked in Chrome. Local commit only.
- 2026-10-18: `/laksh` now defaults to the standard Profiley view with the updated data; the creative page is behind a Creative view switch (`?view=creative`). Lint passes; checked both directions of the switch in Chrome. Not pushed since the first branch push.
- 2026-10-18: built the new `/laksh` resume on branch `feat/laksh-resume-custom` (content from LinkedIn + Obsidian, three lenses, live ATS badge, project status pings, changelog, A4 print sheet, light/dark). Lint and build pass; checked in Chrome desktop, mobile width, light and dark, print sheet on screen. Branch pushed to origin (not main) on Laksh's OK so Vercel can build a preview; main untouched.
- 2026-10-09: new 1200x630 social card (`public/og-image.png`, logo lockup + tagline) replacing the old one. Link-preview scrapers cache the old image; re-scrape with the Facebook Sharing Debugger / LinkedIn Post Inspector if it doesn't update.
- 2026-10-09: new favicon set (SVG + ICO + apple-touch + 192/512/maskable PNG + `site.webmanifest`) wired in `index.html`; removed the 4 MB neon `favicon.png` and unused `vite.svg`.
- 2026-10-09: PDF audit. Download PDF used to be image-only (no selectable/ATS text), sliced lines and columns at the page edge, left continuation pages without margins or sidebar colour, and had no metadata. Rewrote `pdfManager.js` (dropped html2pdf.js for direct html2canvas + jsPDF), added "Fit to one page" toggle in Export, print path fit/break rules in `index.css`. Verified on all 16 templates plus an 11-role stress resume with a photo: text extracts cleanly, links kept, no cut lines.
- 2026-10-09: merged the AI/ATS/click-to-edit/import branch into `main` (merged `main` first; kept both sides of HANDOFF).
- 2026-10-09: new logo. `Logo.jsx` now draws the Page-P mark + outlined wordmark as inline SVG; added `--c-accent-fold` token (light/dark).
- 2026-10-09: default email in `src/data/initialState.js` changed from `contact@lakshp.live` to `work@lakshpradhwani.com`.
- 2026-10-08: added the free copy-paste Job match mode (no API key needed); Playwright-verified clipboard prompt, fenced reply parsing, bogus-id suggestions dropped.
- 2026-10-08: added AI tailor-to-job (`api/ai.js`, `src/ai/`), ATS check (`src/ats/`), click-to-edit (`Editable.jsx`), import/export (`src/import/`), Review tab and mobile 5-item nav; export-clone text-drift fix and ATS-safe print tracking.
- 2026-10-08: redesigned the editor UI and added six templates (PR #2); merged `main` into the branch (resolved `index.html`: kept the new font list and the lakshpradhwani.com canonical).
- 2026-10-08: replaced lakshp.live with lakshpradhwani.com in `index.html` (canonical, og, twitter), `public/robots.txt` and the default portfolio link; email default still pending. Rebased onto remote PR #1 (kept its ShareModal and index.html structure).
- 2026-10-08: added HANDOFF.md and the handoff hooks (Stop hook, pre-commit, `scripts/handoff.mjs`).

<!-- handoff:auto:start -->
## Auto: repo state

_Refreshed 25 Nov 2026, 1:53 am IST by `scripts/handoff.mjs` (runs on every commit). Don't edit inside this block._

Branch: `rename-resumedeck` · remote: https://github.com/TheRealLaksh/ResumeDeck.git

### Last 15 commits

- `5c71ee2` 2026-11-25 01:50 Tests: read saved data defensively while autosave is still pending
- `2228748` 2026-11-25 01:39 ResumeDeck: custom domains, docs, import hardening
- `acab092` 2026-11-25 01:31 Rename Profiley to ResumeDeck, host on Cloudflare, new share Worker and redirect Worker
- `8643820` 2026-11-25 01:05 Add Playwright tests and a CI workflow
- `770508e` 2026-11-25 00:54 HANDOFF: Firebase project deleted, laksh doc copied
- `6708ac0` 2026-11-25 00:42 Serve the share API from profiley-api.lakshpradhwani.com
- `0c5d63f` 2026-11-25 00:05 Move share links from Firebase to the Cloudflare API; add turn-off and view counts
- `c49e165` 2026-11-25 00:05 Add the share-link API: Cloudflare Worker + D1
- `ffebbc3` 2026-11-24 23:47 Add share link expiry, a My links list and proposed Firestore rules
- `01bf9e2` 2026-11-24 23:34 Add a free ATS keyword gap check to the Review tab
- `e488232` 2026-11-24 22:49 Add a cover letter builder with a free Claude copy-paste prompt
- `c79c3c4` 2026-11-24 22:17 Add multiple saved resumes and a backup reminder
- `ee103c9` 2026-11-24 22:17 HANDOFF: /laksh-mu and ShiftsDeal role update
- `61e72a5` 2026-11-24 22:16 Add /laksh-mu: resume in the Masters' Union format with browser PDF download
- `be68d41` 2026-11-24 22:13 Add SEO listings and brand tech collaborations to the ShiftsDeal role on /laksh

### Uncommitted changes at refresh time

```
M  HANDOFF.md
```
<!-- handoff:auto:end -->
