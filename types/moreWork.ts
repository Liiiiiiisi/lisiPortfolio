import type { ProjectCatalogEntry } from '@/types/project';

/**
 * Typed data model for the More Work index (homepage section between
 * Featured Work and Contact). Content lives in data/moreWork.ts — never
 * inside components or animation logic.
 */

/** Tile shapes — every strip renders at ONE fixed height; aspect only
 *  affects tile WIDTH, keeping the band a continuous editorial filmstrip. */
export type MoreWorkTileAspect = 'wide' | 'square' | 'phone' | 'tall';

/** Prefer MP4 ('video') over GIF for motion content — better quality and
 *  performance; 'gif' is still supported for quick drops. */
export type MoreWorkMediaKind = 'image' | 'video' | 'gif';

export interface MoreWorkTile {
  kind: MoreWorkMediaKind;
  /** Media path under public/; null = neutral surface block until real
   *  content lands (no visible placeholder captions in the design). */
  src: string | null;
  aspect: MoreWorkTileAspect;
  /** Accessible description; empty/omitted = decorative. */
  alt?: string;
  altZh?: string;
  /** Poster frame for kind 'video'. */
  poster?: string;
}

/** CTA semantics — label and tab behaviour follow the destination:
 *  'project' / 'caseStudy' are internal (same tab, →);
 *  'external' is a live site (new tab, ↗). */
export type MoreWorkLinkKind = 'project' | 'caseStudy' | 'external';

export interface MoreWorkItem extends ProjectCatalogEntry {
  /** Compact category / year line, e.g. "XR / Unity · 2023". */
  meta: string;
  metaZh: string;
  /** Chooses the CTA wording. 'external' additionally requires liveUrl. */
  linkKind: MoreWorkLinkKind | null;
  /** Optional live-site URL, only used when linkKind is 'external'. */
  liveUrl?: string | null;
  /** 3–5 tiles; use as many as the material deserves, never pad to five. */
  tiles: MoreWorkTile[];
}
