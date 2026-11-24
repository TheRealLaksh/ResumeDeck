import React from 'react';

// ResumeDeck logo: the page-shaped R (a page with a folded corner) plus the wordmark in Instrument Serif,
// "Deck" in the accent. Colours come from the theme tokens in index.css, so it follows light/dark.
// Source art for the icons and social card: scripts/make-brand-assets.mjs.
const MARK = 'M20 6 H38 L50 18 V30 A8 8 0 0 1 42 38 H40 L51 54.5 A4 4 0 0 1 47.7 60 H43.6 L32.6 38 H26 V54 A4 4 0 0 1 22 58 H18 A4 4 0 0 1 14 54 V12 A6 6 0 0 1 20 6 Z M26 16 H32 A6 6 0 0 1 32 28 H26 Z';
const FOLD = 'M38 6 V14 A4 4 0 0 0 42 18 H50 Z';

const SIZES = { md: 'h-9', sm: 'h-8' };

const Logo = ({ size = 'md' }) => (
  <svg
    viewBox="0 0 284 64"
    role="img"
    aria-label="ResumeDeck"
    className={`${SIZES[size] ?? SIZES.md} w-auto shrink-0 text-ink`}
  >
    <path d={MARK} fillRule="evenodd" fill="rgb(var(--c-accent))" />
    <path d={FOLD} fill="rgb(var(--c-accent-fold))" />
    <text x="76" y="46" fontFamily="'Instrument Serif', Georgia, serif" fontSize="46" fill="currentColor">
      Resume<tspan fill="rgb(var(--c-accent))">Deck</tspan>
    </text>
  </svg>
);

export default Logo;
