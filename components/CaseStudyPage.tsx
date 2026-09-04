'use client';

/**
 * CaseStudyPage — the shared project detail / case-study template.
 *
 * Direction: "Hybrid A+B" — an editorial broadsheet (Porto Rocha /
 * Spencer Gabor: typography-led, asymmetric prose column, alternating
 * media rhythm, minimal framing) plus one borrowing from monopo/Studio
 * Freight: a MINIMAL fixed section index (not a full sidebar rail) that
 * tracks progress through the numbered sections, echoing the homepage
 * showcase's 01—04 axis. Ends Locomotive-style: credits, then a
 * full-bleed handoff into the next project.
 *
 * Deliberate constraints, per brief: editorial not dashboard — no
 * rounded cards, no nested containers, no pills, no documentation
 * chrome. Media sits as bare rectangles on the warm ground; hairline
 * `line` rules do all the dividing; the only accent use is focus/hover.
 *
 * Layout system
 *   - 12-column grid inside max-w-site. Section number + label sit in the
 *     left margin (cols 1–3); prose occupies cols 4–9, leaving the right
 *     margin open. Prose never runs full width.
 *   - Media rhythm alternates by block layout:
 *       full  → breaks the container edge-to-edge (punctuation)
 *       inset → sits within the grid, ground visible around it (breath)
 *       pair  → two items, vertically staggered (comparison)
 *   - Generous section spacing (~10–14rem) so the page is spacious
 *     without being empty.
 *
 * Motion: the site's existing vocabulary only — fadeUp on first arrival
 * plus a slight scale settle on media. A 1px scroll-progress rule sits at
 * the very top. No pinning or scroll-hijacking here; the homepage already
 * owns those, and a reading page should scroll normally.
 * Reduced motion: reveals collapse to fades, posters replace autoplay.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { getCaseStudy } from '@/data/caseStudies';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import NextProjectTransition from '@/components/NextProjectTransition';
import ProjectSequenceNav from '@/components/ProjectSequenceNav';
import WalkthroughOverlay from '@/components/WalkthroughOverlay';
import LazyVideo from '@/components/LazyVideo';
import CaseStudyCinematicHero from '@/components/project/CaseStudyCinematicHero';
import LearningStageShowcase from '@/components/project/LearningStageShowcase';
import CaseStudyStartAnchor from '@/components/CaseStudyStartAnchor';
import { nextSequenceEntry, sequenceEntryBySlug } from '@/data/projectSequence';
import type {
  CaseMedia,
  CaseMediaBlock,
  CaseLearningShowcase,
  CaseSection,
  CaseStudy,
} from '@/types/caseStudy';
import type { Project } from '@/types/project';

const ASPECT_CLASS: Record<CaseMedia['aspect'], string> = {
  native: '',
  ultra: 'aspect-[21/9]',
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
  tall: 'aspect-[4/5]',
  phone: 'aspect-[9/16]',
};

/** Breaks a child out of the centred container to true full-bleed
 *  without ever creating a horizontal scrollbar. */
const FULL_BLEED = 'relative ml-[calc(50%-50vw)] w-screen';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */
function Media({
  media,
  reducedMotion,
  isZh,
  rounded,
  hideCaption,
  technicalCaption = false,
}: {
  media: CaseMedia;
  reducedMotion: boolean;
  isZh: boolean;
  rounded?: boolean;
  hideCaption?: boolean;
  technicalCaption?: boolean;
}) {
  const alt = (isZh ? media.altZh : media.alt) ?? '';
  const title = isZh ? media.titleZh : media.title;
  const lensStyle = useScrollLensStyle();
  const caption = isZh ? media.captionZh : media.caption;
  const captionBefore = media.captionPosition === 'before';
  const mediaClass = media.aspect === 'native'
    ? 'block h-auto w-full'
    : `h-full w-full ${media.fit === 'contain' ? 'object-contain' : 'object-cover'}`;
  return (
    <figure>
    {!hideCaption && captionBefore && (title || caption) && (
      <figcaption className="mb-5">
        {title && (
          <p className="case-media-title">
            {title}
          </p>
        )}
        {caption && (
          <p className={`${technicalCaption ? 'case-media-caption' : 'text-xs leading-relaxed text-muted'} ${title ? 'mt-2' : ''} max-w-md`}>
            {caption}
          </p>
        )}
      </figcaption>
    )}
    <div
      style={lensStyle}
      className={`${ASPECT_CLASS[media.aspect]} w-full overflow-hidden bg-surface ${rounded ? 'rounded-sm' : ''}`}
    >
      {media.src && media.kind === 'video' ? (
        reducedMotion && media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
          <img src={withBasePath(media.poster)} alt={alt} style={{ objectPosition: media.objectPosition }} className={mediaClass} />
        ) : (
          <LazyVideo
            src={media.src}
            poster={media.poster}
            alt={alt}
            style={{ objectPosition: media.objectPosition }}
            className={mediaClass}
          />
        )
      ) : media.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
        <img
          src={withBasePath(media.src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: media.objectPosition }}
          className={mediaClass}
        />
      ) : null /* neutral surface block until media lands */}
    </div>
    {!hideCaption && !captionBefore && (title || caption) && (
      <figcaption className="mt-3">
        {title && (
          <p className="case-media-title">
            {title}
          </p>
        )}
        {caption && (
          <p className={`${technicalCaption ? 'case-media-caption' : 'text-xs leading-relaxed text-muted'} ${title ? 'mt-2' : ''}`}>
            {caption}
          </p>
        )}
      </figcaption>
    )}
    </figure>
  );
}

function LegacyLearningStageShowcase({
  showcase,
  reducedMotion,
  isZh,
}: {
  showcase: CaseLearningShowcase;
  reducedMotion: boolean;
  isZh: boolean;
}) {
  const intervalMs = showcase.intervalMs ?? 7500;
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleToken, setCycleToken] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [inViewport, setInViewport] = useState(false);
  const elapsedRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const activeStage = showcase.stages[activeIndex];
  const paused = reducedMotion || userPaused || !pageVisible || !inViewport;

  useEffect(() => {
    const syncVisibility = () => setPageVisible(document.visibilityState === 'visible');
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (paused) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Muted autoplay can still be declined by browser policy; the poster remains.
      });
    }
  }, [activeIndex, paused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      elapsedRef.current = 0;
      setProgress(0);
      return;
    }
    if (paused) return;

    let frame = 0;
    const baseElapsed = elapsedRef.current;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = baseElapsed + now - startedAt;
      elapsedRef.current = elapsed;
      if (elapsed >= intervalMs) {
        elapsedRef.current = 0;
        setProgress(0);
        setActiveIndex((current) => (current + 1) % showcase.stages.length);
        return;
      }
      setProgress(elapsed / intervalMs);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, cycleToken, intervalMs, paused, reducedMotion, showcase.stages.length]);

  const selectStage = (index: number) => {
    elapsedRef.current = 0;
    setProgress(0);
    setActiveIndex(index);
    setCycleToken((current) => current + 1);
  };

  const title = isZh ? activeStage.titleZh : activeStage.title;
  const copy = isZh ? activeStage.copyZh : activeStage.copy;
  const alt = (isZh ? activeStage.media.altZh : activeStage.media.alt) ?? title;

  return (
    <div className="mt-14 sm:mt-20">
      <div
        ref={showcaseRef}
        className="relative left-1/2 aspect-[4/5] w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden bg-ink sm:aspect-[16/10] sm:w-[94vw] lg:aspect-[16/9]"
      >
        {reducedMotion && activeStage.media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- reduced-motion poster for a static export
          <img
            key={activeStage.id}
            src={withBasePath(activeStage.media.poster)}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : activeStage.media.src ? (
          <video
            key={activeStage.id}
            ref={videoRef}
            src={withBasePath(activeStage.media.src)}
            poster={activeStage.media.poster ? withBasePath(activeStage.media.poster) : undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[#ded8cf] px-6 text-center text-[#716b64]">
            <div>
              <p className="case-category-label">[ Media Placeholder ]</p>
              <p className="case-media-title mt-3">{alt}</p>
            </div>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.18)_48%,transparent_72%)] sm:bg-[linear-gradient(to_left,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_30%,transparent_58%)]"
        />

        <button
          type="button"
          onClick={() => setUserPaused((current) => !current)}
          disabled={reducedMotion}
          aria-label={reducedMotion
            ? (isZh ? '已根据减少动态效果偏好关闭自动播放' : 'Autoplay disabled by reduced-motion preference')
            : userPaused
              ? (isZh ? '播放学习阶段' : 'Play learning stages')
              : (isZh ? '暂停学习阶段' : 'Pause learning stages')}
          className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-50 sm:right-5 sm:top-5"
        >
          {userPaused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>

        <motion.div
          key={`${activeStage.id}-${isZh ? 'zh' : 'en'}`}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.base, ease }}
          aria-live="polite"
          className="absolute bottom-24 left-5 right-5 z-10 text-white sm:bottom-auto sm:left-auto sm:right-[5vw] sm:top-1/2 sm:w-[min(25rem,28vw)] sm:-translate-y-1/2"
        >
          <p className="font-display text-[clamp(2.25rem,4.5vw,4.75rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em]">
            {title}
          </p>
          <p className="mt-4 max-w-[21rem] text-sm leading-relaxed text-white/85 sm:text-base">
            {copy}
          </p>
        </motion.div>

        <nav
          aria-label={isZh ? '学习阶段' : 'Learning stages'}
          className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-white/25 bg-black/20 backdrop-blur-[2px]"
        >
          {showcase.stages.map((stage, index) => {
            const active = index === activeIndex;
            const stageTitle = isZh ? stage.titleZh : stage.title;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => selectStage(index)}
                aria-pressed={active}
                className="min-w-0 border-r border-white/20 px-2 py-3 text-left text-white outline-none last:border-r-0 focus-visible:bg-white/15 sm:px-4 sm:py-4"
              >
                <span className={`block truncate font-mono text-[0.58rem] uppercase tracking-[0.1em] sm:text-[0.68rem] ${active ? 'text-white' : 'text-white/60'}`}>
                  {stageTitle}
                </span>
                <span className="mt-2 block h-px overflow-hidden bg-white/25" aria-hidden="true">
                  <span
                    className="block h-full origin-left bg-white"
                    style={{ width: active ? `${Math.max(0, Math.min(1, progress)) * 100}%` : '0%' }}
                  />
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {showcase.technicalAnnotation && (
        <aside className="mt-14 sm:mt-20" aria-label={isZh ? '技术注释' : 'Technical annotation'}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-center sm:gap-x-8">
            <div className="sm:col-span-6">
              <Media
                media={showcase.technicalAnnotation.media}
                reducedMotion={reducedMotion}
                isZh={isZh}
                hideCaption
              />
            </div>
            <div className="sm:col-span-5 sm:col-start-8">
              <p className="case-media-title">
                {isZh ? showcase.technicalAnnotation.titleZh : showcase.technicalAnnotation.title}
              </p>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">
                {isZh ? showcase.technicalAnnotation.copyZh : showcase.technicalAnnotation.copy}
              </p>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function MediaBlock({
  block,
  reducedMotion,
  isZh,
  campaignEditorial = false,
}: {
  block: CaseMediaBlock;
  reducedMotion: boolean;
  isZh: boolean;
  campaignEditorial?: boolean;
}) {
  const reveal = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.985 },
    whileInView: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-10%' } as const,
    transition: { duration: durations.slow, ease },
  };
  const spacingClass = block.spacing === 'tight'
    ? 'mt-10 sm:mt-14'
    : block.spacing === 'loose'
      ? 'mt-20 sm:mt-32'
      : 'mt-16 sm:mt-24';

  if (block.layout === 'full') {
    return (
      <motion.div
        {...reveal}
        className={`${campaignEditorial
          ? 'relative ml-[calc(50%-50vw+1rem)] w-[calc(100vw-2rem)] sm:ml-[calc(50%-47vw)] sm:w-[94vw]'
          : FULL_BLEED} ${spacingClass}`}
      >
        <Media media={block.items[0]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption={campaignEditorial} />
      </motion.div>
    );
  }

  if (block.layout === 'detail-sequence') {
    const primary = block.items[0];
    const detail = block.items[1];
    const primaryTitle = isZh ? primary.titleZh : primary.title;
    const primaryCaption = isZh ? primary.captionZh : primary.caption;
    const detailTitle = detail && (isZh ? detail.titleZh : detail.title);
    const detailCaption = detail && (isZh ? detail.captionZh : detail.caption);

    return (
      <motion.div {...reveal} className={spacingClass}>
        <div className="case-media-split">
          <div className="sm:col-span-8">
            <Media media={primary} reducedMotion={reducedMotion} isZh={isZh} hideCaption />
          </div>
          <div className="sm:col-span-4">
            {primaryTitle && (
              <p className="case-media-title">
                {primaryTitle}
              </p>
            )}
            {primaryCaption && (
              <p className={`${primaryTitle ? 'mt-2' : ''} max-w-[24rem] text-sm leading-relaxed text-muted`}>
                {primaryCaption}
              </p>
            )}
          </div>
        </div>

        {detail && (
          <div className="case-media-split mt-16 sm:mt-24">
            <div className="sm:col-span-4">
              {detailTitle && (
                <p className="case-media-title">
                  {detailTitle}
                </p>
              )}
              {detailCaption && (
                <p className={`${detailTitle ? 'mt-2' : ''} max-w-[24rem] text-sm leading-relaxed text-muted`}>
                  {detailCaption}
                </p>
              )}
            </div>
            <div className="sm:col-span-8 sm:col-start-5">
              <Media media={detail} reducedMotion={reducedMotion} isZh={isZh} hideCaption />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  if (block.layout === 'technical-split') {
    const item = block.items[0];
    const itemTitle = isZh ? item.titleZh : item.title;
    const itemCaption = isZh ? item.captionZh : item.caption;

    return (
      <motion.div
        {...reveal}
        className={`${spacingClass} case-media-split case-media-split-top`}
      >
        <div className="sm:col-span-4">
          {itemTitle && (
            <p className="case-media-title">
              {itemTitle}
            </p>
          )}
          {itemCaption && (
            <p className={`${itemTitle ? 'mt-2' : ''} max-w-[24rem] text-sm leading-relaxed text-muted`}>
              {itemCaption}
            </p>
          )}
        </div>
        <div className="sm:col-span-8 sm:col-start-5">
          <Media media={item} reducedMotion={reducedMotion} isZh={isZh} hideCaption />
        </div>
      </motion.div>
    );
  }

  if (block.layout === 'pair') {
    if (campaignEditorial) {
      return (
        <motion.div
          {...reveal}
          className={`${spacingClass} case-media-pair`}
        >
          <div className="case-media-unit">
            <Media media={block.items[0]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption />
          </div>
          {block.items[1] && (
            <div className="case-media-unit">
              <Media media={block.items[1]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption />
            </div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div
        {...reveal}
        className={`${spacingClass} case-media-pair`}
      >
        <div className="case-media-unit">
          <Media media={block.items[0]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption={campaignEditorial} />
        </div>
        {block.items[1] && (
          <div className="case-media-unit">
            <Media media={block.items[1]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption={campaignEditorial} />
          </div>
        )}
      </motion.div>
    );
  }

  if (block.layout === 'editorial') {
    return (
      <motion.div {...reveal} className={`${spacingClass} case-media-pair`}>
        {block.items.map((item, index) => (
          <div key={`${item.src ?? 'empty'}-${index}`} className="case-media-unit">
            <Media media={item} reducedMotion={reducedMotion} isZh={isZh} technicalCaption={campaignEditorial} />
          </div>
        ))}
      </motion.div>
    );
  }

  if (block.layout === 'grid') {
    return (
      <motion.div {...reveal} className={`${spacingClass} grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8`}>
        {block.items.map((item, index) => (
          <Media key={`${item.src ?? 'empty'}-${index}`} media={item} reducedMotion={reducedMotion} isZh={isZh} technicalCaption={campaignEditorial} />
        ))}
      </motion.div>
    );
  }

  // inset
  if (campaignEditorial) {
    const campaignInsetClass = block.scale === 'small'
      ? block.align === 'right'
        ? 'sm:col-span-5 sm:col-start-8'
        : block.align === 'center'
          ? 'sm:col-span-6 sm:col-start-4'
          : 'sm:col-span-5'
      : block.scale === 'medium'
        ? block.align === 'right'
          ? 'sm:col-span-8 sm:col-start-5'
          : block.align === 'center'
            ? 'sm:col-span-8 sm:col-start-3'
            : 'sm:col-span-8'
        : 'sm:col-span-12';
    return (
      <motion.div
        {...reveal}
        className={`${spacingClass} grid grid-cols-1 sm:grid-cols-12 sm:gap-8`}
      >
        <div className={campaignInsetClass}>
          <Media media={block.items[0]} reducedMotion={reducedMotion} isZh={isZh} technicalCaption />
        </div>
      </motion.div>
    );
  }

  const insetClass = block.scale === 'small'
    ? block.align === 'right'
      ? 'sm:ml-auto sm:w-7/12 lg:w-5/12'
      : block.align === 'center'
        ? 'sm:mx-auto sm:w-7/12 lg:w-5/12'
        : 'sm:w-7/12 lg:w-5/12'
    : block.scale === 'medium'
      ? block.align === 'right'
        ? 'sm:ml-auto sm:w-10/12 lg:w-8/12'
        : block.align === 'center'
          ? 'sm:mx-auto sm:w-10/12 lg:w-8/12'
          : 'sm:w-10/12 lg:w-8/12'
      : 'lg:px-[3%]';
  return (
    <motion.div {...reveal} className={`${spacingClass} ${insetClass}`}>
      <Media media={block.items[0]} reducedMotion={reducedMotion} isZh={isZh} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
function Section({
  section,
  number,
  reducedMotion,
  isZh,
  campaignEditorial = false,
}: {
  section: CaseSection;
  number: number;
  reducedMotion: boolean;
  isZh: boolean;
  campaignEditorial?: boolean;
}) {
  const body = isZh ? section.bodyZh : section.body;
  const lead = isZh ? section.leadZh : section.lead;
  const label = isZh ? section.labelZh : section.label;
  const densityClass = section.density === 'dense'
    ? 'mt-24 sm:mt-32'
    : section.density === 'sparse'
      ? 'mt-40 sm:mt-56'
      : section.density === 'strong'
        ? 'mt-36 sm:mt-48'
        : 'mt-32 sm:mt-44';
  const proseClass = section.presentation === 'typography' || section.presentation === 'outcome'
    ? 'sm:col-span-9 lg:col-span-8'
    : section.presentation === 'sequence'
      ? 'sm:col-span-9 lg:col-span-7'
      : 'sm:col-span-9 lg:col-span-6';
  const leadClass = section.presentation === 'outcome'
    ? 'whitespace-pre-line font-display text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.01em] text-ink'
    : section.presentation === 'sequence'
      ? 'font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.01em] text-ink'
      : 'font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-[0.01em] text-ink';

  const reveal = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12%' } as const,
    transition: { duration: durations.slow, ease },
  };

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-label`}
      className={densityClass}
    >
      {campaignEditorial && section.presentation === 'media-spread' ? (
        <motion.div {...reveal}>
          <div className="grid grid-cols-1 sm:grid-cols-12 sm:gap-x-8">
            <p id={`${section.id}-label`} className="case-category-label sm:col-span-12">
              <span className="text-ink">/{pad(number)}</span>
              <span className="ml-3">{label}</span>
            </p>
            <p className="case-section-title mt-6 sm:col-span-8">
              {lead}
            </p>
            <div className="mt-6 space-y-4 sm:col-span-4 sm:col-start-9 sm:mt-7">
              {body.map((paragraph, i) => (
                <p key={i} className="case-lead max-w-[25rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:mt-24 sm:grid-cols-12 sm:gap-x-8">
            <div className="sm:col-span-12">
              <Media
                media={section.media[0].items[0]}
                reducedMotion={reducedMotion}
                isZh={isZh}
                technicalCaption
              />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-10 sm:mt-32 sm:grid-cols-12 sm:items-start sm:gap-x-8">
            {section.media[1].items.map((item, index) => (
              <div key={`${item.src ?? 'process'}-${index}`} className="sm:col-span-6">
                <Media media={item} reducedMotion={reducedMotion} isZh={isZh} technicalCaption />
              </div>
            ))}
          </div>

          <div className="mt-28 grid grid-cols-1 gap-7 sm:mt-36 sm:grid-cols-12 sm:items-center sm:gap-x-8">
            <div className="sm:col-span-4">
              <p className="case-media-title">
                {isZh ? section.media[2].items[0].titleZh : section.media[2].items[0].title}
              </p>
              <p className="mt-2 max-w-[24rem] text-xs leading-relaxed text-muted sm:text-sm">
                {isZh ? section.media[2].items[0].captionZh : section.media[2].items[0].caption}
              </p>
            </div>
            <div className="sm:col-span-8 sm:col-start-5">
              <Media
                media={section.media[2].items[0]}
                reducedMotion={reducedMotion}
                isZh={isZh}
                hideCaption
              />
            </div>
          </div>
        </motion.div>
      ) : campaignEditorial ? (
        <motion.div {...reveal} className="grid grid-cols-1 sm:grid-cols-12 sm:gap-x-8">
          <p id={`${section.id}-label`} className="case-category-label sm:col-span-12">
            <span className="text-ink">/{pad(number)}</span>
            <span className="ml-3">{label}</span>
          </p>

          <p className={section.presentation === 'outcome'
            ? 'mt-6 whitespace-pre-line font-display text-[clamp(3.25rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.01em] text-ink sm:col-span-8'
            : 'case-section-title mt-6 sm:col-span-6'}
          >
            {lead}
          </p>

          <div className={`mt-6 space-y-4 sm:mt-7 ${section.presentation === 'outcome'
            ? 'sm:col-span-4 sm:col-start-9'
            : 'sm:col-span-4 sm:col-start-8'}`}
          >
            {body.map((paragraph, i) => (
              <p key={i} className="case-lead">
                {paragraph}
              </p>
            ))}
          </div>

          {section.points && section.points.length > 0 && (
            <dl className={section.presentation === 'typography'
              ? 'mt-16 sm:col-span-12 sm:mt-24'
              : 'mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:col-span-12 sm:grid-cols-3'}
            >
              {section.points.map((point) => (
                <div key={point.label} className={section.presentation === 'typography'
                  ? 'grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:gap-x-8 sm:py-7'
                  : ''}
                >
                  <dt className={`font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted ${section.presentation === 'typography' ? 'sm:col-span-3' : ''}`}>
                    {isZh ? point.labelZh : point.label}
                  </dt>
                  <dd className={section.presentation === 'typography'
                    ? 'max-w-[42rem] text-base leading-relaxed text-ink sm:col-span-7 sm:col-start-5'
                    : 'mt-3 max-w-[18rem] text-sm leading-relaxed text-ink'}
                  >
                    {isZh ? point.textZh : point.text}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </motion.div>
      ) : section.learningShowcase ? (
        <motion.div {...reveal} className="max-w-3xl sm:ml-[25%]">
          <p
            id={`${section.id}-label`}
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
          >
            <span className="text-ink">/{pad(number)}</span> {label}
          </p>
          <p className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.01em] text-ink">
            {lead}
          </p>
          <div className="mt-6 max-w-xl space-y-4">
            {body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      ) : (
      <motion.div {...reveal} className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
        {/* Left margin: number + label */}
        <div className="sm:col-span-3">
          <p
            id={`${section.id}-label`}
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted"
          >
            <span className="text-ink">/{pad(number)}</span> {label}
          </p>
        </div>

        {/* Prose column — never full width */}
        <div className={proseClass}>
          <p className={leadClass}>
            {lead}
          </p>
          <div className="mt-6 space-y-4">
            {body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          {section.points && section.points.length > 0 && (
            <dl className={section.presentation === 'typography'
              ? 'mt-12 grid grid-cols-1 gap-x-10 gap-y-10 pt-8 sm:grid-cols-2'
              : 'mt-10 space-y-6 pt-6'}>
              {section.points.map((point) => (
                <div key={point.label} className={section.presentation === 'typography'
                  ? 'pb-8'
                  : 'grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-6'}>
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                    {isZh ? point.labelZh : point.label}
                  </dt>
                  <dd className={section.presentation === 'typography'
                    ? 'mt-3 text-base leading-relaxed text-ink'
                    : 'text-sm leading-relaxed text-ink sm:col-span-3'}>
                    {isZh ? point.textZh : point.text}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </motion.div>
      )}

      {section.learningShowcase && (
        <LearningStageShowcase
          showcase={section.learningShowcase}
          reducedMotion={reducedMotion}
          isZh={isZh}
        />
      )}

      {!section.learningShowcase && section.presentation !== 'media-spread' && section.media.map((block, i) => (
        <MediaBlock
          key={`${section.id}-media-${i}`}
          block={block}
          reducedMotion={reducedMotion}
          isZh={isZh}
          campaignEditorial={campaignEditorial}
        />
      ))}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function CaseStudyPage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const reducedMotion = usePrefersReducedMotion();
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const closeWalkthrough = useCallback(() => setWalkthroughOpen(false), []);

  useEffect(() => {
    if (!backgroundRef.current) return;
    backgroundRef.current.inert = walkthroughOpen;
  }, [walkthroughOpen]);

  /* Everything resolves from THIS project's slug via the canonical
   * sequence — identity, position and the next project alike. Nothing
   * falls back to project 01. */
  const entry = sequenceEntryBySlug(slug);
  const study: CaseStudy | undefined = entry ? getCaseStudy(entry.project) : undefined;
  const next = nextSequenceEntry(slug);

  if (!study || !entry) return null;

  const title = isZh ? entry.titleZh : entry.title;
  const campaignEditorial = study.artDirection === 'campaign-editorial';
  /** Content chapters are numbered /01…/0n locally. The Next Project
   *  block deliberately does NOT continue that count — it shows the next
   *  project's number in the global 01–07 sequence instead. */
  const sections = study.sections;

  const metaRows: { label: string; value?: string }[] = [
    { label: t('case.meta.role'), value: isZh ? study.roleZh : study.role },
    { label: t('case.meta.team'), value: isZh ? study.teamZh : study.team },
    { label: t('case.meta.platform'), value: isZh ? study.platformZh : study.platform },
    { label: t('case.meta.year'), value: study.year },
    { label: t('case.meta.outcome'), value: isZh ? study.outcomeZh : study.outcome },
  ];

  return (
    <div className="overflow-x-clip">
      <CaseStudyStartAnchor key={entry.id} />
      <div ref={backgroundRef}>
      {/* Global project navigation (01–07). Chapter numbers appear only
          locally inside each content section, and the Next Project scroll
          line lives at the foot of the page — three distinct systems,
          deliberately never merged. */}
      <ProjectSequenceNav
        currentIndex={entry.index}
        mode={campaignEditorial ? 'case-header' : 'floating'}
        descriptor={campaignEditorial ? (isZh ? study.disciplineZh : study.discipline) : undefined}
      />

      <article className={`mx-auto w-full max-w-site px-5 pb-32 sm:px-8 ${campaignEditorial ? 'pt-0' : 'pt-24 sm:pt-32'}`}>
        {/* Hero — editorial information choreography on a strict 12-col
            grid. Every element is grid-aligned, but each information type
            carries a different weight and occupies a different region, so
            the composition reads loose while staying ordered:
              top line   — back link (left) · discipline (right)
              left       — DOMINANT title, then a secondary Role/Team
                           cluster stepped in, then Year isolated low as
                           a separate anchor
              right      — DOMINANT landscape media, with the proposition
                           attached beneath it as an editorial caption and
                           the outcome anchored at its lower-right
            The right field is dropped relative to the title so the two
            columns never align at the top. Deliberately allowed to run
            past one viewport rather than compressing. No chapter number —
            numbering starts with the first content section. */}
        <header className={campaignEditorial ? "relative ml-[calc(50%-50vw)] min-h-[760px] w-screen overflow-hidden sm:min-h-[720px]" : "pb-16 sm:pb-24"}>
          {/* Top line */}
          {!campaignEditorial && <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.base, ease }}
            className="flex items-baseline justify-between gap-6 pb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted"
          >
            <Link
              href="/#projects"
              className="underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              ← {t('case.backToIndex')}
            </Link>
            <span className="truncate text-right">
              {isZh ? study.disciplineZh : study.discipline}
            </span>
          </motion.div>}

          {campaignEditorial ? (
            study.hero.src && <CaseStudyCinematicHero
              title={title}
              outcome={isZh ? '两项 XRDC 奖项' : '2× XRDC Award Winner'}
              outcomeSecondary="SHOWCASED AT AWE USA 2025"
              proposition={isZh ? study.propositionZh : study.proposition}
              role={isZh ? study.roleZh : study.role}
              year={study.year}
              team={isZh ? study.teamZh : study.team}
              roleLabel={t('case.meta.role')}
              yearLabel={t('case.meta.year')}
              teamLabel={t('case.meta.team')}
              mediaSrc={study.hero.src}
              poster={study.hero.poster}
              mediaAlt={(isZh ? study.hero.altZh : study.hero.alt) ?? ''}
              mediaClassName="object-[62%_center] md:object-center"
              scrimClassName="case-hero-scrim-signie"
            />
          ) : (
          <div className="grid grid-cols-12 gap-x-8">
            {/* LEFT FIELD — dominant title, compact cluster, year anchor */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.slow, ease, delay: 0.05 }}
              className="col-span-12 mt-16 lg:col-span-4 lg:mt-24"
            >
              <h1 className="font-display text-[clamp(3.25rem,8.5vw,7rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em] text-ink">
                {title}
              </h1>

              {/* Role + Team — one compact cluster, stepped in. */}
              <dl className="mt-14 space-y-3.5 lg:mt-20 lg:pl-[10%]">
                {[metaRows[0], metaRows[1], metaRows[2]].filter((row) => row.value).map((row) => (
                  <div key={row.label}>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-snug text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Year — separate anchor, lighter than the title. */}
              {metaRows[3].value && <dl className="mt-14 lg:mt-24">
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                  {metaRows[3].label}
                </dt>
                <dd className="mt-1 text-xl font-medium leading-none text-ink sm:text-2xl">
                  {metaRows[3].value}
                </dd>
              </dl>}
            </motion.div>

            {/* RIGHT FIELD — media (with the scroll lens), then caption
                and outcome. Nothing here moves or resizes on scroll. */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.slow, ease, delay: 0.12 }}
              className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-40"
            >
              <Media media={study.hero} reducedMotion={reducedMotion} isZh={isZh} />

              {/* Caption + outcome — attached beneath the media. */}
              <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-md">
                  <p className="text-base leading-snug text-ink sm:text-lg">
                    {isZh ? study.propositionZh : study.proposition}
                  </p>
                  {study.walkthrough && (
                    <button
                      type="button"
                      onClick={() => setWalkthroughOpen(true)}
                      aria-haspopup="dialog"
                      className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-ink underline underline-offset-4 transition-colors hover:text-accent-strong"
                    >
                      {t('shared.watchFullWalkthrough')} →
                    </button>
                  )}
                </div>
                {metaRows[4].value && <dl className={study.outcomeEmphasis
                  ? 'max-w-[20rem] shrink-0 border-l-2 border-accent pl-4 sm:border-l-0 sm:border-r-2 sm:pl-0 sm:pr-4 sm:text-right'
                  : 'max-w-[15rem] shrink-0 sm:text-right'}>
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                    {metaRows[4].label}
                  </dt>
                  <dd className={study.outcomeEmphasis
                    ? 'mt-2 font-display text-2xl font-extrabold uppercase leading-[0.9] text-ink sm:text-3xl'
                    : 'mt-0.5 text-sm leading-snug text-ink'}>{metaRows[4].value}</dd>
                </dl>}
              </div>
            </motion.div>
          </div>
          )}
        </header>

        {/* Content chapters — numbering starts here at /01 */}
        {sections.map((section, i) => (
          <Section
            key={section.id}
            section={section}
            number={i + 1}
            reducedMotion={reducedMotion}
            isZh={isZh}
            campaignEditorial={campaignEditorial}
          />
        ))}

        {/* Credits */}
        {study.showCredits !== false && <section
          aria-labelledby="credits-label"
          className="mt-32 pt-10 sm:mt-44 sm:pt-12"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8">
            <p
              id="credits-label"
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:col-span-3"
            >
              {t('case.credits')}
            </p>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:col-span-9 sm:grid-cols-2 lg:col-span-6">
              {study.credits.map((credit) => (
                <div key={credit.role}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    {isZh ? credit.roleZh : credit.role}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{credit.names}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>}
      </article>

      {/* Next project — a staged continuation into the following page,
          not a card. See components/NextProjectTransition. */}
      {next && <NextProjectTransition next={next} />}
      </div>

      <WalkthroughOverlay
        open={walkthroughOpen}
        walkthrough={study.walkthrough}
        onClose={closeWalkthrough}
      />
    </div>
  );
}
