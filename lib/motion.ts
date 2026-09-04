/**
 * Shared motion tokens — the single source of truth for all animation.
 * Phase 1 renders statically; these tokens are ready for Phase 2 wiring.
 *
 * Rules:
 * - Every animated component consumes these tokens; no ad-hoc timing.
 * - Under reduced motion, variants collapse to opacity-only (or none).
 * - Animation logic never contains project content.
 */
import { useReducedMotion } from 'framer-motion';
import type { Transition, Variants } from 'framer-motion';

export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const;

/* ------------------------------------------------------------------ */
/* Springs — shared physics presets for the kinetic hero.              */
/* ------------------------------------------------------------------ */
export const springs = {
  /** Baseline text pop — quick rise with a subtle squash-and-stretch overshoot. */
  textPop: { type: 'spring', stiffness: 460, damping: 26, mass: 1 },
  /** Counter-axis squash paired with textPop (slightly softer). */
  textSquash: { type: 'spring', stiffness: 340, damping: 24, mass: 1 },
  /** Project-card entrance — springy but controlled. */
  cardIn: { type: 'spring', stiffness: 240, damping: 20, mass: 1 },
  /** Floating nav pill expand/collapse — controlled and soft, no overshoot. */
  navExpand: { type: 'spring', stiffness: 400, damping: 32, mass: 0.8 },
  /** Floating nav entrance settle — near-critical damping, minimal bounce. */
  navEntrance: { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 },
  /** Scroll-driven gallery poster crossfade — controlled, no overshoot. */
  galleryPoster: { type: 'spring', stiffness: 280, damping: 30, mass: 1 },
  /**
   * Soft-settle spring for smoothing the scroll-derived gallery position.
   * Gentle enough to add trackpad-momentum easing and a subtle settle near
   * each project centre, stiff enough to never feel laggy or trap scroll.
   */
  scrollSettle: { stiffness: 170, damping: 30, mass: 0.6 },
} satisfies Record<string, Transition>;

/**
 * Hero entrance choreography (seconds).
 * Single source of truth consumed by Hero and HeroCardFan so the
 * text → cards sequence stays coordinated across components.
 */
export const heroTiming = {
  meta: 0.05,
  name: 0.2,
  nameStagger: 0.07,
  title: 0.55,
  titleStagger: 0.1,
  cards: 0.9,
  cardStagger: 0.13,
  /** Floating nav appears after the hero cards have started, before footer highlights. */
  nav: 1.15,
  footer: 1.7,
} as const;

/** Single shared easing curve. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Standard in-view settings for scroll-triggered reveals (Phase 2). */
export const viewportOnce = { once: true, margin: '-10%' } as const;

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease } },
};

/**
 * Reduced-motion aware variant picker.
 * Returns opacity-only variants when the user prefers reduced motion.
 */
export function useMotionVariants(variants: Variants): Variants {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? fade : variants;
}

/** Convenience flag for imperative checks (e.g. disabling autoplay in Phase 2). */
export function usePrefersReducedMotion(): boolean {
  return Boolean(useReducedMotion());
}

