# CLAUDE.md — Sebastien Validator site

## Project snapshot

Solana validator marketing + blog site. Next.js 15 App Router, React 19, Tailwind v4, Radix primitives, Sanity CMS (blog posts), Cloudinary (videos), deployed on Vercel.

Brand anchors: Degular font family (self-hosted `/fonts`), navy `#1a1a40`, orange `#ec5228`, cyan `#28c2ec`.

## Design Context

Full context lives in `.impeccable.md`. The summary every session must respect:

- **Primary user**: Crypto-native SOL holders comparing validators on APY/commission/reliability. Desktop-first. Minutes-long decision window.
- **Brand voice**: trustworthy + expert + direct. Reads like a technical founder who respects your time.
- **Aesthetic**: editorial — typography-forward, generous whitespace, intentional asymmetry. Degular carries hierarchy. Numbers treated at feature-headline size.
- **Theme**: light, committed. Navy-tinted off-whites, warm off-black text. No dark-mode toggle in Phase 1–4.
- **Motion**: expressive, but every motion earns its existence. GSAP ScrollTrigger for 2-3 hero moments. Respect `prefers-reduced-motion`.
- **References**: Stripe, Jito. **Anti-references**: corporate fintech (BNY/Fidelity) AND generic crypto DeFi (cyan-on-black + purple gradients).

Design principles (bind every decision):

1. Typography is the hero — Degular does the work. No lucide-icon-above-every-heading.
2. Whitespace is a feature, not absence. Crowded hero = failure.
3. Data wears a suit, not a costume. APY/stake = feature-headline type, no sparklines-as-decoration.
4. Motion serves meaning. Expressive appetite, disciplined execution.
5. Tint everything toward navy. No pure black/white. Orange/cyan remain the rare 10%.

Impeccable commands banned for this project: `/impeccable:overdrive`, `/impeccable:bolder` (unless a page is measurably timid). `/impeccable:quieter` used heavily to pull inherited v0 code toward editorial restraint.

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
