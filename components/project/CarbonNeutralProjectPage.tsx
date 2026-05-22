"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Layers, Box, Sparkles, Code, Clock, Lightbulb, Heart, VolumeX, Volume2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// GitHub icon component
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );
}
import Image from "next/image";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';
import { useLanguage } from '@/context/LanguageContext';

// YouTube IFrame API types
declare global {
  interface Window {
    YT: {
      ready: (fn: () => void) => void;
      Player: new (el: string | HTMLElement, opts: Record<string, unknown>) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  mute: () => void;
  unMute: () => void;
}

const CARBON_VIDEO_ID = "4Hn5HIh-yyE";

// Helper component for tool logos that handles both PNG and SVG
function ToolLogo({ name, alt }: { name: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState(withBasePath(`/assets/logos/${name}.svg`));
    const [hasError, setHasError] = useState(false);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={20}
            height={20}
            className="object-contain"
            unoptimized={true}
            onError={() => {
                if (imgSrc.includes('.svg')) {
                    // Try PNG if SVG fails
                    setImgSrc(withBasePath(`/assets/logos/${name}.png`));
                } else {
                    // Hide if both fail
                    setHasError(true);
                }
            }}
            style={{ display: hasError ? 'none' : 'block' }}
        />
    );
}

interface CarbonNeutralProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function CarbonNeutralProjectPage({ metadata, content }: CarbonNeutralProjectPageProps) {
    const { t } = useLanguage();
    const projectId = 'carbon-neutral';
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef<YTPlayer | null>(null);

    useEffect(() => {
        const initPlayer = () => {
            const el = document.getElementById('carbon-hero-yt-player');
            if (!el || el.querySelector('iframe')) return;

            new window.YT.Player('carbon-hero-yt-player', {
                videoId: CARBON_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    loop: 1,
                    playlist: CARBON_VIDEO_ID,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    playsinline: 1,
                },
                events: {
                    onReady: (event: { target: YTPlayer }) => {
                        playerRef.current = event.target;
                    },
                },
            });
        };

        if (window.YT?.Player) {
            window.YT.ready(initPlayer);
        } else {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                prev?.();
                initPlayer();
            };
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript?.parentNode?.insertBefore(tag, firstScript);
        }

        return () => {
            playerRef.current = null;
        };
    }, []);

    const toggleMute = () => {
        const p = playerRef.current;
        if (!p) return;
        if (isMuted) {
            p.unMute();
            setIsMuted(false);
        } else {
            p.mute();
            setIsMuted(true);
        }
    };
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video (YouTube) - 120% crop to hide YT UI */}
            <div className="absolute inset-0 overflow-hidden">
                <iframe
                    src={`https://www.youtube.com/embed/${CARBON_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${CARBON_VIDEO_ID}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
                    title="Personal carbonNeutral background"
                    className="absolute pointer-events-none border-0 grayscale opacity-[0.22]"
                    style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>

            {/* Flashlight Overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-[1]"
                style={{
                    backdropFilter: "brightness(1.35)",
                    background: `radial-gradient(
                        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(0,0,0,0) 0,
                        rgba(0,0,0,0.45) 160px,
                        rgba(0,0,0,0.85) 340px
                    )`
                }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* Hero Video Section (YouTube) with mute toggle */}
                <div id="video_hero" className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            id="carbon-hero-yt-player"
                            className="absolute border-0"
                            style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
                        />
                    </div>

                    {/* Back Button Overlay */}
                    <div className="absolute top-8 left-8 z-20">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:bg-black/60 border border-white/10"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">{t('shared.backToProjects')}</span>
                        </Link>
                    </div>

                    {/* Mute / Unmute button - bottom left */}
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="absolute bottom-8 left-8 z-20 inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/60 border border-white/10 transition-all"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </button>
                </div>

                {/* Content Container */}
                <div className="py-12 px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-12 max-w-5xl mx-auto"
                    >
                        {/* Title Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl text-center">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Personal carbonNeutral</h1>
                            <p className="text-white/60 text-lg">{t('carbon.subtitle')}</p>
                        </section>

                        {/* Technical Stack */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-6">{t('shared.technicalStack')}</h2>

                            <div className="space-y-6">
                                {/* Tools Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.tools')}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Unity */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="unity" alt="Unity" />
                                            Unity
                                        </span>

                                        {/* Vuforia */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="vuforia" alt="Vuforia" />
                                            Vuforia
                                        </span>

                                        {/* Cinema 4D */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="cinema_4D" alt="Cinema 4D" />
                                            Cinema 4D
                                        </span>

                                        {/* Adobe Illustrator */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="illustrator" alt="Adobe Illustrator" />
                                            Adobe Illustrator
                                        </span>
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.features')}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Plane Tracking
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            State-Driven Interaction
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Animator State Machine
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            C#
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('carbon.overview.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('carbon.overview.body')}
                                </p>
                            </section>

                            {/* Problem */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('carbon.problem.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    {t('carbon.problem.body1')}
                                </p>
                                <p className="text-white/90 leading-relaxed mb-4">
                                    {t('carbon.problem.body2')}
                                </p>
                                <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Clock className="w-5 h-5 text-white/60" />
                                        <span>{t('carbon.problem.feedback')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Lightbulb className="w-5 h-5 text-white/60" />
                                        <span>{t('carbon.problem.insight')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/80">
                                        <Heart className="w-5 h-5 text-white/60" />
                                        <span>{t('carbon.problem.reason')}</span>
                                    </div>
                                </div>
                                <p className="text-white/90 leading-relaxed">
                                    <strong className="text-white">{t('carbon.problem.challenge')}</strong>
                                </p>
                            </section>

                            {/* Concept */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('carbon.concept.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-6">
                                    {t('carbon.concept.intro')}
                                </p>

                                <div className="space-y-8">
                                    {/* SCM */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.concept.scm.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.concept.scm.body')}
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/scm-lifecycle.gif")}
                                                alt="SCM Lifecycle"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* LCM */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.concept.lcm.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.concept.lcm.body')}
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/lcm-formation.gif")}
                                                alt="LCM Formation"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-white/90 leading-relaxed">
                                        {t('carbon.concept.loop')}
                                    </p>
                                </div>
                            </section>

                            {/* System & Mechanics */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('carbon.system.title')}</h2>

                                <div className="space-y-8">
                                    {/* Behavior Tracking */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.system.behavior.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-6">
                                            {t('carbon.system.behavior.intro')}
                                        </p>

                                        <div className="space-y-6 mb-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-xl font-semibold text-white mb-3">{t('carbon.system.auto.title')}</h4>
                                                <p className="text-white/80 mb-3">
                                                    {t('carbon.system.auto.intro')}
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                                                    <li>{t('carbon.system.auto.b1')}</li>
                                                    <li>{t('carbon.system.auto.b2')}</li>
                                                    <li>{t('carbon.system.auto.b3')}</li>
                                                    <li>{t('carbon.system.auto.b4')}</li>
                                                    <li>{t('carbon.system.auto.b5')}</li>
                                                </ul>
                                                <p className="text-white/60 text-sm italic mt-3">
                                                    {t('carbon.system.auto.note')}
                                                </p>
                                            </div>

                                            <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/carbon-neutral/images/behavior-travel-recognition.png")}
                                                    alt="Travel Mode Recognition"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-xl font-semibold text-white mb-3">{t('carbon.system.manual.title')}</h4>
                                                <p className="text-white/80 mb-3">
                                                    {t('carbon.system.manual.intro')}
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                                                    <li>{t('carbon.system.manual.b1')}</li>
                                                    <li>{t('carbon.system.manual.b2')}</li>
                                                    <li>{t('carbon.system.manual.b3')}</li>
                                                    <li>{t('carbon.system.manual.b4')}</li>
                                                </ul>
                                                <p className="text-white/80 mt-3">
                                                    {t('carbon.system.manual.outro')}
                                                </p>
                                            </div>

                                            <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/carbon-neutral/images/manual-verification.png")}
                                                    alt="Manually Verified Behaviors"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reward Loop */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.system.reward.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.system.reward.intro')}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('carbon.system.reward.b1')}</li>
                                            <li>{t('carbon.system.reward.b2')}</li>
                                            <li>{t('carbon.system.reward.b3')}</li>
                                            <li>{t('carbon.system.reward.b4')}</li>
                                        </ul>
                                        <p className="text-white/90 leading-relaxed mt-4">
                                            {t('carbon.system.reward.outro')}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Character Design */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('carbon.character.title')}</h2>

                                <div className="space-y-8">
                                    {/* Whale Willy */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.character.whale.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.character.whale.body')}
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/whale-willy-evolution.png")}
                                                alt="Whale Willy Evolution"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* SCM Monsters */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.character.scm.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.character.scm.body')}
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/scm-comparison-strip.png")}
                                                alt="SCM Comparison"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* LCM Monster */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.character.lcm.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.character.lcm.body')}
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/lcm-giant-salamander.png")}
                                                alt="Giant Salamander"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <p className="text-white/90 leading-relaxed">
                                            {t('carbon.character.lcm.outro')}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Build */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('carbon.tech.title')}</h2>

                                <div className="space-y-8">
                                    {/* 6.1 Modeling */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.tech.t61.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.tech.t61.body1')}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>{t('carbon.tech.t61.b1')}</li>
                                            <li>{t('carbon.tech.t61.b2')}</li>
                                            <li>{t('carbon.tech.t61.b3')}</li>
                                        </ul>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.tech.t61.body2')}
                                        </p>
                                        <p className="text-white/60 text-sm italic mb-4">
                                            Tools: Cinema 4D, Voxygen plugin
                                        </p>
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/c4d-voxel-to-final.gif")}
                                                alt="C4D Voxel to Final"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* 6.2 AR Prototype */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">{t('carbon.tech.t62.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('carbon.tech.t62.body')}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>{t('carbon.tech.t62.b1')}</li>
                                            <li>{t('carbon.tech.t62.b2')}</li>
                                            <li>{t('carbon.tech.t62.b3')}</li>
                                            <li>{t('carbon.tech.t62.b4')}</li>
                                        </ul>
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/ar-prototype-demo.gif")}
                                                alt="AR Prototype Demo"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* You May Also Like */}
                            <YouMayAlsoLike currentProjectId={projectId} />
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
