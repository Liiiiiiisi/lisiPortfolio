import { legacyEn } from './legacyEn';

/**
 * English UI copy. All user-facing strings live here or in data/projects.ts.
 * Placeholder copy — replace freely; keys are the stable interface.
 */
export const en = {
  ...legacyEn,
  'skip.toContent': 'Skip to content',

  'nav.name': 'Lisi Xie',
  'nav.work': 'Work',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.langToggle': '中文',
  'nav.langToggleAria': 'Switch language to Chinese',

  // Floating dock navigation — labels are fixed by design (Projects / About / Labs).
  'floatingNav.label': 'Primary',
  'floatingNav.projects': 'Projects',
  'floatingNav.about': 'About',
  'floatingNav.lab': 'Labs',

  'lab.title': 'Labs',
  'lab.intro':
    'Experiments, prototypes, interaction studies and technical tests — smaller work in progress that sits outside the featured projects.',
  'lab.empty': 'Nothing published here yet. Check back soon.',
  'lab.discipline.interaction': 'Interaction Study',
  'lab.discipline.motion': 'Motion Study',
  'lab.discipline.editorial': 'Editorial',
  'lab.discipline.technical': 'Technical Test',
  'lab.discipline.archive': 'Archive',
  'lab.backShort': 'Labs',
  'lab.backToLabs': 'Back to Labs',
  'lab.nextStudy': 'Next study',
  'lab.viewLive': 'View live',
  'lab.close': 'Close',

  'hero.name': 'Lisi Xie',
  'hero.location': 'Shanghai, China',
  // Centralized email placeholder — replace once, everywhere, when the
  // public address is decided. Do not guess an address.
  'hero.email': 'lxie082@outlook.com',
  'hero.title1': 'Interactive Designer',
  'hero.title2': '& Creative Technologist',
  'hero.cardsLabel': 'Selected projects',
  'highlights.label': 'Selected Highlights',
  'highlights.item1': '2× XRDC Award Winner',
  'highlights.item2': 'MA Virtual & Augmented Reality, Distinction',
  'highlights.item3': 'BFA Design (Honors), SVA',
  'hero.role1': 'Creative Technologist',
  'hero.role2': '& Interactive Designer',
  'hero.statement':
    'I design and prototype responsive experiences across XR, AI and real-time media.',
  'hero.award': '2× XRDC Award Winner',
  'hero.viewWork': 'View work',
  'hero.showreel': 'Showreel',
  'hero.showreelSoon': 'Coming soon',
  'hero.previewLabel': 'Featured project preview',
  'hero.previewHint': 'Jump to project',

  'work.title': 'Featured Work',
  'work.intro': 'Four selected projects across XR, AI and real-time media.',
  'work.viewProject': 'View project',
  'work.prevProject': 'Previous project',
  'work.nextProject': 'Next project',
  'work.caseStudy': 'View case study',
  'work.seeMore': 'See more',
  // {name} is replaced with the project title at render time.
  'work.viewCaseStudy': 'View {name} case study',
  'work.showInShowcase': 'Show {name} in project showcase',

  'moreWork.label': 'More Work',
  'moreWork.visitSite': 'Visit site',

  'meta.role': 'Role',
  'meta.focus': 'Focus',
  'meta.outcome': 'Outcome',

  // Case-study template — section labels are numbered by position.
  'case.section.challenge': 'The Challenge',
  'case.section.experience': 'Key Experience',
  'case.section.howItWorks': 'How It Works',
  'case.section.build': 'Build / Prototype',
  'case.section.contribution': 'My Contribution',
  'case.section.outcome': 'Outcome',
  'case.meta.role': 'Role',
  'case.meta.team': 'Team',
  'case.meta.platform': 'Platform',
  'case.meta.year': 'Year',
  'case.meta.outcome': 'Outcome',
  'case.credits': 'Credits',
  'case.nextProject': 'Next Project',
  'case.scrollDown': 'Scroll down',
  'case.backToIndex': 'All projects',

  'about.title': 'About',
  'about.body1':
    'I am a creative technologist and interactive designer working across XR, AI-assisted interfaces and real-time media. I move ideas from concept to testable build — designing the interaction first, then prototyping and developing it myself.',
  'about.body2':
    'Recent work spans hand-tracked learning tools, narrative VR and multimodal AI utilities, recognised with two XRDC awards. I am open to roles and collaborations in XR, creative tooling and interactive product design.',

  'contact.title': 'Contact',
  'contact.lead':
    'For roles, collaborations or a walkthrough of the work, the fastest way to reach me is email.',
  'contact.emailLabel': 'Email me at',
  'contact.emailAria': 'Email Lisi Xie',
  'contact.rights': 'All rights reserved © 2026 Lisi Xie',

  'footer.copyright': '© 2026 Lisi Xie',
  'footer.note': 'Experimental landing-page prototype',
} as const;

export type TranslationKey = keyof typeof en;
