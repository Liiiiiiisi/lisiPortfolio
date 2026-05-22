"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Code, Layers, Zap, Users } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { withBasePath } from '@/lib/paths';
import YouMayAlsoLike from './YouMayAlsoLike';
import { useLanguage } from '@/context/LanguageContext';

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

interface MicroInvasionProjectPageProps {
  metadata?: any;
  content?: string;
}

export default function MicroInvasionProjectPage({ metadata, content }: MicroInvasionProjectPageProps) {
    const { t } = useLanguage();
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
                            <span className="font-medium">{t('shared.backToProjects')}</span>
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
                            <p className="text-white/60 text-lg">{t('micro.subtitle')}</p>
                        </section>

                        {/* Technical Stack */}
                        <section className="max-w-4xl mx-auto mt-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-xl">
                            <h2 className="text-lg md:text-xl font-semibold text-white mb-6">{t('shared.technicalStack')}</h2>

                            <div className="space-y-6">
                                {/* Tools Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.tools')}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {/* Lens Studio */}
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80 flex items-center gap-2">
                                            <ToolLogo name="lens-studio" alt="Lens Studio" />
                                            Lens Studio
                                        </span>
                                    </div>
                                </div>

                                {/* Features Section */}
                                <div>
                                    <h3 className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wider">{t('shared.features')}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Body Tracking
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Segmentation
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            World Mesh
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Particle System
                                        </span>
                                        <span className="px-3 py-1 rounded-full border border-white/20 text-xs text-white/80">
                                            Image Tracking
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Team Section */}
                        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Team</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Chuyue Yu Card */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-white">Chuyue Yu</h3>
                                        <p className="text-white/80 text-xs">{t('micro.team.chuyueTitle')}</p>
                                    </div>
                                </div>

                                {/* Yike Hu Card */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-white">Yike Hu</h3>
                                        <p className="text-white/80 text-xs">{t('micro.team.yikeTitle')}</p>
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
                                        <p className="text-white/80 text-xs">{t('micro.team.myRoleTitle')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Content Wrapper */}
                        <div className="relative z-10 space-y-12">
                            {/* Project Overview */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('micro.overview.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    <strong className="text-white">Micro_Invasion</strong> {t('micro.overview.body1')}
                                </p>
                                <p className="text-lg text-white/90 leading-relaxed mt-4">
                                    {t('micro.overview.body2')}
                                </p>
                            </section>

                            {/* Concept */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('micro.concept.title')}</h2>
                                <h3 className="text-2xl font-bold text-white mb-6">{t('micro.concept.subtitle')}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Card 1: Skin Contact */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm flex flex-col">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden h-48 flex-shrink-0">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/skin-contact.png")}
                                                alt="Skin Contact"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{t('micro.concept.c1.title')}</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {t('micro.concept.c1.desc')}
                                        </p>
                                    </div>

                                    {/* Card 2: Food Intake */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm flex flex-col">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden h-48 flex-shrink-0">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/food-intake.png")}
                                                alt="Food Intake"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{t('micro.concept.c2.title')}</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {t('micro.concept.c2.desc')}
                                        </p>
                                    </div>

                                    {/* Card 3: Respiration */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm flex flex-col">
                                        <div className="w-full mb-4 rounded-xl overflow-hidden h-48 flex-shrink-0">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/respiration.png")}
                                                alt="Respiration"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{t('micro.concept.c3.title')}</h4>
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {t('micro.concept.c3.desc')}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Interaction Design */}
                            <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t('micro.interaction.title')}</h2>

                                <div className="space-y-8">
                                    {/* Interaction 1: Skin Exposure */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.i1.title')}</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('micro.triggerLabel')}</strong> {t('micro.i1.trigger')}</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">{t('micro.effectLabel')}</strong> {t('micro.i1.effect')}</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">{t('micro.objectLabel')}</strong> {t('micro.i1.object')}</p>
                                                    <p><strong className="text-white">{t('micro.segmentLabel')}</strong> {t('micro.i1.segment')}</p>
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
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.i2.title')}</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('micro.triggerLabel')}</strong> {t('micro.i2.trigger')}</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">{t('micro.effectLabel')}</strong> {t('micro.i2.effect')}</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">{t('micro.objectLabel')}</strong> {t('micro.i2.object')}</p>
                                                    <p><strong className="text-white">{t('micro.segmentLabel')}</strong> {t('micro.i2.segment')}</p>
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
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.i3.title')}</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-white/80 mb-2"><strong className="text-white">{t('micro.triggerLabel')}</strong> {t('micro.i3.trigger')}</p>
                                                <p className="text-white/80 mb-4"><strong className="text-white">{t('micro.effectLabel')}</strong> {t('micro.i3.effect')}</p>
                                                <div className="space-y-2 text-white/70 text-sm">
                                                    <p><strong className="text-white">{t('micro.objectLabel')}</strong> {t('micro.i3.object')}</p>
                                                    <p><strong className="text-white">{t('micro.segmentLabel')}</strong> {t('micro.i3.segment')}</p>
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
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.finalReveal.title')}</h3>
                                        <p className="text-white/90 mb-4">
                                            {t('micro.finalReveal.body')}
                                        </p>
                                        <p className="text-white/80 italic mb-4 text-lg">
                                            &quot;{t('micro.finalReveal.quote')}&quot;
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
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('micro.tech.title')}</h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-8">
                                    {t('micro.tech.intro')}
                                </p>

                                <div className="space-y-6">
                                    {/* A. Image Tracking System */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.tech.a.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>{t('micro.tech.a.b1')}</li>
                                            <li>{t('micro.tech.a.b2')}</li>
                                            <li>{t('micro.tech.a.b3')}</li>
                                            <li>{t('micro.tech.a.b4')}</li>
                                        </ul>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/trimMark.gif")}
                                                alt="Image Tracking System"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* B. Body Tracking & Segmentation */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.tech.b.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                                            <li>{t('micro.tech.b.b1')}</li>
                                            <li>{t('micro.tech.b.b2')}</li>
                                            <li>{t('micro.tech.b.b3')}</li>
                                            <li>{t('micro.tech.b.b4')}</li>
                                        </ul>
                                        <div className="rounded-xl overflow-hidden border border-white/10">
                                            <img
                                                src={withBasePath("/projects/micro-invasion/images/segmentation.gif")}
                                                alt="Body Tracking & Segmentation"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* C. World Mesh Integration */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-xl font-bold text-white mb-4">{t('micro.tech.c.title')}</h3>
                                        <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                                            <li>{t('micro.tech.c.b1')}</li>
                                            <li>{t('micro.tech.c.b2')}</li>
                                            <li>{t('micro.tech.c.b3')}</li>
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
