import React from 'react';
import { colorThemes } from '../../data/constants';
import { greetingFor, paragraphsOf, todayText } from '../../letter/letter';

/**
 * The cover letter as an A4 page. It carries data-resume-paper like the resume page does, so the same
 * PDF export, print and fit-to-one-page code works on it. The look follows the resume's colour and font.
 */
const LetterDocument = ({ data, config, paperRole = 'main' }) => {
    const theme = colorThemes[config.themeColor] || colorThemes.midnight;
    const p = data.personal || {};
    const letter = data.letter || {};
    const paragraphs = paragraphsOf(letter.body);
    const heading = config.headingFont || '';
    const contact = [p.email, p.phone, p.location].filter((v) => v && v.trim());
    const links = [p.linkedin, p.portfolio, p.github]
        .filter(Boolean)
        .map((u) => u.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, ''));
    const toLine = [letter.recipient?.trim(), letter.company?.trim()].filter(Boolean);

    return (
        <div
            data-resume-paper={paperRole}
            className={`w-[210mm] min-h-[297mm] ${config.paperTint || 'bg-white'} shadow-paper mx-auto overflow-hidden relative text-gray-800 ${config.fontFamily}`}
        >
            <div className="px-[22mm] py-[20mm]">
                <header className={`pb-4 mb-8 border-b-2 ${theme.border}`}>
                    <h1 className={`text-2xl font-extrabold tracking-tight leading-[1.1] ${heading} ${theme.text}`}>
                        {p.name || 'Your name'}
                    </h1>
                    {p.title && <p className="mt-1 text-[12px] font-medium text-gray-600">{p.title}</p>}
                    {(contact.length > 0 || links.length > 0) && (
                        <p className="mt-2.5 text-[10.5px] leading-relaxed text-gray-500">
                            {[...contact, ...links].join('  |  ')}
                        </p>
                    )}
                </header>

                <p className="text-[12px] text-gray-600">{letter.date?.trim() || todayText()}</p>

                {toLine.length > 0 && (
                    <div className="mt-5 text-[12px] leading-relaxed text-gray-700">
                        {toLine.map((line) => <p key={line}>{line}</p>)}
                    </div>
                )}

                {letter.role?.trim() && (
                    <p className={`mt-6 text-[12.5px] font-semibold ${theme.text}`}>Application: {letter.role.trim()}</p>
                )}

                <div className="mt-6 text-[12.5px] leading-[1.7] text-gray-800">
                    <p>{greetingFor({ recipient: letter.recipient || '' })}</p>
                    {paragraphs.length > 0 ? (
                        paragraphs.map((para, i) => <p key={i} className="mt-4 break-inside-avoid">{para}</p>)
                    ) : (
                        <p className="mt-4 text-gray-400" data-editor-only>
                            Your letter appears here. Write it in the Letter tab, or paste a reply from Claude.
                        </p>
                    )}
                    <p className="mt-7">Sincerely,</p>
                    <p className="mt-1 font-semibold">{p.name || 'Your name'}</p>
                </div>
            </div>
        </div>
    );
};

export default LetterDocument;
