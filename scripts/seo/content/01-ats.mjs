export default [
  {
    slug: 'what-is-an-ats-resume',
    cat: 'ats',
    title: 'What Is an ATS Resume? A Plain Explanation',
    h1: 'What is an ATS resume, and do you need one?',
    desc: 'An ATS resume is one that applicant tracking software can read correctly. Learn what an ATS does, what it cannot do, and how to write for it.',
    intro: [
      'An ATS resume is not a special kind of resume. It is an ordinary resume that is built so that software can read it without mistakes. ATS stands for applicant tracking system, the tool most companies use to collect applications, store them and let recruiters search through them.',
      'If you are a student or fresher applying through a company careers page, a job portal or a campus drive, your resume will almost certainly pass through one. The good news is that writing for it is mostly about being clear and consistent, not about tricks.',
    ],
    sections: [
      {
        h: 'What an applicant tracking system actually does',
        p: [
          'When you upload a resume, the system converts the file to plain text and tries to sort it into fields: name, contact details, education, work experience, skills. Recruiters then search and filter those fields, or open your original file next to the extracted text.',
          'Most systems do three jobs: collect applications in one place, let the recruiter search by keyword or filter by field, and track where each candidate is in the hiring process. Some also score or rank applicants against the job description, but a person normally still makes the decision.',
        ],
      },
      {
        h: 'Why a resume can read badly to software',
        p: ['The parser reads text in the order it appears in the file. Anything that breaks that order or hides text from it causes trouble:'],
        ul: [
          'Text saved inside an image, which includes a resume exported as a picture or scanned page.',
          'Heavy multi-column layouts, tables, text boxes and sidebars that scramble the reading order.',
          'Contact details placed in the page header or footer, where some parsers skip them.',
          'Unusual section names such as My Journey instead of Experience.',
          'Icons or graphics used in place of words, for example a phone icon with no visible label.',
        ],
      },
      {
        h: 'What makes a resume ATS friendly',
        ol: [
          'Use one clear order: contact details, education, experience, projects, skills, achievements.',
          'Use standard headings that a machine will recognise: Education, Experience, Projects, Skills.',
          'Keep real, selectable text in a PDF or a Word file. If you can highlight and copy the words, software can read them.',
          'Write dates and names the same way every time, for example Jun 2025 to Aug 2025.',
          'Match the wording of the job post where it is honestly true for you.',
        ],
        after: ['The [[ats-friendly-resume-format|ATS-friendly resume format guide]] walks through each of these in more detail.'],
      },
      {
        h: 'What an ATS is not',
        p: [
          'It is not a robot that deletes most applications for the wrong font. A lot of advice online exaggerates this. In practice the bigger risk is a resume that was extracted badly, so that the recruiter searching for a skill does not find yours. Read [[does-ats-reject-resumes|does an ATS reject resumes?]] for the honest picture.',
        ],
      },
    ],
    faq: [
      ['Is an ATS resume different from a normal resume?', 'No. It is a normal resume written clearly enough for software to parse. A resume that is easy for a machine to read is usually easier for a person to read too.'],
      ['Do all companies use an ATS?', 'Many mid-size and large employers do, and so do most job portals in some form. A small startup that takes applications by email may not, but a clean, text-based resume works everywhere.'],
      ['Can I check how my resume reads to an ATS?', 'Yes. Paste your resume text into a plain text editor and see what survives, or use a checker that shows the extracted text. ResumeDeck has a free ATS check that does this inside the builder.'],
    ],
    related: ['ats-friendly-resume-format', 'does-ats-reject-resumes', 'how-to-check-resume-ats-score'],
  },
  {
    slug: 'ats-friendly-resume-format',
    cat: 'ats',
    title: 'ATS-Friendly Resume Format: A Simple Checklist',
    h1: 'The ATS-friendly resume format, step by step',
    desc: 'Follow this ATS-friendly resume format: single column, standard headings, plain fonts, real text and the right order for students and freshers.',
    intro: [
      'The safest ATS-friendly resume format is a one-page, mostly single-column layout with standard section headings, ordinary fonts and real text. It looks plain on paper, and that is the point: nothing in it can confuse a parser.',
      'Use this as a checklist before you send any resume. It works for freshers in any field.',
    ],
    sections: [
      {
        h: 'Step 1: pick a layout a parser can follow',
        p: [
          'A single column that reads top to bottom is the most reliable. A narrow side column for skills or contact details can work if the file is built properly, but a text extractor may read the side column before or after the main text, so the order of your information changes.',
          'Avoid tables for layout, text boxes, overlapping shapes and anything that was positioned by hand. If you need two columns, test the result: copy all the text out of the PDF and check the order is still sensible.',
        ],
      },
      {
        h: 'Step 2: use headings the system expects',
        p: ['Stick to names a machine and a recruiter both recognise:'],
        ul: ['Education', 'Experience (or Internships / Work Experience)', 'Projects', 'Skills (or Technical Skills)', 'Achievements (or Awards / Certifications)'],
        after: ['Creative names like Where I Studied or My Toolkit read nicely to a person but can leave a section unlabelled to software.'],
      },
      {
        h: 'Step 3: put contact details in the body',
        p: ['Write your name, phone, email, city and one or two links (LinkedIn, GitHub or portfolio) at the top of the page body, not inside the header or footer area of a Word file. Spell the links out or make sure the visible text is clear, so they survive when the file is converted to text.'],
      },
      {
        h: 'Step 4: keep fonts, bullets and dates simple',
        ul: [
          'A common font such as Arial, Calibri, Helvetica, Georgia or Times, at 10 to 12 pt for body text.',
          'Standard round bullets. Fancy symbols can turn into stray characters.',
          'One date style throughout, such as Jun 2025 to Aug 2025.',
          'Bold for headings and job titles only. Skip colour and graphics for anything that carries meaning.',
        ],
      },
      {
        h: 'Step 5: export the right file',
        p: ['Export a PDF that contains selectable text, or a .docx if the application asks for Word. Do not export a picture of your resume. See [[pdf-or-word-resume-for-ats|PDF or Word for ATS]] for when to pick which.'],
      },
      {
        h: 'Step 6: test it',
        p: ['Open the file, press select all, copy, and paste into a plain text editor. If the words come out in the right order with the right headings, an ATS will do fine. You can also use [[how-to-check-resume-ats-score|a free ATS check]] to see the same thing with a score.'],
      },
    ],
    faq: [
      ['Is a two-column resume ATS friendly?', 'It can be, but it is riskier. Many modern parsers handle columns, yet some read them in the wrong order. A single column is the safest choice, especially for freshers who have no need to squeeze in more.'],
      ['Should my resume be one page?', 'For a fresher, yes. One page forces you to keep only what matters. See [[one-page-resume-for-students|the one-page resume guide]].'],
      ['Do colours and icons hurt ATS parsing?', 'Colour itself is harmless. Icons used instead of words can hurt, because there is no text for the parser to read. Always keep a visible text label next to any icon.'],
    ],
    related: ['best-fonts-for-ats-resume', 'resume-tables-columns-and-ats', 'ats-resume-keywords'],
  },
  {
    slug: 'ats-resume-keywords',
    cat: 'ats',
    title: 'ATS Resume Keywords: How to Find and Use Them',
    h1: 'How to find the right keywords for your resume',
    desc: 'Learn how to pull keywords from a job post, where to place them on your resume, and how to avoid keyword stuffing. A free method for freshers.',
    intro: [
      'Keywords are the specific skills, tools and phrases an employer uses to describe a role. Recruiters search for them, and some systems compare them against your resume. You do not need a paid tool to find the right ones: the job post tells you.',
      'The rule that keeps this honest is simple. Only use a keyword if it is true for you.',
    ],
    sections: [
      {
        h: 'Step 1: read the job post like a list',
        p: ['Copy the job description into a document. Highlight every noun that names a skill, tool, method or qualification: Python, SQL, Excel, client communication, social media analytics, AutoCAD. Also highlight repeated words, because repetition signals priority.'],
      },
      {
        h: 'Step 2: sort them into have, partly have and do not have',
        ul: [
          '**Have:** you have used it in a course, project, internship or club. These go on your resume.',
          '**Partly have:** you have touched it. Mention it only where you can back it up with one line of evidence.',
          '**Do not have:** leave it out. A skill you cannot discuss in an interview will cost you more than it earns.',
        ],
      },
      {
        h: 'Step 3: place keywords where they carry meaning',
        p: ['Keywords work best inside real sentences, not only in a skills list. A recruiter who searches for SQL and then reads a bullet showing what you did with it is far more convinced than one who sees a bare list.'],
        ex: [
          'Skills: Python, SQL, Excel, Power BI, Pandas',
          'Project bullet: Cleaned a 40,000-row sales dataset in **Pandas** and built a **Power BI** dashboard that showed monthly revenue by region.',
        ],
        after: ['Use the exact wording of the post when it is accurate, for example Microsoft Excel rather than spreadsheets, since some searches match literally.'],
      },
      {
        h: 'Step 4: use both the full name and the short form',
        p: ['Write Search Engine Optimization (SEO) or Machine Learning (ML) once. Different recruiters search different forms, and spelling out both covers them.'],
      },
      {
        h: 'Avoid keyword stuffing',
        p: ['Repeating a word ten times or hiding white text on a white background is obvious to a person and is flagged by many systems. Mention a skill where it is naturally used, usually two or three times at most across the page.'],
      },
      {
        h: 'Let a tool do the matching',
        p: ['ResumeDeck has a free keyword gap check: paste a job post and it shows which terms your resume already covers, which are only in your Skills section and which are missing, with a one-click way to add the ones that are true. It runs on your own device, with no AI and no upload.'],
      },
    ],
    faq: [
      ['How many keywords should a fresher resume have?', 'There is no magic number. Cover the five to ten most important requirements of each role you apply to, as long as each one is true. Tailor the resume per job rather than loading one resume with everything.'],
      ['Are soft skills like teamwork good keywords?', 'Show them with evidence instead of listing them. Led a team of 4 to organise a college fest of 800 attendees says more than the word leadership in a skills list.'],
      ['Should I copy sentences from the job post?', 'Do not copy whole sentences. Reuse the skill names and terms, then describe your own experience in your own words.'],
    ],
    related: ['tailor-resume-to-job-description', 'how-to-list-skills-on-resume', 'how-to-check-resume-ats-score'],
  },
  {
    slug: 'does-ats-reject-resumes',
    cat: 'ats',
    title: 'Does an ATS Reject Resumes? The Honest Answer',
    h1: 'Does an ATS really reject your resume?',
    desc: 'The claim that ATS software auto-rejects most resumes is mostly a myth. Here is what really happens to your application and what you can control.',
    intro: [
      'You will see claims that a large share of resumes are thrown out by robots before a human sees them. Be careful with those numbers: they are repeated everywhere but rarely come with a source you can check.',
      'What is true is more useful to you. An ATS does not usually reject people on its own, but it can hide you if your resume is read badly or if you fail a rule the employer set.',
    ],
    sections: [
      {
        h: 'What most systems actually do',
        p: ['A typical applicant tracking system stores applications, extracts text, and lets a recruiter search and filter. The recruiter is the one who decides. Rejection normally happens in one of these ways:'],
        ul: [
          '**Knockout questions.** The application form asks for degree, graduation year, location or work authorisation, and a wrong answer filters you out. This is the employer setting a rule, not the resume being misread.',
          '**Search never finds you.** The recruiter searches for a skill, and your resume does not contain it, or it was extracted so badly that it is missing.',
          '**Ranking by match.** Some systems sort applicants by how well they match the job. A person then reads from the top.',
        ],
      },
      {
        h: 'Where resumes really get lost',
        p: ['The common failures are not about fonts. They are practical:'],
        ul: [
          'A resume saved as an image, so no text can be extracted.',
          'Contact details inside a header that was skipped.',
          'The skill the job needs is true for you but never written down.',
          'Hundreds of applicants for one role and a recruiter who spends seconds per resume.',
        ],
      },
      {
        h: 'What to do about it',
        ol: [
          'Make sure the text of your resume is selectable and extracts in a sensible order.',
          'Use the terms from the job post for the skills you really have.',
          'Answer application form questions truthfully and carefully.',
          'Apply early, and for campus or referral routes, use them: a person who vouches for you skips most of this.',
        ],
        after: ['Our guide to [[ats-friendly-resume-format|the ATS-friendly resume format]] covers the file side, and [[ats-resume-keywords|ATS resume keywords]] covers the wording side.'],
      },
      {
        h: 'A healthy way to think about it',
        p: ['Do not write for a robot. Write a clear resume for a busy person, then check that software can read it. That is the whole job.'],
      },
    ],
    faq: [
      ['Is it true that most resumes never reach a human?', 'That specific claim is widely repeated and hard to verify. What is certain is that recruiters often scan many applications quickly, so a clear, relevant resume matters more than any trick.'],
      ['Does the wrong font get you rejected?', 'Not by itself. Standard fonts are safer because text extracts cleanly, but a font choice alone is rarely the reason for a rejection.'],
      ['Can I beat the ATS with white hidden keywords?', 'No. It is easy for systems and people to spot, and it looks dishonest. Put real keywords in real sentences instead.'],
    ],
    related: ['what-is-an-ats-resume', 'ats-resume-keywords', 'resume-mistakes-freshers-make'],
  },
  {
    slug: 'best-fonts-for-ats-resume',
    cat: 'ats',
    title: 'Best Fonts for an ATS Resume (and Sizes to Use)',
    h1: 'The best fonts for an ATS-friendly resume',
    desc: 'Which fonts and sizes work best for an ATS-friendly resume? A short list of safe fonts, recommended sizes, and what to avoid on a fresher resume.',
    intro: [
      'Fonts matter less for ATS than most blogs claim, but they still matter. A common, clean font keeps your text extractable and your resume easy to read on any screen and in print.',
      'Here is a practical shortlist and the settings that go with it.',
    ],
    sections: [
      {
        h: 'Safe fonts for a fresher resume',
        ul: [
          '**Arial or Helvetica:** neutral and readable at small sizes.',
          '**Calibri:** the Word default, friendly and compact.',
          '**Georgia or Times New Roman:** a traditional serif look, good for finance, law and academic roles.',
          '**Inter or Roboto:** modern sans-serifs that are widely available and render well on screens.',
        ],
        after: ['Pick one family for the whole page. Two at most: one for headings, one for body.'],
      },
      {
        h: 'Sizes and spacing that work',
        ul: [
          'Body text: 10 to 11 pt. Go to 12 pt only if you have room.',
          'Section headings: 12 to 14 pt, bold or small caps.',
          'Your name: 18 to 24 pt.',
          'Margins: roughly 1.5 to 2 cm, so nothing is cut off in print.',
          'Line spacing: 1.0 to 1.15, with a clear gap between sections.',
        ],
      },
      {
        h: 'What to avoid',
        ul: [
          'Decorative, script and handwriting fonts. They are hard to read and may extract badly.',
          'Very thin or very condensed fonts that blur when printed.',
          'More than two font families.',
          'All-capitals for long lines. Use it for section headings only.',
          'Fonts the reader may not have, if you send a Word file. Export to PDF so the font is embedded.',
        ],
      },
      {
        h: 'The font is not the real test',
        p: ['The real test is whether the text can be selected and copied out of your file in the right order. A resume in a safe font that was exported as an image will fail, while one in a modern font with real text will pass. See [[how-to-check-resume-ats-score|how to check your resume]] for the quick test.'],
      },
    ],
    faq: [
      ['Is Times New Roman bad for resumes?', 'No. It is safe for ATS. Some people find it dated, so a clean sans-serif or Georgia can look fresher, but readability is what counts.'],
      ['Can I use Google Fonts on my resume?', 'Yes, if the exported PDF embeds the font and the text stays selectable. ResumeDeck exports a PDF with a real text layer, so web fonts are fine.'],
      ['What font size is too small?', 'Under 9.5 pt becomes hard to read in print. If you need to shrink to fit, cut content instead.'],
    ],
    related: ['ats-friendly-resume-format', 'one-page-resume-for-students', 'resume-tables-columns-and-ats'],
  },
  {
    slug: 'pdf-or-word-resume-for-ats',
    cat: 'ats',
    title: 'PDF or Word Resume for ATS: Which Should You Send?',
    h1: 'PDF or Word: which resume file should you send?',
    desc: 'Should you send your resume as PDF or Word for an ATS? Learn when each works, why a text PDF is usually safe, and the file mistakes that cause trouble.',
    intro: [
      'The short answer: send the format the application asks for. If it says nothing, a PDF with real, selectable text is the safest choice for most fresher applications.',
      'Here is why, and the cases where Word is better.',
    ],
    sections: [
      {
        h: 'Why a text PDF is usually the best default',
        ul: [
          'It looks identical on every device. Word files can shift layout, fonts and page breaks.',
          'Modern applicant tracking systems read text-based PDFs well.',
          'It cannot be accidentally edited, and it keeps your design as you built it.',
        ],
      },
      {
        h: 'When to send a Word file instead',
        ul: [
          'The job post or portal says Word or .docx.',
          'A recruiter or consultancy will edit your resume or add their own formatting.',
          'The portal has a known problem reading PDFs. If a form auto-fills fields from your upload and gets it wrong with a PDF, try Word.',
        ],
      },
      {
        h: 'The PDF mistakes that cause real trouble',
        ul: [
          '**Printing a screenshot or scan to PDF.** The result is a picture with no text, which software cannot read.',
          '**Heavy design tools** that outline the text. Always check that you can select the words.',
          '**Password-protected or locked files.** They may fail to upload or parse.',
          '**A huge file.** Keep it under about 1 MB, so it uploads on slow connections.',
        ],
      },
      {
        h: 'How to confirm your PDF has real text',
        ol: [
          'Open the PDF and press Ctrl+A (Cmd+A on Mac), then Ctrl+C.',
          'Paste into Notepad or any plain text editor.',
          'Read it: the words should appear in a sensible order, with your headings and links.',
        ],
        after: ['ResumeDeck builds the PDF with a real text layer and keeps your links clickable, so this check passes by default.'],
      },
      {
        h: 'Name the file well',
        p: ['Use a clear file name such as Firstname_Lastname_Resume.pdf. See [[resume-file-name-and-email-etiquette|resume file name and email etiquette]] for more.'],
      },
    ],
    faq: [
      ['Is a Google Docs resume okay?', 'Yes. Export it as PDF or .docx from Google Docs (File, Download). Both keep real text.'],
      ['Do recruiters prefer PDF or Word?', 'Most are fine with either. Follow the instructions in the job post, and when there are none, send the PDF.'],
      ['Can I upload a resume made in Canva?', 'Only if the export has selectable text. Many Canva exports are fine, but heavy graphic layouts can cause reading problems, so run the copy-and-paste test.'],
    ],
    related: ['ats-friendly-resume-format', 'how-to-check-resume-ats-score', 'resume-file-name-and-email-etiquette'],
  },
  {
    slug: 'resume-tables-columns-and-ats',
    cat: 'ats',
    title: 'Do Tables and Columns Break an ATS Resume?',
    h1: 'Do tables and columns break ATS parsing?',
    desc: 'Tables, columns and sidebars can scramble how an ATS reads your resume. Learn when they are safe, when they are not, and how to test your own file.',
    intro: [
      'Two-column resumes look good, and designers love them. The question is whether software reads them in the right order. The honest answer is that it depends on how the file was made and which system reads it.',
      'For a fresher with one page of content, a single column almost always does the job better. Here is the reasoning, and how to test.',
    ],
    sections: [
      {
        h: 'How text extraction works',
        p: ['A parser pulls text out of the file in the order the pieces are stored, not in the order your eyes see them. In a clean single column, those two orders match. In a layout with a sidebar, the order depends on how the file was built. The sidebar can come first, last, or interleaved with the main text line by line.'],
      },
      {
        h: 'What can go wrong',
        ul: [
          'Your skills list appears in the middle of a job description.',
          'Dates detach from the roles they belong to.',
          'A table cell is read as one long line, merging unrelated items.',
          'Text in a text box or shape is skipped completely.',
        ],
      },
      {
        h: 'When a two-column layout is acceptable',
        ul: [
          'The columns come from a properly built layout, not manual tabs or spaces.',
          'You tested the copy and paste result and it reads in order.',
          'The sidebar holds short, standalone items such as skills and contact details, not dated experience.',
        ],
      },
      {
        h: 'Fresher advice: keep it simple',
        p: ['With a short education section, a couple of projects and one internship, you do not need a sidebar to fit your story on one page. A single column with clear headings is easier to scan and safer to parse. Choose a template with a single-column or ATS-friendly layout and spend your effort on the content.'],
      },
      {
        h: 'Test it in a minute',
        ol: [
          'Export your resume as a PDF.',
          'Select all and copy the text, then paste into a plain text editor.',
          'Check the order of your sections and that each date sits next to the right role.',
        ],
        after: ['The [[how-to-check-resume-ats-score|ATS check guide]] shows a faster way using a tool.'],
      },
    ],
    faq: [
      ['Is it safe to use a table for my skills?', 'A simple table can work, but a plain comma-separated list under a Skills heading is safer and just as readable.'],
      ['Do ATS systems fail on all columns?', 'No. Many modern parsers handle them. The risk is uneven across systems, so the single column is the dependable choice.'],
      ['Does ResumeDeck have single-column templates?', 'Yes. The template list includes plain single-column layouts, and the built-in ATS check shows how your chosen template reads.'],
    ],
    related: ['ats-friendly-resume-format', 'best-fonts-for-ats-resume', 'how-to-check-resume-ats-score'],
  },
  {
    slug: 'how-to-check-resume-ats-score',
    cat: 'ats',
    title: 'How to Check Your Resume ATS Score for Free',
    h1: 'How to check your resume ATS score for free',
    desc: 'Check how an ATS reads your resume without paying. Two simple methods: a copy-and-paste test and a free checker, plus what a good score really means.',
    intro: [
      'Before you apply, it helps to know how software will read your resume. You can find out for free, in a few minutes, with no sign-up.',
      'There are two methods. One needs no tools at all.',
    ],
    sections: [
      {
        h: 'Method 1: the copy-and-paste test',
        ol: [
          'Open your resume PDF.',
          'Select all the text and copy it.',
          'Paste into Notepad or another plain text editor.',
          'Read it from top to bottom. Is your name first, then contact details, then education, experience, projects and skills?',
        ],
        after: ['If the words are missing, jumbled or merged, an ATS will have the same trouble. Fix the layout, then test again.'],
      },
      {
        h: 'Method 2: use a checker that shows what it read',
        p: ['A good checker does the extraction for you and tells you what it found: is your contact info detected, are standard sections present, are the dates readable, is the length sensible. ResumeDeck includes this in the Review tab of the builder. It reads the same text a parser would and runs a set of checks, entirely on your own device.'],
      },
      {
        h: 'What a score should tell you',
        p: ['A score is a rough guide, not a verdict. Use it to find fixable problems, not to chase a perfect number. A high score means your file is readable. It does not mean you are a good match for a particular job. For that, run a keyword comparison against the job post, as described in [[ats-resume-keywords|ATS resume keywords]].'],
      },
      {
        h: 'Common findings and how to fix them',
        ul: [
          '**Missing contact details:** move them into the body of the page and spell out links.',
          '**Sections not found:** rename headings to standard terms such as Education and Experience.',
          '**Text not extractable:** re-export as a PDF with real text, not a picture.',
          '**Too long:** trim to one page. See [[one-page-resume-for-students|the one-page guide]].',
        ],
      },
      {
        h: 'Be careful with checker sites',
        p: ['Many free checkers ask you to sign up, show a score, then hide the fixes behind a payment, and some store your resume. Your resume contains personal details, so prefer a tool that runs locally in your browser and says so clearly.'],
      },
    ],
    faq: [
      ['What is a good ATS score?', 'Treat anything that finds all your sections, contact details and dates correctly as good. The exact number differs between tools and is less important than the issues it lists.'],
      ['Do real employers see my ATS score?', 'No. A checker score is made by the tool you used. Employers use their own systems, which do not share a universal score.'],
      ['Is it safe to upload my resume to a checker?', 'Check the privacy policy. If possible, use a tool that processes the file in your browser without uploading it.'],
    ],
    related: ['what-is-an-ats-resume', 'ats-resume-keywords', 'resume-checklist-before-applying'],
  },
];
