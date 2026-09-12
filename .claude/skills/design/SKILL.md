---
name: Design
description: Applies visual-design judgment (color, typography, spacing, polish) to LeadScout Data — when a new treatment is needed, not just reused — and avoids generic "AI-made" design tells
allowed-tools: Read Glob Grep Edit Write Bash WebFetch WebSearch
---

# Design — LeadScout Data

Covers aesthetic judgment: is a new visual treatment (a card style, a hover state, a hero layout, an accent choice) actually good, professional, and on-brand — not just structurally valid. Use this alongside `/website-builder`, which owns *reusing* the existing system; reach for this skill specifically when a request needs a new visual decision, not just assembly of existing parts (e.g. "make this look more professional," "what should the hover state be," reacting to a reference screenshot).

## This site's established visual identity

- **Palette**: dark teal (`--bg` oklch 9% lightness, `--accent` oklch 68% 0.14 185 — a teal, not the original blue). Established via an explicit reskin (Provet-style light theme was tried and reverted; HexaCore-style dark teal was tried and kept) — don't reintroduce blue or switch to a light theme without Haris explicitly asking again.
- **Type**: Sora (display/headings) + Work Sans (body) — a geometric-sans/humanist-sans pairing, confident and modern without being playful.
- **Motion**: restrained — scroll-reveal fade-ups, a subtle cursor-glow, a count-up stat animation, a looping logo marquee. No large decorative animation, no parallax, nothing gratuitous. When adding a hover state, the established pattern here is a small lift + scale + accent-tint background (see `.format-card:hover`, `.tier-card:hover`) — reuse that rather than inventing a different hover language per component.
- **Card/section rhythm**: alternating subtle background tint between sections (`.section:nth-of-type(even)`), soft shadows over hard borders, icon-chip treatment (tinted rounded-square background behind stroke icons) rather than bare icons.

## Judgment checklist for a new treatment

- **Does it match the established palette/type/motion above**, or does it introduce a one-off inconsistency? (This project explicitly reverted a full-site theme experiment once specifically because it didn't fit — consistency has been treated as more valuable than any single "cooler" look.)
- **Neutrals are chosen, not defaulted** — this site's grays lean teal-hued (`oklch(..% .. 210)`), not pure gray; keep new neutrals on that same hue family.
- **Real content, not lorem** — every mockup or draft should use this site's actual copy/numbers (27+ fields, $0.15–$0.35/contact, etc.), sourced from the live pages, never placeholder text.
- **Avoid the generic "AI-made" design tells** unless Haris explicitly asks for one of these looks: warm cream + serif + terracotta; near-black with one neon accent; centered-everything layouts with a purple-to-blue gradient hero; `rounded-lg` on every element uniformly; emoji as section markers; a generic bento grid because it's trendy rather than because the content is genuinely grid-shaped.
- **Structure should encode real information** — numbered steps only for genuine sequences, badges only for genuine status, icons that mean something specific rather than decorative filler.

## Process

1. Identify whether the ask is a genuinely new visual decision (this skill) or reuse of an existing pattern (`/website-builder` alone is enough).
2. If Haris references an external site/screenshot as inspiration, extract the *underlying design principle* (palette mood, layout idea, motion idea) rather than copying it wholesale — this project's working pattern has been "translate the idea into this site's own visual language," and full literal copies have been reverted before (the Provet-theme experiment).
3. Prototype the specific change directly in the real pages rather than a separate mockup/canvas when the ask is about the live site's actual look — a past session note flagged that an intermediate mockup step slowed down landing on what Haris actually wanted.
4. Get one round of feedback before going further if the change is site-wide or ambiguous in scope; iterate directly if it's a small, contained tweak.
5. Implement in a git worktree, verify, commit, push, open a PR — same workflow as every other change on this site.

## Output format

For a small, well-scoped visual change: implement directly and report what changed. For a bigger or ambiguous direction (new page layout, new section type, site-wide mood shift): describe the concrete design decision (palette/type/layout in a sentence or two) before building, so Haris can redirect before implementation, matching how theme direction changes have been handled throughout this project.
