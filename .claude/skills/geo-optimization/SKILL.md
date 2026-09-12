---
name: GEO Optimization
description: Optimizes the LeadScout Data site to be retrieved and cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude) — content structure, AI-crawler robots.txt access, and citation-friendly formatting
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# GEO (Generative Engine Optimization) — LeadScout Data

GEO is not a replacement for SEO. Google's AI Overviews pull roughly 97% of citations from already-top-20 organic results, so GEO is a layer on top of solid SEO — run `/seo-audit` first if it hasn't been done recently. GEO targets tools that retrieve-then-summarize (RAG-style) rather than classical keyword ranking.

## Checklist

**Content structure**

- [ ] Each key section leads with a direct-answer statement before elaborating, so a RAG system has an obvious quotable chunk to extract
- [ ] Headings phrased as the real, naturally-worded questions a prospect would ask (e.g. "How much does verified lead data cost?" rather than just "Pricing")
- [ ] Concrete numbers stated plainly and specifically — this site already does this well ("27+ Data Fields", "13+ Verified Sources", "$0.15–$0.35 per contact"); keep this pattern rather than diluting specifics into vague marketing language when writing new copy
- [ ] Comparison-style or definition-style content where genuinely relevant

**Structured data**

- [ ] JSON-LD present and accurate on every page (already implemented site-wide) — re-verify it whenever visible content changes elsewhere, since structured data has already drifted out of sync with real copy once on this project (the homepage's `priceRange` field said "Custom quote" for a while after the site moved to real tiered pricing)
- [ ] Consider `FAQPage` schema only where a page has genuinely visible Q&A content — see the AEO skill's warning on this before adding it anywhere

**Crawler access — the most GEO-specific, easiest-to-miss item**

- [ ] Check `robots.txt` explicitly allows the AI *retrieval* bots that actually drive citations: `PerplexityBot`, `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`. These are distinct from pure-training crawlers (`GPTBot`, `CCBot`) — Haris may want those blocked separately, but retrieval bots are the ones that matter for being cited in live answers
- [ ] A 2026 audit found roughly 41% of B2B sites accidentally block a major AI bot in `robots.txt`, each costing 18–34% of potential citations on that engine specifically — this is a quick, high-leverage check to run first
- [ ] Optional: add an `llms.txt` file at the repo root pointing AI crawlers to the site's most authoritative pages — supplementary, never a substitute for the fundamentals above

**Authority and freshness signals**

- [ ] Clear authorship/contact info — the Contact page's `ContactPage`/`ContactPoint` JSON-LD already covers this
- [ ] Internal-link new or updated content to 2–4 existing authoritative pages on the site
- [ ] Freshness — Perplexity in particular weights recently-updated content heavily; the site currently has no visible "last updated" signal on any page, worth flagging as a possible future addition rather than assuming it's covered

## Process

1. Check current `robots.txt` against the AI-bot allowlist above; propose the diff rather than silently rewriting it.
2. Audit each page's opening paragraph per section for direct-answer-first structure; flag sections that bury the actual answer several sentences in.
3. Cross-check JSON-LD is current against visible copy.
4. Implement fixes in a worktree, verify locally, commit, push, open a PR — same workflow as every other change on this site.
5. **Don't fabricate** citations, external mentions, statistics, or reviews to appear more authoritative. Real third-party mentions (press, G2, Reddit, Quora) are the one input here that genuinely can't be manufactured — flag it as something only Haris earning real mentions can provide.

## Output format

Same as `/seo-audit`: prioritized findings, affected file(s), fix description, then implementation if fixes were requested.
