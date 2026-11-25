export default [
  {
    slug: 'software-engineer-fresher-resume',
    cat: 'roles',
    title: 'Software Engineer Fresher Resume: Format and Tips',
    h1: 'Software engineer fresher resume: what to put on it',
    desc: 'Write a software engineer fresher resume that shows projects, GitHub, core CS skills and internships. Section order, example bullets and mistakes to avoid.',
    intro: [
      'Software hiring for freshers is driven by evidence you can build things. Your resume should make that evidence easy to find: projects, a GitHub profile, coding practice and core computer science fundamentals.',
    ],
    sections: [
      {
        h: 'Section order',
        ol: [
          'Header with GitHub, LinkedIn and portfolio links.',
          'Education with CGPA and relevant subjects.',
          'Projects (two to four, with links).',
          'Experience or internships, if you have them (move above Projects if strong).',
          'Technical skills, grouped.',
          'Achievements: contests, hackathons, ranks.',
        ],
      },
      {
        h: 'What recruiters look for',
        ul: [
          'A working link to code or a live demo.',
          'Data structures, algorithms, DBMS, operating systems and networks listed as core subjects.',
          'Use of Git and basic testing.',
          'A project that solves a real problem, even a small one.',
        ],
      },
      {
        h: 'Sample bullets',
        ex: [
          'Built a REST API in Node.js and Express with JWT authentication and 12 endpoints, documented in Postman.',
          'Reduced database query time by 40% by adding indexes and rewriting two joins in MySQL.',
          'Solved 300+ problems on LeetCode and CodeChef, with a highest contest rating of 1,650.',
        ],
        exLabel: 'Sample facts, replace with yours',
        after: ['Only keep the numbers you can defend in an interview.'],
      },
      {
        h: 'Mistakes to avoid',
        ul: [
          'Listing 25 technologies with no projects behind them.',
          'Leaving out links or sending a repository with no README.',
          'Including only classroom projects that every classmate also built, without anything you extended.',
          'Long objectives and a Declaration.',
        ],
        after: ['See [[technical-skills-section-examples|technical skills examples]] and [[how-to-write-projects-on-resume|how to write projects]] for layouts.'],
      },
    ],
    faq: [
      ['Should I include competitive programming?', 'Yes, briefly: rating or number solved, and any contest ranks. It signals problem-solving skill.'],
      ['Is GitHub required?', 'Not required but strongly useful. Keep your best repositories pinned and your README files clear.'],
      ['How many projects are enough?', 'Two to four good ones. One deployed full project beats several tutorial copies.'],
    ],
    related: ['web-developer-fresher-resume', 'how-to-write-projects-on-resume', 'technical-skills-section-examples'],
  },
  {
    slug: 'data-analyst-fresher-resume',
    cat: 'roles',
    title: 'Data Analyst Fresher Resume: Skills and Examples',
    h1: 'Data analyst fresher resume: skills, projects and examples',
    desc: 'Build a data analyst fresher resume with SQL, Excel, Python and dashboards. See which projects to show, how to word results and what to put first.',
    intro: [
      'A data analyst resume must show three things: you can handle data, you can find something useful in it, and you can explain it. Hiring managers want to see tools and also the question you answered with them.',
    ],
    sections: [
      {
        h: 'Core skills to list',
        ul: [
          'SQL (joins, aggregations, window functions).',
          'Excel (pivot tables, lookups, charts) and Google Sheets.',
          'Python with Pandas and Matplotlib, or R.',
          'A BI tool such as Power BI or Tableau.',
          'Statistics basics: distributions, hypothesis tests, correlation.',
        ],
      },
      {
        h: 'Projects that convince',
        p: ['Use a real public dataset and a real question. Show the steps: clean, analyse, visualise, recommend.'],
        ex: [
          '**Retail Sales Dashboard** | SQL, Power BI: analysed 50,000 transactions from a public dataset and built a 4-page dashboard showing revenue by region and product category.',
          'Identified that three categories produced 62% of revenue and recommended shifting ad spend towards them.',
        ],
        exLabel: 'Sample facts, use your own dataset and results',
        after: ['Link to the notebook or dashboard. Do not invent or alter data: say which dataset you used.'],
      },
      {
        h: 'How to word results',
        ul: [
          'Name the dataset size, for example 50,000 rows.',
          'State the business question you answered.',
          'End with the finding or recommendation, not only the tool.',
        ],
      },
      {
        h: 'Section order',
        p: ['Education, Skills, Projects, then Experience if you have an internship. For analyst roles, putting Projects before Skills is common, since the work proves the tools.'],
      },
    ],
    faq: [
      ['Do I need a portfolio?', 'A small portfolio or GitHub with two or three clean analyses is a strong addition. Link it in your header.'],
      ['Which tool matters most?', 'SQL and Excel are asked about most for entry-level roles. Add Python and one BI tool as extras.'],
      ['Can I use Kaggle datasets?', 'Yes. Cite the dataset and write your own analysis rather than copying a notebook.'],
    ],
    related: ['data-science-student-resume', 'technical-skills-section-examples', 'quantify-resume-bullet-points'],
  },
  {
    slug: 'data-science-student-resume',
    cat: 'roles',
    title: 'Data Science Student Resume: Projects and Format',
    h1: 'Data science student resume: how to stand out',
    desc: 'Create a data science student resume with machine learning projects, math background, tools and results. Includes structure, examples and warnings.',
    intro: [
      'Data science resumes get many applications with the same Titanic and Iris projects. To stand out, show end-to-end work: a clear problem, data you handled, a model with honest evaluation and something you shipped or explained.',
    ],
    sections: [
      {
        h: 'Skills to highlight',
        ul: [
          'Python, SQL, Pandas, NumPy, scikit-learn.',
          'A deep learning library such as PyTorch or TensorFlow if you used one.',
          'Statistics, linear algebra and probability as core subjects.',
          'Tools: Jupyter, Git, Docker basics, a BI or visualisation tool.',
        ],
      },
      {
        h: 'Make projects end to end',
        ol: [
          'State the problem and why it matters.',
          'Describe the data: source, size, issues you cleaned.',
          'Name the models you compared and the metric you used.',
          'Report the result honestly, with the baseline.',
          'Link the code, and a demo or write-up if you can.',
        ],
        ex: ['**Loan Default Predictor** | Python, scikit-learn: compared logistic regression and random forest on 30,000 records, reaching an AUC of 0.82 versus 0.74 for the baseline, with class imbalance handled using stratified sampling.'],
        exLabel: 'Sample facts, replace with yours',
      },
      {
        h: 'Avoid',
        ul: [
          'Listing every algorithm you have heard of.',
          'Reporting accuracy alone on an imbalanced dataset.',
          'Projects copied from a tutorial with no changes.',
          'Claiming expertise in a library you used once.',
        ],
      },
      {
        h: 'Extras that help',
        p: ['Kaggle or competition results, a short blog post explaining a project, research or a published notebook. Link them in the header or in the project line.'],
      },
    ],
    faq: [
      ['Should I include online courses?', 'List one or two relevant ones briefly. A project built with that knowledge matters more.'],
      ['Do I need a Masters for data science?', 'Not for every role. Entry-level analyst and junior data science roles often accept strong projects with a bachelor degree. Requirements vary.'],
      ['How do I show math background?', 'List relevant coursework such as statistics, linear algebra and probability under Education.'],
    ],
    related: ['data-analyst-fresher-resume', 'how-to-write-projects-on-resume', 'technical-skills-section-examples'],
  },
  {
    slug: 'web-developer-fresher-resume',
    cat: 'roles',
    title: 'Web Developer Fresher Resume: Portfolio and Skills',
    h1: 'Web developer fresher resume: show your work, not your tutorials',
    desc: 'A web developer fresher resume needs live links, a portfolio and clear skills in HTML, CSS, JavaScript and a framework. Format, examples and tips.',
    intro: [
      'For web developer roles, your live work is the resume. Recruiters click the links first. Make them easy to find, make sure they load fast and show what you built in plain words.',
    ],
    sections: [
      {
        h: 'Put links at the top',
        p: ['In the header, place your portfolio, GitHub and LinkedIn. Under each project, add a live link and a code link. Test them in a private window before you send.'],
      },
      {
        h: 'Skills to show',
        ul: [
          'HTML, CSS and JavaScript (ES6+), responsive design.',
          'A framework such as React, plus a backend such as Node.js or Django if you build full stack.',
          'Git and GitHub, deployment on a host such as Vercel, Netlify or Cloudflare.',
          'Basics of accessibility and performance, if you have worked on them.',
        ],
      },
      {
        h: 'Project examples',
        ex: [
          '**Local Business Website** | React, Tailwind CSS: built a responsive 5-page site for a local clinic, scoring 95+ on Lighthouse for performance and accessibility.',
          '**Task Manager App** | Node.js, MongoDB: authentication, CRUD and filtering, deployed with 10 testers.',
        ],
        exLabel: 'Sample facts, replace with yours',
        after: ['Real client or community work, even unpaid, is better than another to-do list. Ask permission before naming a client.'],
      },
      {
        h: 'Quality signals recruiters check',
        ul: [
          'The site works on a phone.',
          'The repository has a README with screenshots and setup steps.',
          'Commit history shows steady work, not one giant upload.',
        ],
      },
      {
        h: 'Keep the resume itself plain',
        p: ['Your portfolio can be creative. The resume should be a clean, ATS-friendly single column so software and recruiters can read it. See [[ats-friendly-resume-format|ATS-friendly format]].'],
      },
    ],
    faq: [
      ['Do I need a portfolio website?', 'It helps a lot. A single page with three strong projects and contact details is enough.'],
      ['Should I list all frameworks I tried?', 'No. List the ones you built something with.'],
      ['Is Lighthouse worth mentioning?', 'Only if you measured it yourself and can reproduce the score. Say mobile or desktop.'],
    ],
    related: ['software-engineer-fresher-resume', 'ui-ux-designer-fresher-resume', 'how-to-write-projects-on-resume'],
  },
  {
    slug: 'mechanical-engineer-fresher-resume',
    cat: 'roles',
    title: 'Mechanical Engineer Fresher Resume: Format and Tips',
    h1: 'Mechanical engineer fresher resume: what core companies want',
    desc: 'Write a mechanical engineer fresher resume with CAD tools, projects, internships and workshop skills. Section order, example bullets and what to avoid.',
    intro: [
      'Core companies hiring mechanical engineers look for practical exposure alongside marks: CAD and simulation tools, workshop or plant training, and a project that shows you can design or analyse something.',
    ],
    sections: [
      {
        h: 'What to list',
        ul: [
          '**Software:** AutoCAD, SolidWorks, CATIA, Creo, ANSYS, MATLAB. Only the ones you have used.',
          '**Skills:** GD&T basics, manufacturing processes, thermodynamics, fluid mechanics, material selection.',
          '**Workshop and lab:** lathe, milling, welding, 3D printing, CNC familiarity.',
          '**Certifications:** short courses in CAD, Six Sigma Yellow Belt or similar, if completed.',
        ],
      },
      {
        h: 'Projects and training',
        p: ['Describe the design problem, method and outcome. Include dimensions, loads, efficiency or cost where honest.'],
        ex: [
          '**Gearbox Housing Redesign** | SolidWorks, ANSYS: remodelled the housing and ran static analysis, reducing weight by 12% while keeping a safety factor above 2.',
          '**Industrial Training**, ABC Auto Components (4 weeks): observed CNC machining and assisted in quality checks on 200 parts.',
        ],
        exLabel: 'Sample facts, replace with yours',
      },
      {
        h: 'Section order',
        p: ['Education, Training or Internships, Projects, Skills (with software), Achievements. If your final-year project is strong, move it up.'],
      },
      {
        h: 'Common mistakes',
        ul: [
          'Listing software you only watched a tutorial on.',
          'Describing a project without the numbers behind it.',
          'Forgetting to say whether work was a team or individual effort.',
        ],
        after: ['Use a clean one-page layout: [[one-page-resume-for-students|one-page resume tips]].'],
      },
    ],
    faq: [
      ['Is a CGPA cut-off common for core jobs?', 'Many campus drives have cut-offs, so keep your CGPA accurate and visible.'],
      ['Should I include a drawing or CAD image?', 'Not on the resume. Link to a portfolio or a PDF of drawings.'],
      ['Do I need programming skills?', 'Basic Python, C or MATLAB helps in many roles, and is worth listing if you have used it.'],
    ],
    related: ['electrical-and-electronics-fresher-resume', 'resume-for-campus-placements', 'how-to-list-internship-on-resume'],
  },
  {
    slug: 'electrical-and-electronics-fresher-resume',
    cat: 'roles',
    title: 'Electrical and Electronics Fresher Resume Guide',
    h1: 'Electrical and electronics engineer fresher resume',
    desc: 'Create an electrical or electronics fresher resume with circuit design, embedded and PLC skills, lab projects and training. Layout, examples and tips.',
    intro: [
      'EEE and ECE resumes should show a blend of theory and hands-on work: circuits you designed, boards you programmed, and tools you used in the lab or on site.',
    ],
    sections: [
      {
        h: 'Skills to list',
        ul: [
          '**Software:** MATLAB, Simulink, Proteus, Multisim, LTspice, KiCad or Eagle, AutoCAD Electrical.',
          '**Programming:** C, Embedded C, Python, Verilog or VHDL for ECE.',
          '**Hardware:** Arduino, ESP32, STM32, Raspberry Pi, sensors, PCB design, soldering.',
          '**Industrial:** PLC and SCADA basics, power systems, motor drives.',
        ],
      },
      {
        h: 'Project examples',
        ex: [
          '**Smart Energy Meter** | ESP32, C, MQTT: built a meter that logs consumption every minute and displays it on a web dashboard, tested over 7 days.',
          '**Inverter Simulation** | MATLAB Simulink: modelled a single-phase inverter and reduced harmonic distortion from 8% to 3% using a filter.',
        ],
        exLabel: 'Sample facts, replace with yours',
        after: ['A photo of the hardware or a short demo video linked from the line can make the project real to a recruiter.'],
      },
      {
        h: 'Training and internships',
        p: ['Include industrial visits and training at power plants, substations, manufacturing units or tech companies. State the duration and what you did, not just where you went.'],
      },
      {
        h: 'Layout',
        p: ['Education, Training, Projects, Skills, Achievements. One page, single column. For IT-leaning roles, add a GitHub link.'],
      },
    ],
    faq: [
      ['Should I include IoT projects for non-IT jobs?', 'Yes. They show initiative and can be relevant to automation, power and embedded roles.'],
      ['What if I have no internship?', 'Use projects, lab work and short courses. See [[resume-for-freshers-with-no-experience|no experience resume]].'],
      ['How do I show circuit design?', 'Name the tool, the circuit and the result, and link to a schematic or demo if you can.'],
    ],
    related: ['mechanical-engineer-fresher-resume', 'software-engineer-fresher-resume', 'how-to-write-projects-on-resume'],
  },
  {
    slug: 'bba-student-resume',
    cat: 'roles',
    title: 'BBA Student Resume: Format, Skills and Examples',
    h1: 'BBA student resume: how to show business potential',
    desc: 'A BBA student resume should show leadership, internships, projects and basic business tools. Section order, example bullets and what to avoid.',
    intro: [
      'BBA resumes compete on evidence of initiative: events you led, internships you completed, cases you analysed and tools you can use. Marks matter, but practical results make you memorable.',
    ],
    sections: [
      {
        h: 'Section order',
        ol: [
          'Header and a short summary naming your specialisation, for example Marketing or Finance.',
          'Education.',
          'Internships and live projects.',
          'Leadership and extracurriculars (clubs, fests, committees).',
          'Skills: Excel, PowerPoint, analytics, a CRM or design tool.',
          'Achievements and certifications.',
        ],
      },
      {
        h: 'Example bullets',
        ex: [
          'Led a 10-member marketing team for a college fest, securing 5 sponsors worth Rs 80,000.',
          'Surveyed 120 customers for a local cafe and recommended a combo menu, adopted in the following month.',
          'Built a pricing comparison in Excel covering 25 competitors for a case competition, reaching the final round.',
        ],
        exLabel: 'Sample facts, replace with yours',
      },
      {
        h: 'Skills that employers expect',
        ul: ['Excel (formulas, pivot tables), PowerPoint, data analysis basics.', 'Communication, presentation and negotiation, shown through activities.', 'Domain tools: Google Analytics, Tally, Canva, CRM basics.'],
      },
      {
        h: 'Specialise',
        p: ['Tailor the top lines to the track: marketing, finance, HR, operations or entrepreneurship. A recruiter should see your direction within five seconds.'],
        after: ['See [[mba-fresher-resume|MBA fresher resume]] and [[digital-marketing-fresher-resume|digital marketing fresher resume]] for related formats.'],
      },
    ],
    faq: [
      ['Is CGPA important for BBA?', 'It matters for campus drives and top firms, but experience and leadership often decide the shortlist among similar scores.'],
      ['Should I include family business experience?', 'Yes, if you did real work. Describe your tasks and results clearly.'],
      ['Do I need certifications?', 'One or two relevant ones, such as Excel or Google Analytics, can help.'],
    ],
    related: ['mba-fresher-resume', 'bcom-fresher-resume', 'achievements-and-extracurriculars-on-resume'],
  },
];
