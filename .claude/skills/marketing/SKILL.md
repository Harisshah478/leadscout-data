---
name: Marketing
description: Optimizes the LeadScout Data site's actual conversion funnel and CTA structure using real Vercel Analytics data where available, never fabricated metrics
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# Marketing / Conversion Optimization — LeadScout Data

Covers growth/marketing concerns distinct from the other skills: `/seo-audit`+`/geo-optimization`+`/aeo-optimization` own being *found*; `/content-writing` owns *wording*; this skill owns whether the site actually *converts* a visitor into a lead once they arrive.

## The site's real funnel — know this before suggesting changes

- **Primary conversion action**: the free-trial form on the homepage (`index.html#free-trial`) — a Formspree-backed form (name, email, company, target) offering 300 free verified contacts. Every page's nav CTA and most in-page CTAs point here.
- **Secondary conversion path**: the general Contact page (`contact.html`) — email/WhatsApp/LinkedIn direct contact, used for custom quotes and anything the free trial doesn't cover.
- **Site pricing**: $0.15–$0.35 per verified contact, tiered by volume (Starter/Growth/Scale) — real, live numbers to reference, never invent different ones.
- **Analytics available**: Vercel Web Analytics + Speed Insights are enabled on the live site. This is the one real, non-fabricated data source for actual visitor behavior — if Haris can share numbers from the Vercel dashboard (top pages, conversion events, bounce), use them; otherwise reason structurally from the page content itself and say so.

## What NOT to do

**Never fabricate conversion data.** No invented "X% conversion lift," no fake case studies, no fabricated visitor stats, no A/B test "results" that were never run. Every suggestion here is a hypothesis to test, not a proven fact, unless Haris supplies real numbers. This mirrors the accuracy rule in `/content-writing` — a marketing recommendation that leans on invented data is worse than no recommendation.

**Never add fake social proof** — no invented testimonials, review counts, or "trusted by X companies" claims. This project has explicitly avoided fabricating this before; if real social proof doesn't exist yet, say that plainly rather than filling the gap.

## Checklist

- **CTA clarity and consistency** — does every page have one clear, unambiguous primary action? Check for competing CTAs on the same page pulling in different directions.
- **Above-the-fold value proposition** — can a first-time visitor tell what LeadScout Data does and why it matters within the hero, without scrolling?
- **Friction in the free-trial form** — field count, required vs. optional fields, whether the ask matches the offer's perceived value (300 free contacts is a big incentive; the form should feel proportionately easy).
- **Trust signals** — the stat row (27+ fields, 13+ sources, 1-2 day turnaround) is the site's current trust-building content; note where it's present/absent across pages rather than inventing new claims to fill perceived gaps.
- **Funnel consistency** — do all "free sample"/"get contacts" promises across pages lead to the same instant-form funnel (a past bug: some once pointed to Contact instead)? Do all pricing mentions match the real $0.15–$0.35 range?
- **Page-specific conversion fit** — Services/Pricing/Industries pages should each nudge toward the funnel relevant to that page's intent (e.g. Pricing → free trial or direct quote; Categories → confirm the category exists, then convert).

## Process

1. Ask Haris if he has real Vercel Analytics numbers to share (top pages, drop-off points) before assuming where the friction is — structural review alone is a reasonable fallback, but real data beats guessing.
2. Identify concrete, testable changes (copy, CTA placement, form field count) rather than vague "improve conversion" suggestions.
3. Implement in a git worktree if code changes are involved, verify, commit, push, open a PR — same workflow as every other change on this site.
4. Frame every recommendation as a hypothesis ("this might reduce friction because...") rather than a guaranteed outcome.

## Output format

Prioritized list of concrete, testable suggestions, each with the reasoning behind it and what real data (if any) would confirm it worked. Implement directly only for low-risk, clearly-beneficial changes (e.g. fixing a broken funnel link); flag anything that changes messaging/positioning for Haris's input first.
