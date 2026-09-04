'use client';

import { useLayoutEffect, useRef } from 'react';

const LANDING_FLAG = 'case-transition-landing';
const SETTLE_MS = 320;

let releaseTimer: number | undefined;
let locked = false;
let landingStartedAt = 0;
let previousScrollRestoration: History['scrollRestoration'] = 'auto';
let previousHtmlOverflow = '';
let previousHtmlOverscroll = '';
let previousHtmlScrollBehavior = '';
let previousBodyOverscroll = '';

const preventResidualInput = (event: Event) => event.preventDefault();

function releaseLandingLock() {
  if (typeof window === 'undefined' || !locked) return;
  locked = false;
  window.clearTimeout(releaseTimer);
  window.removeEventListener('wheel', preventResidualInput, true);
  window.removeEventListener('touchmove', preventResidualInput, true);
  document.documentElement.style.overflow = previousHtmlOverflow;
  document.documentElement.style.overscrollBehavior = previousHtmlOverscroll;
  document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;
  document.body.style.overscrollBehavior = previousBodyOverscroll;
  window.history.scrollRestoration = previousScrollRestoration;
}

function beginLandingLock() {
  if (typeof window === 'undefined') return;
  if (!locked) {
    locked = true;
    landingStartedAt = performance.now();
    previousScrollRestoration = window.history.scrollRestoration;
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    previousBodyOverscroll = document.body.style.overscrollBehavior;
    window.history.scrollRestoration = 'manual';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.overscrollBehavior = 'none';
    window.addEventListener('wheel', preventResidualInput, { passive: false, capture: true });
    window.addEventListener('touchmove', preventResidualInput, { passive: false, capture: true });
  }
  window.clearTimeout(releaseTimer);
  releaseTimer = window.setTimeout(releaseLandingLock, 700);
}

/** Release after the incoming Hero has visibly replaced the handoff layer. */
export function completeCaseStudyLanding() {
  if (typeof window === 'undefined' || !locked) return;
  const minimumSettleRemaining = Math.max(0, 220 - (performance.now() - landingStartedAt));
  window.clearTimeout(releaseTimer);
  releaseTimer = window.setTimeout(releaseLandingLock, minimumSettleRemaining);
}

/** Called only after the shared Next Project transition has committed. */
export function prepareCaseStudyLanding() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(LANDING_FLAG, '1');
  beginLandingLock();
}

/** Canonical document-start anchor shared by all seven case-study routes. */
export default function CaseStudyStartAnchor() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const shouldSettleRef = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    if (shouldSettleRef.current === null) {
      shouldSettleRef.current = window.sessionStorage.getItem(LANDING_FLAG) === '1';
      if (shouldSettleRef.current) window.sessionStorage.removeItem(LANDING_FLAG);
    }
    if (!shouldSettleRef.current) return;
    beginLandingLock();

    const placeAtStart = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const top = window.scrollY + anchor.getBoundingClientRect().top;
      window.scrollTo({ top, left: 0, behavior: 'auto' });
    };

    placeAtStart();
    const firstFrame = window.requestAnimationFrame(() => {
      placeAtStart();
      window.requestAnimationFrame(placeAtStart);
    });
    const checks = [60, 140, 260].map((delay) => window.setTimeout(placeAtStart, delay));
    const settle = window.setTimeout(() => {
      placeAtStart();
      completeCaseStudyLanding();
    }, SETTLE_MS);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      checks.forEach(window.clearTimeout);
      window.clearTimeout(settle);
    };
  }, []);

  return <div ref={anchorRef} id="case-start" data-case-start aria-hidden="true" className="h-0" />;
}
