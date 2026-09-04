"use client";

import { useEffect, useRef, useState } from "react";
import LazyVideo from "@/components/LazyVideo";
import NextProjectTransition from "@/components/NextProjectTransition";
import CaseStudyCinematicHero from "@/components/project/CaseStudyCinematicHero";
import { nextSequenceEntry } from "@/data/projectSequence";
import { withBasePath } from "@/lib/paths";
import { usePrefersReducedMotion } from "@/lib/motion";

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
function PromotionalFilm() {
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
        aria-label="Datnie promotional film with original audio"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!isPlaying && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-4 left-4 bg-black/45 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="Play Datnie promotional film with sound from the beginning"
        >
          ▶ Play With Sound
        </button>
      )}
    </div>
  );
}

function InterfaceOverviewVideo() {
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
        aria-label="Datnie refined Unity interface overview"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function Opening({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="grid grid-cols-12 gap-x-6 md:gap-x-8"><div className="col-span-12 md:col-span-6"><Label>{label}</Label><div className="mt-6"><Title>{title}</Title></div></div><div className="col-span-12 mt-6 md:col-span-4 md:col-start-8 md:mt-7"><Lead>{children}</Lead></div></div>;
}

export default function DatnieProjectPage() {
  const vocabulary = [["Swipe", "Browse"], ["Tap", "Explore"], ["Double Tap", "Like"], ["Hold", "Voice"], ["Grab", "Spatial interaction"]];
  const roles = [["Product / UI Design", "Interaction flow, interface design and Figma prototyping"], ["Character & Motion", "Character modelling, animation and visual feedback"], ["Unreal Production", "Groom, lighting, camera and product-film rendering"], ["Visual Prototyping", "Translating interaction ideas into motion and spatial UI"]];

  return <main className="min-h-screen overflow-x-clip bg-[#faf6f1] text-[#1b1917]">
    <header><CaseStudyCinematicHero title="DATNIE" proposition={<>A dating concept exploring lighter ways to browse,<br />respond and connect without constant typing.</>} role={<>UI/UX Design<br />Animation<br />Visual Prototyping</>} year="2025" team="Siming Wang · Lisi Xie" mediaSrc={`${root}/videos/preview.mp4`} poster={`${root}/videos/preview-poster.webp`} mediaAlt="Datnie Unreal product film" /></header>

    <div className="mx-auto max-w-[90rem] px-5 md:px-10">
      <section className="py-28 md:py-52"><Opening label="/01   PRODUCT" title={<>LESS TYPING.<br />MORE PRESENCE.</>}>Dating conversations often repeat the same small exchanges. Datnie explores how gesture, voice and reusable responses could make those interactions lighter.</Opening>
        <p className="case-body mt-14 max-w-xl md:mt-20">Mixed reality became a hands-first space for exploring gesture, voice and spatial UI.</p>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-x-8">{vocabulary.map(([action, purpose]) => <div key={action}><dt className="case-media-title">{action}</dt><dd className="case-body mt-2">{purpose}</dd></div>)}</dl>
        <div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-24 md:gap-x-8"><div className="col-span-12 md:col-span-5 md:col-start-8"><Label>Concept</Label><div className="mt-4"><MediaTitle>Repeated Answers</MediaTitle></div><div className="mt-4"><Body>Frequently used responses could gradually surface as reusable prompts, reducing repetitive input over time.</Body></div><div className="mt-3"><Caption>This behavior was proposed as a product concept and was not technically implemented.</Caption></div></div></div>
      </section>

      <section className="py-28 md:py-52"><Opening label="/02   ITERATION" title={<>FROM VISION<br />TO INTERFACE</>}>Two directions explored Datnie from different angles: first through a music-led promotional film, then through a more interaction-focused interface.</Opening>
        <div className="case-media-pair mt-20 md:mt-24">
          <div>
            <PromotionalFilm />
            <p className="mt-2 h-4 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted/70">Music / Generated with Suno</p>
            <div className="mt-4"><Label>Version 1</Label><div className="mt-3"><MediaTitle>Promotional Film</MediaTitle></div><Caption>Atmosphere / Identity</Caption><div className="mt-4"><Body>Music-led visual storytelling for the repetition of modern dating.</Body></div></div>
          </div>
          <div>
            <InterfaceOverviewVideo />
            <div className="mt-2 h-4" aria-hidden="true" />
            <div className="mt-4"><Label>Version 2</Label><div className="mt-3"><MediaTitle>Refined Interface</MediaTitle></div><Caption>Product / Interaction</Caption><div className="mt-4"><Body>A clearer view of browsing, profiles and gesture-based interaction.</Body></div></div>
          </div>
        </div>
      </section>

      <section className="py-28 md:py-52"><Opening label="/03   INTERACTION" title={<>INTERACTION<br />WITHOUT THE<br />KEYBOARD</>}>The working prototype explored browsing, profile navigation, liking, voice input and spatial interaction.</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="Swipe to Browse" alt="Micro-gesture browsing in Datnie" poster={null} /></div><div className="sm:col-span-4"><Label>03.1 / Browse</Label><div className="mt-4"><MediaTitle>Swipe to Browse</MediaTitle></div><div className="mt-4"><Body>Micro-gestures move between matches and profile sections without conventional menu navigation.</Body></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="datnie-profile-navigation" alt="Navigating a Datnie profile with tap and swipe gestures" poster={null} /><div className="mt-4"><Label>03.2 / Profile Navigation</Label><div className="mt-3"><MediaTitle>Tap → Swipe → Tap</MediaTitle></div><Caption>A simple gesture sequence moves from entry to profile navigation to deeper content.</Caption></div></div><div><Video name="datnie-double-tap-like" alt="Liking a Datnie profile with a double-tap gesture" poster={null} /><div className="mt-4"><Label>03.3 / Like</Label><div className="mt-3"><MediaTitle>Double Tap</MediaTitle></div><Caption>A deliberate gesture adds intent to liking without a button-heavy interface.</Caption></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="datnie-voice-to-text" alt="Using hold and voice input to compose a Datnie response" poster={null} /><div className="mt-4"><Label>03.4 / Voice</Label><div className="mt-3"><MediaTitle>Hold → Voice to Text</MediaTitle></div><Caption>Holding activates implemented voice input, reducing reliance on typed replies.</Caption></div></div><div><Video name="Grab to Interact" alt="Grabbing a Datnie profile card in space" poster={null} /><div className="mt-4"><Label>03.5 / Spatial Card</Label><div className="mt-3"><MediaTitle>Grab to Interact</MediaTitle></div><Caption>Profile elements can also be handled as objects in space.</Caption></div></div></div>
        <div className="mt-20 grid grid-cols-12 md:mt-24"><div className="col-span-12 md:col-span-4 md:col-start-8"><Label>Concept</Label><div className="mt-4"><Body>Repeated responses could later surface as reusable prompts to reduce conversational repetition.</Body></div></div></div>
        <p className="case-media-caption mt-16 max-w-xl md:mt-20">Unity interaction implementation — Siming Wang. Lisi Xie designed the UI/UX, interaction flow and visual interaction language.</p>
      </section>

      <section className="py-28 md:py-52"><Opening label="/04   VISUAL DEVELOPMENT" title={<>BUILDING A<br />SOFTER IDENTITY</>}>Datnie uses soft, non-literal characters to shift attention away from realistic appearance and toward interaction and compatibility.</Opening>
        <div className="case-media-split mt-20 md:mt-24"><div className="sm:col-span-8"><Video name="groommaking" alt="Datnie character and groom development from Blender to Unreal" /></div><div className="sm:col-span-4"><Label>04.1 / Character + Groom</Label><div className="mt-4"><MediaTitle>From Blender<br />to Unreal</MediaTitle></div><div className="mt-4"><Body>Characters were modeled and animated in Blender, then brought into Unreal for groom simulation and final rendering.</Body></div><div className="mt-4"><Caption>Lisi: character modelling, animation, groom development, lighting, camera and rendering.</Caption></div></div></div>
        <div className="mt-24 md:mt-32"><Label>04.2 / Promotional Film</Label><div className="mt-4 max-w-xl"><MediaTitle>Building the Promotional Film</MediaTitle></div><div className="mt-4 max-w-xl"><Body>The first direction used a music-led Unreal film to turn the repetition and awkwardness of modern dating into character-driven visual storytelling.</Body></div><div className="mt-3 max-w-xl"><Caption>The visuals were choreographed around the lyrics and rhythm through character animation, cinematography and transitions.</Caption></div></div>
        <div className="case-media-split mt-16 md:mt-20"><div className="sm:col-span-8"><Video name="train" alt="Datnie train sequence combining depth imagery and Unreal cinematography" /></div><div className="sm:col-span-4"><MediaTitle>Train / Scene Build</MediaTitle><div className="mt-4"><Body>Depth-mapped imagery, AI-generated exterior motion and Unreal cinematography were combined to construct the train sequence.</Body></div></div></div>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="trainshot" alt="Lighting camera and scene composition inside Unreal" /><div className="mt-4"><MediaTitle>Unreal Scene</MediaTitle><Caption>Lighting, camera and scene composition inside Unreal.</Caption></div></div><div><Video name="profoliophoto" alt="Photography converted into depth-based spatial material" /><div className="mt-4"><MediaTitle>Depth-Mapped Visual</MediaTitle><Caption>Photography was converted into depth-based visual material for spatial scene construction.</Caption></div></div></div>
      </section>

      <section className="py-28 pb-36 md:py-52 md:pb-52"><Opening label="/05   ROLE" title={<>ROLE &amp;<br />CONTRIBUTION</>}>My contribution moved between product thinking, interface design, character development, motion and Unreal visual prototyping.</Opening>
        <dl className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-24 md:grid-cols-2">{roles.map(([title, copy]) => <div key={title}><dt className="case-media-title">{title}</dt><dd className="case-body mt-3">{copy}</dd></div>)}</dl>
        <div className="case-media-pair mt-24 md:mt-32"><div><Video name="figma" alt="Datnie interface design in Figma" /><div className="mt-4"><MediaTitle>Interface Design</MediaTitle></div></div><div><Video name="uxboard" alt="Datnie experience flow board" /><div className="mt-4"><MediaTitle>Experience Flow</MediaTitle></div></div></div>
        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-32 md:gap-x-8"><div className="col-span-12 md:col-span-5"><Label>Siming Wang</Label><p className="case-media-title mt-4">XR Development<br />Animation<br />Direction</p><p className="case-body mt-4">Unity interaction implementation</p></div><div className="col-span-12 md:col-span-5 md:col-start-8"><Label>Lisi Xie</Label><p className="case-media-title mt-4">UI/UX Design<br />Character &amp; Animation<br />Unreal Visual Prototyping</p></div></div>
      </section>
    </div>
    {nextProject && <NextProjectTransition next={nextProject} />}
  </main>;
}
