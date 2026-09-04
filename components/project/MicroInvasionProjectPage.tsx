"use client";

import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import LearningStageShowcase from "@/components/project/LearningStageShowcase";
import { nextSequenceEntry } from "@/data/projectSequence";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { CaseLearningShowcase } from "@/types/caseStudy";

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
  const reducedMotion = usePrefersReducedMotion();
  const journey: CaseLearningShowcase = { intervalMs: 7500, useMediaDuration: true, stages: [
    { id: "touch", title: "Skin Contact", titleZh: "Skin Contact", copy: "Using hand sanitizer makes invisible contact visible across the hand.", copyZh: "Using hand sanitizer makes invisible contact visible across the hand.", media: { kind: "video", src: `${root}/images/experience-touch.mp4`, poster: `${root}/images/experience-touch-poster.jpg`, aspect: "wide", fit: "contain", alt: "Skin exposure spreading across the hand" } },
    { id: "eat", title: "Food Intake", titleZh: "Food Intake", copy: "An everyday food interaction reveals hidden microplastic intake.", copyZh: "An everyday food interaction reveals hidden microplastic intake.", media: { kind: "video", src: `${root}/images/experience-eat.mp4`, poster: `${root}/images/experience-eat-poster.jpg`, aspect: "wide", fit: "contain", alt: "Food intake represented by facial particles" } },
    { id: "breathe", title: "Respiration", titleZh: "Respiration", copy: "Synthetic fibers become visible as airborne particles through an everyday wiping gesture.", copyZh: "Synthetic fibers become visible as airborne particles through an everyday wiping gesture.", media: { kind: "video", src: `${root}/images/experience-breathe.mp4`, poster: `${root}/images/experience-breathe-poster.jpg`, aspect: "wide", fit: "contain", alt: "Airborne fibers attaching to clothing" } },
    { id: "reveal", title: "The Environment", titleZh: "The Environment", copy: "Once all three exposure states are complete, contamination expands beyond the body into the mapped room.", copyZh: "Once all three exposure states are complete, contamination expands beyond the body into the mapped room.", media: { kind: "video", src: `${root}/images/world-mesh-reveal.mp4`, poster: `${root}/images/world-mesh-reveal-poster.webp`, aspect: "wide", alt: "World Mesh final environment reveal" } },
  ] };
  const roles = [["Concept Direction", "Microplastic theme and interaction framing"], ["Interaction Design", "Three exposure interactions and final reveal logic"], ["AR Development", "Tracking, segmentation, triggers, particles and world mesh"], ["Prototyping", "Template adaptation, debugging tools and trigger calibration"]];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>THE<br />MICRO_INVASION</>} titleClassName="!text-[clamp(4.5rem,9vw,9rem)]" proposition={<>Making invisible microplastic exposure<br />visible on the body and across the surrounding space.</>} role="Interaction & AR Developer" year="2024" team="Chuyue Yu · Yike Hu · Lisi Xie" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt="Body particles and spatial AR in The Micro_Invasion" /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label="/01   EXPERIENCE" title={<>TOUCH.<br />EAT.<br />BREATHE.<br />REVEAL.</>}>Everyday actions become visible exposure points.</Opening><LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={false} /><p className="case-media-title mt-12 md:mt-16">Touch → Eat → Breathe → Reveal</p><div className="mt-5 max-w-xl"><Caption>The first three interactions can happen in any order. The final reveal activates only after all three exposure states are complete.</Caption></div></section>

      <section className="py-28 md:py-52"><Opening label="/02   INTERACTION" title={<>THE BODY<br />BECOMES THE INTERFACE</>}>Three everyday actions make invisible exposure visible.</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="skin-spread" alt="Skin exposure particles spreading across the tracked hand" /></div><div className="sm:col-span-4"><Label>01 / Skin · Touch</Label><div className="mt-4"><MediaTitle>Skin Contact</MediaTitle></div><div className="mt-4"><Body>Sanitizer makes skin exposure visible across the hand.</Body></div></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-4"><Label>02 / Food · Eat</Label><div className="mt-4"><MediaTitle>Food Intake</MediaTitle></div><div className="mt-4"><Body>Eating an apple reveals hidden intake on the face.</Body></div></div><div className="sm:col-span-8 sm:col-start-5"><Video name="face-particles" alt="Food intake represented by tracked facial particles" /></div></div>
        <div className="case-media-split mt-24 md:mt-32"><div className="sm:col-span-8"><Video name="fiber-attachment" alt="Airborne fibers attaching to tracked clothing" /></div><div className="sm:col-span-4"><Label>03 / Respiration · Breathe</Label><div className="mt-4"><MediaTitle>Respiration</MediaTitle></div><div className="mt-4"><Body>A wiping gesture turns synthetic fibers into visible particles.</Body></div></div></div>
      </section>

      <section className="py-28 md:py-52"><Opening label="/03   DEVELOPMENT" title={<>FROM TEMPLATE<br />TO CUSTOM SYSTEM</>}>I adapted existing Lens Studio templates to separate body effects and stabilize physical interactions.</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="segmentation" alt="Body segmentation system separating tracked regions" /></div><div className="sm:col-span-4"><Label>03.1 / Separating the Body</Label><div className="mt-4"><MediaTitle>One Template,<br />Three Regions</MediaTitle></div><div className="mt-4"><Body>I traced the template to control hand, face and clothing effects independently.</Body></div></div></div>
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5">
              <Label>03.2 / Calibration</Label>
              <div className="mt-4"><MediaTitle>Proximity Trigger<br />Calibration</MediaTitle></div>
            </div>
            <div className="col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-0">
              <Body>Three nearby triggers required a distance threshold that was responsive without causing false activations.</Body>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Video name="trimMark" alt="Calibration debug view showing virtual trigger cubes, the tracked hand marker and live distance values" className="aspect-[8/5]" fit="contain" />
            <div className="mt-5 max-w-xl">
              <Label>Debug Setup</Label>
              <div className="mt-2"><Caption>QR marker anchors the virtual triggers; live hand distance helps tune the activation range.</Caption></div>
            </div>
          </div>
        </div>
        <div className="mt-24 md:mt-32"><Label>03.3 / Experience State</Label><div className="mt-4"><MediaTitle>Three Triggers,<br />One Payoff</MediaTitle></div><div className="mt-12 grid grid-cols-3 gap-6 text-center"><div><Label>Skin</Label><p className="case-stage-title mt-3">✓</p></div><div><Label>Food</Label><p className="case-stage-title mt-3">✓</p></div><div><Label>Fabric</Label><p className="case-stage-title mt-3">✓</p></div></div><div className="mx-auto mt-8 max-w-sm text-center"><p className="case-stage-title">↓</p><p className="case-media-title mt-5">Final Reveal</p><div className="mt-4"><Caption>Any order. The reveal starts only when all three are complete.</Caption></div></div></div>
      </section>
    </div>

    <section className="bg-[#1b1917] py-28 text-white md:py-52"><div className="mx-auto max-w-[90rem] px-5 md:px-10"><div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label light>/04&nbsp;&nbsp; FINAL REVEAL</Label><h2 className="case-section-title mt-6 text-white">FROM BODY<br />TO SPACE</h2></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><p className="case-lead text-white/75">Once all three exposure paths are complete, contamination expands from the body into the mapped environment.</p></div></div><div className="relative left-1/2 mt-20 aspect-[16/9] w-screen -translate-x-1/2 overflow-hidden bg-black md:mt-24"><LazyVideo src={`${root}/images/world-mesh-reveal.mp4`} poster={`${root}/images/world-mesh-reveal-poster.webp`} alt="World Mesh extending microplastic particles into the room" className="absolute inset-0 h-full w-full object-cover" /></div><div className="mt-10 grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-5"><p className="case-project-title !text-[clamp(2.6rem,5vw,6rem)] text-white">WELCOME TO THE<br />WORLD OF MICROPLASTICS.</p></div><div className="col-span-12 mt-10 md:col-span-4 md:col-start-9 md:mt-0"><MediaTitle>World Mesh / Performance</MediaTitle><p className="case-media-caption mt-3 text-white/60">Particle density was tuned to keep the room-scale effect responsive while preserving the visual impact.</p></div></div></div></section>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10"><section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label="/05   ROLE" title={<>ROLE &amp;<br />BUILD</>}>My work connected concept direction, interaction design, AR development and technical prototyping.</Opening><dl className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-24 md:grid-cols-2">{roles.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl><div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>Team / Ownership</Label><dl className="mt-6 space-y-5"><div><dt className="case-media-title">Chuyue Yu</dt><dd className="case-body mt-1">Interaction Designer</dd></div><div><dt className="case-media-title">Yike Hu</dt><dd className="case-body mt-1">Visual Designer &amp; Video Editor</dd></div><div><dt className="case-media-title">Lisi Xie</dt><dd className="case-body mt-1">Interaction &amp; AR Developer</dd></div></dl></div><dl className="col-span-12 grid gap-8 md:col-span-7 md:col-start-6 md:grid-cols-2"><div><dt className="case-media-title">Microplastic Direction</dt><dd className="case-body mt-2">Lisi Xie</dd></div><div><dt className="case-media-title">Dining-Table Concept</dt><dd className="case-body mt-2">Developed collaboratively</dd></div><div><dt className="case-media-title">Interaction Flow</dt><dd className="case-body mt-2">Lisi Xie</dd></div><div><dt className="case-media-title">Primary Technical Development</dt><dd className="case-body mt-2">Lisi Xie</dd></div></dl></div><p className="case-category-label mt-24 text-muted md:mt-32" aria-disabled="true">View Development Timeline ↗</p></section></div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
