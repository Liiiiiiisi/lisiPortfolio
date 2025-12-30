"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MousePointer2, Workflow, Shield, Layers, Heart } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';

interface VREducationProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function VREducationProjectPage({ metadata, content }: VREducationProjectPageProps) {
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">VR Education</h1>
                            <p className="text-white/60 text-lg">Immersive Learning Experience</p>
                        </section>

                        {/* Tools Used (Static) */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Tools Used</h2>

                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                {/* Unity */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                        <span className="text-xs text-white/80 font-semibold">U</span>
                                    </div>
                                    <span className="text-xs text-white/80">Unity</span>
                                </div>

                                {/* Unity Version Control */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                        <span className="text-xs text-white/80 font-semibold">UVC</span>
                                    </div>
                                    <span className="text-xs text-white/80 text-center">Unity Version Control</span>
                                </div>

                                {/* Blender */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                        <span className="text-xs text-white/80 font-semibold">B</span>
                                    </div>
                                    <span className="text-xs text-white/80">Blender</span>
                                </div>

                                {/* Illustrator */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                        <span className="text-xs text-white/80 font-semibold">AI</span>
                                    </div>
                                    <span className="text-xs text-white/80">Illustrator</span>
                                </div>

                                {/* C# */}
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                        C#
                                    </span>
                                </div>

                                {/* OpenXR */}
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                        OpenXR
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* 2. Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Guardian's Guide is a VR learning experience designed to help new caregivers understand and support a non-verbal autistic child. The experience focuses on approachable, practice-based learning and teaches essential caregiving skills through realistic sensory and communication challenges.
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

                                            <div id="interactive_controller_panel" className="w-full h-64 bg-white/5 rounded-xl border border-white/10 my-6 flex items-center justify-center text-white/30">
                                                {/* Placeholder for interactive component */}
                                                Interactive Controller Panel
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
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl h-[480px] flex flex-col group">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/change-color.gif")}
                                                    alt="Color Change Logic"
                                                    className="w-full h-[75%] object-cover"
                                                />
                                                <div className="h-[25%] flex items-center p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                                                    <p className="text-white text-sm leading-relaxed">
                                                        Implemented visual state changes (red → yellow) to mark completed interactions.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* GIF 2 */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl h-[480px] flex flex-col group">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/unity-screen.gif")}
                                                    alt="Unity Scoring System"
                                                    className="w-full h-[75%] object-cover"
                                                />
                                                <div className="h-[25%] flex items-center p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                                                    <p className="text-white text-sm leading-relaxed">
                                                        Built a collision-based scoring system to validate object placement.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* GIF 3 */}
                                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl h-[480px] flex flex-col group">
                                                <img
                                                    src={withBasePath("/projects/vr-education/images/choice-demo.gif")}
                                                    alt="Choice Mechanic"
                                                    className="w-full h-[75%] object-cover"
                                                />
                                                <div className="h-[25%] flex items-center p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
                                                    <p className="text-white text-sm leading-relaxed">
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
                                            <li><strong className="text-white">White Room</strong> — Users review Kid X's profile through object-based interactions</li>
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
                                            <li>VR controller mapping using OpenXR</li>
                                            <li>Dynamic UI feedback</li>
                                            <li>Object state switching via scripted events</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.2 Gameplay Logic</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>Collision-based scoring</li>
                                            <li>Trigger activation/deactivation</li>
                                            <li>TextMesh-linked scoring events</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 7. Outcomes & Learnings */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">6. Outcomes & Learnings</h2>
                                <ul className="list-disc list-inside space-y-3 text-white/90 text-lg">
                                    <li>Improved usability for first-time VR users through simplified VR onboarding</li>
                                    <li>Validated behavior-based training design for neurodivergent learning</li>
                                    <li>Built a scalable framework for rule-based VR learning systems</li>
                                    <li>Identified future opportunities: adaptive difficulty, richer behavioral states</li>
                                </ul>
                            </section>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
