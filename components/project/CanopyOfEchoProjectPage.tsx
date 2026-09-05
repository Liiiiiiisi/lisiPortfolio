"use client";

import Image from "next/image";
import LazyVideo from "@/components/LazyVideo";
import { withBasePath } from "@/lib/paths";
import NextProjectTransition from "@/components/NextProjectTransition";
import { nextSequenceEntry } from "@/data/projectSequence";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import { useLanguage } from "@/context/LanguageContext";

const root = "/projects/canopy-of-echo/images";
const nextProject = nextSequenceEntry("canopy-of-echo");

function Video({ name, alt, className = "aspect-video", fit = "cover" }: { name: string; alt: string; className?: string; fit?: "cover" | "contain" }) {
  return <div className={`relative overflow-hidden bg-[#ded8cf] ${className}`}><LazyVideo src={`${root}/${name}.mp4`} poster={`${root}/${name}-poster.webp`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`case-category-label ${light ? "text-white/60" : "text-[#716b64]"}`}>{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function Subheading({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Intro({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }
function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <div className="relative aspect-square overflow-hidden rounded-full bg-[#ded8cf]"><Image src={withBasePath(src)} alt={alt} fill sizes="(min-width: 768px) 27vw, 45vw" className="object-cover" /></div>;
}
function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Intro>{children}</Intro></div></div>;
}

export default function CanopyOfEchoProjectPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const interactionStages = [
    ["01 / Presence", "01 / 到场", "Visitor approaches", "访客靠近"],
    ["02 / Detection", "02 / 检测", "MediaPipe detects position", "MediaPipe 检测位置"],
    ["03 / Signal", "03 / 信号", "TouchDesigner → OSC → Unreal", "TouchDesigner → OSC → Unreal"],
    ["04 / Response", "04 / 响应", "Unit pauses on approach and resumes when the visitor leaves", "访客靠近时单元暂停，离开后恢复运动"],
  ];
  const roles = [["Spatial + 3D", "空间 + 3D", "3D modelling and environment development.", "3D 建模与环境开发。"], ["Interaction Prototyping", "交互原型", "Unreal, TouchDesigner and OSC integration.", "整合 Unreal、TouchDesigner 与 OSC。"], ["Storytelling", "叙事", "Developing heritage stories into narrative units.", "将遗产故事转化为叙事单元。"], ["Production", "制作", "Coordination, budgeting and final video production.", "协调、预算与最终视频制作。"]];
  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>CANOPY<br />OF ECHO</>} outcome={b("BEST HERITAGE NARRATIVE PRIZE", "最佳遗产叙事奖")} proposition={b("A kinetic installation that turns heritage stories into motion, light, and spatial encounter.", "一件通过运动、光线与空间互动呈现遗产故事的动态装置。")} role={b("Creative Technologist", "创意技术")} year="2025" team="Saurabhkumar Parmar · Findlay Cumming · Jingru Feng · Lisi Xie" mediaSrc={`${root}/rendered.mp4`} poster={`${root}/rendered-poster.webp`} mediaAlt={b("Canopy of Echo kinetic installation in motion", "运动中的 Canopy of Echo 动态装置")} /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label={b("/01   EXPERIENCE", "/01   体验")} title={isZh ? <>体验</> : <>THE EXPERIENCE</>}>{b("Heritage stories can feel distant when they remain contained in sites, objects, and text. Canopy of Echo makes them spatial and observable: visitors meet stories through movement, light, and proximity.", "当遗产故事只留存在遗址、物件与文字中，它们往往显得遥远。Canopy of Echo 让故事进入空间、变得可见：访客在运动、光线与距离变化中与它们相遇。")}</Opening><div className="mt-20 md:mt-24"><Video name="user-journey-5-1" alt={b("Visitors experiencing the illuminated kinetic canopy", "访客体验被灯光照亮的动态穹顶装置")} className="aspect-[16/8]" /></div></section>

      <section className="py-28 md:py-52"><Opening label={b("/02   SPATIAL NARRATIVE", "/02   空间叙事")} title={isZh ? <>一面城墙，<br />一座塔，<br />一条河</> : <>ONE WALL,<br />ONE TOWER,<br />ONE RIVER</>}>{b("The installation connects architecture, landscape, and audience through a continuous spatial narrative.", "装置以连续的空间叙事连接建筑、景观与观众。")}</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-32">
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>{b("01 / River", "01 / 河流")}</Label><div className="mt-4"><Subheading>{b("Flow of Memory", "记忆之流")}</Subheading></div><div className="mt-5"><Body>{b("A continuous sine-wave rhythm references the river and the movement of collective memory across generations.", "连续的正弦波节奏指向河流，也呼应集体记忆在世代之间的流动。")}</Body></div></div><div className="col-span-12 mt-10"><Video name="rendered" alt={b("Wide rendered view of the flowing kinetic installation", "流动动态装置的宽幅渲染视图")} className="aspect-[16/7]" /></div></article>
        <article className="case-media-split"><div className="sm:col-span-4"><Label>{b("02 / Wall", "02 / 城墙")}</Label><div className="mt-4"><Subheading>{b("Reconstructing What Once Stood", "重现昔日轮廓")}</Subheading></div><div className="mt-5"><Body>{b("Facing the ancient city wall, the installation’s roofline and perspective reference the lost historic structure—allowing its outline to be perceived again.", "装置面向古城墙，以屋顶轮廓与透视关系指向已经消失的历史建筑，让它的形态再次被感知。")}</Body></div></div><div className="sm:col-span-8 sm:col-start-5"><Video name="user-journey-5-2" alt={b("Installation perspective reconstructing the historic wall", "以透视关系重现历史城墙轮廓的装置")} /></div></article>
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-7"><Video name="user-journey-5-3" alt={b("A visitor approaching an individual story unit", "访客靠近一个独立叙事单元")} /></div><div className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0 md:self-center"><Label>{b("03 / Tower", "03 / 塔")}</Label><div className="mt-4"><Subheading>{b("Approaching Stories", "靠近故事")}</Subheading></div><div className="mt-5"><Body>{b("As a visitor approaches a unit, its movement pauses so the embedded story can be observed.", "当访客靠近一个单元时，它会暂停运动，让其中的故事得以被观看。")}</Body></div></div></article>
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>{b("04 / Audience", "04 / 观众")}</Label><div className="mt-4"><Subheading>{b("Living Memory", "持续生长的记忆")}</Subheading></div><div className="mt-5"><Body>{b("Heritage becomes an evolving archive rather than fixed historical content—inviting people to rediscover relics and contribute personal stories.", "遗产不再是固定的历史内容，而成为持续生长的档案，邀请人们重新发现遗物，并留下自己的故事。")}</Body></div></div><div className="col-span-12 mt-10 md:col-span-9 md:col-start-4"><Video name="user-journey-5-4" alt={b("Audience participating in the living heritage archive", "观众参与不断生长的遗产档案")} className="aspect-[16/8]" /></div></article>
      </div></section>

      <section className="py-28 md:py-52"><Opening label={b("/03   STORIES", "/03   故事")} title={isZh ? <>穹顶中的<br />故事</> : <>STORIES IN<br />THE CANOPY</>}>{b("The team distilled 18 historical and contemporary stories into narrative units embedded throughout the installation.", "团队从 18 个历史与当代故事中提炼出叙事单元，并将它们分布在整座装置中。")}</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-32">
        <article className="grid grid-cols-12 items-center gap-x-6 md:gap-x-8"><div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-7 md:gap-8"><StoryImage src={`${root}/Relics1.webp`} alt={b("The Returning Relics artwork", "《归来的文物》画面")} /><StoryImage src={`${root}/Relics2.webp`} alt={b("The Returning Relics detail", "《归来的文物》细节")} /></div><div className="col-span-12 mt-8 md:col-span-5 md:mt-0"><Label>{b("01 / Story", "01 / 故事")}</Label><div className="mt-4"><Subheading>{b("The Returning Relics", "归来的文物")}</Subheading></div><div className="mt-5"><Body>{b("A family chose to donate more than 30 treasured artefacts, protecting a shared inheritance instead of treating it as private property.", "一个家庭选择捐出 30 多件珍藏文物，将共同的文化遗产妥善守护，而非视作私人财产。")}</Body></div></div></article>
        <article className="grid grid-cols-12 items-center gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>{b("02 / Story", "02 / 故事")}</Label><div className="mt-4"><Subheading>{b("History Beneath Our Feet", "脚下的历史")}</Subheading></div><div className="mt-5"><Body>{b("An everyday brick beneath an elderly woman’s stool was discovered to be a 600-year-old Ming city-wall brick—history hidden in daily life.", "一位老妇人凳子下的一块普通砖石，后来被发现是有 600 年历史的明代城墙砖——历史就藏在日常生活之中。")}</Body></div></div><div className="col-span-12 mt-8 grid grid-cols-2 gap-6 md:col-span-7 md:mt-0 md:gap-8"><StoryImage src={`${root}/Feet1.webp`} alt={b("History Beneath Our Feet artwork", "《脚下的历史》画面")} /><StoryImage src={`${root}/Feet2.webp`} alt={b("History Beneath Our Feet detail", "《脚下的历史》细节")} /></div></article>
      </div></section>

      <section className="py-28 md:py-52"><Opening label={b("/04   INTERACTION", "/04   交互")} title={isZh ? <>验证<br />交互机制</> : <>PROVING THE<br />INTERACTION</>}>{b("Visitor position is detected and translated into a responsive motion state, pausing the corresponding story unit before movement resumes.", "系统检测访客位置并将其转化为响应式运动状态：对应的故事单元先暂停，随后恢复运动。")}</Opening><div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-24 md:items-center md:gap-x-8"><div className="col-span-12 md:col-span-4"><ol className="space-y-8">{interactionStages.map(([label, labelZh, description, descriptionZh]) => <li key={label}><Label>{isZh ? labelZh : label}</Label><p className="case-body mt-2 text-ink">{isZh ? descriptionZh : description}</p></li>)}</ol></div><div className="col-span-12 mt-10 md:col-span-8 md:mt-0"><Video name="TD" alt={b("TouchDesigner visitor-position feasibility test", "TouchDesigner 访客位置检测可行性测试")} /><div className="mt-4"><MediaTitle>{b("TouchDesigner / Position Detection", "TouchDesigner / 位置检测")}</MediaTitle><div className="mt-2"><Caption>{b("Camera position data drives the responsive motion state.", "摄像头位置数据驱动响应式运动状态。")}</Caption></div></div></div></div><div className="case-media-pair mt-28 md:mt-32"><div className="case-media-unit"><Video name="OSC" alt={b("OSC communication test", "OSC 通信测试")} /><div className="mt-4"><MediaTitle>{b("OSC / Signal Routing", "OSC / 信号路由")}</MediaTitle><div className="mt-2"><Caption>{b("Passing visitor-state data between TouchDesigner and Unreal.", "在 TouchDesigner 与 Unreal 之间传递访客状态数据。")}</Caption></div></div></div><div className="case-media-unit"><Video name="unreal-prototype" alt={b("Unreal motion prototype", "Unreal 运动原型")} /><div className="mt-4"><MediaTitle>{b("Unreal / Motion State", "Unreal / 运动状态")}</MediaTitle><div className="mt-2"><Caption>{b("Visualizing the corresponding unit response.", "将对应单元的响应可视化。")}</Caption></div></div></div></div></section>

      <section className="py-28 md:py-52"><Opening label={b("/05   PROCESS", "/05   过程")} title={isZh ? <>从系统<br />到空间</> : <>FROM SYSTEM<br />TO SPACE</>}>{b("The project moved from behavior validation to spatial translation, physical scale testing, and a larger working demonstration.", "项目从行为验证推进到空间转译、实体尺度测试，再到更大尺度的实体原型。")}</Opening><div className="case-media-pair mt-20 md:mt-24">
        <article className="case-media-unit case-media-stack"><div><Label>{b("01 / Feasibility", "01 / 可行性")}</Label><div className="mt-4"><Subheading>{b("TouchDesigner Test", "TouchDesigner 测试")}</Subheading></div><div className="mt-2"><Caption>{b("Validate that visitor position could trigger a unit’s motion state.", "验证访客位置能够触发单元的运动状态。")}</Caption></div></div><Video name="TD" alt={b("Short TouchDesigner feasibility test", "TouchDesigner 简短可行性测试")} /></article>
        <article className="case-media-unit case-media-stack"><div><Label>{b("02 / Spatialization", "02 / 空间化")}</Label><div className="mt-4"><Subheading>{b("Rendered Model", "渲染模型")}</Subheading></div><div className="mt-2"><Caption>{b("Translate the interaction into a complete architectural environment.", "将交互转译到完整的建筑环境中。")}</Caption></div></div><Video name="rendered" alt={b("Rendered spatial model", "空间模型渲染")} /></article>
        <article className="case-media-unit case-media-stack"><div><Label>{b("03 / Scale Test", "03 / 尺度测试")}</Label><div className="mt-4"><Subheading>{b("Small-Scale Model", "小尺度模型")}</Subheading></div><div className="mt-2"><Caption>{b("Test the kinetic idea as a physical assembly.", "以实体结构测试动态构想。")}</Caption></div></div><Video name="small-scale-model" alt={b("Small-scale physical model", "小尺度实体模型")} /></article>
        <article className="case-media-unit case-media-stack"><div><Label>{b("04 / Physical Prototype", "04 / 实体原型")}</Label><div className="mt-4"><Subheading>{b("Large Demo", "大型原型")}</Subheading></div><div className="mt-2"><Caption>{b("Built at scale to go beyond digital rendering.", "放大制作，证明项目不只停留在数字渲染。")}</Caption></div></div><Video name="physical-model" alt={b("Large physical kinetic demonstration", "大型实体动态演示")} /></article>
      </div></section>

      <section className="py-28 md:py-52"><div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-7"><Label>{isZh ? <>/06&nbsp;&nbsp; 贡献</> : <>/06&nbsp;&nbsp; CONTRIBUTION</>}</Label><div className="mt-5"><Title>{b("MY CONTRIBUTION", "我的贡献")}</Title></div></div><dl className="col-span-12 mt-14 md:col-span-5 md:mt-0">{roles.map(([title, titleZh, body, bodyZh]) => <div key={title} className="py-6"><dt className="case-category-label">{isZh ? titleZh : title}</dt><dd className="case-body mt-3 text-[#716b64]">{isZh ? bodyZh : body}</dd></div>)}</dl></div></section>
    </div>

    <section className="bg-[#1b1917] py-28 text-[#faf6f1] md:py-52">
      <div className="mx-auto grid max-w-[90rem] grid-cols-12 items-start gap-x-6 px-5 md:gap-x-8 md:px-10">
        <div className="col-span-12 min-w-0 lg:col-span-5">
          <Label light>{isZh ? <>/07&nbsp;&nbsp; 成果</> : <>/07&nbsp;&nbsp; OUTCOME</>}</Label>
          <h2 className="case-project-title mt-5 !text-[clamp(3.75rem,6.5vw,7rem)] !leading-[0.83] text-white">{isZh ? <>最佳<br />遗产<br />叙事奖</> : <>BEST<br />HERITAGE<br />NARRATIVE<br />PRIZE</>}</h2>
          <p className="case-lead mt-8 text-white/65">{isZh ? <>获「最佳遗产叙事奖」<br />2025 数字遗产竞赛</> : <>Winner — Best Heritage Narrative Prize<br />2025 Digital Heritage Competition</>}</p>
        </div>
        <div className="col-span-12 mt-12 min-w-0 lg:col-span-7 lg:mt-0">
          <Image src={withBasePath(`${root}/Outcome.webp`)} alt={b("Team at the 2025 Digital Heritage Competition award ceremony", "团队参加 2025 数字遗产竞赛颁奖典礼")} width={1600} height={1067} className="h-auto w-full object-cover" />
        </div>
      </div>
    </section>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
