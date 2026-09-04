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
  const reducedMotion = usePrefersReducedMotion();
  const journey: CaseLearningShowcase = { useMediaDuration: true, stages: [
    { id: "wish", title: "Make a Wish", titleZh: "Make a Wish", copy: "Close your eyes to begin the ritual.", copyZh: "Close your eyes to begin the ritual.", media: { kind: "video", src: `${root}/images/gif-wish.mp4`, poster: `${root}/images/gif-wish-poster.webp`, aspect: "wide", alt: "Closing the eyes to make a wish in VR" } },
    { id: "fortune", title: "Draw a Fortune", titleZh: "Draw a Fortune", copy: "Shake the bucket to reveal a fortune.", copyZh: "Shake the bucket to reveal a fortune.", media: { kind: "video", src: `${root}/images/gif-bucket.mp4`, poster: `${root}/images/gif-bucket-poster.webp`, aspect: "wide", alt: "Shaking a fortune bucket in VR" } },
    { id: "festival", title: "Begin Festival", titleZh: "Begin Festival", copy: "Beat the drum to set the celebration in motion.", copyZh: "Beat the drum to set the celebration in motion.", media: { kind: "video", src: `${root}/images/gif-drum.mp4`, poster: `${root}/images/gif-drum-poster.webp`, aspect: "wide", alt: "Beating a festival drum in VR" } },
    { id: "blessing", title: "Write a Blessing", titleZh: "Write a Blessing", copy: "Trace the Fu character by hand.", copyZh: "Trace the Fu character by hand.", media: { kind: "video", src: `${root}/images/gif-write.mp4`, poster: `${root}/images/gif-write-poster.webp`, aspect: "wide", alt: "Writing the Fu character in VR" } },
    { id: "release", title: "Send the Wish", titleZh: "Send the Wish", copy: "Light and release a lantern into the night.", copyZh: "Light and release a lantern into the night.", media: { kind: "video", src: `${root}/images/gif-lantern.mp4`, poster: `${root}/images/gif-lantern-poster.webp`, aspect: "wide", alt: "Releasing a glowing lantern in VR" } },
  ] };
  const roles = [
    ["Unity / XR Development", "Lantern ignition and release, plus the handwriting interaction."],
    ["VFX", "Fireworks and the Buddha visual response."],
    ["World Building", "Terrain, lighting and environment polish."],
    ["Motion", "Cinemachine NPC loops and scene movement."],
  ];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>LET&apos;S MAKE<br />A WISH</>} proposition={<>Traditional wish-making rituals reimagined<br />as an interactive XR experience.</>} role={<>Technical Artist<br />Interaction Designer</>} year="2024" team="Lisi Xie · Chuyue Yu · Wenqu Tang" mediaSrc={`${root}/images/gif-lantern.mp4`} poster={`${root}/images/gif-lantern-poster.webp`} mediaAlt="A glowing lantern rising through the VR festival environment" /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52">
        <Opening label="/01   EXPERIENCE" title={<>FIVE ACTIONS.<br />ONE RITUAL.</>}>A wish unfolds through five embodied interactions, from a quiet intention to a lantern released into the night.</Opening>
        <LearningStageShowcase showcase={journey} reducedMotion={reducedMotion} isZh={false} />
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/02   INTERACTION" title={<>RITUAL<br />→ ACTION<br />→ RESPONSE</>}>Each familiar gesture produces an immediate response, making the cultural ritual legible through action.</Opening>
        <div className="mt-20 grid grid-cols-1 gap-14 md:mt-24 md:grid-cols-3 md:gap-8">
          <div><Video name="gif-bucket" alt="Fortune appearing after the bucket is shaken" /><div className="mt-4"><Label>Shake → Fortune</Label><div className="mt-3"><MediaTitle>Draw a Fortune</MediaTitle></div><div className="mt-2"><Caption>Shaking the bucket generates a personalized fortune stick.</Caption></div></div></div>
          <div><Video name="gif-write" alt="Writing a blessing with a virtual brush" /><div className="mt-4"><Label>Write → Blessing</Label><div className="mt-3"><MediaTitle>Trace Fu</MediaTitle></div><div className="mt-2"><Caption>Handwriting turns a symbolic character into an embodied gesture.</Caption></div></div></div>
          <div><Video name="gif-lantern" alt="Lantern lighting and rising into the virtual sky" /><div className="mt-4"><Label>Light → Release</Label><div className="mt-3"><MediaTitle>Send the Wish</MediaTitle></div><div className="mt-2"><Caption>The final action transforms intention into a visible ascent.</Caption></div></div></div>
        </div>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/03   LANTERN" title={<>LIGHT.<br />RELEASE.<br />ASCEND.</>}>The lantern sequence carries the experience from close-range interaction to a large-scale visual payoff.</Opening>
        <div className="mt-20 md:mt-24"><Video name="gif-lantern" alt="Complete lantern ignition release and ascent sequence" className="aspect-[16/8]" /></div>
        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          <div><Label>01 / Ignition</Label><div className="mt-3"><MediaTitle>Light</MediaTitle></div><div className="mt-2"><Caption>A close interaction activates the lantern.</Caption></div></div>
          <div><Label>02 / Release</Label><div className="mt-3"><MediaTitle>Let Go</MediaTitle></div><div className="mt-2"><Caption>The gesture shifts from holding to sending.</Caption></div></div>
          <div><Label>03 / Payoff</Label><div className="mt-3"><MediaTitle>Ascend</MediaTitle></div><div className="mt-2"><Caption>Light, flight and fireworks complete the ritual.</Caption></div></div>
        </div>
        <aside className="mt-20 grid grid-cols-12 md:mt-28"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>Keeping the Lantern Visible in Flight</Label><div className="mt-4"><Body>The lantern became too dark at distance, so I adjusted its material and lighting to preserve its silhouette through the ascent.</Body></div></div></aside>
      </section>

      <section className="py-28 md:py-52">
        <Opening label="/04   EMBODIED INTERACTION" title={<>GESTURE<br />BECOMES<br />MEANING</>}>Writing and prayer turn symbolic actions into readable visual feedback.</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="gif-write" alt="Handwriting the Fu character in virtual reality" /></div><div className="sm:col-span-4"><Label>Writing / Primary Interaction</Label><div className="mt-4"><MediaTitle>Write a Blessing</MediaTitle></div><div className="mt-4"><Body>I built the board and pen interaction so the Fu character could be traced directly in space.</Body></div></div></div>
        <div className="mt-24 grid grid-cols-12 items-center gap-x-6 gap-y-10 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>Buddha / Visual Response</Label><div className="mt-4"><MediaTitle>A Quiet Signal</MediaTitle></div><div className="mt-4"><Body>Wenqu Tang created the original eye-close mechanic. I added the halo and visual response that confirms the wish.</Body></div></div><div className="col-span-12 md:col-span-6 md:col-start-7"><Video name="gif-wish" alt="Buddha halo responding when the player closes their eyes" /></div></div>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52">
        <Opening label="/05   ROLE" title={<>ROLE &amp;<br />CONTRIBUTION</>}>My role connected interaction development, real-time effects, environmental polish and motion into one coherent XR ritual.</Opening>
        <article className="mt-20 md:mt-24" aria-labelledby="lighting-process-title">
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-8">
            <div className="col-span-12 md:col-span-5">
              <Label>05.2 / Lighting &amp; Atmosphere</Label>
              <div className="mt-4"><MediaTitle><span id="lighting-process-title">Lighting the Ritual Space</span></MediaTitle></div>
            </div>
            <div className="col-span-12 mt-5 md:col-span-5 md:col-start-8 md:mt-0">
              <Body>Warm localized lighting guides attention toward the shrine while keeping the surrounding landscape dark.</Body>
            </div>
          </div>
          <div className="mt-10 md:mt-12">
            <Image src={withBasePath(`${root}/images/unity-lighting-process.png`)} alt="Unity Scene View showing localized shrine lighting, surrounding dark landscape and lighting gizmos" width={2414} height={1227} sizes="(min-width: 1440px) 1360px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 40px)" className="h-auto w-full" />
          </div>
        </article>
        <dl className="mt-24 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-32 md:grid-cols-2">{roles.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl>
        <div className="mt-24 grid grid-cols-1 gap-14 border-t border-[#1b1917]/20 pt-12 md:mt-32 md:grid-cols-3 md:gap-8">
          <div><Label>Lisi Xie</Label><p className="case-media-title mt-4">Lantern interaction<br />Handwriting board &amp; pen<br />Fireworks &amp; Buddha halo<br />Lighting, environment &amp; Cinemachine</p></div>
          <div><Label>Chuyue Yu</Label><p className="case-media-title mt-4">Environment &amp; NPC arrangement<br />Asset sourcing<br />Drum interaction</p></div>
          <div><Label>Wenqu Tang</Label><p className="case-media-title mt-4">Fortune bucket<br />Eye-close interaction</p></div>
        </div>
      </section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
