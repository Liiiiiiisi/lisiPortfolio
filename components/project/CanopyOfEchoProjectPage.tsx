"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box, Layers, Code, Video } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';

interface CanopyOfEchoProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function CanopyOfEchoProjectPage({ metadata, content }: CanopyOfEchoProjectPageProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    const projectId = 'canopy-of-echo';

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video */}
            <video
                src={withBasePath("/projects/canopy-of-echo/videos/preview.mp4")}
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
                        src={withBasePath("/projects/canopy-of-echo/videos/preview.mp4")}
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Canopy of Echo</h1>
                            <p className="text-white/60 text-lg">Kinetic Installation</p>
                        </section>

                        {/* Tools Used */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Tools Used</h2>
                            <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">TouchDesigner</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Unreal Engine</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Blender</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Illustrator</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">OSC</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">MediaPipe</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Physical Winches</span>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Canopy of Echo is a real-scale kinetic installation that turns heritage memory into motion, rhythm, and light. Designed for the Great Bao'en Temple under the competition theme "One Wall, One Tower, One River," the work connects Nanjing's artefacts and citizens through an interactive "river of stories."
                                </p>
                            </section>

                            {/* Context */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">2. Context</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Historic narratives often feel distant because they're locked inside sites, objects, and text.
                                </p>
                                <p className="text-white/90 leading-relaxed">
                                    <strong className="text-white">Design challenge:</strong> How can a heritage installation make history spatial, observable, and emotionally engaging—so visitors don't just read stories, but encounter them?
                                </p>
                            </section>

                            {/* Deliverables */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">3. Deliverables</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-6">
                                    Our team delivered a complete pipeline from concept to physical + digital prototyping:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-8">
                                    <li>Full-scale physical installation</li>
                                    <li>Miniature model</li>
                                    <li>Unreal Engine interaction prototype</li>
                                    <li>Rendered video</li>
                                </ul>
                                
                                {/* 4 Media Items in a Row */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                        <div className="aspect-video bg-white/5 flex items-center justify-center">
                                            <p className="text-white/40 text-xs">Small Scale Model</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                        <div className="aspect-video bg-white/5 flex items-center justify-center">
                                            <p className="text-white/40 text-xs">Physical Model</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                        <div className="aspect-video bg-white/5 flex items-center justify-center">
                                            <p className="text-white/40 text-xs">Unreal Prototype</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                        <div className="aspect-video bg-white/5 flex items-center justify-center">
                                            <p className="text-white/40 text-xs">Rendered Video</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Team */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">4. Team</h2>
                                <div className="space-y-3 text-white/90">
                                    <p><strong className="text-white">Saurabhkumar Ramanbhai Parmar</strong> — Developer, Physical Prototype, Project Management</p>
                                    <p><strong className="text-white">Findlay Cumming</strong> — VR Developer</p>
                                    <p><strong className="text-white">Jingru Feng</strong> — Architecture & Storytelling Designer</p>
                                    <p><strong className="text-white">My Role</strong> — 3D Modelling · Unreal Prototype · Storytelling Design · Production Coordination & Budgeting · Video Editing</p>
                                </div>
                            </section>

                            {/* User Journey */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">5. User Journey</h2>

                                <div className="space-y-8">
                                    {/* 5.1 */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-2xl font-bold text-white mb-4">5.1 Connection with the River — Flow of Memory</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            The installation moves in a continuous sine-wave rhythm, mirroring the river and symbolizing the flow of collective memory.
                                        </p>
                                    </div>

                                    {/* 5.2 */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-2xl font-bold text-white mb-4">5.2 Connection with the Wall — Reconstructing What Once Stood</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Facing the ancient city wall, the roofline references the lost tower. Visitors can visually "restore" the historic architecture through perspective.
                                        </p>
                                    </div>

                                    {/* 5.3 */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-2xl font-bold text-white mb-4">5.3 Connection with the Tower — Approaching Stories</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            When visitors step close to a unit, the winch pauses so they can observe and absorb the embedded story.
                                        </p>
                                    </div>

                                    {/* 5.4 */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-2xl font-bold text-white mb-4">5.4 Connection with the Audience — Participatory Heritage</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            Visitors are encouraged to explore the city, rediscover relics, and upload personal stories—expanding the installation with living memory over time.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Core Contributions */}
                            <section>
                                <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">6. Core Contributions</h2>
                                </div>

                                <div className="space-y-8">
                                    {/* 6.1 Storytelling & Unit Design */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">6.1 Storytelling & Unit Design</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            In collaboration with Jingru, I distilled 18 historical and contemporary stories into narrative modules embedded in each kinetic unit. Examples:
                                        </p>
                                        
                                        <div className="space-y-4">
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <h4 className="text-lg font-semibold text-white mb-2">The Returning Relics</h4>
                                                <p className="text-white/80 text-sm">
                                                    A family donated 30+ treasured artefacts: "These are our roots — they cannot be sold." A quiet act of public heritage protection.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <h4 className="text-lg font-semibold text-white mb-2">History Beneath Our Feet</h4>
                                                <p className="text-white/80 text-sm">
                                                    A brick used to prop up an elderly woman's stool was found to be a 600-year-old Ming city wall brick—history hidden in daily life.
                                                </p>
                                            </div>
                                            
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <h4 className="text-lg font-semibold text-white mb-2">From Shield to Foundation</h4>
                                                <p className="text-white/80 text-sm">
                                                    A former defensive brick now supports Nanjing University's architecture—shifting from protecting the city to supporting generations.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-white/90 leading-relaxed mt-6">
                                            Together, these stories form a flowing narrative landscape linking wall, tower, river, and citizens into one evolving memory.
                                        </p>
                                    </div>

                                    {/* 6.2 Unreal Interactive Prototype */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">6.2 Unreal Interactive Prototype — Interactive Winch System</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            I built a real-time pipeline connecting:
                                        </p>
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                                            <p className="text-white/80 font-mono text-center">
                                                Unreal Engine ↔ TouchDesigner ↔ OSC
                                            </p>
                                        </div>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            Two motion states:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <p className="text-white/80"><strong className="text-white">Sinewave Mode</strong> — smooth continuous motion</p>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                                <p className="text-white/80"><strong className="text-white">Freeze Mode</strong> — pauses when visitors approach</p>
                                            </div>
                                        </div>
                                        <p className="text-white/90 leading-relaxed">
                                            Using MediaPipe, cameras detect visitor positions. When someone enters a zone, the corresponding unit freezes, then resumes after they leave—creating a clear reading-and-discovery rhythm.
                                        </p>
                                    </div>

                                    {/* 6.3 Video Production */}
                                    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-xl space-y-4">
                                        <h3 className="text-2xl font-bold text-white">6.3 Video Production</h3>
                                        <p className="text-white/90 leading-relaxed">
                                            I wrote the script, built animation beats, set up scenes and lighting, and rendered the narrative video to communicate the concept, interaction logic, and heritage value.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Outcome */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">7. Outcome</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    <strong className="text-white">Winner</strong> — Best Heritage Narrative Prize 2025 Digital Heritage Competition
                                </p>
                            </section>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
