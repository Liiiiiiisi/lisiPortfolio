'use client';

/**
 * Hero — single full-screen poster composition (experimental redesign).
 *
 * Five centered zones, top to bottom:
 *   1. Metadata (location + email placeholder)
 *   2. Primary name — darkest, strongest element
 *   3. Overlapping project-card composition (HeroCardFan)
 *   4. Large ghosted professional title, partially behind the cards
 *   5. Selected Highlights
 *
 * Kinetic entrance (this iteration):
 *   - Name and ghost title grow vertically from their baseline
 *     (bottom-origin scaleY) with a subtle squash-and-stretch spring
 *     overshoot, staggered per word / per line — no typing effect.
 *   - Metadata fades in first; highlights fade in last.
 *   - Card entrance + cursor physics live in HeroCardFan.
 *   - Reduced motion: everything collapses to simple fades.
 *
 * The previous split-layout hero and HeroProjectPreview are intentionally
 * not rendered but preserved in the repo for rollback.
 */
import { motion, type Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import HeroCardFan from '@/components/HeroCardFan';
import {
  durations,
  ease,
  heroTiming,
  springs,
  usePrefersReducedMotion,
} from '@/lib/motion';

/* Bottom-origin baseline pop with squash-and-stretch counter-axis. */
const wordPop: Variants = {
  hidden: { opacity: 0, scaleY: 0, scaleX: 1.08 },
  visible: {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transition: {
      opacity: { duration: 0.14, ease: 'linear' },
      scaleY: springs.textPop,
      scaleX: springs.textSquash,
    },
  },
};

const wordFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease } },
};

/* Container that staggers its children's `wordPop` reveals. */
function staggerContainer(delay: number, stagger: number): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };
}

/** Splits text on spaces and animates each word from its baseline. */
function KineticWords({ text, variants }: { text: string; variants: Variants }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          {index > 0 && ' '}
          <motion.span
            variants={variants}
            className="inline-block origin-bottom will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  const pop = reducedMotion ? wordFade : wordPop;
  const zoneFade = (delay: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: durations.slow, ease, delay },
  });

  return (
    <motion.section
      id="top"
      aria-label="Introduction"
      initial="hidden"
      animate="visible"
      className="relative isolate mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-between overflow-x-clip px-5 pb-28 pt-10 text-center sm:px-8 sm:pb-24"
    >
      {/* Zone 1 — metadata */}
      <motion.header className="relative z-20" {...zoneFade(heroTiming.meta)}>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-ink">
          {t('hero.location')}
        </p>
        {/* Email stays a marked placeholder; replace once in locales. */}
        <p className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted">
          {t('hero.email')}
        </p>
      </motion.header>

      {/* Zones 2–4 — name, cards, professional title */}
      <div className="flex w-full flex-1 flex-col items-center justify-center py-6">
        <motion.h1
          variants={staggerContainer(heroTiming.name, heroTiming.nameStagger)}
          className="relative z-0 font-display text-[clamp(4rem,14vw,10rem)] font-extrabold uppercase leading-[0.9] tracking-[0.01em] text-ink"
        >
          <KineticWords text={t('hero.name')} variants={pop} />
        </motion.h1>

        <div className="relative z-10 -mt-3 w-full sm:-mt-[2.5vw]">
          <HeroCardFan />
        </div>

        {/* Ghost title — two lines, each rising from its own baseline. */}
        <motion.p
          variants={staggerContainer(heroTiming.title, heroTiming.titleStagger)}
          className="relative z-0 -mt-4 font-display text-[clamp(2.5rem,8.5vw,6.75rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] text-title-ghost sm:-mt-[4vw]"
        >
          <motion.span
            variants={pop}
            className="block origin-bottom will-change-transform"
          >
            {t('hero.title1')}
          </motion.span>
          <motion.span
            variants={pop}
            className="block origin-bottom will-change-transform"
          >
            {t('hero.title2')}
          </motion.span>
        </motion.p>
      </div>

      {/* Zone 5 — selected highlights */}
      <motion.footer className="relative z-20" {...zoneFade(heroTiming.footer)}>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-ink">
          {t('highlights.label')}
        </p>
        {/* Desktop: one dot-separated line */}
        <p className="mt-2 hidden text-xs font-medium uppercase tracking-[0.14em] text-muted sm:block">
          {t('highlights.item1')}
          <span aria-hidden="true"> · </span>
          {t('highlights.item2')}
          <span aria-hidden="true"> · </span>
          {t('highlights.item3')}
        </p>
        {/* Mobile: three stacked lines */}
        <div className="mt-2 space-y-1 text-xs font-medium uppercase tracking-[0.14em] text-muted sm:hidden">
          <p>{t('highlights.item1')}</p>
          <p>{t('highlights.item2')}</p>
          <p>{t('highlights.item3')}</p>
        </div>
      </motion.footer>
    </motion.section>
  );
}

