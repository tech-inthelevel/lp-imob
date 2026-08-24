'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Scroll-reveal effect (GSAP + ScrollTrigger).
 * Animates every `[data-reveal]` element into view once it scrolls near the
 * viewport, honoring an optional `data-reveal-delay` (ms). Respects
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
          gsap.set(els, { opacity: 1, y: 0 });
          return;
        }

        els.forEach((el) => {
          const delay = Number(el.getAttribute('data-reveal-delay')) || 0;
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: delay / 1000,
              ease: 'imobEaseOut',
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
