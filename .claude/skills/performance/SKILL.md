---
name: Performance
description: Audits and improves Core Web Vitals and load performance for the LeadScout Data static site, using real Vercel Speed Insights data where available, never fabricated scores
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# Performance — LeadScout Data

Covers load speed and Core Web Vitals (LCP, CLS, INP) — distinct from `/seo-audit` (which covers metadata/structure) and `/design`/`/website-builder` (which cover look/structure, not speed). Page speed affects both conversion (`/marketing`) and search ranking (`/seo-audit`), but is its own concern with its own tools.

## Real data source — use it before guessing

**Vercel Speed Insights is already installed and enabled** on the live site (script tag on all 7 pages, confirmed active via Vercel dashboard toggle earlier in this project). This is the one real, non-fabricated source of actual field performance data. Ask Haris to share numbers from the Vercel dashboard (Speed Insights tab) before making claims about real-world scores — **never invent a Lighthouse score, LCP number, or performance grade**. Structural review (below) is a reasonable fallback for what to look for, but isn't the same as a real measured score.

## Site-specific facts to know before auditing

- Fully static HTML/CSS/JS, no build step, no bundler, no minification — this is a deliberate project choice (keeps things simple, no dependency risk), not an oversight. Don't propose introducing a build pipeline without Haris explicitly asking for one.
- Fonts: Google Fonts (Sora + Work Sans) loaded via `<link>` with `rel="preconnect"` already present and `&display=swap` already set — this is already the correct pattern; don't suggest it as if it were missing without checking first.
- Icons are inline SVG throughout — zero image requests for icons, already optimal.
- `assets/og-image.png` is ~340KB — fine as-is since it's only fetched by link-preview crawlers (Slack, WhatsApp, LinkedIn, Twitter), never loaded by a real visitor's browser, so it isn't a page-weight concern despite its size.
- `industries.html` renders 1,757 `.cat-chip` DOM elements at once — the single largest real performance risk on the site (large DOM affects parse/layout time and interaction responsiveness, especially on low-end mobile). The existing search box filters via `hidden`, which still keeps all 1,757 nodes in the DOM. A virtualization or pagination approach would reduce this, but is a real structural change — propose it, don't implement unasked, since it would touch the page's core interaction model.
- Motion (marquee, scroll-reveal, cursor-glow, count-up) is CSS/rAF-driven and gated by `prefers-reduced-motion` — check it isn't causing layout thrash (prefer `transform`/`opacity` animations, which this site already uses, over animating layout properties).

## Checklist

- [ ] Confirm no new `<img>` tags were added without `width`/`height` attributes or without lazy-loading where appropriate (CLS risk) — currently N/A since the site has none, but check on any future addition
- [ ] Confirm font-loading pattern (preconnect + swap) hasn't regressed on any page
- [ ] Check for any new render-blocking `<script>` in `<head>` without `defer`/`async` — `js/animations.js` is already deferred
- [ ] On `industries.html` specifically: watch for anything that makes the 1,757-node DOM heavier per-node (e.g. adding more markup per chip) without a clear reason
- [ ] Check CSS for any expensive-to-animate properties (`width`, `height`, `top`/`left` without `transform`) in animated elements

## Process

1. Ask Haris for real Speed Insights numbers if a specific page's performance is in question, rather than assuming.
2. Audit structurally against the checklist above for anything that would predictably hurt LCP/CLS/INP.
3. For any fix that's a small, contained change (missing `defer`, missing font fallback, an easy asset-size win): implement directly.
4. For anything structural (DOM virtualization on Categories, introducing a build step, lazy-loading strategy): describe the tradeoff and get Haris's go-ahead first, since it's a bigger architectural change than this project's static-first philosophy has needed so far.
5. Implement in a git worktree, verify, commit, push, open a PR — same workflow as every other change on this site.

## Output format

Prioritized findings (real problems first, backed by real data where available; structural risk flags where not), each with a concrete fix or a tradeoff to decide on. Never state a specific performance score or percentage improvement that wasn't actually measured.
