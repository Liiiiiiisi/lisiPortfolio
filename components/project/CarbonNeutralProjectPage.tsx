"use client";

import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import { nextSequenceEntry } from "@/data/projectSequence";
import { useLanguage } from "@/context/LanguageContext";

const root = "/projects/carbon-neutral";
const nextProject = nextSequenceEntry("personal-carbon-neutral");

function Label({ children }: { children: React.ReactNode }) { return <p className="case-category-label">{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Lead({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }

function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

const systemStages = [
  ["Low-Carbon Behavior", "低碳行为", "Everyday actions", "日常行动"],
  ["Resources", "资源", "Coins · Power · EXP", "金币 · 能量 · 经验值"],
  ["SCM", "SCM", "Personal carbon monsters", "个人碳怪物"],
  ["Purify / Collect / Battle", "净化 / 收集 / 战斗", "Player actions", "玩家行动"],
  ["Personal Progress", "个人进度", "Individual progression", "个人成长"],
  ["LCM", "LCM", "Collective city boss", "城市集体首领"],
];

function SystemDiagram({ isZh }: { isZh: boolean }) {
  return <figure className="mt-20 md:mt-24" aria-labelledby="carbon-system-caption"><div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.35fr_auto_1fr_auto_1fr] md:items-center md:gap-x-4">{systemStages.map(([title, titleZh, detail, detailZh], index) => <div key={title} className="contents"><div className="py-2">{index === 4 && <p className="case-meta-label mb-3">{isZh ? "个人" : "Personal"}</p>}{index === 5 && <p className="case-meta-label mb-3 text-ink">{isZh ? "集体" : "Collective"}</p>}<p className={`font-display text-[clamp(1.35rem,2.3vw,2.25rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] ${index === 5 ? "text-ink" : "text-ink/85"}`}>{isZh ? titleZh : title}</p><p className="case-media-caption mt-3">{isZh ? detailZh : detail}</p></div>{index < systemStages.length - 1 && <span className="font-mono text-sm text-muted/60 md:text-center" aria-hidden="true">→</span>}</div>)}</div><figcaption id="carbon-system-caption" className="sr-only">{isZh ? "概念游戏系统：从低碳行为与资源，到个人碳怪物、玩家行动、个人进度与城市集体首领。" : "Conceptual game system from low-carbon behavior and resources to personal monsters, player actions, personal progress, and a collective city boss."}</figcaption></figure>;
}

function ConceptBuiltDistinction({ isZh }: { isZh: boolean }) {
  return <dl className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-8"><div><dt className="case-media-title">{isZh ? "概念系统" : "Concept System"}</dt><dd className="case-media-caption mt-3">{isZh ? "追踪 · 资源 · 收集 · 成长 · 城市汇总" : "Tracking · Resources · Collection · Progression · City aggregation"}</dd></div><div><dt className="case-media-title">{isZh ? "已实现原型" : "Built Prototype"}</dt><dd className="case-media-caption mt-3">{isZh ? "AR 放置 · 遭遇 · 战斗交互" : "AR placement · Encounter · Battle interaction"}</dd></div></dl>;
}

function CarbonVideo({ name, poster, alt, className, fit = "cover" }: { name: string; poster: string; alt: string; className: string; fit?: "cover" | "contain" }) {
  return <div className={`relative overflow-hidden bg-surface ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${poster}`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}

function NativeCarbonVideo({ name, poster, alt }: { name: string; poster: string; alt: string }) {
  return <LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${poster}`} alt={alt} className="block h-auto w-full" />;
}

export default function CarbonNeutralProjectPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const interactionSteps = [["Detect surface", "检测平面"], ["Place encounter", "放置遭遇场景"], ["Engage", "进入战斗"], ["Attack", "攻击"], ["Enemy response", "敌人反馈"]];
  const soloRoles = [["Concept Development", "概念开发"], ["System Design", "系统设计"], ["Game Mechanics", "游戏机制"], ["Visual Design", "视觉设计"], ["3D Asset Development", "3D 资产开发"], ["AR Prototype", "AR 原型"], ["Unity Development", "Unity 开发"], ["UI / Animation", "UI / 动画"]];
  return <main className="min-h-screen overflow-x-clip bg-bg text-ink">
    <header><CaseStudyCinematicHero descriptor={b("AR Game / System Design / Unity", "AR 游戏 / 系统设计 / Unity")} title={<>Personal /<br />Carbon Neutral</>} proposition={b("A speculative carbon-reduction game system that turns everyday low-carbon behavior into resources for AR battles.", "一个面向未来的减碳游戏概念，将日常低碳行为转化为 AR 战斗资源。")} role={b("Solo Project", "个人项目")} year="2022" team={b("System Design / AR Prototyping / 3D", "系统设计 / AR 原型 / 3D")} teamLabel={b("Focus", "重点")} tools="Unity / Vuforia / C# / Cinema 4D" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt={b("Personal Carbon Neutral AR battle prototype", "Personal Carbon Neutral AR 战斗原型")} titleClassName="!text-[clamp(3.25rem,7vw,6.5rem)] !leading-[0.82]" /></header>
    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label={b("/01   System", "/01   系统")} title={isZh ? <>将碳足迹<br />转化为游戏系统</> : <>Turning Carbon<br />Into a Game System</>}>{b("Instead of presenting carbon emissions as abstract numbers, I explored how everyday low-carbon behavior could become part of a playable resource system.", "我没有将碳排放呈现为抽象数字，而是探索如何让日常低碳行为成为可玩资源系统的一部分。")}</Opening><SystemDiagram isZh={isZh} /><ConceptBuiltDistinction isZh={isZh} /></section>

      <section className="py-28 md:py-52"><Opening label={b("/02   Visual Metaphor", "/02   视觉隐喻")} title={isZh ? <>从个人<br />到集体</> : <>From Personal<br />to Collective</>}>{b("The system shifts scale from player-specific carbon creatures to a shared city-level opponent.", "系统从玩家各自的碳生物，逐步扩展到城市层级的共同对手。")}</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-40"><article className="case-media-unit"><NativeCarbonVideo name="scm-lifecycle" poster="scm-lifecycle-poster.webp" alt={b("SCM lifecycle concept animation", "SCM 生命周期概念动画")} /><div className="mt-5"><Label>SCM</Label><div className="mt-3"><MediaTitle>{b("Small Carbon Monsters", "小型碳怪物")}</MediaTitle></div><div className="mt-2"><Caption>{b("Personal emissions represented as player-specific creatures.", "将个人排放呈现为玩家各自的碳怪物。")}</Caption></div></div></article><article className="case-media-unit"><NativeCarbonVideo name="lcm-formation" poster="lcm-formation-poster.webp" alt={b("LCM collective boss formation concept animation", "LCM 集体首领成形概念动画")} /><div className="mt-5"><Label>LCM</Label><div className="mt-3"><MediaTitle>{b("Large Carbon Monsters", "大型碳怪物")}</MediaTitle></div><div className="mt-2"><Caption>{b("Combined city emissions represented as a shared boss.", "将城市汇总排放呈现为共同首领。")}</Caption></div></div></article></div><p className="case-stage-title mt-20 max-w-3xl md:mt-28">{b("What begins as an individual footprint becomes a collective opponent.", "起于个人足迹，最终成为集体面对的对手。")}</p></section>

      <section className="py-28 md:py-52"><p className="case-media-title">{b("Built Prototype", "已实现原型")}</p><div className="mt-8"><Opening label={b("/03   Play", "/03   游玩")} title={isZh ? <>从系统<br />到游玩</> : <>From System<br />to Play</>}>{b("The conceptual system became tangible through one focused implementation: a working AR encounter and battle loop.", "我选择其中一段核心机制落地为可运行原型：AR 遭遇与战斗循环。")}</Opening></div><div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-10 md:col-start-2"><CarbonVideo name="ar-prototype-demo" poster="ar-prototype-demo-poster.webp" alt={b("Working Personal Carbon Neutral AR battle prototype", "可运行的 Personal Carbon Neutral AR 战斗原型")} className="aspect-[800/370]" fit="contain" /></div></div><ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20 md:grid-cols-5 md:gap-6">{interactionSteps.map(([step, stepZh], index) => <li key={step}><p className="case-meta-label">{String(index + 1).padStart(2, "0")}</p><p className="case-media-title mt-3">{isZh ? stepZh : step}</p></li>)}</ol><div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>{b("Technology", "技术")}</Label><p className="case-media-title mt-4 leading-relaxed">Unity / Vuforia / C# / Animator / UI / Character Animation</p></div><div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-0"><Body>{b("The wider carbon system remained conceptual; the AR battle loop was developed as the working prototype.", "更广泛的碳系统仍处于概念阶段；只有 AR 战斗循环被开发为可运行原型。")}</Body></div></div></section>

      <section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label={b("/04   Build", "/04   构建")} title={isZh ? <>从视觉构想<br />到可用资产</> : <>From Visual Idea<br />to Working Asset</>}>{b("Technical problem solving meant preserving the character idea while changing how the asset was built.", "为保留角色构想，我调整了资产制作方式。")}</Opening><div className="case-media-split case-media-split-top mt-20 md:mt-24"><div className="sm:col-span-5"><Body>{b("I initially explored a particle-based visual treatment in Cinema 4D. When the effect could not transfer reliably into Unity, I simplified the asset pipeline and rebuilt the visual as a Unity-ready model.", "我最初在 Cinema 4D 中尝试粒子视觉。由于效果无法稳定迁移到 Unity，我简化了资产流程，并重新制作成可直接用于 Unity 的模型。")}</Body><div className="mt-10" aria-label={b("Asset development process", "资产开发流程")}><p className="case-media-title leading-relaxed">{isZh ? <>C4D 粒子测试<br /><span className="text-muted" aria-hidden="true">↓</span><br />迁移限制<br /><span className="text-muted" aria-hidden="true">↓</span><br />Unity 可用模型</> : <>C4D Particle Test<br /><span className="text-muted" aria-hidden="true">↓</span><br />Transfer Limitation<br /><span className="text-muted" aria-hidden="true">↓</span><br />Unity-Ready Model</>}</p></div></div><div className="sm:col-span-7"><CarbonVideo name="c4d-voxel-to-final" poster="c4d-voxel-to-final-poster.webp" alt={b("Cinema 4D particle character test transitioning to the Unity-ready asset", "Cinema 4D 粒子角色测试转换为 Unity 可用资产")} className="aspect-[586/374]" fit="contain" /></div></div><div className="mt-24 md:mt-32"><Label>{b("Solo Project", "个人项目")}</Label><dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4">{soloRoles.map(([role, roleZh]) => <div key={role}><dt className="case-media-title">{isZh ? roleZh : role}</dt></div>)}</dl></div></section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
