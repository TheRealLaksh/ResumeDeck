// Laksh's resume in the Masters' Union format (/laksh-mu). One legal page, one table: label | content | date.
// Facts match content.js (checked 24 Nov 2026). Rules: no phone, no marks, no client names (they belong to the agency),
// no invented numbers. Entry types: `h` heading line (bold, optional right-hand date), `r` italic role line,
// `b` bullet, `t` plain line, `sub` bold sub-heading.
import { PERSON } from './content';

export const MU_HEADER = {
  name: 'LAKSH PRADHWANI',
  links: [
    { label: PERSON.email, href: `mailto:${PERSON.email}` },
    { label: 'LinkedIn', href: PERSON.linkedin },
    { label: 'GitHub', href: PERSON.github },
    { label: 'Portfolio', href: PERSON.portfolio },
  ],
};

const job = (company, desc, role, dates, bullets) => [
  { h: company, desc, date: dates },
  { r: role },
  ...bullets.map((b) => ({ b })),
];

const project = (name, role, date, bullets) => [
  { h: name, date },
  { r: role },
  ...bullets.map((b) => ({ b })),
];

export const MU_ROWS = [
  {
    label: 'Professional Summary',
    items: [{
      i: "Undergraduate student in Data Science & AI at Masters' Union (class of 2030) and full-stack developer with hands-on experience building and shipping web products. Tech & Growth Intern at ShiftsDeal, a venue-booking marketplace; freelance developer delivering company websites with CMS admin panels; four earlier internships in web development, AI/ML and IT. Interested in building practical, deployable products where technology meets business.",
    }],
  },
  {
    label: 'Education',
    items: [
      { h: "Masters' Union" },
      { t: 'Undergraduate Programme in Data Science and AI' },
    ],
    date: ['2026-Present', 'Gurugram'],
  },
  {
    label: '',
    items: [
      { h: 'Sunbeam School Lahartara, Varanasi', desc: '(CBSE) | Class XII: PCM with Computer Science (2024-26)' },
      { h: 'Chinmaya International Residential School, Coimbatore', desc: '(CBSE) | Class X | House Captain' },
    ],
    date: ['2019-2026', 'Varanasi / Coimbatore'],
  },
  {
    label: 'Work Experience',
    items: [
      ...job('ShiftsDeal', '(early-stage venue-booking marketplace)', 'Tech & Growth Intern | Delhi, hybrid', 'Aug 2026 - Present', [
        'Sole engineer: built the marketplace website from scratch and took it to production; it now lists 120+ venues',
        'Manage SEO for the venue listings (page metadata, structured data, Search Console) so listings can be found on Google',
        'Add new features and fixes every day, including Razorpay payments; lead technology collaborations with large brands',
        'Support growth alongside engineering through outreach calls, operations and social media',
      ]),
      ...job('Freelance', '(company websites and web apps)', 'Full-Stack Developer | Self-employed, remote', '2026 - Present', [
        'Delivered 5+ company websites with custom CMS admin panels for agency clients: scoping, build, testing and handover',
        "Added booking flows, dashboards and Razorpay payments; MySQL-backed so each client's team can deploy and run the site",
      ]),
      ...job('Unified Mentor', '(remote internship platform)', 'Full Stack Web Developer Intern | Remote', 'Oct - Dec 2025', [
        'Shipped four production apps in one internship: Helios (music player), Calibridge (calendar exporter), CogniSync (academic appointments and messaging with role-based access) and MarketBridge (local-merchant marketplace)',
      ]),
      ...job('IIT Madras (CODE)', '', 'AI & Algorithmic Problem-Solving Intern | Remote', 'Aug - Oct 2025', [
        'Completed an 8-week programme in data science, data engineering, KNN, K-Means, decision trees and neural networks using NumPy, Pandas and scikit-learn',
      ]),
      ...job('MoreYeahs', '', 'Web Developer Intern | Remote', 'Aug - Sep 2025', [
        'Built GigX, a Django gig marketplace with token-authenticated REST APIs, Seeker and Provider roles, filtering, search and favourites',
      ]),
      ...job('Hotel Kavana', '', 'IT Infrastructure Intern | Varanasi, on-site', 'Jun 2025', [
        '20-day internship in hotel IT: network maintenance, POS integrations and workflow automation',
      ]),
    ],
  },
  {
    label: 'Projects',
    sub: '(Industry/ Academic Projects)',
    items: [
      ...project('ShiftsDeal | Venue-booking marketplace', 'Sole engineer, Tech & Growth Intern (shiftsdeal.com)', '2026', [
        'Designed and built the full platform with payments, listing pages and SEO; 120+ venues listed',
      ]),
      ...project('Portfolio | Personal site and hire page', 'Designer and developer (lakshpradhwani.com)', '2026', [
        'Single-page portfolio with services, starting prices and a hire page that links to the work below',
      ]),
      ...project('Calibridge | Offline-first calendar PWA', 'Personal project, TypeScript (calibridge.lakshpradhwani.com)', '2025', [
        'Framework-free calendar with month, week and agenda views, time zones, recurring events, RFC 5545 .ics import/export and undo/redo',
        'Backed by 43 Playwright end-to-end tests in CI, axe WCAG 2.1 AA audits and a 100 Lighthouse score on mobile',
      ]),
      ...project('ResumeDeck | Free ATS resume builder for freshers', 'Founder and developer (resumedeck.lakshpradhwani.com)', '2025', [
        'React app with 16 templates, click-to-edit, text-based PDF export and a built-in ATS reader that scores any resume',
      ]),
      ...project('Helios | Web music player', 'Personal project (music.lakshpradhwani.com)', '2025', [
        'No frameworks or CDN: waveform seekbar, three visualisers, three-band equaliser, queue, sleep timer and Media Session API',
      ]),
      ...project('Air-writing canvas | Computer vision', 'Personal project, Python', '2025', [
        'Draws, erases and clears a digital canvas from webcam hand gestures using MediaPipe hand tracking and OpenCV',
      ]),
    ],
  },
  {
    label: 'Certifications',
    items: [
      { t: 'Introduction to Data Science and AI | CODE, IIT Madras', date: "Oct'25" },
      { t: 'Cyber Investigator | DeepCytes Cyber Labs', date: "Aug'25" },
      { t: 'Store Listing Certificate | Google Play Academy', date: "Aug'24" },
    ],
  },
  {
    label: 'Leadership',
    items: [
      { h: 'House Captain | Chinmaya International Residential School' },
      { b: 'Led and represented my house of students in day-to-day residential school life, sports and events' },
      { h: 'Organizing Committee Member | Round Square Conference', date: '2025' },
      { b: 'Helped plan and run student-led conference events' },
      { h: 'Campaign Organizer | One Knowledge, One World (Chinmaya Education Movement)', date: '2023' },
      { b: 'Organised a fundraising campaign for education' },
    ],
  },
  {
    label: 'Extra-curricular',
    items: [
      { sub: 'Achievements' },
      { b: 'Regional Winner, VVM National Science Competition 2023; advanced to the national level' },
      { b: '2nd place, Robowars at Impetus 2025; 2nd place, AFS Tech Ramble Web Wizards (website development and deployment)' },
      { b: 'Top 100 nationwide, Sri Shakthi Online Space Quiz 2025' },
      { sub: 'Extra-curricular' },
      { b: 'National-level shooter in 10 m air pistol: State rank 34 and All India Rank 54 (U-17) at Nationals' },
      { b: 'District-level badminton; school first-team volleyball; relay swimming (2nd place)' },
      { b: 'Model UN: CHEMUN, IIMUN, TISB MUN; Press Corps at G20 MUN' },
      { sub: 'Social Impact' },
      { b: 'Volunteer tutor at an orphanage and a home for specially-abled children | 2022' },
      { b: 'Community cleanliness drives and outreach | 2024' },
    ],
  },
  {
    label: 'Skills',
    items: [
      { sub: 'Business Skills: ', t: 'Project Management | Client Scoping & Handover | SEO & Search Console | Outreach & Growth | Brand Partnerships | E-commerce Research | Unit Economics' },
      { sub: 'Technical Skills: ', t: 'Python | SQL | JavaScript | TypeScript | React | Next.js | Node.js | Django | MySQL | PostgreSQL | MongoDB | Firebase | NumPy | Pandas | scikit-learn | OpenCV | Playwright | Git & GitHub | Claude Code & AI-assisted development | Prompt Engineering | Excel | Figma' },
    ],
  },
  {
    label: 'Personal',
    items: [{ t: 'Shooting | Badminton | Tabla | Model UN | Reading business books | Video editing' }],
  },
];
