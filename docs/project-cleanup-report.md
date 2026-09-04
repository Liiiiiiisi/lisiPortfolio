# Portfolio Project Cleanup Report

## Outcome

- Audited 238 files across the seven canonical project asset folders.
- Rewrote all seven page.md files to document the current implemented case studies.
- Updated all seven data.json records so legacy metadata no longer contradicts the live pages.
- Removed one verified obsolete file: public/projects/canopy-of-echo/texts/Untitled.
- Retained every untracked or ambiguous asset whose exact blob is not recoverable from Git history.
- Removed the deprecated Guardian's Guide “Color Wasn't Enough” module from the rendered page.
- Updated repository and deployment documentation to use projectCatalog, projectSequence, and canonical slug routes.

The complete file-level inventory, including paths, sizes, dimensions/durations, references, surfaces, hashes, and classifications, is in project-asset-inventory.md.

## Payload

| Project | Before | After | Net saved |
| --- | ---: | ---: | ---: |
| Signie | 62,904,306 B | 62,901,651 B | 2,655 B |
| Guardian's Guide | 55,542,579 B | 55,542,450 B | 129 B |
| Canopy of Echo | 11,885,048 B | 11,880,383 B | 4,665 B |
| The Micro_Invasion | 59,901,493 B | 59,900,823 B | 670 B |
| Datnie | 76,441,833 B | 76,441,043 B | 790 B |
| Let's Make a Wish | 22,709,802 B | 22,708,932 B | 870 B |
| Personal Carbon Neutral | 16,527,169 B | 16,524,355 B | 2,814 B |
| **Total project folders** | **305,912,230 B** | **305,899,637 B** | **12,593 B** |

The net figure includes smaller rewritten documentation. Actual deletion: 1 file / 3,753 bytes. No referenced media was removed.

Largest remaining project folders:

1. Datnie — 76,441,043 bytes
2. Signie — 62,901,651 bytes
3. The Micro_Invasion — 59,900,823 bytes
4. Guardian's Guide — 55,542,450 bytes
5. Let's Make a Wish — 22,708,932 bytes
6. Personal Carbon Neutral — 16,524,355 bytes
7. Canopy of Echo — 11,880,383 bytes

## Why More Files Were Not Deleted

The working tree already contained a large set of untracked optimized MP4/WebP exports and tracked source GIF/PNG deletions. Many unused exports are plausible cleanup candidates, but their exact current blobs are not present in Git history. The explicit Git-safety rule therefore prevents deleting them in this pass.

Retained review groups include:

- Canopy of Echo legacy preview/cover media and dormant Shield/Tower artwork.
- Five misplaced, non-identical Guardian's Guide videos under The Micro_Invasion.
- Superseded Guardian's Guide, Datnie, ritual-icon, and Personal Carbon Neutral conversions.
- Duplicate untracked cover/poster exports.
- .DS_Store files whose exact blobs are not in history.
- The separate public/referenceTemplate tree (about 552 MiB). It is outside the seven-project scope and current CSS font paths depend on it, so it needs a dedicated migration before removal.

Once current untracked assets are committed or archived, rerun scripts/audit-project-assets.mjs and perform a second deletion pass.

## Verification

- npm run typecheck — passed.
- npm run build — passed; static export generated 41 pages.
- Browser/static-export suite — 19/19 passed.
- Homepage Featured Work and More Work — passed.
- Seven canonical project routes — passed.
- Four legacy aliases — passed:
  - /projects/vr-education/ → /projects/guardian-guide/
  - /projects/micro-invasion/ → /projects/the-micro-invasion/
  - /projects/pray-for-blessing/ → /projects/lets-make-a-wish/
  - /projects/carbon-neutral/ → /projects/personal-carbon-neutral/
- Hero anchors, lazy image/video loading, console errors, failed requests, and 404s — passed.
- All seven Next Project transitions — passed with exact case-start landing, including Personal Carbon Neutral → Signie wraparound.
- Temporary landing lock — confirmed released after the 320 ms settle check.

The build retains existing non-blocking Next.js warnings about raw img elements in HeroCardFan, LabGrid, and ProjectsShowcase.
