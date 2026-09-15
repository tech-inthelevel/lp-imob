'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Cinematic scroll effects (Apple-style): a hero that zooms/fades out as it
 * scrolls past, a "parts converging" AI-card assembly, scroll-scrubbed
 * zoom/slide entrances, parallax depth on feature visuals, a staggered
 * "fan-in" for card grids, and a sticky-nav backdrop. Parallax is
 * desktop-only — it's a long-running scrub across the full section height,
 * not worth the battery cost on mobile. Everything collapses to the resting
 * state under prefers-reduced-motion.
 *
 * The word-by-word and line-by-line headline reveals live in TextReveal
 * instead, not here — they need to re-run on every language change (see its
 * doc comment), which would be wasteful to rebuild into this component's
 * mount-once effect.
 */
export function ScrollFx() {
  useEffect(() => {
    // Sticky nav backdrop: a style toggle, not motion, so it runs regardless
    // of the user's reduced-motion preference.
    const navTrigger = ScrollTrigger.create({
      start: 'top -10',
      end: 99999,
      toggleClass: { targets: '.imob-header', className: 'imob-header--scrolled' },
    });

    // Exposes the sticky header's real rendered height as --header-height,
    // which .imob-hero__inner subtracts from its `min-height: 100dvh` floor
    // (globals.css) so the hero's centering lands exactly at the fold
    // instead of running a header's-height past it. Layout math, not
    // motion — runs unconditionally, same reasoning as the nav trigger
    // above.
    const header = document.querySelector<HTMLElement>('.imob-header');
    const syncHeaderHeight = () => {
      if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
      }
    };
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);

    const mm = gsap.matchMedia();

    // Every trigger this creates is for a section below the hero — there's
    // nothing on screen for any of it to do until the visitor actually
    // scrolls that far. Building all of it (mm.add's condition evaluation,
    // a dozen+ ScrollTrigger.create calls, several getBoundingClientRect
    // reads apiece) synchronously during mount taxes the main thread during
    // exactly the window Lighthouse's Total Blocking Time measures, for
    // zero visible benefit — nothing it produces is paintable yet anyway.
    // Deferred to the browser's idle time instead: requestIdleCallback
    // typically still fires within a handful of milliseconds on a page
    // that's done with its critical work, it's just no longer *inside* that
    // critical work. `timeout` is a ceiling so it can't be starved
    // indefinitely if the thread stays busy. Safari has no
    // requestIdleCallback, hence the setTimeout fallback.
    //
    // The whole mm.add call — condition evaluation, every setup*() call,
    // and the ScrollTrigger.refresh() that used to be a separate statement
    // right after it — moves inside this one callback as a single unit.
    // GSAP's matchMedia context capture wraps whatever runs synchronously
    // inside this function; splitting it across two ticks would risk
    // leaving the second half untracked (so it wouldn't auto-revert if the
    // mobile/desktop breakpoint changes) — moving the callback wholesale
    // avoids that split entirely. The relative order every comment below
    // depends on (particularly setupHistoryPin needing to run before this
    // refresh) is unchanged, just later.
    const runIdle: (cb: () => void) => number =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb) => window.requestIdleCallback(cb, { timeout: 150 })
        : (cb) => window.setTimeout(cb, 100);
    const cancelIdle: (id: number) => void =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? (id) => window.cancelIdleCallback(id)
        : (id) => window.clearTimeout(id);

    const idleId = runIdle(() => {
      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          desktop: '(prefers-reduced-motion: no-preference) and (min-width: 901px)',
          mobile: '(prefers-reduced-motion: no-preference) and (max-width: 900px)',
        },
        (context) => {
          const { reduceMotion, desktop } = context.conditions as {
            reduceMotion: boolean;
            desktop: boolean;
            mobile: boolean;
          };

          if (reduceMotion) {
            // Two calls, deliberately. `clearProps` registers at priority -10
            // and GSAP renders PropTweens in descending priority, so pairing
            // it with other props in ONE call means clearProps runs last and
            // its `style.cssText = ""` wipes them right back off — leaving
            // the stylesheet's `opacity: 0` FOUC guards in force and the page
            // invisible. Clear first, then state the resting values.
            const restingFx = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'none' };

            gsap.set('[data-fx]', { clearProps: 'all' });
            gsap.set('[data-fx]', restingFx);
            // Pieces inside the AI-assembly card aren't `[data-fx]` targets
            // themselves (see setupAiAssembly) — reset them explicitly too.
            const aiPieces =
              '.imob-feature-ai__avatar, .imob-feature-ai__pill, .imob-feature-ai__core, .imob-feature-ai__line';
            gsap.set(aiPieces, { clearProps: 'all' });
            gsap.set(aiPieces, restingFx);
            // Freeze the CRM scan at its locked position instead of animating
            // it. The sharp photo piece is static/always visible, but the
            // dots piece is scan-revealed — lock it fully open too (its own
            // box IS the swept region, so 100% local = fully revealed).
            gsap.set('.imob-feature-crm__scanoverlay', {
              clipPath: `polygon(0 0, ${CRM_SCAN_LOCK}% 0, ${CRM_SCAN_LOCK}% 100%, 0 100%)`,
            });
            gsap.set('.imob-feature-crm__photo-dots', {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            });
            gsap.set('.imob-feature-crm__scanline', { left: `${CRM_SCAN_LOCK}%` });
            // The followup connectors don't carry [data-fx] (their length is
            // measured, not just toggled), so the blanket reset above misses
            // them: land on the static dotted line, skip the draw-in ghost.
            gsap.set('.imob-followup-line__flow', { opacity: 1, strokeDasharray: FOLLOWUP_FLOW_DASH, strokeDashoffset: 0 });
            gsap.set('.imob-followup-line__reveal', { opacity: 0 });
            gsap.set('.imob-followup-line__port', { opacity: 1 });
            return;
          }

          setupHeroExit();
          setupAiAssembly();
          setupCrmScan();
          setupZoomIns();
          setupSlides();
          setupReports();
          setupCardGroups();
          setupHowConnect();
          setupHowRadar();
          setupHowAgenda();
          setupFollowupFlow();
          setupPulse();

          if (desktop) {
            setupParallax();
            setupHistoryPin();
          } else {
            // Pinning depends on stable viewport-height math — mobile
            // browsers resize the viewport mid-scroll as their address bar
            // hides/shows, which is a well-known source of pin jank. Same
            // call already made for setupParallax above: skip the pin
            // entirely there and fall back to a plain staggered reveal.
            setupHistorySimple();
          }

          // ScrollFx's triggers are created well after the browser's own
          // `load` event (and GSAP's automatic on-load refresh) have fired —
          // true before this deferral and still true now, just later.
          // setupHistoryPin's pin-spacer specifically depends on the full
          // -page layout pass a real refresh does — without this, it's
          // created at its unpinned natural height (measured: 593px instead
          // of the ~1763px it needs), so the pinned scroll distance silently
          // collapses to zero. Must run after every setup*() call above,
          // which is why it moved inside this callback rather than staying
          // a separate statement after `mm.add` — see the comment at this
          // function's `runIdle` for why the two can't be split apart.
          ScrollTrigger.refresh();
        },
      );
    });

    return () => {
      navTrigger.kill();
      window.removeEventListener('resize', syncHeaderHeight);
      mm.revert();
      cancelIdle(idleId);
    };
  }, []);

  return null;
}

function setupHeroExit() {
  const hero = document.querySelector<HTMLElement>('.imob-hero');
  const content = document.querySelector<HTMLElement>('.imob-hero__content');
  const illustration = document.querySelector<HTMLElement>('.imob-hero__illustration');
  if (!hero || !content || !illustration) return;

  // Deliberately NOT pinned: scroll-jacking the very first section a visitor
  // sees is a fragile, high-blast-radius effect (fights sticky nav stacking,
  // mobile viewport resize, etc.) for a landing page whose job is to convert.
  // This ties the same fade/blur/zoom sensation to the hero's own natural
  // scroll-out transit instead, so it stays cinematic without scroll-jacking.
  //
  // Note: the illustration has no entrance tween of its own — the house SVG
  // draws itself on instead (see Hero.tsx) — so only `scale` is driven here and
  // nothing competes for its opacity.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
    .to(content, { opacity: 0, y: -50, filter: 'blur(6px)', ease: 'none' }, 0)
    .to(illustration, { scale: 1.15, ease: 'none' }, 0);
}

function setupParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.15');

    gsap.fromTo(
      el,
      { y: () => (-window.innerHeight * speed) / 2 },
      {
        y: () => (window.innerHeight * speed) / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

function setupZoomIns() {
  gsap.utils.toArray<HTMLElement>('[data-fx="zoom-in"]').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 45%', scrub: 0.6 },
      },
    );
  });
}

function setupSlides() {
  gsap.utils.toArray<HTMLElement>('[data-fx="slide-left"]').forEach((el) => {
    gsap.fromTo(
      el,
      { x: -56, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.6 },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-fx="slide-right"]').forEach((el) => {
    gsap.fromTo(
      el,
      { x: 56, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: 0.6 },
      },
    );
  });
}

function setupReports() {
  const stage = document.querySelector<HTMLElement>('[data-fx="reports"]');
  const section = stage?.closest<HTMLElement>('.imob-feature');
  if (!stage || !section) return;

  // The reports panel is a tilted screen, so it gets a "locks into place"
  // entrance rather than the generic zoom the other visuals use: it spins
  // up from a much steeper, near-flat angle and settles onto the tilt that
  // CSS holds. The tilt itself stays on the inner frame — animating the
  // wrapper keeps GSAP from overwriting that transform.
  //
  // Triggered off the whole section (not just the image) and ending at
  // `center center`, so the settle isn't tied to the image's own position
  // but to the moment the section — text column and all — is actually
  // centered in the viewport, matching how a reader experiences it.
  gsap.fromTo(
    stage,
    { opacity: 0, scale: 0.78, xPercent: -8, yPercent: 14, rotate: -28 },
    {
      opacity: 1,
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      rotate: 0,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top 90%', end: 'center center', scrub: 0.6 },
    },
  );

  // A glare passes over the panel on the way in — it reads as light
  // catching a screen, and sells the surface as a real display. Same
  // section+center endpoint as the spin above, so the sweep still lands
  // right as the panel finishes settling instead of finishing early.
  const glare = stage.querySelector<HTMLElement>('.imob-feature-reports__glare');
  if (!glare) return;

  gsap
    .timeline({
      scrollTrigger: { trigger: section, start: 'top 85%', end: 'center center', scrub: 0.6 },
    })
    .fromTo(glare, { xPercent: -130 }, { xPercent: 130, ease: 'none', duration: 1 }, 0)
    .fromTo(glare, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0)
    .to(glare, { opacity: 0, ease: 'none', duration: 0.3 }, 0.7);
}

function setupAiAssembly() {
  const card = document.querySelector<HTMLElement>('.imob-feature-ai__card');
  if (!card) return;

  const core = card.querySelector<HTMLElement>('.imob-feature-ai__core');
  const avatars = Array.from(card.querySelectorAll<HTMLElement>('.imob-feature-ai__avatar'));
  const pills = Array.from(card.querySelectorAll<HTMLElement>('.imob-feature-ai__pill'));
  const lines = Array.from(card.querySelectorAll<HTMLElement>('.imob-feature-ai__line'));
  if (!core || !avatars.length) return;

  // The card itself already has a `zoom-in` entrance; this choreographs its
  // pieces — channel pills and avatars — converging into place from
  // scattered offsets on opposite sides, like components assembling.
  //
  // These use fromTo (not from) with an explicit end state: the CSS FOUC
  // guard starts them at opacity:0, so a plain `.from()` would treat that
  // already-zero opacity as its own resting value and never reveal them.
  gsap
    .timeline({
      scrollTrigger: { trigger: card, start: 'top 82%', end: 'top 30%', scrub: 0.6 },
    })
    .fromTo(lines, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
    .fromTo(
      core,
      { opacity: 0, scale: 0, rotate: -60 },
      { opacity: 1, scale: 1, rotate: 0, ease: 'none' },
      0.05,
    )
    .fromTo(
      avatars,
      {
        opacity: 0,
        x: (i: number) => (i % 2 === 0 ? 70 : -70),
        y: -50,
        scale: 0.4,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        stagger: 0.06,
        ease: 'none',
      },
      0.15,
    )
    .fromTo(
      pills,
      {
        opacity: 0,
        x: (i: number) => (i % 2 === 0 ? -60 : 60),
        y: 50,
        scale: 0.5,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        stagger: 0.06,
        ease: 'none',
      },
      0.2,
    );
}

// CRM scan lock point, as a percentage of the 550x449 Figma frame — the
// real scanline's x (node 1:346, 256.354px). The two photo pieces (nodes
// 1:343 / 1:344) are at their exact Figma size/position; the elliptical
// mask on `.imob-feature-crm__photoframe` (not a scale-down) is what keeps
// the jacket clear of the label column, so this seam position is Figma's
// raw value again.
const CRM_SCAN_LOCK = 46.61;
// Dots piece's own box, as card-relative percentages (node 1:343: x 20.39,
// w 233.808 of the 550-wide frame) — used to reproject `p` (card-relative)
// into that element's own local clip-path percentages.
const CRM_DOTS_LEFT = 3.707;
const CRM_DOTS_WIDTH = 42.51;

/**
 * Figma's green panel gradient (node 1:345), with the stop positions scaled
 * to end at `p`. Figma authors it as a 180deg gradient on a rotate(90deg)
 * rect, which resolves to opaque #076347 at the scanline fading to
 * transparent going left — so the stops below are its reversed offsets.
 */
function crmScanGradient(p: number) {
  return (
    'linear-gradient(90deg,' +
    ' rgba(122, 185, 164, 0) 0%,' +
    ` rgba(94, 185, 155, .5) ${(p * 0.399).toFixed(2)}%,` +
    ` rgba(48, 185, 140, .8) ${(p * 0.7).toFixed(2)}%,` +
    ` rgba(16, 185, 129, .9) ${(p * 0.85).toFixed(2)}%,` +
    ` #076347 ${p.toFixed(2)}%)`
  );
}

function setupCrmScan() {
  const container = document.querySelector<HTMLElement>('.imob-feature-crm__visual');
  const overlay = document.querySelector<HTMLElement>('.imob-feature-crm__scanoverlay');
  const dots = document.querySelector<HTMLElement>('.imob-feature-crm__photo-dots');
  const scanLine = document.querySelector<HTMLElement>('.imob-feature-crm__scanline');
  if (!container || !overlay) return;

  // Sweeps a "data scan" pass tied directly to scroll position — not a
  // fixed-duration tween — so it runs forward on the way down and backward
  // on the way up, like a scanner tracking the page. Locks at CRM_SCAN_LOCK
  // (the seam between the two photo pieces) rather than sweeping the full
  // width; past `end` the tween just holds. The range ends at "top 35%" so
  // the sweep finishes while the card is still comfortably on screen, not
  // scrolled halfway past it.
  //
  // The sharp photo is always visible underneath; the dots piece is clipped
  // in lockstep with the green tint (reprojected into its own box's local
  // percentages) so it only ever appears together with the scan, never
  // before it.
  const state = { p: 0 };

  gsap.to(state, {
    p: CRM_SCAN_LOCK,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      end: 'top 35%',
      scrub: 0.4,
    },
    onUpdate: () => {
      const p = Math.max(state.p, 0.01);
      overlay.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
      overlay.style.background = crmScanGradient(p);
      if (scanLine) scanLine.style.left = `${p}%`;

      if (dots) {
        const local = gsap.utils.clamp(0, 100, ((p - CRM_DOTS_LEFT) / CRM_DOTS_WIDTH) * 100);
        dots.style.clipPath = `polygon(0 0, ${local}% 0, ${local}% 100%, 0 100%)`;
      }
    },
  });
}

function setupCardGroups() {
  document.querySelectorAll<HTMLElement>('[data-fx-group="cards"]').forEach((group) => {
    const cards = Array.from(group.querySelectorAll<HTMLElement>('[data-fx="card"]'));
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 64, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'imobEaseOut',
        stagger: 0.12,
        scrollTrigger: { trigger: group, start: 'top 82%', once: true },
      },
    );
  });
}

/**
 * Ambient loops for the three "Como funciona" cards. They only run while
 * their card is on screen (`play pause resume pause`) so an idle tab isn't
 * burning frames, and each one animates a dedicated layer so the Figma
 * transforms underneath stay in CSS.
 */

// Emission order round-trips the badge: top-left, top-right, bottom-left,
// bottom-right — so the four channels never fire as one blob.
const HOW_ROUTES = ['filter', 'whatsapp', 'instagram', 'sms'] as const;
const HOW_PACKET_TRAVEL = 1.15;
const HOW_PACKET_GAP = 0.5;

function inViewLoop(trigger: Element, vars: gsap.TimelineVars = {}) {
  return gsap.timeline({
    repeat: -1,
    ...vars,
    scrollTrigger: {
      trigger,
      start: 'top 92%',
      end: 'bottom top',
      toggleActions: 'play pause resume pause',
    },
  });
}

function setupHowConnect() {
  const art = document.querySelector<HTMLElement>('.imob-how-connect');
  if (!art) return;

  const tl = inViewLoop(art);

  HOW_ROUTES.forEach((route, i) => {
    const packet = art.querySelector<HTMLElement>(`[data-packet="${route}"]`);
    const node = art.querySelector<HTMLElement>(`.imob-how-connect__node--${route}`);
    if (!packet) return;

    const at = i * HOW_PACKET_GAP;

    // The packet rides the connector's own path — see ELBOW in HowItWorks.
    tl.fromTo(
      packet,
      { offsetDistance: '0%' },
      { offsetDistance: '100%', duration: HOW_PACKET_TRAVEL, ease: 'power1.inOut' },
      at,
    )
      .fromTo(packet, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: 'none' }, at)
      .to(packet, { opacity: 0, duration: 0.2, ease: 'none' }, at + HOW_PACKET_TRAVEL - 0.2);

    // The icon takes the hit as the packet lands.
    if (node) {
      tl.to(
        node,
        { scale: 1.14, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 },
        at + HOW_PACKET_TRAVEL - 0.12,
      );
    }
  });

  // A beat of quiet before the next round.
  tl.to({}, { duration: 0.7 });
}

/**
 * Radar sweep geometry, all measured off the dish centre (170, 150) rather
 * than eyeballed. The wedge is 41.4° wide, spanning 49.3°–90.7° at rest.
 * CSS rotation is clockwise, so the beam crosses the dish left-to-right as
 * rotation *increases*:
 *
 *   -130.7  leading edge touches the left horizon (fully entering)
 *     90.7  trailing edge clears the right horizon (fully gone)
 *    229.3  = -130.7 + 360, i.e. visually identical to the start
 *
 * It turns one way for a full revolution and wraps at an identical angle —
 * a radar never reverses, and a yoyo here read as a broken effect. Because
 * the dish is a semicircle clipped at its baseline, the back 138.6° of that
 * revolution is entirely below the cut and can't be seen, so it's spun
 * through quickly: the beam reappears promptly instead of leaving the dish
 * dead for as long as it was lit. The speed change happens entirely
 * off-screen, so what you actually see is one constant-rate pass.
 */
const HOW_SWEEP_FROM = -130.7;
const HOW_SWEEP_EXIT = 90.7;
const HOW_SWEEP_WRAP = HOW_SWEEP_FROM + 360;
const HOW_SWEEP_VISIBLE = 3.6;
const HOW_SWEEP_HIDDEN = 0.9;

/**
 * Blips keyed to where each marker actually sits around the dish. `p` is
 * its position within the *visible* pass — `(49.3 - markerAngle -
 * HOW_SWEEP_FROM) / 221.4` — i.e. the moment the wedge's leading edge
 * reaches it, so the flash lands under the beam rather than on a guessed
 * beat. Angles came from measuring the rendered markers; linear easing on
 * the sweep is what keeps the mapping honest.
 */
const HOW_BLIPS = [
  { sel: '.imob-how-radar__dot', nth: 0, p: 0.085, lift: 1.35 },
  { sel: '.imob-how-radar__dot', nth: 1, p: 0.200, lift: 1.35 },
  { sel: '.imob-how-radar__dot--bad', nth: 0, p: 0.338, lift: 1.35 },
  { sel: '.imob-how-radar__dot', nth: 2, p: 0.512, lift: 1.35 },
  { sel: '.imob-how-radar__avatar', nth: 0, p: 0.692, lift: 1.16 },
  { sel: '.imob-how-radar__avatar', nth: 1, p: 0.787, lift: 1.16 },
];

function setupHowRadar() {
  const art = document.querySelector<HTMLElement>('.imob-how-radar');
  // The whole beam group — filled wedge plus its pointer spokes — so the
  // two never drift apart mid-sweep.
  const beam = art?.querySelector<HTMLElement>('.imob-how-radar__beam');
  if (!art || !beam) return;

  const tl = inViewLoop(art);

  // One revolution, always the same direction, wrapping on an angle that
  // matches where it began — so `repeat: -1` is seamless.
  tl.fromTo(
    beam,
    { rotation: HOW_SWEEP_FROM },
    { rotation: HOW_SWEEP_EXIT, duration: HOW_SWEEP_VISIBLE, ease: 'none' },
    0,
  ).to(
    beam,
    { rotation: HOW_SWEEP_WRAP, duration: HOW_SWEEP_HIDDEN, ease: 'none' },
    HOW_SWEEP_VISIBLE,
  );

  // The lit trail's angular gradient turns on the same schedule. It can't
  // simply live inside the beam group: that would rotate the half-disc's
  // silhouette along with it (see RADAR_TRAIL_SVG). So it's a separate
  // target — but placed at the same timeline positions with the same
  // durations and easing, so it stays locked to the pointer by
  // construction rather than by two clocks happening to agree.
  // `svgOrigin` is in the SVG's own user units: (150, 150) is the dish
  // centre in its 300x150 viewBox, matching the gradient's own centre.
  const trailSpin = art.querySelector<SVGGElement>('.imob-how-radar__trail-spin');
  if (trailSpin) {
    tl.fromTo(
      trailSpin,
      { rotation: HOW_SWEEP_FROM, svgOrigin: '150 150' },
      { rotation: HOW_SWEEP_EXIT, svgOrigin: '150 150', duration: HOW_SWEEP_VISIBLE, ease: 'none' },
      0,
    ).to(
      trailSpin,
      { rotation: HOW_SWEEP_WRAP, svgOrigin: '150 150', duration: HOW_SWEEP_HIDDEN, ease: 'none' },
      HOW_SWEEP_VISIBLE,
    );
  }

  HOW_BLIPS.forEach(({ sel, nth, p, lift }) => {
    const el = art.querySelectorAll<HTMLElement>(sel)[nth];
    if (!el) return;

    tl.to(
      el,
      { scale: lift, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 },
      p * HOW_SWEEP_VISIBLE,
    );
  });
}

function setupHowAgenda() {
  const art = document.querySelector<HTMLElement>('.imob-how-agenda');
  const map = art?.querySelector<HTMLElement>('.imob-how-agenda__map img');
  const faces = art ? gsap.utils.toArray<HTMLElement>('.imob-how-agenda__card-face', art) : [];
  if (!art || !map || !faces.length) return;

  // The calendar arrives from depth, then the booking stacks onto it — so
  // this one wants a pause between runs rather than a continuous loop.
  const tl = inViewLoop(art, { repeatDelay: 2.6 });

  tl.fromTo(
    map,
    { opacity: 0, scale: 0.4, rotationX: 54, transformPerspective: 620 },
    { opacity: 1, scale: 1, rotationX: 0, duration: 1.1, ease: 'imobEaseOut' },
    0,
  ).fromTo(
    // The face sits inside the card wrapper that already carries Figma's
    // tilt, so it only needs depth + lift of its own.
    faces,
    { opacity: 0, scale: 0.55, y: 28, rotationX: 58, transformPerspective: 620 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      stagger: 0.18,
      ease: 'back.out(1.4)',
    },
    0.6,
  );
}

// Dash period of the ambient "flowing" connector (round-cap dot + gap). The
// loop below travels 8 whole periods, so it wraps with no visible jump.
const FOLLOWUP_FLOW_DASH = '1 7';
const FOLLOWUP_FLOW_PERIOD = 8;

function setupFollowupFlow() {
  const visual = document.querySelector<HTMLElement>('.imob-feature-followup__visual');
  const cards = visual ? gsap.utils.toArray<HTMLElement>('[data-fx="followup-card"]', visual) : [];
  const reveals = visual ? gsap.utils.toArray<SVGPathElement>('.imob-followup-line__reveal', visual) : [];
  const flows = visual ? gsap.utils.toArray<SVGPathElement>('.imob-followup-line__flow', visual) : [];
  // DOM order matches LINE_1/LINE_2 in FeatureFollowup.tsx: port 0 sits on
  // the trigger card, 1 and 2 both sit on condition (its entry and exit
  // edges), 3 sits on action.
  const ports = visual ? gsap.utils.toArray<SVGCircleElement>('.imob-followup-line__port', visual) : [];
  if (!visual || cards.length < 3 || reveals.length < 2 || flows.length < 2 || ports.length < 4) return;

  // The classic SVG line-draw trick: a dash exactly as long as the path
  // itself is indistinguishable from a solid stroke, so animating its
  // offset from full to 0 reveals the line growing from start to end.
  // Each curve's length is measured, not hardcoded, since it depends on
  // exactly how the browser rasterizes the bezier.
  reveals.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(flows, { strokeDasharray: FOLLOWUP_FLOW_DASH });

  const CARD_POP = 0.4;
  const LINE_DRAW = 0.5;
  const DOT_FADE = 0.2;
  const OVERLAP = 0.1;

  // Card lands, the connector out of it draws toward the next one, that
  // card lands as the draw finishes — tied to scroll position (not a
  // timer), via `ease: 'none'` throughout since the scrub itself supplies
  // the easing. Scrolling back up disassembles the diagram the same way it
  // assembled going down.
  const card1 = 0;
  const line1 = card1 + CARD_POP - OVERLAP;
  const line1Done = line1 + LINE_DRAW;
  const card2 = line1Done - OVERLAP;
  const card2Done = card2 + CARD_POP;
  const line2 = card2Done - OVERLAP;
  const line2Done = line2 + LINE_DRAW;
  const card3 = line2Done - OVERLAP;
  const card3Done = card3 + CARD_POP;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: visual, start: 'top 85%', end: 'top 30%', scrub: 0.6 },
  });

  tl.to(cards[0], { opacity: 1, y: 0, scale: 1, duration: CARD_POP, ease: 'none' }, card1)
    .to(reveals[0], { strokeDashoffset: 0, duration: LINE_DRAW, ease: 'none' }, line1)
    .to(flows[0], { opacity: 1, duration: DOT_FADE, ease: 'none' }, line1Done - DOT_FADE)
    .to(cards[1], { opacity: 1, y: 0, scale: 1, duration: CARD_POP, ease: 'none' }, card2)
    .to(reveals[1], { strokeDashoffset: 0, duration: LINE_DRAW, ease: 'none' }, line2)
    .to(flows[1], { opacity: 1, duration: DOT_FADE, ease: 'none' }, line2Done - DOT_FADE)
    .to(cards[2], { opacity: 1, y: 0, scale: 1, duration: CARD_POP, ease: 'none' }, card3)
    // Each port is a mark ON a specific card, so it only makes sense once
    // that card has actually finished landing — never while its card is
    // still mid-pop or, worse, hasn't appeared yet.
    .to(ports[0], { opacity: 1, duration: 0.15, ease: 'none' }, card1 + CARD_POP)
    .to([ports[1], ports[2]], { opacity: 1, duration: 0.15, ease: 'none' }, card2Done)
    .to(ports[3], { opacity: 1, duration: 0.15, ease: 'none' }, card3Done)
    .addLabel('line1done', line1Done)
    .addLabel('line2done', line2Done);

  // Ambient "data flowing" loop on each connector: an infinite repeat can't
  // itself be scrubbed, so it's gated by a *second*, ordinary ScrollTrigger
  // instead — positioned via labelToScroll, GSAP's mechanism for reading a
  // scroll-pixel position back out of a label inside a scrubbed timeline.
  // Reversible like the rest: scrolling back above that point pauses it
  // again, same as the draw-in undoing.
  const st = tl.scrollTrigger!;

  ([['line1done', flows[0]], ['line2done', flows[1]]] as const).forEach(([label, path]) => {
    const loop = gsap.to(path, {
      strokeDashoffset: -8 * FOLLOWUP_FLOW_PERIOD,
      duration: 3.2,
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    ScrollTrigger.create({
      trigger: visual,
      start: () => st.labelToScroll(label),
      end: 'bottom top',
      toggleActions: 'play pause resume pause',
      animation: loop,
    });
  });
}

/**
 * Pins the FEATURE 5 (history) section at the top of the viewport and
 * spends a fixed scroll budget revealing its timeline items one at a time
 * — "the page holds still while the list builds" — before releasing back
 * into normal scroll for HowItWorks. Desktop-only: see the call site for
 * why (mobile viewport-height instability during pin).
 */
/**
 * Where the pin should hold the section vertically: centered in whatever
 * viewport space is actually free below the sticky header, not jammed up
 * against it. Falls back to right-below-the-header if the section is
 * taller than that free space (can't center something that doesn't fit).
 * A function (not a computed-once constant) so it tracks header height and
 * viewport size across refreshes/resizes.
 */
function historyPinTop(section: HTMLElement) {
  const headerOffset = document.querySelector('.imob-header')?.getBoundingClientRect().height ?? 0;
  const free = window.innerHeight - headerOffset;
  const centered = headerOffset + Math.max(0, (free - section.getBoundingClientRect().height) / 2);
  return `top ${Math.round(centered)}`;
}

function setupHistoryPin() {
  const section = document.querySelector<HTMLElement>('.imob-feature-history');
  const items = section ? gsap.utils.toArray<HTMLElement>('[data-fx="history-item"]', section) : [];
  if (!section || items.length < 2) return;

  const ITEM_DURATION = 1;
  const ITEM_OVERLAP = 0.25;
  const STEP = ITEM_DURATION - ITEM_OVERLAP;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: () => historyPinTop(section),
      // Scroll budget scales with viewport height rather than a fixed
      // pixel count, so the pace (px of scroll per item) stays consistent
      // across screen sizes. Re-evaluated on resize since it's a function.
      end: () => `+=${Math.round(window.innerHeight * 1.3)}`,
      scrub: 0.6,
      pin: true,
      // Precomputes the pin's start a frame early so the very first scroll
      // tick after engaging doesn't show a one-frame jump — GSAP's own fix
      // for exactly the "travas" (jank) this section needs to avoid.
      anticipatePin: 1,
      // This pin adds its whole scroll budget to the document, pushing every
      // section below it down. ScrollTrigger only sorts triggers by document
      // position when at least one declares refreshPriority (see `_sort` in
      // ScrollTrigger.js) — without it they refresh in *creation* order, and
      // the "Como funciona" loops are created before this pin, so they'd
      // measure against a document that hasn't grown yet and end up ~1170px
      // too high. Their triggers would then already be past `end` by the
      // time you actually reach the section, leaving the cards frozen.
      refreshPriority: 1,
    },
  });

  items.forEach((item, i) => {
    tl.to(
      item,
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: ITEM_DURATION, ease: 'none' },
      i * STEP,
    );
  });

  // Trailing idle scroll after the last item lands, purely so the pin
  // doesn't release the instant it finishes — a beat of "held" time before
  // handing off feels like a natural pause, not an abrupt cutoff.
  tl.to({}, { duration: 0.6 });
}

/** Mobile/tablet fallback: same items, no pin — just a plain once-off
 * stagger as the section scrolls into view (mirrors setupCardGroups). */
function setupHistorySimple() {
  const items = gsap.utils.toArray<HTMLElement>('[data-fx="history-item"]');
  if (!items.length) return;

  gsap.to(items, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.6,
    stagger: 0.15,
    ease: 'imobEaseOut',
    scrollTrigger: { trigger: '.imob-feature-history', start: 'top 75%', once: true },
  });
}

function setupPulse() {
  const glow = document.querySelector<HTMLElement>('[data-fx="pulse"]');
  if (!glow) return;

  gsap.to(glow, {
    scale: 1.08,
    opacity: 0.85,
    duration: 2.4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    scrollTrigger: {
      trigger: glow,
      start: 'top 90%',
      end: 'bottom top',
      toggleActions: 'play pause resume pause',
    },
  });
}

