# CLAUDE.md — Sebastien Validator site

## Project snapshot

Solana validator marketing + blog site. Next.js 15 App Router, React 19, Tailwind v4, Radix primitives, Sanity CMS (blog posts), Cloudinary (videos), deployed on Vercel.

Brand anchors: Degular font family (self-hosted `/fonts`), navy `#1a1a40`, orange `#ec5228`, cyan `#28c2ec`.

## Active initiatives

- **Impeccable redesign** — see `plans/impeccable-redesign.md`. Multi-session design overhaul happening on branch `design-10x`. Phase 0 baseline captured in `plans/detect-baseline.json`.

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
