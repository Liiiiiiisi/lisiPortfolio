'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { ease } from '@/lib/motion';
import { completeCaseStudyLanding } from '@/components/CaseStudyStartAnchor';
import {
  CASE_HANDOFF_SHOW,
  CASE_HERO_READY,
  clearCaseHandoffPreload,
  type CaseHandoffPayload,
} from '@/lib/caseTransitionHandoff';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function CaseTransitionHandoffOverlay() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const [payload, setPayload] = useState<CaseHandoffPayload | null>(null);
  const [heroReady, setHeroReady] = useState(false);
  const payloadRef = useRef<CaseHandoffPayload | null>(null);

  useEffect(() => {
    const show = (event: Event) => {
      const detail = (event as CustomEvent<CaseHandoffPayload>).detail;
      payloadRef.current = detail;
      setHeroReady(false);
      setPayload(detail);
    };
    const ready = (event: Event) => {
      const heroSrc = (event as CustomEvent<string>).detail;
      if (!payloadRef.current || payloadRef.current.heroSrc !== heroSrc) return;
      setHeroReady(true);
      window.setTimeout(() => {
        payloadRef.current = null;
        setPayload(null);
        clearCaseHandoffPreload();
        completeCaseStudyLanding();
      }, 180);
    };
    window.addEventListener(CASE_HANDOFF_SHOW, show);
    window.addEventListener(CASE_HERO_READY, ready);
    return () => {
      window.removeEventListener(CASE_HANDOFF_SHOW, show);
      window.removeEventListener(CASE_HERO_READY, ready);
    };
  }, []);

  return (
    <AnimatePresence>
      {payload && (
        <motion.div
          key={payload.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: heroReady ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease }}
          className="fixed inset-0 z-[100] overflow-hidden bg-bg"
          aria-hidden="true"
        >
          <div className="mx-auto flex h-full w-full max-w-site flex-col px-5 pt-14 sm:px-8 sm:pt-20">
            <div className="flex items-center gap-6 pb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              <span className="shrink-0"><span className="text-ink">/{pad(payload.order)}</span> {t('case.nextProject')}</span>
              <span className="ml-auto flex min-w-0 flex-1 items-center gap-3 sm:max-w-[58%]">
                <span className="hidden shrink-0 sm:inline">{t('case.scrollDown')}</span>
                <ArrowDown size={13} aria-hidden="true" className="shrink-0" />
                <span className="relative block h-px flex-1 bg-line"><span className="absolute inset-0 bg-accent" /></span>
              </span>
            </div>
            <div className="grid flex-1 grid-cols-12 gap-x-8 overflow-hidden">
              <div className="col-span-12 mt-10 lg:col-span-4 lg:mt-16">
                <h2 className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em] text-ink">{isZh ? payload.titleZh : payload.title}</h2>
                {(isZh ? payload.metaLineZh : payload.metaLine) && (
                  <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted lg:mt-10">
                    {isZh ? payload.metaLineZh : payload.metaLine}
                  </p>
                )}
              </div>
              <div className="col-span-12 mt-8 min-h-0 lg:col-span-8 lg:col-start-5 lg:mt-16">
                <div className="relative aspect-[16/9] max-h-[46svh] overflow-hidden bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element -- persistent transition overlay uses preloaded public media */}
                  <img src={withBasePath(payload.previewPoster)} alt="" className="h-full w-full object-cover" />
                  {payload.poster !== payload.previewPoster && (
                    // eslint-disable-next-line @next/next/no-img-element -- canonical Hero poster is preloaded before commit
                    <img src={withBasePath(payload.poster)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <p className="mt-4 max-w-md text-sm leading-snug text-ink sm:text-base">{isZh ? payload.descriptionZh : payload.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
