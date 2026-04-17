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
- [x] Rebase `design-10x` on `origin/main` so the redesign starts from the production state
- [x] Write this plan
- [x] Establish performance baseline via `/benchmark` on `https://validator.com` → `.gstack/benchmark-reports/baselines/baseline.json` (FCP 504ms, DOM complete 783ms, 22 requests, 94.7KB total)
- [x] Run `npx impeccable detect .` — 30 anti-patterns baseline (29 × `bg-black`, 1 × `border-l-4`) captured in `plans/detect-baseline.json`

### Phase 1 — Discover

- [x] `/impeccable teach` — design context locked to `.impeccable.md` (crypto-native audience, editorial aesthetic, trustworthy+expert+direct voice, light theme, expressive motion, Stripe/Jito refs, 5 binding principles)
- [x] `/critique` home page — sub-agent produced a 17/40 Nielsen score with P0-P3 priority issues and persona red flags
- [ ] `/audit` home page — technical, a11y, perf (deferred to Phase 6 verification)
- [x] Read stashed design-revamp diff — did not pop; ideas noted but not built on (prior attempt was a different direction)

### Phase 2 — Direction

- [x] Design direction confirmed via `/impeccable teach` + critique decisions (editorial; light committed; expressive motion later). Skipped separate `/design-consultation` since `.impeccable.md` already captures the design system anchors.
- [x] Scope gate: user confirmed "all 5 priorities + minors, home page first". Commands sequenced accordingly.

### Phase 3 — Foundation

Rewritten in commit `e4e88be`:

- [x] Color system: OKLCH-based palette, all neutrals tinted toward navy hue 280°. `--background: oklch(0.985 0.003 280)`, `--foreground: oklch(0.20 0.020 280)`, etc. Brand navy/orange/cyan converted to OKLCH. New `--surface-dark` token for overlays.
- [x] `.dark` block mirrors light so `next-themes` cannot silently alter the UI (light committed per `.impeccable.md`).
- [x] Typography: single Degular family, no second typeface introduced (impeccable reflex-list banned all free alternatives; system monospace handles addresses/hashes).
- [x] Focus ring moved to brand orange so focus states become a brand pop.
- [x] Footer `bg-[#000000]` → `bg-surface-dark`; 29 × `bg-black/70` card overlays swept to `bg-surface-dark/70`.

### Phase 4 — Page passes

Priority order (highest return first):
1. [x] `app/page.tsx` — home (conversion critical). 7 commits: `4b9087e` (strip stat monoliths + tagline + decorative rails), `dff81fa` (delete Link Hub + nav rewrite), `7b787da` (voice + calculator + FAQ), `ea72e3c` (harden API + input), `a8318f3` (blog blockquote + status sentence polish), `18708ba` (Delegate section editorial pass + stat sizing fix). **Nielsen 17 → 27 (+10).** CLI anti-patterns 30 → 0.
2. [x] `components/SiteHeader.tsx`, `components/MobileNav.tsx`, `components/Footer.tsx` — cross-cutting nav/chrome. Nav rewritten across home + blog pages in `dff81fa`; footer vertical separator deleted + bg-[#000000] → bg-surface-dark in `e4e88be`; horizontal separator bg-white → bg-white/15 in `18708ba`.
3. [ ] `app/blog/page.tsx` — blog hub (nav updated; content layout not yet reviewed)
4. [ ] `app/security/page.tsx` — trust differentiator
5. [ ] `app/team/*` — 6 team bio pages (shared layout pass)
6. [ ] `app/blog/[slug]/page.tsx` — post template (nav updated; blockquote style fixed in `a8318f3`; body content layout not yet reviewed)
7. [ ] `app/contact/page.tsx`
8. [ ] `app/privacy/page.tsx`, `app/terms/page.tsx` — legal, minimal pass

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
