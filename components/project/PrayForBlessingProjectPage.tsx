"use client";

import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import LearningStageShowcase from "@/components/project/LearningStageShowcase";
import { nextSequenceEntry } from "@/data/projectSequence";
import { usePrefersReducedMotion } from "@/lib/motion";
import { withBasePath } from "@/lib/paths";
import type { CaseLearningShowcase } from "@/types/caseStudy";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const root = "/projects/pray-for-blessing";
const nextProject = nextSequenceEntry("lets-make-a-wish");

function Video({ name, alt, className = "aspect-video", fit = "cover" }: { name: string; alt: string; className?: string; fit?: "cover" | "contain" }) {
  return <div className={`relative overflow-hidden bg-[#ded8cf] ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${name}-poster.webp`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}

function Label({ children }: { children: React.ReactNode }) { return <p className="case-category-label">{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Lead({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }
function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

export default function PrayForBlessingProjectPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const reducedMotion = usePrefersReducedMotion();
  const journey: CaseLearningShowcase = { useMediaDuration: true, stages: [
    { id: "wish", title: "Make a Wish", titleZh: "许下心愿", copy: "Close your eyes to begin the ritual.", copyZh: "闭上眼睛，开始仪式。", media: { kind: "video", src: `${root}/images/gif-wish.mp4`, poster: `${root}/images/gif-wish-poster.webp`, aspect: "wide", alt: "Closing the eyes to make a wish in VR", altZh: "在 VR 中闭上眼睛许愿" } },
    { id: "fortune", title: "Draw a Fortune", titleZh: "摇筒求签", copy: "Shake the bucket to reveal a fortune.", copyZh: "摇动签筒，求得一支签。", media: { kind: "video", src: `${root}/images/gif-bucket.mp4`, poster: `${root}/images/gif-bucket-poster.webp`, aspect: "wide", alt: "Shaking a fortune bucket in VR", altZh: "在 VR 中摇动签筒" } },
    { id: "festival", title: "Begin Festival", titleZh: "击鼓开场", copy: "Beat the drum to set the celebration in motion.", copyZh: "击鼓，让庆典随之展开。", media: { kind: "video", src: `${root}/images/gif-drum.mp4`, poster: `${root}/images/gif-drum-poster.webp`, aspect: "wide", alt: "Beating a festival drum in VR", altZh: "在 VR 中击鼓开启庆典" } },
    { id: "blessing", title: "Write a Blessing", titleZh: "书写福字", copy: "Trace the Fu character by hand.", copyZh: "亲手描写“福”字。", media: { kind: "video", src: `${root}/images/gif-write.mp4`, poster: `${root}/images/gif-write-poster.webp`, aspect: "wide", alt: "Writing the Fu character in VR", altZh: "在 VR 中书写“福”字" } },
    { id: "release", title: "Send the Wish", titleZh: "放飞心愿", copy: "Light and release a lantern into the night.", copyZh: "点亮灯笼，将它放入夜空。", media: { kind: "video", src: `${root}/images/gif-lantern.mp4`, poster: `${root}/images/gif-lantern-poster.webp`, aspect: "wide", alt: "Releasing a glowing lantern in VR", altZh: "在 VR 中放飞发光的灯笼" } },
  ] };
  const roles = [
    [b("Unity / XR Development", "Unity / XR 开发"), b("Lantern ignition and release, plus the handwriting interaction.", "灯笼点燃与放飞，以及手写交互。")],
    [b("VFX", "视觉特效"), b("Fireworks and the Buddha visual response.", "烟花与佛像视觉反馈。")],
    [b("World Building", "场景构建"), b("Terrain, lighting and environment polish.", "地形、灯光与环境细化。")],
    [b("Motion", "动态设计"), b("Cinemachine NPC loops and scene movement.", "Cinemachine NPC 循环动画与场景动态。")],
  ];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>LET&apos;S MAKE<br />A WISH</>} proposition={isZh ? <>将传统祈福仪式重新诠释为<br />可亲身参与的 XR 文化体验。</> : <>Traditional wish-making rituals reimagined<br />as an interactive XR experience.</>} role={isZh ? <>技术美术<br />交互设计</> : <>Technical Artist<br />Interaction Designer</>} year="2024" team="Lisi Xie · Chuyue Yu · Wenqu Tang" mediaSrc={`${root}/images/gif-lantern.mp4`} poster={`${root}/images/gif-lantern-poster.webp`} mediaAlt={b("A glowing lantern rising through the VR festival environment", "发光的灯笼缓缓升入 VR 节庆环境")} /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52">
        <Opening label={b("/01   EXPERIENCE", "/01   体验")} title={isZh ? <>五个动作。<br />一场仪式。</> : <>FIVE ACTIONS.<br />ONE RITUAL.</>}>{b("A wish unfolds through five embodied interactions, from a quiet intention to a lantern released into the night.", "一个心愿通过五次身体参与逐步展开：从静默许愿开始，最终将灯笼放入夜空。")}</Opening>
        <LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={isZh} />
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/02   INTERACTION", "/02   交互")} title={isZh ? <>仪式<br />→ 动作<br />→ 反馈</> : <>RITUAL<br />→ ACTION<br />→ RESPONSE</>}>{b("Each familiar gesture produces an immediate response, making the cultural ritual legible through action.", "每个熟悉的动作都会得到即时回应，让仪式的含义在操作中自然展开。")}</Opening>
        <div className="mt-20 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-3 md:gap-8">
          <div><Video name="gif-bucket" alt={b("Fortune appearing after the bucket is shaken", "摇动签筒后出现签文")} /><div className="mt-4"><Label>{b("Shake → Fortune", "摇筒 → 得签")}</Label><div className="mt-3"><MediaTitle>{b("Draw a Fortune", "摇筒求签")}</MediaTitle></div><div className="mt-2"><Caption>{b("Shaking the bucket generates a personalized fortune stick.", "摇动签筒，生成一支专属签。")}</Caption></div></div></div>
          <div><Video name="gif-write" alt={b("Writing a blessing with a virtual brush", "使用虚拟毛笔书写福字")} /><div className="mt-4"><Label>{b("Write → Blessing", "书写 → 祝福")}</Label><div className="mt-3"><MediaTitle>{b("Trace Fu", "描写福字")}</MediaTitle></div><div className="mt-2"><Caption>{b("Handwriting turns a symbolic character into an embodied gesture.", "亲手书写，让‘福’字从符号变成身体参与的动作。")}</Caption></div></div></div>
          <div><Video name="gif-lantern" alt={b("Lantern lighting and rising into the virtual sky", "灯笼点亮并升入虚拟夜空")} /><div className="mt-4"><Label>{b("Light → Release", "点亮 → 放飞")}</Label><div className="mt-3"><MediaTitle>{b("Send the Wish", "放飞心愿")}</MediaTitle></div><div className="mt-2"><Caption>{b("The final action transforms intention into a visible ascent.", "最后一个动作让心愿化为灯笼升空的可见结果。")}</Caption></div></div></div>
        </div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/03   LANTERN", "/03   灯笼")} title={isZh ? <>点亮。<br />放飞。<br />升空。</> : <>LIGHT.<br />RELEASE.<br />ASCEND.</>}>{b("The lantern sequence carries the experience from close-range interaction to a large-scale visual payoff.", "灯笼流程将体验从近距离交互推向最终的视觉高潮。")}</Opening>
        <div className="mt-20 md:mt-24"><Video name="gif-lantern" alt={b("Complete lantern ignition release and ascent sequence", "灯笼点亮、放飞与升空的完整流程")} className="aspect-[16/8]" /></div>
        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          <div><Label>{b("01 / Ignition", "01 / 点亮")}</Label><div className="mt-3"><MediaTitle>{b("Light", "点亮")}</MediaTitle></div><div className="mt-2"><Caption>{b("A close interaction activates the lantern.", "一次近距离交互点亮灯笼。")}</Caption></div></div>
          <div><Label>{b("02 / Release", "02 / 放飞")}</Label><div className="mt-3"><MediaTitle>{b("Let Go", "松手")}</MediaTitle></div><div className="mt-2"><Caption>{b("The gesture shifts from holding to sending.", "动作从握持转为送出。")}</Caption></div></div>
          <div><Label>{b("03 / Payoff", "03 / 回应")}</Label><div className="mt-3"><MediaTitle>{b("Ascend", "升空")}</MediaTitle></div><div className="mt-2"><Caption>{b("Light, flight and fireworks complete the ritual.", "光亮、飞行与烟花为仪式收尾。")}</Caption></div></div>
        </div>
        <aside className="mt-20 grid grid-cols-12 md:mt-28"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>{b("Keeping the Lantern Visible in Flight", "保持灯笼在飞行中可见")}</Label><div className="mt-4"><Body>{b("The lantern became too dark at distance, so I adjusted its material and lighting to preserve its silhouette through the ascent.", "灯笼在远处过于昏暗，因此我调整了材质与灯光，使其轮廓在升空过程中保持清晰。")}</Body></div></div></aside>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/04   EMBODIED INTERACTION", "/04   具身交互")} title={isZh ? <>动作<br />化为<br />意义</> : <>GESTURE<br />BECOMES<br />MEANING</>}>{b("Writing and prayer turn symbolic actions into readable visual feedback.", "书写与祈愿将象征性动作转化为清晰的视觉反馈。")}</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="gif-write" alt={b("Handwriting the Fu character in virtual reality", "在虚拟现实中手写“福”字")} /></div><div className="sm:col-span-4"><Label>{b("Writing / Primary Interaction", "书写 / 核心交互")}</Label><div className="mt-4"><MediaTitle>{b("Write a Blessing", "书写福字")}</MediaTitle></div><div className="mt-4"><Body>{b("I built the board and pen interaction so the Fu character could be traced directly in space.", "我实现了书写板与笔的交互，让用户能够直接在空间中描写“福”字。")}</Body></div></div></div>
        <div className="mt-24 grid grid-cols-12 items-center gap-x-6 gap-y-10 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>{b("Buddha / Visual Response", "佛像 / 视觉反馈")}</Label><div className="mt-4"><MediaTitle>{b("A Quiet Signal", "无声回应")}</MediaTitle></div><div className="mt-4"><Body>{b("Wenqu Tang created the original eye-close mechanic. I added the halo and visual response that confirms the wish.", "Wenqu Tang 完成了最初的闭眼机制。我添加了光环与视觉反馈，用于确认心愿已许下。")}</Body></div></div><div className="col-span-12 md:col-span-6 md:col-start-7"><Video name="gif-wish" alt={b("Buddha halo responding when the player closes their eyes", "玩家闭眼时佛像光环产生反馈")} /></div></div>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52">
        <Opening label={b("/05   ROLE", "/05   角色")} title={isZh ? <>角色与<br />贡献</> : <>ROLE &amp;<br />CONTRIBUTION</>}>{b("My role connected interaction development, real-time effects, environmental polish and motion into one coherent XR ritual.", "我负责交互开发、实时特效、环境细化与动态设计，并将这些部分整合为完整的 XR 仪式体验。")}</Opening>
        <article className="mt-20 md:mt-24" aria-labelledby="lighting-process-title">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5">
              <Label>{b("05.2 / Lighting & Atmosphere", "05.2 / 灯光与氛围")}</Label>
              <div className="mt-4"><MediaTitle><span id="lighting-process-title">{b("Lighting the Ritual Space", "点亮仪式空间")}</span></MediaTitle></div>
            </div>
            <div className="col-span-12 mt-5 md:col-span-5 md:col-start-8 md:mt-0">
              <Body>{b("Warm localized lighting guides attention toward the shrine while keeping the surrounding landscape dark.", "局部暖光将注意力引向神龛，同时让周围景观保持幽暗。")}</Body>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Image src={withBasePath(`${root}/images/unity-lighting-process.png`)} alt={b("Unity Scene View showing localized shrine lighting, surrounding dark landscape and lighting gizmos", "Unity Scene 视图，显示神龛局部灯光、周围的暗色景观与灯光辅助线框")} width={2414} height={1227} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" />
          </div>
        </article>
        <dl className="mt-24 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-32 md:grid-cols-2">{roles.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl>
        <div className="mt-24 grid grid-cols-1 gap-14 border-t border-[#1b1917]/20 pt-12 md:mt-32 md:grid-cols-3 md:gap-8">
          <div><Label>Lisi Xie</Label><p className="case-media-title mt-4">{isZh ? <>灯笼交互<br />书写板与笔<br />烟花与佛像光环<br />灯光、环境与 Cinemachine</> : <>Lantern interaction<br />Handwriting board &amp; pen<br />Fireworks &amp; Buddha halo<br />Lighting, environment &amp; Cinemachine</>}</p></div>
          <div><Label>Chuyue Yu</Label><p className="case-media-title mt-4">{isZh ? <>环境与 NPC 布置<br />资产选取<br />击鼓交互</> : <>Environment &amp; NPC arrangement<br />Asset sourcing<br />Drum interaction</>}</p></div>
          <div><Label>Wenqu Tang</Label><p className="case-media-title mt-4">{isZh ? <>签筒<br />闭眼交互</> : <>Fortune bucket<br />Eye-close interaction</>}</p></div>
        </div>
      </section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
