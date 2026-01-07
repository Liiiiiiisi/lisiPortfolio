"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MousePointer2, Workflow, Shield, Layers, Heart } from "lucide-react";
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

interface VREducationProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function VREducationProjectPage({ metadata, content }: VREducationProjectPageProps) {
    const projectId = 'vr-education';
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* 3. Background Video (Fixed Full-screen Flashlight Effect) */}
            {/* Note: bg-flashlight.mp4 should be added to /public/projects/vr-education/videos/ for the intended effect */}
            {/* Currently using preview.mp4 as fallback */}
            <video
                src={withBasePath("/projects/vr-education/videos/preview.mp4")}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.22]"
            />

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
                {/* 1. Full-screen Hero Video */}
                <div id="video_hero" className="w-full h-[80vh] md:h-[100vh] overflow-hidden relative">
                    <video
                        src={withBasePath("/projects/vr-education/videos/preview.mp4")}
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
                            <p className="text-white/60 text-lg">VR Training Experience for Caregivers of Autistic Children</p>
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
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">Features</h3>
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Guardian&apos;s Guide is a VR learning experience designed to help new caregivers understand and support a non-verbal autistic child. The experience focuses on approachable, practice-based learning and teaches essential caregiving skills through realistic sensory and communication challenges.
                                </p>
                            </section>

                            {/* 3. My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">2. My Role</h2>

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
                                                <h3 className="text-lg font-semibold text-white mb-2">Interaction Design</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Designed VR interaction and onboarding systems
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Logic & Flow</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Implemented scoring logic, triggers, and task flow in Unity
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Mechanics</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Built anti-cheating and progression mechanics
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Architecture</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Structured scene flow and overall user experience architecture
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Accessibility</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Designed interactions aligned with autistic sensory needs
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
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">3. Core Contributions</h2>
                                    <p className="text-white/70 text-base md:text-lg">
                                        I contributed across interaction design, system logic, anti-cheating mechanics, and overall scene structure.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {/* 4.1 Interaction System Design */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.1 Interaction System Design</h3>
                                        <div>
                                            <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/contrast.gif")}
                                                    alt="Interaction System Design"
                                                    className="w-full h-auto object-cover"
                                                />
                                                {/* Gradient Overlay & Text for GIF */}
                                                <div className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/10">
                                                    <h3 className="text-xl font-semibold text-white mb-2">Interaction System Design</h3>
                                                    <p className="text-white/80 text-sm md:text-base">
                                                        Inspired by <em>The Escape Artist</em> controller tutorial, I designed an onboarding flow that makes VR controls intuitive even for first-time users.
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
                                                This system reduces onboarding friction by providing an interactive, visual understanding of core VR controls.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 4.2 System Logic & Gameplay Mechanics */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-4">3.2 System Logic & Gameplay Mechanics</h3>
                                            <p className="text-white/90 leading-relaxed">
                                                I designed the underlying logic that drives tasks, feedback, and progression throughout the experience.
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
                                                        Implemented visual state changes (red → yellow) to mark completed interactions.
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
                                                        Built a collision-based scoring system to validate object placement.
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
                                                        Implemented TextMesh-linked scoring for real-time interaction feedback.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-white/90 leading-relaxed">
                                            These mechanics structure the learning process and support clear, consistent feedback.
                                        </p>
                                    </div>

                                    {/* 4.3 Anti-Cheating Mechanics */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.3 Anti-Cheating Mechanics</h3>
                                        <p className="text-white/90 leading-relaxed mb-6">
                                            To ensure meaningful learning rather than trial-and-error, I implemented:
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
                                                        Automatic removal of unselected options once a choice is made, preventing trial-and-error behavior.
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
                                                        Deactivated UI trigger sockets after interaction to prevent repeated scoring on the same action.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-white/90 leading-relaxed mt-6">
                                            These systems preserve learning integrity and maintain authentic decision-making.
                                        </p>
                                    </div>

                                    {/* 4.4 Scene Architecture & Flow */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.4 Scene Architecture & Flow</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            The experience progresses through four core scenes:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li><strong className="text-white">Tutorial</strong> — Users learn VR controls</li>
                                            <li><strong className="text-white">White Room</strong> — Users review Kid X&apos;s profile through object-based interactions</li>
                                            <li><strong className="text-white">Kitchen (Guided Task)</strong> — Users complete caregiving tasks with hints and instant UI feedback</li>
                                            <li><strong className="text-white">Living Room (Independent Task)</strong> — Users apply their learning without hints</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Technical Breakdown */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">4. Technical Breakdown</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.1 Interaction Systems</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>OpenXR-based input abstraction</li>
                                            <li>State-driven interaction feedback</li>
                                            <li>Modular, event-based interaction design</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.2 Gameplay Logic</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>Rule-based scoring system</li>
                                            <li>Trigger lifecycle control</li>
                                            <li>Decoupled logic and UI feedback</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Outcomes & Learnings */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">5. Outcomes & Learnings</h2>
                                <ul className="list-disc list-inside space-y-3 text-white/90 text-lg">
                                    <li>Improved usability for first-time VR users through simplified onboarding</li>
                                    <li>Validated behavior-based training approaches for neurodivergent learning</li>
                                    <li>Established a scalable, rule-based framework for VR learning systems</li>
                                    <li>Identified future directions, including adaptive difficulty and richer behavioral states</li>
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
