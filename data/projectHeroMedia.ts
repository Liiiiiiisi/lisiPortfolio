export interface ProjectHeroMedia {
  kind: 'video' | 'image';
  src: string;
  poster?: string;
}

/** Canonical first-view media for each case-study Hero. */
export const projectHeroMedia: Readonly<Record<string, ProjectHeroMedia>> = {
  signie: {
    kind: 'video',
    src: '/projects/signie/videos/hero.mp4',
    poster: '/projects/signie/videos/preview-poster.webp',
  },
  'guardian-guide': {
    kind: 'video',
    src: '/projects/vr-education/videos/preview.mp4',
    poster: '/projects/vr-education/videos/preview-poster.webp',
  },
  'canopy-of-echo': {
    kind: 'video',
    src: '/projects/canopy-of-echo/images/rendered.mp4',
    poster: '/projects/canopy-of-echo/images/rendered-poster.webp',
  },
  'the-micro-invasion': {
    kind: 'video',
    src: '/projects/micro-invasion/videos/preview.mp4',
    poster: '/projects/micro-invasion/videos/preview-poster.webp',
  },
  datnie: {
    kind: 'video',
    src: '/projects/datnie/videos/preview.mp4',
    poster: '/projects/datnie/videos/preview-poster.webp',
  },
  'lets-make-a-wish': {
    kind: 'video',
    src: '/projects/pray-for-blessing/images/gif-lantern.mp4',
    poster: '/projects/pray-for-blessing/images/gif-lantern-poster.webp',
  },
  'personal-carbon-neutral': {
    kind: 'video',
    src: '/projects/carbon-neutral/videos/preview.mp4',
    poster: '/projects/carbon-neutral/videos/preview-poster.webp',
  },
};

export function heroMediaFor(projectId: string): ProjectHeroMedia {
  const media = projectHeroMedia[projectId];
  if (!media) throw new Error(`Missing canonical Hero media for project: ${projectId}`);
  return media;
}
