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

const root = "/projects/vr-education";
const nextProject = nextSequenceEntry("guardian-guide");

function Video({ name, alt, className = "aspect-video", fit = "cover", poster }: { name: string; alt: string; className?: string; fit?: "cover" | "contain"; poster?: string }) {
  return <div className={`relative overflow-hidden bg-[#ded8cf] ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={poster ?? `${root}/images/${name}-poster.webp`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}

function Label({ children }: { children: React.ReactNode }) { return <p className="case-category-label">{children}</p>; }
function Title({ children }: { children: React.ReactNode }) { return <h2 className="case-section-title">{children}</h2>; }
function MediaTitle({ children }: { children: React.ReactNode }) { return <h3 className="case-media-title">{children}</h3>; }
function Lead({ children }: { children: React.ReactNode }) { return <p className="case-lead">{children}</p>; }
function Body({ children }: { children: React.ReactNode }) { return <p className="case-body">{children}</p>; }
function Caption({ children }: { children: React.ReactNode }) { return <p className="case-media-caption">{children}</p>; }
function Placeholder({ filename, className = "aspect-video" }: { filename: string; className?: string }) {
  return <div className={`grid place-items-center bg-[#ded8cf] px-5 text-center text-[#716b64] ${className}`}><div><Label>[ Media Placeholder ]</Label><p className="case-media-title mt-3">{filename}</p></div></div>;
}

function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

export default function VREducationProjectPage() {
  const reducedMotion = usePrefersReducedMotion();
  const { language } = useLanguage();
  const isZh = language === "zh";
  const b = (en: string, zh: string) => isZh ? zh : en;
  const journey: CaseLearningShowcase = { intervalMs: 7500, useMediaDuration: true, stages: [
    { id: "tutorial", title: "Learn the Controls", titleZh: "学习操作", copy: "Build confidence with essential VR interactions before training begins.", copyZh: "在训练开始前熟悉基础 VR 交互，建立操作信心。", media: { kind: "video", src: `${root}/images/guardian-journey-tutorial.mp4`, poster: `${root}/images/guardian-journey-tutorial-poster.jpg`, aspect: "wide", alt: "Guardian's Guide VR controls tutorial", altZh: "Guardian's Guide VR 操作教程" } },
    { id: "profile", title: "Understand the Child", titleZh: "了解孩子", copy: "Discover care needs through objects embedded in the environment.", copyZh: "探索环境中的物件，了解孩子的照护需求。", media: { kind: "video", src: `${root}/images/guardian-journey-child-profile.mp4`, poster: `${root}/images/guardian-journey-child-profile-poster.jpg`, aspect: "wide", alt: "Exploring the child's care profile in the VR environment", altZh: "在 VR 环境中探索孩子的照护档案" } },
    { id: "kitchen", title: "Practice with Guidance", titleZh: "引导式练习", copy: "Apply care knowledge through a structured sequence of decisions.", copyZh: "在结构化的决策流程中应用照护知识。", media: { kind: "video", src: `${root}/images/guardian-journey-kitchen.mp4`, poster: `${root}/images/guardian-journey-kitchen-poster.jpg`, aspect: "wide", alt: "Guided caregiving practice in the virtual kitchen", altZh: "虚拟厨房中的引导式照护练习" } },
    { id: "living-room", title: "Apply Independently", titleZh: "独立应用", copy: "Explore the environment, identify needs, and respond with less direct guidance.", copyZh: "在较少直接引导下探索环境、识别需求并作出回应。", media: { kind: "video", src: `${root}/images/guardian-journey-living-room.mp4`, poster: `${root}/images/guardian-journey-living-room-poster.jpg`, aspect: "wide", alt: "Independent caregiving practice in the virtual living room", altZh: "虚拟客厅中的独立照护练习" } },
  ] };
  const contributions = [["Experience Design", "体验设计", "Training architecture and interaction flow", "训练架构与交互流程"], ["Unity Development", "Unity 开发", "Scoring, triggers, progression and object logic", "计分、触发、进度与物件逻辑"], ["XR Interaction", "XR 交互", "Onboarding, environment exploration and decision systems", "上手引导、环境探索与决策系统"], ["User Testing", "用户测试", "Usability iteration and comparative validation", "可用性迭代与对比验证"]];
  const guidedPractice = [
    ["01 / Tableware", "01 / 餐具", "Avoid Object Dependency", "避免物件依赖", "Choose neutral tableware without distinctive branding.", "选择没有鲜明品牌特征的中性餐具。", "guardian-kitchen-tableware.mp4"],
    ["02 / Toast", "02 / 吐司", "Introduce Small Changes", "逐步引入小变化", "Adjust a familiar food gradually to expand texture acceptance.", "逐步调整熟悉的食物，扩大对不同质感的接受度。", "guardian-kitchen-toast.mp4"],
    ["03 / Fruit", "03 / 水果", "Build from Preferences", "从偏好出发", "Choose a softer fruit instead of introducing a drastic change.", "选择质地更柔软的水果，避免突然引入巨大变化。", "guardian-journey-kitchen.mp4"],
  ];
  const independentPractice = [
    ["Reduce Sensory Load", "降低感官负担", "Close the window to reduce distracting outside noise.", "关上窗户，减少令人分心的外部噪音。", "guardian-living-room-window.mp4"],
    ["Avoid Abrupt Transitions", "避免突然切换活动", "Do not suddenly interrupt an activity the child enjoys.", "不要突然打断孩子正在享受的活动。", "guardian-living-room-tv.mp4"],
    ["Keep Language Simple", "保持语言简洁", "Use brief, literal language rather than unnecessary wording.", "使用简短、直接的语言，避免不必要的措辞。", "choice-demo.mp4"],
    ["Use Visual Communication", "使用视觉沟通", "Select the appropriate visual card to communicate the next activity.", "选择合适的视觉卡片，说明接下来的活动。", "socket.mp4"],
  ];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>GUARDIAN&apos;S<br />GUIDE</>} proposition={isZh ? <>面向初次照护者的<br />实践型 VR 训练体验。</> : <>A practice-based VR experience<br />for first-time caregivers.</>} role={b("Creative Technologist", "创意技术")} year="2024" team={b("Independent project · Lisi Xie", "独立项目 · Lisi Xie")} mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt={b("Guardian's Guide caregiving decision in virtual reality", "Guardian's Guide 虚拟现实照护决策场景")} /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52">
        <Opening label={b("/01   EXPERIENCE", "/01   体验")} title={isZh ? <>从引导<br />到独立</> : <>FROM GUIDANCE<br />TO INDEPENDENCE</>}>{b("A four-stage training journey that moves from learning VR controls to applying caregiving knowledge independently.", "四阶段训练流程，从学习 VR 操作逐步走向独立应用照护知识。")}</Opening>
        <LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={isZh} />
        <p className="case-media-title mt-12 md:mt-16">{b("Controls → Context → Guided Practice → Independent Application", "操作 → 情境 → 引导式练习 → 独立应用")}</p>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/02   TUTORIAL", "/02   教程")} title={isZh ? <>在行动中<br />学习</> : <>LEARNING<br />BY DOING</>}>{b("First-time VR users learn Move, Turn, Grab, Push and Teleport through interaction.", "初次使用 VR 的用户在交互中学习移动、转向、抓取、推动与传送。")}</Opening>
        <div className="mt-20 md:mt-24"><Video name="Tutorialfullgif" alt={b("Interactive Guardian's Guide controller tutorial", "Guardian's Guide 交互式控制器教程")} className="aspect-[100/53]" fit="contain" /></div>
        <div className="mt-20 grid grid-cols-12 items-center gap-x-6 gap-y-8 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Video name="contrast" alt={b("Controller tutorial reference used for onboarding adaptation", "用于调整上手引导的控制器教程参考")} className="aspect-[575/236]" fit="contain" /></div><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>{b("Reference / Adaptation", "参考 / 适配")}</Label><div className="mt-4"><Caption>{b("A controller tutorial pattern adapted for Guardian's Guide onboarding.", "将控制器教程模式调整为 Guardian's Guide 的上手引导。")}</Caption></div></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/03   CHILD PROFILE", "/03   儿童档案")} title={isZh ? <>从档案<br />到探索</> : <>FROM A PROFILE<br />TO EXPLORATION</>}>{b("Instead of reading a one-page profile, caregivers discover communication, sensory and food-related needs through the child's environment.", "照护者不再阅读单页档案，而是在孩子的环境中发现其沟通、感官与饮食相关需求。")}</Opening>
        <div className="mt-20 grid grid-cols-12 items-start gap-x-6 gap-y-12 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-4"><div className="relative aspect-[3/4] overflow-hidden"><Image src={withBasePath(`${root}/images/guardian-paper-profile.webp`)} alt={b("Original paper-based child profile used as supporting context", "作为辅助背景的原始纸质儿童档案")} fill sizes="(min-width: 1440px) 430px, (min-width: 768px) 33vw, calc(100vw - 40px)" className="object-cover" /></div><div className="mt-4"><Label>{b("Original Profile / Supporting Context", "原始档案 / 辅助背景")}</Label></div></div><div className="col-span-12 md:col-span-7 md:col-start-6"><Video name="change-color" alt={b("Care information changing from red to yellow after discovery", "照护信息在发现后由红色变为黄色")} /><div className="mt-4"><MediaTitle>{b("Discover & Review", "发现与回顾")}</MediaTitle></div><div className="mt-3 grid grid-cols-2 gap-6"><div><Label>{b("Red / To Discover", "红色 / 待发现")}</Label><Caption>{b("Unexplored care information.", "尚未探索的照护信息。")}</Caption></div><div><Label>{b("Yellow / Reviewed", "黄色 / 已查看")}</Label><Caption>{b("Visited information remains accessible for review.", "已访问的信息仍可随时回顾。")}</Caption></div></div></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="guardian-profile-completion" poster={`${root}/images/guardian-profile-completion-poster.jpg`} alt={b("Child Profile completion check after all interaction points have been explored", "探索全部交互点后的儿童档案完成检查")} /></div><div className="sm:col-span-4"><MediaTitle>{b("Check Before Progressing", "继续前确认")}</MediaTitle><div className="mt-4"><Body>{b("Users confirm that all red objects have been explored before moving on.", "用户需确认所有红色物件都已探索，才能继续。")}</Body></div></div></div>
        <div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>{b("Grounding the Experience", "体验依据")}</Label><div className="mt-4"><Body>{b("Conversations with caregivers and autism organisations helped ground the training scenarios in lived experience.", "与照护者及自闭症相关组织的交流，让训练情境建立在真实生活经验之上。")}</Body></div></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/04   GUIDED PRACTICE", "/04   引导式练习")} title={isZh ? <>在引导下<br />练习</> : <>PRACTICE<br />WITH GUIDANCE</>}>{b("A linear task sequence turns care knowledge into practical decisions.", "线性的任务流程将照护知识转化为实际决策。")}</Opening>
        <div className="mt-20 md:mt-24"><Image src={withBasePath(`${root}/images/Kitchen overview.png`)} alt={b("Overview of the guided kitchen training environment", "引导式厨房训练环境概览")} width={2179} height={1080} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" /></div>
        <div className="mt-20 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-8">{guidedPractice.map(([label, labelZh, title, titleZh, copy, copyZh, file]) => { const name = file.replace(/\.mp4$/, ""); return <div key={label}><Video name={name} poster={`${root}/images/${name}-poster.jpg`} alt={isZh ? `${titleZh}引导式厨房交互` : `${title} guided kitchen interaction`} /><div className="mt-4"><Label>{isZh ? labelZh : label}</Label><div className="mt-3"><MediaTitle>{isZh ? titleZh : title}</MediaTitle></div><div className="mt-2"><Caption>{isZh ? copyZh : copy}</Caption></div></div></div>; })}</div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/05   INDEPENDENT PRACTICE", "/05   独立练习")} title={isZh ? <>减少引导，<br />独立应用</> : <>APPLY WITH<br />LESS GUIDANCE</>}>{b("Learners receive one broader goal — prepare the child for snack time — and decide what requires attention.", "学习者只获得一个更宽泛的目标——为孩子准备点心时间——并自行判断需要关注什么。")}</Opening>
        <div className="mt-20 md:mt-24"><Image src={withBasePath(`${root}/images/Living room overview.png`)} alt={b("Overview of the independent living room training environment", "独立客厅训练环境概览")} width={2177} height={1011} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" /></div>
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2">{independentPractice.map(([title, titleZh, copy, copyZh, file]) => { const name = file.replace(/\.mp4$/, ""); const posterExtension = name === "socket" || name === "choice-demo" ? "webp" : "jpg"; return <div key={title}><Video name={name} poster={`${root}/images/${name}-poster.${posterExtension}`} alt={isZh ? `${titleZh}独立客厅练习交互` : `${title} interaction in the independent living room practice`} /><div className="mt-4"><MediaTitle>{isZh ? titleZh : title}</MediaTitle><div className="mt-2"><Caption>{isZh ? copyZh : copy}</Caption></div></div></div>; })}</div>
        <article className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>{b("Learning Through Decisions", "在决策中学习")}</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>{b("Caregiving principles were translated into situational choices, asking users to practice not only what to do, but how to communicate.", "照护原则被转化为情境选择，让用户不仅练习该做什么，也练习如何沟通。")}</Body></div>
          </div>
          <div className="mt-10 grid grid-cols-12 md:mt-12">
            <Image src={withBasePath(`${root}/images/guardian-training-decision.png`)} alt={b("Unity prototype asking which sentence a caregiver would say, with three response options", "Unity 原型询问照护者会选择哪句话，并提供三个回应选项")} width={2560} height={1357} sizes="(min-width: 1440px) 1130px, (min-width: 768px) 80vw, calc(100vw - 40px)" className="col-span-12 h-auto w-full md:col-span-10 md:col-start-2" />
          </div>
        </article>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="guardian-journey-living-room" poster={`${root}/images/guardian-journey-living-room-poster.jpg`} alt={b("Independent living room practice showing transition support", "展示转换支持的独立客厅练习")} /></div><div className="sm:col-span-4"><MediaTitle>{b("Make Time Visible — and Offer Choice", "让等待时间可见，也保留选择权")}</MediaTitle><div className="mt-4"><Body>{b("Present multiple timers so the child can choose how much transition time they need.", "提供多个计时器，让孩子选择自己需要多少转换时间。")}</Body></div><div className="mt-4"><Caption>{b("The hourglass makes waiting visible while preserving the child's sense of choice.", "沙漏让等待变得可见，同时保留孩子的选择感。")}</Caption></div></div></div>
        <div className="mt-24 grid grid-cols-1 gap-12 md:mt-32 md:grid-cols-2 md:gap-8"><div><Label>{b("Guided Kitchen", "引导式厨房")}</Label><p className="case-media-title mt-4">{isZh ? <>逐步提示<br />线性进度<br />引导式决策</> : <>Step-by-step prompts<br />Linear progression<br />Guided decisions</>}</p></div><div><Label>{b("Independent Living Room", "独立客厅")}</Label><p className="case-media-title mt-4">{isZh ? <>一个宽泛目标<br />分布式交互点<br />独立探索</> : <>One broader goal<br />Distributed interaction points<br />Independent exploration</>}</p></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label={b("/06   SYSTEM", "/06   系统")} title={isZh ? <>围绕训练<br />建立规则</> : <>BUILDING RULES<br />AROUND THE TRAINING</>}>{b("Different learning stages required different scoring, progression and anti-repeat logic.", "不同学习阶段需要不同的计分、进度与防重复逻辑。")}</Opening>
        <div className="mt-20 md:mt-24">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>{b("Building the Training Environment", "构建训练环境")}</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>{b("I translated the home-based snack routine into an interactive Unity environment.", "我将居家点心流程转化为可交互的 Unity 环境。")}</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-environment.png`)} alt={b("Unity Scene View showing the complete living room and kitchen training environment", "Unity 场景视图展示完整的客厅与厨房训练环境")} width={1919} height={949} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>{b("Turning Guidance into Feedback", "将引导转化为反馈")}</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>{b("Interaction events connected object states with immediate visual feedback.", "交互事件将物件状态与即时视觉反馈连接起来。")}</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-feedback.png`)} alt={b("Unity Scene View with two red cups and Select Entered interaction settings visible in the Inspector", "Unity 场景视图中的两个红色杯子，以及 Inspector 中可见的 Select Entered 交互设置")} width={2415} height={941} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>{b("Building the Practice Loop", "构建练习循环")}</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>{b("Task states, object placement, UI feedback, and scoring were linked into one practice sequence.", "任务状态、物件放置、UI 反馈与计分被连接成一套练习流程。")}</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-practice-system.png`)} alt={b("Unity scene with the practice tray, task prompt, hierarchy and L2 Score System Inspector", "Unity 场景展示练习托盘、任务提示、层级结构与 L2 Score System Inspector")} width={2560} height={1357} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 grid grid-cols-12 items-start gap-x-6 gap-y-8 md:mt-32 md:gap-x-8">
          <Image src={withBasePath(`${root}/images/guardian-caregiving-principle.png`)} alt={b("Unity Inspector containing research-informed guidance about short literal language and body language", "Unity Inspector 中包含基于研究的简短直接语言与肢体语言指导")} width={734} height={1091} sizes="(min-width: 1440px) 430px, (min-width: 768px) 34vw, calc(100vw - 40px)" className="col-span-12 h-auto w-full md:col-span-4" />
          <div className="col-span-12 md:col-span-5 md:col-start-7 md:pt-4"><MediaTitle>{b("Encoding Caregiving Principles", "编入照护原则")}</MediaTitle><div className="mt-4"><Body>{b("Research-informed guidance was embedded directly into the training content and feedback system.", "以研究为依据的指导被直接编入训练内容与反馈系统。")}</Body></div></div>
        </div>
        <div className="mt-20 md:mt-24"><Label>{b("Guided Kitchen System", "引导式厨房系统")}</Label></div>
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-5 md:gap-x-8">
          <div className="col-span-12 md:col-span-4"><MediaTitle>{b("Decision Gating", "选择锁定机制")}</MediaTitle></div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="space-y-4"><Body>{b("The first choice locks the result and removes the alternative.", "首次选择后，系统会锁定结果并移除另一选项。")}</Body><Body>{b("The next task unlocks only after the current one is complete.", "完成当前任务后，下一项任务才会解锁。")}</Body></div>
            <p className="case-media-title mt-6">{b("Choose → Lock → Remove Alternative → Unlock Next", "选择 → 锁定 → 移除另一选项 → 解锁下一项")}</p>
          </div>
        </div>
        <div className="mt-24 md:mt-32">
          <MediaTitle>{b("Validation & Repeat Prevention", "验证与防止重复触发")}</MediaTitle>
          <Image src={withBasePath(`${root}/images/Collision Validation.png`)} alt={b("Unity gameplay context and full Inspector showing collider validation and Grab being disabled after scoring", "Unity 游戏画面与完整 Inspector，展示碰撞体验证及计分后禁用 Grab")} width={2012} height={904} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-8 h-auto w-full" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div><Label>{b("Collision Validation", "碰撞判定")}</Label><div className="mt-2"><Caption>{b("Tags and colliders determine which choice was made.", "标签与碰撞体共同判断用户作出的选择。")}</Caption></div></div>
            <div><Label>{b("Prevent Repeated Scoring", "防止重复计分")}</Label><div className="mt-2"><Caption>{b("After scoring, the selected object's Grab interaction is disabled.", "完成计分后，所选物件的 Grab 交互会被禁用。")}</Caption></div></div>
          </div>
          <p className="case-media-title mt-6">{b("Choose → Collider Validates → Score → Disable Grab", "选择 → 碰撞判定 → 计分 → 禁用 Grab")}</p>
        </div>
        <div className="mt-24 md:mt-32">
          <Label>{b("Living Room System", "客厅系统")}</Label>
          <div className="mt-8"><MediaTitle>{isZh ? <>客厅<br />任务逻辑</> : <>Living Room<br />Task Logic</>}</MediaTitle></div>
          <LazyVideo src={`${root}/images/socket.mp4`} poster={`${root}/images/socket-poster.webp`} alt={b("Living Room socket placement and distributed scoring interaction", "客厅中的插槽稳定放置与分布式计分交互")} className="mt-8 block aspect-video w-full object-cover" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div><Label>{b("Stable Placement", "稳定放置")}</Label><div className="mt-2"><Caption>{b("Sockets snap objects into their intended positions.", "插槽将物件吸附到预定位置。")}</Caption></div></div>
            <div><Label>{b("Distributed Scoring", "分布式计分")}</Label><div className="mt-2"><Caption>{b("Living Room tasks score independently across different interaction points.", "客厅任务在不同交互点分别独立计分。")}</Caption></div></div>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-20 md:grid-cols-2">{contributions.map(([title, titleZh, copy, copyZh]) => <div key={title}><dt className="case-media-title">{isZh ? titleZh : title}</dt><dd className="case-body mt-3">{isZh ? copyZh : copy}</dd></div>)}</dl>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52">
        <Opening label={b("/07   VALIDATION", "/07   验证")} title={isZh ? <>12 位参与者<br />测试</> : <>TESTED WITH<br />12 PARTICIPANTS</>}>{b("The completed VR training was compared with a paper-based child profile.", "将完成后的 VR 训练与纸质儿童档案进行对比。")}</Opening>
        <div className="mt-20 grid grid-cols-2 gap-6 md:mt-24 md:w-1/2 md:gap-8"><div><Label>{b("VR Training", "VR 训练")}</Label><p className="case-stage-title mt-4">6 / VR</p></div><div><Label>{b("Paper Profile", "纸质档案")}</Label><p className="case-stage-title mt-4">6 / {b("Paper", "纸质")}</p></div></div>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{b("Responsiveness", "照护响应性")}</Label><p className="case-section-title mt-4">{isZh ? <>VR 组<br />显著更高</> : <>Significantly<br />Higher in VR</>}</p><p className="case-media-title mt-4">p = 0.044</p></div><div className="col-span-12 md:col-span-6"><Label>{b("Confidence", "信心")}</Label><div className="mt-4 grid grid-cols-2 gap-6"><div><p className="case-media-title">VR</p><p className="case-stage-title mt-2">6 / 6</p></div><div><p className="case-media-title">{b("Paper", "纸质")}</p><p className="case-stage-title mt-2">3 / 6</p></div></div><p className="case-media-caption mt-4">{b("All VR participants reported confidence, compared with half of the paper group.", "所有 VR 组参与者都表示有信心；纸质组中则有一半参与者表示有信心。")}</p></div></div>
        <p className="case-body mt-16 max-w-xl text-[#716b64]">{b("Other measured outcomes did not reach statistical significance.", "其他测量结果均未达到统计显著性。")}</p>
      </section>
    </div>

    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
