import { heroMediaFor } from '@/data/projectHeroMedia';
import { getCaseStudy } from '@/data/caseStudies';
import { withBasePath } from '@/lib/paths';
import type { SequenceEntry } from '@/data/projectSequence';

export const CASE_HANDOFF_SHOW = 'case-handoff-show';
export const CASE_HERO_READY = 'case-hero-ready';

export interface CaseHandoffPayload {
  id: string;
  order: number;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  metaLine?: string;
  metaLineZh?: string;
  heroSrc: string;
  previewPoster: string;
  poster: string;
}

let preloadCache: {
  projectId?: string;
  poster?: HTMLImageElement;
  video?: HTMLVideoElement;
} = {};

function payloadFor(next: SequenceEntry): CaseHandoffPayload {
  const media = heroMediaFor(next.id);
  const study = getCaseStudy(next.project);
  return {
    id: next.id,
    order: next.project.order,
    title: next.title,
    titleZh: next.titleZh,
    description: next.description,
    descriptionZh: next.descriptionZh,
    metaLine: [study?.year, study?.discipline].filter(Boolean).join(' · ') || undefined,
    metaLineZh: [study?.year, study?.disciplineZh].filter(Boolean).join(' · ') || undefined,
    heroSrc: media.src,
    previewPoster: next.poster,
    poster: media.poster ?? media.src,
  };
}

/** Warm the exact incoming Hero poster and video once transition intent is clear. */
export function preloadCaseHandoff(next: SequenceEntry) {
  if (typeof window === 'undefined' || preloadCache.projectId === next.id) return;
  preloadCache.projectId = next.id;
  const media = heroMediaFor(next.id);

  const image = new Image();
  image.src = withBasePath(media.poster ?? media.src);
  image.decode().catch(() => {
    // The image load itself still warms the browser cache if decode is unavailable.
  });
  preloadCache.poster = image;

  if (media.kind === 'video') {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = withBasePath(media.src);
    video.load();
    preloadCache.video = video;
  }
}

export function showCaseHandoff(next: SequenceEntry) {
  if (typeof window === 'undefined') return;
  preloadCaseHandoff(next);
  window.dispatchEvent(new CustomEvent<CaseHandoffPayload>(CASE_HANDOFF_SHOW, { detail: payloadFor(next) }));
}

/** Fired by a mounted Hero after its media and layout are drawable. */
export function announceCaseHeroReady(heroSrc: string) {
  if (typeof window === 'undefined') return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent<string>(CASE_HERO_READY, { detail: heroSrc }));
    });
  });
}

export function clearCaseHandoffPreload() {
  if (preloadCache.video) {
    preloadCache.video.pause();
    preloadCache.video.removeAttribute('src');
    preloadCache.video.load();
  }
  preloadCache = {};
}
