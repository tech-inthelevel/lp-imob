'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

/**
 * Cinematic scroll effects (Apple-style): a hero that zooms/fades out as it
 * scrolls past, a word-by-word headline reveal, a "parts converging" AI-card
 * assembly, scroll-scrubbed zoom/slide entrances, parallax depth on feature
 * visuals, a staggered "fan-in" for card grids, and a sticky-nav backdrop.
 * Parallax is desktop-only — it's a long-running scrub across the full
 * section height, not worth the battery cost on mobile. Everything collapses
 * to the resting state under prefers-reduced-motion.
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

    const mm = gsap.matchMedia();

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
          gsap.set('[data-fx]', { clearProps: 'all', opacity: 1 });
          // Pieces inside the AI-assembly card aren't `[data-fx]` targets
          // themselves (see setupAiAssembly) — reset them explicitly too.
          gsap.set(
            '.imob-feature-ai__avatar, .imob-feature-ai__pill, .imob-feature-ai__core, .imob-feature-ai__line',
            { clearProps: 'all', opacity: 1 },
          );
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
          return;
        }

        setupHeroExit();
        setupMaskTitles();
        setupAiAssembly();
        setupCrmScan();
        setupZoomIns();
        setupSlides();
        setupReports();
        setupCardGroups();
        setupHowConnect();
        setupHowRadar();
        setupHowAgenda();
        setupPulse();

        if (desktop) {
          setupParallax();
        }
      },
    );

    return () => {
      navTrigger.kill();
      mm.revert();
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
  // Note: illustration is also a RevealManager `[data-reveal]` target for its
  // entrance fade — only `scale` is driven here to avoid two tweens fighting
  // over its opacity.
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
  if (!stage) return;

  // The reports panel is a tilted screen, so it gets a "locks into place"
  // entrance rather than the generic zoom the other visuals use: it drifts
  // up from the lower-left, over-rotated, and settles onto the tilt that
  // CSS holds. The tilt itself stays on the inner frame — animating the
  // wrapper keeps GSAP from overwriting that transform.
  gsap.fromTo(
    stage,
    { opacity: 0, scale: 0.82, xPercent: -6, yPercent: 10, rotate: -7 },
    {
      opacity: 1,
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      rotate: 0,
      ease: 'none',
      scrollTrigger: { trigger: stage, start: 'top 90%', end: 'top 42%', scrub: 0.6 },
    },
  );

  // A glare passes over the panel on the way in — it reads as light
  // catching a screen, and sells the surface as a real display.
  const glare = stage.querySelector<HTMLElement>('.imob-feature-reports__glare');
  if (!glare) return;

  gsap
    .timeline({
      scrollTrigger: { trigger: stage, start: 'top 85%', end: 'top 40%', scrub: 0.6 },
    })
    .fromTo(glare, { xPercent: -130 }, { xPercent: 130, ease: 'none', duration: 1 }, 0)
    .fromTo(glare, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0)
    .to(glare, { opacity: 0, ease: 'none', duration: 0.3 }, 0.7);
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
 * The wedge rests spanning 49°–91° off the dish centre (170, 150). CSS
 * rotation is clockwise, so sweeping the beam left-to-right across the dish
 * means running rotation *up* from -130 (leading edge on the left horizon)
 * to +50 (leading edge on the right one).
 */
const HOW_SWEEP_FROM = -130;
const HOW_SWEEP_TO = 50;
const HOW_SWEEP_DURATION = 4.2;

/**
 * Blips keyed to where each marker actually sits around the dish: `p` is
 * `(49 - markerAngle - HOW_SWEEP_FROM) / 180`, i.e. the moment the wedge's
 * leading edge reaches it — so the flash lands under the beam rather than
 * on a guessed beat. Linear easing on the sweep keeps that honest.
 */
const HOW_BLIPS = [
  { sel: '.imob-how-radar__dot', nth: 0, p: 0.104, lift: 1.35 },
  { sel: '.imob-how-radar__dot', nth: 1, p: 0.248, lift: 1.35 },
  { sel: '.imob-how-radar__dot--bad', nth: 0, p: 0.413, lift: 1.35 },
  { sel: '.imob-how-radar__dot', nth: 2, p: 0.624, lift: 1.35 },
  { sel: '.imob-how-radar__avatar', nth: 0, p: 0.844, lift: 1.16 },
  { sel: '.imob-how-radar__avatar', nth: 1, p: 0.956, lift: 1.16 },
];

function setupHowRadar() {
  const art = document.querySelector<HTMLElement>('.imob-how-radar');
  const sweep = art?.querySelector<HTMLElement>('.imob-how-radar__sweep');
  if (!art || !sweep) return;

  // yoyo, not a 360 spin: this is a half-dish, so the beam tracks back and
  // forth across it.
  const tl = inViewLoop(art, { yoyo: true });

  tl.fromTo(
    sweep,
    { rotation: HOW_SWEEP_FROM },
    { rotation: HOW_SWEEP_TO, duration: HOW_SWEEP_DURATION, ease: 'none' },
    0,
  );

  HOW_BLIPS.forEach(({ sel, nth, p, lift }) => {
    const el = art.querySelectorAll<HTMLElement>(sel)[nth];
    if (!el) return;

    tl.to(
      el,
      { scale: lift, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 },
      p * HOW_SWEEP_DURATION,
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
