# Impeccable Redesign — Sebastien Validator

Multi-session effort to elevate the site's taste, design language, aesthetics, and UX using the `pbakaus/impeccable` Claude Code plugin in combination with gstack design skills.

- **Branch**: `design-10x` (cut from `stage`)
- **Stashed prior attempt**: `stash@{0}` on `design-revamp` — 6 files, ~670 LoC changes (globals.css, page.tsx, Footer, SiteHeader, MobileNav). Do not pop. Review for ideas only, don't build on it.
- **Target merge path**: `design-10x` → `stage` → `main`

## Brand anchors (already present)

- **Product**: Sebastien Validator — a Solana validator for staking SOL
- **Colors**: Navy `#1a1a40` / Orange `#ec5228` / Cyan `#28c2ec` (brand tokens already in globals.css)
- **Typography**: Degular custom font family (Thin/Regular/Medium/Semibold/Bold) — already self-hosted in `/fonts`
- **Stack**: Next.js 15.2.8 App Router, React 19, Tailwind v4, Radix primitives, Sanity CMS (blog), Cloudinary (videos)

## Operating principles

1. **Shape before polish.** Phases 1–3 are load-bearing. Skipping them = sophisticated slop.
2. **One command per invocation.** Never chain (`/audit /normalize /polish`). Compound mutations are undebuggable.
3. **Gate at every phase boundary.** Review before coding; audit before shipping.
4. **Scope each session.** This is multi-session. Each session starts by reading this doc and claiming the next unfinished phase.
5. **Preserve brand identity.** Degular + navy/orange/cyan are non-negotiable anchors.

## Phases

### Phase 0 — Setup

- [x] Cut `design-10x` from `stage`
- [x] Write this plan
- [ ] Establish performance baseline via `/benchmark` on home page (pre-change)
- [ ] Run `npx impeccable detect .` — capture CLI anti-pattern baseline

### Phase 1 — Discover

- [ ] `/impeccable teach` — one-time brand/voice/audience config. Load-bearing for every subsequent command.
- [ ] `/critique` home page — UX lens, what's lazy, what doesn't earn attention
- [ ] `/audit` home page — technical, a11y, perf
- [ ] Read stashed design-revamp diff: note any ideas worth salvaging (do not pop)
- [ ] Synthesize: write `plans/discovery-findings.md` with ranked problem list

### Phase 2 — Direction

- [ ] `/design-consultation` → produce `DESIGN.md` (project design system source of truth)
- [ ] Optional: `/design-shotgun` on hero to explore aesthetic variants before committing
- [ ] `/plan-design-review` — critique the plan BEFORE any code change
- [ ] Decision gate: user approves direction

### Phase 3 — Foundation

Rewrite `app/globals.css` tokens and realign `components/ui/*` primitives:

- [ ] Color system: OKLCH-based palette with tinted neutrals (no pure grays), state/semantic colors derived from brand trio
- [ ] Typography: modular type scale, hierarchy tokens (display/h1/h2/body/caption), line-height + tracking pairings per size
- [ ] Spacing: explicit scale (8pt or custom), named spatial tokens
- [ ] Radii, elevation, border tokens
- [ ] Motion tokens: easing curves, durations (respect `prefers-reduced-motion`)
- [ ] Lock the system — no drift during page passes

### Phase 4 — Page passes

Priority order (highest return first):
1. `app/page.tsx` — home (conversion critical)
2. `app/blog/page.tsx` — blog hub
3. `components/SiteHeader.tsx`, `components/MobileNav.tsx`, `components/Footer.tsx` — cross-cutting nav/chrome
4. `app/security/page.tsx` — trust differentiator
5. `app/team/*` — 6 team bio pages (shared layout pass)
6. `app/blog/[slug]/page.tsx` — post template
7. `app/contact/page.tsx`
8. `app/privacy/page.tsx`, `app/terms/page.tsx` — legal, minimal pass

Per-page protocol (NEVER chain):
1. `/typeset` — fix type choices, hierarchy, sizing
2. `/layout` — fix rhythm, spacing, grid, alignment
3. `/colorize` — color strategy (or `/quieter` if overbold, `/bolder` if forgettable)
4. `/harden` — a11y, error states, edge cases, empty states, loading
5. `/adapt` — responsive check (320/768/1280/1920)
6. `/delight` — earned micro-moments (use sparingly)
7. `/design-review` — live visual audit via browse tool, iterate until clean
8. `/polish` — final design-system alignment pre-commit

### Phase 5 — Motion

- [ ] `/animate` site-wide motion plan — scroll-driven (GSAP ScrollTrigger), respect `prefers-reduced-motion`
- [ ] Optional `/overdrive` on ONE hero moment that earns it — never site-wide

### Phase 6 — Verify & ship

- [ ] `/audit` full site
- [ ] `/benchmark` — compare to Phase 0 baseline, no regression
- [ ] `/qa` — functional test flows via browse tool
- [ ] `/cso` — security audit (new JS/CSS may introduce issues)
- [ ] Merge `design-10x` → `stage` → smoke test → `main`

## Anti-goals

- No bounce/elastic easing
- No cards-inside-cards
- No gray text on colored backgrounds
- No pure black/gray (always tinted)
- No Inter / system default fonts — Degular is the anchor
- No purple gradients
- No feature bloat — redesign is taste, not new features

## Session-handoff protocol

Start every new session by:
1. Reading this plan top to bottom
2. `git status` + `git log --oneline -5` to verify branch state
3. Check TaskList — find the next unfinished phase task
4. Update this plan's checklists as phases complete
