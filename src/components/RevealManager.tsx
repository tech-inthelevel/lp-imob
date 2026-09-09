'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Scroll-reveal effect (GSAP + ScrollTrigger).
 * Animates every `[data-reveal]` element into view once it scrolls near the
 * viewport, honoring an optional `data-reveal-delay` (ms). Sharpens in from a
 * blur along with the usual opacity/y, so text reads as coming into focus
 * rather than just fading up — unless the element carries
 * `data-reveal-blur="off"`, which drops the filter entirely for a plain
 * fade+rise (used in the hero, where the title has its own dedicated
 * line-by-line reveal instead — see setupLineReveal in ScrollFx.tsx — and the
 * surrounding chips/copy shouldn't blur along with it). Respects
 * prefers-reduced-motion by skipping straight to the visible end state.
 */
export function RevealManager() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        noPreference: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');

        if (reduceMotion) {
          gsap.set(els, { opacity: 1, y: 0, filter: 'none' });
          return;
        }

        els.forEach((el) => {
          const delay = Number(el.getAttribute('data-reveal-delay')) || 0;
          const blur = el.getAttribute('data-reveal-blur') !== 'off';

          gsap.fromTo(
            el,
            { opacity: 0, y: 24, ...(blur && { filter: 'blur(6px)' }) },
            {
              opacity: 1,
              y: 0,
              ...(blur && { filter: 'blur(0px)' }),
              duration: 0.9,
              delay: delay / 1000,
              ease: 'imobEaseOut',
              // Blurring a live filter is one of the pricier things to composite —
              // promote the element to its own layer only while it's actually
              // animating (GSAP defaults to force3D for transform/opacity, but not
              // for filter). Several of these can fire within the same ~200ms
              // window on first paint, so trimming this cost matters more here
              // than on a single, isolated reveal. Skipped entirely when there's
              // no filter to promote.
              ...(blur && {
                onStart: () => gsap.set(el, { willChange: 'filter, opacity, transform' }),
                onComplete: () => gsap.set(el, { willChange: 'auto' }),
              }),
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
            },
          );
        });
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
