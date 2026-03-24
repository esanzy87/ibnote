# IBNote 011 Phase-2 Public Entry Adoption Spec

Status: Hardened - ready for implementation planning
Source of truth: `docs/epics/011_phase2_public_entry_adoption/prd.md`
Companions:
- `docs/epics/011_phase2_public_entry_adoption/mismatch_ledger.md`
- `docs/epics/011_phase2_public_entry_adoption/signoff_briefing.md`

## 1. Purpose

This spec turns 011 into an implementation-safe package for landing and login adaptation after 010 phase-1.

## 2. Route scope

### Included
- `src/app/page.tsx`
- `src/app/login/page.tsx`
- `src/components/ui/login-form.tsx`
- supporting presentational/auth pieces directly required by these two routes only

### Excluded
- reset-password (already covered by 010)
- templates/detail/transition (already covered by 010)
- revisit/settings/summary/editor surfaces
- global auth model changes
- social login or support surfaces

## 3. Route-specific implementation hypotheses

### 3.1 Landing (`/`)
Primary job:
- explain the real IBNote loop quickly
- create a calm and trustworthy first impression
- direct the user toward starting

Implementation rules:
- explain templates -> records -> summary clearly
- reduce marketing-style section bloat
- avoid false scale or social proof
- keep CTA simple and honest
- prefer product explanation over editorial storytelling

### 3.2 Login (`/login`)
Primary job:
- let the user sign in with minimal friction
- clearly show what happens after login
- support account creation only in the existing email/password model

Implementation rules:
- no social login buttons
- no support center or fake account-assistance surfaces
- maintain actual auth flow truth
- keep layout calm and practical
- explain nextTarget behavior clearly but lightly

## 4. Design primitives to inherit from 010

- warm neutral background treatment
- rounded containers and softer card hierarchy
- practical guidance blocks
- clear primary CTA emphasis
- restrained iconography and warm accent usage

## 5. Elements to avoid

- testimonials
- counters like “thousands of parents”
- fake community/help/resources links
- over-poetic or wellness-brand slogans
- fictional reflection cards or made-up product moments
- unnecessary footer/legal/product-surface clutter if unsupported

## 6. Route-by-route implementation matrix

| Route | Mode | Parent-facing gain | Must remove / rewrite | File anchors | QA focus |
| --- | --- | --- | --- | --- | --- |
| `/` | B | clearer first impression and calmer start path | remove fake social proof, fictional cards, unsupported nav/footer sections, over-editorial imagery | `src/app/page.tsx` | product loop clarity, CTA honesty |
| `/login` | B | calmer and clearer entry into auth flow | remove social login, support surfaces, fake usage counters; keep email/password truth only | `src/app/login/page.tsx`, `src/components/ui/login-form.tsx` | auth truth, next-step clarity, mode switching |

## 7. Verification questions

1. Does the landing page explain the product more clearly than before?
2. Does the login page stay faithful to the real auth model?
3. Do these routes feel connected to 010 phase-1 visually?
4. Is the copy calm and useful rather than marketing-heavy?
5. Has scope stayed limited to these public-entry routes?

## 8. Task plan

1. review current `/` and `/login` implementation versus Stitch references
2. create mismatch table for landing and login only
3. define what to preserve / rewrite / remove
4. lock implementation scope
5. implement only after sign-off

## 9. Acceptance checklist

011 should not be considered ready for implementation unless all are yes:
1. Is it clear which landing elements come from Stitch and which must be rewritten?
2. Is it clear which login elements are visually useful but semantically out of scope?
3. Does the package explicitly forbid social login and fake social proof?
4. Is the scope limited to landing/login only?
5. Would a coding agent know exactly what to keep, rewrite, and remove?
