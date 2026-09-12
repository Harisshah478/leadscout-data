---
name: SEO Audit
description: Runs a technical and on-page SEO audit of the LeadScout Data static site and implements fixes — meta tags, structured data, sitemap, robots.txt, Core Web Vitals, heading hierarchy, internal linking
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# SEO Audit — LeadScout Data

Audit and improve traditional search-engine SEO for this static site: `index.html`, `about.html`, `services.html`, `pricing.html`, `industries.html`, `portfolio.html`, `contact.html`, shared `css/styles.css` and `js/animations.js`, `sitemap.xml`, `robots.txt`. Hosted on Vercel at the live URL used in canonical/og tags — check that URL is still current before auditing (it has changed once already on this project, from a placeholder domain to the live Vercel URL).

## 1. Technical SEO checklist

- [ ] Every page has: unique `<title>`, unique `<meta name="description">`, `<link rel="canonical">`, `og:*`/`twitter:*` tags matching title/description, `og:image`/`twitter:image` pointing at `assets/og-image.png` with `twitter:card` set to `summary_large_image`
- [ ] `sitemap.xml` lists every real page (not files under `design-mockup/`) with sensible `<priority>` values
- [ ] `robots.txt` allows crawling and correctly points to the sitemap URL
- [ ] JSON-LD structured data present, accurate, and **valid JSON** on every page — don't just eyeball it, actually parse each block (e.g. a small Python/Node script) since a single typo silently breaks the whole block
- [ ] Single `<h1>` per page, logical `<h2>`/`<h3>` nesting with no skipped levels
- [ ] Every `<img>` has `alt` text (the site currently uses inline SVG icons almost exclusively, so this rarely applies — check for any real `<img>` tags before assuming it's covered)
- [ ] Internal links: every page reachable from nav; cross-link related pages in body copy where it reads naturally (e.g. Services → Pricing, Pricing → Contact)
- [ ] HTTPS — Vercel provides this by default; only relevant to re-check if a custom domain is added

## 2. On-page content SEO

- [ ] Title/meta description match real search intent (what would someone actually type to find this page?), not keyword-stuffed
- [ ] Content depth: does the page fully answer the likely query, or just tease it?
- [ ] Headings phrased naturally where that also happens to help AEO/GEO — don't force it (see the `/aeo-optimization` and `/geo-optimization` skills for more on this)

## 3. Process

1. Read all 7 live HTML pages fresh — don't rely on memory from earlier in a long session, since content on this site changes often.
2. Grep for `<title>`, `<meta name="description"`, `og:`, `twitter:`, `application/ld+json` across all pages to spot gaps or inconsistencies between pages.
3. Validate every JSON-LD block actually parses.
4. Check `sitemap.xml` and `robots.txt` against the actual current page list.
5. Report findings as a prioritized list (blocking issues first, then high-impact, then nice-to-have), each with the affected file(s) and a one-line fix.
6. If implementing fixes (not just auditing): work in a git worktree per this project's background-job convention, verify locally, commit, push, open a PR — same workflow as every other change on this site.
7. **Never invent business facts** (pricing, stats, testimonials, review counts) to make content "sound better." If real data is missing or stale, flag it for Haris to supply rather than fabricating it.

## Output format

Prioritized findings list (blocking / high-impact / nice-to-have), each with affected file(s) and a one-line fix description. If the user asked for fixes rather than just an audit, implement them after presenting the findings.
