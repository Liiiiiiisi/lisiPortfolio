"use client";

import { useEffect, useRef, useState } from "react";
import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import { nextSequenceEntry } from "@/data/projectSequence";
import { withBasePath } from "@/lib/paths";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useLanguage } from "@/context/LanguageContext";

const root = "/projects/datnie";
const nextProject = nextSequenceEntry("datnie");

function Video({ name, alt, className = "aspect-video", fit = "cover", poster }: { name: string; alt: string; className?: string; fit?: "cover" | "contain"; poster?: string | null }) {
  const posterSrc = poster === null ? null : (poster ?? `${root}/images/${name}-poster.webp`);
  return <div className={`relative overflow-hidden bg-[#ded8cf] ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={posterSrc} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}
function Label({ children }: { children: React.ReactNode }) { return <p className="case-category-label">{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Lead({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }
function PromotionalFilm({ isZh }: { isZh: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  return (
    <div className="relative aspect-video overflow-hidden bg-[#ded8cf]">
      <video
        ref={videoRef}
        src={withBasePath(`${root}/images/datine_MV.mp4`)}
        controls={isPlaying}
        playsInline
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        aria-label={isZh ? "带原声的 Datnie 宣传片" : "Datnie promotional film with original audio"}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-4 left-4 bg-black/45 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={isZh ? "从头开始播放带声音的 Datnie 宣传片" : "Play Datnie promotional film with sound from the beginning"}
        >
          ▶ {isZh ? "有声播放" : "Play With Sound"}
        </button>
      )}
    </div>
  );
}

function InterfaceOverviewVideo({ isZh }: { isZh: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) {
      video?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Muted autoplay may still be declined; the first frame remains visible.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className="relative aspect-video overflow-hidden bg-[#ded8cf]">
      <video
        ref={videoRef}
        src={withBasePath(`${root}/images/datnie-unity-ui-overview.mp4`)}
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={isZh ? "Datnie 优化版 Unity 界面概览" : "Datnie refined Unity interface overview"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

export default function DatnieProjectPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const vocabulary = [["Swipe", "滑动", "Browse", "浏览"], ["Tap", "轻点", "Explore", "探索"], ["Double Tap", "双击", "Like", "喜欢"], ["Hold", "长按", "Voice", "语音"], ["Grab", "抓取", "Spatial interaction", "空间交互"]];
  const roles = [["Product / UI Design", "产品 / UI 设计", "Interaction flow, interface design and Figma prototyping", "交互流程、界面设计与 Figma 原型"], ["Character & Motion", "角色与动态", "Character modelling, animation and visual feedback", "角色建模、动画与视觉反馈"], ["Unreal Production", "Unreal 视觉制作", "Groom, lighting, camera and product-film rendering", "毛发、灯光、镜头与产品影片渲染"], ["Visual Prototyping", "视觉原型", "Translating interaction ideas into motion and spatial UI", "将交互构想转化为动态与空间 UI"]];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title="DATNIE" proposition={isZh ? <>一个约会产品概念，探索如何减少持续打字，<br />用更轻松的方式浏览、回应与建立连接。</> : <>A dating concept exploring lighter ways to browse,<br />respond and connect without constant typing.</>} role={isZh ? <>UI/UX 设计<br />动画<br />视觉原型</> : <>UI/UX Design<br />Animation<br />Visual Prototyping</>} year="2025" team="Siming Wang · Lisi Xie" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt={b("Datnie Unreal product film", "Datnie Unreal 产品影片")} /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label={b("/01   PRODUCT", "/01   产品")} title={isZh ? <>少一点打字，<br />多一点真实互动。</> : <>LESS TYPING.<br />MORE PRESENCE.</>}>{b("Dating conversations often repeat the same small exchanges. Datnie explores how gesture, voice and reusable responses could make those interactions lighter.", "约会对话常常重复相似的简短交流。Datnie 探索如何用手势、语音与可复用回应，让这些互动更轻松。")}</Opening>
        <p className="case-body mt-14 max-w-xl md:mt-20">{b("Mixed reality became a hands-first space for exploring gesture, voice and spatial UI.", "混合现实提供了一个以手势为主要输入的空间，用于探索手势、语音与空间 UI。")}</p>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-8">{vocabulary.map(([action, actionZh, purpose, purposeZh]) => <div key={action}><dt className="case-media-title">{isZh ? actionZh : action}</dt><dd className="case-body mt-2">{isZh ? purposeZh : purpose}</dd></div>)}</dl>
        <div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-5 md:col-start-8"><Label>{b("Concept", "概念")}</Label><div className="mt-4"><MediaTitle>{b("Repeated Answers", "重复回答")}</MediaTitle></div><div className="mt-4"><Body>{b("Frequently used responses could gradually surface as reusable prompts, reducing repetitive input over time.", "常用回应可以逐渐变成可复用提示，减少反复输入。")}</Body></div><div className="mt-3"><Caption>{b("This behavior was proposed as a product concept and was not technically implemented.", "这一行为属于产品概念，并未进行技术实现。")}</Caption></div></div></div>
      </section>

      <section className="py-28 md:py-52"><Opening label={b("/02   ITERATION", "/02   迭代")} title={isZh ? <>从愿景<br />到界面</> : <>FROM VISION<br />TO INTERFACE</>}>{b("Two directions explored Datnie from different angles: first through a music-led promotional film, then through a more interaction-focused interface.", "两个方向从不同角度探索 Datnie：先以音乐驱动的宣传片建立愿景，再转向更聚焦交互的界面。")}</Opening>
        <div className="case-media-pair mt-20 md:mt-24">
          <div>
            <PromotionalFilm isZh={isZh} />
            <p className="mt-2 h-4 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted/70">{b("Music / Generated with Suno", "音乐 / 使用 Suno 生成")}</p>
            <div className="mt-4"><Label>{b("Version 1", "版本 1")}</Label><div className="mt-3"><MediaTitle>{b("Promotional Film", "宣传片")}</MediaTitle></div><Caption>{b("Atmosphere / Identity", "氛围 / 形象")}</Caption><div className="mt-4"><Body>{b("Music-led visual storytelling for the repetition of modern dating.", "以音乐驱动的视觉叙事，呈现现代约会中的重复。")}</Body></div></div>
          </div>
          <div>
            <InterfaceOverviewVideo isZh={isZh} />
            <div className="mt-2 h-4" aria-hidden="true" />
            <div className="mt-4"><Label>{b("Version 2", "版本 2")}</Label><div className="mt-3"><MediaTitle>{b("Refined Interface", "优化版界面")}</MediaTitle></div><Caption>{b("Product / Interaction", "产品 / 交互")}</Caption><div className="mt-4"><Body>{b("A clearer view of browsing, profiles and gesture-based interaction.", "更清晰地呈现浏览、个人资料与手势交互。")}</Body></div></div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-52"><Opening label={b("/03   INTERACTION", "/03   交互")} title={isZh ? <>无需键盘的<br />交互</> : <>INTERACTION<br />WITHOUT THE<br />KEYBOARD</>}>{b("The working prototype explored browsing, profile navigation, liking, voice input and spatial interaction.", "可运行原型探索了浏览、个人资料导航、喜欢、语音输入与空间交互。")}</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="Swipe to Browse" alt={b("Micro-gesture browsing in Datnie", "在 Datnie 中使用微手势浏览")} poster={null} /></div><div className="sm:col-span-4"><Label>{b("03.1 / Browse", "03.1 / 浏览")}</Label><div className="mt-4"><MediaTitle>{b("Swipe to Browse", "滑动浏览")}</MediaTitle></div><div className="mt-4"><Body>{b("Micro-gestures move between matches and profile sections without conventional menu navigation.", "微手势可在匹配对象与个人资料版块之间移动，无需传统菜单导航。")}</Body></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="datnie-profile-navigation" alt={b("Navigating a Datnie profile with tap and swipe gestures", "使用轻点与滑动手势浏览 Datnie 个人资料")} poster={null} /><div className="mt-4"><Label>{b("03.2 / Profile Navigation", "03.2 / 个人资料导航")}</Label><div className="mt-3"><MediaTitle>{b("Tap → Swipe → Tap", "轻点 → 滑动 → 轻点")}</MediaTitle></div><Caption>{b("A simple gesture sequence moves from entry to profile navigation to deeper content.", "一组简单手势从进入页面，推进到个人资料导航与更深层内容。")}</Caption></div></div><div><Video name="datnie-double-tap-like" alt={b("Liking a Datnie profile with a double-tap gesture", "双击喜欢 Datnie 个人资料")} poster={null} /><div className="mt-4"><Label>{b("03.3 / Like", "03.3 / 喜欢")}</Label><div className="mt-3"><MediaTitle>{b("Double Tap", "双击")}</MediaTitle></div><Caption>{b("A deliberate gesture adds intent to liking without a button-heavy interface.", "用更明确的动作表达‘喜欢’，同时减少对按钮的依赖。")}</Caption></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="datnie-voice-to-text" alt={b("Using hold and voice input to compose a Datnie response", "长按并使用语音输入撰写 Datnie 回应")} poster={null} /><div className="mt-4"><Label>{b("03.4 / Voice", "03.4 / 语音")}</Label><div className="mt-3"><MediaTitle>{b("Hold → Voice to Text", "长按 → 语音转文字")}</MediaTitle></div><Caption>{b("Holding activates implemented voice input, reducing reliance on typed replies.", "长按可激活已实现的语音输入，减少对打字回复的依赖。")}</Caption></div></div><div><Video name="Grab to Interact" alt={b("Grabbing a Datnie profile card in space", "在空间中抓取 Datnie 个人资料卡片")} poster={null} /><div className="mt-4"><Label>{b("03.5 / Spatial Card", "03.5 / 空间卡片")}</Label><div className="mt-3"><MediaTitle>{b("Grab to Interact", "抓取交互")}</MediaTitle></div><Caption>{b("Profile elements can also be handled as objects in space.", "个人资料元素也可以作为空间中的物体进行操作。")}</Caption></div></div></div>
        <div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>{b("Concept", "概念")}</Label><div className="mt-4"><Body>{b("Repeated responses could later surface as reusable prompts to reduce conversational repetition.", "重复使用的回应可以在之后呈现为可复用提示，减少对话中的重复输入。")}</Body></div></div></div>
        <p className="case-media-caption mt-16 max-w-xl md:mt-20">{b("Unity interaction implementation — Siming Wang. Lisi Xie designed the UI/UX, interaction flow and visual interaction language.", "Unity 交互实现——Siming Wang。Lisi Xie 负责 UI/UX、交互流程与视觉交互语言设计。")}</p>
      </section>

      <section className="py-28 md:py-52"><Opening label={b("/04   VISUAL DEVELOPMENT", "/04   视觉开发")} title={isZh ? <>建立更柔和的<br />视觉语言</> : <>BUILDING A<br />SOFTER IDENTITY</>}>{b("Datnie uses soft, non-literal characters to shift attention away from realistic appearance and toward interaction and compatibility.", "Datnie 使用柔和、非写实的角色，将注意力从真实外貌转向互动与契合度。")}</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="groommaking" alt={b("Datnie character and groom development from Blender to Unreal", "Datnie 角色与毛发从 Blender 到 Unreal 的开发过程")} /></div><div className="sm:col-span-4"><Label>{b("04.1 / Character + Groom", "04.1 / 角色 + 毛发")}</Label><div className="mt-4"><MediaTitle>{isZh ? <>从 Blender<br />到 Unreal</> : <>From Blender<br />to Unreal</>}</MediaTitle></div><div className="mt-4"><Body>{b("Characters were modeled and animated in Blender, then brought into Unreal for groom simulation and final rendering.", "角色在 Blender 中完成建模与动画，再导入 Unreal 进行毛发模拟与最终渲染。")}</Body></div><div className="mt-4"><Caption>{b("Lisi: character modelling, animation, groom development, lighting, camera and rendering.", "Lisi：角色建模、动画、毛发开发、灯光、镜头与渲染。")}</Caption></div></div></div>
        <div className="mt-24 md:mt-32"><Label>{b("04.2 / Promotional Film", "04.2 / 宣传片")}</Label><div className="mt-4 max-w-xl"><MediaTitle>{b("Building the Promotional Film", "构建宣传片")}</MediaTitle></div><div className="mt-4 max-w-xl"><Body>{b("The first direction used a music-led Unreal film to turn the repetition and awkwardness of modern dating into character-driven visual storytelling.", "第一版方向采用音乐驱动的 Unreal 影片，将现代约会中的重复与尴尬转化为以角色为核心的视觉叙事。")}</Body></div><div className="mt-3 max-w-xl"><Caption>{b("The visuals were choreographed around the lyrics and rhythm through character animation, cinematography and transitions.", "画面围绕歌词与节奏编排，并以角色动画、镜头设计与转场完成视觉节奏。")}</Caption></div></div>
        <div className="case-media-split mt-16 md:mt-20"><div className="sm:col-span-8"><Video name="train" alt={b("Datnie train sequence combining depth imagery and Unreal cinematography", "结合深度图像与 Unreal 镜头设计的 Datnie 列车段落")} /></div><div className="sm:col-span-4"><MediaTitle>{b("Train / Scene Build", "列车 / 场景构建")}</MediaTitle><div className="mt-4"><Body>{b("Depth-mapped imagery, AI-generated exterior motion and Unreal cinematography were combined to construct the train sequence.", "列车段落结合了深度映射图像、AI 生成的窗外动态与 Unreal 镜头设计。")}</Body></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="trainshot" alt={b("Lighting camera and scene composition inside Unreal", "Unreal 中的灯光、镜头与场景构图")} /><div className="mt-4"><MediaTitle>{b("Unreal Scene", "Unreal 场景")}</MediaTitle><Caption>{b("Lighting, camera and scene composition inside Unreal.", "在 Unreal 中完成灯光、镜头与场景构图。")}</Caption></div></div><div><Video name="profoliophoto" alt={b("Photography converted into depth-based spatial material", "将摄影图像转换为基于深度的空间素材")} /><div className="mt-4"><MediaTitle>{b("Depth-Mapped Visual", "深度映射视觉")}</MediaTitle><Caption>{b("Photography was converted into depth-based visual material for spatial scene construction.", "摄影图像被转换为基于深度的视觉素材，用于构建空间场景。")}</Caption></div></div></div>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label={b("/05   ROLE", "/05   角色")} title={isZh ? <>角色与<br />贡献</> : <>ROLE &amp;<br />CONTRIBUTION</>}>{b("My contribution moved between product thinking, interface design, character development, motion and Unreal visual prototyping.", "我的贡献横跨产品思考、界面设计、角色开发、动态设计与 Unreal 视觉原型。")}</Opening>
        <dl className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-24 md:grid-cols-2">{roles.map(([title, titleZh, copy, copyZh]) => <div key={title}><dt className="case-media-title">{isZh ? titleZh : title}</dt><dd className="case-body mt-3">{isZh ? copyZh : copy}</dd></div>)}</dl>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="figma" alt={b("Datnie interface design in Figma", "Datnie 在 Figma 中的界面设计")} /><div className="mt-4"><MediaTitle>{b("Interface Design", "界面设计")}</MediaTitle></div></div><div><Video name="uxboard" alt={b("Datnie experience flow board", "Datnie 体验流程板")} /><div className="mt-4"><MediaTitle>{b("Experience Flow", "体验流程")}</MediaTitle></div></div></div>
        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>Siming Wang</Label><p className="case-media-title mt-4">{isZh ? <>XR 开发<br />动画<br />项目方向</> : <>XR Development<br />Animation<br />Direction</>}</p><p className="case-body mt-4">{b("Unity interaction implementation", "Unity 交互实现")}</p></div><div className="col-span-12 md:col-span-5 md:col-start-8"><Label>Lisi Xie</Label><p className="case-media-title mt-4">{isZh ? <>UI/UX 设计<br />角色与动画<br />Unreal 视觉原型</> : <>UI/UX Design<br />Character &amp; Animation<br />Unreal Visual Prototyping</>}</p></div></div>
      </section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
