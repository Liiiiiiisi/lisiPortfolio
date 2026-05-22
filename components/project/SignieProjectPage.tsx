"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Code, Smartphone, Sparkles, Zap, VolumeX, Volume2 } from "lucide-react";

// GitHub icon component
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.425 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );
}
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';
import { useLanguage } from '@/context/LanguageContext';

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

// YouTube IFrame API types
declare global {
  interface Window {
    YT: { ready: (fn: () => void) => void; Player: new (el: string | HTMLElement, opts: Record<string, unknown>) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}
interface YTPlayer {
  mute: () => void;
  unMute: () => void;
}

const SIGNIE_VIDEO_ID = 'j6PK1TTSxV0';

interface SignieProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function SignieProjectPage({ metadata, content }: SignieProjectPageProps) {
    const { t } = useLanguage();
    const projectId = 'signie';
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef<YTPlayer | null>(null);

    useEffect(() => {
        const initPlayer = () => {
            const el = document.getElementById('signie-hero-yt-player');
            if (!el || el.querySelector('iframe')) return;
            new window.YT.Player('signie-hero-yt-player', {
                videoId: SIGNIE_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    loop: 1,
                    playlist: SIGNIE_VIDEO_ID,
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
            window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            (document.getElementsByTagName('script')[0]?.parentNode as HTMLElement)?.insertBefore(tag, document.getElementsByTagName('script')[0]);
        }
        return () => { playerRef.current = null; };
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
            {/* Background Video (YouTube) - 120% crop to hide YT logo like home page */}
            <div className="absolute inset-0 overflow-hidden">
                <iframe
                    src="https://www.youtube.com/embed/j6PK1TTSxV0?autoplay=1&mute=1&loop=1&playlist=j6PK1TTSxV0&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1"
                    title="Signie background"
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
                {/* Hero Video Section (YouTube) - 120% crop to hide YT logo like home page */}
                <div id="video_hero" className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            id="signie-hero-yt-player"
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

                    {/* Unmute button - bottom left */}
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Signie</h1>
                            <p className="text-white/60 text-lg">{t('signie.subtitle')}</p>
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

                                        {/* Blender */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="blender" alt="Blender" />
                                            Blender
                                        </span>

                                        {/* Dollars Mocap */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="dollars_mocap" alt="Dollars Mocap" />
                                            Dollars Mocap
                                        </span>

                                        {/* Wit.ai */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="wit.ai" alt="Wit.ai" />
                                            Wit.ai
                                        </span>

                                        {/* Eleven Labs */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="eleven_labs" alt="Eleven Labs" />
                                            Eleven Labs
                                        </span>

                                        {/* GitHub */}
                                        <a
                                            href="https://github.com/yourusername/signie"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                                        >
                                            <GitHubIcon className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.features')}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Hand Tracking
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Gesture Recognition
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Micro-Gestures
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Voice-to-Text
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Virtual Guide
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Animation State Machine
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('signie.overview.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('signie.overview.body')}
                                </p>
                            </section>

                            {/* System Evolution */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('signie.evolution.title')}</h2>

                                <div className="space-y-12">
                                    {/* Stage 01 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('signie.stage01.title')}</h3>
                                        <p className="text-white/70 text-sm mb-4">{t('signie.stage01.badge')}</p>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">{t('signie.stage01.goalTitle')}</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                {t('signie.stage01.goal')}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-3">{t('signie.stage01.builtTitle')}</h4>
                                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl my-4">
                                                {/* Media Area */}
                                                <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                    <Image
                                                        src={withBasePath("/projects/signie/images/xrdc_miro.gif")}
                                                        alt="ASL Tutor Interaction Concept"
                                                        fill
                                                        className="object-cover"
                                                        unoptimized={true}
                                                    />
                                                </div>
                                                
                                                {/* Text Area */}
                                                <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                        {t('signie.stage01.media1.title')}
                                                    </h3>
                                                    <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                        {t('signie.stage01.media1.caption')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                    {/* Media Area */}
                                                    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                        <Image
                                                            src={withBasePath("/projects/signie/images/xrdc_mocap.gif")}
                                                            alt="Motion capture pipeline"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={true}
                                                        />
                                                    </div>
                                                    
                                                    {/* Text Area */}
                                                    <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                            {t('signie.stage01.media2.title')}
                                                        </h3>
                                                        <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                            {t('signie.stage01.media2.caption')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="space-y-4">
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/xrdc_unity.gif")}
                                                                alt="Unity Hand Tracking"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage01.media3.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage01.media3.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/xrdc_shapexr.gif")}
                                                                alt="ShapeXR Prototyping"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage01.media4.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage01.media4.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                {/* Media Area */}
                                                <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                    <Image
                                                        src={withBasePath("/projects/signie/images/xrdc_win.gif")}
                                                        alt="XRCC Hackathon Winner"
                                                        fill
                                                        className="object-cover"
                                                        unoptimized={true}
                                                    />
                                                </div>
                                                
                                                {/* Text Area */}
                                                <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                        {t('signie.stage01.outcome.title')}
                                                    </h3>
                                                    <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                        {t('signie.stage01.outcome.caption')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">{t('signie.stage01.teamTitle')}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Brian Mira Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-bold text-white">Brian Mira</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage01.team.brian')}</p>
                                                    </div>
                                                </div>

                                                {/* Mohammad Asim Khan Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-bold text-white">Mohammad Asim Khan</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage01.team.mohammad')}</p>
                                                    </div>
                                                </div>

                                                {/* Manikant Mudgil Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-bold text-white">Manikant Mudgil</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage01.team.manikant')}</p>
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
                                                        <h3 className="text-lg font-bold text-white">{t('shared.myRole')}</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage01.team.myRole')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stage 02 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('signie.stage02.title')}</h3>
                                        <p className="text-white/70 text-sm mb-4">{t('shared.awePresentaion')}</p>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">{t('signie.stage02.goalTitle')}</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                {t('signie.stage02.goal')}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-xl font-semibold text-white mb-4">{t('signie.stage02.keyExperiencesTitle')}</h4>
                                            
                                            {/* Experience 1 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">{t('signie.stage02.exp1.title')}</h5>
                                                <p className="text-white/90 mb-4">{t('signie.stage02.exp1.desc')}</p>
                                                <div className="space-y-4 mb-4">
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/awe_learn.gif")}
                                                                alt="Learn"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage02.exp1.learn.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage02.exp1.learn.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/awe_review.gif")}
                                                                alt="Review"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage02.exp1.review.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage02.exp1.review.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience 2 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">{t('signie.stage02.exp2.title')}</h5>
                                                <p className="text-white/90 mb-4">{t('signie.stage02.exp2.desc')}</p>
                                                <div className="mb-4">
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/awe_musicgame.gif")}
                                                                alt="Rhythm-Based ASL Game"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage02.exp2.musicGame.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage02.exp2.musicGame.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience 3 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">{t('signie.stage02.exp3.title')}</h5>
                                                <p className="text-white/90 mb-4">{t('signie.stage02.exp3.desc')}</p>
                                                <div className="space-y-4">
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/awe_word.gif")}
                                                                alt="Word Picking"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage02.exp3.wordPicking.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage02.exp3.wordPicking.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                        {/* Media Area */}
                                                        <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                            <Image
                                                                src={withBasePath("/projects/signie/images/awe_practice.gif")}
                                                                alt="Gesture Matching"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                        
                                                        {/* Text Area */}
                                                        <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                                {t('signie.stage02.exp3.gestureMatching.title')}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                {t('signie.stage02.exp3.gestureMatching.caption')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">{t('signie.stage02.supportingTitle')}</h4>
                                            <div className="space-y-4">
                                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                    {/* Media Area */}
                                                    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                        <Image
                                                            src={withBasePath("/projects/signie/images/awe_virtualguide.gif")}
                                                            alt="Virtual Guide Tool"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={true}
                                                        />
                                                    </div>
                                                    
                                                    {/* Text Area */}
                                                    <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                            {t('signie.stage02.virtualGuideTool.title')}
                                                        </h3>
                                                        <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                            {t('signie.stage02.virtualGuideTool.caption')}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                    {/* Media Area */}
                                                    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                        <Image
                                                            src={withBasePath("/projects/signie/images/awe_geturerecongnition.gif")}
                                                            alt="Gesture Recognition System"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={true}
                                                        />
                                                    </div>
                                                    
                                                    {/* Text Area */}
                                                    <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                                            {t('signie.stage02.gestureRecognition.title')}
                                                        </h3>
                                                        <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                            {t('signie.stage02.gestureRecognition.caption')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">{t('shared.team')}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                {/* Siming Wang Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-bold text-white">Siming Wang</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage02.team.siming')}</p>
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
                                                        <h3 className="text-lg font-bold text-white">{t('shared.myRole')}</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage02.team.myRole')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/5 border border-white/20 px-4 py-2 rounded-full transition-all hover:bg-white/10"
                                                >
                                                    {t('shared.awePresentaion')}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stage 03 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('signie.stage03.title')}</h3>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">{t('signie.stage03.goalTitle')}</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                {t('signie.stage03.goal')}
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">{t('signie.stage03.builtTitle')}</h4>
                                            <div className="space-y-4">
                                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                    {/* Media Area */}
                                                    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                        <Image
                                                            src={withBasePath("/projects/signie/images/AIglass_microgesture.gif")}
                                                            alt="Micro-gesture Input"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={true}
                                                        />
                                                    </div>
                                                    
                                                    {/* Text Area */}
                                                    <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                        <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                            {t('signie.stage03.media1.caption')}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                                    {/* Media Area */}
                                                    <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                                                        <Image
                                                            src={withBasePath("/projects/signie/images/AIglass_wit.gif")}
                                                            alt="Live Translation Pipeline"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized={true}
                                                        />
                                                    </div>
                                                    
                                                    {/* Text Area */}
                                                    <div className="p-4 border-t border-white/10 bg-white/5 rounded-b-2xl">
                                                        <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                            {t('signie.stage03.media2.caption')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">{t('shared.team')}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Siming Wang Card */}
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h3 className="text-lg font-bold text-white">Siming Wang</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage03.team.siming')}</p>
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
                                                        <h3 className="text-lg font-bold text-white">{t('shared.myRole')}</h3>
                                                        <p className="text-white/80 text-xs">{t('signie.stage03.team.myRole')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('signie.myRole.title')}</h2>

                                <div className="relative -mx-4 md:-mx-8">
                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 md:px-8">
                                        {/* Card 1 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Palette className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('signie.myRole.card1.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('signie.myRole.card1.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 2 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Code className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('signie.myRole.card2.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('signie.myRole.card2.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Smartphone className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('signie.myRole.card3.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('signie.myRole.card3.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 4 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Sparkles className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('signie.myRole.card4.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('signie.myRole.card4.desc')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 5 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Zap className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">{t('signie.myRole.card5.title')}</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    {t('signie.myRole.card5.desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Outcome */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('signie.outcome.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    {t('signie.outcome.body')}
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
