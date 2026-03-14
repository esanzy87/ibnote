# IBNote 002 Password Reset Foundation Todo

Status: Draft tracker - awaiting sign-off before implementation
Source of truth: `docs/features/002_password_reset_foundation/spec.md`
Companion docs:
- `docs/features/002_password_reset_foundation/prd.md`
- `docs/features/002_password_reset_foundation/adr.md`
- `docs/features/002_password_reset_foundation/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 002 implementation.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not convert password reset work into broader account-lifecycle expansion
- do not start implementation until the 002 docpack is reviewed and sign-off truth is recorded

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and UX shape
2. Phase B - Auth-surface implementation
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | 002 sign-off missing | All phases | PRD/spec/todo/risk docs are approved |
| GB-02 | Scope drift risk | Phases B-C | delete/provider/admin boundaries are explicit |
| GB-03 | Reset runtime truth unknown | Phase C | active runtime reset path is verified |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 002 scope and exclusions | P0 | todo | - |
| A-02 | A | Choose smallest valid reset UX shape | P0 | todo | A-01 |
| A-03 | A | Define verification matrix and closeout evidence | P0 | todo | A-02 |
| B-01 | B | Add reset discoverability to login surface | P1 | todo | A-03 |
| B-02 | B | Implement reset request flow and copy states | P1 | todo | B-01 |
| B-03 | B | Align auth messaging so sign-in/create/reset remain clear | P1 | todo | B-02 |
| C-01 | C | Run runtime QA for reset request plus auth regression smoke | P1 | todo | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | todo | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | todo | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and UX shape

#### A-01 Freeze 002 scope and exclusions
- Priority: `P0`
- Status: `todo`
- Scope:
  - confirm password reset only
  - explicitly exclude account deletion and provider expansion
- QA:
  - no doc ambiguity remains about 002 boundaries

#### A-02 Choose smallest valid reset UX shape
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-01`
- Scope:
  - decide whether reset lives inline or on a dedicated minimal route
  - prefer smallest understandable flow
- QA:
  - chosen shape keeps login surface understandable

#### A-03 Define verification matrix and closeout evidence
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-02`
- Scope:
  - define runtime and repo-health checks needed for done-state
- QA:
  - completion evidence is explicit, not implied

### Phase B - Auth-surface implementation

#### B-01 Add reset discoverability to login surface
- Priority: `P1`
- Status: `todo`
- Blocked by: `A-03`
- Scope:
  - expose the reset path clearly without overpowering primary auth actions
- QA:
  - reset affordance is discoverable and non-confusing

#### B-02 Implement reset request flow and copy states
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-01`
- Scope:
  - build reset request submission state and user guidance
- QA:
  - success/help/error states are understandable and scope-safe

#### B-03 Align auth messaging so sign-in/create/reset remain clear
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-02`
- Scope:
  - ensure auth entry language stays coherent after reset addition
- QA:
  - no auth ambiguity remains between the three actions

### Phase C - QA and closeout

#### C-01 Run runtime QA for reset request plus auth regression smoke
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-03`
- QA method:
  - verify reset request runtime path
  - recheck sign-in/create-account/protected-route continuity

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-01`
- QA method:
  - confirm no scope drift and repo health remains green

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded

## 6. Current progress snapshot

- Current phase: `Phase A - Scope lock and UX shape`
- Current task: `awaiting sign-off`
- Last completed task: `-`
- Active blocker: `GB-01 002 sign-off missing`
- Notes: 002 is intentionally narrow. Password reset is in scope; account deletion is intentionally deferred to a later package so 002 can remain a small, launch-relevant account-recovery slice.

## 7. Completion rule

002 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- verification matrix criteria are satisfied with evidence
- no scope drift into deletion/provider/admin flows is found
- human sign-off is recorded before package closeout
