# IBNote 008 Parent Revisit Continuity Foundation Todo

Status: `ready-handoff` after fresh `C-01` protected-flow revalidation passed on the live runtime; active repo next action is now next-feature preparation
Source of truth: `docs/features/008_parent_revisit_continuity_foundation/spec.md`
Companion docs:
- `docs/features/008_parent_revisit_continuity_foundation/prd.md`

## 1. How to use this file

This file is the execution tracker for 008.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 008 into a recommendation, reminder, archive-management, or analytics package
- implementation must not start until doc hardening records the chosen narrow surface set

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and continuity target selection
2. Phase B - Continuity implementation
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Surface sprawl risk | Phases A-C | touched routes stay very small and justified |
| GB-02 | False-insight risk | Phases B-C | no change implies intelligence, recommendation, or diagnosis |
| GB-03 | Cosmetic-only churn risk | Phases B-C | each change produces a real continuity or reread-value gain |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 008 scope, continuity thesis, and capability boundaries | P0 | done | - |
| A-02 | A | Choose the smallest high-leverage revisit surfaces and evidence shape | P0 | done | A-01 |
| A-03 | A | Define continuity acceptance criteria and closeout evidence | P0 | done | A-02 |
| B-01 | B | Improve record-summary continuity on the chosen surfaces | P1 | done | A-03 |
| B-02 | B | Refine continuity wording and reread-value guidance | P1 | done | B-01 |
| B-03 | B | Verify the touched surfaces remain modest, narrow, and worthwhile | P1 | done | B-02 |
| C-01 | C | Run route/content review and affected runtime smoke | P1 | done | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | done | C-01 |
| C-03 | C | Final closeout and risk disposition | P1 | done | C-02 |

## 5. Current progress snapshot

- Current phase: `Phase C - QA and closeout`
- Current task: `C-03 Final closeout and risk disposition`
- Last completed task: `C-03 Final closeout and risk disposition`
- Active blocker: `none confirmed`
- Notes: 008 Phase B remains complete on `/my/summary` + `/my/records` only, and `/my/records/[id]` stays deferred. Fresh runtime revalidation at 2026-03-16 02:02 Asia/Seoul reran the canonical protected-flow smoke against the live app already occupying `127.0.0.1:3301` using the documented `qa-primary` account. This time login landed on `/templates`, protected template detail loaded with `기록 시작`, and record creation reached a live `/my/records/[id]` editor route successfully. The same smoke still captured repeated 500 resource errors and a non-working logout/protected-redirect check, so 007 should remain preserved as a separate historical debug stop point, but 008 closeout is no longer blocked because the protected main path needed for `/my/summary` / `/my/records` package confidence is currently working. Closeout truth for 008 is therefore `ready-handoff`, not `pending-revalidation`.
