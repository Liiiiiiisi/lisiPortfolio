"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code, Layers, Zap, Users } from "lucide-react";
import React from "react";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';

interface MicroInvasionProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function MicroInvasionProjectPage({ metadata, content }: MicroInvasionProjectPageProps) {
    const projectId = 'micro-invasion';
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
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Micro_invasion</h1>
                            <p className="text-white/60 text-lg">AR Snapchat</p>
                        </section>

                        {/* Tools Used */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Tools Used</h2>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Lens Studio</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Body Tracking</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Segmentation</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">World Mesh</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Particle System</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">Image Tracking</span>
                                </div>
                            </div>
                            <p className="text-white/60 text-sm mt-4 text-center">Used for: Real-time AR interaction, environment mapping, and body-surface visualization</p>
                        </section>

                        {/* Team Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Team</h2>
                            <div className="space-y-3 text-white/90">
                                <p><strong className="text-white">Chuyue Yu</strong> — Interaction Designer</p>
                                <p><strong className="text-white">Yike Hu</strong> — Visual Designer & Video Editor</p>
                                <p><strong className="text-white">My Role</strong> — Interaction & AR Developer</p>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">01. Project Overview</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    <strong className="text-white">Micro_Invasion</strong> is an AR experience that visualizes how microplastics enter the body through ordinary routines.
                                </p>
                                <p className="text-lg text-white/90 leading-relaxed mt-4">
                                    Framed around a dining scene, the project uses real-time tracking, segmentation, and particle simulation to reveal invisible contamination on the user&apos;s hands, face, clothing, and surrounding environment.
                                </p>
                            </section>

                            {/* Concept */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">02. Concept</h2>
                                <h3 className="text-2xl font-bold text-white mb-6">Hidden Contamination</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Card 1: Skin Contact */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/skin-contact.png")}
                                                alt="Skin Contact"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Skin Contact</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Degraded plastics leave micro-sized particles that stick to the skin during daily use.
                                        </p>
                                    </div>

                                    {/* Card 2: Food Intake */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/food-intake.png")}
                                                alt="Food Intake"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Food Intake</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Produce can carry microplastics absorbed from the environment.
                                        </p>
                                    </div>

                                    {/* Card 3: Respiration */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/respiration.png")}
                                                alt="Respiration"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Respiration</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            Polyester and nylon fabrics release airborne microfibers that can be inhaled.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Interaction Design */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">03. Interaction Design</h2>

                                <div className="space-y-8">
                                    {/* Interaction 1: Skin Exposure */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">1 — Skin Exposure</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">Trigger:</strong> Hand sanitizer interaction</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">Effect:</strong> Activates hand segmentation and particle attachment</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">Object:</strong> Hand Sanitizer</p>
                                                    <p><strong className="text-white">Segment:</strong> Hand Segmentation Mask</p>
                                                </div>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/micro-invasion/images/skin-spread.gif")}
                                                    alt="Microplastic Spread on Skin"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interaction 2: Food Exposure */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">2 — Food Exposure</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">Trigger:</strong> Apple proximity</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">Effect:</strong> Triggers particle accumulation on the face region</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">Object:</strong> Apple</p>
                                                    <p><strong className="text-white">Segment:</strong> Face Segmentation</p>
                                                </div>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/micro-invasion/images/face-particles.gif")}
                                                    alt="Particles on Face"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interaction 3: Fabric Exposure */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">3 — Fabric Exposure</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">Trigger:</strong> Napkin wipe</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">Effect:</strong> Attaches fibers to the clothing segmentation</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">Object:</strong> Napkin</p>
                                                    <p><strong className="text-white">Segment:</strong> Clothing Region</p>
                                                </div>
                                            </div>
                                            <div className="rounded-xl overflow-hidden border border-white/10">
                                                <img
                                                    src={withBasePath("/projects/micro-invasion/images/fiber-attachment.gif")}
                                                    alt="Fiber Attachment"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Reveal */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">Final Reveal</h3>
                                        <p className="text-white/90 mb-4">
                                            A room-scale particle reveal expands beyond the user&apos;s body and fills the environment.
                                        </p>
                                        <p className="text-white/80 italic mb-4 text-lg">
                                            &quot;Welcome to the world of microplastics.&quot;
                                        </p>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/world-mesh-reveal.gif")}
                                                alt="World Mesh Reveal"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Implementation */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">04. Technical Implementation</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-8">
                                    I engineered the interaction system, AR logic, image tracking, segmentation, and world-mesh effects.
                                </p>

                                <div className="space-y-6">
                                    {/* A. Image Tracking System */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">A. Image Tracking System</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>Designed a large QR marker as the central anchor</li>
                                            <li>Built three collider boxes as event triggers</li>
                                            <li>Developed the interaction flow: skin → food → fabric → environment</li>
                                            <li>Created a real-time distance-tracking script to measure hand-to-collider proximity</li>
                                        </ul>
                                    </div>

                                    {/* B. Body Tracking & Segmentation */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">B. Body Tracking & Segmentation</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>Integrated a hand-detection helper image for segmentation debugging</li>
                                            <li>Adapted the <code className="text-white/60 bg-white/5 px-1 rounded">example_segmentation</code> template for particle emission</li>
                                            <li>Controlled segmentation masks for targeted particle activation</li>
                                            <li>Linked segmentation output to interaction states</li>
                                        </ul>
                                    </div>

                                    {/* C. World Mesh Integration */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">C. World Mesh Integration</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>Extended the simple world mesh template for room-scale particle mapping</li>
                                            <li>Configured mesh-based particle emission reactive to the environment</li>
                                            <li>Optimized performance by limiting unnecessary particles</li>
                                        </ul>
                                    </div>
                                </div>
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
