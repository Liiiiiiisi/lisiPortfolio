"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Code, Smartphone, Sparkles, Zap } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
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

interface SignieProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function SignieProjectPage({ metadata, content }: SignieProjectPageProps) {
    const projectId = 'signie';
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
                src={withBasePath("/projects/signie/videos/preview.mp4")}
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
                        src={withBasePath("/projects/signie/videos/preview.mp4")}
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Signie</h1>
                            <p className="text-white/60 text-lg">XR ASL Tutor & Real-Time Translation System</p>
                        </section>

                        {/* Technical Stack */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-6">Technical Stack</h2>

                            <div className="space-y-6">
                                {/* Tools Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Tools</h3>
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
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Features</h3>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Signie is an immersive ASL (American Sign Language) learning and translation system built around real-time hand tracking, micro-gestures, and AI-driven feedback. It evolved from concept validation into playable learning experiences, and ultimately into AI-glasses-based live translation.
                                </p>
                            </section>

                            {/* System Evolution */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">2. System Evolution</h2>

                                <div className="space-y-12">
                                    {/* Stage 01 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stage 01 — Concept & Interaction Prototype</h3>
                                        <p className="text-white/70 text-sm mb-4">XRCC Hackathon Winner</p>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">Goal</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                Establish the core concept: teaching ASL through real-time hand-tracked interaction rather than passive observation.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-3">What We Built</h4>
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
                                                        ASL tutor interaction concept
                                                    </h3>
                                                    <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                        Miro board mapping UI/UX design, learning flow, and demo narrative
                                                    </p>
                                                </div>
                                            </div>
                                            <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mt-4">
                                                <li>Motion capture pipeline
                                                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                                        <li>Captured selected ASL sentences using Dollars MoCap</li>
                                                        <li>Cleaned and refined motion data in Blender</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <div className="w-full my-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/signie/images/mocap_blender_workflow.gif")}
                                                    alt="Motion Capture Pipeline"
                                                    className="w-full h-auto object-cover"
                                                />
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
                                                                XR prototype_Unity
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Prototyped hand-tracked interaction in Unity to demonstrate core interaction concepts
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
                                                                XR prototype_ShapeXR
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Spatial interaction testing using ShapeXR
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
                                                        Outcome
                                                    </h3>
                                                    <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                        🏆 Winner of XRCC Hackathon (Contextual AI: Utility with camera access & Community Prize)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">Team</h4>
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
                                                        <p className="text-white/80 text-xs">Motion capture, video editing</p>
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
                                                        <p className="text-white/80 text-xs">XR Developer</p>
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
                                                        <p className="text-white/80 text-xs">ShapeXR prototyping, UI design</p>
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
                                                        <p className="text-white/80 text-xs">Project management, UX design, animator, XR Developer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stage 02 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stage 02 — Playable Learning Experience</h3>
                                        <p className="text-white/70 text-sm mb-4">AWE Presentation</p>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">Goal</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                Transform the prototype into a fully playable ASL learning system with structured progression and feedback.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-xl font-semibold text-white mb-4">Key Learning Experiences</h4>
                                            
                                            {/* Experience 1 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">1. Virtual Guide — Gesture Learning</h5>
                                                <p className="text-white/90 mb-4">Guided practice with real-time feedback and review.</p>
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
                                                                Learn
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Copy a static pose to unlock the full motion, visualized with movement bubbles.
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
                                                                Review
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Replay the virtual guide via on-screen buttons to practice before continuing.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience 2 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">2. Rhythm-Based ASL Game</h5>
                                                <p className="text-white/90 mb-4">Learn ASL letters through music-driven interaction.</p>
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
                                                                Music Game
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Sign correctly to grow the basket, then catch falling fruits in rhythm.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience 3 */}
                                            <div className="mb-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h5 className="text-lg font-semibold text-white mb-3">3. Word & Gesture Practice</h5>
                                                <p className="text-white/90 mb-4">Test comprehension and recall.</p>
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
                                                                Word Picking
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Identify and select the correct word from a signed sentence.
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
                                                                Gesture Matching
                                                            </h3>
                                                            <p className="text-sm md:text-base text-white/90 line-clamp-2">
                                                                Sign a displayed sentence to complete the task.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-3">Supporting Tools & Systems</h4>
                                            <ul className="list-disc list-inside space-y-3 text-white/80 ml-4">
                                                <li><strong className="text-white">Virtual Guide Tool:</strong> custom tool to record gestures directly in-headset.
                                                    <div className="w-full my-3 rounded-xl overflow-hidden border border-white/10">
                                                        <img
                                                            src={withBasePath("/projects/signie/images/record_playback.gif")}
                                                            alt="Virtual Guide Tool"
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </div>
                                                </li>
                                                <li><strong className="text-white">Gesture Recognition System:</strong> real-time gesture detection and validation in Unity.
                                                    <div className="w-full my-3 rounded-xl overflow-hidden border border-white/10">
                                                        <img
                                                            src={withBasePath("/projects/signie/images/unity_recognition_workflow.gif")}
                                                            alt="Gesture Recognition System"
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </div>
                                                </li>
                                                <li><strong className="text-white">Procedural Animation State Switcher:</strong> controls sign animation playback and transitions.
                                                    <div className="w-full my-3 rounded-xl overflow-hidden border border-white/10">
                                                        <img
                                                            src={withBasePath("/projects/signie/images/unity_animation_state_machine.gif")}
                                                            alt="Animation State Machine"
                                                            className="w-full h-auto object-cover"
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">Team</h4>
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
                                                        <p className="text-white/80 text-xs">XR Developer</p>
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
                                                        <p className="text-white/80 text-xs">XR Developer</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <a
                                                    href="#"
                                                    className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/5 border border-white/20 px-4 py-2 rounded-full transition-all hover:bg-white/10"
                                                >
                                                    AWE Presentation
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stage 03 */}
                                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stage 03 — AI Glasses: Live ASL Translation</h3>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">Goal</h4>
                                            <p className="text-white/90 leading-relaxed">
                                                Extend Signie from learning into real-world communication using wearable XR.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-4">What We Built</h4>
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
                                                            Micro-gesture input for hands-free system control
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
                                                            Live translation converts voice to text via Wit.ai, then drives sign animation through an animation state machine.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-4">Team</h4>
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
                                                        <p className="text-white/80 text-xs">XR Developer</p>
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
                                                        <p className="text-white/80 text-xs">XR Developer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">3. My Role</h2>

                                <div className="relative -mx-4 md:-mx-8">
                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 md:px-8">
                                        {/* Card 1 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Palette className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">Interaction & UX Design</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Interaction & UX design for hand-tracked XR systems
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Gesture Recognition</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Gesture recognition and micro-gesture mapping
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Learning Experience Design</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Learning experience and progression design
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Animation Systems</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Animation state machines for sign language output
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Rapid Prototyping</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Rapid prototyping across XR, games, and AI wearables
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Outcome */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">4. Outcome</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Signie evolved from a conceptual ASL tutor into a scalable system supporting learning, practice, and live translation—demonstrating how embodied interaction and AI-driven systems can expand accessibility and communication.
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
