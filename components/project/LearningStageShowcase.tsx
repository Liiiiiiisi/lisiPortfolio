"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import LazyVideo from "@/components/LazyVideo";
import { withBasePath } from "@/lib/paths";
import { durations, ease } from "@/lib/motion";
import type { CaseLearningShowcase } from "@/types/caseStudy";

export default function LearningStageShowcase({ showcase, reducedMotion, isZh }: { showcase: CaseLearningShowcase; reducedMotion: boolean; isZh: boolean }) {
  const fallbackIntervalMs = showcase.intervalMs ?? 7500;
  const [mediaDurationMs, setMediaDurationMs] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleToken, setCycleToken] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [inViewport, setInViewport] = useState(false);
  const elapsedRef = useRef(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const activeStage = showcase.stages[activeIndex];
  const intervalMs = showcase.useMediaDuration && mediaDurationMs ? mediaDurationMs : fallbackIntervalMs;
  const paused = reducedMotion || userPaused || !pageVisible || !inViewport;

  useEffect(() => {
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  useEffect(() => {
    const element = showcaseRef.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setInViewport(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInViewport(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    if (paused) video.pause();
    else video.play().catch(() => undefined);
  }, [activeIndex, paused, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      elapsedRef.current = 0;
      setProgress(0);
      return;
    }
    if (paused) return;
    let frame = 0;
    const baseElapsed = elapsedRef.current;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = baseElapsed + now - startedAt;
      elapsedRef.current = elapsed;
      if (elapsed >= intervalMs) {
        elapsedRef.current = 0;
        setProgress(0);
        setActiveIndex((current) => (current + 1) % showcase.stages.length);
        return;
      }
      setProgress(elapsed / intervalMs);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, cycleToken, intervalMs, paused, reducedMotion, showcase.stages.length]);

  const selectStage = (index: number) => {
    elapsedRef.current = 0;
    setProgress(0);
    setActiveIndex(index);
    setCycleToken((current) => current + 1);
  };

  useEffect(() => {
    setMediaDurationMs(null);
  }, [activeIndex]);
  const title = isZh ? activeStage.titleZh : activeStage.title;
  const copy = isZh ? activeStage.copyZh : activeStage.copy;
  const alt = (isZh ? activeStage.media.altZh : activeStage.media.alt) ?? title;
  const mediaFitClass = activeStage.media.fit === "contain" ? "object-contain" : "object-cover";
  const mediaStyle = activeStage.media.objectPosition ? { objectPosition: activeStage.media.objectPosition } : undefined;

  return <div className="mt-14 sm:mt-20">
    <div ref={showcaseRef} className="relative left-1/2 aspect-[4/5] w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden bg-ink sm:aspect-[16/10] sm:w-[94vw] lg:aspect-[16/9]">
      {reducedMotion && activeStage.media.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={activeStage.id} src={withBasePath(activeStage.media.poster)} alt={alt} className={`absolute inset-0 h-full w-full ${mediaFitClass}`} style={mediaStyle} />
      ) : activeStage.media.src ? (
        <video key={activeStage.id} ref={videoRef} src={withBasePath(activeStage.media.src)} poster={activeStage.media.poster ? withBasePath(activeStage.media.poster) : undefined} onLoadedMetadata={(event) => { if (showcase.useMediaDuration && Number.isFinite(event.currentTarget.duration)) setMediaDurationMs(event.currentTarget.duration * 1000); }} autoPlay loop muted playsInline preload="metadata" aria-label={alt} className={`absolute inset-0 h-full w-full ${mediaFitClass}`} style={mediaStyle} />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[#ded8cf] px-6 text-center text-[#716b64]"><div><p className="case-category-label">[ Media Placeholder ]</p><p className="case-media-title mt-3">{alt}</p></div></div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.18)_48%,transparent_72%)] sm:bg-[linear-gradient(to_left,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.34)_30%,transparent_58%)]" />
      <button type="button" onClick={() => setUserPaused((current) => !current)} disabled={reducedMotion} aria-label={reducedMotion ? (isZh ? "已根据减少动态效果偏好关闭自动播放" : "Autoplay disabled by reduced-motion preference") : userPaused ? (isZh ? "播放学习阶段" : "Play learning stages") : (isZh ? "暂停学习阶段" : "Pause learning stages")} className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-50 sm:right-5 sm:top-5">
        {userPaused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      </button>
      <motion.div key={`${activeStage.id}-${isZh ? "zh" : "en"}`} initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: durations.base, ease }} aria-live="polite" className="absolute bottom-24 left-5 right-5 z-10 text-white sm:bottom-auto sm:left-auto sm:right-[5vw] sm:top-1/2 sm:w-[min(25rem,28vw)] sm:-translate-y-1/2">
        <p className="font-display text-[clamp(2.25rem,4.5vw,4.75rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em]">{title}</p>
        <p className="mt-4 max-w-[21rem] text-sm leading-relaxed text-white/85 sm:text-base">{copy}</p>
      </motion.div>
      <nav aria-label={isZh ? "学习阶段" : "Learning stages"} className="absolute inset-x-0 bottom-0 z-20 grid border-t border-white/25 bg-black/20 backdrop-blur-[2px]" style={{ gridTemplateColumns: `repeat(${showcase.stages.length}, minmax(0, 1fr))` }}>
        {showcase.stages.map((stage, index) => {
          const active = index === activeIndex;
          const stageTitle = isZh ? stage.titleZh : stage.title;
          return <button key={stage.id} type="button" onClick={() => selectStage(index)} aria-pressed={active} className="min-w-0 border-r border-white/20 px-2 py-3 text-left text-white outline-none last:border-r-0 focus-visible:bg-white/15 sm:px-4 sm:py-4"><span className={`block truncate font-mono text-[0.58rem] uppercase tracking-[0.1em] sm:text-[0.68rem] ${active ? "text-white" : "text-white/60"}`}>{stageTitle}</span><span className="mt-2 block h-px overflow-hidden bg-white/25" aria-hidden="true"><span className="block h-full origin-left bg-white" style={{ width: active ? `${Math.max(0, Math.min(1, progress)) * 100}%` : "0%" }} /></span></button>;
        })}
      </nav>
    </div>
    {showcase.technicalAnnotation && <aside className="mt-14 sm:mt-20" aria-label={isZh ? "技术注释" : "Technical annotation"}><div className="grid grid-cols-1 gap-5 sm:grid-cols-12 sm:items-center sm:gap-x-8"><div className="sm:col-span-6"><div className="relative aspect-video overflow-hidden bg-surface">{showcase.technicalAnnotation.media.src && <LazyVideo src={showcase.technicalAnnotation.media.src} poster={showcase.technicalAnnotation.media.poster} alt={(isZh ? showcase.technicalAnnotation.media.altZh : showcase.technicalAnnotation.media.alt) ?? ""} className="absolute inset-0 h-full w-full object-cover" />}</div></div><div className="sm:col-span-5 sm:col-start-8"><p className="case-media-title">{isZh ? showcase.technicalAnnotation.titleZh : showcase.technicalAnnotation.title}</p><p className="mt-2 max-w-md text-xs leading-relaxed text-muted sm:text-sm">{isZh ? showcase.technicalAnnotation.copyZh : showcase.technicalAnnotation.copy}</p></div></div></aside>}
  </div>;
}
