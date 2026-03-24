# IBNote 002 Password Reset Foundation Todo

Status: Closed agent-side; Phase C complete through C-03
Source of truth: `docs/epics/002_password_reset_foundation/spec.md`
Companion docs:
- `docs/epics/002_password_reset_foundation/prd.md`
- `docs/epics/002_password_reset_foundation/adr.md`
- `docs/epics/002_password_reset_foundation/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 002 implementation.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not convert password reset work into broader account-lifecycle expansion
- implementation may start from Phase A because sign-off truth is now recorded; keep scope locked to password reset only

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
| GB-01 | Scope drift risk | Phases B-C | delete/provider/admin boundaries are explicit |
| GB-02 | Reset runtime truth unknown | Phase C | active runtime reset path is verified and evidence boundary is stated explicitly |
| GB-03 | Provider/env delivery dependency unclear | Phase C | provider/env-side caveats are separated from product-code truth |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 002 scope and exclusions | P0 | done | - |
| A-02 | A | Choose smallest valid reset UX shape | P0 | done | A-01 |
| A-03 | A | Define verification matrix and closeout evidence | P0 | done | A-02 |
| B-01 | B | Add reset discoverability to login surface | P1 | done | A-03 |
| B-02 | B | Implement reset request flow and copy states | P1 | done | B-01 |
| B-03 | B | Align auth messaging so sign-in/create/reset remain clear | P1 | done | B-02 |
| C-01 | C | Run runtime QA for reset request plus auth regression smoke | P1 | done | - |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | done | - |
| C-03 | C | Final human review checklist pass and package closeout | P1 | done | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and UX shape

#### A-01 Freeze 002 scope and exclusions
- Priority: `P0`
- Status: `done`
- Scope:
  - confirm password reset only
  - explicitly exclude account deletion and provider expansion
- QA:
  - no doc ambiguity remains about 002 boundaries

#### A-02 Choose smallest valid reset UX shape
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - confirm the signed-off default that reset uses one dedicated minimal route linked from `/login`
  - only deviate if implementation truth proves a clearly smaller path with equal clarity and lower risk
- QA:
  - chosen shape keeps login surface understandable
  - no modal/inline complexity is introduced without explicit justification

#### A-03 Define verification matrix and closeout evidence
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Scope:
  - define runtime and repo-health checks needed for done-state
  - define the exact evidence boundary between request-initiation verification and independent delivery verification
  - define how provider/env blockers are reported separately from product-code truth
- QA:
  - completion evidence is explicit, not implied

### Phase B - Auth-surface implementation

#### B-01 Add reset discoverability to login surface
- Priority: `P1`
- Status: `done`
- Blocked by: `A-03`
- Scope:
  - expose the reset path clearly without overpowering primary auth actions
- QA:
  - reset affordance is discoverable and non-confusing

#### B-02 Implement reset request flow and copy states
- Priority: `P1`
- Status: `done`
- Blocked by: `B-01`
- Scope:
  - build reset request submission state and user guidance
- QA:
  - success/help/error states are understandable and scope-safe

#### B-03 Align auth messaging so sign-in/create/reset remain clear
- Priority: `P1`
- Status: `done`
- Blocked by: `B-02`
- Scope:
  - ensure auth entry language stays coherent after reset addition
- QA:
  - no auth ambiguity remains between the three actions

### Phase C - QA and closeout

#### C-01 Run runtime QA for reset request plus auth regression smoke
- Priority: `P1`
- Status: `done`
- QA method:
  - verify reset request runtime path on the active auth project/runtime
  - explicitly record whether only request initiation was verified or whether email delivery was independently verified too
  - recheck sign-in/create-account/protected-route continuity
- Evidence summary:
  - 2026-03-14 fresh revalidation proved the old sandbox blocker stale: local listener bind succeeded, `next start -- --hostname 127.0.0.1 --port 3020` booted successfully, `/reset-password` rendered the expected reset-copy surface, direct Firebase Auth login for the canonical QA account succeeded, and `sendPasswordResetEmail(...)` returned success
  - evidence boundary: request initiation was verified against the active Firebase/Auth runtime; inbox delivery was not independently checked in this run and must not be overstated
  - protected-route continuity smoke on `/my/records` returned runtime `200 OK` on the current build baseline, preserving the pre-existing auth surface without introducing a reset-driven regression

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `done`
- QA method:
  - confirm no scope drift and repo health remains green
- Evidence summary:
  - scope audit found 002 still limited to `/login`, `/reset-password`, and the reset helper path; no drift into account deletion, provider expansion, admin recovery, or `/my/settings` reset controls
  - `npm run lint`, `npm run typecheck`, and `npx next build --webpack` all passed after the fresh C-01 runtime revalidation

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `done`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded
- Evidence summary:
  - 2026-03-14 17:00 Asia/Seoul closeout pass recorded in `risk_analysis.md` section `4.2`
  - final checklist accepted discoverability, auth clarity, ambiguity-safe messaging, scope safety, and runtime evidence honesty
  - package truth remains explicit that reset-request initiation was verified while inbox delivery was not independently confirmed

## 6. Current progress snapshot

- Current phase: `Phase C - QA and closeout`
- Current task: `none - package closed agent-side`
- Last completed task: `C-03`
- Active blocker: `none currently confirmed`
- Notes: Phase A, Phase B, and Phase C are complete. The package is now in truthful `ready-handoff` state; the next human-facing action is acknowledgment / next-package selection rather than more implementation.

## 7. Completion rule

002 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- verification matrix criteria are satisfied with evidence
- no scope drift into deletion/provider/admin flows is found
- human sign-off is recorded before package closeout
