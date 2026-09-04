const origin = process.env.PORTFOLIO_AUDIT_ORIGIN ?? "http://127.0.0.1:4173";
const debuggerOrigin = process.env.PORTFOLIO_CDP_ORIGIN ?? "http://127.0.0.1:9224";
const routes = [
  ["signie", "SIGNIE"],
  ["guardian-guide", "GUARDIAN'S GUIDE"],
  ["canopy-of-echo", "CANOPY"],
  ["the-micro-invasion", "MICRO_INVASION"],
  ["datnie", "DATNIE"],
  ["lets-make-a-wish", "LET'S MAKE"],
  ["personal-carbon-neutral", "PERSONAL"],
];
const aliases = [
  ["vr-education", "guardian-guide"],
  ["micro-invasion", "the-micro-invasion"],
  ["pray-for-blessing", "lets-make-a-wish"],
  ["carbon-neutral", "personal-carbon-neutral"],
];

const targets = await fetch(`${debuggerOrigin}/json/list`).then((response) => response.json());
const target = targets.find((entry) => entry.type === "page");
if (!target) throw new Error("No Chrome page target is available.");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const eventWaiters = new Map();
let pageErrors = [];
let requestErrors = [];

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const handler = pending.get(message.id);
    if (!handler) return;
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
    return;
  }
  if (message.method === "Runtime.exceptionThrown") {
    pageErrors.push(message.params.exceptionDetails.text);
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    pageErrors.push(message.params.args.map((arg) => arg.value ?? arg.description ?? "").join(" "));
  }
  if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    requestErrors.push(`${message.params.response.status} ${message.params.response.url}`);
  }
  const waiters = eventWaiters.get(message.method);
  if (waiters?.length) {
    eventWaiters.delete(message.method);
    waiters.forEach((resolve) => resolve(message.params));
  }
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function waitForEvent(method, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeout);
    const wrapped = (params) => {
      clearTimeout(timer);
      resolve(params);
    };
    const current = eventWaiters.get(method) ?? [];
    current.push(wrapped);
    eventWaiters.set(method, current);
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(path) {
  pageErrors = [];
  requestErrors = [];
  const loaded = waitForEvent("Page.loadEventFired");
  await send("Page.navigate", { url: `${origin}${path}` });
  await loaded;
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function scanPage() {
  await evaluate(`(async () => {
    const stop = Math.max(0, document.documentElement.scrollHeight - innerHeight * 2.8);
    for (let y = 0; y <= stop; y += Math.max(500, innerHeight * 0.75)) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 55));
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    scrollTo(0, 0);
  })()`);
  return evaluate(`({
    url: location.pathname,
    title: document.title,
    text: document.body.innerText,
    anchor: !!document.querySelector("[data-case-start]"),
    brokenImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src),
    brokenVideos: [...document.querySelectorAll("video")].filter(video => video.error).map(video => ({src: video.currentSrc || video.src, code: video.error.code})),
    videos: document.querySelectorAll("video").length
  })`);
}

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");

const results = [];
await navigate("/");
let page = await scanPage();
results.push({
  test: "homepage",
  pass: page.text.includes("FEATURED WORK") && page.text.includes("MORE WORK") && !page.brokenImages.length && !page.brokenVideos.length && !requestErrors.length && !pageErrors.length,
  detail: `featured=${page.text.includes("FEATURED WORK")} more=${page.text.includes("MORE WORK")} videos=${page.videos}`,
  errors: [...pageErrors, ...requestErrors, ...page.brokenImages, ...page.brokenVideos.map(JSON.stringify)],
});

for (const [slug, heading] of routes) {
  await navigate(`/projects/${slug}/`);
  page = await scanPage();
  results.push({
    test: `project:${slug}`,
    pass: page.anchor && page.text.includes(heading) && !page.brokenImages.length && !page.brokenVideos.length && !requestErrors.length && !pageErrors.length,
    detail: `anchor=${page.anchor} heading=${page.text.includes(heading)} videos=${page.videos}`,
    errors: [...pageErrors, ...requestErrors, ...page.brokenImages, ...page.brokenVideos.map(JSON.stringify)],
  });
}

for (const [alias, canonical] of aliases) {
  await navigate(`/projects/${alias}/`);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const pathname = await evaluate("location.pathname");
  results.push({
    test: `alias:${alias}`,
    pass: pathname === `/projects/${canonical}/`,
    detail: `landed=${pathname}`,
    errors: [...pageErrors, ...requestErrors],
  });
}

for (let index = 0; index < routes.length; index += 1) {
  const [slug] = routes[index];
  const [expected] = routes[(index + 1) % routes.length];
  await navigate(`/projects/${slug}/`);
  await evaluate("scrollTo(0, document.documentElement.scrollHeight)");
  const deadline = Date.now() + 7000;
  let transition;
  while (Date.now() < deadline) {
    transition = await evaluate(`({
      pathname: location.pathname,
      scrollY,
      anchorTop: document.querySelector("[data-case-start]")?.getBoundingClientRect().top ?? null,
      anchorDocumentTop: (() => { const a = document.querySelector("[data-case-start]"); return a ? scrollY + a.getBoundingClientRect().top : null; })(),
      overflow: document.documentElement.style.overflow
    })`);
    if (transition.pathname === `/projects/${expected}/`) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 450));
  transition = await evaluate(`({
    pathname: location.pathname,
    scrollY,
    anchorTop: document.querySelector("[data-case-start]")?.getBoundingClientRect().top ?? null,
    anchorDocumentTop: (() => { const a = document.querySelector("[data-case-start]"); return a ? scrollY + a.getBoundingClientRect().top : null; })(),
    overflow: document.documentElement.style.overflow
  })`);
  const landed = transition.pathname === `/projects/${expected}/`;
  const exact = transition.anchorDocumentTop !== null && Math.abs(transition.scrollY - transition.anchorDocumentTop) <= 2;
  results.push({
    test: `transition:${slug}->${expected}`,
    pass: landed && exact && transition.overflow !== "hidden",
    detail: `path=${transition.pathname} scrollY=${transition.scrollY} anchor=${transition.anchorDocumentTop} overflow=${transition.overflow || "restored"}`,
    errors: [...pageErrors, ...requestErrors],
  });
}

socket.close();
for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"}\t${result.test}\t${result.detail}`);
  for (const error of [...new Set(result.errors)]) console.log(`  ERROR ${error}`);
}
const failures = results.filter((result) => !result.pass);
console.log(`SUMMARY\t${results.length - failures.length}/${results.length} passed`);
if (failures.length) process.exitCode = 1;
