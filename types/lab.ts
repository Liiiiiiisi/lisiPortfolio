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

/** Optional short editorial text paired with one media item — generic and
 *  reusable across any Lab entry, not specific to any one study. When
 *  present, the media renders beside this text (media left, text right) on
 *  desktop, and stacks with the text below on mobile, regardless of the
 *  media's own `layout` value. */
export interface LabMediaStory {
  heading: string;
  headingZh: string;
  body: string;
  bodyZh: string;
  /** Desktop column split for this media+story row. Omit for the default
   *  even split (50/50); `true` gives the media column an asymmetric,
   *  editorial majority (roughly 70/30) while keeping the text column
   *  small, left-aligned and unchanged in every other respect. */
  wideImage?: boolean;
}

/** Standalone editorial text aside. `heading`/`headingZh` are optional —
 *  omit both for a plain aside with no mono label above the body. */
export interface LabTextNote {
  heading?: string;
  headingZh?: string;
  body: string;
  bodyZh: string;
  /** Pulls this note closer to the block above it, reducing (not
   *  removing) the standard block gap — for a note meant to read as the
   *  caption/conclusion of the preceding media rather than an isolated
   *  text section. */
  tightenAbove?: boolean;
  /** Adds extra breathing space below this note, on top of the standard
   *  block gap — for a note that precedes a visual "ending" moment and
   *  needs a clearer pause before it. */
  roomyBelow?: boolean;
}

/** One labelled step in a `LabMediaDiagram` flow. */
export interface LabDiagramStep {
  label: string;
  labelZh: string;
}

/** One term definition supporting a `LabMediaDiagram`. */
export interface LabDiagramLabel {
  term: string;
  termZh: string;
  body: string;
  bodyZh: string;
}

/** Generic, reusable editorial schematic: a short labelled flow (and an
 *  optional parallel flow), optional term definitions, and an optional
 *  short example line. Renders as plain typographic content — no boxes,
 *  dividers or dashboard chrome — consistent with the rest of a Lab
 *  detail page. */
export interface LabMediaDiagram {
  flow: LabDiagramStep[];
  secondaryFlow?: LabDiagramStep[];
  labels?: LabDiagramLabel[];
  /** Short standalone caption lines rendered beneath the flow(s) — lighter
   *  than `labels` (no per-term heading), for a couple of plain
   *  supporting sentences. */
  supportingLines?: { text: string; textZh: string }[];
  example?: string;
  exampleZh?: string;
}

export interface LabMedia {
  kind: LabMediaKind;
  /** Media path under public/; null renders a neutral surface block. */
  src: string | null;
  poster?: string;
  aspect: LabTileAspect;
  layout: LabMediaLayout;
  alt?: string;
  altZh?: string;
  /** Optional editorial text block placed beside this media. See
   *  `LabMediaStory`. Omit for a plain media block (the default). */
  story?: LabMediaStory;
  /** How the image/poster fills its aspect-ratio box. Omit for the default
   *  'cover' (fills the box, may crop). 'contain' shows the full frame
   *  uncropped, letterboxed against the surrounding surface color — use
   *  when the whole composition must stay readable. */
  fit?: 'cover' | 'contain';
  /** Anchor for a 'cover' crop, when the box ratio doesn't match the
   *  source image and something in particular (a face, a sign) must stay
   *  in frame. Omit for the default center crop. Has no effect with
   *  `fit: 'contain'`. */
  objectPosition?: 'top' | 'center' | 'bottom';
  /** Small mono label rendered beneath this media (e.g. "PHYSICAL INPUT").
   *  Generic and reusable — an independent caption, unrelated to `story`. */
  caption?: string;
  captionZh?: string;
  /** Standalone editorial text aside that REPLACES this entry's media
   *  entirely — no image/video renders, just a short heading + body in
   *  the page rhythm. Generic and reusable for a concept note or a brief
   *  aside between media items. Mutually exclusive with `story` and
   *  `diagram`; when present, `src`/`kind` are ignored. */
  note?: LabTextNote;
  /** Standalone editorial schematic — a labelled flow diagram — that
   *  REPLACES this entry's media entirely. Generic and reusable for any
   *  Lab needing to explain a mechanism without a literal photo/video.
   *  Mutually exclusive with `story` and `note`; when present, `src`/
   *  `kind` are ignored. */
  diagram?: LabMediaDiagram;
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
  /** Optional short, visually prominent opening line shown above `intro`.
   *  When present, `intro` renders as a smaller, quieter secondary line
   *  instead of the single large paragraph used when this is omitted. */
  introLead?: string;
  introLeadZh?: string;
  /** One concise paragraph — the only prose on the detail page (secondary,
   *  quieter line when `introLead` is present). */
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
