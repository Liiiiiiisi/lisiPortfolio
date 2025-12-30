"use client";

import Image from "next/image";
import { withBasePath } from '@/lib/paths';

export default function StorytellingUnitDesignSection() {
    return (
        <section className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-xl space-y-8">
            {/* Header Block with Tower Background */}
            <div className="relative min-h-[200px] md:min-h-[250px]">
                {/* Tower Background Image - Right Side, More Visible but Blended */}
                <div 
                    className="absolute right-0 top-0 h-full w-[52%] overflow-hidden pointer-events-none"
                    style={{
                        maskImage: 'radial-gradient(ellipse 90% 120% at right center, black 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 120% at right center, black 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 70%, transparent 100%)',
                    }}
                >
                    <div 
                        className="relative w-full h-full"
                        style={{
                            filter: 'brightness(1.10) contrast(1.12) blur(0.5px)',
                            mixBlendMode: 'screen',
                        }}
                    >
                        <Image
                            src={withBasePath("/projects/canopy-of-echo/images/Tower.png")}
                            alt="Tower"
                            fill
                            className="object-cover object-right opacity-[0.30] md:opacity-[0.38]"
                        />
                    </div>
                </div>
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none z-[1]" />
                
                {/* Film Grain/Noise Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none z-[2] opacity-[0.08] md:opacity-[0.12]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px 200px',
                        mixBlendMode: 'overlay',
                    }}
                />
                
                {/* Header Content */}
                <div className="relative z-10 pr-0 md:pr-[45%]">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        5.1 Storytelling & Unit Design
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                        In collaboration with Jingru, I distilled 18 historical and contemporary stories into narrative modules embedded in each kinetic unit. Examples:
                    </p>
                </div>
            </div>

            {/* Story Cards */}
            <div className="space-y-6">
                {/* Card 1: The Returning Relics */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Left: Text Content */}
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                The Returning Relics
                            </h3>
                            <p className="text-white/90 leading-relaxed mb-2">
                                A family donated 30+ treasured artefacts: "These are our roots — they cannot be sold." A quiet act of public heritage protection.
                            </p>
                            <p className="text-xs text-white/50 italic">
                                Reference photos used for narrative grounding.
                            </p>
                        </div>
                        
                        {/* Right: Circular Images */}
                        <div className="flex gap-4 shrink-0">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Relics1.png")}
                                    alt="Relics 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Relics2.png")}
                                    alt="Relics 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: History Beneath Our Feet */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Left: Text Content */}
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                History Beneath Our Feet
                            </h3>
                            <p className="text-white/90 leading-relaxed mb-2">
                                A brick used to prop up an elderly woman's stool was found to be a 600-year-old Ming city wall brick—history hidden in daily life.
                            </p>
                            <p className="text-xs text-white/50 italic">
                                Reference photos used for narrative grounding.
                            </p>
                        </div>
                        
                        {/* Right: Circular Images */}
                        <div className="flex gap-4 shrink-0">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Feet1.png")}
                                    alt="Feet 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Feet2.jpeg")}
                                    alt="Feet 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: From Shield to Foundation */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Left: Text Content */}
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                From Shield to Foundation
                            </h3>
                            <p className="text-white/90 leading-relaxed mb-2">
                                A former defensive brick now supports Nanjing University's architecture—shifting from protecting the city to supporting generations.
                            </p>
                            <p className="text-xs text-white/50 italic">
                                Reference photos used for narrative grounding.
                            </p>
                        </div>
                        
                        {/* Right: Circular Images */}
                        <div className="flex gap-4 shrink-0">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Shield1.png")}
                                    alt="Shield 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/20 overflow-hidden bg-white/5">
                                <Image
                                    src={withBasePath("/projects/canopy-of-echo/images/Shield2.png")}
                                    alt="Shield 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Line */}
            <p className="text-white/70 leading-relaxed pt-2">
                Together, these stories form a flowing narrative landscape linking wall, tower, river, and citizens into one evolving memory.
            </p>
        </section>
    );
}

