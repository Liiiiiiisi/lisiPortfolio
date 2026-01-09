"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Palette, Code, Smartphone, Sparkles } from "lucide-react";
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
                                    Signie is an innovative American Sign Language (ASL) learning and translation platform designed to bridge communication gaps. The platform combines interactive learning tools with AI-powered translation capabilities, making ASL more accessible to learners and enabling real-time communication support.
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
                                                <Palette className="w-6 h-6 text-white/60" strokeWidth={1.5} />
                                            </div>
                                            <div className="relative z-10 mt-12">
                                                <h3 className="text-lg font-semibold text-white mb-2">UI Design</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Designed and implemented the user interface using React and Next.js
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
                                                <h3 className="text-lg font-semibold text-white mb-2">API Integration</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Integrated OpenAI API for ASL translation functionality
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Responsive Layouts</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Developed responsive layouts with TailwindCSS
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
                                                <h3 className="text-lg font-semibold text-white mb-2">Interactive Components</h3>
                                                <p className="text-white/60 text-sm leading-relaxed">
                                                    Created interactive learning components
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
                                        I contributed across UI design, API integration, responsive development, and interactive component creation.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {/* 3.1 Interactive Learning Interface */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.1 Interactive Learning Interface</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            The platform features an intuitive interface that guides users through ASL learning. The design focuses on clarity and accessibility, ensuring users can easily navigate and learn.
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/signie/images/cover.png")}
                                                alt="Learning Interface"
                                                className="w-full h-auto object-cover"
                                            />
                                            <div className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/10">
                                                <p className="text-white/80 text-sm md:text-base">
                                                    This system solves the challenge of making ASL learning accessible by providing a structured, interactive experience.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3.2 AI-Powered Translation */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">3.2 AI-Powered Translation</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            The translation feature uses advanced AI to convert between spoken language and ASL, enabling real-time communication support.
                                        </p>
                                        <div className="space-y-4 mb-6">
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                                <p className="text-white/80"><strong className="text-white">Real-time Processing:</strong> Instant translation between text and ASL</p>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                                <p className="text-white/80"><strong className="text-white">Accuracy:</strong> High-quality translation using OpenAI&apos;s language models</p>
                                            </div>
                                        </div>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/signie/images/cover.png")}
                                                alt="Translation Demo"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Breakdown */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">4. Technical Breakdown</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.1 System Architecture</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80">
                                            <li>Frontend: React with Next.js for server-side rendering</li>
                                            <li>API Integration: OpenAI API for translation services</li>
                                            <li>Styling: TailwindCSS for responsive design</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold mb-4 text-white">4.2 Key Features</h3>
                                        <p className="text-white/80 leading-relaxed">
                                            The platform optimizes for real-time interaction and accessibility, ensuring smooth performance across devices.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Outcomes & Learnings */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">5. Outcomes & Learnings</h2>
                                <ul className="list-disc list-inside space-y-3 text-white/90 text-lg">
                                    <li><strong className="text-white">Impact:</strong> Created a functional prototype for ASL learning and translation</li>
                                    <li><strong className="text-white">Learning:</strong> Gained experience with AI API integration and accessible design</li>
                                    <li><strong className="text-white">Future:</strong> Would explore more advanced gesture recognition and video-based learning features</li>
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
