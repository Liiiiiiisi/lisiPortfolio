'use client';

/**
 * ProjectsShowcase — scroll-driven, pinned-stage Projects gallery with
 * continuous, overlapping transitions. Rendered as its own homepage
 * section directly after Hero (never inside it). Target of the floating
 * nav's "Projects" item (#projects).
 *
 * Interaction reference: 5a3b882879949.mp4 — a fixed stage where scrolling
 * hands one project off to the next, outgoing and incoming overlapping in
 * depth; a peripheral current/total axis tracks position. Adapted to this
 * portfolio's own language (Barlow Condensed display type, ink/surface/
 * line/accent tokens, spring vocabulary from lib/motion.ts) — no reference
 * branding, colours, or exact layout reused.
 *
 * ── Scroll model (scroll is the single source of truth) ──────────────
 * The <section> is `TOTAL * 100svh` tall; an inner `sticky top-0 h-[100svh]`
 * stage stays pinned. useScroll → scrollYProgress (0…1). We derive a
 * continuous position `posRaw = progress * (TOTAL-1)` where project i is
 * centred at pos = i, so each project owns a full viewport of scroll.
 * posRaw is smoothed through a gentle spring (springs.scrollSettle) into
 * `pos` — a soft settle for trackpad momentum that eases the *visual*
 * without ever blocking scroll. Everything (active index, poster, title,
 * info, side axis) reads `pos`, so they can never desync.
 *
 * Active index uses hysteresis: it only changes when |pos - active| passes
 * 0.5 + BUFFER, a dead-band that removes boundary flicker and makes it hard
 * to accidentally skip an adjacent project (notably 3 ⇄ 4).
 *
 * ── Overlapping transitions (never transition through emptiness) ─────
 * Every project's poster/title/info layer stays mounted at once (only 4).
 * Each reads its signed distance `d = index - pos` and maps it to
 * transforms, so mid-transition the outgoing (d<0: recedes up + scales to
 * 0.88 + fades + subtle blur) and the incoming (d>0: rises from below +
 * scale 0.98→1 + restrained rotateX) are BOTH visible. Titles share one
 * `overflow-hidden` mask and translate by d so they overlap inside it.
 * There is no AnimatePresence swap and therefore no blank frame. Under
 * reduced motion every layer collapses to an opacity crossfade (still
 * overlapping, still ≥1 poster visible).
 *
 * ── Two-level navigation ─────────────────────────────────────────────
 * Side-axis buttons only *select* which project the stage shows: they move
 * the real scroll position to that segment centre (goTo), keeping scroll
 * and visuals in lockstep — they never open a case study. Only the large
 * active poster (and its explicit CTA) links to the case-study route. The
 * two are structurally separate, so a side click can't trigger the poster.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { projectHref } from '@/data/projectCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import {
  durations,
  ease,
  fadeUp,
  springs,
  useMotionVariants,
  usePrefersReducedMotion,
  viewportOnce,
} from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import type { Project } from '@/types/project';

const TOTAL = projects.length;
/** Hysteresis dead-band added to the 0.5 boundary before the active index flips. */
const SWITCH_BUFFER = 0.12;
/** Scrolling idle for this long (ms) triggers the directional settle. */
const SETTLE_IDLE_MS = 110;
/** Already-close-enough band (in segment units) where no settle is needed. */
const SETTLE_EPSILON = 0.02;

const projectHierarchy: Record<string, {
  type: string;
  typeZh: string;
  meta: string;
  metaZh: string;
}> = {
  signie: {
    type: 'MR SIGN LANGUAGE\nTUTOR',
    typeZh: 'MR 手语\n导师',
    meta: 'Mixed Reality · Gesture Learning · Unity',
    metaZh: '混合现实 · 手势学习 · Unity',
  },
  'guardian-guide': {
    type: 'VR CAREGIVER\nTRAINING',
    typeZh: 'VR 护理人员\n培训',
    meta: 'VR Training · Interaction Design · Unity',
    metaZh: 'VR 培训 · 交互设计 · Unity',
  },
  'canopy-of-echo': {
    type: 'KINETIC HERITAGE\nINSTALLATION',
    typeZh: '动态文化遗产\n装置',
    meta: 'Spatial Interaction · Unreal · Physical Systems',
    metaZh: '空间交互 · Unreal · 物理系统',
  },
  'the-micro-invasion': {
    type: 'MICROPLASTIC\nAR EXPERIENCE',
    typeZh: '微塑料\nAR 体验',
    meta: 'AR Interaction · Body Tracking · Lens Studio',
    metaZh: 'AR 交互 · 身体追踪 · Lens Studio',
  },
};

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const CURSOR_LABEL_WIDTH = 80;
const CURSOR_LABEL_HEIGHT = 80;
const CURSOR_LABEL_INSET = 8;

function CursorCaseStudyCTA({ label }: { label: React.ReactNode }) {
  const boundsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.35 });
  const [isFinePointer, setIsFinePointer] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setIsFinePointer(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const moveToPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const maxX = Math.max(CURSOR_LABEL_INSET, rect.width - CURSOR_LABEL_WIDTH - CURSOR_LABEL_INSET);
    const maxY = Math.max(CURSOR_LABEL_INSET, rect.height - CURSOR_LABEL_HEIGHT - CURSOR_LABEL_INSET);
    const nextX = Math.min(maxX, Math.max(CURSOR_LABEL_INSET, event.clientX - rect.left + 12));
    const nextY = Math.min(maxY, Math.max(CURSOR_LABEL_INSET, event.clientY - rect.top + 12));

    if (!initializedRef.current) {
      smoothX.jump(nextX);
      smoothY.jump(nextY);
      initializedRef.current = true;
    }
    x.set(nextX);
    y.set(nextY);
  };

  return (
    <div
      ref={boundsRef}
      onPointerEnter={(event) => {
        moveToPointer(event);
        if (isFinePointer) setIsVisible(true);
      }}
      onPointerMove={moveToPointer}
      onPointerLeave={() => {
        setIsVisible(false);
        initializedRef.current = false;
      }}
      className="absolute inset-0 z-10"
    >
      {isFinePointer === true && (
        <motion.span
          aria-hidden="true"
          style={{ x: smoothX, y: smoothY, width: CURSOR_LABEL_WIDTH, height: CURSOR_LABEL_HEIGHT }}
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.96 }}
          transition={{ duration: 0.18, ease }}
          className="pointer-events-none absolute left-0 top-0 grid place-items-center rounded-full border border-ink/25 bg-bg/75 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_2px_8px_rgba(27,25,23,0.06)] backdrop-blur-md"
        >
          {label}
        </motion.span>
      )}
      {isFinePointer === false && (
        <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 bg-bg/90 px-2 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ink">
          {label}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Poster + title layer — one per project, all mounted simultaneously. */
/* ------------------------------------------------------------------ */
function ProjectLayer({
  project,
  index,
  pos,
  isActive,
  reducedMotion,
  title,
  caseStudyLabel,
  ctaLabel,
  entryScale,
}: {
  project: Project;
  index: number;
  pos: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
  title: string;
  caseStudyLabel: string;
  ctaLabel: string;
  /** Optional extra scroll-linked scale (first project only): grows the
   *  poster 0.85→1 as the section first arrives — the landing point of the
   *  hero cards' shrink-and-fall handoff. */
  entryScale?: MotionValue<number>;
}) {
  /** Signed distance from the active centre: 0 active, >0 incoming (below),
   *  <0 outgoing (receded above). */
  const d = useTransform(pos, (v) => index - v);

  // Poster opacity — overlaps neighbours so the frame is never empty.
  const posterOpacity = useTransform(
    d,
    [-1, -0.5, 0, 0.5, 1],
    [0, 0.4, 1, 0.4, 0],
  );

  // Depth transforms (skipped visually under reduced motion).
  const dScale = useTransform(d, [-1, 0, 1], [0.88, 1, 0.98]);
  // Compose the distance-based scale with the optional entry grow-in.
  const scale = useTransform<number, number>(
    entryScale ? [dScale, entryScale] : [dScale],
    (values: number[]) => values.reduce((a, b) => a * b, 1),
  );
  const translateY = useTransform(d, [-1, 0, 1], [-64, 0, 72]);
  const rotateX = useTransform(d, [-1, 0, 1], [0, 0, 6]);
  const blurPx = useTransform(d, [-1, -0.5, 0, 0.5, 1], [0, 2.5, 0, 2.5, 0]);
  const posterFilter = useMotionTemplate`blur(${blurPx}px)`;
  // Larger (nearer-to-1) scale reads in front; bias the incoming layer up.
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 40 + (v > 0 ? 3 : 0)));

  // Title travels through a shared mask: out the top, in from the bottom.
  const titleY = useTransform(d, [-1, 0, 1], ['-115%', '0%', '115%']);
  const titleOpacity = useTransform(d, [-1, -0.6, 0, 0.6, 1], [0, 1, 1, 1, 0]);

  const lensStyle = useScrollLensStyle();

  const posterStyle = reducedMotion
    ? { opacity: posterOpacity, zIndex }
    : { opacity: posterOpacity, scale, y: translateY, rotateX, filter: posterFilter, zIndex };

  const PosterInner = (
    <div className="group relative overflow-hidden rounded-2xl bg-surface shadow-[0_10px_18px_-8px_rgba(28,26,23,0.22),0_24px_48px_-16px_rgba(28,26,23,0.28)]">
      {/* Lens sits on a wrapper so the image keeps its own hover transform
          and the card's shadow is never warped. */}
      <div style={lensStyle}>
        {isActive && !reducedMotion ? (
          <video
            src={withBasePath(project.preview)}
            poster={withBasePath(project.previewPoster)}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="aspect-[8/5] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <img
            src={withBasePath(project.cover)}
            alt=""
            className={`aspect-[8/5] w-full object-cover ${reducedMotion ? '' : 'transition-transform duration-300 ease-out group-hover:scale-[1.015]'}`}
          />
        )}
      </div>
      {isActive && <CursorCaseStudyCTA label="View ↗" />}
    </div>
  );

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{ ...posterStyle, transformPerspective: 1200 }}
      className="absolute inset-0 flex items-center justify-center px-5 will-change-transform sm:px-8"
    >
      <div className="relative w-full max-w-[860px]">
        {/* Only the active poster is an interactive case-study link. */}
        {isActive ? (
          <Link
            href={projectHref(project)}
            aria-label={caseStudyLabel}
            className="block rounded-2xl outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
          >
            {PosterInner}
          </Link>
        ) : (
          <div tabIndex={-1} className="pointer-events-none block">
            {PosterInner}
          </div>
        )}

        {/* Title mask — shared clipped region; each title translates by d. */}
        <div className={`absolute -bottom-2 left-0 right-0 overflow-hidden pb-[0.12em] sm:-bottom-9 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <motion.h3
            style={reducedMotion ? { opacity: titleOpacity } : { opacity: titleOpacity, y: titleY }}
            className="featured-project-title whitespace-pre-line font-display text-[clamp(2rem,8.5vw,2.25rem)] font-bold uppercase leading-[0.84] tracking-[-0.01em] text-ink sm:text-[clamp(2.25rem,8.5vw,5.5rem)] sm:leading-[0.9] sm:tracking-[0.01em]"
          >
            {isActive ? <Link href={projectHref(project)} aria-label={caseStudyLabel} className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong">{title}</Link> : title}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Info layer — calmer, small 6–8px movement, always overlapping.      */
/* ------------------------------------------------------------------ */
function InfoLayer({
  index,
  pos,
  isActive,
  reducedMotion,
  identity,
  meta,
  href,
  caseStudyLabel,
  ctaLabel,
}: {
  index: number;
  pos: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
  identity: string;
  meta: string;
  href: string;
  caseStudyLabel: string;
  ctaLabel: string;
}) {
  const d = useTransform(pos, (v) => index - v);
  const opacity = useTransform(d, [-0.7, -0.4, 0, 0.4, 0.7], [0, 0.5, 1, 0.5, 0]);
  const y = useTransform(d, [-1, 0, 1], [7, 0, -7]);

  return (
    <motion.div
      aria-hidden={!isActive}
      style={reducedMotion ? { opacity } : { opacity, y }}
      className="absolute inset-0 min-w-0 pt-4 sm:pt-0"
    >
      {isActive ? <p className="font-display text-lg font-bold uppercase leading-none tracking-[0.01em] text-ink sm:text-xl"><Link href={href} aria-label={caseStudyLabel} className="outline-none transition-colors hover:text-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong">{identity}</Link></p> : <p className="font-display text-lg font-bold uppercase leading-none tracking-[0.01em] text-ink sm:text-xl">{identity}</p>}
      <p className="mt-1 max-w-[22rem] text-xs leading-relaxed text-muted sm:max-w-md">{meta}</p>
      {isActive ? (
        <Link
          href={href}
          aria-label={caseStudyLabel}
          className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 outline-none transition-colors hover:text-accent-strong hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
        >
          {ctaLabel}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      ) : (
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-muted" aria-hidden="true">
          {ctaLabel}
          <ArrowUpRight size={15} />
        </span>
      )}
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const { t, language } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const isZh = language === 'zh';

  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Section entry progress: 0 when the section's top reaches the viewport
   * bottom → 1 when it reaches the top. Drives the first poster's grow-in,
   * timed against the hero cards' shrink-and-fall so the handoff reads as
   * the cards becoming the poster. */
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const firstEntryScale = useTransform(entryProgress, [0.1, 0.95], [0.85, 1]);

  // Continuous position (project i centred at i), smoothed for soft settle.
  const posRaw = useTransform(scrollYProgress, [0, 1], [0, TOTAL - 1]);
  const pos = useSpring(posRaw, springs.scrollSettle);

  // Active index with hysteresis — flips only past the 0.5 + buffer dead-band.
  useMotionValueEvent(pos, 'change', (value) => {
    setActiveIndex((current) => {
      if (Math.abs(value - current) <= 0.5 + SWITCH_BUFFER) return current;
      const next = Math.min(TOTAL - 1, Math.max(0, Math.round(value)));
      return next === current ? current : next;
    });
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const localize = useCallback(
    (key: 'work.viewCaseStudy' | 'work.showInShowcase', name: string) =>
      t(key).replace('{name}', name),
    [t],
  );

  const titleOf = useCallback((p: Project) => (isZh ? p.titleZh : p.title), [isZh]);
  const displayTypeOf = useCallback((p: Project) => {
    const hierarchy = projectHierarchy[p.id];
    return hierarchy ? (isZh ? hierarchy.typeZh : hierarchy.type) : (isZh ? p.categoryZh : p.category);
  }, [isZh]);
  const metaOf = useCallback((p: Project) => {
    const hierarchy = projectHierarchy[p.id];
    return hierarchy ? (isZh ? hierarchy.metaZh : hierarchy.meta) : (isZh ? p.focusZh : p.focus);
  }, [isZh]);

  /** Move the real scroll position so `index` becomes the centred project. */
  const goTo = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section || TOTAL <= 1) return;
      const clamped = Math.min(TOTAL - 1, Math.max(0, index));
      const fraction = clamped / (TOTAL - 1);
      const scrollDistance = section.offsetHeight - window.innerHeight;
      const targetTop = section.offsetTop + fraction * scrollDistance;
      window.scrollTo({ top: targetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
    },
    [reducedMotion],
  );

  /* ── Directional settle-after-idle (soft snap, never a trap) ──────────
   * Free scrolling is untouched. When scrolling has been idle for
   * SETTLE_IDLE_MS and the position rests between two segment centres,
   * we animate the window to the next centre in the last scroll
   * direction — so it is impossible to REST mid-transition, but any new
   * wheel / touch / key input cancels the glide instantly. */
  const isSettling = useRef(false);
  const settleAnim = useRef<AnimationPlaybackControls | null>(null);
  const idleTimer = useRef<number | null>(null);
  const lastDir = useRef(1);
  const lastProgress = useRef(0);

  const settle = useCallback(() => {
    const section = sectionRef.current;
    if (!section || TOTAL <= 1 || isSettling.current) return;
    const p = scrollYProgress.get();
    // Only while the pinned stage owns the viewport (not entering/leaving).
    if (p <= 0.001 || p >= 0.999) return;
    const posNow = p * (TOTAL - 1);
    if (Math.abs(posNow - Math.round(posNow)) < SETTLE_EPSILON) return;
    const target =
      lastDir.current >= 0
        ? Math.min(Math.ceil(posNow), TOTAL - 1)
        : Math.max(Math.floor(posNow), 0);
    const scrollDistance = section.offsetHeight - window.innerHeight;
    const targetTop = section.offsetTop + (target / (TOTAL - 1)) * scrollDistance;
    if (reducedMotion) {
      window.scrollTo({ top: targetTop });
      return;
    }
    isSettling.current = true;
    settleAnim.current = animate(window.scrollY, targetTop, {
      duration: durations.slow,
      ease,
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: () => {
        isSettling.current = false;
      },
      onStop: () => {
        isSettling.current = false;
      },
    });
  }, [reducedMotion, scrollYProgress]);

  // Track direction + (re)arm the idle timer on every real scroll change.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const delta = p - lastProgress.current;
    if (delta !== 0) lastDir.current = delta > 0 ? 1 : -1;
    lastProgress.current = p;
    if (isSettling.current) return; // our own glide — don't re-arm
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(settle, SETTLE_IDLE_MS);
  });

  // Any user input cancels a pending or running settle immediately.
  useEffect(() => {
    const cancel = () => {
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
      if (isSettling.current) settleAnim.current?.stop();
    };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
      cancel();
    };
  }, []);

  const ctaLabel = t('work.caseStudy');
  /* In-view reveal for the section chrome (eyebrow / meta / axis) —
   * fadeUp normally, opacity-only under reduced motion. */
  const revealVariants = useMotionVariants(fadeUp);

  const markers = useMemo(
    () =>
      projects.map((p, i) => ({
        project: p,
        index: i,
        order: p.order,
        title: titleOf(p),
      })),
    [titleOf],
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label={t('work.title')}
      style={{ height: `${TOTAL * 100}svh` }}
      className="relative z-10 border-t border-line"
    >
      {/* Every project's content, reachable regardless of the pinned visual
          treatment — screen readers and crawlers see all of them. */}
      <ul className="sr-only">
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={projectHref(p)}>{titleOf(p)}</Link> — {isZh ? p.descriptionZh : p.description}
          </li>
        ))}
      </ul>

      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-bg">
        {/* Eyebrow — reveals on first arrival at the section. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealVariants}
          className="relative z-30 px-5 pt-8 sm:px-8 sm:pt-10"
        >
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-ink">
            {t('work.title')}
          </p>
        </motion.div>

        {/* Stage — all poster/title layers stacked, driven by scroll. */}
        <div className="relative flex-1" style={{ perspective: 1200 }}>
          {projects.map((p, i) => (
            <ProjectLayer
              key={p.id}
              project={p}
              index={i}
              pos={pos}
              isActive={i === activeIndex}
              reducedMotion={reducedMotion}
              title={displayTypeOf(p)}
              caseStudyLabel={localize('work.viewCaseStudy', titleOf(p))}
              ctaLabel={ctaLabel}
              entryScale={i === 0 && !reducedMotion ? firstEntryScale : undefined}
            />
          ))}
        </div>

        {/* Peripheral meta + current/total axis — reveals on first arrival. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealVariants}
          className="relative z-30 flex items-end justify-between gap-4 px-5 pb-8 sm:px-8 sm:pb-10"
        >
          {/* Info (layered crossfade, calmer) */}
          <div className="relative h-28 flex-1 sm:h-24">
            {projects.map((p, i) => (
              <InfoLayer
                key={p.id}
                index={i}
                pos={pos}
                isActive={i === activeIndex}
                reducedMotion={reducedMotion}
                identity={`${titleOf(p)} · ${pad(p.order)}`}
                meta={metaOf(p)}
                href={projectHref(p)}
                caseStudyLabel={localize('work.viewCaseStudy', titleOf(p))}
                ctaLabel={ctaLabel}
              />
            ))}
          </div>

          {/* Side axis — selects the shown project (scrolls); never opens a
              case study. Numbered markers with a hover/focus thumbnail. */}
          <nav aria-label={t('work.title')} className="flex shrink-0 items-center gap-3">
            <div className="hidden flex-col gap-1 sm:flex">
              {markers.map(({ project, index, order, title }) => {
                const selected = index === activeIndex;
                return (
                  <div key={project.id} className="group relative flex items-center justify-end">
                    {/* Hover/focus preview: thumbnail + title, to the left. */}
                    <div className="pointer-events-none absolute right-8 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                      <span className="whitespace-nowrap text-xs font-medium text-ink">{title}</span>
                      <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-md border border-line bg-surface shadow-sm">
                        <img
                          src={withBasePath(project.cover)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={localize('work.showInShowcase', title)}
                      aria-current={selected ? 'true' : undefined}
                      className={`flex h-6 items-center font-mono text-xs tabular-nums outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong ${
                        selected ? 'text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {pad(order)}
                    </button>
                  </div>
                );
              })}
            </div>

            <span className="font-mono text-xs tabular-nums text-ink" aria-hidden="true">
              {pad(projects[activeIndex]?.order ?? projects[0].order)}
            </span>
            <div className="relative h-px w-12 bg-line sm:w-16" aria-hidden="true">
              <motion.div
                style={{ width: progressWidth }}
                className="absolute inset-y-0 left-0 bg-accent"
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-muted" aria-hidden="true">
              {pad(TOTAL)}
            </span>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
