import type { ProjectCatalogEntry } from '@/types/project';

export const projectCatalog: readonly ProjectCatalogEntry[] = [
  {
    id: 'signie', slug: 'signie', order: 1, placement: 'featured',
    title: 'Signie', titleZh: 'Signie',
    category: 'Mixed Reality ASL Learning & Live Translation System',
    categoryZh: '混合现实 ASL 学习与实时翻译系统',
    description: 'An immersive ASL learning and translation system built around real-time hand tracking, micro-gestures and AI-driven feedback.',
    descriptionZh: '一个围绕实时手部追踪、微手势与 AI 反馈构建的沉浸式 ASL 学习与翻译系统。',
    role: 'Interaction design · XR development · Prototyping', roleZh: '交互设计 · XR 开发 · 原型',
    focus: 'Hand tracking · Learning UX · AI translation', focusZh: '手部追踪 · 学习体验 · AI 翻译',
    outcome: '2× XRDC 2025 award winner', outcomeZh: 'XRDC 2025 两项奖项',
    cover: '/projects/signie/images/signie_small_card_v1.png', preview: '/projects/signie/videos/preview.mp4', previewPoster: '/projects/signie/videos/preview-poster.webp',
    heroSlot: 'center', heroMobileOrder: 3,
  },
  {
    id: 'guardian-guide', slug: 'guardian-guide', order: 2, placement: 'featured',
    title: "Guardian's Guide", titleZh: '守护者指南', category: 'VR Training Experience for Caregivers of Autistic Children', categoryZh: '自闭症儿童护理人员 VR 培训体验',
    description: 'A practice-based VR learning experience for new caregivers supporting a non-verbal autistic child.', descriptionZh: '一款面向新手护理者的实践导向 VR 学习体验。',
    role: 'Interaction design · Unity development', roleZh: '交互设计 · Unity 开发', focus: 'Accessible onboarding · Rule-based learning', focusZh: '可访问引导 · 规则导向学习',
    cover: '/projects/vr-education/images/cover.webp', preview: '/projects/vr-education/videos/preview.mp4', previewPoster: '/projects/vr-education/videos/preview-poster.webp',
    heroSlot: 'left', heroMobileOrder: 1,
  },
  {
    id: 'canopy-of-echo', slug: 'canopy-of-echo', order: 3, placement: 'featured',
    title: 'Canopy of Echo', titleZh: 'Canopy of Echo', category: 'Digital Heritage Kinetic Installation', categoryZh: '数字遗产动态装置',
    description: 'A real-scale kinetic installation that turns heritage memory into motion, rhythm and light.', descriptionZh: '一件将文化遗产记忆转化为运动、节奏与光影的真实尺度动态装置。',
    role: 'Interactive prototyping · Narrative design', roleZh: '交互原型 · 叙事设计', focus: 'Kinetic systems · Digital heritage', focusZh: '动态系统 · 数字遗产',
    outcome: 'Best Heritage Narrative Prize, 2025', outcomeZh: '2025 最佳遗产叙事奖',
    cover: '/projects/canopy-of-echo/images/user-journey-5-2-poster.webp', preview: '/projects/canopy-of-echo/images/user-journey-5-2.mp4', previewPoster: '/projects/canopy-of-echo/images/user-journey-5-2-poster.webp',
    heroSlot: 'mid-left', heroMobileOrder: 2,
  },
  {
    id: 'the-micro-invasion', slug: 'the-micro-invasion', order: 4, placement: 'featured',
    title: 'The Micro_Invasion', titleZh: '微观入侵', category: 'Augmented Reality Experience', categoryZh: '增强现实体验',
    description: 'An AR experience revealing how microplastics enter the body through ordinary routines.', descriptionZh: '一个展示微塑料如何通过日常行为进入人体的 AR 体验。',
    role: 'Interaction design · AR development', roleZh: '交互设计 · AR 开发', focus: 'Body tracking · Segmentation · World mesh', focusZh: '身体追踪 · 分割 · 世界网格',
    cover: '/projects/micro-invasion/images/cover-card.png', preview: '/projects/micro-invasion/videos/preview.mp4', previewPoster: '/projects/micro-invasion/videos/preview-poster.webp',
    heroSlot: 'right', heroMobileOrder: 4,
  },
  {
    id: 'datnie', slug: 'datnie', order: 5, placement: 'more', title: 'Datnie', titleZh: 'Datnie', category: 'Mixed Reality Dating App', categoryZh: '混合现实交友应用',
    description: 'A hands-first mixed-reality dating experience designed to reduce conversation fatigue.', descriptionZh: '一款以手势与语音为主、减少交流疲劳的混合现实交友体验。',
    role: 'UI/UX · Animation · Visual prototyping', roleZh: 'UI/UX · 动画 · 视觉原型', focus: 'Spatial UI · Microgestures', focusZh: '空间 UI · 微手势',
    cover: '/projects/datnie/images/cover.webp', preview: '/projects/datnie/videos/preview.mp4', previewPoster: '/projects/datnie/videos/preview-poster.webp',
  },
  {
    id: 'lets-make-a-wish', slug: 'lets-make-a-wish', order: 6, placement: 'more', title: "Let's Make a Wish", titleZh: '祈福', category: 'Immersive Ritual VR Experience', categoryZh: '沉浸式仪式 VR 体验',
    description: 'A VR experience translating traditional wish-making rituals into intuitive interactions.', descriptionZh: '一个将传统祈福仪式转化为直观交互的 VR 体验。',
    role: 'Technical art · Interaction design', roleZh: '技术美术 · 交互设计', focus: 'XR interaction · Real-time VFX', focusZh: 'XR 交互 · 实时特效',
    cover: '/projects/pray-for-blessing/images/cover.webp', preview: '/projects/pray-for-blessing/videos/preview.mp4', previewPoster: '/projects/pray-for-blessing/videos/preview-poster.webp',
  },
  {
    id: 'personal-carbon-neutral', slug: 'personal-carbon-neutral', order: 7, placement: 'more', title: 'Personal Carbon Neutral', titleZh: '个人碳中和', category: 'AR Mobile Game', categoryZh: 'AR 手机游戏',
    description: 'An AR game prototype turning personal carbon impact into interactive creatures and shared goals.', descriptionZh: '一个将个人碳足迹转化为互动生物与集体目标的 AR 游戏原型。',
    role: 'Creative technology · Game design', roleZh: '创意技术 · 游戏设计', focus: 'AR systems · Sustainable behavior', focusZh: 'AR 系统 · 可持续行为',
    cover: '/projects/carbon-neutral/images/cover.webp', preview: '/projects/carbon-neutral/videos/preview.mp4', previewPoster: '/projects/carbon-neutral/videos/preview-poster.webp',
  },
] as const;

const expectedSlugs = ['signie', 'guardian-guide', 'canopy-of-echo', 'the-micro-invasion', 'datnie', 'lets-make-a-wish', 'personal-carbon-neutral'];
const ids = new Set(projectCatalog.map((project) => project.id));
const slugs = new Set(projectCatalog.map((project) => project.slug));
const orders = new Set(projectCatalog.map((project) => project.order));
if (
  projectCatalog.length !== 7
  || ids.size !== 7
  || slugs.size !== 7
  || orders.size !== 7
  || projectCatalog.filter((project) => project.placement === 'featured').length !== 4
  || projectCatalog.filter((project) => project.placement === 'more').length !== 3
  || projectCatalog.some((project, index) => project.slug !== expectedSlugs[index] || project.order !== index + 1)
) {
  throw new Error('projectCatalog must preserve the locked seven-project identity and order.');
}

export const featuredProjects = projectCatalog.filter((project) => project.placement === 'featured');
export const moreProjects = projectCatalog.filter((project) => project.placement === 'more');

export function projectBySlug(slug: string): ProjectCatalogEntry | undefined {
  return projectCatalog.find((project) => project.slug === slug);
}

export function projectById(id: string): ProjectCatalogEntry {
  const project = projectCatalog.find((entry) => entry.id === id);
  if (!project) throw new Error(`Unknown project catalog id: ${id}`);
  return project;
}

export function projectHref(project: Pick<ProjectCatalogEntry, 'slug'>): string {
  return `/projects/${project.slug}/`;
}
