'use client';

/**
 * MoreWork — vertically scrolling index of additional projects, rendered
 * between Featured Work and Contact. Interaction reference:
 * evasanchez.info/index (+ provided screen recording); adapted to this
 * site's tokens and type system.
 *
 * Phase 1 tuning notes (initial values; revisit with all Phase 2 media):
 *   - Every strip currently renders at one shared height.
 *     Aspect ratios only change tile WIDTH (wide → narrow → square …), so
 *     the section reads as a continuous filmstrip, never jumping in height
 *     because of portrait media.
 *   - THE single signature interaction: each strip auto-scrolls
 *     horizontally — very slow (42/48/54s initially, slightly different per
 *     row so strips never move in lockstep), one consistent direction,
 *     purely visual. The user only ever scrolls the page vertically; no
 *     drag or swipe. Looping is seamless: the track renders the tile set
 *     twice and translates exactly one copy-width (each copy carries its
 *     own trailing gap so the −50% loop point is pixel-perfect — no
 *     visible reset). The media itself (GIF/video later) provides the
 *     visual energy; the crawl just gives the section continuous flow.
 *     Rhythm of the page: Featured Work = scroll actively changes
 *     projects → More Work = visuals quietly flow past → Contact = motion
 *     resolves. Same behaviour on mobile (~1.2–1.6 tiles visible).
 *   - Meta row stays concise (number / title / one line / category · year /
 *     CTA) — this is an index, not a mini case study. Everything is always
 *     visible; nothing depends on hover.
 *   - No visible placeholder captions: tiles without media render as
 *     neutral surface blocks.
 *   - CTA follows the destination: internal project/case-study links are
 *     same-tab (→); only external live sites open a new tab (↗). Hidden
 *     entirely while href is null.
 *
 * Motion: rows fade up on first arrival (site-wide rule); auto-scroll as
 * above; reduced motion = fades only, strips static. No further reveal /
 * flip / scale / sticky / hover mechanics by design — this section is the
 * calm between Featured Work and Contact.
 *
 * Plumbing: z-20 sits above the Featured Work sheet (z-10) and below the
 * Contact curtain (z-30). Both sections share --contact-runway so the
 * three-row filmstrip-to-contact transition cannot drift independently.
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { moreWork } from '@/data/moreWork';
import { projectHref } from '@/data/projectCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { fadeUp, useMotionVariants, usePrefersReducedMotion, viewportOnce } from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import LazyVideo from '@/components/LazyVideo';
import type { MoreWorkItem, MoreWorkTile, MoreWorkTileAspect } from '@/types/moreWork';

/** Initial Phase 1 band height; tune after the remaining real media lands. */
const STRIP_HEIGHT = 'clamp(200px, 30vw, 440px)';

/** Initial Phase 1 loop timing; tune after the remaining real media lands. */
const LOOP_BASE_S = 42;
const LOOP_STEP_S = 6;

const ASPECT_CLASS: Record<MoreWorkTileAspect, string> = {
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
  phone: 'aspect-[9/16]',
  tall: 'aspect-[4/5]',
};

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function Tile({
  tile,
  isZh,
  href,
  title,
  ariaHidden,
  finePointer,
}: {
  tile: MoreWorkTile;
  isZh: boolean;
  /** Destination for the whole tile — the same page as the row's CTA. */
  href: string | null;
  title: string;
  /** True for the duplicated marquee copy: no extra tab stops or labels. */
  ariaHidden?: boolean;
  finePointer: boolean | null;
}) {
  const { t } = useLanguage();
  const alt = (isZh ? tile.altZh : tile.alt) ?? '';
  /* Lens applies to the media itself, not the bordered frame — warping a
   * hairline border would make the tile outline wobble. */
  const lensStyle = useScrollLensStyle();

  const frame = (
    <div
      style={{ height: STRIP_HEIGHT }}
      className={`${ASPECT_CLASS[tile.aspect]} relative h-full shrink-0 overflow-hidden rounded-2xl border border-line bg-surface`}
    >
      {tile.src && tile.kind === 'video' ? (
        <LazyVideo
          src={tile.src}
          poster={tile.poster}
          alt={alt}
          style={lensStyle}
          className="h-full w-full object-cover"
        />
      ) : tile.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export with unoptimized images, consistent with the rest of the site
        <img
          src={withBasePath(tile.src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={lensStyle}
          className="h-full w-full object-cover"
        />
      ) : null /* neutral surface block until media lands */}

      {/* Fine-pointer hover affordance: intentionally quieter than the
          Featured Work cursor marker so this filmstrip remains secondary. */}
      {href && finePointer === true && (
        <span className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
          <span className="inline-flex h-10 items-center border border-ink/20 bg-[rgb(250_246_241/0.82)] px-4 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink opacity-0 shadow-[0_2px_8px_rgba(27,25,23,0.06)] backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:scale-[1.02] group-hover:opacity-100 group-focus-visible:opacity-100">
            {t('work.viewProject')} ↗
          </span>
        </span>
      )}
      {href && finePointer === false && (
        <span className="pointer-events-none absolute bottom-3 right-3 bg-[rgb(250_246_241/0.88)] px-2 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink backdrop-blur-sm" aria-hidden="true">
          {isZh ? '查看' : 'View'} ↗
        </span>
      )}
    </div>
  );

  if (!href) return frame;

  return (
    <Link
      href={href}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      aria-label={ariaHidden ? undefined : `${t('work.viewProject')} — ${title}`}
      className="group block shrink-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
    >
      {frame}
    </Link>
  );
}

function RowCta({ item, isZh }: { item: MoreWorkItem; isZh: boolean }) {
  const { t } = useLanguage();
  /* Route is derived from this entry's own slug — never hardcoded, so
   * More Work 05 always opens Project Detail 05. */
  const href = item.linkKind === 'external' ? item.liveUrl : projectHref(item);
  if (!href) return null;

  const ctaClass =
    'inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-ink underline-offset-4 transition-colors hover:text-accent-strong hover:underline';
  const label =
    item.linkKind === 'external'
      ? t('moreWork.visitSite')
      : item.linkKind === 'caseStudy'
        ? t('work.caseStudy')
        : t('work.viewProject');
  const ariaLabel = `${label} — ${isZh ? item.titleZh : item.title}`;

  if (item.linkKind === 'external') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={ctaClass}
      >
        {label}
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={ctaClass}>
      {label}
      <ArrowRight size={13} aria-hidden="true" />
    </Link>
  );
}

/** One copy of the tile set. Each copy carries its own trailing gap
 *  (pr matches the internal gap) so the duplicated track's −50% loop
 *  point aligns pixel-perfectly — the seam is invisible. */
function StripTiles({
  item,
  isZh,
  ariaHidden,
  finePointer,
}: {
  item: MoreWorkItem;
  isZh: boolean;
  ariaHidden?: boolean;
  finePointer: boolean | null;
}) {
  const title = isZh ? item.titleZh : item.title;
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
    >
      {item.tiles.map((tile, tileIndex) => (
        <Tile
          key={`${item.id}-tile-${tileIndex}`}
          tile={tile}
          isZh={isZh}
          href={projectHref(item)}
          title={title}
          ariaHidden={ariaHidden}
          finePointer={finePointer}
        />
      ))}
    </div>
  );
}

function StripRow({
  item,
  rowIndex,
  reducedMotion,
  finePointer,
}: {
  item: MoreWorkItem;
  rowIndex: number;
  reducedMotion: boolean;
  finePointer: boolean | null;
}) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const revealVariants = useMotionVariants(fadeUp);

  /* Slow, seamless, uniform-direction auto-scroll — the section's single
   * signature interaction. Static under reduced motion. */
  const loopSeconds = LOOP_BASE_S + rowIndex * LOOP_STEP_S;

  const title = isZh ? item.titleZh : item.title;
  const description = isZh ? item.descriptionZh : item.description;
  const meta = isZh ? item.metaZh : item.meta;
  const number = pad(item.order);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={revealVariants}
      aria-labelledby={`more-work-title-${item.id}`}
      className="mt-20 first:mt-12 sm:mt-32 sm:first:mt-16"
    >
      {/* Meta row — concise, always fully visible (never hover-dependent). */}
      <div className="mx-auto grid w-full max-w-site grid-cols-1 gap-1.5 px-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-8">
        <p className="font-mono text-xs text-muted sm:col-span-1" aria-hidden="true">
          {number}
        </p>
        <h3
          id={`more-work-title-${item.id}`}
          className="font-display text-xl font-bold uppercase tracking-[0.01em] text-ink sm:col-span-4 sm:text-2xl"
        >
          {title}
        </h3>
        <div className="min-w-0 sm:col-span-5">
          <p className="truncate text-xs leading-relaxed text-muted">{description}</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted/80">
            {meta}
          </p>
        </div>
        <div className="sm:col-span-2 sm:text-right">
          <RowCta item={item} isZh={isZh} />
        </div>
      </div>

      {/* Filmstrip — fixed band height, full-bleed, slow seamless crawl.
          Track renders the tile set twice; translating −50% = exactly one
          copy-width, so the loop never visibly resets. */}
      <motion.div
        animate={reducedMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: loopSeconds, ease: 'linear', repeat: Infinity }
        }
        className="mt-5 flex w-max will-change-transform sm:mt-6"
      >
        <StripTiles item={item} isZh={isZh} finePointer={finePointer} />
        <StripTiles item={item} isZh={isZh} ariaHidden finePointer={finePointer} />
      </motion.div>
    </motion.article>
  );
}

export default function MoreWork() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const revealVariants = useMotionVariants(fadeUp);
  const [finePointer, setFinePointer] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return (
    <section
      id="more-work"
      aria-labelledby="more-work-heading"
      className="relative z-20 overflow-x-clip border-t border-line bg-bg pb-[var(--contact-runway)] pt-14 sm:pt-20"
    >
      {/* Eyebrow — matches Featured Work's label treatment. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealVariants}
        className="mx-auto w-full max-w-site px-5 sm:px-8"
      >
        <h2
          id="more-work-heading"
          className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-ink"
        >
          {t('moreWork.label')}
        </h2>
      </motion.div>

      {moreWork.map((item, rowIndex) => (
        <StripRow
          key={item.id}
          item={item}
          rowIndex={rowIndex}
          reducedMotion={reducedMotion}
          finePointer={finePointer}
        />
      ))}
    </section>
  );
}
