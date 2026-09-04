# Global Case Study Design System

> **Canonical visual reference: Signie.**
>
> Read this document before implementing or revising any project detail page. When another case-study implementation conflicts with this document or the approved Signie implementation, follow Signie unless explicitly instructed otherwise.

This is an extraction of the current approved Signie implementation, not a new visual system. Project-specific Hero art direction and narrative media composition may vary, but typography, navigation, hierarchy, grid behavior, explanatory-media grammar, contribution treatment, outcome logic, and the ending transition are shared.

## 1. Shared implementation sources

- Typography tokens: `app/globals.css`, classes prefixed `case-`
- Canonical renderer: `components/CaseStudyPage.tsx`
- Global project header: `components/ProjectSequenceNav.tsx`, `mode="case-header"`
- Media renderer and compositions: `Media` and `MediaBlock` in `components/CaseStudyPage.tsx`
- Canonical ending: `components/NextProjectTransition.tsx`
- Canonical sequence: `data/projectCatalog.ts` through `data/projectSequence.ts`

Do not create project-prefixed typography or duplicate the shared header, media, or next-project behavior inside a project component.

## 2. Global Case Study header

```text
01 ─── 02 ─── 03 ─── 04 ─── 05 ─── 06 ─── 07

← ALL PROJECTS          MEDIUM / INTERACTION / SUBJECT

                [ subtle 1px structural divider ]

PROJECT HERO
```

- Use `ProjectSequenceNav` in `case-header` mode.
- Desktop height is compact: `116px`.
- The utility row uses the shared `max-w-site`, 12-column grid, and 32px desktop gutter.
- All Projects occupies 3 columns; the descriptor occupies 9 and is right-aligned.
- At `lg` widths the descriptor uses `white-space: nowrap`; at narrower widths it may wrap when necessary.
- Mobile retains the existing compact counter and expandable direct-navigation list.
- The background is the global warm neutral `bg-bg`.
- No cards, glass, shadow, or dark translucent treatment.
- One `1px border-line` is allowed at the bottom of this header. It is aligned to `max-w-site`.
- No other editorial horizontal divider is allowed after the Hero.

## 3. Grid principle

**CONSISTENT GRID, VARIABLE MEDIA SCALE.**

- Shared editorial container: `max-w-site` for canonical pages; project-specific cinematic full bleed may exceed it intentionally.
- Shared desktop grid: 12 columns with `gap-x-8` (32px).
- Mobile collapses to a single readable flow.
- Media scale follows narrative importance. Source resolution never determines layout width.
- Different projects may use different Hero and media rhythms; they must still align to the shared grid and explanatory-media grammar.

## 4. Typography

The loaded families are:

- Display: `Barlow Condensed`, then the `font-display` fallback stack defined in `tailwind.config.ts`.
- Mono: the Tailwind/system monospace stack.
- Body: the global system sans stack defined on `body`.

All values below are consumed through the shared semantic classes in `app/globals.css`.

| Role | Exact approved Signie implementation |
|---|---|
| `case-project-title` | `font-display`; `clamp(4.5rem,12vw,11rem)`; 800; line-height `.76`; tracking `-.015em`; uppercase; `text-ink` |
| `case-section-title` | `font-display`; `clamp(1.9rem,3.6vw,3.75rem)`; 700; line-height `.94`; tracking `.005em`; uppercase; `text-ink` |
| `case-stage-title` | `font-display`; `clamp(1.5rem,3vw,2.25rem)`; 700; line-height `1.05`; tracking `.01em`; uppercase; `text-ink` |
| `case-module-title` | `font-display`; `18px → 20px`; 700; tight line-height; uppercase; `text-ink` |
| `case-lead` | body sans; `14px → 15.2px`; 400; line-height `1.75`; normal tracking/case; `text-muted`; max-width `34rem` |
| `case-body` | body sans; `14px → 15.2px`; 400; line-height `1.75`; normal tracking/case; `text-muted`; max-width `34rem` |
| `case-media-title` | mono; `10.88px`; 400; normal line-height; tracking `.14em`; uppercase; `text-ink` |
| `case-media-caption` | body sans; `12px → 14px`; 400; relaxed line-height; normal tracking/case; `text-muted` |
| `case-category-label` | mono; `10.88px`; 400; normal line-height; tracking `.14em`; uppercase; `text-muted` |
| `case-meta-label` | mono; `10.24px`; 400; normal line-height; tracking `.14em`; uppercase; `text-muted` |

Dark project-specific surfaces may override only the color to an accessible white opacity. They must not override family, size, weight, line-height, tracking, transform, or stretch.

### Section opening

```text
/01 LABEL

MAJOR SECTION TITLE             concise lead paragraph
                                in the right column
```

- Label: `case-category-label`.
- Title: `case-section-title`.
- Lead: `case-lead`.
- Canonical Signie relationship: title 6 columns; lead 4 columns beginning at column 8.
- Long titles wrap intentionally. Never introduce a smaller project-specific size.

## 5. Media-side titles

If a title belongs directly to explanatory media, use `case-media-title` by default.

Examples include Primary MR Experience, Flow of Memory, Gesture Recognition System, OSC / Signal Routing, and Unreal / Motion State.

The treatment is quiet and informational: black/ink, mono, regular weight, uppercase, restrained tracking. It is never the heavy condensed display treatment used by major headings.

## 6. Explanatory-media composition

Every explanatory asset forms a visual unit with its title and copy. Use the shared composition classes rather than arbitrary offsets:

- `case-media-split`: structured media/copy relationship, normally 8/4 or 4/8; concise text blocks are vertically centered by default.
- `case-media-split-top`: explicit top-alignment modifier for long, multi-part, technical, process, or shared-baseline content.
- `case-media-pair`: two related, equal-importance units in a 6/6 pair with equal gutter and baseline.
- `case-media-unit`: a complete media + title + caption unit.
- `case-media-stack`: vertical text/media or media/text unit with a fixed `16px` (`1rem`) gap between the complete text block and media.

Approved structures:

```text
[ MEDIA 7–8 ] [ COPY 4–5 ]
[ COPY 4–5 ] [ MEDIA 7–8 ]

[ LARGE MEDIA ]
TITLE
COPY

TITLE
COPY
[ LARGE MEDIA ]

[ MEDIA 6 ] [ MEDIA 6 ]
title       title
copy        copy
```

Do not shrink explanatory media and push it into a corner to manufacture asymmetry. Do not leave an empty half-screen without narrative purpose. Technical interfaces must remain inspectable; use `object-fit: contain` whenever cropping would remove meaningful UI, node, or software information.

### Use available side space

When a partial-width explanatory media block leaves approximately four or more grid columns available beside it, place the related label, title, and copy in that adjacent space.

Prefer a 4/8 or 5/7 unit. Vertically center concise copy; use the explicit top-alignment modifier when the content qualifies for the exception below:

```text
[ COPY 4–5 ] [ MEDIA 7–8 ]
[ MEDIA 7–8 ] [ COPY 4–5 ]
```

Do not stack copy above a partial-width frame while leaving a large unused horizontal field beside the media. A vertical copy/media stack is appropriate only when the media intentionally occupies approximately 10–12 columns or acts as a deliberate major chapter opening. Preserve the shared gutter and keep the media large enough to inspect.

### Side-by-side alignment

For concise image + copy layouts, vertically center the complete text block relative to the media. Use top alignment only when the text is long, contains multiple subsections, explains a technical/process system, or must share a top baseline with another row.

The only permitted alignment states are vertically centered and top-aligned. Do not create manual stagger with transforms, relative offsets, margins, or floating positions.

### Keep media title and description together

The category/index, media title, and explanatory copy are one inseparable text block. Media may appear above, below, left, or right of that block, but it must never separate the title from its explanation.

For vertical units, the space between that complete text block and its media is `16px` (`1rem`). Use `case-media-stack`; do not introduce project-specific margins for the same relationship.

Approved structures:

```text
CATEGORY / INDEX
MEDIA TITLE
DESCRIPTION
[ MEDIA ]

[ MEDIA ]
CATEGORY / INDEX
MEDIA TITLE
DESCRIPTION

[ MEDIA 7–8 ] [ CATEGORY / INDEX 4–5 ]
                [ MEDIA TITLE ]
                [ DESCRIPTION ]
```

Do not use `TITLE → MEDIA → DESCRIPTION`. In multi-unit rows, give the complete text headers a shared minimum height when necessary so corresponding media frames begin on the same baseline. Do not add cards, borders, or backgrounds to achieve alignment.

## 7. Spacing

- Major-section separation comes from whitespace, not rules.
- Section rhythm may vary with narrative density, using the Signie renderer's established sparse/medium/dense spacing options.
- Keep media titles and captions attached to their frames (`mt-3`/`mt-4`, then `mt-2` between title and caption).
- Related media groups use the renderer's shared tight/normal/loose spacing options.
- Avoid one-off offsets that detach a visual from its explanation.

## 8. Contribution

Contribution is editorial ownership/credits, not a services section.

- Use quiet category labels and concise body descriptions.
- No capability cards, service cards, icons, decorative boxes, or dashboard modules unless explicitly required by the content.
- Maintain the shared label/body hierarchy and grid.

## 9. Outcome

**LARGE RESULT STATEMENT + CONCRETE EVIDENCE.**

- The result statement may receive strong display emphasis.
- Pair it with verifiable evidence: award image, shipped artifact, measured result, or equivalent.
- Background and color may vary by project.
- Do not dilute the ending with generic reflection copy.

## 10. Horizontal dividers

Allowed:

- Exactly one subtle structural divider between the global Case Study header and the project Hero.

Not allowed:

- Hero → Section 01
- Section → section
- Contribution → Outcome
- Between media groups
- Before the canonical Next Project transition

After the Hero, hierarchy is created through typography, spacing, grid, media scale, and sequencing.

## 11. Next Project

Every project detail page ends with the shared `NextProjectTransition`. Recommendation footers, multiple cards, `You May Also Like`, and three-project grids are not allowed.

The next project comes from the canonical `projectCatalog` order through `nextSequenceEntry`; project 07 wraps to project 01.

Required behavior:

- `/ NEXT PROJECT`, Scroll Down, next title, metadata, preview media, and progress indicator.
- Vertical-scroll-driven and reversible before commit.
- Route commit only at the shared takeover threshold.
- No blank/white transition frame.
- The teaser resolves toward the incoming Hero rather than cutting to an unrelated card.
- The title remains a real link for keyboard and assistive-technology access.
- Reduced-motion behavior is handled by the shared component.

Never recreate this interaction inside a project component.

## 12. Project-specific freedom

The following may vary when the narrative requires it:

- Hero background, media type, color, and light/dark treatment.
- Full-bleed versus contained Hero composition.
- Media scale and sequencing within the approved composition grammar.
- Outcome background treatment.

Variation must not introduce new typography roles, duplicate global navigation, arbitrary stagger, post-Hero dividers, or alternative project-recommendation endings.

## 13. Pre-merge checklist

- Read this document and inspect the current Signie page.
- Uses shared `case-*` typography roles with no project-local approximations.
- Uses shared `case-header` navigation and descriptor.
- Has only the one header-to-Hero divider.
- Media-side titles use `case-media-title`.
- Explanatory media is paired with its copy and remains legible.
- Technical UI uses contain where cropping would hide evidence.
- Contribution reads as ownership, not services.
- Outcome pairs a result with evidence.
- Ends with `NextProjectTransition` sourced from canonical sequence.
- No `You May Also Like` or recommendation-card grid.

## 14. Static information must not look interactive

Process diagrams, sequences, arrows, labels, and status indicators must communicate their interaction state honestly.

If an element is not clickable:

- Do not style it as a button, tab, accordion, or navigation control.
- Do not use the interaction/accent color as a false affordance.
- Do not add hover, focus, cursor, pressed, or expand/collapse behavior.
- Use restrained neutral connectors when sequence needs to be shown.
- Keep static diagrams visually distinct from the global project navigation and real controls.

Prefer a small number of meaningful stages over fragmented UI-like rows. Pair the diagram with its evidence using the shared 4/8 or 5/7 explanatory-media composition.
## 15. Media fit and frame behavior

Media must visually fill its assigned layout area.

- Media uses the full width/height of its assigned grid frame.
- Preserve the source aspect ratio. Never stretch or distort media.
- Use `object-fit: cover` when cropping non-essential visual areas is safe.
- Use `object-fit: contain` when cropping would remove meaningful UI, diagrams, text, nodes, or technical evidence.
- Do not place a small image inside a larger padded neutral wrapper.
- Do not add decorative inner frames, background panels, padding, borders, or card-like containers around editorial media unless explicitly required.
- The layout frame determines media scale; the native source dimensions do not.

The goal is:
MEDIA FITS THE LAYOUT,
not
SMALL MEDIA FLOATING INSIDE A LARGER BOX.


## 16. No media/text collision

Text and media must never unintentionally overlap, cover, clip, or collide.

Every text block and media block must have a clear layout area.

If space becomes insufficient, resolve it by:
1. improving line breaks,
2. adjusting the shared column ratio,
3. reducing media size,
4. adjusting the heading within the approved responsive typography scale,
5. switching to a clean stacked composition.

Never solve insufficient space by allowing media to cover typography.

Exception:
intentional Hero background-media + text-overlay compositions are allowed only when the overlay remains fully readable and occupies a deliberate safe area.

Outcome sections are NOT exempt from this rule.


## 17. Exact media/text spacing

For stacked explanatory units:

MEDIA
↓ 16px mobile / 20px desktop
MEDIA TITLE
↓ 8px mobile / 10px desktop
DESCRIPTION

or the exact inverse when text appears above media.

Do not introduce project-specific margins for these relationships.

For side-by-side units, use the shared grid gutter.


## 18. Responsive media composition

Side-by-side explanatory layouts must collapse into a single-column structure on mobile.

The complete text block remains inseparable:

CATEGORY / INDEX
MEDIA TITLE
DESCRIPTION

Desktop:
[ TEXT ][ MEDIA ]
or
[ MEDIA ][ TEXT ]

Mobile:
TEXT
MEDIA

or:

MEDIA
TEXT

Do not keep narrow two-column explanatory layouts on mobile.

Do not separate the media title from its explanation during responsive reflow.


## 19. Persistent UI safe area

Case-study content must remain readable and unobstructed by persistent global UI.

- Important media content, captions, Outcome evidence, and Next Project controls must not sit beneath the fixed bottom dock.
- Reserve sufficient bottom safe area:
  `dock height + env(safe-area-inset-bottom) + breathing room`.
- Verify desktop and mobile independently.
- Do not position key media focal points directly behind persistent navigation.


## 20. Outcome composition constraints

Outcome may vary in background, color, scale, and visual drama, but it still obeys all global composition rules.

Outcome must follow:

RESULT STATEMENT + CONCRETE EVIDENCE

while preserving:
- no text/media overlap
- readable typography
- shared grid logic
- intentional media scale
- sufficient gutter
- media fit rules
- persistent UI safe areas

If a large result statement and evidence image do not fit side-by-side:
adjust the column ratio, line breaks, media scale, or use a stacked composition.

Never allow evidence media to cover the result statement.