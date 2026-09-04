"use client";

import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import { nextSequenceEntry } from "@/data/projectSequence";

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
  ["Low-Carbon Behavior", "Everyday actions"], ["Resources", "Coins · Power · EXP"], ["SCM", "Personal carbon monsters"], ["Purify / Collect / Battle", "Player actions"], ["Personal Progress", "Individual progression"], ["LCM", "Collective city boss"],
];

function SystemDiagram() {
  return <figure className="mt-20 md:mt-24" aria-labelledby="carbon-system-caption"><div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.35fr_auto_1fr_auto_1fr] md:items-center md:gap-x-4">{systemStages.map(([title, detail], index) => <div key={title} className="contents"><div className="py-2">{index === 4 && <p className="case-meta-label mb-3">Personal</p>}{index === 5 && <p className="case-meta-label mb-3 text-ink">Collective</p>}<p className={`font-display text-[clamp(1.35rem,2.3vw,2.25rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] ${index === 5 ? "text-ink" : "text-ink/85"}`}>{title}</p><p className="case-media-caption mt-3">{detail}</p></div>{index < systemStages.length - 1 && <span className="font-mono text-sm text-muted/60 md:text-center" aria-hidden="true">→</span>}</div>)}</div><figcaption id="carbon-system-caption" className="sr-only">Conceptual game system from low-carbon behavior and resources to personal monsters, player actions, personal progress, and a collective city boss.</figcaption></figure>;
}

function ConceptBuiltDistinction() {
  return <dl className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-8"><div><dt className="case-media-title">Concept System</dt><dd className="case-media-caption mt-3">Tracking · Resources · Collection · Progression · City aggregation</dd></div><div><dt className="case-media-title">Built Prototype</dt><dd className="case-media-caption mt-3">AR placement · Encounter · Battle interaction</dd></div></dl>;
}

function CarbonVideo({ name, poster, alt, className, fit = "cover" }: { name: string; poster: string; alt: string; className: string; fit?: "cover" | "contain" }) {
  return <div className={`relative overflow-hidden bg-surface ${className}`}><LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${poster}`} alt={alt} className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`} /></div>;
}

function NativeCarbonVideo({ name, poster, alt }: { name: string; poster: string; alt: string }) {
  return <LazyVideo src={`${root}/images/${name}.mp4`} poster={`${root}/images/${poster}`} alt={alt} className="block h-auto w-full" />;
}

export default function CarbonNeutralProjectPage() {
  const interactionSteps = ["Detect surface", "Place encounter", "Engage", "Attack", "Enemy response"];
  const soloRoles = ["Concept Development", "System Design", "Game Mechanics", "Visual Design", "3D Asset Development", "AR Prototype", "Unity Development", "UI / Animation"];
  return <main className="min-h-screen overflow-x-clip bg-bg text-ink">
    <header><CaseStudyCinematicHero descriptor="AR Game / System Design / Unity" title={<>Personal /<br />Carbon Neutral</>} proposition="A speculative carbon-reduction game system that turns everyday low-carbon behavior into resources for AR battles." role="Solo Project" year="2022" team="System Design / AR Prototyping / 3D" teamLabel="Focus" tools="Unity / Vuforia / C# / Cinema 4D" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt="Personal Carbon Neutral AR battle prototype" titleClassName="!text-[clamp(3.25rem,7vw,6.5rem)] !leading-[0.82]" /></header>
    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label="/01   System" title={<>Turning Carbon<br />Into a Game System</>}>Instead of presenting carbon emissions as abstract numbers, I explored how everyday low-carbon behavior could become part of a playable resource system.</Opening><SystemDiagram /><ConceptBuiltDistinction /></section>

      <section className="py-28 md:py-52"><Opening label="/02   Visual Metaphor" title={<>From Personal<br />to Collective</>}>The system shifts scale from player-specific carbon creatures to a shared city-level opponent.</Opening><div className="mt-20 space-y-28 md:mt-24 md:space-y-40"><article className="case-media-unit"><NativeCarbonVideo name="scm-lifecycle" poster="scm-lifecycle-poster.webp" alt="SCM lifecycle concept animation" /><div className="mt-5"><Label>SCM</Label><div className="mt-3"><MediaTitle>Small Carbon Monsters</MediaTitle></div><div className="mt-2"><Caption>Personal emissions represented as player-specific creatures.</Caption></div></div></article><article className="case-media-unit"><NativeCarbonVideo name="lcm-formation" poster="lcm-formation-poster.webp" alt="LCM collective boss formation concept animation" /><div className="mt-5"><Label>LCM</Label><div className="mt-3"><MediaTitle>Large Carbon Monsters</MediaTitle></div><div className="mt-2"><Caption>Combined city emissions represented as a shared boss.</Caption></div></div></article></div><p className="case-stage-title mt-20 max-w-3xl md:mt-28">What begins as an individual footprint becomes a collective opponent.</p></section>

      <section className="py-28 md:py-52"><p className="case-media-title">Built Prototype</p><div className="mt-8"><Opening label="/03   Play" title={<>From System<br />to Play</>}>The conceptual system became tangible through one focused implementation: a working AR encounter and battle loop.</Opening></div><div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-10 md:col-start-2"><CarbonVideo name="ar-prototype-demo" poster="ar-prototype-demo-poster.webp" alt="Working Personal Carbon Neutral AR battle prototype" className="aspect-[800/370]" fit="contain" /></div></div><ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20 md:grid-cols-5 md:gap-6">{interactionSteps.map((step, index) => <li key={step}><p className="case-meta-label">{String(index + 1).padStart(2, "0")}</p><p className="case-media-title mt-3">{step}</p></li>)}</ol><div className="mt-16 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>Technology</Label><p className="case-media-title mt-4 leading-relaxed">Unity / Vuforia / C# / Animator / UI / Character Animation</p></div><div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-0"><Body>The wider carbon system remained conceptual; the AR battle loop was developed as the working prototype.</Body></div></div></section>

      <section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label="/04   Build" title={<>From Visual Idea<br />to Working Asset</>}>Technical problem solving meant preserving the character idea while changing how the asset was built.</Opening><div className="case-media-split case-media-split-top mt-20 md:mt-24"><div className="sm:col-span-5"><Body>I initially explored a particle-based visual treatment in Cinema 4D. When the effect could not transfer reliably into Unity, I simplified the asset pipeline and rebuilt the visual as a Unity-ready model.</Body><div className="mt-10" aria-label="Asset development process"><p className="case-media-title leading-relaxed">C4D Particle Test<br /><span className="text-muted" aria-hidden="true">↓</span><br />Transfer Limitation<br /><span className="text-muted" aria-hidden="true">↓</span><br />Unity-Ready Model</p></div></div><div className="sm:col-span-7"><CarbonVideo name="c4d-voxel-to-final" poster="c4d-voxel-to-final-poster.webp" alt="Cinema 4D particle character test transitioning to the Unity-ready asset" className="aspect-[586/374]" fit="contain" /></div></div><div className="mt-24 md:mt-32"><Label>Solo Project</Label><dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4">{soloRoles.map((role) => <div key={role}><dt className="case-media-title">{role}</dt></div>)}</dl></div></section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
