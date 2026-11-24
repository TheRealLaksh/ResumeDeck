import React from 'react';
import Logo from '../UI/Logo';

/** Shown instead of a shared resume whose owner set an expiry date that has passed. */
const LinkUnavailable = () => (
    <div className="flex min-h-[100dvh] flex-col bg-canvas">
        <header className="flex h-14 items-center border-b border-line bg-panel px-4"><Logo /></header>
        <main id="main" className="grid flex-1 place-items-center px-6">
            <div className="max-w-sm text-center">
                <h1 className="font-display text-[32px] leading-tight tracking-tight text-ink">This link has expired</h1>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
                    The person who shared this resume set it to stop opening after a date, and that date has passed.
                    Ask them for a new link.
                </p>
                <a className="btn btn-primary mt-6 inline-flex" href="/">Build your own resume</a>
            </div>
        </main>
    </div>
);

export default LinkUnavailable;
