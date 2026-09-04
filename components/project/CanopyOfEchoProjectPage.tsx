"use client";

import Image from "next/image";
import LazyVideo from "@/components/LazyVideo";
import { withBasePath } from "@/lib/paths";
import NextProjectTransition from "@/components/NextProjectTransition";
import { nextSequenceEntry } from "@/data/projectSequence";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";

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
  const interactionStages = [
    ["01 / Presence", "Visitor approaches"],
    ["02 / Detection", "MediaPipe detects position"],
    ["03 / Signal", "TouchDesigner → OSC → Unreal"],
    ["04 / Response", "Unit pauses on approach and resumes when the visitor leaves"],
  ];
  const roles = [["Spatial + 3D", "3D modelling and environment development."], ["Interaction Prototyping", "Unreal, TouchDesigner and OSC integration."], ["Storytelling", "Developing heritage stories into narrative units."], ["Production", "Coordination, budgeting and final video production."]];
  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title={<>CANOPY<br />OF ECHO</>} outcome="BEST HERITAGE NARRATIVE PRIZE" proposition="A kinetic installation that turns heritage stories into motion, light, and spatial encounter." role="Creative Technologist" year="2025" team="Saurabhkumar Parmar · Findlay Cumming · Jingru Feng · Lisi Xie" mediaSrc={`${root}/rendered.mp4`} poster={`${root}/rendered-poster.webp`} mediaAlt="Canopy of Echo kinetic installation in motion" /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label="/01   EXPERIENCE" title={<>THE EXPERIENCE</>}>Heritage stories can feel distant when they remain contained in sites, objects, and text. Canopy of Echo makes them spatial and observable: visitors meet stories through movement, light, and proximity.</Opening><div className="mt-20 md:mt-24"><Video name="user-journey-5-1" alt="Visitors experiencing the illuminated kinetic canopy" className="aspect-[16/8]" /></div></section>

      <section className="py-28 md:py-52"><Opening label="/02   SPATIAL NARRATIVE" title={<>ONE WALL,<br />ONE TOWER,<br />ONE RIVER</>}>The installation connects architecture, landscape, and audience through a continuous spatial narrative.</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-32">
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>01 / River</Label><div className="mt-4"><Subheading>Flow of Memory</Subheading></div><div className="mt-5"><Body>A continuous sine-wave rhythm references the river and the movement of collective memory across generations.</Body></div></div><div className="col-span-12 mt-10"><Video name="rendered" alt="Wide rendered view of the flowing kinetic installation" className="aspect-[16/7]" /></div></article>
        <article className="case-media-split"><div className="sm:col-span-4"><Label>02 / Wall</Label><div className="mt-4"><Subheading>Reconstructing What Once Stood</Subheading></div><div className="mt-5"><Body>Facing the ancient city wall, the installation’s roofline and perspective reference the lost historic structure—allowing its outline to be perceived again.</Body></div></div><div className="sm:col-span-8 sm:col-start-5"><Video name="user-journey-5-2" alt="Installation perspective reconstructing the historic wall" /></div></article>
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-7"><Video name="user-journey-5-3" alt="A visitor approaching an individual story unit" /></div><div className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0 md:self-center"><Label>03 / Tower</Label><div className="mt-4"><Subheading>Approaching Stories</Subheading></div><div className="mt-5"><Body>As a visitor approaches a unit, its movement pauses so the embedded story can be observed.</Body></div></div></article>
        <article className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-4"><Label>04 / Audience</Label><div className="mt-4"><Subheading>Living Memory</Subheading></div><div className="mt-5"><Body>Heritage becomes an evolving archive rather than fixed historical content—inviting people to rediscover relics and contribute personal stories.</Body></div></div><div className="col-span-12 mt-10 md:col-span-9 md:col-start-4"><Video name="user-journey-5-4" alt="Audience participating in the living heritage archive" className="aspect-[16/8]" /></div></article>
      </div></section>

      <section className="py-28 md:py-52"><Opening label="/03   STORIES" title={<>STORIES IN<br />THE CANOPY</>}>The team distilled 18 historical and contemporary stories into narrative units embedded throughout the installation.</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-32">
        <article className="grid grid-cols-12 items-center gap-x-6 md:gap-x-8"><div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-7 md:gap-8"><StoryImage src={`${root}/Relics1.webp`} alt="The Returning Relics artwork" /><StoryImage src={`${root}/Relics2.webp`} alt="The Returning Relics detail" /></div><div className="col-span-12 mt-8 md:col-span-5 md:mt-0"><Label>01 / Story</Label><div className="mt-4"><Subheading>The Returning Relics</Subheading></div><div className="mt-5"><Body>A family chose to donate more than 30 treasured artefacts, protecting a shared inheritance instead of treating it as private property.</Body></div></div></article>
        <article className="grid grid-cols-12 items-center gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>02 / Story</Label><div className="mt-4"><Subheading>History Beneath Our Feet</Subheading></div><div className="mt-5"><Body>An everyday brick beneath an elderly woman’s stool was discovered to be a 600-year-old Ming city-wall brick—history hidden in daily life.</Body></div></div><div className="col-span-12 mt-8 grid grid-cols-2 gap-6 md:col-span-7 md:mt-0 md:gap-8"><StoryImage src={`${root}/Feet1.webp`} alt="History Beneath Our Feet artwork" /><StoryImage src={`${root}/Feet2.webp`} alt="History Beneath Our Feet detail" /></div></article>
      </div></section>

      <section className="py-28 md:py-52"><Opening label="/04   INTERACTION" title={<>PROVING THE<br />INTERACTION</>}>Visitor position is detected and translated into a responsive motion state, pausing the corresponding story unit before movement resumes.</Opening><div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-24 md:items-center md:gap-x-8"><div className="col-span-12 md:col-span-4"><ol className="space-y-8">{interactionStages.map(([label, description]) => <li key={label}><Label>{label}</Label><p className="case-body mt-2 text-ink">{description}</p></li>)}</ol></div><div className="col-span-12 mt-10 md:col-span-8 md:mt-0"><Video name="TD" alt="TouchDesigner visitor-position feasibility test" /><div className="mt-4"><MediaTitle>TouchDesigner / Position Detection</MediaTitle><div className="mt-2"><Caption>Camera position data drives the responsive motion state.</Caption></div></div></div></div><div className="case-media-pair mt-28 md:mt-32"><div className="case-media-unit"><Video name="OSC" alt="OSC communication test" /><div className="mt-4"><MediaTitle>OSC / Signal Routing</MediaTitle><div className="mt-2"><Caption>Passing visitor-state data between TouchDesigner and Unreal.</Caption></div></div></div><div className="case-media-unit"><Video name="unreal-prototype" alt="Unreal motion prototype" /><div className="mt-4"><MediaTitle>Unreal / Motion State</MediaTitle><div className="mt-2"><Caption>Visualizing the corresponding unit response.</Caption></div></div></div></div></section>

      <section className="py-28 md:py-52"><Opening label="/05   PROCESS" title={<>FROM SYSTEM<br />TO SPACE</>}>The project moved from behavior validation to spatial translation, physical scale testing, and a larger working demonstration.</Opening><div className="case-media-pair mt-20 md:mt-24">
        <article className="case-media-unit case-media-stack"><div><Label>01 / Feasibility</Label><div className="mt-4"><Subheading>TouchDesigner Test</Subheading></div><div className="mt-2"><Caption>Validate that visitor position could trigger a unit’s motion state.</Caption></div></div><Video name="TD" alt="Short TouchDesigner feasibility test" /></article>
        <article className="case-media-unit case-media-stack"><div><Label>02 / Spatialization</Label><div className="mt-4"><Subheading>Rendered Model</Subheading></div><div className="mt-2"><Caption>Translate the interaction into a complete architectural environment.</Caption></div></div><Video name="rendered" alt="Rendered spatial model" /></article>
        <article className="case-media-unit case-media-stack"><div><Label>03 / Scale Test</Label><div className="mt-4"><Subheading>Small-Scale Model</Subheading></div><div className="mt-2"><Caption>Test the kinetic idea as a physical assembly.</Caption></div></div><Video name="small-scale-model" alt="Small-scale physical model" /></article>
        <article className="case-media-unit case-media-stack"><div><Label>04 / Physical Prototype</Label><div className="mt-4"><Subheading>Large Demo</Subheading></div><div className="mt-2"><Caption>Built at scale to go beyond digital rendering.</Caption></div></div><Video name="physical-model" alt="Large physical kinetic demonstration" /></article>
      </div></section>

      <section className="py-28 md:py-52"><div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-7"><Label>/06&nbsp;&nbsp; CONTRIBUTION</Label><div className="mt-5"><Title>MY CONTRIBUTION</Title></div></div><dl className="col-span-12 mt-14 md:col-span-5 md:mt-0">{roles.map(([title, body]) => <div key={title} className="py-6"><dt className="case-category-label">{title}</dt><dd className="case-body mt-3 text-[#716b64]">{body}</dd></div>)}</dl></div></section>
    </div>

    <section className="bg-[#1b1917] py-28 text-[#faf6f1] md:py-52">
      <div className="mx-auto grid max-w-[90rem] grid-cols-12 items-start gap-x-6 px-5 md:gap-x-8 md:px-10">
        <div className="col-span-12 min-w-0 lg:col-span-5">
          <Label light>/07&nbsp;&nbsp; OUTCOME</Label>
          <h2 className="case-project-title mt-5 !text-[clamp(3.75rem,6.5vw,7rem)] !leading-[0.83] text-white">BEST<br />HERITAGE<br />NARRATIVE<br />PRIZE</h2>
          <p className="case-lead mt-8 text-white/65">Winner — Best Heritage Narrative Prize<br />2025 Digital Heritage Competition</p>
        </div>
        <div className="col-span-12 mt-12 min-w-0 lg:col-span-7 lg:mt-0">
          <Image src={withBasePath(`${root}/Outcome.webp`)} alt="Team at the 2025 Digital Heritage Competition award ceremony" width={1600} height={1067} className="h-auto w-full object-cover" />
        </div>
      </div>
    </section>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
