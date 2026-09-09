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
  'case.meta.tools': 'Tools',
  'case.credits': 'Credits',
  'case.nextProject': 'Next Project',
  'case.allProjects': 'All Projects',
  'case.scrollDown': 'Scroll down',
  'case.backToIndex': 'All projects',

  'about.title': 'About',
  'about.body1':
    'I am a creative technologist and interaction designer working across digital products, spatial interfaces, real-time media and AI-assisted experiences.',
  'about.body2':
    'I move ideas from concept to testable build — shaping the interaction first, then prototyping and developing the experience hands-on.',
  'about.body3':
    "Recent work spans interactive products, mixed-reality learning tools, real-time 3D experiences and AI-assisted workflows. I\u2019m interested in the space where design, technology and product thinking meet.",

  // About — Practice (tool/logo-led skills section, replaces the old
  // plain-text resume.skills.featuresText line on the About page only).
  // Positioning: interaction/product first, XR is one capability among
  // several — never the lead category. See data/practice.ts.
  'about.practice.heading': 'Practice',
  'about.practice.group.interaction.heading': 'Interaction & Product',
  'about.practice.group.interaction.capabilities':
    'UI/UX · Interaction Design · Spatial UI · Gesture Systems · Prototyping',
  'about.practice.group.creativeTech.heading': 'Creative Technology',
  'about.practice.group.creativeTech.capabilities': 'TouchDesigner · 8th Wall',
  'about.practice.group.realtime.heading': 'Real-time & 3D',
  'about.practice.group.realtime.capabilities': 'Animation · VFX · Cinemachine',
  'about.practice.group.ai.heading': 'AI-assisted Workflows',

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
