"use client";

import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import LearningStageShowcase from "@/components/project/LearningStageShowcase";
import { nextSequenceEntry } from "@/data/projectSequence";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { CaseLearningShowcase } from "@/types/caseStudy";
import { useLanguage } from "@/context/LanguageContext";

const root = "/projects/micro-invasion";
const nextProject = nextSequenceEntry("the-micro-invasion");

function Video({ name, alt, className = "aspect-video", fit = "cover" }: { name: string; alt: string; className?: string; fit?: "cover" | "contain" }) {
  return <div className={`relative overflow-hidden bg-[#ded8cf] ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${name}-poster.webp`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`case-category-label ${light ? "text-white/60" : ""}`}>{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Lead({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }
function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

export default function MicroInvasionProjectPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const reducedMotion = usePrefersReducedMotion();
  const journey: CaseLearningShowcase = { intervalMs: 7500, useMediaDuration: true, stages: [
    { id: "touch", title: "Skin Contact", titleZh: "皮肤接触", copy: "Using hand sanitizer makes invisible contact visible across the hand.", copyZh: "使用免洗洗手液，让手部接触到的微塑料暴露变得可见。", media: { kind: "video", src: `${root}/images/experience-touch.mp4`, poster: `${root}/images/experience-touch-poster.jpg`, aspect: "wide", fit: "contain", alt: "Skin exposure spreading across the hand", altZh: "皮肤暴露粒子在手部扩散" } },
    { id: "eat", title: "Food Intake", titleZh: "食物摄入", copy: "An everyday food interaction reveals hidden microplastic intake.", copyZh: "一次日常进食交互，揭示隐藏其中的微塑料摄入。", media: { kind: "video", src: `${root}/images/experience-eat.mp4`, poster: `${root}/images/experience-eat-poster.jpg`, aspect: "wide", fit: "contain", alt: "Food intake represented by facial particles", altZh: "通过面部粒子表现食物摄入" } },
    { id: "breathe", title: "Respiration", titleZh: "吸入", copy: "Synthetic fibers become visible as airborne particles through an everyday wiping gesture.", copyZh: "日常擦拭动作让合成纤维以空气中的悬浮颗粒形式显现。", media: { kind: "video", src: `${root}/images/experience-breathe.mp4`, poster: `${root}/images/experience-breathe-poster.jpg`, aspect: "wide", fit: "contain", alt: "Airborne fibers attaching to clothing", altZh: "空气中的纤维附着在衣物上" } },
    { id: "reveal", title: "The Environment", titleZh: "周围环境", copy: "Once all three exposure states are complete, contamination expands beyond the body into the mapped room.", copyZh: "三种暴露状态全部完成后，污染会从身体延伸到已映射的房间。", media: { kind: "video", src: `${root}/images/world-mesh-reveal.mp4`, poster: `${root}/images/world-mesh-reveal-poster.webp`, aspect: "wide", alt: "World Mesh final environment reveal", altZh: "World Mesh 最终环境呈现" } },
  ] };
  const roles = [[b("Concept Direction", "概念方向"), b("Microplastic theme and interaction framing", "微塑料主题与交互框架")], [b("Interaction Design", "交互设计"), b("Three exposure interactions and final reveal logic", "三种暴露交互与最终呈现逻辑")], [b("AR Development", "AR 开发"), b("Tracking, segmentation, triggers, particles and world mesh", "追踪、分割、触发器、粒子与 World Mesh")], [b("Prototyping", "原型开发"), b("Template adaptation, debugging tools and trigger calibration", "模板适配、调试工具与触发阈值校准")]];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>THE<br />MICRO_INVASION</>} titleClassName="!text-[clamp(4.5rem,9vw,9rem)]" proposition={isZh ? <>让日常生活中看不见的微塑料暴露，<br />在身体和周围空间中显现出来。</> : <>Making invisible microplastic exposure<br />visible on the body and across the surrounding space.</>} role={b("Interaction & AR Developer", "交互与 AR 开发")} year="2024" team="Chuyue Yu · Yike Hu · Lisi Xie" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt={b("Body particles and spatial AR in The Micro_Invasion", "The Micro_Invasion 中的身体粒子与空间 AR 效果")} /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label={b("/01   EXPERIENCE", "/01   体验")} title={isZh ? <>触碰。<br />进食。<br />呼吸。<br />显现。</> : <>TOUCH.<br />EAT.<br />BREATHE.<br />REVEAL.</>}>{b("Everyday actions become visible exposure points.", "日常动作成为可见的暴露路径。")}</Opening><LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={isZh} /><p className="case-media-title mt-12 md:mt-16">{b("Touch → Eat → Breathe → Reveal", "触碰 → 进食 → 呼吸 → 显现")}</p><div className="mt-5 max-w-xl"><Caption>{b("The first three interactions can happen in any order. The final reveal activates only after all three exposure states are complete.", "前三种交互可以按任意顺序发生。只有当三种暴露状态全部完成后，最终呈现才会激活。")}</Caption></div></section>

      <section className="py-28 md:py-52"><Opening label={b("/02   INTERACTION", "/02   交互")} title={isZh ? <>身体<br />成为界面</> : <>THE BODY<br />BECOMES THE INTERFACE</>}>{b("Three everyday actions make invisible exposure visible.", "三种日常动作让不可见的暴露显现出来。")}</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="skin-spread" alt={b("Skin exposure particles spreading across the tracked hand", "皮肤暴露粒子在被追踪的手部扩散")} /></div><div className="sm:col-span-4"><Label>{b("01 / Skin · Touch", "01 / 皮肤 · 触碰")}</Label><div className="mt-4"><MediaTitle>{b("Skin Contact", "皮肤接触")}</MediaTitle></div><div className="mt-4"><Body>{b("Sanitizer makes skin exposure visible across the hand.", "免洗洗手液让手部的微塑料接触暴露变得可见。")}</Body></div></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-4"><Label>{b("02 / Food · Eat", "02 / 食物 · 进食")}</Label><div className="mt-4"><MediaTitle>{b("Food Intake", "食物摄入")}</MediaTitle></div><div className="mt-4"><Body>{b("Eating an apple reveals hidden intake on the face.", "吃苹果时，隐藏的微塑料摄入会在面部显现。")}</Body></div></div><div className="sm:col-span-8 sm:col-start-5"><Video name="face-particles" alt={b("Food intake represented by tracked facial particles", "通过面部追踪粒子表现食物摄入")} /></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="fiber-attachment" alt={b("Airborne fibers attaching to tracked clothing", "空气中的纤维附着在被追踪的衣物上")} /></div><div className="sm:col-span-4"><Label>{b("03 / Respiration · Breathe", "03 / 呼吸 · 吸入")}</Label><div className="mt-4"><MediaTitle>{b("Respiration", "吸入")}</MediaTitle></div><div className="mt-4"><Body>{b("A wiping gesture turns synthetic fibers into visible particles.", "擦拭动作将合成纤维转化为可见粒子。")}</Body></div></div></div>
      </section>

      <section className="py-28 md:py-52"><Opening label={b("/03   DEVELOPMENT", "/03   开发")} title={isZh ? <>从模板<br />到自定义系统</> : <>FROM TEMPLATE<br />TO CUSTOM SYSTEM</>}>{b("I adapted existing Lens Studio templates to separate body effects and stabilize physical interactions.", "我改造了现有的 Lens Studio 模板，以分离身体效果并稳定实体交互。")}</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="segmentation" alt={b("Body segmentation system separating tracked regions", "分离各追踪区域的身体分割系统")} /></div><div className="sm:col-span-4"><Label>{b("03.1 / Separating the Body", "03.1 / 分离身体区域")}</Label><div className="mt-4"><MediaTitle>{isZh ? <>一个模板，<br />三个区域</> : <>One Template,<br />Three Regions</>}</MediaTitle></div><div className="mt-4"><Body>{b("I traced the template to control hand, face and clothing effects independently.", "我梳理模板逻辑，使手部、面部和衣物效果可以独立控制。")}</Body></div></div></div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5">
              <Label>{b("03.2 / Calibration", "03.2 / 校准")}</Label>
              <div className="mt-4"><MediaTitle>{isZh ? <>近距离触发<br />校准</> : <>Proximity Trigger<br />Calibration</>}</MediaTitle></div>
            </div>
            <div className="col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-0">
              <Body>{b("Three nearby triggers required a distance threshold that was responsive without causing false activations.", "三个位置相近的虚拟触发器，需要设定手部与触发器之间的距离阈值，既能及时响应，又不会误触发。")}</Body>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Video name="trimMark" alt={b("Calibration debug view showing virtual trigger cubes, the tracked hand marker and live distance values", "校准调试视图，显示虚拟触发方块、被追踪的手部标记与实时距离数值")} className="aspect-[8/5]" fit="contain" />
            <div className="mt-5 max-w-xl">
              <Label>{b("Debug Setup", "调试设置")}</Label>
              <div className="mt-2"><Caption>{b("QR marker anchors the virtual triggers; live hand distance helps tune the activation range.", "QR 标记用于锚定虚拟触发器；实时手部距离用于调整激活范围。")}</Caption></div>
            </div>
          </div>
        </div>
        <div className="mt-24 md:mt-32"><Label>{b("03.3 / Experience State", "03.3 / 体验状态")}</Label><div className="mt-4"><MediaTitle>{isZh ? <>三个触发器，<br />一次最终呈现</> : <>Three Triggers,<br />One Payoff</>}</MediaTitle></div><div className="mt-12 grid grid-cols-3 gap-6 text-center"><div><Label>{b("Skin", "皮肤")}</Label><p className="case-stage-title mt-3">✓</p></div><div><Label>{b("Food", "食物")}</Label><p className="case-stage-title mt-3">✓</p></div><div><Label>{b("Fabric", "织物")}</Label><p className="case-stage-title mt-3">✓</p></div></div><div className="mx-auto mt-8 max-w-sm text-center"><p className="case-stage-title">↓</p><p className="case-media-title mt-5">{b("Final Reveal", "最终呈现")}</p><div className="mt-4"><Caption>{b("Any order. The reveal starts only when all three are complete.", "顺序不限。只有当三种暴露都完成后，最终呈现才会开始。")}</Caption></div></div></div>
      </section>
    </div>

    <section className="bg-[#1b1917] py-28 text-white md:py-52"><div className="mx-auto max-w-[90rem] px-5 md:px-10"><div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label light>{b("/04   FINAL REVEAL", "/04   最终呈现")}</Label><h2 className="case-section-title mt-6 text-white">{isZh ? <>从身体<br />到空间</> : <>FROM BODY<br />TO SPACE</>}</h2></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><p className="case-lead text-white/75">{b("Once all three exposure paths are complete, contamination expands from the body into the mapped environment.", "三条暴露路径全部完成后，污染会从身体延伸到已映射的周围环境。")}</p></div></div><div className="relative left-1/2 mt-20 aspect-[16/9] w-screen -translate-x-1/2 overflow-hidden bg-black md:mt-24"><LazyVideo src={`${root}/images/world-mesh-reveal.mp4`} poster={`${root}/images/world-mesh-reveal-poster.webp`} alt={b("World Mesh extending microplastic particles into the room", "World Mesh 将微塑料粒子延伸到房间中")} className="absolute inset-0 h-full w-full object-cover" /></div><div className="mt-10 grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-5"><p className="case-project-title !text-[clamp(2.6rem,5vw,6rem)] text-white">{isZh ? <>欢迎来到<br />微塑料的世界。</> : <>WELCOME TO THE<br />WORLD OF MICROPLASTICS.</>}</p></div><div className="col-span-12 mt-10 md:col-span-4 md:col-start-9 md:mt-0"><MediaTitle>{b("World Mesh / Performance", "World Mesh / 性能")}</MediaTitle><p className="case-media-caption mt-3 text-white/60">{b("Particle density was tuned to keep the room-scale effect responsive while preserving the visual impact.", "通过调整粒子密度，在保留视觉效果的同时，确保房间尺度的体验响应流畅。")}</p></div></div></div></section>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10"><section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label={b("/05   ROLE", "/05   角色")} title={isZh ? <>角色与<br />实现</> : <>ROLE &amp;<br />BUILD</>}>{b("My work connected concept direction, interaction design, AR development and technical prototyping.", "我负责概念方向、交互设计、AR 开发与技术原型，并将三条暴露路径整合为完整体验。")}</Opening><dl className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-24 md:grid-cols-2">{roles.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl><div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>{b("Team / Ownership", "团队 / 责任分工")}</Label><dl className="mt-6 space-y-5"><div><dt className="case-media-title">Chuyue Yu</dt><dd className="case-body mt-1">{b("Interaction Designer", "交互设计师")}</dd></div><div><dt className="case-media-title">Yike Hu</dt><dd className="case-body mt-1">{b("Visual Designer & Video Editor", "视觉设计与视频剪辑")}</dd></div><div><dt className="case-media-title">Lisi Xie</dt><dd className="case-body mt-1">{b("Interaction & AR Developer", "交互与 AR 开发")}</dd></div></dl></div><dl className="col-span-12 grid gap-8 md:col-span-7 md:col-start-6 md:grid-cols-2"><div><dt className="case-media-title">{b("Microplastic Direction", "微塑料概念方向")}</dt><dd className="case-body mt-2">Lisi Xie</dd></div><div><dt className="case-media-title">{b("Dining-Table Concept", "餐桌场景概念")}</dt><dd className="case-body mt-2">{b("Developed collaboratively", "团队共同开发")}</dd></div><div><dt className="case-media-title">{b("Interaction Flow", "交互流程")}</dt><dd className="case-body mt-2">Lisi Xie</dd></div><div><dt className="case-media-title">{b("Primary Technical Development", "核心技术开发")}</dt><dd className="case-body mt-2">Lisi Xie</dd></div></dl></div><p className="case-category-label mt-24 text-muted md:mt-32" aria-disabled="true">{b("View Development Timeline ↗", "查看开发时间线 ↗")}</p></section></div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
