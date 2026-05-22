'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface HomeVideoSectionProps {
  youtubeUrl?: string;
}

export default function HomeVideoSection({ youtubeUrl }: HomeVideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string | undefined) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);

  if (!videoId && !youtubeUrl) {
    // Fallback to placeholder if no YouTube URL provided
    return (
      <section className="w-full h-screen relative bg-black" style={{ backgroundColor: '#000000' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white">Video placeholder - Add YouTube URL</div>
        </div>
      </section>
    );
  }

  // YouTube embed URL with autoplay, no controls, loop, mute
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`;

  return (
    <>
      {/* CSS for liquid glass effect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes liquidGlassSheen {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
          }
        }

        .hero-headline-glass {
          position: relative;
          display: inline-block;
        }

        .hero-headline-glass::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 200%;
          pointer-events: none;
          animation: liquidGlassSheen 7s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
      `}} />

      <section 
        className="relative min-h-screen overflow-hidden bg-black"
        style={{ 
          backgroundColor: '#000000',
          isolation: 'isolate',
        }}
      >
        {/* Video Container - z-index 0 */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <iframe
            src={embedUrl}
            className="absolute"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              border: 'none',
              width: '120%',
              height: '120%',
              top: '-10%',
              left: '-10%',
              pointerEvents: 'none',
            }}
            title="Portfolio Showreel"
          />
        </div>

        {/* Subtle bottom gradient overlay - z-index 1 */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: `linear-gradient(
              to top,
              rgba(0,0,0,0.22) 0%,
              rgba(0,0,0,0.10) 18%,
              rgba(0,0,0,0.00) 45%
            )`,
          }}
        />

        {/* Hero Content - z-index 2 */}
        <div 
          className="absolute flex flex-col md:flex-row md:items-end md:justify-between gap-7"
          style={{
            left: 'clamp(24px, 8vw, 120px)',
            right: 'clamp(24px, 6vw, 96px)',
            bottom: 'clamp(32px, 6vh, 72px)',
            zIndex: 2,
          }}
        >
          {/* Left Side - Text Content */}
          <div style={{ maxWidth: 'none' }}>
            {/* Large Editorial Headline with liquid glass effect */}
            <h1
              className="m-0 font-semibold hero-headline-glass"
              style={{
                fontSize: 'clamp(36px, 4.6vw, 78px)',
                fontWeight: 650,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: 'rgba(255,255,255,0.55)',
                textShadow: '0 2px 20px rgba(255,255,255,0.15), 0 4px 40px rgba(255,255,255,0.08)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
              }}
            >
              {t('home.headline')}
            </h1>

            {/* Subtitle */}
            <p
              className="m-0 font-normal"
              style={{
                fontSize: 'clamp(14px, 1.5vw, 20px)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.5)',
                marginTop: '14px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 600ms ease-out 80ms, transform 600ms ease-out 80ms',
              }}
            >
              {t('home.subtitle')}
            </p>

            {/* Byline Row - with CTA aligned on right */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
              <p
                className="m-0 font-medium"
                style={{
                  fontSize: 'clamp(12px, 1.1vw, 15px)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase' as const,
                  color: 'rgba(255,255,255,0.55)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms',
                }}
              >
                {t('home.byline')}
              </p>

              {/* CTA Button - aligned with byline */}
              <Link
                href="/project"
                className="inline-block font-medium cursor-pointer transition-all duration-200"
                style={{
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: 'rgba(255,255,255,0.85)',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.06)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 600ms ease-out 200ms, transform 600ms ease-out 200ms, background 200ms ease, border-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
              >
                {t('home.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
