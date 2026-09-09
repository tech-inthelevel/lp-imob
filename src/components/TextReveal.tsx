'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';
import { useI18n } from '@/lib/i18n/context';

/**
 * Owns the two headline entrance effects that run through SplitText:
 * mask-title's word-by-word reveal and line-reveal's per-line "rising into
 * place". Deliberately separate from ScrollFx and re-run on every
 * `language` change (not just on mount).
 *
 * Why: SplitText rebuilds an element's children into new nodes (see its
 * `mask` option), which detaches whatever React originally rendered there
 * from React's fiber tree. If language changes afterwards, React dutifully
 * updates the *old*, now-invisible nodes it still holds references to — the
 * split copy on screen never gets the memo, so the heading stays frozen in
 * whatever language it had when SplitText first ran. Pairing this effect
 * with `key={language}` on every `[data-fx="mask-title"]` /
 * `[data-fx="line-reveal"]` target forces React to fully remount that
 * element with fresh, correctly-translated text on each change; this effect
 * just needs to find the new node and split it again.
 */
export function TextReveal() {
  const { language } = useI18n();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        noPreference: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };
        const targets = '[data-fx="mask-title"], [data-fx="line-reveal"]';

        if (reduceMotion) {
          gsap.set(targets, { clearProps: 'all' });
          gsap.set(targets, { opacity: 1, y: 0, scale: 1, filter: 'none' });
          return;
        }

        setupMaskTitles();
        setupLineReveal();
        // Translated text rarely wraps to the same number/length of lines as
        // the language it replaced — re-measure trigger positions against
        // the freshly split (and possibly re-flowed) layout.
        ScrollTrigger.refresh();
      },
    );

    return () => mm.revert();
  }, [language]);

  return null;
}

function setupMaskTitles() {
  // Word-by-word reveal (the "iPhone. Now in Titanium." treatment) rather
  // than a blanket fade — each word rises into place with a short stagger.
  gsap.utils.toArray<HTMLElement>('[data-fx="mask-title"]').forEach((el) => {
    gsap.set(el, { opacity: 1, scale: 1, filter: 'none' });

    const split = new SplitText(el, { type: 'words', wordsClass: 'imob-split-word' });

    gsap.fromTo(
      split.words,
      { opacity: 0.12, y: 28, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'imobEaseOut',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
  });
}

function setupLineReveal() {
  // Each line rises up from behind an overflow-hidden mask (SplitText's
  // `mask: 'lines'`, which wraps every line in its own clipped container)
  // instead of fading in — no blur, no opacity ramp, just the line sliding
  // up into place, bottom line first up through the top one.
  gsap.utils.toArray<HTMLElement>('[data-fx="line-reveal"]').forEach((el) => {
    gsap.set(el, { opacity: 1, y: 0 });

    // autoSplit: line breaks depend on the container's width at the moment
    // SplitText measures it — too early (web font not swapped in yet, layout
    // still settling) and the line breaks lock in wrong. This re-splits on
    // resize and on font load instead of trusting that first measurement.
    const split = new SplitText(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'imob-split-line',
      autoSplit: true,
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'imobEaseOut',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
  });
}
