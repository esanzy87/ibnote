# BLACKBOARD

## Purpose

Minimal coordination snapshot for the current project state.
Do not store epic-local logs, long histories, or temporary run notes here.


- Active epic: `014_ui_ux_completion_program`
- Current state: `phase-3-ready`
- Current blocker: none. `Phase 2` is closed, and `Phase 3` is now opened as the next bounded slice.
- Next action: execute `Phase 3` as the next bounded brand-continuity pass, focused on reducing the visual and tonal disconnect between the public discovery journey (`/`, `/templates`, `/templates/[slug]`) and the authenticated `/my` workspace without widening into a whole-app redesign.
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
