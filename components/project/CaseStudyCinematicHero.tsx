'use client';

import { useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import LazyVideo from '@/components/LazyVideo';
import { withBasePath } from '@/lib/paths';
import { usePrefersReducedMotion } from '@/lib/motion';
import { announceCaseHeroReady } from '@/lib/caseTransitionHandoff';

type CaseStudyCinematicHeroProps = {
  title: ReactNode;
  descriptor?: ReactNode;
  outcome?: ReactNode;
  outcomeSecondary?: ReactNode;
  proposition: ReactNode;
  role: ReactNode;
  year: ReactNode;
  team: ReactNode;
  roleLabel?: ReactNode;
  yearLabel?: ReactNode;
  teamLabel?: ReactNode;
  tools?: ReactNode;
  toolsLabel?: ReactNode;
  mediaSrc: string;
  poster?: string;
  mediaAlt: string;
  titleClassName?: string;
  mediaClassName?: string;
  scrimClassName?: string;
};

export default function CaseStudyCinematicHero({
  title,
  descriptor,
  outcome,
  outcomeSecondary,
  proposition,
  role,
  year,
  team,
  roleLabel = 'ROLE',
  yearLabel = 'YEAR',
  teamLabel = 'TEAM',
  tools,
  toolsLabel = 'TOOLS',
  mediaSrc,
  poster,
  mediaAlt,
  titleClassName = '',
  mediaClassName = '',
  scrimClassName = 'case-hero-scrim',
}: CaseStudyCinematicHeroProps) {
  const reducedMotion = usePrefersReducedMotion();
  const readyAnnouncedRef = useRef(false);
  const announceReady = useCallback(() => {
    if (readyAnnouncedRef.current) return;
    readyAnnouncedRef.current = true;
    announceCaseHeroReady(mediaSrc);
  }, [mediaSrc]);

  return (
    <div data-case-hero className="relative min-h-[92svh] bg-black text-white">
      {reducedMotion && poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export uses public-path media directly
        <img src={withBasePath(poster)} alt={mediaAlt} onLoad={announceReady} onError={announceReady} className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`} />
      ) : (
        <LazyVideo
          src={mediaSrc}
          poster={poster}
          alt={mediaAlt}
          onLoadedData={announceReady}
          onError={announceReady}
          className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
        />
      )}
      <div className={scrimClassName} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-[90rem] grid-cols-12 gap-x-6 px-5 pb-8 md:gap-x-8 md:px-10 md:pb-12">
        <div className="col-span-12 md:col-span-8">
          {descriptor && <p className="case-category-label case-overlay-label mb-5">{descriptor}</p>}
          <h1 className={`case-project-title case-overlay-title ${titleClassName}`}>{title}</h1>
          {outcome && <p className="case-stage-title case-overlay-secondary mt-5">{outcome}</p>}
          {outcomeSecondary && <p className="case-stage-title case-overlay-secondary mt-1">{outcomeSecondary}</p>}
          <p className="case-lead case-overlay-body mt-5">{proposition}</p>
        </div>
        <div className="col-span-12 mt-7 pt-5 md:col-span-4 md:mt-0 md:self-end">
          <dl className="case-meta-label grid grid-cols-2 gap-4">
            <div><dt className="case-overlay-label">{roleLabel}</dt><dd className="case-overlay-value mt-1">{role}</dd></div>
            <div><dt className="case-overlay-label">{yearLabel}</dt><dd className="case-overlay-value mt-1">{year}</dd></div>
            <div className="col-span-2"><dt className="case-overlay-label">{teamLabel}</dt><dd className="case-overlay-value mt-1">{team}</dd></div>
            {tools && <div className="col-span-2"><dt className="case-overlay-label">{toolsLabel}</dt><dd className="case-overlay-value mt-1">{tools}</dd></div>}
          </dl>
        </div>
      </div>
    </div>
  );
}
