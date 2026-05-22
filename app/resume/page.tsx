'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { withBasePath } from '@/lib/paths';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

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

export default function Resume() {
  const { t } = useLanguage();
  const router = useRouter();

  // Redirect to home if resume is hidden via env flag
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_RESUME !== 'true') {
      router.replace('/');
    }
  }, [router]);

  

  const sections = [
    { id: 'awards', label: t('resume.nav.awards') },
    { id: 'projects', label: t('resume.nav.projects') },
    { id: 'practice', label: t('resume.nav.practice') },
    { id: 'skills', label: t('resume.nav.skills') },
    { id: 'education', label: t('resume.nav.education') },
    { id: 'contact', label: t('resume.nav.contact') },
  ];

  const sectionIds = sections.map(s => s.id);
  const activeSection = useScrollSpy(sectionIds, 150);
  const navRef = useRef<HTMLDivElement>(null);
  
  if (process.env.NEXT_PUBLIC_SHOW_RESUME !== 'true') {
    return null;
  }

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
          <div className="lg:hidden sticky top-[80px] z-40 mb-12 overflow-x-auto scrollbar-hide -mx-6 sm:-mx-8 px-6 sm:px-8 bg-black/80 backdrop-blur-md py-4 -mt-4">
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
                  {t('resume.nav.awards')}
                </h2>
                <div className="max-w-[56ch] space-y-6">
                  <motion.div
                    className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 0.9, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
                  >
                    <p className="font-medium mb-1">{t('resume.award1.title')}</p>
                    <p className="opacity-80">{t('resume.award1.project')}</p>
                  </motion.div>
                  <motion.div
                    className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90"
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 0.9, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                  >
                    <p className="font-medium mb-1">{t('resume.award2.title')}</p>
                    <p className="opacity-80">{t('resume.award2.project')}</p>
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
                  {t('resume.nav.projects')}
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
                      {t('resume.project1.title')}
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>{t('resume.project1.bullet1')}</li>
                      <li>{t('resume.project1.bullet2')}</li>
                      <li>{t('resume.project1.bullet3')}</li>
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
                      {t('resume.project2.title')}
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>{t('resume.project2.bullet1')}</li>
                      <li>{t('resume.project2.bullet2')}</li>
                      <li>{t('resume.project2.bullet3')}</li>
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
                      {t('resume.project3.title')}
                    </h3>
                    <ul className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-2 mb-4 list-disc list-inside">
                      <li>{t('resume.project3.bullet1')}</li>
                      <li>{t('resume.project3.bullet2')}</li>
                      <li>{t('resume.project3.bullet3')}</li>
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
                  {t('resume.nav.practice')}
                </h2>
                <div className="max-w-[56ch]">
                  <div className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90 space-y-4">
                    <p className="font-medium opacity-100">{t('resume.practice.title')}</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>{t('resume.practice.bullet1')}</li>
                      <li>{t('resume.practice.bullet2')}</li>
                      <li>{t('resume.practice.bullet3')}</li>
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
                  {t('resume.nav.skills')}
                </h2>
                <div className="max-w-[56ch] space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0, ease: 'easeOut' }}
                  >
                    <h3 className="text-white text-base font-medium mb-4 opacity-100">{t('resume.skills.toolsLabel')}</h3>
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
                    <h3 className="text-white text-base font-medium mb-3 opacity-100">{t('resume.skills.featuresLabel')}</h3>
                    <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                      {t('resume.skills.featuresText')}
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
                  {t('resume.nav.education')}
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
                      <p className="font-medium opacity-100">{t('resume.edu1.degree')}</p>
                      <p className="opacity-80">{t('resume.edu1.result')}</p>
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
                      <p className="font-medium opacity-100">{t('resume.edu2.degree')}</p>
                      <p className="opacity-80">{t('resume.edu2.result')}</p>
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
                  {t('resume.nav.contact')}
                </h2>
                <div className="max-w-[56ch] space-y-3">
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    {t('resume.download.pdf')}
                  </p>
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    Email: lxie082@outlook.com
                  </p>
                  <p className="text-white text-[15px] md:text-[16px] leading-relaxed opacity-90">
                    {t('resume.download.location')}
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
