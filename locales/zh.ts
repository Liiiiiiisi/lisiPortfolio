/**
 * Chinese UI copy — rough placeholder translations, to be reviewed later.
 * Must contain every key from locales/en.ts (enforced by the Record type).
 */
import type { TranslationKey } from './en';
import { legacyZh } from './legacyZh';

export const zh: Record<TranslationKey, string> = {
  ...legacyZh,
  'skip.toContent': '跳转到正文',

  'nav.name': '谢李思',
  'nav.work': '作品',
  'nav.about': '关于',
  'nav.contact': '联系',
  'nav.langToggle': 'EN',
  'nav.langToggleAria': '切换为英文',

  'floatingNav.label': '主导航',
  'floatingNav.projects': '项目',
  'floatingNav.about': '关于',
  'floatingNav.lab': '实验室',

  'lab.title': '实验室',
  'lab.intro': '实验、原型、交互研究与技术测试——精选项目之外正在进行中的小型作品。',
  'lab.empty': '暂无内容，敬请期待。',
  'lab.discipline.interaction': '交互研究',
  'lab.discipline.motion': '动态研究',
  'lab.discipline.editorial': '视觉编辑',
  'lab.discipline.technical': '技术测试',
  'lab.discipline.archive': '档案',
  'lab.backShort': '实验室',
  'lab.backToLabs': '返回实验室',
  'lab.nextStudy': '下一个研究',
  'lab.viewLive': '查看线上',
  'lab.close': '关闭',

  'hero.name': '谢李思',
  'hero.location': '中国 · 上海',
  'hero.email': 'lxie082@outlook.com',
  'hero.title1': '交互设计师',
  'hero.title2': '与创意技术专家',
  'hero.cardsLabel': '精选项目',
  'highlights.label': '精选亮点',
  'highlights.item1': '两届 XRDC 奖项得主',
  'highlights.item2': 'MA 虚拟与增强现实（优等）',
  'highlights.item3': 'BFA 设计（荣誉），SVA',
  'hero.role1': '创意技术专家',
  'hero.role2': '与交互设计师',
  'hero.statement': '我在 XR、AI 与实时媒体领域设计并构建可交互的原型体验。',
  'hero.award': '两届 XRDC 获奖者',
  'hero.viewWork': '查看作品',
  'hero.showreel': '作品集视频',
  'hero.showreelSoon': '即将上线',
  'hero.previewLabel': '精选项目预览',
  'hero.previewHint': '跳转到该项目',

  'work.title': '精选作品',
  'work.intro': '四个横跨 XR、AI 与实时媒体的精选项目。',
  'work.viewProject': '查看项目',
  'work.prevProject': '上一个项目',
  'work.nextProject': '下一个项目',
  'work.caseStudy': '查看案例研究',
  'work.seeMore': '查看更多',
  'work.viewCaseStudy': '查看 {name} 案例研究',
  'work.showInShowcase': '在项目展示中显示 {name}',

  'moreWork.label': '更多作品',
  'moreWork.visitSite': '访问网站',

  'meta.role': '角色',
  'meta.focus': '方向',
  'meta.outcome': '成果',

  'case.section.challenge': '挑战',
  'case.section.experience': '核心体验',
  'case.section.howItWorks': '运作方式',
  'case.section.build': '构建 / 原型',
  'case.section.contribution': '我的贡献',
  'case.section.outcome': '成果',
  'case.meta.role': '角色',
  'case.meta.team': '团队',
  'case.meta.platform': '平台',
  'case.meta.year': '年份',
  'case.meta.outcome': '成果',
  'case.meta.tools': '工具',
  'case.credits': '参与者',
  'case.nextProject': '下一个项目',
  'case.allProjects': '全部项目',
  'case.scrollDown': '向下滚动',
  'case.backToIndex': '全部项目',

  'about.title': '关于',
  'about.body1':
    '我是一名创意技术专家与交互设计师，工作范围涵盖 XR、AI 辅助界面与实时媒体。我习惯把想法从概念推进到可测试的原型：先设计交互，再亲自实现。',
  'about.body2':
    '近期作品包括手部追踪学习工具、叙事 VR 与多模态 AI 工具，曾两次获得 XRDC 奖项。目前对 XR、创意工具与交互产品设计方向的职位与合作持开放态度。',

  'contact.title': '联系',
  'contact.lead': '如有职位、合作或希望深入了解作品，欢迎通过邮件联系我。',
  'contact.emailLabel': '邮件联系',
  'contact.emailAria': '给谢李思发邮件',
  'contact.rights': '版权所有 © 2026 谢李思',

  'footer.copyright': '© 2026 谢李思',
  'footer.note': '实验性首页原型',
};
