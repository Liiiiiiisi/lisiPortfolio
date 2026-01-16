'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-cyan-500/4 blur-[100px] pointer-events-none -translate-x-1/3" />
      
      <Navigation />
      <main className="flex-1 pt-16 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
          {/* Hero Section */}
          <div>
            {/* Main heading - Hero Title with layered glow effect and manual line break */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 text-white leading-[1.05] max-w-[90%] relative" style={{ letterSpacing: '0.05em' }}>
              {/* Glow layer (behind) */}
              <span 
                className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05]"
                style={{
                  letterSpacing: '0.05em',
                  opacity: 0.18,
                  filter: 'blur(14px)',
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)',
                  color: 'rgba(59, 130, 246, 0.6)'
                }}
                aria-hidden="true"
              >
                Interaction-Focused<br />Designer & Developer
              </span>
              {/* Main text layer (on top) */}
              <span className="relative z-10 block" style={{ textShadow: '0 0 2px rgba(255, 255, 255, 0.1)' }}>
                Interaction-Focused<br />Designer & Developer
              </span>
            </h1>
            
            {/* Tagline - Hero Subtitle aligned with title */}
            <div className="mb-20 md:mb-24">
              <p className="text-sm md:text-base text-white leading-[1.45] max-w-[90%] opacity-[0.88] relative top-[6px]">
                Building real-time, spatial experiences through gesture, systems, and rapid prototyping
              </p>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12 lg:gap-16">
            {/* Left Column - About Content */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* About Me Title as section anchor */}
              <h2 
                className="text-xl md:text-2xl font-semibold mb-20 md:mb-24 text-white"
                style={{
                  letterSpacing: '0.04em',
                  textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)'
                }}
              >
                About Me
              </h2>

              {/* Content paragraphs */}
              <div>
                {/* Primary Layer */}
                <motion.p 
                  className="text-white text-[17px] md:text-[18px] leading-[1.65] opacity-100 mb-10"
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                >
                  I&apos;m an interaction-focused designer and developer working with real-time engines to build spatial and immersive experiences. My practice is driven by <span className="font-medium opacity-100" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.2)' }}>interaction logic</span> — I design <span className="font-medium opacity-100" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.2)' }}>gesture-based</span> flows, system states, and <span className="font-medium opacity-100" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.2)' }}>real-time feedback</span>, then prototype and implement them through engine-level scripting and <span className="font-medium opacity-100" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.2)' }}>AI-assisted development workflows</span>.
                </motion.p>
                
                {/* Secondary Layer */}
                <motion.p 
                  className="text-white text-[15px] md:text-[16px] leading-[1.65] opacity-[0.85]"
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 0.85, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                >
                  I work directly in-engine to rapidly test clarity, pacing, and usability, often working across design, art, and development to translate ideas into functional, real-time systems. My projects span XR, MR, and interactive media, and have been recognised with <span className="font-medium opacity-100" style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.2)' }}>XRDC 2025</span> awards for Contextual AI and Community Impact.
                </motion.p>
              </div>
            </motion.div>

            {/* Right Column - Lightweight Actions */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
              className="pt-20 md:pt-24 lg:pt-28"
            >
              <nav className="flex flex-col gap-6">
                <Link 
                  href="/resume"
                  className="text-white text-sm md:text-base opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  Resume →
                </Link>
                <Link 
                  href="/contact"
                  className="text-white text-sm md:text-base opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  Contact →
                </Link>
              </nav>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer isDark={true} />
    </div>
  );
}

