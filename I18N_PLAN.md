# EN / CN Language Toggle — Implementation Plan

---

## Translation Work: Honest Scope Assessment

Before choosing a workflow, here is exactly what needs translating:

### Category A — UI Strings (~70 short strings)

| Page | Volume | Examples |
|---|---|---|
| Navigation | 5 items | HOME, PROJECT, ABOUT, RESUME, CONTACT |
| Home hero | 4 strings | Headline, subtitle, byline, CTA button |
| About | ~6 strings | Headline, tagline, 2 body paragraphs, 2 link labels |
| Contact | ~6 strings | "GET IN TOUCH", subtext, 4 social descriptions |
| Resume | ~50 strings | 6 section titles + all award/project/practice/education entries |

These are short, keyable strings that go into a `locales/zh.ts` file.

### Category B — Project Markdown Files (7 files × ~500 words = ~3,500 words)

```
public/projects/signie/texts/page.md
public/projects/vr-education/texts/page.md
public/projects/micro-invasion/texts/page.md
public/projects/pray-for-blessing/texts/page.md
public/projects/carbon-neutral/texts/page.md
public/projects/canopy-of-echo/texts/page.md
public/projects/datnie/texts/page.md
```

These become `page_zh.md` files sitting next to each `page.md`.

---

## Q1: How much would it cost for Claude to do all the translation?

**Short answer: Category A is fine, Category B risks burning your day limit.**

The code scaffolding (context, providers, wiring all pages) uses moderate context.
Category A (~70 short strings) is fast — one session, small cost.
Category B (7 markdown files × 500 words each) is the problem. Reading every file + outputting Chinese translations = very high token use. If done in one session alongside all the coding, you could hit your daily limit before finishing. It is possible but risky if you want everything done in one day.

---

## Q2: Would using ChatGPT for translations add code complexity?

**No. Zero added complexity to the codebase.**

ChatGPT is just a content creation tool here. It produces text that goes into files. The code does not know or care who wrote the Chinese strings — it only reads `locales/zh.ts` and `page_zh.md`. The architecture is identical regardless of who did the translating.

The only cost is your time switching between tools.

---

## Q3: How to cooperate with ChatGPT — the exact workflow

### For UI strings (Category A):

**Step 1 — Claude builds the skeleton.**
I create `locales/en.ts` with all the English keys filled in. This is the authoritative file that defines every translation key.

**Step 2 — You take it to ChatGPT.**
Paste `locales/en.ts` into ChatGPT with this prompt:
> "Translate all values in this TypeScript object from English to Simplified Chinese. Keep every key name exactly the same. Return only the translated object, no explanation."

**Step 3 — You review and paste back.**
Review ChatGPT's output (it's your portfolio — you know what sounds right). Save it as `locales/zh.ts`.

**Step 4 — Claude wires it up.**
I connect `zh.ts` to the context and replace hardcoded strings in all pages.

---

### For project markdown files (Category B):

**Per file, one at a time:**
Paste the English `page.md` into ChatGPT with:
> "Translate this markdown file from English to Simplified Chinese. Preserve all markdown formatting exactly: headings (#, ##), bold (**text**), bullet lists (-), image tags (![...](...)). Do not translate image paths or code snippets. Return only the translated markdown."

Save the result as `page_zh.md` in the same folder as the original.

**Note:** Image paths like `![img](/projects/signie/images/cover.png)` must stay identical in both language versions. Double-check these.

---

## Q4: If Claude does everything — how long would it take?

Assuming one focused session per work block:

| Block | Work | Session estimate |
|---|---|---|
| 1 | Context + Providers + layout.tsx | 1 session |
| 2 | `locales/en.ts` + wire Navigation | 1 session |
| 3 | About + Contact + Home hero | 1 session |
| 4 | Resume page (most strings) | 1 session |
| 5 | Project list (title_zh / category_zh) | 1 session |
| 6–12 | Translate + create 7 `page_zh.md` files | 1 session per file |

**Total: ~12 sessions minimum if I do all translation.**

The markdown translations alone (blocks 6–12) are what risks your daily limit. Each markdown file requires me to read the full English content and produce full Chinese output — heavy token use.

---

## Recommended Split

**Claude does:** All code (blocks 1–5). This is fast and efficient.
**ChatGPT does:** `locales/zh.ts` values + all 7 `page_zh.md` files. Pure content work, no coding judgment needed.
**You review:** The Chinese copy before it goes in — it's your portfolio voice.

This approach:
- Keeps Claude's context budget for code work where it matters
- Gets the translation done in parallel (you can run ChatGPT sessions while I code)
- Means total implementation is done in ~5 coding sessions instead of 12+
- Adds zero complexity to the codebase

---

## Adjusted Implementation Order

```
Phase 1 (Claude codes, you translate in parallel):
  1a. Claude: LanguageContext + Providers + layout.tsx
  1b. Claude: locales/en.ts (all English keys, skeleton for zh.ts)
  1c. Claude: Wire Navigation.tsx to context
  → You: Take locales/en.ts to ChatGPT → get locales/zh.ts back

Phase 2 (Claude codes, you translate in parallel):
  2a. Claude: Wire About, Contact, Home pages
  2b. Claude: Wire Resume page
  2c. Claude: Wire project list (title_zh/category_zh already in index.json)
  → You: Run all 7 page.md files through ChatGPT → get 7 page_zh.md files back

Phase 3 (after you have page_zh.md files):
  3a. Claude: Update getProject() to load correct .md by language
  3b. Claude: Final check — toggle works across all pages
```

---

## Current State (unchanged from before)

| What | Status | File |
|---|---|---|
| Language button (UI only) | ✅ Exists, local state only | `components/Navigation.tsx` |
| Language context / global state | ❌ Missing | — |
| Translation strings for UI text | ❌ Missing | — |
| Project metadata CN translations | ⚠️ Partial (`title_zh`, `category_zh` exist but unused) | `public/projects/index.json` |
| Project markdown CN content | ❌ Missing | `public/projects/[id]/texts/page.md` |
| `localStorage` persistence | ❌ Missing | — |

---

## Files That Will Change

| File | Action | Who |
|---|---|---|
| `context/LanguageContext.tsx` | Create | Claude |
| `components/Providers.tsx` | Create | Claude |
| `locales/en.ts` | Create | Claude |
| `locales/zh.ts` | Create (skeleton) → fill in | Claude skeleton + ChatGPT values |
| `app/layout.tsx` | Edit — add Providers | Claude |
| `components/Navigation.tsx` | Edit — remove local state, use context | Claude |
| `components/HomeVideoSection.tsx` | Edit — 4 strings | Claude |
| `app/about/page.tsx` | Edit — ~6 strings | Claude |
| `app/contact/page.tsx` | Edit — ~6 strings | Claude |
| `app/resume/page.tsx` | Edit — ~50 strings | Claude |
| `app/project/page.tsx` | Edit — use title_zh / category_zh | Claude |
| `lib/projects.ts` | Edit — accept lang param | Claude |
| `app/projects/[id]/page.tsx` | Edit — pass lang to loader | Claude |
| `public/projects/[id]/texts/page_zh.md` | Create × 7 | ChatGPT + you |

---

## Open Questions Before Starting

1. **About page body text** — you said the Chinese copy isn't ready yet. Options:
   - Write it yourself and give it to me to paste in
   - Let ChatGPT draft it from the English, then you edit the tone
   - Leave About page English-only temporarily and add CN later

2. **Resume copy** — the resume has detailed project bullet points (e.g. "World-space UI & MR readability"). Do you want these literally translated, or rewritten in a more natural Chinese professional style? Let ChatGPT know your preference in the prompt.

3. **Project markdown files** — the current `page.md` files look like placeholder/template content (generic descriptions, not the real detailed write-ups). Are these the final versions, or will you be rewriting them before translation?
