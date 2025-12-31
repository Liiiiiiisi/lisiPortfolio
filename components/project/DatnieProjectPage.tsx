"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Sparkles, Layers, Zap } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';

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

                        {/* Tools Used */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Technical Stack</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Unity</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Unreal Engine</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Blender</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Figma</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm mt-4 text-center italic">
                                Gesture interaction explored at the design and prototyping level
                            </p>
                        </section>

                        {/* Team Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Team</h2>
                            <div className="space-y-3 text-white/90">
                                <p><strong className="text-white">Siming Wang</strong> — XR Developer, Animation Creator, Director</p>
                                <p><strong className="text-white">My Role</strong> — UI/UX Design · Animation Creation · Visual Prototyping</p>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Datnie is a mixed reality dating app designed to reduce conversation fatigue. Through hands-first interaction, users explore matches, express interest, and communicate without relying on text-heavy input. As conversations evolve, repeated behaviors are reflected back through the interface, turning familiar responses into lighter interactions.
                                </p>
                                <p className="text-white/80 italic">
                                    Hang out and meet someone who matches you daily.
                                </p>
                            </section>

                            {/* Design Challenge */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Design Challenge</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Dating apps often rely on repetitive, text-heavy interactions that interrupt emotional flow. Users spend more time replying than connecting, leading to passive scrolling and interaction fatigue.
                                </p>
                            </section>

                            {/* Key Insight */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Key Insight</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    When interaction becomes vocal, physical, and spatial, communication feels lighter and more natural. Gestures can replace typing, and visual feedback can reduce cognitive load — allowing users to focus on presence rather than replies.
                                </p>
                            </section>

                            {/* Solution */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Solution</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Datnie explores a gesture- and voice-driven mixed reality experience, where interaction is shaped through motion, timing, and visual response rather than traditional menus.
                                </p>
                                <p className="text-white/90 leading-relaxed">
                                    The system concept emphasizes reducing repetition while preserving personal expression through adaptive interface behavior.
                                </p>
                            </section>

                            {/* User Journey */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">User Journey</h2>
                                <p className="text-white/70 mb-8 italic">
                                    Gesture-based interaction explored through visual and animation-driven prototypes
                                </p>

                                <div className="space-y-8">
                                    {/* 1. Swipe */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-3">1. Swipe</h3>
                                        <p className="text-white/90 leading-relaxed mb-2">
                                            Swipe to skip and move to the next match.
                                        </p>
                                        <p className="text-white/80 text-sm">
                                            A continuous gesture used as a navigational metaphor to maintain flow and reduce decision pressure.
                                        </p>
                                    </div>

                                    {/* 2. Tap → Swipe → Tap */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-3">2. Tap → Swipe → Tap</h3>
                                        <p className="text-white/90 leading-relaxed mb-2">
                                            Tap to enter, swipe to navigate within profile layers, tap again to explore deeper content.
                                        </p>
                                        <p className="text-white/80 text-sm">
                                            A gesture sequence designed to replace hierarchical UI with spatial progression.
                                        </p>
                                    </div>

                                    {/* 3. Double Tap — Like */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-3">3. Double Tap — Like</h3>
                                        <p className="text-white/90 leading-relaxed mb-2">
                                            Double-tap to like the current match.
                                        </p>
                                        <p className="text-white/80 text-sm">
                                            A deliberate gesture chosen to convey intent and emotional emphasis.
                                        </p>
                                    </div>

                                    {/* 4. Hold — Voice to Text */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-3">4. Hold — Voice to Text</h3>
                                        <p className="text-white/90 leading-relaxed mb-2">
                                            Hold to activate voice input and send a message.
                                        </p>
                                        <p className="text-white/80 text-sm">
                                            A time-based gesture that supports conversational continuity and presence.
                                        </p>
                                    </div>

                                    {/* 5. Repeated Answer Concept */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-3">5. Repeated Answer Concept</h3>
                                        <p className="text-white/90 leading-relaxed mb-2">
                                            As conversations continue, frequently used responses are surfaced and reused through interface prompts.
                                        </p>
                                        <p className="text-white/80 text-sm">
                                            A conceptual exploration of how behavior patterns can reduce repetitive input.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Core Contributions */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Core Contributions</h2>
                                <ul className="list-disc list-inside space-y-4 text-white/90 text-lg ml-4">
                                    <li>
                                        Designed and modeled characters in <strong className="text-white">Blender</strong>, and implemented replaceable <strong className="text-white">groom-based fur visuals</strong> in <strong className="text-white">Unreal Engine</strong> to enhance expressive presence
                                    </li>
                                    <li>
                                        Created animation-driven interaction feedback, focusing on how characters and UI visually respond to user actions
                                    </li>
                                    <li>
                                        Designed a gesture-oriented UI structure (tap, swipe, double-tap, hold) as an <strong className="text-white">interaction vocabulary</strong> rather than a technical system
                                    </li>
                                    <li>
                                        Rapidly prototyped visual, animation, and UI concepts directly in engine to explore interaction flow and experiential quality
                                    </li>
                                </ul>
                            </section>

                            {/* My Approach */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">My Approach</h2>
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
