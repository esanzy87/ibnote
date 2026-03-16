# IBNote 009 Record Revisit Entry Context Pack Todo

Status: `ready-qa`
Source of truth: `docs/features/009_record_revisit_entry_context_pack/spec.md`
Companion docs:
- `docs/features/009_record_revisit_entry_context_pack/prd.md`

## 1. How to use this file

This file is the execution tracker for 009.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 009 into a recommendation, reminder, archive-management, or analytics package
- implementation must not start until doc hardening records the chosen narrow surface set

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and re-entry target selection
2. Phase B - Re-entry implementation
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Surface sprawl risk | Phases A-C | touched routes stay very small and justified |
| GB-02 | False-insight risk | Phases B-C | no change implies intelligence, recommendation, or diagnosis |
| GB-03 | Cosmetic-only churn risk | Phases B-C | each change produces a real re-entry or revisit-value gain |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 009 scope, re-entry thesis, and capability boundaries | P0 | done | - |
| A-02 | A | Choose the smallest high-leverage record-entry surfaces and evidence shape | P0 | done | A-01 |
| A-03 | A | Define re-entry acceptance criteria and closeout evidence | P0 | done | A-02 |
| B-01 | B | Improve reopened-record context on the chosen surface | P1 | done | A-03 |
| B-02 | B | Refine re-entry wording and continuity guidance | P1 | done | B-01 |
| B-03 | B | Verify the touched surfaces remain modest, narrow, and worthwhile | P1 | done | B-02 |
| C-01 | C | Run route/content review and affected runtime smoke | P1 | blocked | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | todo | C-01 |
| C-03 | C | Final closeout and risk disposition | P1 | todo | C-02 |

## 5. Current progress snapshot

- Current phase: `Phase C - QA and closeout`
- Current task: `C-01 Run route/content review and affected runtime smoke`
- Last completed task: `B-03 Verify the touched surfaces remain modest, narrow, and worthwhile`
- Active blocker: `shared protected-route/auth persistence runtime failure pending intervention`
- Notes: 009 Phase B implementation is complete on `/my/records/[id]` only. Fresh `C-01` route/content review confirmed the touched editor surface remains aligned with 009’s re-entry thesis, but runtime smoke on the live `127.0.0.1:3301` app failed in the same family as the frozen 007 stop point: `/login?next=/templates` stayed on the login page after submit, `/templates/my-opinion-matters` rendered only the loading fallback instead of exposing `기록 시작`, and repeated browser-side 500 resource errors were observed. A new 2026-03-16 09:02 Asia/Seoul environment recovery probe confirmed the runtime is still up on `/` and `/login?next=%2Ftemplates`, but no new auth/protected-route recovery evidence exists, so `C-01` remains truthfully blocked pending runtime/auth intervention or fresh environment recovery.
