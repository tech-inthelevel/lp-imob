/**
 * Makes the hero house draw itself on, like a pencil sketch.
 *
 * Takes the flat Figma export (`public/assets/imob/hero-casa.svg`) and rewrites it
 * into a self-animating SVG: every stroked line is split into its own <path> and
 * draws on via stroke-dashoffset, and the tree/bush foliage — exported by Figma as
 * filled contours, which can't be dash-drawn — inks in afterwards in bands.
 *
 * The animation lives in a <style> block inside the SVG, so it still works when
 * loaded through an <object> in HeroCasa.tsx — NOT a plain <img src>, which
 * freezes CSS animations inside the SVG on their first frame. <object> embeds
 * it as its own document instead, so the animation plays AND the file stays a
 * separate, cacheable request rather than getting inlined into every HTML
 * response. Its clock starts when the browser paints the object, which is why
 * the illustration is no longer a `[data-reveal]` target — the drawing *is*
 * its entrance.
 *
 * Idempotent: re-run it in place after changing the timing knobs below.
 *
 *   node scripts/animate-casa.mjs public/assets/imob/hero-casa.svg
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = process.argv[2] || 'public/assets/imob/hero-casa.svg';
const OUT = process.argv[3] || SRC;

// ---- timing knobs (ms) --------------------------------------------------
const START = 260;         // beat before the first line, so the draw reads as deliberate
const SPEED = 1100;        // "pencil speed" in SVG user units per second
const DMIN = 100, DMAX = 320;  // clamp per-line duration: no line crawls or flicks
const LINES_SPAN = 1750;   // first line start -> last line start
const HATCH_BAND = 120;    // max contours per foliage band, revealed in export order
const HATCH_AT = 0.62;     // point in the line phase where foliage starts inking
const HATCH_SPAN = 820;    // across all foliage bands
const HATCH_DUR = 460;     // per band
const SLACK = 1.02;        // dash length margin over the measured path length
// -------------------------------------------------------------------------

// Drop a previously generated <style> block so re-runs stay idempotent.
const src = readFileSync(SRC, 'utf8').replace(/\s*<style>[\s\S]*?<\/style>/g, '');

/** Length of a cubic segment, by 8-way subdivision. */
function bez(p) {
  let l = 0, px = p[0][0], py = p[0][1];
  for (let i = 1; i <= 8; i++) {
    const t = i / 8, u = 1 - t;
    const x = u*u*u*p[0][0] + 3*u*u*t*p[1][0] + 3*u*t*t*p[2][0] + t*t*t*p[3][0];
    const y = u*u*u*p[0][1] + 3*u*u*t*p[1][1] + 3*u*t*t*p[2][1] + t*t*t*p[3][1];
    l += Math.hypot(x - px, y - py); px = x; py = y;
  }
  return l;
}

/** Path length, close enough to seed stroke-dasharray (the export is absolute-only). */
function pathLen(d) {
  let len = 0, cx = 0, cy = 0, sx = 0, sy = 0;
  const re = /([MLHVCZ])([^MLHVCZ]*)/gi;
  let m;
  while ((m = re.exec(d))) {
    const cmd = m[1].toUpperCase();
    const n = (m[2].match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []).map(Number);
    if (cmd === 'M') {
      for (let i = 0; i < n.length; i += 2) {
        if (i === 0) { cx = n[0]; cy = n[1]; sx = cx; sy = cy; }
        else { len += Math.hypot(n[i] - cx, n[i+1] - cy); cx = n[i]; cy = n[i+1]; }
      }
    } else if (cmd === 'L') {
      for (let i = 0; i < n.length; i += 2) { len += Math.hypot(n[i]-cx, n[i+1]-cy); cx = n[i]; cy = n[i+1]; }
    } else if (cmd === 'H') { for (const x of n) { len += Math.abs(x - cx); cx = x; } }
    else if (cmd === 'V') { for (const y of n) { len += Math.abs(y - cy); cy = y; } }
    else if (cmd === 'C') {
      for (let i = 0; i < n.length; i += 6) {
        len += bez([[cx,cy],[n[i],n[i+1]],[n[i+2],n[i+3]],[n[i+4],n[i+5]]]);
        cx = n[i+4]; cy = n[i+5];
      }
    } else if (cmd === 'Z') { len += Math.hypot(sx - cx, sy - cy); cx = sx; cy = sy; }
  }
  return len;
}

const splitSubpaths = (d) => d.trim().split(/(?=M)/).map((s) => s.trim()).filter(Boolean);
const attrOf = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [, null])[1];
/** Keep the paint attributes, drop everything we re-emit (and ids we'd duplicate). */
const head = (tag, keepId) =>
  tag
    .replace(/\s(?:d|class|style|pathLength)="[^"]*"/g, '')
    .replace(keepId ? /(?!)/ : /\sid="[^"]*"/g, '')
    .replace(/^<\w+/, '')
    .replace(/\s*\/?>$/, '');

const pieces = [];
const lines = [];
const bands = [];

let cursor = 0;
const tagRe = /<(path|circle|ellipse|rect)\b([^>]*?)\/?>/g;
let m;
while ((m = tagRe.exec(src))) {
  pieces.push(src.slice(cursor, m.index));
  cursor = m.index + m[0].length;

  const [tag, name] = m;
  const stroke = attrOf(tag, 'stroke');
  const fill = attrOf(tag, 'fill');
  const d = attrOf(tag, 'd');

  if (stroke && d) {
    // A stroked path: one animated element per subpath, so each line draws on its own.
    const subs = splitSubpaths(d);
    const attrs = head(tag, subs.length === 1);
    for (const sp of subs) {
      const rec = { len: pathLen(sp) };
      lines.push(rec);
      pieces.push({ kind: 'line', rec, d: sp, name, attrs });
    }
  } else if (stroke) {
    // A stroked shape with no path data (the door handle circle).
    const r = Number(attrOf(tag, 'r') || 6);
    const rec = { len: 2 * Math.PI * r };
    lines.push(rec);
    pieces.push({ kind: 'line', rec, d: null, name, attrs: head(tag, true) });
  } else if (d && fill && fill.toLowerCase() !== 'white' && fill !== 'none') {
    // Foliage: filled contours, so it inks in in bands instead of drawing on.
    const subs = splitSubpaths(d);
    const attrs = head(tag, false);
    // Sized by an absolute cap rather than a fixed band count, so re-running the
    // script on its own output re-splits each band into exactly itself.
    const per = Math.ceil(subs.length / Math.ceil(subs.length / HATCH_BAND));
    for (let i = 0; i < subs.length; i += per) {
      const rec = {};
      bands.push(rec);
      pieces.push({ kind: 'band', rec, d: subs.slice(i, i + per).join(''), name, attrs });
    }
  } else {
    pieces.push(tag); // white backing shapes: nothing to animate
  }
}
pieces.push(src.slice(cursor));

// Lines run back to back with heavy overlap, each one's slice of the phase
// proportional to how long it takes to draw.
for (const l of lines) l.dur = Math.min(DMAX, Math.max(DMIN, (l.len / SPEED) * 1000));
const weight = lines.reduce((s, l) => s + l.dur, 0);
let t = START;
for (const l of lines) {
  l.t = Math.round(t);
  t += (l.dur / weight) * LINES_SPAN;
  l.dur = Math.round(l.dur);
  l.len = Math.ceil(l.len * SLACK);
}
const linesEnd = Math.round(t + (lines.at(-1)?.dur ?? 0));

const bandStart = START + LINES_SPAN * HATCH_AT;
bands.forEach((b, i) => {
  b.t = Math.round(bandStart + (bands.length > 1 ? (i / (bands.length - 1)) * HATCH_SPAN : 0));
});
const bandsEnd = Math.round(bandStart + HATCH_SPAN + HATCH_DUR);

const css = `<style>
  /* Generated by scripts/animate-casa.mjs — edit the knobs there, not here.
     --l is the line's length (dash seed), --t its start, --d how long it draws. */
  @media (prefers-reduced-motion: no-preference) {
    .l {
      stroke-dasharray: var(--l);
      stroke-dashoffset: var(--l);
      animation-name: casa-draw;
      animation-duration: calc(var(--d) * 1ms);
      animation-delay: calc(var(--t) * 1ms);
      animation-timing-function: cubic-bezier(.3, 0, .55, 1);
      animation-fill-mode: both;
    }
    .f {
      animation-name: casa-ink;
      animation-duration: ${HATCH_DUR}ms;
      animation-delay: calc(var(--t) * 1ms);
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    }
  }
  @keyframes casa-draw { to { stroke-dashoffset: 0 } }
  @keyframes casa-ink { from { opacity: 0 } to { opacity: 1 } }
</style>`;

const out = pieces
  .map((p) => {
    if (typeof p === 'string') return p;
    const { kind, rec, d, name, attrs } = p;
    return kind === 'line'
      ? `<${name}${attrs} class="l" style="--l:${rec.len};--t:${rec.t};--d:${rec.dur}"${d ? ` d="${d}"` : ''}/>`
      : `<${name}${attrs} class="f" style="--t:${rec.t}" d="${d}"/>`;
  })
  .join('')
  .replace(/(<svg\b[^>]*>)/, `$1\n${css}`);

writeFileSync(OUT, out);
console.log(
  `lines=${lines.length} foliageBands=${bands.length}\n` +
  `lines ${START}–${linesEnd}ms | foliage ${Math.round(bandStart)}–${bandsEnd}ms | total ${Math.max(linesEnd, bandsEnd)}ms\n` +
  `${(out.length / 1024).toFixed(0)}KB (source ${(src.length / 1024).toFixed(0)}KB)`,
);
