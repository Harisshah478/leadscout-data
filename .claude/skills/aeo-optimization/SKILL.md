---
name: AEO Optimization
description: Structures LeadScout Data content to win featured snippets, direct-answer boxes, and voice-assistant answers — question-based headings, direct-answer paragraphs, list/table formatting, and correct FAQ schema usage
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# AEO (Answer Engine Optimization) — LeadScout Data

AEO overlaps heavily with GEO (see `/geo-optimization`) but targets something more mechanical: getting a specific chunk of content lifted verbatim into a featured snippet, Google's direct-answer box, or a voice-assistant answer.

## Checklist

- [ ] Each key question a prospect would realistically ask gets its own heading phrased as that question — e.g. "How much does verified lead data cost?", "What data fields does LeadScout Data provide?", "How long does delivery take?"
- [ ] Immediately under that heading, a 40–60 word direct-answer paragraph that could stand alone as a snippet, with further elaboration below it
- [ ] Convert prose to ordered lists, bullet lists, or tables wherever the content is naturally list-shaped — the site already does this well for data fields, pricing tiers, and delivery formats; keep this pattern for any new content
- [ ] `FAQPage` / `HowTo` / `QAPage` schema **only** on pages with genuinely visible Q&A content matching the schema. Misusing FAQ schema for content that isn't visibly on the page is a real Google Search Console penalty risk, not just wasted effort — never add this schema speculatively
- [ ] Table formatting for genuine side-by-side comparisons (e.g. the pricing tiers could gain a supplementary comparison table for extractability, while keeping the existing card layout for the visual design — evaluate whether that's worth the added markup rather than doing it by default)

## Where this site already does AEO well — don't regress these

- Pricing page: three tiers with clear per-contact rates in a scannable, list-like structure
- Services page: numbered/bulleted feature lists per service
- Categories page: an actual Q&A-shaped interaction pattern ("Search categories..." / "No categories match...")

## Where to focus new work

- Contact, About, and Services currently use narrative-style headings ("Why Choose LeadScout Data", "Built for your workflow") rather than question-phrased ones. Evaluate case by case whether converting to question form genuinely helps — don't force every heading into a question; only do it where a prospect would plausibly search that exact phrase
- No page currently has an explicit FAQ section. If Haris wants one, source real, specific customer questions rather than inventing generic ones, and only add `FAQPage` schema once real Q&A content actually exists on the page

## Process

Same workflow as `/seo-audit` and `/geo-optimization`: audit, prioritized findings, implement in a worktree, verify locally, commit, push, open a PR. **Never fabricate** FAQ content or add FAQ schema for questions that aren't genuinely answered on the page — this is the one place AEO tactics can tip into a real penalty risk if done carelessly.

## Output format

Prioritized findings, affected file(s), fix description, then implementation if fixes were requested.
