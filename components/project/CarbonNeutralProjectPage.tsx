"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Layers, Box, Sparkles, Code } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';

interface CarbonNeutralProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function CarbonNeutralProjectPage({ metadata, content }: CarbonNeutralProjectPageProps) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 100;
        const y = (e.clientY / innerHeight) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    const projectId = 'carbon-neutral';

    return (
        <div className="relative min-h-screen text-white selection:bg-neon-cyan/30" onMouseMove={handleMouseMove}>
            {/* Background Video */}
            <video
                src={withBasePath("/projects/carbon-neutral/videos/preview.mp4")}
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
                        src={withBasePath("/projects/carbon-neutral/videos/preview.mp4")}
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Personal Carbon Neutral</h1>
                            <p className="text-white/60 text-lg">Interactive Installation</p>
                        </section>

                        {/* Tools Used */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Tools Used</h2>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Unity</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Vuforia</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Cinema 4D</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Illustrator</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">C#</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Animator State Machine</span>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Personal Carbon Neutral is an AR game prototype that transforms a player's real-world carbon footprint into interactive digital creatures. The project integrates AR, environmental data, and game mechanics to explore how emerging technology can drive sustainable behavior through play.
                                </p>
                            </section>

                            {/* Problem */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">2. Problem</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-4">
                                    Carbon emissions are invisible and abstract, making them difficult for individuals to understand or act on.
                                </p>
                                <p className="text-white/90 leading-relaxed mb-4">
                                    Even people who want to behave sustainably often lack:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                    <li>Real-time feedback</li>
                                    <li>Behavioral insight</li>
                                    <li>An engaging reason to change habits</li>
                                </ul>
                                <p className="text-white/90 leading-relaxed">
                                    <strong className="text-white">Design challenge:</strong> How can technology make personal carbon impact visible, actionable, and emotionally meaningful?
                                </p>
                            </section>

                            {/* Concept */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">3. Concept</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-6">
                                    The game visualizes carbon emissions as creatures that players can interact with and transform through sustainable actions.
                                </p>

                                <div className="space-y-8">
                                    {/* SCM */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">SCM – Small Carbon Monsters</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            SCMs are formed from a player's daily carbon emissions. Players can <strong className="text-white">purify</strong> SCMs to reduce their footprint and add them to a creature collection for future battles.
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/scm-lifecycle.gif")}
                                                alt="SCM Lifecycle"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* LCM */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">LCM – Large Carbon Monsters</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            LCMs are generated from the <strong className="text-white">combined emissions of all players in a city</strong>. Defeating an LCM symbolizes achieving <strong className="text-white">temporary collective carbon neutrality</strong>.
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/lcm-formation.gif")}
                                                alt="LCM Formation"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-white/90 leading-relaxed">
                                        This system reframes climate responsibility into a <strong className="text-white">playable loop</strong> where real-world actions create in-game power.
                                    </p>
                                </div>
                            </section>

                            {/* System & Mechanics */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">4. System & Mechanics</h2>

                                <div className="space-y-8">
                                    {/* Behavior Tracking */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Behavior Tracking</h3>
                                        <p className="text-white/90 leading-relaxed mb-6">
                                            The system gathers emission-related actions through two channels.
                                        </p>

                                        <div className="space-y-6 mb-6">
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-xl font-semibold text-white mb-3">Auto-detected behaviors (AI pattern recognition)</h4>
                                                <p className="text-white/80 mb-3">
                                                    By analyzing movement rhythm and route patterns, the system can infer transport type:
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                                                    <li>Walking</li>
                                                    <li>Biking</li>
                                                    <li>Bus routes</li>
                                                    <li>Subway travel</li>
                                                    <li>Taxi / ride services</li>
                                                </ul>
                                                <p className="text-white/60 text-sm italic mt-3">
                                                    Concept: public transit follows fixed routes + consistent speeds; other modes have distinct patterns, making classification possible.
                                                </p>
                                            </div>

                                            <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                <img
                                                    src={withBasePath("/projects/carbon-neutral/images/behavior-travel-recognition.png")}
                                                    alt="Travel Mode Recognition"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>

                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-xl font-semibold text-white mb-3">Manually verified behaviors</h4>
                                                <p className="text-white/80 mb-3">
                                                    Actions requiring simple proof uploads include:
                                                </p>
                                                <ul className="list-disc list-inside space-y-1 text-white/80 ml-4">
                                                    <li>Recycling</li>
                                                    <li>Energy-saving habits</li>
                                                    <li>Conscious or low-impact shopping</li>
                                                    <li>Sustainable diet choices</li>
                                                </ul>
                                                <p className="text-white/80 mt-3">
                                                    To motivate these actions, players unlock <strong className="text-white">mini-games</strong> that reinforce sustainable habits.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reward Loop */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">Reward Loop</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            Sustainable behaviors convert into in-game value:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li><strong className="text-white">Coins</strong> – unlock skins</li>
                                            <li><strong className="text-white">Magic power</strong> – used in combat</li>
                                            <li><strong className="text-white">EXP</strong> – upgrades and evolves characters</li>
                                            <li><strong className="text-white">City progress</strong> – contributes to defeating LCMs</li>
                                        </ul>
                                        <p className="text-white/90 leading-relaxed mt-4">
                                            This creates a <strong className="text-white">closed feedback system</strong> where physical actions directly affect digital outcomes.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Character Design */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">5. Character Design</h2>

                                <div className="space-y-8">
                                    {/* Whale Willy */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Main Character – Whale Willy</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            Inspired by whales as natural <strong className="text-white">carbon sinks</strong>. Willy's appearance evolves based on the player's activity and progress.
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/whale-willy-evolution.png")}
                                                alt="Whale Willy Evolution"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* SCM Monsters */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">SCM Monsters</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            SCM creatures represent everyday environmental issues.
                                        </p>
                                        <div className="space-y-2 text-white/80 mb-4">
                                            <p><strong className="text-white">Bird Billy</strong> in petroleum</p>
                                            <p><strong className="text-white">Crab Craddock</strong> in a plastic shell</p>
                                            <p><strong className="text-white">Fish Fellah</strong> tangled in a nest</p>
                                            <p><strong className="text-white">Bear Bell</strong> with its head in a gasoline can</p>
                                        </div>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/scm-comparison-strip.png")}
                                                alt="SCM Comparison"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* LCM Monster */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-4">LCM Monster – Giant Salamander</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            A boss creature inspired by <strong className="text-white">extreme flood events</strong> and ecosystem vulnerability.
                                        </p>
                                        <div className="w-full my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/lcm-giant-salamander.png")}
                                                alt="Giant Salamander"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <p className="text-white/90 leading-relaxed">
                                            Each character anchors a real climate issue through playful, approachable visual storytelling.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Build */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">6. Technical Build</h2>

                                <div className="space-y-8">
                                    {/* 6.1 Modeling */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">6.1 Modeling & Visual Exploration (Cinema 4D)</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            I initially explored a <strong className="text-white">voxel-style particle system</strong> using Tool 4D Voxygen to visualize characters as "carbon particles." Although visually intriguing, this approach created:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>Unstable motion during FBX export</li>
                                            <li>High-frequency visual noise causing AR discomfort</li>
                                            <li>Poor readability in small real-world environments</li>
                                        </ul>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            To improve usability and performance, I transitioned to <strong className="text-white">cleaner 3D models</strong> with strong silhouettes, while maintaining carbon-inspired design cues.
                                        </p>
                                        <p className="text-white/60 text-sm italic mb-4">
                                            Tools: Cinema 4D, Voxygen plugin
                                        </p>
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/c4d-voxel-to-final.gif")}
                                                alt="C4D Voxel to Final"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* 6.2 AR Prototype */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-2xl font-bold text-white mb-4">6.2 AR Prototype Development</h3>
                                        <p className="text-white/90 leading-relaxed mb-4">
                                            In Unity, I built two AR battle prototypes that integrate animation, interaction logic, and spatial mapping.
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>C# battle logic</li>
                                            <li>Animator state machine</li>
                                            <li>Vuforia plane detection</li>
                                            <li>Real-world player movement mapped to combat distance</li>
                                        </ul>
                                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                            <img
                                                src={withBasePath("/projects/carbon-neutral/images/ar-prototype-demo.gif")}
                                                alt="AR Prototype Demo"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
