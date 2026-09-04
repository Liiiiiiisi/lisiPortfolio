/**
 * Typed data model for Labs — a playground / archive of experiments,
 * visual studies, technical tests and selected earlier work.
 * Content lives in data/lab.ts — never inside components.
 *
 * Labs entries are deliberately LIGHTER than projects: a title, one short
 * intro, minimal metadata and then a sequence of media. There is no
 * chapter system, no Role/Team/Outcome block and no sequence navigation —
 * that vocabulary belongs to the case-study pages only.
 *
 * Metadata reads "INTERACTION STUDY · 2024" plus a tools line, built from
 * a structured discipline (locale-labelled, filterable later) and a
 * free-text tools string. There is no numbering, by design.
 */

export type LabDiscipline =
  | 'interaction'
  | 'motion'
  | 'editorial'
  | 'technical'
  | 'archive';

/** Media aspect controls tile height inside its slot's width. */
export type LabTileAspect = 'ultra' | 'wide' | 'square' | 'tall' | 'phone';

/** Prefer MP4 ('video') over GIF for motion content. */
export type LabMediaKind = 'image' | 'video' | 'gif';

/**
 * Detail-page media rhythm — the page alternates between these:
 *   'full'  edge-to-edge, breaks the container (the big moments)
 *   'inset' sits within the grid with ground around it (breath)
 *   'half'  two CONSECUTIVE half items pair up side by side
 */
export type LabMediaLayout = 'full' | 'inset' | 'half';

export interface LabMedia {
  kind: LabMediaKind;
  /** Media path under public/; null renders a neutral surface block. */
  src: string | null;
  poster?: string;
  aspect: LabTileAspect;
  layout: LabMediaLayout;
  alt?: string;
  altZh?: string;
}

/** Slot size intent for the index grid. */
export type LabSize = 'L' | 'M' | 'S';

export interface LabItem {
  id: string;
  /** Unique slug. The detail route is DERIVED from it (/labs/<slug>/). */
  slug: string;
  title: string;
  titleZh: string;
  discipline: LabDiscipline;
  /** Free-text medium/tooling, e.g. "Unity / XR". */
  tools: string;
  toolsZh?: string;
  year: string;
  /** One concise paragraph — the only prose on the detail page. */
  intro: string;
  introZh: string;

  /* ---- Index-grid tile ---- */
  kind: LabMediaKind;
  /** Grid thumbnail path; null = neutral surface block. */
  src: string | null;
  aspect: LabTileAspect;
  alt?: string;
  altZh?: string;
  poster?: string;
  size: LabSize;

  /* ---- Detail page ---- */
  /** The media sequence that carries the story. */
  media: LabMedia[];
  /** Optional live/external link shown alongside the intro. */
  liveUrl?: string | null;
}
