'use client';

/**
 * LabStudyOverlay — the Labs detail experience, presented as an overlay
 * above the Labs grid rather than as a navigation. The grid stays mounted
 * underneath, so closing returns the user to exactly where they were.
 *
 * Presentation: a true inset WINDOW, not a full-page overlay. The panel is
 * sized to the viewport minus a margin on all four sides
 * (100dvh/100vw − 32…48px) with large rounded corners, so the dimmed Labs
 * grid stays visible around every edge and the white panel never touches a
 * browser edge.
 *
 * Crucially the panel itself does NOT scroll — it is fixed to the viewport
 * and only the content INSIDE it scrolls. That is what makes it read as a
 * floating window rather than a page: the rounded corners, the margin and
 * the close button all stay exactly where they are while you read.
 *
 * Behaviour
 *   - Opens below the persistent floating dock.
 *   - The × control, Esc key, and a click on the dimmed area all dismiss it.
 *   - Background scroll is locked while open using the position:fixed
 *     technique, and the exact scroll offset is restored on close — the
 *     body is also padded by the scrollbar width so the page underneath
 *     doesn't shift sideways when the scrollbar disappears.
 *   - Focus moves to the close control on open and returns to the tile that
 *     opened it on close. Background content is inert, while this panel and
 *     the persistent dock remain in the natural focus order.
 *   - role="dialog" without aria-modal, labelled by the study title.
 *
 * Content lives in LabStudyContent, shared with the standalone route.
 */
import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import LabStudyContent from '@/components/LabStudyContent';
import type { LabItem } from '@/types/lab';

const HEADING_ID = 'lab-study-overlay-title';

export default function LabStudyOverlay({
  item,
  onClose,
}: {
  /** The open study, or null when the overlay is closed. */
  item: LabItem | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  /** The element that had focus before opening, to restore on close. */
  const openerRef = useRef<HTMLElement | null>(null);

  const open = item !== null;

  useEffect(() => {
    if (!open) return;
    window.addEventListener('portfolio:navigate', onClose);
    return () => window.removeEventListener('portfolio:navigate', onClose);
  }, [onClose, open]);

  /* Lock the page behind the overlay and restore the exact offset after. */
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /* Remember the opener, move focus in, and restore it on close. */
  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(id);
      openerRef.current?.focus?.();
    };
  }, [open]);

  /* Esc closes. Tab remains native so the overlay and persistent dock are
   * both reachable while inert background content is skipped. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lab-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durations.base, ease }}
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[90] h-[100dvh] w-screen bg-ink/50 p-4 backdrop-blur-[2px] sm:p-6"
        >
          {/* Dimmed area — clicking outside the panel closes. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          {/* The window: exactly viewport minus the margin, never taller. */}
          <motion.div
            role="dialog"
            aria-labelledby={HEADING_ID}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: durations.slow, ease }}
            className="relative mx-auto flex h-full w-full max-w-[1600px] flex-col overflow-hidden rounded-[28px] bg-bg shadow-[0_24px_70px_-24px_rgba(28,26,23,0.45)] sm:rounded-[32px]"
          >
            {/* Circular close — inset inside the panel, fixed while the
                content behind it scrolls. */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('lab.close')}
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-surface/85 text-ink outline-none backdrop-blur-sm transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong sm:right-6 sm:top-6"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {/* ONLY this scrolls — the window frame stays put. */}
            <div className="h-full overflow-y-auto overscroll-contain px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-10 sm:pb-[calc(7rem+env(safe-area-inset-bottom))] sm:pt-24 lg:px-16">
              <LabStudyContent item={item} variant="overlay" headingId={HEADING_ID} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
