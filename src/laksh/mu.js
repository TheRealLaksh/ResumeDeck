// /laksh-mu: Laksh's resume with the Masters' Union template (label | content table) applied to the same data as
// the standard view, so the two never drift apart. The template itself is `mastersunion` in data/templates.js.
import { classicResume } from './classic';
import { templates } from '../data/templates';

const SUMMARY = "Undergraduate student in Data Science & AI at Masters' Union (class of 2030) and full-stack developer with hands-on experience building and shipping web products. Tech & Growth Intern at ShiftsDeal, a venue-booking marketplace, and Web Developer Intern at Bestow, building company websites with CMS admin panels (both ongoing); freelance developer on the side; four earlier internships in web development, AI/ML and IT. Interested in building practical, deployable products where technology meets business.";

export const muResume = () => {
  const base = classicResume();
  const data = { ...base.data, personal: { ...base.data.personal, summary: SUMMARY } };
  const sectionOrder = base.sectionOrder.map((s) => (s.id === 'summary' ? { ...s, visible: true } : s));
  const config = { ...base.config, ...templates.mastersunion.config, activeTemplate: 'mastersunion', showLinkUrls: false };
  return { data, config, sectionOrder };
};
