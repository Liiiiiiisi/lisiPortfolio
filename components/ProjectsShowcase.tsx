'use client';

/**
 * ProjectsShowcase — gesture-scrubbed, snap-to-adjacent Projects gallery.
 * Rendered as its own homepage section directly after Hero (never inside
 * it). Target of the floating nav's "Projects" item (#projects).
 *
 * Interaction reference: 5a3b882879949.mp4 — a fixed stage where scrolling
 * hands one project off to the next, outgoing and incoming overlapping in
 * depth; a peripheral current/total axis tracks position. Adapted to this
 * portfolio's own language (Barlow Condensed display type, ink/surface/
 * line/accent tokens) — no reference branding, colours, or exact layout
 * reused.
 *
 * ── Interaction model: gesture SCRUBS, release SNAPS ──────────────────
 * activeIndex is the resting project. A physical wheel/touch gesture that
 * crosses a small intent threshold freezes exactly one adjacent pair
 * (`transitionPair = { from: activeIndex, to: activeIndex ± 1 }`) for the
 * rest of that gesture — it can never re-target a different pair while the
 * same physical gesture continues, so one gesture can only ever move one
 * project, never two. Further gesture delta is mapped through a damped,
 * non-linear curve into `progress` (0…1, a Framer MotionValue so every
 * wheel tick only touches transforms, not React state) that scrubs the
 * outgoing/incoming layers continuously — the next project visibly slides
 * in as the user scrolls, exactly tracking gesture delta.
 *
 * When the physical gesture ends (a quiet window after the last wheel
 * event, or `touchend`), the interface never rests mid-transition: the
 * remaining progress animates to completion with a duration that shrinks
 * as less remains (a near-finished scrub settles almost instantly; a
 * barely-started one gets a touch more time), then the pair is committed
 * — activeIndex flips, progress resets to 0, and the system re-arms for
 * the next gesture. Wheel-only: a longer, continuously-reset "momentum
 * guard" absorbs trailing trackpad-momentum ticks from the same physical
 * flick so they can never start a second adjacent transition.
 *
 * Keyboard and marker-click bypass scrubbing entirely — they animate
 * directly from progress 0→1 over a fixed duration. A marker click can
 * jump to any project (not just an adjacent one) but still only ever
 * mounts the outgoing/incoming pair, so it never visibly scrubs through
 * intermediate projects.
 *
 * ── Overlapping transitions (never transition through emptiness) ─────
 * Only the resting project (progress 0, no gesture) or the frozen
 * outgoing/incoming pair (mid-gesture) are ever mounted — never more than
 * two. Both share one opacity/position/scale curve driven by a signed
 * "distance" derived from progress, so they always overlap: the outgoing
 * layer fades/recedes from d=0 to d=∓1 while the incoming layer fades/
 * arrives from d=±1 to d=0. No blur — overlap alone reads as motion, and
 * both curves guarantee the frame is never blank.
 *
 * ── Document scroll ────────────────────────────────────────────────────
 * The <section> is `TOTAL * 100svh` tall; an inner `sticky top-0 h-[100svh]`
 * stage stays pinned. The instant a gesture arms, the real scroll position
 * jumps straight to the destination project's anchor — invisible, because
 * the sticky stage masks it — so there is never a second, visible scroll
 * correction once the visual settle finishes. Free scrolling in/out of the
 * section (boundary gestures at project 01/04) is left untouched so the
 * user can exit to the neighbouring homepage section naturally.
 *
 * ── Two-level navigation ─────────────────────────────────────────────
 * Side-axis buttons only *select* which project the stage shows (a direct,
 * non-scrub transition) — they never open a case study. Only the large
 * active poster (and its explicit CTA) links to the case-study route.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useMotionValue,
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
  ease,
  fadeUp,
  useMotionVariants,
  usePrefersReducedMotion,
  viewportOnce,
} from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import LazyVideo from '@/components/LazyVideo';
import type { Project } from '@/types/project';

const TOTAL = projects.length;

/* ── Gesture-scrub + snap tuning ───────────────────────────────────────
 * All timings/thresholds live here so the feel can be re-tuned without
 * touching the interaction logic below. */
/** Accumulated px before a wheel/touch gesture "arms" and starts scrubbing
 *  a transition. Small enough to feel intentional-but-immediate, large
 *  enough to swallow trackpad/mouse noise. */
const INTENT_THRESHOLD_PX = 16;
/** Excess px (beyond the intent threshold) that saturates the damped scrub
 *  curve — tuned so a moderate deliberate scroll reaches ~70-85% and only
 *  a strong flick approaches the cap. */
const SCRUB_DISTANCE_PX = 190;
/** Scrubbing alone never reaches 1 — the release settle always finishes
 *  the last stretch, so there is always a visible "arrival" motion. */
const SCRUB_PROGRESS_CAP = 0.96;
/** Quiet window after the last wheel event before the physical drag phase
 *  is considered over and the release-settle begins. */
const WHEEL_END_QUIET_MS = 110;
/** Additional, continuously-reset quiet window (measured from the very
 *  last wheel event, armed or not) that must fully elapse before a new
 *  gesture may arm — long enough to absorb a trackpad flick's decaying
 *  momentum tail without letting it start a second transition. */
const MOMENTUM_REARM_QUIET_MS = 220;
const MIN_SETTLE_SECONDS = 0.11;
const MAX_SETTLE_SECONDS = 0.34;
/** Keyboard / marker-click transitions never scrub — one fixed, direct
 *  animation from progress 0 to 1. */
const DIRECT_SETTLE_SECONDS = 0.42;
/** Reduced-motion users still get the full interaction, just condensed to
 *  a quick opacity crossfade instead of a live-tracked scrub. */
const REDUCED_SETTLE_SECONDS = 0.2;
const ANCHOR_TOLERANCE = 2;

type TransitionPair = { from: number; to: number; direction: 1 | -1 };
type GesturePhase = 'idle' | 'armed' | 'settling';

function normalizedWheelDelta(event: WheelEvent): number {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
}

/** Damped, non-linear mapping from px beyond the intent threshold to scrub
 *  progress — responsive immediately, easing toward the cap so even a very
 *  large delta can't complete the transition (or skip past it) on its own. */
function scrubProgressFor(excessPx: number): number {
  if (excessPx <= 0) return 0;
  const damped = 1 - Math.exp(-excessPx / SCRUB_DISTANCE_PX);
  return Math.min(SCRUB_PROGRESS_CAP, damped);
}

/** Settle duration scales with what's left: nearly-finished gestures snap
 *  almost instantly, barely-started ones get a touch more time so the
 *  motion still reads as a completion rather than a cut. */
function settleDurationFor(progress: number): number {
  const remaining = Math.min(1, Math.max(0, 1 - progress));
  return MIN_SETTLE_SECONDS + (MAX_SETTLE_SECONDS - MIN_SETTLE_SECONDS) * remaining;
}

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
/* Poster + title layer. `d` is a signed distance MotionValue: 0 at rest, */
/* travelling to ∓1 (outgoing) or from ±1 to 0 (incoming) as the frozen  */
/* pair's progress runs 0→1. Never more than two of these are mounted.  */
/* ------------------------------------------------------------------ */
function ProjectLayer({
  project,
  d,
  zIndex,
  isActive,
  reducedMotion,
  title,
  caseStudyLabel,
}: {
  project: Project;
  d: MotionValue<number>;
  zIndex: number;
  isActive: boolean;
  reducedMotion: boolean;
  title: string;
  caseStudyLabel: string;
}) {
  // Subtle, deliberately restrained ranges — this scrubs across a single
  // gesture's worth of delta, not a whole-page scroll, so it reads as one
  // continuous slide rather than a big scroll-linked sweep. No blur: the
  // opacity/position/scale overlap alone is enough to communicate motion,
  // and it guarantees the resting frame is always crisp.
  const posterOpacity = useTransform(d, [-1, 0, 1], [0, 1, 0]);
  const scale = useTransform(d, [-1, 0, 1], [0.99, 1, 0.985]);
  const translateY = useTransform(d, [-1, 0, 1], [-28, 0, 36]);
  const titleY = useTransform(d, [-1, 0, 1], ['-115%', '0%', '115%']);
  const titleOpacity = useTransform(d, [-1, -0.6, 0, 0.6, 1], [0, 1, 1, 1, 0]);

  const lensStyle = useScrollLensStyle();
  const posterStyle = reducedMotion
    ? { opacity: posterOpacity, zIndex }
    : { opacity: posterOpacity, scale, y: translateY, zIndex };

  const PosterInner = (
    <div className="group relative overflow-hidden rounded-2xl bg-surface shadow-[0_10px_18px_-8px_rgba(28,26,23,0.22),0_24px_48px_-16px_rgba(28,26,23,0.28)]">
      <div style={lensStyle}>
        {isActive && !reducedMotion ? (
          <LazyVideo
            src={project.preview}
            poster={project.previewPoster}
            loadMargin="150px"
            className="aspect-[8/5] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <img
            src={withBasePath(project.homepageCover ?? project.cover)}
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
      style={posterStyle}
      className="absolute inset-0 flex items-center justify-center px-5 will-change-transform sm:px-8"
    >
      <div className="relative w-full max-w-[860px]">
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

        {/* Title mask — both layers are identically positioned, so the
            outgoing title travelling to -115% and the incoming title
            travelling from 115%→0% read as one shared, overlapping mask. */}
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
/* Info layer — calmer, small movement, same `d` convention as above.  */
/* ------------------------------------------------------------------ */
function InfoLayer({
  d,
  isActive,
  reducedMotion,
  identity,
  meta,
  href,
  caseStudyLabel,
  ctaLabel,
}: {
  d: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
  identity: string;
  meta: string;
  href: string;
  caseStudyLabel: string;
  ctaLabel: string;
}) {
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
  const [transitionPair, setTransitionPair] = useState<TransitionPair | null>(null);
  const [entryReady, setEntryReady] = useState(false);

  // Refs mirror the state above so the single wheel/touch/keyboard effect
  // below always reads the latest value without needing to be re-wired on
  // every change (avoids stale closures without re-attaching listeners).
  const activeIndexRef = useRef(0);
  const transitionPairRef = useRef<TransitionPair | null>(null);
  const progress = useMotionValue(0);

  const phaseRef = useRef<GesturePhase>('idle');
  const directionRef = useRef<1 | -1>(1);
  const guardActiveRef = useRef(false); // true from arm until the momentum guard clears
  const wheelAccumRef = useRef(0);
  const wheelEndTimerRef = useRef<number | null>(null);
  const momentumGuardTimerRef = useRef<number | null>(null);
  const settleAnimRef = useRef<AnimationPlaybackControls | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const anchorTop = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section || TOTAL <= 1) return window.scrollY;
    const scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    return section.offsetTop + (index / (TOTAL - 1)) * scrollDistance;
  }, []);

  const setScrollTopInstant = useCallback((top: number) => {
    window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const stageOwnsScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return false;
    const first = section.offsetTop;
    const last = first + Math.max(0, section.offsetHeight - window.innerHeight);
    return window.scrollY >= first - ANCHOR_TOLERANCE
      && window.scrollY <= last + ANCHOR_TOLERANCE;
  }, []);

  /** Commits the frozen pair once its progress animation reaches 1:
   *  activeIndex flips, progress resets, and the stage collapses back to a
   *  single resting layer. Document scroll was already moved to this
   *  target's anchor the instant the gesture armed, so nothing further
   *  needs to move — there is no second, visible correction here. */
  const commitPair = useCallback(() => {
    const pair = transitionPairRef.current;
    if (pair) {
      activeIndexRef.current = pair.to;
      setActiveIndex(pair.to);
    }
    transitionPairRef.current = null;
    setTransitionPair(null);
    progress.set(0);
    phaseRef.current = 'idle';
    // A just-completed gesture's leftover wheelAccumRef must not bleed into
    // the next one — otherwise, once the momentum guard clears, the very
    // next wheel tick (however small) re-triggers the OLD accumulated
    // magnitude and re-arms instantly with no fresh intent threshold,
    // chaining transitions the user never asked for.
    wheelAccumRef.current = 0;
  }, [progress]);

  /** Animates the remaining progress to 1. Duration depends on how much is
   *  left — never a fixed full-length transition restarted from zero. */
  const beginSettle = useCallback((durationSeconds?: number) => {
    phaseRef.current = 'settling';
    settleAnimRef.current?.stop();
    const from = progress.get();
    const duration = durationSeconds ?? settleDurationFor(from);
    settleAnimRef.current = animate(progress, 1, {
      duration,
      ease,
      onComplete: commitPair,
    });
  }, [commitPair, progress]);

  /** Freezes exactly one adjacent pair for the rest of this physical
   *  gesture and jumps the (invisible, sticky-masked) document anchor
   *  straight to the destination — the visual itself is driven only by
   *  `progress` from here on. */
  const armAdjacentGesture = useCallback((direction: 1 | -1) => {
    const from = activeIndexRef.current;
    const to = from + direction;
    const pair: TransitionPair = { from, to, direction };
    transitionPairRef.current = pair;
    setTransitionPair(pair);
    directionRef.current = direction;
    phaseRef.current = 'armed';
    guardActiveRef.current = true;
    progress.set(0);
    setScrollTopInstant(anchorTop(to));
    if (reducedMotion) beginSettle(REDUCED_SETTLE_SECONDS);
  }, [anchorTop, beginSettle, progress, reducedMotion, setScrollTopInstant]);

  /** Shared by keyboard and marker-click: a direct, non-scrubbed animation
   *  to any target index (adjacent or not) — only the outgoing/incoming
   *  pair is ever mounted, so distance never shows as passing through
   *  intermediate projects. */
  const directAnimateTo = useCallback((requestedIndex: number) => {
    const to = Math.min(TOTAL - 1, Math.max(0, requestedIndex));
    const from = activeIndexRef.current;
    if (phaseRef.current !== 'idle') return;
    if (to === from) {
      setScrollTopInstant(anchorTop(from));
      return;
    }
    const direction: 1 | -1 = to > from ? 1 : -1;
    const pair: TransitionPair = { from, to, direction };
    transitionPairRef.current = pair;
    setTransitionPair(pair);
    directionRef.current = direction;
    phaseRef.current = 'settling';
    progress.set(0);
    setScrollTopInstant(anchorTop(to));
    settleAnimRef.current?.stop();
    settleAnimRef.current = animate(progress, 1, {
      duration: reducedMotion ? REDUCED_SETTLE_SECONDS : DIRECT_SETTLE_SECONDS,
      ease,
      onComplete: commitPair,
    });
  }, [anchorTop, commitPair, progress, reducedMotion, setScrollTopInstant]);

  // Initial mount: if the page is already scrolled into the section's
  // range (deep link, scroll restoration), sync activeIndex + anchor once.
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const section = sectionRef.current;
    if (!section || TOTAL <= 1) return;
    const first = section.offsetTop;
    const distance = Math.max(0, section.offsetHeight - window.innerHeight);
    const last = first + distance;
    if (window.scrollY >= first && window.scrollY <= last && distance > 0) {
      const initialIndex = Math.min(TOTAL - 1, Math.max(0, Math.round(((window.scrollY - first) / distance) * (TOTAL - 1))));
      activeIndexRef.current = initialIndex;
      setActiveIndex(initialIndex);
      setScrollTopInstant(anchorTop(initialIndex));
    }
  }, [anchorTop, setScrollTopInstant]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      setEntryReady(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntryReady(true);
        observer.disconnect();
      }
    }, { threshold: 0.001 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const armWheelTimers = () => {
      // NOTE: does NOT set guardActiveRef here. Guard activation is the
      // exclusive responsibility of armAdjacentGesture (a gesture actually
      // armed) — this only (re)schedules the two quiet timers. Setting the
      // guard unconditionally here used to fire on every pre-arm wheel tick
      // (including sub-threshold ones), which meant the very first
      // qualifying tick "guarded" the second tick before threshold was ever
      // reached — wheelAccumRef then never grew past that first tick's
      // delta, no gesture could ever arm, and every following wheel event
      // fell into the guard-swallow branch below with preventDefault()
      // still firing: a permanent, silent scroll deadlock.
      if (wheelEndTimerRef.current !== null) window.clearTimeout(wheelEndTimerRef.current);
      wheelEndTimerRef.current = window.setTimeout(onWheelEndQuiet, WHEEL_END_QUIET_MS);
      if (momentumGuardTimerRef.current !== null) window.clearTimeout(momentumGuardTimerRef.current);
      momentumGuardTimerRef.current = window.setTimeout(onMomentumGuardQuiet, MOMENTUM_REARM_QUIET_MS);
    };

    // Ends the physical drag phase of an armed gesture (begins the
    // release-settle). A never-armed sub-threshold attempt just resets.
    const onWheelEndQuiet = () => {
      wheelEndTimerRef.current = null;
      if (phaseRef.current === 'armed') {
        beginSettle();
      } else if (phaseRef.current === 'idle') {
        wheelAccumRef.current = 0;
      }
    };

    // Fires only after true silence for MOMENTUM_REARM_QUIET_MS — any
    // wheel tick in between (including trailing trackpad momentum)
    // re-arms this timer via armWheelTimers(), so a brand-new gesture can
    // never start until the previous flick's momentum has fully decayed.
    const onMomentumGuardQuiet = () => {
      momentumGuardTimerRef.current = null;
      guardActiveRef.current = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (!stageOwnsScroll()) return;
      const deltaY = normalizedWheelDelta(event);
      if (Math.abs(deltaY) <= Math.abs(event.deltaX) || Math.abs(deltaY) < 0.5) return;

      if (phaseRef.current !== 'idle') {
        // Armed or settling: this is still the same physical gesture (or
        // its momentum tail). Keep the guard alive; feed progress only
        // while still in the live drag phase.
        event.preventDefault();
        armWheelTimers();
        if (phaseRef.current !== 'armed') return; // settling: absorb, ignore
        wheelAccumRef.current += deltaY;
        const excess = directionRef.current * wheelAccumRef.current - INTENT_THRESHOLD_PX;
        progress.set(Math.min(SCRUB_PROGRESS_CAP, Math.max(0, scrubProgressFor(excess))));
        return;
      }

      if (guardActiveRef.current) {
        // Trailing momentum from the previous gesture — swallow it so it
        // can never start a new transition, but keep resetting the guard.
        event.preventDefault();
        armWheelTimers();
        return;
      }

      // Fresh, unarmed accumulation phase.
      const provisionalDirection: 1 | -1 = deltaY > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const leavesAtBoundary = (currentIndex === 0 && provisionalDirection < 0)
        || (currentIndex === TOTAL - 1 && provisionalDirection > 0);
      if (leavesAtBoundary) {
        wheelAccumRef.current = 0;
        return; // let the page scroll naturally out of the section
      }

      event.preventDefault();
      if (wheelAccumRef.current !== 0 && Math.sign(wheelAccumRef.current) !== Math.sign(deltaY)) {
        wheelAccumRef.current = deltaY;
      } else {
        wheelAccumRef.current += deltaY;
      }
      armWheelTimers();

      if (Math.abs(wheelAccumRef.current) >= INTENT_THRESHOLD_PX) {
        armAdjacentGesture(Math.sign(wheelAccumRef.current) as 1 | -1);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !stageOwnsScroll()) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'PageUp'
          ? -1
          : 0;
      if (!direction) return;
      const currentIndex = activeIndexRef.current;
      const leavesAtBoundary = (currentIndex === 0 && direction < 0)
        || (currentIndex === TOTAL - 1 && direction > 0);
      if (leavesAtBoundary) return; // let the default key-scroll exit the section
      if (event.repeat || phaseRef.current !== 'idle') { event.preventDefault(); return; }
      event.preventDefault();
      directAnimateTo(currentIndex + direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || !stageOwnsScroll()) {
        touchStartYRef.current = null;
        touchStartXRef.current = null;
        return;
      }
      touchStartYRef.current = event.touches[0].clientY;
      touchStartXRef.current = event.touches[0].clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const startX = touchStartXRef.current;
      if (startY === null || startX === null || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const deltaY = startY - touch.clientY; // positive: finger moved up (scroll-down intent)
      const deltaX = startX - touch.clientX;
      if (Math.abs(deltaY) <= Math.abs(deltaX)) return; // horizontal swipe — ignore

      if (phaseRef.current === 'idle') {
        if (guardActiveRef.current) { event.preventDefault(); return; }
        const provisionalDirection: 1 | -1 = deltaY > 0 ? 1 : -1;
        const currentIndex = activeIndexRef.current;
        const leavesAtBoundary = (currentIndex === 0 && provisionalDirection < 0)
          || (currentIndex === TOTAL - 1 && provisionalDirection > 0);
        if (leavesAtBoundary) return; // let the page scroll naturally out of the section
        if (Math.abs(deltaY) < INTENT_THRESHOLD_PX) { event.preventDefault(); return; }
        event.preventDefault();
        armAdjacentGesture(provisionalDirection);
        return;
      }

      if (phaseRef.current === 'armed') {
        event.preventDefault();
        const excess = directionRef.current * deltaY - INTENT_THRESHOLD_PX;
        progress.set(Math.min(SCRUB_PROGRESS_CAP, Math.max(0, scrubProgressFor(excess))));
        return;
      }

      // settling: swallow further touchmove from the same gesture.
      event.preventDefault();
    };

    const onTouchEnd = () => {
      if (phaseRef.current === 'armed') beginSettle();
      touchStartYRef.current = null;
      touchStartXRef.current = null;
    };

    // Natural entry into the pinned stage from ordinary page scrolling
    // (e.g. arriving from the section above/below) — snap straight to the
    // boundary project and correct the anchor instantly.
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section || phaseRef.current !== 'idle') {
        lastScrollYRef.current = window.scrollY;
        return;
      }
      const previousY = lastScrollYRef.current;
      const currentY = window.scrollY;
      const first = section.offsetTop;
      const last = first + Math.max(0, section.offsetHeight - window.innerHeight);
      lastScrollYRef.current = currentY;

      const enteredFromTop = previousY < first - ANCHOR_TOLERANCE
        && currentY >= first - ANCHOR_TOLERANCE
        && currentY <= last;
      const enteredFromBottom = previousY > last + ANCHOR_TOLERANCE
        && currentY <= last + ANCHOR_TOLERANCE
        && currentY >= first;
      if (!enteredFromTop && !enteredFromBottom) return;

      const entryIndex = enteredFromTop ? 0 : TOTAL - 1;
      activeIndexRef.current = entryIndex;
      setActiveIndex(entryIndex);
      setScrollTopInstant(enteredFromTop ? first : last);
    };

    const onScrollEnd = () => {
      if (phaseRef.current === 'idle' && stageOwnsScroll()) {
        const expectedTop = anchorTop(activeIndexRef.current);
        if (Math.abs(window.scrollY - expectedTop) > ANCHOR_TOLERANCE) setScrollTopInstant(expectedTop);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', onScrollEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
      if (wheelEndTimerRef.current !== null) window.clearTimeout(wheelEndTimerRef.current);
      if (momentumGuardTimerRef.current !== null) window.clearTimeout(momentumGuardTimerRef.current);
      settleAnimRef.current?.stop();
    };
  }, [anchorTop, armAdjacentGesture, beginSettle, directAnimateTo, progress, setScrollTopInstant, stageOwnsScroll]);

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

  const ctaLabel = t('work.caseStudy');
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

  // Signed-distance MotionValues shared by the poster and info layers for
  // each role, so both regions of the DOM stay perfectly in lockstep.
  const direction = transitionPair?.direction ?? 1;
  const outgoingD = useTransform(progress, (p) => -direction * p);
  const incomingD = useTransform(progress, (p) => direction * (1 - p));
  const restD = useMotionValue(0);

  const activeProject = projects[activeIndex] ?? projects[0];
  const progressWidth = TOTAL <= 1 ? '100%' : `${(activeIndex / (TOTAL - 1)) * 100}%`;

  type Layer = { project: Project; d: MotionValue<number>; zIndex: number; isActive: boolean };
  const layers: Layer[] = transitionPair
    ? [
        { project: projects[transitionPair.from], d: outgoingD, zIndex: 1, isActive: true },
        { project: projects[transitionPair.to], d: incomingD, zIndex: 2, isActive: false },
      ]
    : [{ project: activeProject, d: restD, zIndex: 2, isActive: true }];

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

        {/* Stage — at rest, one project; mid-gesture, exactly the frozen
            outgoing/incoming pair. Never more than two, never fewer than
            one, so the frame is never blank. */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={entryReady || reducedMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease }}
          className="relative flex-1"
        >
          {layers.map(({ project, d, zIndex, isActive }) => (
            <ProjectLayer
              key={project.id}
              project={project}
              d={d}
              zIndex={zIndex}
              isActive={isActive}
              reducedMotion={reducedMotion}
              title={displayTypeOf(project)}
              caseStudyLabel={localize('work.viewCaseStudy', titleOf(project))}
            />
          ))}
        </motion.div>

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
            {layers.map(({ project, d, isActive }) => (
              <InfoLayer
                key={project.id}
                d={d}
                isActive={isActive}
                reducedMotion={reducedMotion}
                identity={`${titleOf(project)} · ${pad(project.order)}`}
                meta={metaOf(project)}
                href={projectHref(project)}
                caseStudyLabel={localize('work.viewCaseStudy', titleOf(project))}
                ctaLabel={ctaLabel}
              />
            ))}
          </div>

          {/* Side axis — selects the shown project via a direct (non-scrub)
              transition; never opens a case study. Numbered markers with a
              hover/focus thumbnail. */}
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
                          src={withBasePath(project.navThumbnail ?? project.homepageCover ?? project.cover)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => directAnimateTo(index)}
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
                animate={{ width: progressWidth }}
                transition={{ duration: reducedMotion ? REDUCED_SETTLE_SECONDS : DIRECT_SETTLE_SECONDS, ease }}
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
