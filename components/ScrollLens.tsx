'use client';

/**
 * ScrollLens — the site-wide "fisheye while scrolling" detail.
 * Motion reference: monopo.london/work/yonex-astrox-88-sd-launch-campaign.
 *
 * A single SVG feTurbulence → feDisplacementMap filter is mounted ONCE
 * (in Providers) and every media element references it by id. The
 * displacement `scale` is driven by SCROLL VELOCITY rather than scroll
 * progress, so images warp softly while the page is moving and spring
 * back to a perfectly neutral 0 the moment scrolling slows or stops.
 *
 * Why one shared filter: the browser only has to update one attribute per
 * frame no matter how many images use it, and the turbulence field
 * (fixed seed / baseFrequency) can be cached.
 *
 * Consumers call useScrollLensStyle() and spread the result onto the
 * element that should warp — normally the <img>/<video> itself, or a
 * plain wrapper when the image already carries a hover transform.
 * The tiny scale(1.02) exists only so displaced pixels never expose an
 * edge; it is not a zoom.
 *
 * The filter element is always rendered (even under reduced motion, where
 * it simply stays at 0) so no element can ever reference a missing
 * filter id — a missing url() reference hides the element in some
 * browsers. Under reduced motion useScrollLensStyle() returns undefined,
 * so those elements don't reference it at all.
 */
import { useRef, type CSSProperties } from 'react';
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/motion';

export const SCROLL_LENS_ID = 'scroll-lens';

/** Max displacement in px at full scroll speed — kept low so the warp
 *  reads as a soft lens rather than an obvious distortion. */
const MAX_DISPLACEMENT = 8;
/** Scroll speed (px/s) that maps to MAX_DISPLACEMENT. */
const VELOCITY_RANGE = 340;

/**
 * Style to spread onto a media element so it warps with scroll.
 * Returns undefined under reduced motion.
 */
export function useScrollLensStyle(): CSSProperties | undefined {
  const reducedMotion = usePrefersReducedMotion();
  if (reducedMotion) return undefined;
  return {
    filter: `url(#${SCROLL_LENS_ID})`,
    transform: 'scale(1.02)',
  };
}

export default function ScrollLens() {
  const lensRef = useRef<SVGFEDisplacementMapElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const target = useTransform(scrollVelocity, (v) =>
    reducedMotion ? 0 : Math.min(Math.abs(v) / VELOCITY_RANGE, MAX_DISPLACEMENT),
  );
  /* Spring in both directions — this is what gives the warp its elastic
   * swell and its gentle settle back to neutral. */
  const lens = useSpring(target, { stiffness: 110, damping: 20, mass: 0.7 });

  useMotionValueEvent(lens, 'change', (value) => {
    lensRef.current?.setAttribute('scale', value.toFixed(2));
  });

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter
          id={SCROLL_LENS_ID}
          x="-4%"
          y="-4%"
          width="108%"
          height="108%"
          colorInterpolationFilters="sRGB"
        >
          {/* Very low frequency = a large, smooth field: a gentle lens,
              not visible grain. Fixed seed keeps it stable across frames. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.007"
            numOctaves={1}
            seed={7}
            result="lensNoise"
          />
          <feDisplacementMap
            ref={lensRef}
            in="SourceGraphic"
            in2="lensNoise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

