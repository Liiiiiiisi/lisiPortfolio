"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MousePointer2, Workflow, Shield, Layers, Heart, VolumeX, Volume2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
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

const VR_VIDEO_ID = "r_HNZQTRDno";

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

interface VREducationProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function VREducationProjectPage({ metadata, content }: VREducationProjectPageProps) {
    const { t } = useLanguage();
    const projectId = 'vr-education';
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef<YTPlayer | null>(null);

    useEffect(() => {
        const initPlayer = () => {
            const el = document.getElementById('vr-hero-yt-player');
            if (!el || el.querySelector('iframe')) return;

            new window.YT.Player('vr-hero-yt-player', {
                videoId: VR_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    loop: 1,
                    playlist: VR_VIDEO_ID,
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
                    src={`https://www.youtube.com/embed/${VR_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VR_VIDEO_ID}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
                    title="Guardian's Guide background"
                    className="absolute pointer-events-none border-0 grayscale opacity-[0.22]"
                    style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>

            {/* Flashlight Overlay (Fixed Full-screen) */}
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

            {/* Content Wrapper for all page content to sit above background video */}
            <div className="relative z-10">
                {/* 1. Full-screen Hero Video (YouTube) with mute toggle */}
                <div id="video_hero" className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            id="vr-hero-yt-player"
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

                    {/* Watch Full Walkthrough Button Overlay */}
                    <div className="absolute bottom-4 right-4 z-20">
                        <a
                            href="https://www.youtube.com/watch?v=f_oq9vCyEEw&t=55s"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 text-xs md:text-sm text-white shadow-lg hover:bg-white/20 hover:border-white/40 transition"
                        >
                            Watch Full Walkthrough
                        </a>
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Guardian&apos;s Guide</h1>
                            <p className="text-white/60 text-lg">{t('vr.subtitle')}</p>
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

                                        {/* Unity Version Control */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="unity-version-control" alt="Unity Version Control" />
                                            Unity Version Control
                                        </span>

                                        {/* Blender */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="blender" alt="Blender" />
                                            Blender
                                        </span>

                                        {/* Illustrator */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="illustrator" alt="Illustrator" />
                                            Illustrator
                                        </span>
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.features')}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            C#
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            OpenXR
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Collision & UI-Based Scoring
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Practice-Based Learning
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* 2. Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('vr.overview.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('vr.overview.body')}
                                </p>
                            </section>

                            {/* 3. My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('vr.myRole.title')}</h2>

                                <div className="relative -mx-4 md:-mx-8">
                                    {/* Scroll Container */}
                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 md:px-8">
                                        {/* Card 1 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <MousePointer2 className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('vr.myRole.card1.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('vr.myRole.card1.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Workflow className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('vr.myRole.card2.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('vr.myRole.card2.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Shield className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('vr.myRole.card3.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('vr.myRole.card3.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 4 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Layers className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('vr.myRole.card4.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('vr.myRole.card4.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 5 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Heart className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('vr.myRole.card5.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('vr.myRole.card5.desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 4. Core Contributions */}
                            <section>
                                {/* Header Card */}
                                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{t('vr.contributions.title')}</h2>
                                    <p className="text-white/70 text-base md:text-lg">
                                        {t('vr.contributions.intro')}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {/* 4.1 Interaction System Design */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('vr.c31.title')}</h3>
                                        <div>
                                            <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/contrast.gif")}
                                                    alt="Interaction System Design"
                                                    className="w-full h-auto object-cover"
                                                />
                                                {/* Gradient Overlay & Text for GIF */}
                                                <div className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/10">
                                                    <h3 className="text-xl font-semibold text-white mb-2">{t('vr.c31.mediaTitle')}</h3>
                                                    <p className="text-white/80 text-sm md:text-base">
                                                        {t('vr.c31.mediaCaption')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="w-full my-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/Tutorialfullgif.gif")}
                                                    alt="Interactive Controller Panel Tutorial"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                            <p className="text-white/90 leading-relaxed mb-4">
                                                {t('vr.c31.body')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 4.2 System Logic & Gameplay Mechanics */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">{t('vr.c32.title')}</h3>
                                            <p className="text-white/90 leading-relaxed">
                                                {t('vr.c32.intro')}
                                            </p>
                                        </div>

                                        {/* Grid for GIFs */}
                                        <div className="grid grid-cols-1 gap-6">
                                            {/* GIF 1 */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/change-color.gif")}
                                                    alt="Color Change Logic"
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/35 backdrop-blur-md">
                                                    <p className="text-sm md:text-base text-white/90">
                                                        {t('vr.c32.gif1')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* GIF 2 */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/unity-screen.gif")}
                                                    alt="Unity Scoring System"
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/35 backdrop-blur-md">
                                                    <p className="text-sm md:text-base text-white/90">
                                                        {t('vr.c32.gif2')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* GIF 3 */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/choice-demo.gif")}
                                                    alt="Choice Mechanic"
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/35 backdrop-blur-md">
                                                    <p className="text-sm md:text-base text-white/90">
                                                        {t('vr.c32.gif3')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-white/90 leading-relaxed">
                                            {t('vr.c32.outro')}
                                        </p>
                                    </div>

                                    {/* 4.3 Anti-Cheating Mechanics */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('vr.c33.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-6">
                                            {t('vr.c33.intro')}
                                        </p>

                                        <div className="space-y-6">
                                            {/* Card 1: removal.gif */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/removal.gif")}
                                                    alt="Option Removal"
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/35 backdrop-blur-md">
                                                    <p className="text-sm md:text-base text-white/90">
                                                        {t('vr.c33.gif1')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Card 2: socket.gif */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/socket.gif")}
                                                    alt="Socket Deactivation"
                                                    className="w-full h-auto object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/35 backdrop-blur-md">
                                                    <p className="text-sm md:text-base text-white/90">
                                                        {t('vr.c33.gif2')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-white/90 leading-relaxed mt-6">
                                            {t('vr.c33.outro')}
                                        </p>
                                    </div>

                                    {/* 4.4 Scene Architecture & Flow */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('vr.c34.title')}</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            {t('vr.c34.intro')}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('vr.c34.scene1')}</li>
                                            <li>{t('vr.c34.scene2')}</li>
                                            <li>{t('vr.c34.scene3')}</li>
                                            <li>{t('vr.c34.scene4')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Technical Breakdown */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('vr.tech.title')}</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">{t('vr.tech.t41.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>{t('vr.tech.t41.b1')}</li>
                                            <li>{t('vr.tech.t41.b2')}</li>
                                            <li>{t('vr.tech.t41.b3')}</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">{t('vr.tech.t42.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>{t('vr.tech.t42.b1')}</li>
                                            <li>{t('vr.tech.t42.b2')}</li>
                                            <li>{t('vr.tech.t42.b3')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Outcomes & Learnings */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('vr.outcomes.title')}</h2>
                                <ul className="list-disc list-inside space-y-3 text-white/90 text-lg">
                                    <li>{t('vr.outcomes.b1')}</li>
                                    <li>{t('vr.outcomes.b2')}</li>
                                    <li>{t('vr.outcomes.b3')}</li>
                                    <li>{t('vr.outcomes.b4')}</li>
                                </ul>
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
