import { moreProjects } from '@/data/projectCatalog';
import type { MoreWorkItem, MoreWorkTile } from '@/types/moreWork';

const tilesByProject: Record<string, MoreWorkTile[]> = {
  datnie: [
    { kind: 'video', src: '/projects/datnie/images/figma.mp4', poster: '/projects/datnie/images/figma-poster.webp', aspect: 'wide' },
    { kind: 'video', src: '/projects/datnie/images/grabcard.mp4', poster: '/projects/datnie/images/grabcard-poster.webp', aspect: 'square' },
    { kind: 'video', src: '/projects/datnie/images/trainshot.mp4', poster: '/projects/datnie/images/trainshot-poster.webp', aspect: 'wide' },
  ],
  'lets-make-a-wish': [
    { kind: 'video', src: '/projects/pray-for-blessing/images/gif-wish.mp4', poster: '/projects/pray-for-blessing/images/gif-wish-poster.webp', aspect: 'wide' },
    { kind: 'video', src: '/projects/pray-for-blessing/images/gif-drum.mp4', poster: '/projects/pray-for-blessing/images/gif-drum-poster.webp', aspect: 'square' },
    { kind: 'video', src: '/projects/pray-for-blessing/images/gif-lantern.mp4', poster: '/projects/pray-for-blessing/images/gif-lantern-poster.webp', aspect: 'tall' },
  ],
  'personal-carbon-neutral': [
    { kind: 'video', src: '/projects/carbon-neutral/images/scm-lifecycle.mp4', poster: '/projects/carbon-neutral/images/scm-lifecycle-poster.webp', aspect: 'wide' },
    { kind: 'video', src: '/projects/carbon-neutral/images/lcm-formation.mp4', poster: '/projects/carbon-neutral/images/lcm-formation-poster.webp', aspect: 'square' },
    { kind: 'video', src: '/projects/carbon-neutral/images/ar-prototype-demo.mp4', poster: '/projects/carbon-neutral/images/ar-prototype-demo-poster.webp', aspect: 'wide' },
  ],
};

export const moreWork: MoreWorkItem[] = moreProjects.map((project) => ({
  ...project,
  meta: project.year ? `${project.category} · ${project.year}` : project.category,
  metaZh: project.year ? `${project.categoryZh} · ${project.year}` : project.categoryZh,
  linkKind: 'project',
  tiles: tilesByProject[project.id] ?? [],
}));
