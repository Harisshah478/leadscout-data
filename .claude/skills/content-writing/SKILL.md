---
name: Content Writing
description: Writes and edits on-site copy for LeadScout Data in the site's established voice and structure, integrating SEO/GEO/AEO conventions, without fabricating business facts
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# Content Writing — LeadScout Data

Writes or edits visible copy across `index.html`, `about.html`, `services.html`, `pricing.html`, `industries.html`, `portfolio.html`, `contact.html` — titles, headings, body paragraphs, button labels, form text, footer copy. Keep the site fully static (plain HTML/CSS/JS, no build step) and match the conventions below rather than introducing a new style per page.

## Voice and tone

The site's current copy voice (set by a full rewrite pass) is **first-person plural** — "we"/"us"/"our", not "I"/"me"/"my". Keep new copy in this voice unless Haris explicitly asks to change it back.

- Direct and specific over hype-y and vague. Prefer "27+ Data Fields" and "$0.15–$0.35 per contact" over "industry-leading" or "best-in-class"
- Confident but not aggressive — the reader is evaluating a vendor, not being sold to
- Short sentences, plain words. Avoid AI-generic copywriting clichés: "unlock", "leverage", "game-changer", "in today's fast-paced world", "seamlessly", "elevate your", "revolutionize" — these read as generic AI output and actively hurt credibility
- Every claim should be something Haris can actually back up. If a sentence would only be true with invented numbers or capabilities, don't write it — flag it as a question for Haris instead (see **Accuracy rules** below)

## Structural conventions — reuse existing components

Before writing new markup, check whether an existing CSS component already fits, so new content doesn't require new styling:

| Pattern | Class | Used for |
|---|---|---|
| Section intro | `.section__head` (optional `.eyebrow` + `h2` + `p`) | Every section heading on every page |
| Page hero | `.page-hero` / `.page-hero__inner` (subpages), `.hero` (home) | Top-of-page heading + intro |
| Icon + label tile grid | `.field-icon-grid` / `.field-tile` | Compact list of many short items (used for the 27 data fields) |
| Icon + title + description card | `.formats` / `.format-card` | 3–9 items that each need a short paragraph, not just a label (used for delivery formats and the 6 services) |
| Icon + short label grid | `.value-props` / `.value-prop` | 3–4 short benefit statements |
| Tiered pricing cards | `.pricing-tiers` / `.tier-card` | Pricing page only |
| Accent CTA banner | `.cta` (h2 + p + one `.btn`) | End-of-page call to action, one per page |
| Checklist | `.checklist` (icon + `<span>` per `<li>`) | Short bullet list of guarantees/features |

If none of these fit a new content shape, say so explicitly and propose new markup rather than forcing content into the wrong component.

## Accuracy rules — never fabricate

This project has hit real cases where guessing would have been wrong: an assumed per-contact price, a services list that turned out to include real new offerings only after asking, an OG description with the wrong currency logic. Before writing copy that states a fact rather than an opinion:

- **Pricing, rates, discounts** — never invent a number. If it's not already on the Pricing page or explicitly given, ask.
- **Services offered** — never add a service (e.g. a new channel, a guarantee, a turnaround time) that isn't already on the site or explicitly confirmed. If new copy would imply a capability, confirm it's real first — see the CONVERSATION_LOG entry where LinkedIn Outreach/Email Marketing were added only after Haris confirmed them.
- **Stats, testimonials, client counts, reviews** — never invent these. If the site needs social proof and none exists yet, say that plainly rather than filling the gap with a fake number.
- **Contact details** — reuse the real ones already in `contact.html` / the JSON-LD `ContactPoint` blocks; don't restate them from memory in case they've changed.

## SEO / GEO / AEO integration

New copy should default toward practices the site's other skills already cover, without treating them as a separate pass:

- Lead sections with a direct, concrete answer before elaborating (see `/aeo-optimization`)
- Use question-phrased headings only where a prospect would plausibly search that exact phrase — don't force it onto every heading
- Prefer lists/tables over dense prose where the content is naturally list-shaped
- After writing new copy, check whether the page's JSON-LD block or meta title/description need a matching update — these have drifted out of sync with visible copy more than once on this project (see `/seo-audit`, `/geo-optimization`)

## Process

1. Read the current live content of every page you're touching — don't rely on memory from earlier in a session, since copy on this site changes often.
2. If the request implies a business-fact change (new service, new price, new capability) and it isn't already confirmed elsewhere in context, ask before writing it.
3. Draft copy matching the voice/structure conventions above.
4. Implement in a git worktree, verify locally (structural HTML check at minimum; a live render if the browser tool is available), commit, push, open a PR — same workflow as every other change on this site.
5. Update meta title/description and JSON-LD together with any content change that makes them stale, rather than leaving that for a separate pass.

## Output format

If drafting only: present the proposed copy per page/section for review before implementing. If asked to implement directly: make the edits, verify, and report what changed and where — same as every other task on this project.
