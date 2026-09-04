'use client';

/**
 * FloatingNavigation — fixed, bottom-center pill dock for the three
 * primary destinations (Projects / About / Labs).
 *
 * Desktop (sm+): icon-only capsule; the hovered/focused item expands to
 * reveal its label via a Framer Motion layout animation (spring, no
 * overshoot). Cards do not attach to the cursor — only the hovered item
 * itself reacts, everything else stays put.
 * Mobile (<sm): a compact three-item bar with icon + label always visible,
 * no hover-expand (no hover on touch), 44px+ tap targets, safe-area aware.
 *
 * Intentionally quieter than the Hero card stack: lighter shadow, no
 * accent color, no cursor-follow physics, no idle motion.
 *
 * Hybrid destinations: Projects is a homepage anchor (#projects) — active
 * state is tracked via IntersectionObserver against the visible section.
 * About and Labs are dedicated routes — active state comes from usePathname.
 * This matches the "dedicated routes" architecture already used by
 * data/projects.ts (project.href → /projects/<slug>/) and FeaturedProject.
 *
 * Mounted once in app/layout.tsx so it persists — and its entrance plays
 * once — across client-side navigation between routes.
 */
import { useEffect, useState, type FocusEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, PanelsTopLeft, UserRound, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/locales/en';
import { durations, ease, heroTiming, springs, usePrefersReducedMotion } from '@/lib/motion';

/* Motion-enhanced Link — lets the anchor itself participate in the
 * FLIP layout animation (pill width) instead of an extra wrapper element. */
const MotionLink = motion(Link);

interface NavItem {
  id: 'projects' | 'about' | 'labs';
  /**
   * Destination. Projects is a homepage anchor — Link + a hash href
   * navigates to "/" first (from another route) or just scrolls (from
   * the homepage) then jumps to #projects; the site's global
   * `scroll-behavior: smooth` (globals.css, already reduced-motion aware)
   * handles the animated scroll with no extra JS. About/Labs keep their
   * trailing slash, matching next.config.mjs trailingSlash:true.
   */
  href: string;
  labelKey: TranslationKey;
  icon: LucideIcon;
}

/* Configuration array — edit destinations here only. */
const NAV_ITEMS: NavItem[] = [
  { id: 'projects', href: '/#projects', labelKey: 'floatingNav.projects', icon: PanelsTopLeft },
  { id: 'about', href: '/about/', labelKey: 'floatingNav.about', icon: UserRound },
  { id: 'labs', href: '/labs/', labelKey: 'floatingNav.lab', icon: Boxes },
];

const SCROLL_COMPACT_THRESHOLD = 48;

const DOCK_SHELL =
  'flex items-center gap-1.5 rounded-full border border-line/70 bg-surface/75 p-1.5 shadow-[0_4px_18px_-8px_rgba(28,26,23,0.2)] backdrop-blur-md';

function normalizePath(pathname: string | null): string {
  const path = pathname ?? '/';
  const stripped = path.replace(/\/$/, '');
  return stripped === '' ? '/' : stripped;
}

/** Tracks whether the page has scrolled past a small threshold. Single
 *  passive listener, rAF-throttled, only re-renders on state change. */
function useScrolledPast(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > threshold;
          return prev === next ? prev : next;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Tracks whether a section is the "current" one using IntersectionObserver
 * (no scroll polling). Re-attaches on every pathname change so it finds
 * the element again after navigating back to the homepage — the target
 * only exists in the DOM there. `rootMargin` treats the section as active
 * once it crosses the vertical center of the viewport, avoiding flicker
 * right at the section edge.
 */
function useSectionActive(id: string, pathname: string | null): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) {
      setActive(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, pathname]);

  return active;
}

export default function FloatingNavigation() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const activePath = normalizePath(pathname);
  const projectsActive = useSectionActive('projects', pathname);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const scrolled = useScrolledPast(SCROLL_COMPACT_THRESHOLD);

  const isItemActive = (item: NavItem): boolean => {
    if (item.id === 'projects') return projectsActive;
    // Stay active on sub-routes too, e.g. /labs/<slug>/ keeps Labs lit.
    const base = item.href.replace(/\/$/, '');
    return activePath === base || activePath.startsWith(`${base}/`);
  };

  // Full clarity while scrolled if the user is actively engaging the dock.
  const dimmed = scrolled && hoveredId === null && !focusWithin;

  const handleFocusCapture = () => setFocusWithin(true);
  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocusWithin(false);
    }
  };

  const entranceInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 };
  const entranceAnimate = reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const entranceTransition = reducedMotion
    ? { duration: durations.fast, ease }
    : { ...springs.navEntrance, delay: heroTiming.nav };

  const clarityAnimate = { opacity: dimmed ? 0.82 : 1, scale: dimmed ? 0.985 : 1 };
  const clarityTransition = { duration: durations.fast, ease };

  return (
    <>
      {/* ---------- Desktop: icon-only dock, hover reveals label ---------- */}
      <motion.nav
        aria-label={t('floatingNav.label')}
        initial={entranceInitial}
        animate={entranceAnimate}
        transition={entranceTransition}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        className="fixed inset-x-0 bottom-6 z-[100] hidden justify-center px-4 sm:flex"
      >
        <motion.ul
          layout
          animate={clarityAnimate}
          transition={clarityTransition}
          onMouseLeave={() => setHoveredId(null)}
          className={DOCK_SHELL}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item);
            const isHovered = hoveredId === item.id;
            const Icon = item.icon;
            const label = t(item.labelKey);

            return (
              <li key={item.id} className="list-none">
                <MotionLink
                  href={item.href}
                  onClick={() => window.dispatchEvent(new Event('portfolio:navigate'))}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={label}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() =>
                    setHoveredId((current) => (current === item.id ? null : current))
                  }
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() =>
                    setHoveredId((current) => (current === item.id ? null : current))
                  }
                  layout
                  whileTap={{ scale: 0.97 }}
                  transition={reducedMotion ? { duration: durations.fast } : springs.navExpand}
                  className={`flex h-11 items-center justify-center gap-2 rounded-full px-3.5 text-[0.8rem] font-medium outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong ${
                    isActive || isHovered
                      ? 'bg-ink/[0.07] text-ink'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <Icon size={19} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={
                          reducedMotion ? { duration: durations.fast } : springs.navExpand
                        }
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </MotionLink>
              </li>
            );
          })}
        </motion.ul>
      </motion.nav>

      {/* ---------- Mobile: compact icon + label bar ---------- */}
      <motion.nav
        aria-label={t('floatingNav.label')}
        initial={entranceInitial}
        animate={entranceAnimate}
        transition={entranceTransition}
        className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
      >
        <motion.ul
          animate={clarityAnimate}
          transition={clarityTransition}
          className="flex w-full max-w-sm items-center gap-1 rounded-full border border-line/70 bg-surface/90 p-1.5 shadow-[0_4px_18px_-8px_rgba(28,26,23,0.2)] backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item);
            const Icon = item.icon;
            const label = t(item.labelKey);

            return (
              <li key={item.id} className="min-w-0 flex-1 list-none">
                <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: durations.fast }}>
                  <Link
                    href={item.href}
                    onClick={() => window.dispatchEvent(new Event('portfolio:navigate'))}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-medium outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong ${
                      isActive ? 'bg-ink/[0.07] text-ink' : 'text-muted'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>
      </motion.nav>
    </>
  );
}
