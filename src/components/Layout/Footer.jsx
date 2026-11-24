import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => (
    <footer className="mx-auto mt-10 flex max-w-[794px] flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line/80 px-1 pt-5 text-xs text-ink-3">
        <p>ResumeDeck is a free ATS resume builder for students and freshers. No account, no watermark.</p>
        <p className="flex items-center gap-4">
            <span>Built by Laksh Pradhwani</span>
            <a
                href="https://github.com/TheRealLaksh/ResumeDeck"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
            >
                Source <ArrowUpRight size={12} />
            </a>
        </p>
    </footer>
);

export default Footer;
