---
name: Website Builder
description: Builds new pages, sections, and layout for the LeadScout Data static site to a professional standard, reusing the site's existing design system instead of inventing new patterns
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# Website Builder — LeadScout Data

Builds or restructures visual/structural elements of the site — new pages, new sections, layout changes, responsive fixes, component styling. This is the structural/visual counterpart to `/content-writing` (which owns voice and copy) and `/seo-audit`/`/geo-optimization`/`/aeo-optimization` (which own search/answer-engine concerns). Use this skill for "build a page", "add a section", "make this look more professional", "fix this on mobile" type requests.

The site is fully static — plain HTML/CSS/JS, no build step, no framework. Keep it that way: no bundlers, no npm dependencies, no component frameworks.

## Design system — reuse before inventing

**Tokens** (`css/styles.css` `:root`, all `oklch()`): `--bg`, `--surface`, `--surface-2`, `--border`, `--border-soft`, `--text`, `--text-secondary`, `--text-muted`, `--accent`, `--accent-dark`, `--accent-tint`, `--ink`, `--ink-hover`. Never hardcode a color — this site has twice had to hunt down hardcoded `oklch()` values left over from a palette swap (blue→teal reskin) that didn't re-theme automatically. Always reference a token.

**Fonts**: `Sora` (headings, loaded at weights 600/700/800) + `Work Sans` (body, 400/500/600), both via the existing Google Fonts `<link>` in every page's `<head>` — don't add a new typeface without being asked.

**Layout primitives**:
- `.container` — page-width wrapper (1200px max)
- `.page-hero` / `.page-hero__inner` — subpage top banner (must be nested, `.container` > `.page-hero__inner`, never combined on one div — this exact bug shipped once and threw off hero alignment)
- `.section` — vertical rhythm wrapper for page sections, alternates background tint via `nth-of-type(even)` automatically — don't add manual background colors per section
- `.section__head` — eyebrow + h2 + optional p, used to open nearly every section

**Component classes** (see `/content-writing` for the full content-shape table): `.format-card`, `.value-prop`, `.tier-card`, `.field-tile`, `.cta`, `.checklist`, `.contact-card`. Before writing new CSS, check whether an existing class already produces the visual shape needed.

**Responsive breakpoints**: `900px` (tablet — nav collapses toward mobile treatment) and `600px` (phone). Check both whenever touching layout, not just one.

**Motion**: every animation lives inside `@media (prefers-reduced-motion: no-preference)`, with a matching `@media (prefers-reduced-motion: reduce)` fallback where needed (see `css/styles.css` and `js/animations.js`, IntersectionObserver-based scroll reveals + the cursor-glow effect). Never ship motion that isn't gated this way.

## Known bug pattern — check for it every time

An author-stylesheet `display` rule on an element silently overrides the browser's default `[hidden] { display: none }` behavior, regardless of selector specificity, because author CSS beats the UA stylesheet. This has shipped twice on this project (`.cat-chip[hidden]`, `.cat-jumpbar[hidden]`). **Any time you give an element both a `display` value and JS that toggles its `hidden` attribute, add an explicit `<selector>[hidden] { display: none; }` rule** — don't assume the browser default will apply.

## Process

1. Check whether the request is structural/visual (this skill) vs. wording (`/content-writing`) vs. search-engine metadata (`/seo-audit` family) — a request often needs more than one; say so rather than silently narrowing scope.
2. Look for an existing component/pattern that already fits before writing new CSS.
3. Build with real content — never lorem ipsum, never a fabricated stat or testimonial (see `/content-writing`'s accuracy rules, which apply here too whenever new copy accompanies new structure).
4. Test both breakpoints (900px, 600px) and both color-scheme/motion-preference states where relevant.
5. Implement in a git worktree, verify (HTML tag-balance + JSON-LD validation scripts if JSON-LD is on the page, live render if the browser tool is connected), commit, push, open a PR — same workflow as every other change on this site.
6. Update `CONVERSATION_LOG.md` with what changed and why.

## Output format

If the request is ambiguous in scope (new page vs. new section vs. restyle), ask before building. Otherwise implement directly and report what changed, which files, and what was verified — same as every other task on this project.
