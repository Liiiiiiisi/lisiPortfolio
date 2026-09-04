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
  const journey: CaseLearningShowcase = { intervalMs: 7500, useMediaDuration: true, stages: [
    { id: "tutorial", title: "Learn the Controls", titleZh: "Learn the Controls", copy: "Build confidence with essential VR interactions before training begins.", copyZh: "Build confidence with essential VR interactions before training begins.", media: { kind: "video", src: `${root}/images/guardian-journey-tutorial.mp4`, poster: `${root}/images/guardian-journey-tutorial-poster.jpg`, aspect: "wide", alt: "Guardian's Guide VR controls tutorial" } },
    { id: "profile", title: "Understand the Child", titleZh: "Understand the Child", copy: "Discover care needs through objects embedded in the environment.", copyZh: "Discover care needs through objects embedded in the environment.", media: { kind: "video", src: `${root}/images/guardian-journey-child-profile.mp4`, poster: `${root}/images/guardian-journey-child-profile-poster.jpg`, aspect: "wide", alt: "Exploring the child's care profile in the VR environment" } },
    { id: "kitchen", title: "Practice with Guidance", titleZh: "Practice with Guidance", copy: "Apply care knowledge through a structured sequence of decisions.", copyZh: "Apply care knowledge through a structured sequence of decisions.", media: { kind: "video", src: `${root}/images/guardian-journey-kitchen.mp4`, poster: `${root}/images/guardian-journey-kitchen-poster.jpg`, aspect: "wide", alt: "Guided caregiving practice in the virtual kitchen" } },
    { id: "living-room", title: "Apply Independently", titleZh: "Apply Independently", copy: "Explore the environment, identify needs, and respond with less direct guidance.", copyZh: "Explore the environment, identify needs, and respond with less direct guidance.", media: { kind: "video", src: `${root}/images/guardian-journey-living-room.mp4`, poster: `${root}/images/guardian-journey-living-room-poster.jpg`, aspect: "wide", alt: "Independent caregiving practice in the virtual living room" } },
  ] };
  const contributions = [["Experience Design", "Training architecture and interaction flow"], ["Unity Development", "Scoring, triggers, progression and object logic"], ["XR Interaction", "Onboarding, environment exploration and decision systems"], ["User Testing", "Usability iteration and comparative validation"]];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>GUARDIAN&apos;S<br />GUIDE</>} proposition={<>A practice-based VR experience<br />for first-time caregivers.</>} role="Creative Technologist" year="2024" team="Independent project · Lisi Xie" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt="Guardian's Guide caregiving decision in virtual reality" /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52">
        <Opening label="/01   EXPERIENCE" title={<>FROM GUIDANCE<br />TO INDEPENDENCE</>}>A four-stage training journey that moves from learning VR controls to applying caregiving knowledge independently.</Opening>
        <LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={false} />
        <p className="case-media-title mt-12 md:mt-16">Controls → Context → Guided Practice → Independent Application</p>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/02   TUTORIAL" title={<>LEARNING<br />BY DOING</>}>First-time VR users learn Move, Turn, Grab, Push and Teleport through interaction.</Opening>
        <div className="mt-20 md:mt-24"><Video name="Tutorialfullgif" alt="Interactive Guardian's Guide controller tutorial" className="aspect-[100/53]" fit="contain" /></div>
        <div className="mt-20 grid grid-cols-12 items-center gap-x-6 gap-y-8 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Video name="contrast" alt="Controller tutorial reference used for onboarding adaptation" className="aspect-[575/236]" fit="contain" /></div><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>Reference / Adaptation</Label><div className="mt-4"><Caption>A controller tutorial pattern adapted for Guardian&apos;s Guide onboarding.</Caption></div></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/03   CHILD PROFILE" title={<>FROM A PROFILE<br />TO EXPLORATION</>}>Instead of reading a one-page profile, caregivers discover communication, sensory and food-related needs through the child&apos;s environment.</Opening>
        <div className="mt-20 grid grid-cols-12 items-start gap-x-6 gap-y-12 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-4"><div className="relative aspect-[3/4] overflow-hidden"><Image src={withBasePath(`${root}/images/guardian-paper-profile.webp`)} alt="Original paper-based child profile used as supporting context" fill sizes="(min-width: 1440px) 430px, (min-width: 768px) 33vw, calc(100vw - 40px)" className="object-cover" /></div><div className="mt-4"><Label>Original Profile / Supporting Context</Label></div></div><div className="col-span-12 md:col-span-7 md:col-start-6"><Video name="change-color" alt="Care information changing from red to yellow after discovery" /><div className="mt-4"><MediaTitle>Discover &amp; Review</MediaTitle></div><div className="mt-3 grid grid-cols-2 gap-6"><div><Label>Red / To Discover</Label><Caption>Unexplored care information.</Caption></div><div><Label>Yellow / Reviewed</Label><Caption>Visited information remains accessible for review.</Caption></div></div></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="guardian-profile-completion" poster={`${root}/images/guardian-profile-completion-poster.jpg`} alt="Child Profile completion check after all interaction points have been explored" /></div><div className="sm:col-span-4"><MediaTitle>Check Before Progressing</MediaTitle><div className="mt-4"><Body>Users confirm that all red objects have been explored before moving on.</Body></div></div></div>
        <div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>Grounding the Experience</Label><div className="mt-4"><Body>Conversations with caregivers and autism organisations helped ground the training scenarios in lived experience.</Body></div></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/04   GUIDED PRACTICE" title={<>PRACTICE<br />WITH GUIDANCE</>}>A linear task sequence turns care knowledge into practical decisions.</Opening>
        <div className="mt-20 md:mt-24"><Image src={withBasePath(`${root}/images/Kitchen overview.png`)} alt="Overview of the guided kitchen training environment" width={2179} height={1080} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" /></div>
        <div className="mt-20 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-8">{[["01 / Tableware", "Avoid Object Dependency", "Choose neutral tableware without distinctive branding.", "guardian-kitchen-tableware.mp4"], ["02 / Toast", "Introduce Small Changes", "Adjust a familiar food gradually to expand texture acceptance.", "guardian-kitchen-toast.mp4"], ["03 / Fruit", "Build from Preferences", "Choose a softer fruit instead of introducing a drastic change.", "guardian-journey-kitchen.mp4"]].map(([label, title, copy, file]) => { const name = file.replace(/\.mp4$/, ""); return <div key={label}><Video name={name} poster={`${root}/images/${name}-poster.jpg`} alt={`${title} guided kitchen interaction`} /><div className="mt-4"><Label>{label}</Label><div className="mt-3"><MediaTitle>{title}</MediaTitle></div><div className="mt-2"><Caption>{copy}</Caption></div></div></div>; })}</div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/05   INDEPENDENT PRACTICE" title={<>APPLY WITH<br />LESS GUIDANCE</>}>Learners receive one broader goal — prepare the child for snack time — and decide what requires attention.</Opening>
        <div className="mt-20 md:mt-24"><Image src={withBasePath(`${root}/images/Living room overview.png`)} alt="Overview of the independent living room training environment" width={2177} height={1011} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" /></div>
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2">{[["Reduce Sensory Load", "Close the window to reduce distracting outside noise.", "guardian-living-room-window.mp4"], ["Avoid Abrupt Transitions", "Do not suddenly interrupt an activity the child enjoys.", "guardian-living-room-tv.mp4"], ["Keep Language Simple", "Use brief, literal language rather than unnecessary wording.", "choice-demo.mp4"], ["Use Visual Communication", "Select the appropriate visual card to communicate the next activity.", "socket.mp4"]].map(([title, copy, file]) => { const name = file.replace(/\.mp4$/, ""); const posterExtension = name === "socket" || name === "choice-demo" ? "webp" : "jpg"; return <div key={title}><Video name={name} poster={`${root}/images/${name}-poster.${posterExtension}`} alt={`${title} interaction in the independent living room practice`} /><div className="mt-4"><MediaTitle>{title}</MediaTitle><div className="mt-2"><Caption>{copy}</Caption></div></div></div>; })}</div>
        <article className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>Learning Through Decisions</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>Caregiving principles were translated into situational choices, asking users to practice not only what to do, but how to communicate.</Body></div>
          </div>
          <div className="mt-10 grid grid-cols-12 md:mt-12">
            <Image src={withBasePath(`${root}/images/guardian-training-decision.png`)} alt="Unity prototype asking which sentence a caregiver would say, with three response options" width={2560} height={1357} sizes="(min-width: 1440px) 1130px, (min-width: 768px) 80vw, calc(100vw - 40px)" className="col-span-12 h-auto w-full md:col-span-10 md:col-start-2" />
          </div>
        </article>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="guardian-journey-living-room" poster={`${root}/images/guardian-journey-living-room-poster.jpg`} alt="Independent living room practice showing transition support" /></div><div className="sm:col-span-4"><MediaTitle>Make Time Visible — and Offer Choice</MediaTitle><div className="mt-4"><Body>Present multiple timers so the child can choose how much transition time they need.</Body></div><div className="mt-4"><Caption>The hourglass makes waiting visible while preserving the child&apos;s sense of choice.</Caption></div></div></div>
        <div className="mt-24 grid grid-cols-1 gap-12 md:mt-32 md:grid-cols-2 md:gap-8"><div><Label>Guided Kitchen</Label><p className="case-media-title mt-4">Step-by-step prompts<br />Linear progression<br />Guided decisions</p></div><div><Label>Independent Living Room</Label><p className="case-media-title mt-4">One broader goal<br />Distributed interaction points<br />Independent exploration</p></div></div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/06   SYSTEM" title={<>BUILDING RULES<br />AROUND THE TRAINING</>}>Different learning stages required different scoring, progression and anti-repeat logic.</Opening>
        <div className="mt-20 md:mt-24">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>Building the Training Environment</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>I translated the home-based snack routine into an interactive Unity environment.</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-environment.png`)} alt="Unity Scene View showing the complete living room and kitchen training environment" width={1919} height={949} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>Turning Guidance into Feedback</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>Interaction events connected object states with immediate visual feedback.</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-feedback.png`)} alt="Unity Scene View with two red cups and Select Entered interaction settings visible in the Inspector" width={2415} height={941} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5"><MediaTitle>Building the Practice Loop</MediaTitle></div>
            <div className="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-0"><Body>Task states, object placement, UI feedback, and scoring were linked into one practice sequence.</Body></div>
          </div>
          <Image src={withBasePath(`${root}/images/guardian-unity-practice-system.png`)} alt="Unity scene with the practice tray, task prompt, hierarchy and L2 Score System Inspector" width={2560} height={1357} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-10 h-auto w-full md:mt-12" />
        </div>
        <div className="mt-24 grid grid-cols-12 items-start gap-x-6 gap-y-8 md:mt-32 md:gap-x-8">
          <Image src={withBasePath(`${root}/images/guardian-caregiving-principle.png`)} alt="Unity Inspector containing research-informed guidance about short literal language and body language" width={734} height={1091} sizes="(min-width: 1440px) 430px, (min-width: 768px) 34vw, calc(100vw - 40px)" className="col-span-12 h-auto w-full md:col-span-4" />
          <div className="col-span-12 md:col-span-5 md:col-start-7 md:pt-4"><MediaTitle>Encoding Caregiving Principles</MediaTitle><div className="mt-4"><Body>Research-informed guidance was embedded directly into the training content and feedback system.</Body></div></div>
        </div>
        <div className="mt-20 md:mt-24"><Label>Guided Kitchen System</Label></div>
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-5 md:gap-x-8">
          <div className="col-span-12 md:col-span-4"><MediaTitle>Decision Gating</MediaTitle></div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="space-y-4"><Body>The first choice locks the result and removes the alternative.</Body><Body>The next task unlocks only after the current one is complete.</Body></div>
            <p className="case-media-title mt-6">Choose → Lock → Remove Alternative → Unlock Next</p>
          </div>
        </div>
        <div className="mt-24 md:mt-32">
          <MediaTitle>Validation &amp; Repeat Prevention</MediaTitle>
          <Image src={withBasePath(`${root}/images/Collision Validation.png`)} alt="Unity gameplay context and full Inspector showing collider validation and Grab being disabled after scoring" width={2012} height={904} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="mt-8 h-auto w-full" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div><Label>Collision Validation</Label><div className="mt-2"><Caption>Tags and colliders determine which choice was made.</Caption></div></div>
            <div><Label>Prevent Repeated Scoring</Label><div className="mt-2"><Caption>After scoring, the selected object&apos;s Grab interaction is disabled.</Caption></div></div>
          </div>
          <p className="case-media-title mt-6">Choose → Collider Validates → Score → Disable Grab</p>
        </div>
        <div className="mt-24 md:mt-32">
          <Label>Living Room System</Label>
          <div className="mt-8"><MediaTitle>Living Room<br />Task Logic</MediaTitle></div>
          <LazyVideo src={`${root}/images/socket.mp4`} poster={`${root}/images/socket-poster.webp`} alt="Living Room socket placement and distributed scoring interaction" className="mt-8 block aspect-video w-full object-cover" />
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div><Label>Stable Placement</Label><div className="mt-2"><Caption>Sockets snap objects into their intended positions.</Caption></div></div>
            <div><Label>Distributed Scoring</Label><div className="mt-2"><Caption>Living Room tasks score independently across different interaction points.</Caption></div></div>
          </div>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-20 md:grid-cols-2">{contributions.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52">
        <Opening label="/07   VALIDATION" title={<>TESTED WITH<br />12 PARTICIPANTS</>}>The completed VR training was compared with a paper-based child profile.</Opening>
        <div className="mt-20 grid grid-cols-2 gap-6 md:mt-24 md:w-1/2 md:gap-8"><div><Label>VR Training</Label><p className="case-stage-title mt-4">6 / VR</p></div><div><Label>Paper Profile</Label><p className="case-stage-title mt-4">6 / Paper</p></div></div>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>Responsiveness</Label><p className="case-section-title mt-4">Significantly<br />Higher in VR</p><p className="case-media-title mt-4">p = 0.044</p></div><div className="col-span-12 md:col-span-6"><Label>Confidence</Label><div className="mt-4 grid grid-cols-2 gap-6"><div><p className="case-media-title">VR</p><p className="case-stage-title mt-2">6 / 6</p></div><div><p className="case-media-title">Paper</p><p className="case-stage-title mt-2">3 / 6</p></div></div><p className="case-media-caption mt-4">All VR participants reported confidence, compared with half of the paper group.</p></div></div>
        <p className="case-body mt-16 max-w-xl text-[#716b64]">Other measured outcomes did not reach statistical significance.</p>
      </section>
    </div>

    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
