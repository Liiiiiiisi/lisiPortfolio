'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/paths';
import { motion } from 'framer-motion';

// Helper component for tool logos
function ToolLogo({ name, alt }: { name: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(withBasePath(`/assets/logos/${name}.svg`));
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={20}
      height={20}
      className="object-contain w-5 h-5"
      unoptimized={true}
      onError={() => {
        if (imgSrc.includes('.svg')) {
          setImgSrc(withBasePath(`/assets/logos/${name}.png`));
        } else {
          setHasError(true);
        }
      }}
      style={{ display: hasError ? 'none' : 'block' }}
    />
  );
}

// Helper component for school logos (larger size)
function SchoolLogo({ name, alt }: { name: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(withBasePath(`/assets/logos/${name}.svg`));
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={40}
      height={40}
      className="object-contain w-10 h-10"
      unoptimized={true}
      onError={() => {
        if (imgSrc.includes('.svg')) {
          setImgSrc(withBasePath(`/assets/logos/${name}.png`));
        } else {
          setHasError(true);
        }
      }}
      style={{ display: hasError ? 'none' : 'block' }}
    />
  );
}

// Helper component for Goldsmiths logo (extra large)
function GoldsmithsLogo({ name, alt }: { name: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(withBasePath(`/assets/logos/${name}.svg`));
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={60}
      height={60}
      className="object-contain w-16 h-16"
      unoptimized={true}
      onError={() => {
        if (imgSrc.includes('.svg')) {
          setImgSrc(withBasePath(`/assets/logos/${name}.png`));
        } else {
          setHasError(true);
        }
      }}
      style={{ display: hasError ? 'none' : 'block' }}
    />
  );
}

const sections = [
  { id: 'awards', label: 'Awards' },
  { id: 'projects', label: 'Selected Projects' },
  { id: 'practice', label: 'Practice' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Download / Contact' },
];

export default function Resume() {
  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, 150);
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll active nav item into view on mobile
  useEffect(() => {
    if (navRef.current && window.innerWidth < 1024) {
      const activeButton = navRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Subtle background glow - only background uses overflow-hidden */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] -translate-x-1/4 -translate-y-1/4" />
        <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-cyan-500/4 blur-[100px] -translate-x-1/3" />
      </div>
      
      <Navigation />
      
      {/* Desktop: Fixed left navigation */}
      <aside className="hidden lg:block fixed left-0 top-[96px] w-[260px] px-6 z-30">
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? 'text-white opacity-100'
                  : 'text-gray-400 opacity-70 hover:opacity-100 hover:text-gray-300'
              }`}
              style={{
                textShadow: activeSection === section.id 
                  ? '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)' 
                  : 'none',
                letterSpacing: activeSection === section.id ? '0.05em' : '0.02em',
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 pt-16 bg-black relative z-10 lg:pl-[300px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20">
          {/* Mobile: Horizontal scrollable nav */}
          <div className="lg:hidden mb-12 overflow-x-auto scrollbar-hide -mx-6 sm:-mx-8 px-6 sm:px-8">
            <nav 
              ref={navRef}
              className="flex gap-4 pb-2"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  data-section={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeSection === section.id
                      ? 'text-white opacity-100'
                      : 'text-gray-400 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    textShadow: activeSection === section.id 
                      ? '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)' 
                      : 'none',
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content area */}
          <div>
              {/* Awards Section */}
              <motion.section 
                id="awards" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Awards
                </h2>
                <div className="max-w-[56ch] space-y-6">
                  <motion.div 
                    className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 0.9, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                  >
                    <p className="font-medium mb-1">XRDC 2025 — Contextual AI Prize & Community Impact</p>
                    <p className="opacity-80">Project: SIGNIE (MR ASL Tutor & Translator)</p>
                  </motion.div>
                  <motion.div 
                    className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 0.9, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                  >
                    <p className="font-medium mb-1">Digital Heritage Competition — Best Heritage Prize</p>
                    <p className="opacity-80">Project: Canopy of Echo (Great Bao&apos;en Monastery Museum)</p>
                  </motion.div>
                </div>
              </motion.section>

              {/* Selected Projects Section */}
              <motion.section 
                id="projects" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Selected Projects
                </h2>
                <div className="max-w-[56ch] space-y-10">
                  {/* Project 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-lg md:text-xl font-semibold mb-4 opacity-100">
                      SIGNIE — MR ASL Tutor & Translator
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>World-space UI & MR readability (floating text, interaction cues)</li>
                      <li>Virtual guide system (hand animations, triggers, UI events)</li>
                      <li>Micro-gesture interaction + voice-driven logic (Wit.ai)</li>
                    </ul>
                    <div className="text-white text-sm opacity-70">
                      Unity / C# / MR / Hand Tracking / Interaction Systems
                    </div>
                  </motion.div>

                  {/* Project 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-lg md:text-xl font-semibold mb-4 opacity-100">
                      GUARDIAN&apos;S GUIDE — VR Training System
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>Modular C# interaction and rule-based systems</li>
                      <li>Onboarding flow, scoring logic, and feedback design</li>
                      <li>Accessibility-oriented interaction and environment tuning</li>
                    </ul>
                    <div className="text-white text-sm opacity-70">
                      Unity / C# / VR / Interaction Design / Training Systems
                    </div>
                  </motion.div>

                  {/* Project 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-lg md:text-xl font-semibold mb-4 opacity-100">
                      PRAY FOR BLESSING — VR Immersive Experience
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>Core VR interaction systems (gesture-based handwriting)</li>
                      <li>URP particle VFX optimization (~25% GPU load reduction)</li>
                      <li>Shader Graph materials and timeline-driven sequencing</li>
                    </ul>
                    <div className="text-white text-sm opacity-70">
                      Unity / C# / URP / VFX / Optimization
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Practice Section */}
              <motion.section 
                id="practice" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Practice
                </h2>
                <div className="max-w-[56ch]">
                  <div className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-4">
                    <p className="font-medium opacity-100">Freelance XR Developer & Designer (2024–Present)</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Delivered Unity XR prototypes and interaction systems</li>
                      <li>Built immersive experiences for exhibitions and research projects</li>
                      <li>Worked end-to-end across interaction design, implementation, and iteration</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Skills Section */}
              <motion.section 
                id="skills" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Skills
                </h2>
                <div className="max-w-[56ch] space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-base font-medium mb-4 opacity-100">Tools</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
                      <div className="flex items-center gap-2">
                        <ToolLogo name="unity" alt="Unity" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Unity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="unreal-engine" alt="Unreal Engine" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Unreal Engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="touchdesigner" alt="TouchDesigner" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">TouchDesigner</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="lens-studio" alt="Lens Studio" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Lens Studio</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="8th_wall" alt="8th Wall" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">8th Wall</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="blender" alt="Blender" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Blender</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="cinema_4D" alt="Cinema 4D" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Cinema 4D</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="figma" alt="Figma" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Figma</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="photoshop" alt="Photoshop" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Photoshop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="illustrator" alt="Illustrator" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Illustrator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="vuforia" alt="Vuforia" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Vuforia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="wit.ai" alt="Wit.ai" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Wit.ai</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="eleven_labs" alt="Eleven Labs" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Eleven Labs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="suno" alt="Suno" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Suno</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="unity-version-control" alt="Unity Version Control" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Unity Version Control</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToolLogo name="dollars_mocap" alt="Dollars Mocap" />
                        <span className="text-white text-[15px] md:text-[16px] opacity-90">Dollars Mocap</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-base font-medium mb-3 opacity-100">Features</h3>
                    <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                      C# · XR Interaction Systems · Hand Tracking / Micro-gestures<br />
                      World-space UI · URP VFX / Particle Systems · Shader Graph<br />
                      Cinemachine & Timeline · Profiling & Optimization · Git
                    </p>
                  </motion.div>
                </div>
              </motion.section>

              {/* Education Section */}
              <motion.section 
                id="education" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Education
                </h2>
                <div className="max-w-[56ch] space-y-4">
                  <motion.div 
                    className="flex items-center gap-6"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0, ease: 'easeOut' }}
                  >
                    <div className="flex-shrink-0 w-16 flex items-center justify-center">
                      <GoldsmithsLogo name="goldsmiths" alt="Goldsmiths" />
                    </div>
                    <div className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 flex-1">
                      <p className="font-medium opacity-100">MA Virtual & Augmented Reality — Goldsmiths, University of London</p>
                      <p className="opacity-80">Distinction, 2024</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-6"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                  >
                    <div className="flex-shrink-0 w-16 flex items-center justify-center">
                      <SchoolLogo name="sva" alt="School of Visual Arts" />
                    </div>
                    <div className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 flex-1">
                      <p className="font-medium opacity-100">BFA Design — School of Visual Arts</p>
                      <p className="opacity-80">Honors, 2020</p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Download / Contact Section */}
              <motion.section 
                id="contact" 
                className="mb-16 md:mb-24 scroll-mt-32"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 
                  className="text-2xl md:text-3xl font-semibold mb-8 text-white uppercase tracking-wider"
                  style={{
                    letterSpacing: '0.08em',
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.15)',
                  }}
                >
                  Download / Contact
                </h2>
                <div className="max-w-[56ch] space-y-3">
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    Download PDF Resume
                  </p>
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    Email: lxie082@outlook.com
                  </p>
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    Location: London, UK
                  </p>
            </div>
              </motion.section>
          </div>
        </div>
      </main>
      <Footer isDark={true} />
    </div>
  );
}
