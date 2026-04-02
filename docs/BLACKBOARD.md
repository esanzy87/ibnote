# BLACKBOARD

## Purpose

Minimal coordination snapshot for the current project state.
Do not store epic-local logs, long histories, or temporary run notes here.


- Active epic: `014_ui_ux_completion_program`
- Current state: `phase-4-assets-fully-wired-awaiting-visual-verification`
- Current blocker: none. All 19 Phase 4 assets are now moved into the app's official asset location. The homepage plus every currently published `/templates` / `/templates/[slug]` route now use the new assets, while three extra prompt-pack template files remain staged but unused because their slugs are not present in the current `TEMPLATE_LIST`. `P3-02` through `P3-06` remain complete: the Phase 3 route set shares a verified top-of-page brand/navigation anchor, the locked `/my` shell/page frame and first-view hero/CTA language now read as warm descendants of the public baseline, the remaining filters/cards/ratings/summary support surfaces are harmonized, and the closeout verification includes desktop/mobile public-vs-locked comparisons, authenticated content states, and one representative empty-state check.
- Next action: run the final Phase 4 desktop/mobile route verification for `/`, `/templates`, and representative `/templates/[slug]` pages so crop behavior, text readability, and first-view quality are confirmed before closing out `P4-04`, then reconcile the prompt-pack/template-inventory mismatch for the three staged-but-unused template assets.
- Current expectation: run epic 014 as a rolling phase-based UI/UX completion program and keep adding new phases until James explicitly closes the epic
- Active-epic resolution rule: the `Active epic` value must exactly match one folder name under `docs/epics/`

## Read order

When resuming work, read in this order:

1. `docs/BLACKBOARD.md`
2. `AGENTS.md`
3. `docs/product/AMBITION.md`
4. the active epic folder's `todo.md`
5. the active epic folder's `spec.md`
6. the active epic folder's `prd.md`
7. the active epic folder's `adr.md` and `risk_analysis.md` if present
8. relevant code paths

## Interpretation rules

- The active epic docpack is the epic-level source of truth.
- This file should stay small and current.
- If this file and the active epic docpack disagree, revalidate and sync them.
- If the named active epic folder does not exist, treat BLACKBOARD as stale and fix it before continuing.
- Do not reference a retired run-report or unattended-workflow document from here.
