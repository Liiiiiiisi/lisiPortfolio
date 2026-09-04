'use client';

/**
 * LabDetailPage — the standalone /labs/<slug>/ route.
 *
 * The PRIMARY Labs detail experience is now the overlay opened from the
 * grid (components/LabStudyOverlay). This page is kept as the direct-URL
 * and no-JS fallback: shareable links and crawlers still reach the full
 * study. It renders the exact same LabStudyContent, so the two can't
 * drift apart — only the surrounding chrome differs (a back link and a
 * next-study link instead of a close control).
 */
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getLabItem, labsHref, nextLabItem } from '@/data/lab';
import { useLanguage } from '@/context/LanguageContext';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';
import LabStudyContent from '@/components/LabStudyContent';

export default function LabDetailPage({ slug }: { slug: string }) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const reducedMotion = usePrefersReducedMotion();

  const item = getLabItem(slug);
  const next = nextLabItem(slug);
  if (!item) return null;

  const nextTitle = next ? (isZh ? next.titleZh : next.title) : '';

  return (
    <div className="overflow-x-clip">
      <article className="mx-auto w-full max-w-site px-5 pb-24 pt-24 sm:px-8 sm:pt-32">
        <motion.p
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durations.base, ease }}
          className="mb-10 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:mb-12"
        >
          <Link
            href="/labs/"
            className="underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            ← {t('lab.backShort')}
          </Link>
        </motion.p>

        <LabStudyContent item={item} variant="page" />
      </article>

      <nav
        aria-label={t('lab.title')}
        className="mx-auto w-full max-w-site px-5 pb-28 sm:px-8 sm:pb-36"
      >
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <Link
            href="/labs/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            {t('lab.backToLabs')}
          </Link>

          {next && (
            <Link
              href={labsHref(next.slug)}
              aria-label={`${t('lab.nextStudy')} — ${nextTitle}`}
              className="group inline-flex items-baseline gap-3 text-right sm:flex-col sm:items-end sm:gap-1"
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {t('lab.nextStudy')} →
              </span>
              <span className="font-display text-xl font-bold uppercase tracking-[0.01em] text-ink transition-colors group-hover:text-accent-strong sm:text-2xl">
                {nextTitle}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
