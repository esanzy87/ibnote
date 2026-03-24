# IBNote 007 Micro Usability and Empty State Polish Todo

Status: `C-01` revalidated again to repeated protected-route/auth persistence failure; intervention-needed
Source of truth: `docs/epics/007_micro_usability_and_empty_state_polish/spec.md`
Companion docs:
- `docs/epics/007_micro_usability_and_empty_state_polish/prd.md`
- `docs/epics/007_micro_usability_and_empty_state_polish/adr.md`
- `docs/epics/007_micro_usability_and_empty_state_polish/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 007.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 007 into a redesign, recommendation, or broad cleanup package
- implementation must not start until doc hardening records the chosen narrow surface set

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and target selection
2. Phase B - Micro usability polish
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Surface sprawl risk | Phases A-C | touched routes stay very small and justified |
| GB-02 | Cosmetic-only churn risk | Phases B-C | each change produces a real clarity/recovery gain |
| GB-03 | Capability-drift risk | Phases A-C | no new workflow/system semantics are introduced |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 007 scope, thesis, and boundaries | P0 | done | - |
| A-02 | A | Choose the smallest high-leverage surfaces and evidence shape | P0 | done | A-01 |
| A-03 | A | Define empty-state and recovery acceptance criteria | P0 | done | A-02 |
| B-01 | B | Improve micro-usability on the chosen surfaces | P1 | done | A-03 |
| B-02 | B | Refine empty-state, no-result, or recovery wording/continuity | P1 | done | B-01 |
| B-03 | B | Verify the touched surfaces remain narrow and worthwhile | P1 | done | B-02 |
| C-01 | C | Run route/content review and affected runtime smoke | P1 | blocked | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | blocked | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | blocked | C-02 |

## 5. Current progress snapshot

- Current phase: `Phase C - QA and closeout`
- Current task: `C-01 Run route/content review and affected runtime smoke`
- Last completed task: `B-03 Verify the touched surfaces remain narrow and worthwhile`
- Active blocker: `repeated protected-route QA now needs intervention: listener startup and stale-runtime build mismatch were cleared, but authenticated-session persistence or protected-route gating truth still fails before truthful 007 closeout can be claimed`
- Notes: Phase B is complete on the locked 007 surface set only: `/templates` and `/my/summary`. Fresh direct checks at 2026-03-15 20:56 Asia/Seoul cleared the older runtime integrity blockers: the stale `127.0.0.1:3301` process was terminated, `.next` was rebuilt cleanly, and a fresh production runtime started successfully. Fresh browser checks now show a narrower failure shape: login attempts can reach the template library, but protected routes such as `/templates/my-opinion-matters` and `/my/summary` still bounce back to `/login?next=...` instead of holding authenticated state consistently. Treat this as auth persistence or protected-route gating instability rather than listener startup, stale chunk serving, or missing template content. 007 is now effectively frozen for routine closeout retries until deeper auth/protected-route debugging is resumed. Keep `/templates/[slug]`, `/my/records`, `/my/settings`, `/login`, and `/reset-password` deferred by default, but note that the live protected route truth may currently be unstable beyond 007 scope itself.
