import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const repo = process.cwd();
const outputPath = join(repo, "docs/project-asset-inventory.md");
const projects = [
  ["Signie", "signie"],
  ["Guardian's Guide", "vr-education"],
  ["Canopy of Echo", "canopy-of-echo"],
  ["The Micro_Invasion", "micro-invasion"],
  ["Datnie", "datnie"],
  ["Let's Make a Wish", "pray-for-blessing"],
  ["Personal Carbon Neutral", "carbon-neutral"],
];

const baseline = new Map([
  ["signie", 62904306],
  ["vr-education", 55542579],
  ["canopy-of-echo", 11885048],
  ["micro-invasion", 59901493],
  ["datnie", 76441833],
  ["pray-for-blessing", 22709802],
  ["carbon-neutral", 16527169],
]);

const cleanupCandidates = new Set([
  "signie/.DS_Store", "signie/images/.DS_Store", "signie/images/cover.webp",
  "vr-education/.DS_Store", "vr-education/images/.DS_Store", "vr-education/videos/.DS_Store",
  "vr-education/images/removal.mp4", "vr-education/images/removal-poster.webp",
  "vr-education/images/unity-screen.mp4", "vr-education/images/unity-screen-poster.webp",
  "canopy-of-echo/.DS_Store", "canopy-of-echo/images/.DS_Store", "canopy-of-echo/videos/.DS_Store",
  "canopy-of-echo/texts/Untitled",
  "micro-invasion/.DS_Store", "micro-invasion/images/.DS_Store", "micro-invasion/videos/.DS_Store",
  "micro-invasion/images/Micro_card.png", "micro-invasion/images/cover.webp",
  "micro-invasion/images/food-intake.webp", "micro-invasion/images/respiration.webp",
  "micro-invasion/images/skin-contact.webp", "micro-invasion/images/guardian-paper-profile.webp",
  "datnie/.DS_Store", "datnie/images/addtop.mp4", "datnie/images/addtop-poster.webp",
  "datnie/images/logogroom.mp4", "datnie/images/logogroom-poster.webp",
  "datnie/images/pivot.mp4", "datnie/images/pivot-poster.webp",
  "datnie/images/run.mp4", "datnie/images/run-poster.webp",
  "datnie/images/trainout.mp4", "datnie/images/trainout-poster.webp",
  "pray-for-blessing/.DS_Store", "pray-for-blessing/images/icon-bucket.webp",
  "pray-for-blessing/images/icon-drum.webp", "pray-for-blessing/images/icon-lantern.webp",
  "pray-for-blessing/images/icon-wish.webp", "pray-for-blessing/images/icon-write.webp",
  "carbon-neutral/.DS_Store", "carbon-neutral/videos/.DS_Store",
  "carbon-neutral/images/behavior-travel-recognition.webp",
  "carbon-neutral/images/lcm-giant-salamander.webp",
  "carbon-neutral/images/manual-verification.webp",
  "carbon-neutral/images/scm-comparison-strip.webp",
  "carbon-neutral/images/whale-willy-evolution.webp",
]);

const safeDelete = new Set(["canopy-of-echo/texts/Untitled"]);

const review = new Set([
  ...[...cleanupCandidates].filter((key) => !safeDelete.has(key)),
  "canopy-of-echo/images/Shield1.webp", "canopy-of-echo/images/Shield2.webp",
  "canopy-of-echo/images/Tower.webp", "canopy-of-echo/images/cover.webp",
  "canopy-of-echo/videos/preview.mp4", "canopy-of-echo/videos/preview-poster.webp",
  "micro-invasion/images/guardian-journey-child-profile.mp4",
  "micro-invasion/images/guardian-journey-kitchen.mp4",
  "micro-invasion/images/guardian-journey-living-room.mp4",
  "micro-invasion/images/guardian-journey-tutorial.mp4",
  "micro-invasion/images/guardian-profile-completion.mp4",
]);

const duplicateReasons = new Map([
  ["signie/images/cover.webp", "Byte-identical to retained videos/preview-poster.webp."],
  ["micro-invasion/images/Micro_card.png", "Byte-identical to retained images/cover-card.png."],
  ["micro-invasion/images/cover.webp", "Byte-identical to retained videos/preview-poster.webp."],
  ["micro-invasion/images/guardian-paper-profile.webp", "Byte-identical to the canonical Guardian's Guide copy."],
]);

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const ignored = new Set([".git", ".next", "out", "node_modules", "referenceTemplate", "scripts"]);
function textFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...textFiles(full));
    else if (/\.(?:css|js|jsx|json|md|mjs|ts|tsx)$/i.test(entry.name) && full !== outputPath) files.push(full);
  }
  return files;
}

const allFiles = projects.flatMap(([, folder]) =>
  walk(join(repo, "public/projects", folder)).map((path) => ({ folder, path }))
);
const assetNameCount = new Map();
for (const { path } of allFiles) {
  const name = path.split("/").at(-1);
  assetNameCount.set(name, (assetNameCount.get(name) ?? 0) + 1);
}

const searchable = textFiles(repo).map((path) => ({
  path,
  rel: relative(repo, path),
  lines: readFileSync(path, "utf8").split("\n"),
}));

const videos = allFiles.filter(({ path }) => /\.(?:mp4|mov|webm)$/i.test(path)).map(({ path }) => path);
const videoMeta = new Map();
if (videos.length) {
  const result = execFileSync("swift", [join(repo, "scripts/media-metadata.swift"), ...videos], {
    encoding: "utf8",
    env: {
      ...process.env,
      SWIFT_MODULECACHE_PATH: "/tmp/portfolio-swift-cache",
      CLANG_MODULE_CACHE_PATH: "/tmp/portfolio-clang-cache",
    },
    maxBuffer: 20 * 1024 * 1024,
  });
  for (const line of result.trim().split("\n")) {
    const tab = line.lastIndexOf("\t");
    if (tab > -1) videoMeta.set(line.slice(0, tab), line.slice(tab + 1));
  }
}

function imageMeta(path) {
  if (!/\.(?:avif|gif|jpe?g|png|webp)$/i.test(path)) return "—";
  try {
    const text = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", path], { encoding: "utf8" });
    const width = text.match(/pixelWidth: (\d+)/)?.[1];
    const height = text.match(/pixelHeight: (\d+)/)?.[1];
    return width && height ? `${width}×${height}` : "—";
  } catch {
    return "—";
  }
}

function references(folder, path) {
  const projectRelative = relative(join(repo, "public/projects"), path).replaceAll("\\", "/");
  const publicPath = `/projects/${projectRelative}`;
  const name = path.split("/").at(-1);
  const stem = name.replace(/\.[^.]+$/, "").replace(/-poster$/, "");
  const exact = [];
  const fallback = [];
  for (const file of searchable) {
    file.lines.forEach((line, index) => {
      if (line.includes(publicPath)) exact.push(`${file.rel}:${index + 1}`);
      else if (assetNameCount.get(name) === 1 && name.length > 8 && line.includes(name)) fallback.push(`${file.rel}:${index + 1}`);
      else if (assetNameCount.get(name) === 1 && stem.length > 8 && line.includes(stem)) fallback.push(`${file.rel}:${index + 1}`);
    });
  }
  const matches = [...new Set(exact.length ? exact : fallback)];
  if (!matches.length) return "—";
  return matches.length > 6 ? `${matches.slice(0, 6).join("<br>")}<br>+${matches.length - 6} more` : matches.join("<br>");
}

function usage(key, path) {
  if (path.endsWith("/texts/page.md")) return "Maintainer documentation";
  if (path.endsWith("/texts/data.json")) return "Legacy project metadata; retained for compatibility";
  if (safeDelete.has(key)) return duplicateReasons.get(key) ?? "Superseded or disposable web-repository artifact";
  if (duplicateReasons.has(key)) return `${duplicateReasons.get(key)} Retained because the exact blob is not in Git history.`;
  if (review.has(key)) {
    if (key.includes("Shield") || key.includes("Tower")) return "Dormant legacy component only; not visible on the current page";
    return "No current visible use; provenance/recoverability needs manual confirmation";
  }
  const name = path.split("/").at(-1);
  if (name === "cover.webp" || name === "cover-card.png" || name === "signie_small_card_v1.png") {
    return "Homepage project card and Next Project preview";
  }
  if (path.includes("/videos/preview")) return "Homepage preview; case-study Hero where configured";
  if (key === "signie/videos/hero.mp4" || key.includes("rendered.") || key.includes("gif-lantern.")) {
    return "Case-study Hero and section media";
  }
  if (
    key.includes("figma.") || key.includes("grabcard.") || key.includes("trainshot.")
    || key.includes("gif-wish.") || key.includes("gif-drum.")
    || key.includes("scm-lifecycle.") || key.includes("lcm-formation.") || key.includes("ar-prototype-demo.")
  ) return "Project detail and More Work filmstrip";
  return "Current project-detail section media";
}

function surface(key, path) {
  if (path.includes("/texts/")) return "Documentation";
  if (safeDelete.has(key) || review.has(key)) return "Not visible";
  const marks = [];
  const name = path.split("/").at(-1);
  if (name === "cover.webp" || name === "cover-card.png" || name === "signie_small_card_v1.png") marks.push("Homepage", "Next Project");
  if (path.includes("/videos/preview")) marks.push("Homepage");
  if (key === "signie/videos/hero.mp4" || key.startsWith("vr-education/videos/preview") || key.includes("rendered.") || key.startsWith("micro-invasion/videos/preview") || key.startsWith("datnie/videos/preview") || key.includes("gif-lantern.") || key.startsWith("carbon-neutral/videos/preview")) marks.push("Hero");
  if (!path.includes("/videos/preview") || marks.includes("Hero")) marks.push("Project detail");
  if (
    key.includes("figma.") || key.includes("grabcard.") || key.includes("trainshot.")
    || key.includes("gif-wish.") || key.includes("gif-drum.") || key.includes("gif-lantern.")
    || key.includes("scm-lifecycle.") || key.includes("lcm-formation.") || key.includes("ar-prototype-demo.")
  ) marks.push("More Work");
  if (["vr-education", "micro-invasion", "pray-for-blessing", "carbon-neutral"].some((folder) => key.startsWith(folder + "/"))) marks.push("Legacy alias via canonical route");
  return [...new Set(marks)].join(", ") || "Project detail";
}

function status(key, path) {
  if (safeDelete.has(key)) return "SAFE-TO-DELETE";
  if (duplicateReasons.has(key)) return "DUPLICATE";
  if (review.has(key) || path.endsWith("/texts/data.json")) return "UNREFERENCED-BUT-REVIEW";
  return "USED";
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

const sections = [];
const hashes = new Map();
for (const [title, folder] of projects) {
  const root = join(repo, "public/projects", folder);
  const files = walk(root).sort();
  const rows = [];
  for (const path of files) {
    const rel = relative(root, path).replaceAll("\\", "/");
    const key = `${folder}/${rel}`;
    const stats = statSync(path);
    const ext = extname(path).slice(1).toLowerCase() || "none";
    const metadata = videoMeta.get(path) ?? imageMeta(path);
    const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
    const group = hashes.get(hash) ?? [];
    group.push(relative(repo, path));
    hashes.set(hash, group);
    rows.push([
      `public/projects/${folder}/${rel}`,
      ext,
      stats.size.toLocaleString("en-US"),
      metadata,
      references(folder, path),
      usage(key, path),
      surface(key, path),
      status(key, path),
    ]);
  }
  sections.push({ title, folder, rows, currentBytes: files.reduce((sum, path) => sum + statSync(path).size, 0) });
}

const duplicateGroups = [...hashes.values()].filter((group) => group.length > 1);
const report = [
  "# Project Asset Inventory",
  "",
  "Generated by scripts/audit-project-assets.mjs. This is the pre-deletion audit snapshot for the seven canonical project asset folders.",
  "",
  "## Method",
  "",
  "- Runtime implementation, projectCatalog, projectSequence, Featured Work, More Work, Hero media, aliases, source strings, data, CSS, and Markdown were searched before classification.",
  "- Image dimensions come from macOS image metadata. Video resolution and duration come from AVFoundation.",
  "- SAFE-TO-DELETE means no current runtime surface or required derivative relationship was found and the exact file is recoverable from Git history.",
  "- UNREFERENCED-BUT-REVIEW means the file is intentionally retained because provenance, dormant-code use, or Git recoverability is uncertain.",
  "- Untracked obsolete conversions and .DS_Store files are retained in this pass because the Git-safety requirement says every deleted file must be recoverable from history.",
  "- References list literal or basename/stem matches. Generated media paths are additionally resolved against the runtime arrays/components described in Current website usage.",
  "",
  "## Baseline",
  "",
  "| Project | Files | Bytes before documentation rewrite |",
  "| --- | ---: | ---: |",
  ...sections.map(({ title, folder, rows }) => `| ${title} | ${rows.length} | ${baseline.get(folder).toLocaleString("en-US")} |`),
  `| **Total** | **${sections.reduce((sum, item) => sum + item.rows.length, 0)}** | **${[...baseline.values()].reduce((a, b) => a + b, 0).toLocaleString("en-US")}** |`,
  "",
  ...sections.flatMap(({ title, rows }) => [
    `## ${title}`,
    "",
    "| Exact path | Ext | Bytes | Resolution / duration | References found | Current website usage | Visible surface | Status |",
    "| --- | --- | ---: | --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
    "",
  ]),
  "## Byte-identical groups",
  "",
  ...duplicateGroups.flatMap((group, index) => [
    `${index + 1}. ${group.join(" · ")}`,
    "",
  ]),
  "## Retained manual-review items",
  "",
  "- Canopy of Echo: legacy preview/cover media and Shield/Tower artwork remain because current Git recoverability or dormant-component intent is not sufficiently clear.",
  "- The Micro_Invasion: five misplaced Guardian's Guide videos remain because they are untracked and differ from the optimized canonical copies.",
  "- Other obsolete MP4/WebP conversions and .DS_Store files remain because their exact blobs are not present in Git history. Commit or archive them before a later deletion pass.",
  "- public/referenceTemplate is outside the seven canonical folders. It includes a duplicated concept repository and node_modules tree, but current font paths depend on it; it requires a separate migration before deletion.",
  "",
].join("\n");

writeFileSync(outputPath, report);
console.log(`Wrote ${relative(repo, outputPath)} with ${allFiles.length} audited files.`);
