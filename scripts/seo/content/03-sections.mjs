export default [
  {
    slug: 'how-to-list-skills-on-resume',
    cat: 'sections',
    title: 'How to List Skills on a Resume (Freshers)',
    h1: 'How to list skills on a resume',
    desc: 'How to write a skills section for a fresher resume: what to include, how to group skills, how to show proficiency honestly, and what to avoid.',
    intro: [
      'The skills section is the part recruiters and software search first. It should be short, grouped and honest. A long list of tools you used once adds noise and invites tough interview questions.',
    ],
    sections: [
      {
        h: 'Group skills by type',
        p: ['Grouping makes a list scannable and helps both people and parsers.'],
        ex: [
          '**Languages:** Python, Java, SQL, JavaScript',
          '**Frameworks and libraries:** React, Node.js, Pandas, Flask',
          '**Tools:** Git, GitHub, VS Code, Figma, Excel, Power BI',
          '**Core subjects:** Data Structures, DBMS, Operating Systems',
        ],
        exLabel: 'Example for a CS fresher',
      },
      {
        h: 'What to include',
        ul: [
          'Skills named in the job post that you honestly have.',
          'Tools you used in a project, internship or course and could discuss.',
          'Languages with a level only if it adds clarity, such as English (fluent), Hindi (native).',
        ],
      },
      {
        h: 'What to leave out',
        ul: [
          'Microsoft Word, internet browsing and other things everyone has.',
          'Skills you rated yourself on with bars or stars. They are subjective and read badly in text.',
          'Anything you cannot answer a basic question about.',
          'Soft skills as bare words, such as hard-working. Show them in bullets instead.',
        ],
      },
      {
        h: 'Back skills up with evidence',
        p: ['A skill that also appears in a project or internship bullet is far more believable than one that appears only in a list. Check each key skill shows up somewhere else on the page. See [[ats-resume-keywords|ATS resume keywords]] for matching skills to a job post.'],
      },
      {
        h: 'Order and length',
        p: ['Put the skills the job asks for first. Keep the whole section to four to six lines. If it grows beyond that, trim.'],
      },
    ],
    faq: [
      ['Should I show skill levels like beginner and expert?', 'Text labels such as familiar or proficient are acceptable if used sparingly, but they are subjective. Evidence in projects is more convincing than a level.'],
      ['How many skills should a fresher list?', 'Eight to fifteen well-chosen ones, grouped, is plenty.'],
      ['Where should the skills section go?', 'Below Education and Projects for most freshers, or higher up for technical roles where the stack is the main signal.'],
    ],
    related: ['technical-skills-section-examples', 'ats-resume-keywords', 'how-to-write-projects-on-resume'],
  },
  {
    slug: 'technical-skills-section-examples',
    cat: 'sections',
    title: 'Technical Skills Section Examples for Freshers',
    h1: 'Technical skills section examples for freshers',
    desc: 'Copy the structure of these technical skills section examples for software, data, electronics, mechanical, design and marketing freshers.',
    intro: [
      'The structure of a technical skills section changes by field. Below are layouts you can adapt. Replace the items with your own, and delete anything you cannot discuss.',
    ],
    sections: [
      {
        h: 'Software developer',
        ex: [
          '**Languages:** Java, Python, JavaScript, SQL',
          '**Web:** React, Node.js, Express, HTML, CSS, REST APIs',
          '**Databases:** MySQL, MongoDB',
          '**Tools:** Git, GitHub, Postman, VS Code',
        ],
      },
      {
        h: 'Data analyst or data science',
        ex: [
          '**Languages:** Python, SQL, R',
          '**Libraries:** Pandas, NumPy, scikit-learn, Matplotlib',
          '**Tools:** Excel, Power BI or Tableau, Jupyter, Git',
          '**Concepts:** Data cleaning, EDA, regression, A/B testing basics',
        ],
      },
      {
        h: 'Electrical, electronics and mechanical',
        ex: [
          '**Software:** MATLAB, AutoCAD, SolidWorks, Proteus',
          '**Programming:** C, Embedded C, Python (basics)',
          '**Hardware:** Arduino, Raspberry Pi, PLC basics, soldering',
          '**Concepts:** Thermodynamics, CAD design, circuit analysis',
        ],
        after: ['Match the software to the roles you apply for. A core company will care about named tools more than general headings.'],
      },
      {
        h: 'Marketing, design and business',
        ex: [
          '**Marketing:** SEO basics, Google Analytics, Meta Ads Manager, email campaigns',
          '**Design:** Figma, Canva, Photoshop',
          '**Business:** Excel, PowerPoint, market research, financial modelling basics',
        ],
      },
      {
        h: 'Rules that apply to all of them',
        ul: [
          'Only list what you can answer a basic question about.',
          'Use the exact name of tools as the job post writes them.',
          'Keep it to three to five lines, ordered by relevance.',
        ],
        after: ['See [[how-to-list-skills-on-resume|how to list skills]] for the principles behind these layouts.'],
      },
    ],
    faq: [
      ['Should I include soft skills in the technical section?', 'Keep it technical. Show soft skills through leadership and project bullets.'],
      ['Can I list a skill I am currently learning?', 'Yes, if you say so, for example Learning: Docker. Be ready to discuss what you have done so far.'],
      ['Do I list my CGPA subjects here?', 'Only core subjects relevant to the role, and only if you lack projects to show them.'],
    ],
    related: ['how-to-list-skills-on-resume', 'software-engineer-fresher-resume', 'data-analyst-fresher-resume'],
  },
  {
    slug: 'how-to-write-projects-on-resume',
    cat: 'sections',
    title: 'How to Write Projects on a Resume (With Examples)',
    h1: 'How to write projects on your resume',
    desc: 'Show projects the way recruiters want to read them: problem, tools, your role and result. Examples and a simple template for fresher resumes.',
    intro: [
      'For a fresher, projects are the closest thing to work experience. A good project entry shows that you can start something, choose tools, finish it and measure the result.',
    ],
    sections: [
      {
        h: 'The structure of a good project entry',
        ol: [
          '**Name and one-line description:** what it is and who it is for.',
          '**Tools:** the stack or software used.',
          '**Your role:** especially in a team project.',
          '**Result:** a number, a link or a clear outcome.',
        ],
      },
      {
        h: 'Example',
        ex: [
          '**Student Attendance Tracker** | React, Node.js, MongoDB | GitHub link',
          'Built a web app that lets teachers mark attendance in under 30 seconds, replacing paper registers for a class of 60.',
          'Designed REST APIs and a dashboard showing monthly attendance by student.',
          'Deployed on a free cloud host and tested with 10 classmates.',
        ],
        exLabel: 'Sample wording',
      },
      {
        h: 'Choose the right projects',
        ul: [
          'Pick two to four that match the job. Drop old or basic ones if you have stronger ones.',
          'A deployed project with a link beats one that only lives on your laptop.',
          'A personal or class project is fine. Say honestly whether it was individual or group.',
        ],
      },
      {
        h: 'Outside software',
        p: ['Mechanical, electrical, marketing and design students can use the same format: a lab project, a campaign, a case study, a design file. State the problem, the method, the tools and the outcome.'],
        ex: ['**Solar Water Heater Prototype** | SolidWorks, MATLAB: modelled the collector and tested three designs, raising output temperature by 8 degrees C over the baseline.'],
        exLabel: 'Non-software example (sample facts)',
      },
      {
        h: 'Add links',
        p: ['Link to the code, a live demo, a report or a design file. Make sure the link works and the repository has a clear README. A recruiter who opens it will form an opinion in seconds.'],
      },
    ],
    faq: [
      ['How many projects should a fresher list?', 'Two to four. Quality and relevance matter more than count.'],
      ['Can I list a tutorial project?', 'Only if you changed or extended it significantly. Say what you added.'],
      ['Should I include team projects?', 'Yes, and state your part clearly so the reader knows what you personally did.'],
    ],
    related: ['resume-bullet-point-formula', 'resume-for-freshers-with-no-experience', 'software-engineer-fresher-resume'],
  },
  {
    slug: 'how-to-list-internship-on-resume',
    cat: 'sections',
    title: 'How to List an Internship on Your Resume',
    h1: 'How to list an internship on your resume',
    desc: 'Format an internship entry the right way: title, company, dates, and results-focused bullets. Works for paid, unpaid, remote and short internships.',
    intro: [
      'An internship is real experience and usually your strongest item as a fresher. It belongs near the top. A good entry says where you worked, what you did and what changed because of it.',
    ],
    sections: [
      {
        h: 'The format',
        ex: [
          '**Marketing Intern**, ABC Pvt Ltd, Delhi (Jun 2026 to Aug 2026)',
          'Ran the weekly email newsletter for 3,500 subscribers and raised the open rate from 19% to 27%.',
          'Researched 40 competitors and summarised pricing in a sheet used by the sales team.',
          'Wrote 12 blog posts targeting search terms, six of which reached the first page of results.',
        ],
        exLabel: 'Sample facts, replace with yours',
      },
      {
        h: 'Details to include',
        ul: [
          'Exact job title as given, for example Web Development Intern.',
          'Company name and city, or Remote.',
          'Start and end months. Write Present if it is ongoing.',
          'Two to four bullets that start with an action verb and show an outcome.',
        ],
      },
      {
        h: 'Unpaid, short and remote internships',
        p: ['Pay and length do not decide whether an experience counts. A two-week internship can be listed if you did real work, and a remote internship should say Remote. If it was very short, keep it to one or two lines.'],
      },
      {
        h: 'If the internship was weak',
        p: ['Focus on what you learned and the tasks you did. Write only what is true and avoid exaggeration. A recruiter may call your supervisor, and an interviewer will ask for details.'],
      },
      {
        h: 'Order',
        p: ['List internships in reverse chronological order, newest first. If you have a strong internship, put the section above Education.'],
      },
    ],
    faq: [
      ['Can I list an internship that has not ended yet?', 'Yes. Write the start date and Present as the end date.'],
      ['Do I need a certificate to list an internship?', 'Not on the resume, but keep your offer letter or certificate handy for verification.'],
      ['Should I name the supervisor?', 'No. Names of referees are shared only when asked.'],
    ],
    related: ['resume-bullet-point-formula', 'quantify-resume-bullet-points', 'internship-resume-for-college-students'],
  },
  {
    slug: 'achievements-and-extracurriculars-on-resume',
    cat: 'sections',
    title: 'Achievements and Extracurriculars on a Resume',
    h1: 'What to write under achievements and extracurriculars',
    desc: 'Which achievements, awards, clubs and certifications belong on a fresher resume, how to word them and which ones to leave out.',
    intro: [
      'Achievements and activities show what your marks cannot: initiative, leadership, teamwork and drive. They are also useful when you lack work experience. Keep only the ones that support your target role.',
    ],
    sections: [
      {
        h: 'What counts',
        ul: [
          'Hackathon or contest wins, finalist places and ranks, with the number of participants if impressive.',
          'Scholarships and academic honours.',
          'Leadership roles in clubs, fests, sports teams or societies.',
          'Published work, patents, papers or open-source contributions.',
          'Relevant certifications from recognised providers.',
          'Volunteering with real responsibility.',
        ],
      },
      {
        h: 'How to word them',
        ex: [
          'Winner, Smart India Hackathon internal round (team of 5, 120 teams).',
          'Secretary, Coding Club: organised 6 workshops with 300+ attendees.',
          'State-level badminton player, 2024 and 2025.',
          'Scholarship: Merit scholarship for top 5% of the batch.',
        ],
        exLabel: 'Sample wording (use only true facts)',
        after: ['Add scale wherever you can: how many people, how many teams, how much money, how many events.'],
      },
      {
        h: 'What to skip',
        ul: [
          'Participation certificates with no ranking or effort behind them.',
          'School-level awards if you have a degree and stronger recent ones.',
          'Long lists of every course you ever took.',
          'Hobbies with no link to the job.',
        ],
      },
      {
        h: 'How much space',
        p: ['Four to six lines is normal. If your page is crowded, keep two or three of the strongest and drop the rest.'],
      },
    ],
    faq: [
      ['Are hobbies worth listing?', 'Only a hobby that supports the role or shows a notable achievement, such as a state-level sport.'],
      ['Do online course certificates matter?', 'They show initiative but carry less weight than a project. Add one line on what you built.'],
      ['Should I include NCC or NSS?', 'Yes, if you held a rank or role or did meaningful work. Describe what you did.'],
    ],
    related: ['resume-for-freshers-with-no-experience', 'how-to-write-projects-on-resume', 'resume-for-campus-placements'],
  },
  {
    slug: 'resume-action-verbs-for-freshers',
    cat: 'sections',
    title: 'Resume Action Verbs for Freshers (Sorted by Skill)',
    h1: 'Resume action verbs for freshers',
    desc: 'Replace weak phrases like responsible for with strong action verbs. Lists grouped by skill, with examples for technical, business and creative resumes.',
    intro: [
      'Every bullet point should start with a verb that says exactly what you did. Strong verbs make a bullet shorter and clearer. Weak phrases like responsible for or worked on make the reader guess.',
    ],
    sections: [
      {
        h: 'Building and technical work',
        ul: ['Built, developed, designed, implemented, programmed, deployed, automated, tested, debugged, integrated, optimised, configured.'],
        ex: ['Automated a weekly report in Python, saving the team about 3 hours of manual work.'],
      },
      {
        h: 'Analysis and research',
        ul: ['Analysed, evaluated, investigated, surveyed, modelled, forecast, compared, identified, quantified, validated.'],
        ex: ['Analysed 12 months of sales data in Excel and identified three products that made up 60% of revenue.'],
      },
      {
        h: 'Leadership and teamwork',
        ul: ['Led, coordinated, organised, mentored, managed, delegated, supervised, recruited, trained, collaborated.'],
        ex: ['Led a team of 6 to organise a college tech fest with 40 events.'],
      },
      {
        h: 'Communication and sales',
        ul: ['Presented, pitched, negotiated, persuaded, wrote, edited, promoted, advised, handled, resolved.'],
        ex: ['Pitched to 25 local businesses and signed 6 as sponsors.'],
      },
      {
        h: 'Improvement and results',
        ul: ['Improved, increased, reduced, streamlined, accelerated, simplified, expanded, strengthened, launched, delivered.'],
        ex: ['Reduced page load time from 4.2 to 1.8 seconds by compressing images and lazy loading.'],
      },
      {
        h: 'Tips for using them',
        ol: [
          'Use past tense for finished work and present tense for current roles.',
          'Do not repeat the same verb in one section.',
          'Pair every verb with a result when you can: see [[quantify-resume-bullet-points|quantify your bullet points]].',
        ],
      },
    ],
    faq: [
      ['Which verbs should I avoid?', 'Responsible for, worked on, helped with and assisted in say little. Replace them with what you actually did.'],
      ['Can I use fancy words to sound impressive?', 'Simple, accurate verbs are better. Leveraged and spearheaded sound inflated when the task was small.'],
      ['Should bullets start with I?', 'No. Start directly with the verb.'],
    ],
    related: ['resume-bullet-point-formula', 'quantify-resume-bullet-points', 'how-to-list-internship-on-resume'],
  },
  {
    slug: 'quantify-resume-bullet-points',
    cat: 'sections',
    title: 'How to Quantify Resume Bullet Points Honestly',
    h1: 'How to add numbers to your resume without making them up',
    desc: 'Numbers make bullets credible. Learn how freshers can find honest metrics from projects, internships and clubs, and what to do when there are none.',
    intro: [
      'A number gives a reader a sense of scale. Managed a social page is vague. Managed a page of 2,100 followers and posted three times a week is concrete. You do not need big figures. You need true ones.',
    ],
    sections: [
      {
        h: 'Where to find numbers',
        ul: [
          '**People:** team size, audience, users, attendees, customers, classmates.',
          '**Volume:** posts, rows of data, files, orders, calls, lines of code.',
          '**Time:** days to deliver, hours saved, number of weeks.',
          '**Money:** budget handled, sponsorship raised, cost reduced.',
          '**Change:** from X to Y, such as followers 800 to 2,100.',
          '**Rank:** position among entrants, such as 3rd of 120 teams.',
        ],
      },
      {
        h: 'Before and after',
        ex: [
          'Before: Created a dashboard for the sales team.',
          'After: Created a Power BI dashboard tracking 5 KPIs for a 12-person sales team, used in weekly reviews.',
          'Before: Helped organise a college event.',
          'After: Coordinated logistics for a college event with 600 attendees and 15 volunteers.',
        ],
        exLabel: 'Sample facts, adapt yours',
      },
      {
        h: 'When there is no number',
        p: ['Describe scope instead: who it was for, how often, how long, what it replaced. Built a booking form used by every student in a 60-person class each month is concrete without any percentage.'],
      },
      {
        h: 'Never invent them',
        p: ['Interviewers ask how a figure was measured. If you cannot explain it, remove it. Round honestly, and write about 20 or more than 100 instead of an exact figure you do not know.'],
      },
    ],
    faq: [
      ['What if my project had no users?', 'Use technical scale: number of features, API endpoints, test cases, records handled, response time.'],
      ['Is it fine to use percentages?', 'Yes, when you know the baseline. A percentage with no baseline can sound empty.'],
      ['How many bullets should have numbers?', 'Aim for at least half, but accuracy matters more than quantity.'],
    ],
    related: ['resume-bullet-point-formula', 'resume-action-verbs-for-freshers', 'how-to-write-projects-on-resume'],
  },
  {
    slug: 'resume-bullet-point-formula',
    cat: 'sections',
    title: 'Resume Bullet Point Formula: Write Bullets That Get Read',
    h1: 'A simple formula for strong resume bullet points',
    desc: 'Use the action, task, result formula to write clear resume bullets. With before and after examples for freshers in tech, business and creative roles.',
    intro: [
      'A good bullet answers one question: what did you do, and what happened? The easiest way to write it is a three-part formula. It works for jobs, internships, projects and activities.',
    ],
    sections: [
      {
        h: 'The formula',
        p: ['**Action verb + what you did + how or with what + result.**'],
        ex: [
          'Built a [what] using [tools], which [result].',
          'Built an inventory tracker using Google Sheets and Apps Script, which cut stock-count time from 2 hours to 20 minutes.',
        ],
        exLabel: 'Template and example',
      },
      {
        h: 'Examples across fields',
        ex: [
          'Designed a 3-page brochure in Canva for a local clinic, used in 200 printed copies.',
          'Wrote 15 product descriptions that lifted add-to-cart clicks by an estimated 10% on the shop page.',
          'Reconciled 120 vendor invoices in Tally, flagging 7 mismatches before payment.',
          'Developed a Flask API with 6 endpoints and unit tests, covering 80% of the code.',
        ],
        exLabel: 'Sample bullets (facts are illustrative)',
      },
      {
        h: 'Rules of thumb',
        ul: [
          'One idea per bullet, one to two lines long.',
          'Start with a strong verb. See [[resume-action-verbs-for-freshers|action verbs]].',
          'Put the result at the end, where the eye lands.',
          'Use the same tense and punctuation in every bullet.',
          'Three or four bullets per role, with the best one first.',
        ],
      },
      {
        h: 'Common mistakes',
        ul: [
          'Describing a duty instead of an outcome: Responsible for social media.',
          'Using vague words such as various, many, several or good.',
          'Stuffing tool names with no context.',
          'Writing paragraphs. Break them into bullets.',
        ],
        after: ['Add real numbers where possible: [[quantify-resume-bullet-points|how to quantify your bullets]].'],
      },
    ],
    faq: [
      ['How many bullets per job?', 'Three or four for important roles, one or two for minor ones.'],
      ['Should bullets end with a full stop?', 'Either is fine. Choose one style and keep it throughout.'],
      ['Can I use a bullet without a result?', 'Yes, if the action itself is meaningful, but a result makes it stronger.'],
    ],
    related: ['quantify-resume-bullet-points', 'resume-action-verbs-for-freshers', 'how-to-write-projects-on-resume'],
  },
];
