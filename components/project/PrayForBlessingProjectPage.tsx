"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code, Sparkles, Palette, Lightbulb, VolumeX, Volume2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { withBasePath } from '@/lib/paths';
import { useLanguage } from '@/context/LanguageContext';
import YouMayAlsoLike from './YouMayAlsoLike';

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

const PRAY_VIDEO_ID = "GYWtUExJptc";

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

interface PrayForBlessingProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function PrayForBlessingProjectPage({ metadata, content }: PrayForBlessingProjectPageProps) {
    const { t } = useLanguage();
    const projectId = 'pray-for-blessing';
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef<YTPlayer | null>(null);

    useEffect(() => {
        const initPlayer = () => {
            const el = document.getElementById('pray-hero-yt-player');
            if (!el || el.querySelector('iframe')) return;

            new window.YT.Player('pray-hero-yt-player', {
                videoId: PRAY_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    loop: 1,
                    playlist: PRAY_VIDEO_ID,
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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

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

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video (YouTube) - 120% crop to hide YT UI */}
            <div className="absolute inset-0 overflow-hidden">
                <iframe
                    src={`https://www.youtube.com/embed/${PRAY_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${PRAY_VIDEO_ID}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
                    title="LET'S MAKE A WISH background"
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
                            id="pray-hero-yt-player"
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">LET&apos;S MAKE A WISH</h1>
                            <p className="text-white/60 text-lg">{t('pray.subtitle')}</p>
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

                                        {/* Photoshop */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="photoshop" alt="Photoshop" />
                                            Photoshop
                                        </span>
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.features')}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            OpenXR
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            XR Interaction Toolkit
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Shader Graph
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            VFX Graph
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Cinemachine
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            C#
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Team Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Team</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Wenqu Tang Card */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-white">Wenqu Tang</h3>
                                        <p className="text-white/80 text-xs">{t('pray.team.wenquTitle')}</p>
                                    </div>
                                </div>

                                {/* Chuyue Yu Card */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-white">Chuyue Yu</h3>
                                        <p className="text-white/80 text-xs">{t('pray.team.chuyueTitle')}</p>
                                    </div>
                                </div>

                                {/* My Role Card */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 border border-teal-400/30">
                                        <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-white">My Role</h3>
                                        <p className="text-white/80 text-xs">{t('pray.team.myRoleTitle')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('pray.overview.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('pray.overview.body')}
                                </p>
                            </section>

                            {/* My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('pray.myRole.title')}</h2>

                                <div className="relative -mx-4 md:-mx-8">
                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 md:px-8">
                                        {/* Card 1 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Code className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('pray.myRole.card1.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('pray.myRole.card1.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Sparkles className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('pray.myRole.card2.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('pray.myRole.card2.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Palette className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('pray.myRole.card3.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('pray.myRole.card3.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 4 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Lightbulb className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('pray.myRole.card4.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('pray.myRole.card4.desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/80 mt-6 leading-relaxed">
                                    {t('pray.myRole.summary')}
                                </p>
                            </section>

                            {/* User Journey */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('pray.journey.title')}</h2>

                                <div className="space-y-8">
                                    {/* 03.1 Close Eyes */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={withBasePath("/projects/pray-for-blessing/images/icon-wish.png")}
                                                        alt="Wish Icon"
                                                        className="w-20 h-20 md:w-24 md:h-24"
                                                    />
                                                    <h3 className="text-xl font-bold text-white">{t('pray.journey.j1.title')}</h3>
                                                </div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('pray.journey.feedbackLabel')}</strong> {t('pray.journey.j1.feedback')}</p>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/pray-for-blessing/images/gif-wish.gif")}
                                                    alt="Wish Interaction"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 03.2 Shake Bucket */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={withBasePath("/projects/pray-for-blessing/images/icon-bucket.png")}
                                                        alt="Bucket Icon"
                                                        className="w-20 h-20 md:w-24 md:h-24"
                                                    />
                                                    <h3 className="text-xl font-bold text-white">{t('pray.journey.j2.title')}</h3>
                                                </div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('pray.journey.feedbackLabel')}</strong> {t('pray.journey.j2.feedback')}</p>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/pray-for-blessing/images/gif-bucket.gif")}
                                                    alt="Bucket Interaction"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 03.3 Beat Drums */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={withBasePath("/projects/pray-for-blessing/images/icon-drum.png")}
                                                        alt="Drum Icon"
                                                        className="w-20 h-20 md:w-24 md:h-24"
                                                    />
                                                    <h3 className="text-xl font-bold text-white">{t('pray.journey.j3.title')}</h3>
                                                </div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('pray.journey.feedbackLabel')}</strong> {t('pray.journey.j3.feedback')}</p>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/pray-for-blessing/images/gif-drum.gif")}
                                                    alt="Drum Interaction"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 03.4 Copy Fu */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={withBasePath("/projects/pray-for-blessing/images/icon-write.png")}
                                                        alt="Write Icon"
                                                        className="w-20 h-20 md:w-24 md:h-24"
                                                    />
                                                    <h3 className="text-xl font-bold text-white">{t('pray.journey.j4.title')}</h3>
                                                </div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('pray.journey.feedbackLabel')}</strong> {t('pray.journey.j4.feedback')}</p>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/pray-for-blessing/images/gif-write.gif")}
                                                    alt="Write Interaction"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 03.5 Release Lantern */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="grid md:grid-cols-2 gap-6 items-center">
                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={withBasePath("/projects/pray-for-blessing/images/icon-lantern.png")}
                                                        alt="Lantern Icon"
                                                        className="w-20 h-20 md:w-24 md:h-24"
                                                    />
                                                    <h3 className="text-xl font-bold text-white">{t('pray.journey.j5.title')}</h3>
                                                </div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('pray.journey.feedbackLabel')}</strong> {t('pray.journey.j5.feedback')}</p>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/pray-for-blessing/images/gif-lantern.gif")}
                                                    alt="Lantern Interaction"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Core Contributions */}
                            <section>
                                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{t('pray.contributions.title')}</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* 4.1 Ritual Interaction Design */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('pray.c41.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('pray.c41.b1')}</li>
                                            <li>{t('pray.c41.b2')}</li>
                                        </ul>
                                    </div>

                                    {/* 4.2 Custom Shaders & VFX */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('pray.c42.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('pray.c42.b1')}</li>
                                            <li>{t('pray.c42.b2')}</li>
                                            <li>{t('pray.c42.b3')}</li>
                                            <li>{t('pray.c42.b4')}</li>
                                        </ul>
                                        <p className="text-white/70 text-sm italic mt-4">
                                            {t('pray.c42.note')}
                                        </p>
                                    </div>

                                    {/* 4.3 XR Systems & Logic */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('pray.c43.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('pray.c43.b1')}</li>
                                            <li>{t('pray.c43.b2')}</li>
                                            <li>{t('pray.c43.b3')}</li>
                                            <li>{t('pray.c43.b4')}</li>
                                            <li>{t('pray.c43.b5')}</li>
                                        </ul>
                                    </div>

                                    {/* 4.4 Technical Problem Solving */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">{t('pray.c44.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('pray.c44.b1')}</li>
                                            <li>{t('pray.c44.b2')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Outcome */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('pray.outcome.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('pray.outcome.body')}
                                </p>
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
