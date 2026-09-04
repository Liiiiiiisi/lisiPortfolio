'use client';

/**
 * LabStudyContent — the actual content of a Labs study: large title, one
 * short intro, minimal metadata, then media-led storytelling at varied
 * sizes. Reference: spencergabor.com case studies.
 *
 * Shared by the overlay (the primary experience, opened from the Labs
 * grid) and the standalone /labs/<slug>/ route, so the presentation only
 * exists once. The only difference is how a 'full' media block reaches
 * full width: on the page it breaks out of the centred container to the
 * viewport edge; in the overlay it simply spans the overlay's own column.
 *
 * Deliberately free of case-study vocabulary — no numbered chapters, no
 * Role/Team/Outcome system, no sequence navigation, no cards or framing.
 */
import { Fragment, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import { useScrollLensStyle } from '@/components/ScrollLens';
import type { TranslationKey } from '@/locales/en';
import type { LabItem, LabMedia, LabTileAspect } from '@/types/lab';

const ASPECT_CLASS: Record<LabTileAspect, string> = {
  ultra: 'aspect-[21/9]',
  wide: 'aspect-[16/9]',
  square: 'aspect-square',
  tall: 'aspect-[4/5]',
  phone: 'aspect-[9/16]',
};

/** Page variant only: break out of the container without ever creating a
 *  horizontal scrollbar. */
const FULL_BLEED = 'relative ml-[calc(50%-50vw)] w-screen';

/** Plays only while visible and pauses off-screen, so a study full of
 *  GIF/video stays light — especially inside the scrolling overlay. */
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
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '10%' },
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

function Media({
  media,
  reducedMotion,
  isZh,
}: {
  media: LabMedia;
  reducedMotion: boolean;
  isZh: boolean;
}) {
  const alt = (isZh ? media.altZh : media.alt) ?? '';
  const lensStyle = useScrollLensStyle();
  return (
    <div
      style={lensStyle}
      className={`${ASPECT_CLASS[media.aspect]} w-full overflow-hidden rounded-2xl bg-surface`}
    >
      {media.src && media.kind === 'video' ? (
        reducedMotion && media.poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
          <img src={withBasePath(media.poster)} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <InViewVideo src={media.src} poster={media.poster} reducedMotion={reducedMotion} />
        )
      ) : media.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
        <img
          src={withBasePath(media.src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : null /* neutral surface block until media lands */}
    </div>
  );
}

function Reveal({
  children,
  reducedMotion,
  className,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: durations.slow, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LabStudyContent({
  item,
  variant = 'page',
  headingId,
}: {
  item: LabItem;
  /** 'overlay' keeps full-width media inside the overlay's own column. */
  variant?: 'page' | 'overlay';
  headingId?: string;
}) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const reducedMotion = usePrefersReducedMotion();

  const title = isZh ? item.titleZh : item.title;
  const intro = isZh ? item.introZh : item.intro;
  const tools = (isZh ? item.toolsZh : item.tools) ?? item.tools;
  const discipline = t(`lab.discipline.${item.discipline}` as TranslationKey);

  /* Pair consecutive 'half' blocks; everything else stands alone. */
  const blocks: LabMedia[][] = [];
  for (let i = 0; i < item.media.length; i += 1) {
    const media = item.media[i];
    const previous = blocks[blocks.length - 1];
    if (media.layout === 'half' && previous?.length === 1 && previous[0].layout === 'half') {
      previous.push(media);
    } else {
      blocks.push([media]);
    }
  }

  const fullClass = variant === 'overlay' ? 'w-full' : FULL_BLEED;

  return (
    <>
      {/* Centred header — title, one short line of context, light meta. */}
      <header className="text-center">
        <h1
          id={headingId}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.85] tracking-[0.01em] text-ink"
        >
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>

        {/* Minimal metadata — two quiet mono lines, no box system. */}
        <div className="mt-6 space-y-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted/80">
          <p>
            {discipline} · {item.year}
          </p>
          <p>{tools}</p>
        </div>

        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
          >
            {t('lab.viewLive')}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </header>

      {/* Media sequence — the actual substance of the study. */}
      <div className="mt-16 space-y-14 sm:mt-20 sm:space-y-20">
        {blocks.map((group, i) => {
          const key = `${item.id}-block-${i}`;
          if (group.length === 2) {
            return (
              <Reveal
                key={key}
                reducedMotion={reducedMotion}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
              >
                {group.map((media, j) => (
                  <Fragment key={`${key}-${j}`}>
                    <Media media={media} reducedMotion={reducedMotion} isZh={isZh} />
                  </Fragment>
                ))}
              </Reveal>
            );
          }
          const media = group[0];
          return (
            <Reveal
              key={key}
              reducedMotion={reducedMotion}
              className={media.layout === 'full' ? fullClass : 'lg:px-[10%]'}
            >
              <Media media={media} reducedMotion={reducedMotion} isZh={isZh} />
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
