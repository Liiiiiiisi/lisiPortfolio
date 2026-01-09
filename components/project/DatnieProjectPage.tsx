"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Palette, Sparkles, Layers, Zap } from "lucide-react";
import React, { useState } from "react";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';

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

interface DatnieProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function DatnieProjectPage({ metadata, content }: DatnieProjectPageProps) {
    const projectId = 'datnie';
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video */}
            <video
                src={withBasePath("/projects/datnie/videos/preview.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.22]"
            />

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
                {/* Hero Video Section */}
                <div id="video_hero" className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
                    <video
                        src={withBasePath("/projects/datnie/videos/preview.mp4")}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    {/* Back Button Overlay */}
                    <div className="absolute top-8 left-8 z-20">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full transition-all hover:bg-black/60 border border-white/10"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to Projects</span>
                        </Link>
                    </div>
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Datnie</h1>
                            <p className="text-white/60 text-lg">Mixed Reality Dating App</p>
                        </section>

                        {/* Technical Stack */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-6">Technical Stack</h2>

                            <div className="space-y-6">
                                {/* Tools Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Tools</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Unreal Engine */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="unreal-engine" alt="Unreal Engine" />
                                            Unreal Engine
                                        </span>

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

                                        {/* Figma */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="figma" alt="Figma" />
                                            Figma
                                        </span>

                                        {/* Suno AI */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="suno" alt="Suno AI" />
                                            Suno AI
                                        </span>

                                        {/* Eleven Lab */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="eleven_labs" alt="Eleven Lab" />
                                            Eleven Lab
                                        </span>
                                </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Features</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Microgesture</span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Character Groom & Animation</span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Control Rig Motion</span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Spatial UI / UX</span>
                                </div>
                                </div>
                            </div>
                        </section>

                        {/* Team Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Team</h2>
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
                                        <p className="text-white/80 text-xs">XR Developer, Animation Creator, Director</p>
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
                                        <p className="text-white/80 text-xs">UI/UX Design · Animation Creation · Visual Prototyping</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Datnie is a mixed reality dating app designed to reduce conversation fatigue.
                                </p>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Through hands-first and voice-driven interaction, users explore matches, express interest, and communicate without relying on text-heavy input.
                                </p>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    By reflecting repeated behaviors through the interface, Datnie reduces friction while keeping interaction personal and lightweight.
                                </p>
                            </section>

                            {/* User Journey */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">2. User Journey</h2>

                                <div className="space-y-8">
                                    {/* 2.1 */}
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                        {/* GIF Background */}
                                        <div className="relative w-full aspect-video">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/pivot.gif")}
                                                alt="Swipe / Double-Tap"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                        
                                        {/* Bottom Caption Bar */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/60 backdrop-blur-sm border-t border-white/10">
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                                2.1 Swipe / Double-Tap
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90">
                                                Swipe to skip matches. Double-tap to send a like.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2.2 */}
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                        {/* GIF Background */}
                                        <div className="relative w-full aspect-video">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/grabcard.gif")}
                                                alt="Tap / Hold"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                        
                                        {/* Bottom Caption Bar */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/60 backdrop-blur-sm border-t border-white/10">
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                                2.2 Tap / Hold
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90">
                                                Tap to explore and navigate profile content. Hold to activate voice input and send a message.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2.3 */}
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
                                        {/* GIF Background */}
                                        <div className="relative w-full aspect-video">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/addtop.gif")}
                                                alt="Repeated Answer Concept"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                        
                                        {/* Bottom Caption Bar */}
                                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-black/60 backdrop-blur-sm border-t border-white/10">
                                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                                2.3 Repeated Answer Concept
                                            </h3>
                                            <p className="text-sm md:text-base text-white/90">
                                                Frequently used responses are surfaced and reused to reduce repetitive input.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Core Contributions */}
                            <section>
                                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">3. Core Contributions</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* 3.1 Character Design & Groom Visuals */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-6">
                                        <h3 className="text-2xl font-bold text-white">3.1 Character Design & Groom Visuals</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Designed and modeled characters in <strong className="text-white">Blender</strong>, and implemented replaceable <strong className="text-white">groom-based fur visuals</strong> in <strong className="text-white">Unreal Engine</strong> to enhance expressive presence.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/groommaking.gif")}
                                                    alt="Groom Making"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/logogroom.gif")}
                                                    alt="Logo Groom"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3.2 Scene Direction & Promotional Video */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-6">
                                        <h3 className="text-2xl font-bold text-white">3.2 Scene Direction & Promotional Video</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Directed scenes for the promotional video, aligning animation, environment, and pacing with original music and AI-generated voice-over.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/run.gif")}
                                                    alt="Run Scene"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/train.gif")}
                                                    alt="Train Scene"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/trainout.gif")}
                                                    alt="Train Out Scene"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                                <Image
                                                    src={withBasePath("/projects/datnie/images/trainshot.gif")}
                                                    alt="Train Shot Scene"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3.3 Gesture-Oriented UI Design */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-6">
                                        <h3 className="text-2xl font-bold text-white">3.3 Gesture-Oriented UI Design</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Designed a gesture-based UI structure (tap, swipe, double-tap, hold) as an <strong className="text-white">interaction vocabulary</strong> focused on spatial flow and clarity.
                                        </p>
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/uxboard.gif")}
                                                alt="UX Board"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                    </div>

                                    {/* 3.4 Visual Prototyping & Iteration */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-6">
                                        <h3 className="text-2xl font-bold text-white">3.4 Visual Prototyping & Iteration</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Rapidly prototyped visual, animation, and UI concepts directly in engine to test interaction flow and overall experience.
                                        </p>
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/figma.gif")}
                                                alt="Figma Prototyping"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                    </div>

                                    {/* 3.5 Depth-to-3D Profile Assets */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-6">
                                        <h3 className="text-2xl font-bold text-white">3.5 Depth-to-3D Profile Assets</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Used TruthDepth-based depth capture to convert profile photos into lightweight 3D assets, applied to user profiles and in-scene visuals.
                                        </p>
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                            <Image
                                                src={withBasePath("/projects/datnie/images/profoliophoto.gif")}
                                                alt="Profile Photo 3D"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* My Approach */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">4. My Approach</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    I focus on visualizing interaction ideas through animation and spatial UI — using motion, timing, and feedback to explore how interfaces feel rather than how they are technically implemented.
                                </p>
                                <p className="text-white/90 leading-relaxed">
                                    By prototyping directly in the engine, I translate interaction concepts into tangible, experiential prototypes.
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
