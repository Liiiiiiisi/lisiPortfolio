'use client';

/**
 * NextProjectTransition — the ending of a project detail page.
 * Motion/layout reference: locomotive.ca/en/work/webisoft.
 *
 * The sequence is: current project → next-project teaser → scroll
 * progress builds → next project takes over the viewport → route commits.
 * The point is that the next project *becomes* the new page rather than
 * being a preview followed by a page change.
 *
 * How it works
 *   - The section is ~2.6 viewports tall with a `sticky top-0` stage, so
 *     once the credits have left, the teaser pins and the remaining
 *     scroll drives the takeover instead of moving the page.
 *   - That stage is laid out as the INCOMING HERO already is (top rule,
 *     oversized title in the left field, large media offset right). At
 *     progress 0 it is a recessed teaser — media smaller, everything
 *     lifted and soft; by progress 1 it has resolved into exactly the
 *     hero's position and scale, and the stage is opaque and full-bleed.
 *     So when the route finally commits, the real hero appears where the
 *     teaser already was — no cut, flash, or blank frame.
 *   - A hairline track beside SCROLL DOWN fills left-to-right in direct
 *     proportion to that same scroll progress, so it always reads as
 *     "continuing to scroll is advancing toward the next project".
 *   - Everything is scroll-linked and therefore fully reversible right up
 *     until the commit at ~98%.
 *
 * Accessibility: the title is a real link, so keyboard and assistive-tech
 * users can navigate without performing the scroll gesture. Reduced
 * motion keeps the progress + commit but drops the spatial transforms.
 */
import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCaseStudy } from '@/data/caseStudies';
import { withBasePath } from '@/lib/paths';
import { usePrefersReducedMotion } from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import { prepareCaseStudyLanding } from '@/components/CaseStudyStartAnchor';
import { preloadCaseHandoff, showCaseHandoff } from '@/lib/caseTransitionHandoff';
import type { SequenceEntry } from '@/data/projectSequence';

/** Progress at which the route is committed. */
const COMMIT_AT = 0.98;

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function NextProjectTransition({
  next,
}: {
  /** The next entry in the canonical seven-project sequence (07 wraps to 01). */
  next: SequenceEntry;
}) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const reducedMotion = usePrefersReducedMotion();
  const router = useRouter();
  const lensStyle = useScrollLensStyle();

  const sectionRef = useRef<HTMLElement>(null);
  /* 0 when the stage pins, 1 when the section has been fully scrolled. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Teaser → hero resolve. All values land on the hero's own geometry. */
  const mediaScale = useTransform(scrollYProgress, [0, 0.9], [0.82, 1]);
  const mediaY = useTransform(scrollYProgress, [0, 0.9], [90, 0]);
  const mediaBlurPx = useTransform(scrollYProgress, [0, 0.55], [7, 0]);
  const mediaFilter = useTransform(mediaBlurPx, (b) => `blur(${b.toFixed(2)}px)`);
  const titleY = useTransform(scrollYProgress, [0, 0.9], [48, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 1]);
  const metaOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);

  const navigatedRef = useRef(false);
  const preloadStartedRef = useRef(false);
  const commit = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    showCaseHandoff(next);
    prepareCaseStudyLanding();
    window.requestAnimationFrame(() => router.push(next.href, { scroll: false }));
  }, [router, next]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p >= 0.55 && !preloadStartedRef.current) {
      preloadStartedRef.current = true;
      preloadCaseHandoff(next);
    }
    if (p >= COMMIT_AT) commit();
  });

  const study = getCaseStudy(next.project);
  const title = isZh ? next.titleZh : next.title;
  const metaLine = [study?.year, isZh ? study?.disciplineZh : study?.discipline]
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      ref={sectionRef}
      aria-labelledby="next-project-title"
      className="relative h-[260svh]"
    >
      {/* Pinned stage — laid out as the incoming hero. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg">
        <div className="mx-auto flex h-full w-full max-w-site flex-col px-5 pt-14 sm:px-8 sm:pt-20">
          {/* Header rule with the scroll-progress track. */}
          <div className="flex items-center gap-6 pb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span className="shrink-0">
              {/* The NEXT PROJECT's number in the global 01–07 sequence —
                  not a case-study chapter number. On project 04 this reads
                  /05; on 07 it wraps to /01. */}
              <span className="text-ink">/{pad(next.project.order)}</span>{' '}
              {t('case.nextProject')}
            </span>
            <span className="ml-auto flex min-w-0 flex-1 items-center gap-3 sm:max-w-[58%]">
              <span className="hidden shrink-0 sm:inline">{t('case.scrollDown')}</span>
              <ArrowDown size={13} aria-hidden="true" className="shrink-0" />
              <span
                className="relative block h-px flex-1 bg-line"
                role="progressbar"
                aria-label={t('case.scrollDown')}
              >
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-0 origin-left bg-accent"
                />
              </span>
            </span>
          </div>

          <div className="grid flex-1 grid-cols-12 gap-x-8 overflow-hidden">
            {/* Title + metadata — resolve into the hero's left field. */}
            <motion.div
              style={
                reducedMotion ? undefined : { y: titleY, opacity: titleOpacity }
              }
              className="col-span-12 mt-10 lg:col-span-4 lg:mt-16"
            >
              <h2
                id="next-project-title"
                className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em] text-ink"
              >
                <Link
                  href={next.href}
                  className="outline-none transition-colors hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
                >
                  {title}
                </Link>
              </h2>
              {metaLine && (
                <motion.p
                  style={reducedMotion ? undefined : { opacity: metaOpacity }}
                  className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted lg:mt-10"
                >
                  {metaLine}
                </motion.p>
              )}
            </motion.div>

            {/* Preview media — grows into the hero's right field. */}
            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { y: mediaY, scale: mediaScale, filter: mediaFilter }
              }
              className="col-span-12 mt-8 min-h-0 will-change-transform lg:col-span-8 lg:col-start-5 lg:mt-16"
            >
              <div
                style={lensStyle}
                className="aspect-[16/9] max-h-[46svh] overflow-hidden bg-surface"
              >
                {next.poster && (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
                  <img
                    src={withBasePath(next.poster)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <motion.p
                style={reducedMotion ? undefined : { opacity: captionOpacity }}
                className="mt-4 max-w-md text-sm leading-snug text-ink sm:text-base"
              >
                {isZh ? next.descriptionZh : next.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
