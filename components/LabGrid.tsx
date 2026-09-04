'use client';

/**
 * LabGrid — the /lab page: a scattered-worktable archive of experiments,
 * studies and earlier work. Distinct from the homepage but visibly kin
 * to it: the tilted-card language comes straight from the hero fan.
 *
 * References: evasanchez.info/playground (count-up intro, workbench
 * atmosphere, annotation-style tags — NOT its density) · tomoyaokada.com
 * (restrained one-line metadata) · an evolving archive that grows by
 * appending to data/lab.ts.
 *
 * Character moves (deliberate, in place of formal-grid neutrality):
 *   - Scattered worktable: every tile carries a small deterministic tilt
 *     (seeded per slot, ±1.4–2.4°; softened ~2.5× on mobile) and one slot
 *     per cycle pulls up into the previous row for an occasional overlap —
 *     experiments tossed on a desk, not mounted in a gallery. Hover /
 *     keyboard focus straightens and lifts the tile.
 *   - Graph-paper ground: a faint dotted guide grid (line token) behind
 *     the whole page. Static, costless, mobile-safe.
 *   - Count-up intro: on load a full-screen count runs 000→total in
 *     display type, then settles into the header as the mono "[009]"
 *     archive tag (shared layoutId morph). One-shot ~1.2s; skipped under
 *     reduced motion. The grid stays in the DOM throughout (the overlay
 *     merely covers it), so crawlers/readers always see content.
 *   - Discipline shorthand tags: captions read "[INTX] · TOOL / MEDIUM" —
 *     bracket tags derived from the structured discipline field (full
 *     locale label kept for screen readers; the vocabulary doubles as a
 *     future filter row).
 *
 * Still true: no numbering-as-sequence, no pinning, no marquee, no
 * scroll-linked transforms; tiles settle in with the site-wide fadeUp on
 * first arrival. Captions always visible; nothing depends on hover.
 * Reduced motion: fades only, no tilt transitions, posters over autoplay,
 * no count intro.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { lab } from '@/data/lab';
import LabStudyOverlay from '@/components/LabStudyOverlay';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import type { TranslationKey } from '@/locales/en';
import type { LabDiscipline, LabItem, LabTileAspect } from '@/types/lab';

const ASPECT_CLASS: Record<LabTileAspect, string> = {
  ultra: 'aspect-[21/9]',
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
  phone: 'aspect-[9/16]',
  tall: 'aspect-[4/5]',
};

/** Bracket shorthand per discipline — caption tag + future filter vocab.
 *  Full locale label accompanies it for screen readers. */
const DISCIPLINE_TAG: Record<LabDiscipline, string> = {
  interaction: 'INTX',
  motion: 'MOTN',
  editorial: 'EDIT',
  technical: 'TECH',
  archive: 'ARCH',
};

/* Cyclic placement recipe — six slots of generous widths, side offsets and
 * vertical staggers (lg), simplified two-column staggering (sm), single
 * column (base).
 *
 * NOTE: no negative margins / z-index stacking here on purpose. Tiles must
 * never overlap one another — a tile pulled into the previous row covers
 * that row's caption text. The scattered feel comes from the tilts, the
 * uneven widths and the staggered offsets, all of which stay collision-free.
 * Column widths are kept ≤47% (sm) and the lg widths + side offsets are
 * chosen so that even at max tilt the rotated corners clear their
 * neighbours. */
const SLOT_CLASS: string[] = [
  // Slot 0 carries a real top offset so later cycles clear the previous
  // row; only the very first tile on the page zeroes it (see isFirst).
  'sm:w-[46%] sm:mt-20 lg:w-[33%] lg:mt-28',
  'sm:w-[46%] sm:ml-auto sm:mt-16 lg:w-[52%] lg:ml-auto lg:mt-20',
  'sm:w-[46%] sm:mt-14 lg:w-[37%] lg:ml-[5%] lg:mt-32',
  'sm:w-[46%] sm:ml-auto sm:mt-20 lg:w-[44%] lg:ml-auto lg:mr-[2%] lg:mt-20',
  'sm:w-[46%] sm:mt-14 lg:w-[29%] lg:ml-[7%] lg:mt-28',
  'sm:w-[46%] sm:ml-auto sm:mt-16 lg:w-[50%] lg:ml-auto lg:mt-24',
];

/** Deterministic tilt per slot (deg) — an EXCEPTION, not a rule: most
 *  slots sit cleanly at 0 and only a couple per cycle are tipped, so the
 *  scatter reads as a few stray pieces on an otherwise ordered grid.
 *  Tilted tiles also carry the only resting shadows. Softened ~2.5× on
 *  mobile via a second CSS var. */
const SLOT_TILT: number[] = [0, -1.8, 0, 0, 1.5, 0];

/** Video that plays muted while visible, pauses offscreen. */
function InViewVideo({
  src,
  poster,
  reducedMotion,
}: {
  src: string;
  poster?: string;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '15%' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      src={withBasePath(src)}
      poster={poster ? withBasePath(poster) : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
    />
  );
}

function TileMedia({ item, reducedMotion, isZh }: { item: LabItem; reducedMotion: boolean; isZh: boolean }) {
  const alt = (isZh ? item.altZh : item.alt) ?? '';
  /* Lens on the media only — the tile's hairline border stays crisp. */
  const lensStyle = useScrollLensStyle();
  if (!item.src) return null; // neutral surface block until media lands
  if (item.kind === 'video') {
    if (reducedMotion && item.poster) {
      // eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images
      return <img src={withBasePath(item.poster)} alt={alt} className="h-full w-full object-cover" />;
    }
    return (
      <div style={lensStyle} className="h-full w-full">
        <InViewVideo src={item.src} poster={item.poster} reducedMotion={reducedMotion} />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images
  return (
    <img
      src={withBasePath(item.src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={lensStyle}
      className="h-full w-full object-cover"
    />
  );
}

function LabTile({
  item,
  index,
  reducedMotion,
  onOpen,
}: {
  item: LabItem;
  index: number;
  reducedMotion: boolean;
  onOpen: (item: LabItem) => void;
}) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  const title = isZh ? item.titleZh : item.title;
  const tools = (isZh ? item.toolsZh : item.tools) ?? item.tools;
  const disciplineLabel = t(`lab.discipline.${item.discipline}` as TranslationKey);
  const tag = DISCIPLINE_TAG[item.discipline];

  const slotIndex = index % SLOT_CLASS.length;
  const slotClass = SLOT_CLASS[slotIndex];
  const tilt = SLOT_TILT[slotIndex];
  /** Only the page's first tile sits flush at the top; every recurrence of
   *  slot 0 keeps its offset so it can't collide with the row above. */
  const firstClass = index === 0 ? 'sm:!mt-0 lg:!mt-0' : '';
  /* Mobile: single column with alternating slight insets. */
  const mobileInset = index % 2 === 0 ? 'pr-6 sm:pr-0' : 'pl-6 sm:pl-0';

  /* Tilt + shadow are the exception: only accent slots are tipped (and
   * only those carry a resting shadow, like a stray print on the desk).
   * Accent tiles straighten on hover / keyboard focus; plain tiles just
   * lift very slightly. */
  const isAccent = tilt !== 0;
  const tiltStyle = isAccent
    ? ({
        '--tilt': `${tilt}deg`,
        '--tilt-m': `${(tilt / 2.5).toFixed(2)}deg`,
      } as React.CSSProperties)
    : undefined;
  const tiltClass = [
    isAccent ? 'rotate-[var(--tilt-m)] sm:rotate-[var(--tilt)]' : '',
    reducedMotion
      ? ''
      : `transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-within:-translate-y-1${
          isAccent ? ' group-hover:rotate-0 group-focus-within:rotate-0' : ''
        }`,
  ]
    .filter(Boolean)
    .join(' ');

  const media = (
    <div
      className={`${ASPECT_CLASS[item.aspect]} relative overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-300 ${
        isAccent ? 'shadow-[0_6px_18px_-10px_rgba(28,26,23,0.22)]' : ''
      } ${
        reducedMotion || !isAccent
          ? ''
          : 'group-hover:shadow-[0_12px_28px_-12px_rgba(28,26,23,0.26)]'
      }`}
    >
      <TileMedia item={item} reducedMotion={reducedMotion} isZh={isZh} />
    </div>
  );

  const caption = (
    <div className="mt-3 flex items-baseline justify-between gap-3">
      <div className="min-w-0">
        <h2 className="truncate font-display text-sm font-bold uppercase tracking-[0.03em] text-ink">
          {title}
        </h2>
        <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
          {/* Discipline tag picks up the accent on hover/focus — a small
              selected-state cue, the only blue in the Labs grid. */}
          <span
            aria-hidden="true"
            className="transition-colors duration-200 group-hover:text-accent-strong group-focus-within:text-accent-strong"
          >
            [{tag}]
          </span>
          <span className="sr-only">{disciplineLabel}</span>
          {' · '}
          {tools}
        </p>
      </div>
      {item.liveUrl && (
        <ArrowUpRight size={13} aria-hidden="true" className="shrink-0 text-muted" />
      )}
    </div>
  );

  const card = (
    <div style={tiltStyle} className={tiltClass}>
      {media}
      {caption}
    </div>
  );

  /* Opens the study as an overlay above this page rather than navigating
   * away, so the grid keeps its scroll position underneath. */
  const inner = (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-haspopup="dialog"
      className="block w-full text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
    >
      {card}
    </button>
  );

  return (
    <motion.article
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: durations.base,
        ease,
        delay: (index % 3) * 0.07,
      }}
      className={`group relative mt-12 w-full first:mt-0 sm:mt-0 ${mobileInset} ${slotClass} ${firstClass}`}
    >
      {inner}
    </motion.article>
  );
}

export default function LabGrid() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  /** The study shown in the overlay; null = closed. The grid stays
   *  mounted underneath so its scroll position survives. */
  const [openStudy, setOpenStudy] = useState<LabItem | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // The overlay and persistent dock stay interactive; only the page content
  // beneath the overlay becomes inert.
  useEffect(() => {
    if (!backgroundRef.current) return;
    backgroundRef.current.inert = openStudy !== null;
  }, [openStudy]);

  const total = String(lab.length).padStart(3, '0');

  return (
    <section aria-labelledby="lab-heading" className="relative overflow-x-clip">
      <div ref={backgroundRef}>
        {/* Graph-paper ground — faint dotted guides, line token, static. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(var(--color-line) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div className="relative mx-auto w-full max-w-site px-5 pb-28 pt-14 sm:px-8 sm:pt-20">
        {/* Header — eyebrow + archive count tag + one quiet line. */}
        <motion.header
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.slow, ease }}
          className="text-center"
        >
          <div className="flex items-start justify-center gap-2 sm:gap-3">
            {/* Display-scale page title — the archive's masthead, sized in
                the Hero/Contact display language rather than as an eyebrow. */}
            <h1
              id="lab-heading"
              className="font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[0.01em] text-ink"
            >
              {t('lab.title')}
            </h1>
            {/* Item count — a quiet archive marker beside the masthead. */}
            <span
              className="mt-1 font-mono text-[0.6875rem] text-muted sm:mt-2 sm:text-xs"
              aria-label={`${lab.length}`}
            >
              [{total}]
            </span>
          </div>
          <p className="mx-auto mt-5 max-w-md text-balance text-sm leading-relaxed text-muted sm:mt-6">
            {t('lab.intro')}
          </p>
        </motion.header>

        {/* Scattered worktable — cyclic recipe, grows with the data.
            Never opacity-gated on the intro: the overlay simply covers it,
            so the archive is visible even if the intro never runs. */}
        <div className="mt-14 sm:flex sm:flex-wrap sm:items-start lg:mt-20">
          {lab.map((item, index) => (
            <LabTile
              key={item.id}
              item={item}
              index={index}
              reducedMotion={reducedMotion}
              onOpen={setOpenStudy}
            />
          ))}
        </div>
        </div>
      </div>

      {/* Detail overlay — rendered above this page, never replacing it. */}
      <LabStudyOverlay item={openStudy} onClose={() => setOpenStudy(null)} />
    </section>
  );
}
