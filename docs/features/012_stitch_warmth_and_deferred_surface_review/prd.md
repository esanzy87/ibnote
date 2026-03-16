# IBNote 012 Stitch Warmth and Deferred Surface Reintegration PRD

Version: 0.2
Date: 2026-03-16
Owner: unattended agent
Status: Hardened - broad implementation package
Depends on:
- `010_stitch_ui_adoption_foundation`
- `011_phase2_public_entry_adoption`

## 1. Purpose

012 is the broad follow-on integration package after 010 and 011 closeout.
Its purpose is to:
1. raise Stitch-style emotional warmth across the product by roughly 10-15% where safe
2. reopen and deliberately review all surfaces that were temporarily isolated during 010
3. implement the salvageable parts of those deferred surfaces under a single bounded but broad package

This package exists because earlier phases correctly prioritized:
- scope discipline
- truthful closeout
- fake-surface removal
- package-boundary hygiene

Now that 010 and 011 are stably closed, 012 intentionally reopens the previously deferred work and softer emotional tone as a planned integration step rather than leaving them as orphaned value.

## 2. One-line definition

`012_stitch_warmth_and_deferred_surface_review` is a broad reintegration package that raises IBNote's Stitch warmth modestly across stabilized routes while re-evaluating and implementing the salvageable parts of all deferred 010 surfaces.

## 3. Why this package exists now

010 and 011 stabilized the product but deliberately left two kinds of value partially unrealized:
- a modest amount of visual/copy warmth that was intentionally suppressed for clean closeout
- deferred-route UI work that was preserved as carry-forward material but not yet reintroduced

012 exists to capture that value explicitly and safely.

## 4. Package thesis

The product should now become slightly warmer, more human, and more emotionally inviting without losing the practical clarity established during 010/011 cleanup.

At the same time, the deferred-route work from 010 should no longer remain permanently quarantined by default. It should be reviewed route by route and, where justified, integrated into the product under 012 rather than treated as hidden side work.

## 5. Scope

### 5.1 In scope — warmth polish targets
- `/`
- `/login`
- `/templates`
- `/templates/[slug]`
- record creation transition surface
- `/reset-password` if minor copy/tone alignment is beneficial

### 5.2 In scope — deferred reintegration targets
- `/my/records/[id]`
- `/my/records`
- `/my/summary`

### 5.3 Deferred-source material to review and possibly absorb
- `docs/features/010_stitch_ui_adoption_foundation/carry_forward_notes.md`
- `tmp/010_carry_forward_patches/record-editor.patch`
- `tmp/010_carry_forward_patches/records-list.patch`
- `tmp/010_carry_forward_patches/summary-page.patch`

## 6. Out of scope
- social login
- support/community/resources surfaces
- fake social proof or fabricated trust devices
- fictional reflection cards or fake product moments
- auth model expansion
- broad settings-scope expansion unless separately approved later
- brand/editorial storytelling that replaces product explanation

## 7. Product goal

012 should leave IBNote feeling:
- more emotionally warm
- more coherent across public and authenticated surfaces
- better at helping parents re-enter, continue, and revisit records
- still practical, calm, and non-institutional

## 8. Warmth reintroduction rule

The package should raise warmth by about 10-15%, but unevenly and intentionally:
- landing/login: higher tolerance for warmth in headlines and introductory framing
- templates/detail/transition/reset: moderate warmth increase if clarity remains strong
- records/editor/summary surfaces: lower warmth tolerance; preserve functional clarity first

Rule of thumb:
- headline / short section intro / micro-reassurance: warmth may rise
- body copy / workflow guidance / auth instructions / summary basis explanation: remain more practical and product-honest

## 9. Deferred-route reintegration rule

All temporarily isolated 010 deferred surfaces must be re-reviewed under 012.
They should no longer be treated as permanently excluded by default.

However, review must still happen route by route.
Allowed outcomes per route:
- implement most of the preserved work
- implement only a narrowed subset
- rewrite heavily before integration
- still defer if truth risk remains too high

012 is broad, but it is not a blanket transplant package.

## 10. Route-level hypotheses

### `/my/records`
Strong candidate for reintegration.
Likely highest value because revisit flow, summary connection, and “continue vs reread” framing directly improve the parent workflow.

### `/my/records/[id]`
High-value but higher semantic risk.
Likely needs selective reintegration, especially around re-entry guidance and writing reassurance.

### `/my/summary`
Partial reintegration candidate only.
Useful explanation and empty-state ideas may be worth adopting, but print/preservation-heavy expansion must be reviewed carefully.

## 11. Success criteria

012 is successful only if:
1. product warmth increases without obscuring product truth
2. the deferred surfaces are re-reviewed explicitly rather than hand-waved
3. integrated deferred work improves real parent comprehension or continuity
4. no fake auth/marketing/support surface reappears
5. the product feels more unified rather than more bloated

## 12. Recommended operating mode

012 should be treated as a broad but disciplined implementation package.
It must produce:
- route-by-route keep/rewrite/remove decisions
- bounded implementation instructions
- sign-off guidance
- truthful integration of deferred route work where justified
