'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import type { CaseWalkthrough } from '@/types/caseStudy';

const HEADING_ID = 'walkthrough-overlay-title';

export default function WalkthroughOverlay({
  open,
  walkthrough,
  onClose,
}: {
  open: boolean;
  walkthrough?: CaseWalkthrough;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      window.clearTimeout(focusTimer);
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo(0, scrollY);
      openerRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const closeBeforeNavigation = () => onClose();
    window.addEventListener('portfolio:navigate', closeBeforeNavigation);
    return () => window.removeEventListener('portfolio:navigate', closeBeforeNavigation);
  }, [onClose, open]);

  if (!walkthrough) return null;
  const title = language === 'zh' ? walkthrough.titleZh : walkthrough.title;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durations.base, ease }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              onClose();
            }
          }}
          className="fixed inset-0 z-[90] flex h-[100dvh] w-screen items-center justify-center bg-ink/60 p-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:p-6 sm:pb-[calc(7rem+env(safe-area-inset-bottom))]"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default"
          />
          <motion.section
            role="dialog"
            aria-labelledby={HEADING_ID}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: durations.slow, ease }}
            className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[28px] bg-bg p-4 shadow-[0_24px_70px_-24px_rgba(28,26,23,0.5)] sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={HEADING_ID} className="font-display text-xl font-bold uppercase text-ink sm:text-2xl">
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t('lab.close')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <video
              src={withBasePath(walkthrough.src)}
              poster={walkthrough.poster ? withBasePath(walkthrough.poster) : undefined}
              controls
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-contain"
            />
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
