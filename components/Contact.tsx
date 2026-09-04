'use client';

/**
 * Contact — final full-screen homepage section with a scroll-driven
 * "curtain" reveal: the grey CONTACT panel rises up from the bottom and
 * covers the last project, which stays held behind it (a cover / overlap
 * reveal — not a plain scroll-in). Motion reference: the closing section
 * on spencergabor.com + the provided screen recording. Layout/motion only;
 * no content or branding copied. Adapted to this site's system (Barlow
 * Condensed display face, surface/ink/muted tokens).
 *
 * ── How the curtain works (self-contained; ProjectsShowcase untouched) ──
 * The <section> is taller than the viewport and pulled up with a negative
 * margin so it OVERLAPS the tail of ProjectsShowcase. An inner
 * `sticky top-0 h-[100svh]` stage pins to the top of the viewport while
 * that overlap scrolls; the stage is transparent, so the still-pinned last
 * project shows through behind it. A grey panel inside is translated from
 * y:100% (fully below the viewport) to y:0 (fully covering), locked 1:1 to
 * the section's scroll progress via useScroll — so it rises to cover the
 * held project, and reverses when scrolling back up. The panel finishes
 * covering at ~60% and rests covered for the remainder so the details stay
 * readable. z-30 keeps it above the projects but below the floating nav.
 *
 * Under prefers-reduced-motion the curtain is dropped entirely: Contact
 * renders as an ordinary in-flow `min-h-[100svh]` section (no overlap, no
 * transform), so it simply appears — all content and links unchanged.
 *
 * Inner composition (identical in both modes):
 *   - One enormous edge-to-edge uppercase CONTACT, ~viewport-wide, tight
 *     leading, no tracking, near vertical centre; sized in vw and clipped
 *     by overflow-hidden so narrow screens crop it instead of ever making
 *     a horizontal scrollbar.
 *   - A small centred stack of contact links beneath it. Email is the only
 *     stored link; LINKS is a config array so socials can be appended later.
 *   - A low-contrast, accessible copyright line pinned bottom-centre,
 *     respecting the mobile safe-area inset.
 */
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  fadeUp,
  useMotionVariants,
  usePrefersReducedMotion,
  viewportOnce,
} from '@/lib/motion';

/** Single stored contact detail. Add future links here (label + href);
 *  external entries open in a new tab, mailto/tel stay in place. */
const EMAIL = 'lxie082@outlook.com';

interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

const LINKS: ContactLink[] = [
  { label: EMAIL, href: `mailto:${EMAIL}`, external: false },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lisi-xie-5aa373157/',
    external: true,
  },
];

/** The panel's inner content — shared by both the curtain and the
 *  reduced-motion static layouts. */
function ContactContent({
  title,
  emailAria,
  rights,
  wordScaleY,
}: {
  title: string;
  emailAria: string;
  rights: string;
  /** Scroll-locked vertical growth (0→1) for the giant word; omitted under
   *  reduced motion, where the word renders at full height. */
  wordScaleY?: MotionValue<number>;
}) {
  /* In-view reveal for the link stack + copyright: they fade up once the
   * risen panel brings them into the viewport (IntersectionObserver only
   * sees them after the curtain lifts them on-screen). */
  const revealVariants = useMotionVariants(fadeUp);
  return (
    <>
      {/* Centre group: giant word + link stack, vertically centred. */}
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Bottom-origin scaleY growth, kin to Hero's baseline text pop —
            here locked 1:1 to scroll instead of played as an entrance. */}
        <motion.h2
          id="contact-heading"
          style={{
            fontSize: 'min(27vw, 22rem)',
            ...(wordScaleY ? { scaleY: wordScaleY } : {}),
          }}
          className="w-full origin-bottom select-none whitespace-nowrap text-center font-display font-extrabold uppercase leading-[0.8] tracking-[-0.01em] text-ink/20 will-change-transform"
        >
          {title}
        </motion.h2>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealVariants}
          className="mt-6 flex flex-col items-center gap-2 sm:mt-8"
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={link.href.startsWith('mailto:') ? emailAria : link.label}
                className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-ink underline-offset-4 transition-opacity duration-200 hover:underline hover:opacity-60 focus-visible:underline focus-visible:opacity-60 sm:text-base"
              >
                {link.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Bottom-centre copyright — low contrast but accessible. */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={revealVariants}
        className="relative z-10 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted"
      >
        {rights}
      </motion.p>
    </>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Panel rises from fully-below to fully-covering over the first ~60% of
  // the pinned scroll, then rests covered.
  const panelY = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  // The giant word grows vertically (0→100%, bottom origin) as the panel
  // rises and settles — locked to the same scroll progress, so it reverses
  // when scrolling back up. Starts once the panel is partly up, completes
  // just after the panel finishes covering.
  const wordScaleY = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);

  const content = (
    <ContactContent
      title={t('contact.title')}
      emailAria={t('contact.emailAria')}
      rights={t('contact.rights')}
      wordScaleY={reducedMotion ? undefined : wordScaleY}
    />
  );

  // Reduced motion: ordinary in-flow full-screen section, no curtain.
  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        id="contact"
        aria-labelledby="contact-heading"
        className="relative z-30 flex min-h-[100svh] flex-col overflow-hidden bg-surface"
      >
        {content}
      </section>
    );
  }

  /* Curtain reveal. The section overlaps the preceding section's tail
   * (-mt-[100svh]) and is taller than the viewport so the sticky stage
   * pins during the rise.
   *
   * `pointer-events-none` on the section is LOAD-BEARING, not cosmetic:
   * this element sits at z-30 across the last 100svh of whatever precedes
   * it. While the panel is still translated off-screen the stage is
   * invisible, but it would otherwise still swallow hover and clicks on
   * the content underneath (this silently broke the last More Work row's
   * media links). The rising panel sets `pointer-events-auto` on itself,
   * so its own links keep working once it covers the viewport. */
  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        marginTop: 'calc(-1 * var(--contact-runway))',
        height: 'calc(100svh + var(--contact-runway))',
      }}
      className="pointer-events-none relative z-30"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ y: panelY }}
          className="pointer-events-auto flex h-full w-full flex-col overflow-hidden bg-surface will-change-transform"
        >
          {content}
        </motion.div>
      </div>
    </section>
  );
}
