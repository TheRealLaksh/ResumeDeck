export const extras = {
  'what-is-an-ats-resume': {
    sections: [
      {
        h: 'Common ATS names you may meet',
        p: ['Employers choose from many products, and as a candidate you often only notice them when you land on a careers page. Names such as Workday, Greenhouse, Lever, Taleo, iCIMS, SmartRecruiters and Zoho Recruit are widely used. Indian companies and consultancies also use local or in-house tools. You do not need to learn how each one works. They all do the same core job: take your file, extract text, store it and let a person search it.',
          'What differs is how forgiving each parser is. Newer systems handle columns and unusual layouts better than older ones. Because you rarely know which system a company uses, the safest approach is to write for the strictest reader: a plain, single-column layout with real text.'],
      },
      {
        h: 'What happens after you click Submit',
        ol: [
          'The system converts your file into text and tries to fill fields such as name, email, education and skills.',
          'Many portals then show you the extracted fields and ask you to fix them. Check these carefully, because errors here are what the recruiter sees.',
          'Your application is stored with the job. A recruiter opens the list, filters by field or keyword, and reads the resumes that look promising.',
          'Shortlisted candidates move to the next stage, such as a test or interview. The system records every step.',
        ],
        after: ['This is why it pays to double check the auto-filled form. If the parser misread your graduation year or put your phone number in the wrong box, correct it before you submit.'],
      },
      {
        h: 'How freshers can use this knowledge',
        p: ['As a fresher you have little to hide behind, so clarity is your advantage. A clean resume, the right keywords for the role and accurate form fields put you ahead of many applicants whose files read badly. Spend your effort on the content of the resume, test the file once, and move on to applying to more roles instead of endlessly redesigning the page.'],
      },
    ],
    faq: [
      ['Do I need to fill the form if I upload a resume?', 'Usually yes. Many portals ask you to confirm or complete the fields the parser extracted. Fill them accurately, because recruiters filter on those fields.'],
      ['Does an ATS read my LinkedIn link?', 'It stores the link, and a recruiter can click it, but the system itself normally does not read the profile. Put the details that matter on the resume itself.'],
    ],
  },
  'ats-friendly-resume-format': {
    sections: [
      {
        h: 'A one-glance layout to copy',
        p: ['If you want a safe structure without thinking, use this skeleton and fill in your own facts:'],
        ul: [
          'Top line: your name in a larger size, then phone, email, city and links on one or two lines.',
          'Summary: two lines, optional.',
          'Education: degree, college, years, CGPA, in reverse order.',
          'Experience or Internships: title, company, dates, three bullets each.',
          'Projects: name, tools, link, two or three bullets each.',
          'Skills: three to five grouped lines.',
          'Achievements: four to six short lines.',
        ],
        after: ['The order can change by role. A developer might put Projects above Education, and a management student might put Leadership after Experience. What should not change is that every section has a standard heading and every entry follows one pattern.'],
      },
      {
        h: 'Mistakes that look fine to humans but break parsing',
        ul: [
          '**A header with your contact details.** Word and some design tools treat the header as a separate area that parsers may skip.',
          '**Text over a coloured shape.** If the text sits in a shape or text box, it may be skipped entirely.',
          '**Ligatures and special symbols.** Fancy arrows or stars as bullets can appear as strange characters.',
          '**Skill bars and ratings.** A bar chart of skills has no text, so the information is lost.',
          '**Links labelled only with an icon.** Always show readable text for a link.',
        ],
      },
      {
        h: 'Keep one master and export versions',
        p: ['Keep a single master resume that has everything, then create a one-page version for each type of role. When you export, check the file name, the page count and the copy-and-paste test. This habit also makes it easy to answer a recruiter who asks you to resend your resume the same day.'],
      },
    ],
    faq: [
      ['Is it fine to add a little colour?', 'Yes. A single accent colour for headings is fine. Keep body text dark on a light background, because low-contrast text is hard to read in print.'],
      ['Should I include a skills table?', 'A grouped list with the group name in bold is easier for parsers and people than a table.'],
    ],
  },
  'ats-resume-keywords': {
    sections: [
      {
        h: 'A worked example',
        p: ['Suppose a job post for a Data Analyst Intern says: analyse datasets using SQL and Excel, build dashboards in Power BI, communicate insights to the marketing team, basic Python is a plus. The keywords are SQL, Excel, Power BI, dashboards, communicate insights, marketing, Python.',
          'Now compare with a student who has done a sales analysis project in Excel and Power BI, a SQL course with a small project, and a club role presenting results to the team. Their resume can honestly include every keyword except perhaps Python, which they leave out or list as learning. The edit is small: add the missing terms where true, reorder so the dashboard project is first, and mention the audience of the work.'],
        ex: [
          'Before: Made charts of college data.',
          'After: Built a Power BI dashboard from a college events dataset and presented findings on attendance trends to the student council.',
        ],
        exLabel: 'Keyword edit (sample facts)',
      },
      {
        h: 'Synonyms and exact matches',
        p: ['Search is often literal. A recruiter typing Power BI may not find PowerBI, and one typing JavaScript may not find JS. Where space allows, write the common full name once. Also keep a consistent form, so you do not write Node, NodeJS and Node.js in one resume. Use the version the job post uses.'],
      },
      {
        h: 'How many times is enough',
        p: ['A skill in the Skills list plus one project or experience bullet is usually enough. A third mention is fine if it is natural. Beyond that you are repeating, not strengthening. Spend any spare space on a result or a number instead, which gives the reader something new.'],
      },
    ],
    faq: [
      ['Where do I find keywords if the job post is short?', 'Look at two or three similar postings for the same role, and note the skills that repeat. Those are the core requirements of the role.'],
      ['Do keywords in a hidden section count?', 'Hidden or white text is easy to detect and looks dishonest. Keep every keyword visible and true.'],
    ],
  },
  'does-ats-reject-resumes': {
    sections: [
      {
        h: 'How to tell if a rejection was about the system',
        p: ['Most rejections are about fit, competition or timing, and you will not get a reason. A few signals suggest a technical problem instead: the portal showed blank fields after uploading, the confirmation email never arrived, or your name appeared garbled in the preview. If any of these happen, try another file format, remove complex layout elements, and apply again if the portal allows it.'],
      },
      {
        h: 'What you can do before you apply',
        ol: [
          'Run the copy-and-paste test on your PDF and fix anything that reads badly.',
          'Read the job post and make sure the skills you honestly have are written in the same terms.',
          'Complete every screening question carefully. A skipped or wrong answer on a required field can filter you out.',
          'Check the auto-filled fields after upload and correct them.',
          'Keep a record of where you applied and which resume version you sent.',
        ],
      },
      {
        h: 'Do not rely on the portal alone',
        p: ['Applying through a portal is only one route. Referrals, campus drives, direct emails to a hiring manager and genuine LinkedIn conversations all reach a person without any parsing problem. For a fresher with few connections, a short, polite message to someone who works at the company, mentioning one specific thing you built, is often worth more than another anonymous submission.'],
      },
    ],
    faq: [
      ['Should I apply again if I think my resume was misread?', 'If the company allows a second application or accepts an email resume, fix the file and try again. Otherwise move on and apply elsewhere.'],
      ['Are there systems that score resumes?', 'Some products rank candidates by match to the job. Humans normally still review the shortlist, so a relevant, honest resume is the best strategy.'],
    ],
  },
  'best-fonts-for-ats-resume': {
    sections: [
      {
        h: 'Pairing fonts without overthinking it',
        p: ['One typeface is enough for a fresher resume. If you want some contrast, use bold weight for headings and regular for body text. If you prefer two fonts, pair a serif heading with a sans-serif body, such as Georgia for headings and Arial for text. Avoid mixing two similar sans-serif fonts, because the small difference looks like a mistake.'],
        ul: [
          '**Sans-serif body with serif headings:** a calm, classic look.',
          '**All sans-serif:** the modern default, ideal for technology roles.',
          '**All serif:** traditional, common in law, finance and academia.',
        ],
      },
      {
        h: 'Readability in print and on phones',
        p: ['Many recruiters will read your resume on a phone, and some campus drives still use paper. Choose a font with open letter shapes and clear numerals, because phone screens shrink everything. Check your resume at 100 percent zoom on a phone-sized view, and print one copy to see whether the smallest text is still comfortable to read.'],
      },
      {
        h: 'Special characters and bullets',
        p: ['Stick to the standard bullet, the plain hyphen or a small round dot. Arrows, check marks and decorative symbols may be missing from some fonts and turn into empty boxes on another computer. A PDF export embeds the font, which avoids this, but the parsed text can still change. Simple symbols are the safest choice.'],
      },
    ],
    faq: [
      ['Do I need to buy a font?', 'No. The free system fonts and widely available web fonts are enough, and a resume does not need a distinctive typeface.'],
      ['Is italic text a problem?', 'Not for parsing, but long italic passages are harder to read. Use italics sparingly, for example for a company location or a date range.'],
    ],
  },
  'pdf-or-word-resume-for-ats': {
    sections: [
      {
        h: 'Using Word without losing control',
        p: ['If you must send Word, build the file carefully. Use the built-in heading styles, set margins in the page layout, and avoid text boxes and tables for layout. Turn on the display of hidden formatting once to see stray spaces and tabs, and remove them. Before sending, save a copy as PDF too and compare, because layout can change between computers when fonts differ.'],
      },
      {
        h: 'Converting between formats',
        ul: [
          'From Word or Google Docs to PDF: use Save as or Download, never a print-to-image option.',
          'From PDF back to Word: conversion tools often scramble layout, so rebuild from your source file instead.',
          'From a design tool to PDF: export with live text, then run the copy-and-paste test.',
        ],
        after: ['Keep your editable source file safe. A PDF is the output, not the master.'],
      },
      {
        h: 'Mobile and email behaviour',
        p: ['Recruiters often open attachments on a phone. A PDF opens the same way everywhere, while a Word file may need an app and may reflow. If your resume arrives by email, a PDF named with your name is also easier to find later in a long inbox. These small points help you in the first ten seconds, which is when most decisions about whether to keep reading are made.'],
      },
    ],
    faq: [
      ['Is a Google Docs link acceptable instead of a file?', 'Some people accept it, but permission settings often cause problems. A PDF attachment is more reliable unless the posting asks for a link.'],
      ['What about an RTF or plain text resume?', 'Plain text is the most basic format and is rarely requested. Use it only if a portal asks for pasted text.'],
    ],
  },
  'resume-tables-columns-and-ats': {
    sections: [
      {
        h: 'A safer way to get the two-column look',
        p: ['If you like the look of a sidebar, keep it simple. Put short, standalone items in the narrow column, such as skills, languages and links. Keep dated experience and education in the main column. Make sure the file is generated with real text, not a flattened image, and run the copy-and-paste test. If the sidebar text appears at the very start or end as a clean block, the reading order is fine.'],
      },
      {
        h: 'Why recruiters also prefer a simple layout',
        p: ['Beyond software, a person skimming forty resumes is helped by predictable placement. They expect your education in one place and your projects in another. A single column moves the eye down the page in a straight line, which makes it easy to land on the facts they want. A clever layout can slow them down, and a slower read is rarely a better one.'],
      },
      {
        h: 'Quick decision guide',
        ul: [
          'Applying through a company portal with auto-fill: choose the single column.',
          'Sending a PDF directly to a person: a tested two-column layout is acceptable.',
          'Unsure: choose the single column. It never hurts.',
        ],
      },
    ],
    faq: [
      ['Will a table for dates cause trouble?', 'Aligned dates are common and usually fine, but a right-aligned date on the same line as the title, without a table, is the most robust way.'],
      ['How can I see the reading order quickly?', 'Select all in the PDF and paste into a plain text editor. The pasted order is the reading order.'],
    ],
  },
  'how-to-check-resume-ats-score': {
    sections: [
      {
        h: 'Reading your results sensibly',
        p: ['Treat each finding as a to-do, not a grade. If the checker says contact information was not detected, look at the top of the extracted text and see what went wrong. If it says no dates were found, check your date format. If it says the resume is too long, cut. After each fix, run the check again so you can see what changed.'],
      },
      {
        h: 'Things a checker cannot judge',
        ul: [
          'Whether your achievements are impressive or relevant.',
          'Whether the keywords match one particular employer.',
          'Whether the tone and clarity work for a human reader.',
        ],
        after: ['After the technical check, ask someone you trust to read the resume for five minutes and tell you what they remember. That is your real test of quality.'],
      },
      {
        h: 'A repeatable routine',
        ol: [
          'Finish the content, then export the PDF.',
          'Run the copy-and-paste test.',
          'Run a checker and fix the flagged items.',
          'Compare against the job post for keywords.',
          'Save the version with a clear name.',
        ],
      },
    ],
    faq: [
      ['Can a score be too low even if my resume is good?', 'Yes. Checkers use their own rules, and a creative layout or short resume can lose points for reasons that do not matter to a recruiter. Look at the specific findings.'],
      ['How often should I re-check?', 'Every time you change the layout or export a new version.'],
    ],
  },

  'fresher-resume-format-india': {
    sections: [
      {
        h: 'Adjusting the format by field',
        ul: [
          '**IT and software:** Projects and Skills move up, add GitHub and coding profiles.',
          '**Core engineering:** training, lab projects and software tools lead.',
          '**Management and commerce:** internships, leadership and results lead.',
          '**Creative fields:** a portfolio link comes first, the resume supports it.',
        ],
        after: ['The common thread is to put the evidence most relevant to the job where the eye lands first.'],
      },
      {
        h: 'A short example of the top of the page',
        ex: [
          '**Aarav Sharma**',
          'Pune, Maharashtra | +91 98xxxxxx00 | aarav.sharma@gmail.com | linkedin.com/in/aarav-sharma | github.com/aarav-sharma',
          'Final-year B.Tech Computer Science student with two internships and a deployed project used by 300 students. Strong in React, Node.js and SQL.',
        ],
        exLabel: 'Sample header (fictional person)',
      },
      {
        h: 'Final checks before sending',
        ul: [
          'Is the page one page, with no empty gaps?',
          'Do dates, degree names and company names match your LinkedIn profile?',
          'Does every link work?',
          'Would you be comfortable explaining every line out loud?',
        ],
      },
    ],
    faq: [
      ['Do I need to mention my current semester?', 'If you are still studying, write Expected followed by the graduation month and year. Recruiters then know when you can join.'],
      ['Is a Hindi resume ever needed?', 'Most private-sector applications are in English. Government and some regional roles may ask for Hindi. Follow the notification.'],
    ],
  },
  'resume-for-freshers-with-no-experience': {
    sections: [
      {
        h: 'Build experience in two weeks',
        p: ['If your page still looks thin, you can create real material quickly. Pick one small project that solves a real problem for someone, and finish it, with a short write-up. Offer to help a local shop, a club or a classmate with something in your field, such as a simple website, a social media plan, a spreadsheet tracker or a poster set. Record what you did and what happened. Two weeks of focused work can produce a project line that is better than a year of unfocused courses.'],
      },
      {
        h: 'Use coursework with care',
        p: ['A short Relevant coursework line is acceptable for freshers, especially when it matches the job. Keep it to five or six courses. Do not paste an entire semester list. If a course ended with a project, describe the project rather than the course name.'],
      },
      {
        h: 'Tone and honesty',
        p: ['Do not try to sound senior. Write in plain, specific language about what you did. Employers hiring freshers expect to train you. What they want to see is that you take initiative, finish things and learn fast. A modest but honest page builds more trust than an inflated one.'],
      },
    ],
    faq: [
      ['Is volunteering worth listing?', 'Yes, particularly when you had responsibility. Describe your role and the scale, just as you would for a job.'],
      ['Should I add a skills section if I have few skills?', 'Yes, but keep it honest and short. A small, accurate list is better than a long, vague one.'],
    ],
  },
  'one-page-resume-for-students': {
    sections: [
      {
        h: 'A cutting order that works',
        ol: [
          'Remove personal details that do not belong, such as declaration and family names.',
          'Merge or delete weak projects.',
          'Shorten bullets to one line.',
          'Reduce bullets per entry to three, then two for old items.',
          'Group skills into fewer lines.',
          'Only then adjust margins by a small amount, and never below about 1.2 cm.',
        ],
      },
      {
        h: 'White space is not wasted space',
        p: ['A page packed edge to edge is tiring to read. A bit of space between sections lets the eye rest and find the next heading. If you have a few lines free, resist the urge to fill them. Leaving the page a little open often makes the whole resume look more confident.'],
      },
      {
        h: 'Keep the longer version somewhere',
        p: ['Whatever you cut is not lost. Keep a longer master in a separate file, or as a saved copy in your builder. When you apply for a role where a cut item is relevant, bring it back and remove something else. This is how a one-page resume stays tailored without becoming a new document every time.'],
      },
    ],
    faq: [
      ['Is it okay to use both sides of one sheet for printing?', 'Print resumes on one side. Two sides makes it a two-page resume.'],
      ['What if I have many projects?', 'Pick the strongest three and link to a portfolio or GitHub for the rest.'],
    ],
  },
  'resume-vs-cv-india': {
    sections: [
      {
        h: 'What goes in an academic CV',
        ul: [
          'Education with thesis or project titles and supervisors.',
          'Research experience, publications, posters and presentations.',
          'Teaching and mentoring experience.',
          'Grants, scholarships, awards and fellowships.',
          'Skills, languages, memberships and references.',
        ],
        after: ['An academic CV can run several pages, and is judged by depth rather than brevity. Use consistent citation formatting for publications.'],
      },
      {
        h: 'Common confusion in job posts',
        p: ['Many Indian job posts say Send your CV when they mean a normal one-page resume. If in doubt, read the rest of the post. A role in a lab or university will want a detailed CV. A role in a company, startup or agency will want a short resume. When you cannot tell, a concise two-page maximum with the strongest items first is a safe middle path.'],
      },
      {
        h: 'Moving between the two',
        p: ['If you start with a one-page resume and later apply for a research programme, expand each entry rather than rewriting. Add the thesis topic, the methods, the tools and the outputs. If you start with a long CV and apply to a company, cut ruthlessly to what is relevant for that job.'],
      },
    ],
    faq: [
      ['Is a biodata the same as a resume?', 'No. A biodata is an older format that lists personal details such as date of birth and family. A resume focuses on skills and experience.'],
      ['Should I send a CV for a scholarship?', 'Follow the scholarship instructions. Many ask for a specific format, length or statement of purpose.'],
    ],
  },
  'career-objective-for-freshers': {
    sections: [
      {
        h: 'More objective examples by field',
        ex: [
          'Mechanical engineering graduate with CAD experience in SolidWorks and a final-year project on heat exchanger design, seeking a design engineer trainee role.',
          'MBA student specialising in marketing, with a summer internship in brand strategy, seeking a marketing analyst role.',
          'B.Sc. Statistics graduate skilled in R, SQL and Excel, seeking an entry-level data analyst position.',
          'Design student with a portfolio of three app case studies in Figma, seeking a UI/UX design internship.',
        ],
        exLabel: 'Sample wording',
      },
      {
        h: 'How to test your objective',
        ul: [
          'Could another student copy it word for word? If yes, make it more specific.',
          'Does it name a role or a field? If no, add one.',
          'Does it include at least one real skill or result? If no, add one.',
          'Is it under two lines? If no, cut.',
        ],
      },
      {
        h: 'When to leave it out',
        p: ['If the top of your resume is already strong, an objective adds no value. A recruiter will learn your direction from your education, projects and skills. In that case use the space for another project or achievement. A missing objective never hurts, while a weak one can.'],
      },
    ],
    faq: [
      ['Should the objective change per job?', 'Yes. Change the role name and, if possible, one skill to match the posting.'],
      ['Can I write the objective in the third person?', 'You can write it as a phrase without pronouns. Avoid I and my to keep it short.'],
    ],
  },
  'resume-summary-vs-objective': {
    sections: [
      {
        h: 'Writing a summary in three steps',
        ol: [
          'List your three strongest facts: a skill, a result and a credential or project.',
          'Combine them in a sentence, starting with who you are.',
          'Add the role you want in the last clause.',
        ],
        ex: ['Final-year B.Com student with a 6-month accounts internship, Tally and Excel skills, and a CA Foundation pass, seeking an accounts executive trainee role.'],
        exLabel: 'Sample summary',
      },
      {
        h: 'Words to avoid',
        p: ['Skip phrases like hard-working, team player, passionate, results-driven and detail-oriented unless you can prove them in the next line. They appear on thousands of resumes and tell the reader nothing. Replace each with a fact: Built, Led, Reduced, Won.'],
      },
      {
        h: 'Length and placement',
        p: ['Two lines, or about 30 to 45 words. Place it under your name and contact details. If it grows longer, it starts to repeat the page below it. Keep the strongest claim first, because many readers stop after the first line.'],
      },
    ],
    faq: [
      ['Can a summary mention the company name?', 'It can, when applying to one specific company, but then you must update it every time. Use the role title instead for general use.'],
      ['What if I am changing fields?', 'Use the summary to explain the link between your past and your new direction, in one sentence.'],
    ],
  },
  'should-a-fresher-resume-have-a-photo': {
    sections: [
      {
        h: 'Why employers avoid photos',
        p: ['Many hiring teams are encouraged to screen without photos so that decisions are based on skills and evidence. Some companies instruct recruiters to ignore pictures, and some applicant systems remove them. If a photo can add nothing to your case and may bring bias, leaving it out is the lower-risk choice for most private-sector applications.'],
      },
      {
        h: 'Photo or no photo: a quick guide',
        ul: [
          'Corporate, technology and startup roles: no photo.',
          'Campus forms and institutional formats that ask: include the photo they specify.',
          'Public-facing roles that state it: follow the instructions.',
          'Applications abroad: check local norms, since many countries expect no photo.',
        ],
      },
      {
        h: 'Where your face belongs instead',
        p: ['A professional photo on your LinkedIn profile is standard and helpful. It lets recruiters connect a name with a person without adding anything to the resume file. Keep it clear, well lit and simple, with a plain background and a friendly, professional expression.'],
      },
    ],
    faq: [
      ['Does a photo make my resume look more trustworthy?', 'In most corporate hiring it does not. Trust comes from clear, verifiable facts and links.'],
      ['What size should a resume photo be?', 'If you include one, keep it small, about 3 by 3.5 cm at most, in a corner of the header.'],
    ],
  },
  'date-of-birth-and-declaration-on-resume': {
    sections: [
      {
        h: 'Why these details became outdated',
        p: ['Older resume formats were closer to a biodata, listing family and personal details for the employer file. Modern recruiters want to know what you can do. Information such as religion, marital status and parents names does not help them judge skills, and including it invites unfair judgement. Recruitment guidelines in many companies also discourage using such details in screening, so leaving them out protects you.'],
      },
      {
        h: 'When a form asks for them',
        p: ['Some forms, especially government and banking applications, include fields for date of birth, category or address. Fill these in the form, which is the correct place. This does not mean they belong on your resume. If a company onboarding form later asks for ID proof and personal data, provide them there, through the official process.'],
      },
      {
        h: 'A clean contact block',
        ex: ['Name | Phone | Email | City, State | LinkedIn | GitHub or Portfolio'],
        exLabel: 'All you need in the header',
      },
    ],
    faq: [
      ['What about nationality for jobs abroad?', 'If a posting asks about work authorisation or nationality, answer in the form or cover letter, not necessarily on the resume.'],
      ['Can I add a signature?', 'There is no need. A typed name in the email or application is enough.'],
    ],
  },
  'how-to-write-education-section-resume': {
    sections: [
      {
        h: 'Special cases',
        ul: [
          '**Diploma then degree (lateral entry):** list both, with the diploma below the degree.',
          '**Dual degree or minor:** write it on the same line, for example B.Tech with a Minor in Economics.',
          '**Transferred institutions:** list the institution where you earned the degree, and mention the earlier one only if relevant.',
          '**Online degree or certificate:** name the provider and the credential clearly.',
          '**Abroad exchange:** add a short line with the university and term.',
        ],
      },
      {
        h: 'Converting grades',
        p: ['If your institution uses a 10-point CGPA, state it as 8.4 / 10. If you have a percentage, write it as 78%. Do not convert unless your college provides an official formula, because a wrong conversion looks like an error. If a company asks for a specific scale, follow it.'],
      },
      {
        h: 'Keep it compact',
        p: ['Education should take about five to seven lines for a graduate, including school marks. Avoid listing every semester. If you have relevant coursework or honours, add them on one extra line. The rest of the page should be used for evidence of what you can do.'],
      },
    ],
    faq: [
      ['Should I include my college city?', 'Yes, as a short location after the name. It helps recruiters when colleges share similar names.'],
      ['How do I show an ongoing degree?', 'Write the start year and Expected followed by the end month and year.'],
    ],
  },
  'resume-for-campus-placements': {
    sections: [
      {
        h: 'Preparing your story',
        p: ['Campus interviews often start with Tell me about yourself and then pick items from your resume. Prepare a 60-second answer that follows the page: your degree, your strongest project, one internship or activity, and the role you want. Practice it aloud. Then prepare two or three questions about each project: why you built it, what was hard, and what you would change.'],
      },
      {
        h: 'Group discussion and aptitude rounds',
        p: ['Your resume may not matter in the first rounds, but it comes back in the interview. Treat the written test and group discussion as separate skills, and practise them in parallel. A strong resume cannot make up for an unprepared interview, but a weak one can reduce your chances of being called even when you do well in tests.'],
      },
      {
        h: 'Keep your documents ready',
        ul: [
          'A PDF resume and two printed copies.',
          'Marksheets, ID and any certificates requested by the company.',
          'Internship or training letters.',
          'Links to your portfolio or GitHub that open without a login.',
        ],
      },
    ],
    faq: [
      ['What if I am shortlisted but the resume has a mistake?', 'Tell the placement cell and the recruiter at once, and send a corrected file. Do not wait for the interview.'],
      ['Should I tailor my resume for each company in a drive?', 'If the placement cell allows, keep two or three versions for different role types, such as software, analytics and consulting.'],
    ],
  },
};
