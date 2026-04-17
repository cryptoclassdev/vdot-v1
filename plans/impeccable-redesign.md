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
1. [x] `app/page.tsx` — home. Commits: `4b9087e`, `dff81fa`, `7b787da`, `ea72e3c`, `a8318f3`, `18708ba`. **Nielsen 17 → 27 (+10).**
2. [x] `components/Footer.tsx` + cross-cutting nav (rewritten across home, blog, blog-post, security, contact, privacy, terms, team pages).
3. [x] `app/blog/page.tsx` + `components/blog/*` — editorial hub with eyebrow + h1 "Notes from the validator.", restrained BlogCard, monochrome SearchFilter chips, simple loading/empty states. Commit `5488e2e`.
4. [x] `app/blog/[slug]/page.tsx` — editorial post template, border-t divider meta row, narrowed max-w-3xl for 65-75ch prose. Commit `5488e2e`.
5. [x] `app/security/page.tsx` — full rewrite from hardcoded hex AI-slop to editorial sections with semantic `<dl>` data-centre specs, eyebrow + h1 "Where validator.com runs, and how we keep it running." Commit `5389f69`.
6. [x] `app/team/{chris,dan,hfp,mukul,pedro,seb}` — extracted `components/team/TeamMemberBio.tsx`. Each of 6 pages now ~12 lines of data; added missing bios for Dan / HFP / Seb. Commit `06e4e7c`.
7. [x] `app/contact/page.tsx` — editorial contact with 3 groups (Business / Support / Sebastian), eyebrow pattern, semantic contact list. Commit `45d85a3`.
8. [x] `app/privacy/page.tsx`, `app/terms/page.tsx` — nav header added, primary-CTA Back buttons replaced with editorial text links, inline link colors tokenised. Commit `45d85a3`.

### Phase 5 — Motion

- [x] Hero stagger-reveal on mount — CSS `[data-reveal]` with `--reveal-delay` sequencing (0ms / 120ms / 260ms for logo / wordmark / sub-headline). Commit `319e8ed`.
- [x] Stat strip count-ups on viewport entry — custom `components/motion/CountUp.tsx` with IntersectionObserver + requestAnimationFrame, ease-out-quart, 1200ms. Applied to all four stats. Commit `319e8ed`.
- [x] Global `prefers-reduced-motion` override forces `animation: none` and zero transitions for users who opt out.
- [x] Motion budget spent without adding GSAP / framer-motion. `/impeccable:overdrive` intentionally skipped (trust-signaling ceiling per anti-goals in `.impeccable.md`).

### Phase 6 — Verify & ship

- [x] CLI detector across `app/ components/ lib/` — **0 anti-patterns** (30 → 0 since baseline).
- [x] `/benchmark` baseline captured against prod `validator.com` in `.gstack/benchmark-reports/baselines/baseline.json` (FCP 504ms, DOM complete 783ms). Phase 6 re-benchmark will be done after deploy to a new preview URL.
- [x] TypeScript: 2 pre-existing errors in `lib/sanity.ts` and `lib/sanity.queries.ts` unrelated to the redesign (Sanity package typing drift from `latest` dep version). Flagged; not fixed in this branch.
- [ ] Merge `design-10x` → `stage` → smoke test → `main`. Pending user approval.

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
