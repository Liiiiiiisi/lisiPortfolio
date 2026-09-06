'use client';

/**
 * HeroCardFan — the central project-card composition of the poster hero.
 *
 * Desktop (sm+): four overlapping square cards as one composed object.
 *   Entrance: after the hero text lands, cards spring in one by one
 *   (scale + rise + rotation settle), left to right.
 *   Cursor physics (deliberately exaggerated, "playful" preset): the stack
 *   is dragged around by the pointer on underdamped elastic springs —
 *   cards never attach to the cursor; each follows with its own movement
 *   multiplier, stiffness, damping and mass, so they chase, overshoot and
 *   wobble back like objects on rubber bands. Rotation is derived from
 *   follow velocity, travel is clamped, and the stack bounces home when
 *   the pointer leaves the hero section.
 *   Hover / keyboard focus: lift ~8px, scale ≤1.04, foreground, deeper shadow.
 *   Scroll tuck (downward handoff): as the hero scrolls out, the cards
 *   shrink, tip back slightly (rotateX with perspective), gather loosely
 *   toward the fan's centre and FALL DOWNWARD — into the path of the
 *   rising Featured Work sheet, which physically overtakes and swallows
 *   them. Since the showcase presents these same four projects, the exit
 *   reads as the cards being handed off to the section that displays them.
 *   Staggered back-to-front (guardian → canopy → micro → signie), locked
 *   1:1 to scroll and fully reversible.
 * Mobile (<sm): card deck — one readable active card (~78vw), neighbors
 *   peeking at the edges, tap to select. Entrance is a staggered fade-rise;
 *   no cursor physics; the whole deck shrinks + fades on scroll-out.
 *
 * Reduced motion: entrance collapses to fades; cursor physics disabled;
 * scroll tuck becomes a plain opacity fade.
 *
 * Deliberately NOT implemented in this iteration (future phases):
 * video playback, click navigation, information overlays.
 *
 * Layout config below is presentation-only; all content lives in
 * data/projects.ts.
 */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { projects } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import {
  durations,
  ease,
  heroTiming,
  springs,
  usePrefersReducedMotion,
} from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import type { Project } from '@/types/project';

/* Presentation config — positions/rotations/physics only, no content.
 * Cursor physics per card ("playful" preset — exaggerated drag + bounce):
 *   drift    max horizontal travel in px (movement multiplier × clamp)
 *   driftY   max vertical travel in px
 *   stiffness/damping/mass  spring feel — deliberately UNDERDAMPED
 *            (damping 12–14) so cards overshoot and wobble back after the
 *            cursor stops; front card snappy, back cards heavier/laggier
 *   rotMax   velocity-driven rotation limit in degrees
 *   tuckOrder  scroll-tuck stagger position (back cards tuck first)
 */
const FAN_LAYOUT: {
  slot: NonNullable<Project['heroSlot']>;
  left: string; // horizontal center of the card, % of container width
  top: string; //  vertical offset, % of container height
  rotate: number;
  z: number;
  scale: number;
  drift: number;
  driftY: number;
  stiffness: number;
  damping: number;
  mass: number;
  rotMax: number;
  tuckOrder: number;
}[] = [
  { slot: 'left', left: '17%', top: '16%', rotate: -8, z: 10, scale: 1, drift: 38, driftY: 22, stiffness: 120, damping: 13, mass: 1.3, rotMax: 4.5, tuckOrder: 0 },
  { slot: 'mid-left', left: '37%', top: '5%', rotate: -3, z: 20, scale: 1, drift: 48, driftY: 28, stiffness: 150, damping: 12, mass: 1.2, rotMax: 5, tuckOrder: 1 },
  { slot: 'center', left: '57%', top: '0%', rotate: 2, z: 40, scale: 1.22, drift: 62, driftY: 36, stiffness: 210, damping: 14, mass: 1, rotMax: 5.5, tuckOrder: 3 },
  { slot: 'right', left: '81%', top: '12%', rotate: 7, z: 30, scale: 1, drift: 42, driftY: 25, stiffness: 135, damping: 12, mass: 1.3, rotMax: 4.8, tuckOrder: 2 },
];

type FanSlot = (typeof FAN_LAYOUT)[number];

/* Scroll-tuck timing: each card animates over its own window of the hero's
 * exit progress — staggered by tuckOrder, finishing before the hero has
 * fully scrolled away. */
const TUCK_STAGGER = 0.13;
const TUCK_SPAN = 0.5;
/** Loose gather target: the fan's centre (Signie's slot). Cards only move
 *  GATHER_STRENGTH of the way there — a loose stack, not a perfect pile. */
const TUCK_CENTER_LEFT = 0.57;
const TUCK_CENTER_TOP = 0;
const TUCK_GATHER_STRENGTH = 0.55;
/** Downward fall distance as a fraction of viewport height — drops the
 *  cards into the path of the rising Featured Work sheet. */
const TUCK_FALL_VH = 0.5;

/* Mobile deck order (visual left→right); Signie is the initial active card. */
const deckProjects = [...projects].sort(
  (a, b) => (a.heroMobileOrder ?? a.order) - (b.heroMobileOrder ?? b.order),
);
const DECK_INITIAL_ACTIVE = Math.max(0, deckProjects.findIndex((project) => project.heroSlot === 'center'));

function cardTitle(project: Project, language: string): string {
  return language === 'zh' ? project.titleZh : project.title;
}

function heroImage(project: Project): string {
  return withBasePath(project.homepageCover ?? project.cover);
}

const CARD_SHADOW =
  'shadow-[0_10px_18px_-8px_rgba(28,26,23,0.22),0_24px_48px_-16px_rgba(28,26,23,0.28)]';
const CARD_SHADOW_LIFTED =
  'hover:shadow-[0_14px_24px_-8px_rgba(28,26,23,0.28),0_34px_64px_-16px_rgba(28,26,23,0.38)] focus-visible:shadow-[0_14px_24px_-8px_rgba(28,26,23,0.28),0_34px_64px_-16px_rgba(28,26,23,0.38)]';

/**
 * One desktop fan card: entrance spring + elastic cursor-follow layers.
 * `nx` / `ny` are the normalized cursor position (−1…1) within the hero
 * section; each card converts them into its own clamped, spring-smoothed
 * offset so the stack moves as staggered layers rather than as one object.
 */
function FanCard({
  slot,
  project,
  title,
  order,
  nx,
  ny,
  exitProgress,
  tuckDx,
  tuckDy,
  reducedMotion,
}: {
  slot: FanSlot;
  project: Project;
  title: string;
  order: number;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  /** Hero exit progress 0…1 (0 = hero fully in view, 1 = scrolled away). */
  exitProgress: MotionValue<number>;
  /** Px offsets from this card's slot to the pile centre (measured). */
  tuckDx: number;
  tuckDy: number;
  reducedMotion: boolean;
}) {
  const springConfig = {
    stiffness: slot.stiffness,
    damping: slot.damping,
    mass: slot.mass,
  };

  /* Elastic follow — target is the clamped, multiplied cursor offset;
   * the underdamped spring supplies lag, overshoot and wobble-back. */
  const targetX = useTransform(nx, (v) => v * slot.drift);
  const targetY = useTransform(ny, (v) => v * slot.driftY);
  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  /* Rotation from horizontal follow velocity, smoothed + clamped. */
  const vx = useVelocity(x);
  const rotTarget = useTransform(
    vx,
    [-800, 800],
    [-slot.rotMax, slot.rotMax],
    { clamp: true },
  );
  const rotate = useSpring(rotTarget, { stiffness: 180, damping: 26 });

  /* Scroll tuck — staggered per-card window of the hero exit progress.
   * Shrink, tip back slightly, gather loosely, fall downward behind the
   * rising Featured Work sheet, and VANISH — each card fades out over the
   * second half of its tuck window, fully gone on arrival at the section. */
  const tuckStart = slot.tuckOrder * TUCK_STAGGER;
  const tuckT = useTransform(
    exitProgress,
    [tuckStart, Math.min(tuckStart + TUCK_SPAN, 1)],
    [0, 1],
    { clamp: true },
  );
  const tuckScale = useTransform(tuckT, [0, 1], [1, 0.45]);
  const tuckRotateX = useTransform(tuckT, [0, 1], [0, -30]);
  const tuckX = useTransform(tuckT, [0, 1], [0, tuckDx]);
  const fallPx =
    typeof window === 'undefined' ? 0 : window.innerHeight * TUCK_FALL_VH;
  // Fall accelerates (ease-in via squared t) — reads as dropping, not sliding.
  const tuckY = useTransform(tuckT, (v) => tuckDy * v + fallPx * v * v);
  const tuckOpacity = useTransform(tuckT, [0, 0.5, 1], [1, 1, 0]);

  const tuckStyle = reducedMotion
    ? { opacity: tuckOpacity }
    : {
        x: tuckX,
        y: tuckY,
        scale: tuckScale,
        rotateX: tuckRotateX,
        opacity: tuckOpacity,
        transformPerspective: 900,
      };

  const entranceDelay = heroTiming.cards + order * heroTiming.cardStagger;
  const lift = reducedMotion ? {} : { y: -8, scale: 1.04 };
  const lensStyle = useScrollLensStyle();

  return (
    <li
      className="absolute transition-[z-index] hover:!z-50 focus-within:!z-50"
      style={{
        left: slot.left,
        top: slot.top,
        zIndex: slot.z,
        width: `calc(var(--card-size) * ${slot.scale})`,
        transform: `translateX(-50%) rotate(${slot.rotate}deg)`,
      }}
    >
      {/* Scroll-tuck layer — scroll-locked, reversible, outermost so it
          composes with (never fights) the entrance and cursor springs. */}
      <motion.div style={tuckStyle} className="will-change-transform">
        {/* Entrance layer — springs from small/low/over-rotated to rest. */}
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.55, y: 48, rotate: slot.rotate * 1.6 }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, y: 0, rotate: 0 }
          }
          transition={
            reducedMotion
              ? { duration: durations.base, ease, delay: entranceDelay }
              : {
                  opacity: { duration: 0.2, ease: 'linear', delay: entranceDelay },
                  default: { ...springs.cardIn, delay: entranceDelay },
                }
          }
          className="will-change-transform"
        >
          {/* Cursor-physics layer — never attached directly to the cursor. */}
          <motion.div
            style={reducedMotion ? undefined : { x, y, rotate }}
            className="will-change-transform"
          >
            <motion.div
              tabIndex={0}
              aria-label={title}
              whileHover={lift}
              whileFocus={lift}
              transition={{ duration: durations.fast, ease }}
              className={`aspect-square w-full overflow-hidden rounded-2xl bg-surface outline-none transition-shadow duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong ${CARD_SHADOW} ${CARD_SHADOW_LIFTED}`}
            >
              <img
                src={heroImage(project)}
                alt={title}
                loading="eager"
                decoding="async"
                style={lensStyle}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </li>
  );
}

export default function HeroCardFan() {
  const { t, language } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(DECK_INITIAL_ACTIVE);
  const fanRef = useRef<HTMLUListElement>(null);

  /* Normalized cursor position (−1…1) within the hero section. */
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  /* Hero exit progress: 0 while the (viewport-height, page-top) hero is
   * fully in view → 1 once it has scrolled away. Drives the card tuck. */
  const { scrollY } = useScroll();
  const exitProgress = useTransform(scrollY, (v) => {
    const h = typeof window === 'undefined' ? 1 : window.innerHeight;
    return Math.min(1, Math.max(0, v / (h * 0.9)));
  });

  /* Mobile deck: one simple shrink + fade on scroll-out (no 3D). */
  const deckOpacity = useTransform(exitProgress, [0, 0.6], [1, 0]);
  const deckScale = useTransform(exitProgress, [0, 0.6], [1, 0.8]);

  /* Fan container size (px) — needed to convert each card's %-based slot
   * into the px offset that converges it onto the pile centre. */
  const [fanSize, setFanSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    const measure = () =>
      setFanSize((prev) => {
        const next = { w: fan.offsetWidth, h: fan.offsetHeight };
        return prev.w === next.w && prev.h === next.h ? prev : next;
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(fan);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const fan = fanRef.current;
    if (!fan) return;
    /* Track over the whole hero section so the stack reacts before the
     * cursor reaches the cards, and returns home on section exit. */
    const section = fan.closest('section') ?? fan;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      nx.set(Math.max(-1, Math.min(1, px)));
      ny.set(Math.max(-1, Math.min(1, py)));
    };
    const onPointerLeave = () => {
      nx.set(0);
      ny.set(0);
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerleave', onPointerLeave);
    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [nx, ny, reducedMotion]);

  return (
    <>
      {/* ---------- Desktop / tablet: composed fan ---------- */}
      <ul
        ref={fanRef}
        aria-label={t('hero.cardsLabel')}
        className="relative mx-auto hidden w-full max-w-[860px] sm:block"
        style={
          {
            '--card-size': 'clamp(150px, 20vw, 240px)',
            height: 'calc(var(--card-size) * 1.42)',
          } as React.CSSProperties
        }
      >
        {FAN_LAYOUT.map((slot, order) => {
          const project = projects.find((entry) => entry.heroSlot === slot.slot);
          if (!project) return null;
          return (
            <FanCard
              key={project.id}
              slot={slot}
              project={project}
              title={cardTitle(project, language)}
              order={order}
              nx={nx}
              ny={ny}
              exitProgress={exitProgress}
              tuckDx={
                (TUCK_CENTER_LEFT - parseFloat(slot.left) / 100) *
                fanSize.w *
                TUCK_GATHER_STRENGTH
              }
              tuckDy={
                (TUCK_CENTER_TOP - parseFloat(slot.top) / 100) *
                fanSize.h *
                TUCK_GATHER_STRENGTH
              }
              reducedMotion={reducedMotion}
            />
          );
        })}
      </ul>

      {/* ---------- Mobile: card deck (simple shrink + fade on scroll-out) ---------- */}
      <motion.ul
        aria-label={t('hero.cardsLabel')}
        className="relative mx-auto w-full overflow-hidden sm:hidden"
        style={{
          height: '84vw',
          opacity: deckOpacity,
          ...(reducedMotion ? {} : { scale: deckScale }),
        }}
      >
        {deckProjects.map((project, index) => {
          const title = cardTitle(project, language);
          const offset = index - activeIndex;
          const isActive = offset === 0;
          const select = () => setActiveIndex(index);
          const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              select();
            }
          };
          const entranceDelay = heroTiming.cards + index * heroTiming.cardStagger;
          return (
            <li
              key={project.id}
              className="absolute left-1/2 top-1/2 w-[78vw]"
              style={{
                marginLeft: '-39vw',
                marginTop: '-39vw',
                zIndex: 40 - Math.abs(offset) * 10,
              }}
            >
              {/* Entrance layer (runs once) — kept separate from the deck's
                  x/scale animation so taps never replay the entrance. */}
              <motion.div
                initial={
                  reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.85 }
                }
                animate={
                  reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
                }
                transition={
                  reducedMotion
                    ? { duration: durations.base, ease, delay: entranceDelay }
                    : { ...springs.cardIn, delay: entranceDelay }
                }
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={title}
                  aria-pressed={isActive}
                  onClick={select}
                  onKeyDown={onKeyDown}
                  animate={{
                    x: `${offset * 88}%`,
                    scale: isActive ? 1 : 0.86,
                  }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: durations.base, ease }
                  }
                  className={`aspect-square w-full overflow-hidden rounded-2xl bg-surface outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong ${CARD_SHADOW}`}
                >
                  <img
                    src={heroImage(project)}
                    alt={title}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </li>
          );
        })}
      </motion.ul>
    </>
  );
}
