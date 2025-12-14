"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box, Sparkles, Layers, Zap } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';

interface MicroInvasionProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function MicroInvasionProjectPage({ metadata, content }: MicroInvasionProjectPageProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    const projectId = 'micro-invasion';

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video */}
            <video
                src={withBasePath("/projects/micro-invasion/videos/preview.mp4")}
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
                        src={withBasePath("/projects/micro-invasion/videos/preview.mp4")}
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">The Micro_Invasion AR</h1>
                            <p className="text-white/60 text-lg">Augmented Reality Experience</p>
                        </section>

                        {/* Tools Used */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Tools Used</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Snapchat Lens</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Lens Studio</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">JavaScript</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">AR 3D Modeling</span>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    The Micro_Invasion AR is an augmented reality experience using Snapchat Lens Studio. This project explores interactive AR content accessible through social media platforms, creating engaging experiences that blend digital elements with the real world.
                                </p>
                            </section>

                            {/* My Role */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">2. My Role</h2>

                                <div className="relative -mx-4 md:-mx-8">
                                    <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4 md:px-8">
                                        {/* Card 1 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Box className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">AR Development</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Designed and developed the AR experience using Snapchat Lens Studio
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
                                                <h3 className="text-lg font-semibold text-white mb-2">3D Modeling</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Created AR 3D models and interactive elements
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 3 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Layers className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">Interaction Design</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Designed interactive AR features and user interactions
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card 4 */}
                                        <div className="min-w-[280px] md:min-w-[320px] snap-start group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 min-h-[280px] flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-auto relative z-10 border border-white/5">
                                                <Zap className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">JavaScript Logic</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Implemented JavaScript logic for AR interactions and behaviors
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Core Contributions */}
                            <section>
                                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">3. Core Contributions</h2>
                                    <p className="text-white/70 text-base md:text-lg">
                                        I contributed across AR development, 3D modeling, interaction design, and JavaScript implementation.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {/* 3.1 AR Experience */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.1 AR Experience Development</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Developed an engaging AR experience accessible through Snapchat Lens Studio, creating interactive content that blends digital elements with the real world through smartphone cameras.
                                        </p>
                                    </div>

                                    {/* 3.2 Technical Implementation */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.2 Technical Implementation</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            Implemented AR features using JavaScript and Lens Studio's development tools, creating responsive interactions that work seamlessly across different devices and environments.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Breakdown */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">4. Technical Breakdown</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.1 AR Platform</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>Snapchat Lens Studio for AR development</li>
                                            <li>JavaScript for interaction logic</li>
                                            <li>3D modeling for AR elements</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.2 Key Features</h3>
                                        <p className="text-white/80 leading-relaxed">
                                            The AR experience optimizes for social media accessibility, ensuring smooth performance and engaging interactions through smartphone cameras.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Outcomes & Learnings */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">5. Outcomes & Learnings</h2>
                                <ul className="list-disc list-inside space-y-3 text-white/90 text-lg">
                                    <li><strong className="text-white">Impact:</strong> Created an interactive AR experience for social media</li>
                                    <li><strong className="text-white">Learning:</strong> Gained experience with Snapchat Lens Studio and AR development</li>
                                    <li><strong className="text-white">Future:</strong> Would explore more advanced AR interactions and multi-user experiences</li>
                                </ul>
                            </section>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
