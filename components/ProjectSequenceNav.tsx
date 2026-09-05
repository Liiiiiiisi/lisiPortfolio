'use client';

/**
 * ProjectSequenceNav — persistent global project navigation for the
 * project detail pages. Interaction reference: the homepage Featured Work
 * axis (hover a marker → small preview + title), deliberately quieter
 * here so it stays secondary to the case-study content.
 *
 * Desktop (sm+): a thin bar divided into 7 equal segments in the canonical
 * project order. The current project's segment is inked and its number is
 * darkened — clear but subtle. Hovering or focusing a segment reveals a
 * small preview card beneath it; clicking navigates straight to that
 * project. Rules are hairlines, numbers are mono — editorial, not a UI
 * progress widget.
 *
 * Mobile (<sm): the 7 segments collapse to a compact counter that expands
 * into the complete direct-navigation list.
 *
 * This is GLOBAL project selection and is intentionally distinct from two
 * other systems: chapter numbers, which now appear only locally inside
 * each content section (/06 OUTCOME), and the Next Project scroll-progress
 * line at the foot of the page, which is not clickable. They are never
 * visually merged.
 *
 * Entries whose detail page does not exist yet (the More Work
 * placeholders) render as present but non-navigable rather than linking
 * to a missing route.
 */
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { projectSequence } from '@/data/projectSequence';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/paths';
import { durations, ease, usePrefersReducedMotion } from '@/lib/motion';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function ProjectSequenceNav({
  currentIndex,
  mode = 'floating',
  descriptor,
}: {
  currentIndex: number;
  mode?: 'floating' | 'case-header';
  descriptor?: string;
}) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  const total = projectSequence.length;

  const embedded = mode === 'case-header';

  return (
    <>
      {/* ---------- Desktop: 7 equal segments ---------- */}
      <nav
        aria-label={t('floatingNav.projects')}
        className={`${embedded ? 'relative h-[116px] bg-bg' : 'fixed inset-x-0 top-0 z-40'} hidden sm:block`}
      >
        <div className="mx-auto w-full max-w-site px-5 pt-5 sm:px-8">
          <ul className="flex items-start gap-1.5">
            {projectSequence.map((entry) => {
              const isCurrent = entry.index === currentIndex;
              const title = isZh ? entry.titleZh : entry.title;
              const label = `${pad(entry.index + 1)} — ${title}`;

              const segment = (
                <>
                  <span
                    aria-hidden="true"
                    className={`block h-[2px] w-full transition-colors duration-200 ${
                      isCurrent ? 'bg-accent' : 'bg-line group-hover:bg-muted'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 block font-mono text-[0.6rem] tracking-[0.1em] transition-colors duration-200 ${
                      isCurrent ? 'text-ink' : 'text-muted/60 group-hover:text-muted'
                    }`}
                  >
                    {pad(entry.index + 1)}
                  </span>

                  {/* Hover / focus preview — small and quiet. */}
                  <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 flex w-max max-w-[13rem] items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="block h-10 w-14 shrink-0 overflow-hidden border border-line bg-surface">
                      {entry.poster && (
                        // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimized images
                        <img
                          src={withBasePath(entry.poster)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </span>
                    <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.12em] text-ink">
                      {title}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={entry.id} className="group relative min-w-0 flex-1">
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      aria-label={label}
                      aria-current={isCurrent ? 'page' : undefined}
                      className="block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
                    >
                      {segment}
                    </Link>
                  ) : (
                    // No detail page yet — visible in the sequence, not a link.
                    <span aria-label={label} className="block cursor-default">
                      {segment}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {embedded && (
            <div className="mt-6 grid grid-cols-12 items-baseline gap-x-8">
              <Link href="/projects" className="col-span-3 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-strong">
                ← {t('case.allProjects')}
              </Link>
              <p className="col-span-9 text-right font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-muted lg:whitespace-nowrap">
                {descriptor}
              </p>
            </div>
          )}
        </div>
        {embedded && <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-site px-5 sm:px-8"><div className="case-header-divider" /></div>}
      </nav>

      {/* ---------- Mobile: compact counter + expandable list ---------- */}
      <nav
        aria-label={t('floatingNav.projects')}
        className={`${embedded ? 'relative bg-bg' : 'fixed inset-x-0 top-0 z-40'} sm:hidden`}
      >
        <div className={embedded ? 'bg-bg' : 'border-b border-line bg-bg/90 backdrop-blur-sm'}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center justify-between px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent-strong"
          >
            <span className="text-ink">
              {pad(currentIndex + 1)} <span className="text-muted">/ {pad(total)}</span>
            </span>
            <span className="flex items-center gap-2 text-muted">
              {t('floatingNav.projects')}
              {open ? (
                <X size={13} aria-hidden="true" />
              ) : (
                <Plus size={13} aria-hidden="true" />
              )}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: durations.base, ease }}
                className={embedded ? 'overflow-hidden' : 'overflow-hidden border-t border-line'}
              >
                {projectSequence.map((entry) => {
                  const isCurrent = entry.index === currentIndex;
                  const title = isZh ? entry.titleZh : entry.title;
                  const row = (
                    <span className="flex items-center gap-3 px-5 py-2.5">
                      <span
                        className={`font-mono text-[0.62rem] ${
                          isCurrent ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {pad(entry.index + 1)}
                      </span>
                      <span
                        className={`truncate text-sm ${
                          isCurrent ? 'text-ink' : 'text-muted'
                        }`}
                      >
                        {title}
                      </span>
                    </span>
                  );
                  return (
                    <li key={entry.id} className="border-b border-line/60 last:border-b-0">
                      {entry.href ? (
                        <Link
                          href={entry.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          onClick={() => setOpen(false)}
                          className="block outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent-strong"
                        >
                          {row}
                        </Link>
                      ) : (
                        <span className="block opacity-50">{row}</span>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
          {embedded && (
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 px-5 pb-5 pt-3">
              <Link href="/projects" className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink">
                ← {t('case.allProjects')}
              </Link>
              <p className="col-span-2 max-w-[28rem] font-mono text-[0.64rem] uppercase leading-relaxed tracking-[0.12em] text-muted">
                {descriptor}
              </p>
            </div>
          )}
          {embedded && <div className="mx-5"><div className="case-header-divider" /></div>}
        </div>
      </nav>
    </>
  );
}
