/**
 * Labs archive content — all entries are PLACEHOLDERS for now. The index
 * grid and the detail pages are both data-driven, so growing the archive
 * is just appending items here (detail routes are derived from `slug`).
 *
 * When real content lands per item:
 *   - set the grid thumbnail `src` and each detail `media` entry's `src`
 *     (MP4 'video' preferred over 'gif'; add `poster` for video);
 *   - adjust `aspect` to the real media ratio;
 *   - keep `intro` to ONE concise paragraph — the media does the talking;
 *   - vary each media block's `layout` (full / inset / half) so the page
 *     keeps its rhythm. Two consecutive 'half' items pair side by side.
 */
import type { LabItem, LabMedia } from '@/types/lab';

/** Placeholder detail sequence: large → inset → paired → large → inset. */
function placeholderMedia(): LabMedia[] {
  return [
    { kind: 'image', src: null, aspect: 'wide', layout: 'full' },
    { kind: 'image', src: null, aspect: 'wide', layout: 'inset' },
    { kind: 'image', src: null, aspect: 'square', layout: 'half' },
    { kind: 'image', src: null, aspect: 'square', layout: 'half' },
    { kind: 'video', src: null, aspect: 'wide', layout: 'full' },
    { kind: 'image', src: null, aspect: 'tall', layout: 'inset' },
  ];
}

const INTRO =
  'One short placeholder paragraph describing what this experiment, study or earlier project was — what was tried, and what made it interesting. Replace with the real note; the media carries the rest.';
const INTRO_ZH =
  '一段简短的占位说明：这个实验、研究或早期项目尝试了什么，以及有趣之处。待替换为真实内容，其余由媒体呈现。';

export const lab: LabItem[] = [
  {
    id: 'lab-01',
    slug: 'study-a',
    title: 'Placeholder Study A',
    titleZh: '占位研究 A',
    discipline: 'interaction',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2025',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'wide',
    size: 'L',
    media: placeholderMedia(),
  },
  {
    id: 'lab-02',
    slug: 'study-b',
    title: 'Placeholder Study B',
    titleZh: '占位研究 B',
    discipline: 'motion',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2025',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'phone',
    size: 'S',
    media: placeholderMedia(),
  },
  {
    id: 'lab-03',
    slug: 'study-c',
    title: 'Placeholder Study C',
    titleZh: '占位研究 C',
    discipline: 'editorial',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2024',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'square',
    size: 'M',
    media: placeholderMedia(),
  },
  {
    id: 'lab-04',
    slug: 'study-d',
    title: 'Placeholder Study D',
    titleZh: '占位研究 D',
    discipline: 'technical',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2024',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'wide',
    size: 'M',
    media: placeholderMedia(),
  },
  {
    id: 'lab-05',
    slug: 'study-e',
    title: 'Placeholder Study E',
    titleZh: '占位研究 E',
    discipline: 'archive',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2023',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'tall',
    size: 'S',
    media: placeholderMedia(),
  },
  {
    id: 'lab-06',
    slug: 'study-f',
    title: 'Placeholder Study F',
    titleZh: '占位研究 F',
    discipline: 'motion',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2023',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'wide',
    size: 'L',
    media: placeholderMedia(),
  },
  {
    id: 'lab-07',
    slug: 'study-g',
    title: 'Placeholder Study G',
    titleZh: '占位研究 G',
    discipline: 'interaction',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2023',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'square',
    size: 'L',
    media: placeholderMedia(),
  },
  {
    id: 'lab-08',
    slug: 'study-h',
    title: 'Placeholder Study H',
    titleZh: '占位研究 H',
    discipline: 'editorial',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2022',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'tall',
    size: 'S',
    media: placeholderMedia(),
  },
  {
    id: 'lab-09',
    slug: 'study-i',
    title: 'Placeholder Study I',
    titleZh: '占位研究 I',
    discipline: 'technical',
    tools: 'Tool / Medium',
    toolsZh: '工具 / 媒介',
    year: '2022',
    intro: INTRO,
    introZh: INTRO_ZH,
    kind: 'image',
    src: null,
    aspect: 'wide',
    size: 'M',
    media: placeholderMedia(),
  },
];

/** Detail route for a Labs entry — derived, never hardcoded. */
export function labsHref(slug: string): string {
  return `/labs/${slug}/`;
}

export function getLabItem(slug: string): LabItem | undefined {
  return lab.find((item) => item.slug === slug);
}

/** The next study, wrapping the last back to the first. */
export function nextLabItem(slug: string): LabItem | undefined {
  const i = lab.findIndex((item) => item.slug === slug);
  if (i < 0) return undefined;
  return lab[(i + 1) % lab.length];
}
