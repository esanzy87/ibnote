# IBNote 002 Password Reset Foundation Spec

Status: Signed off - implementation-ready baseline
Source of truth: `docs/features/002_password_reset_foundation/prd.md`
Companion docs:
- `docs/features/002_password_reset_foundation/todo.md`
- `docs/features/002_password_reset_foundation/risk_analysis.md`
- `docs/features/002_password_reset_foundation/adr.md`

## 1. Purpose

This spec converts the 002 PRD into an execution-safe implementation plan for a minimal password-reset package.

The agent must know exactly:
- what reset capability is allowed
- which surfaces are in scope
- what UX/copy constraints matter
- what must not expand into broader account-lifecycle work
- how to verify completion truthfully

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000_bootstrap` remains the closed baseline truth.
- `001_brand_marketing_design_foundation` remains the launch-surface expression baseline.
- This package adds only minimal password-reset support for email/password accounts.
- No account deletion, provider expansion, or admin recovery support is allowed.

### 2.2 Route scope
In-scope surfaces only:
- `/login`
- one dedicated minimal password-reset request route linked from `/login`

Inherited-but-non-redesign surfaces to protect during regression:
- `/`
- `/templates`
- `/templates/[slug]`
- `/my/records`
- `/my/records/new?template={slug}`
- `/my/records/[id]`
- `/my/summary`
- `/my/settings`

### 2.3 Core workflow protection
The package must not break or redefine:
- sign-in flow
- create-account flow
- protected-route redirect behavior
- existing record/summary/settings flows

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- account deletion or broader account lifecycle support
- new auth providers or advanced identity verification
- product/legal claims beyond current truth
- support-admin/manual account recovery workflows

## 3. Shared implementation rules

### 3.1 Copy rules
- Use plain Korean.
- Keep messaging calm and direct.
- Avoid revealing whether a given email definitely exists.
- Make the next step obvious after submission.
- Prefer generic success/help wording over account-existence confirmation.

Safe copy example:
- `입력한 이메일로 안내를 보낼 수 있는 경우, 곧 메일을 받게 됩니다. 메일함과 스팸함을 함께 확인해 주세요.`

Avoid drift examples:
- `등록되지 않은 이메일입니다.`
- `해당 계정을 찾지 못했습니다.`

### 3.2 UX rules
- Keep reset discovery obvious but visually secondary to the main auth actions.
- Do not let reset affordance overpower sign-in/create-account flow.
- Keep mode distinction clear: sign in vs create account vs reset.

### 3.3 Scope guardrails
Do not introduce:
- account deletion
- password change/settings expansion unless truly required as tiny support work
- social/provider login
- admin/helpdesk recovery tooling
- MFA/phone verification/identity proofing

## 4. Surface requirements

### 4.1 Login `/login`
Purpose: allow a returning user who forgot a password to discover the reset path without increasing confusion for normal auth use.

Required outcomes:
- sign-in and create-account remain clear
- password-reset entry is discoverable but not dominant
- reset guidance is understandable and low-anxiety

Rules:
- preserve current sign-in/create-account behavior
- avoid account-enumeration-prone language
- keep return-path explanation intact where relevant

Acceptance checks:
- a user can find reset affordance quickly
- reset entry does not make the page feel overloaded
- normal auth flow remains easy to understand

### 4.2 Reset request surface
Purpose: let the user submit a password-reset request with clear expectation of what happens next.

Default UX shape:
- use one dedicated minimal reset-request route linked from `/login`
- do not use a modal by default
- do not overload the main `/login` form with inline reset states unless implementation truth shows a clearly smaller and equally understandable path

Required outcomes:
- email entry is simple and obvious
- success/help/error messaging is understandable
- no unsupported promises are made about timing or delivery certainty

Rules:
- use standard reset-email behavior from the current auth provider stack
- do not create fake support guarantees
- do not expose whether an email is registered

Acceptance checks:
- the form can be completed with minimal ambiguity
- the post-submit state gives the user a clear next step
- copy remains consistent with 001 tone

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Reset discoverability | User can find reset path from auth surface | UI review note |
| VR-02 | Reset flow clarity | Request flow and next-step messaging are understandable | Route copy checklist |
| VR-03 | Scope safety | No drift into delete/provider/admin flows | Scope audit checklist |
| VR-04 | Auth regression safety | Sign-in/create-account and protected redirects still work | Runtime smoke QA |
| VR-05 | Runtime reset truth boundary explicit | Request initiation is verified, and delivery evidence level is stated truthfully | QA note with evidence boundary |
| VR-06 | Repo health retained | lint/typecheck/build pass | Command outputs |
| VR-07 | Governance complete | Human sign-off recorded and open risks dispositioned | Sign-off note |

## 6. Task plan

1. freeze exact 002 scope and exclusions
2. choose the smallest valid reset UX shape
3. implement login-surface reset discoverability
4. implement reset request surface and messaging
5. run runtime QA and regression smoke
6. run scope audit and repo-health verification
7. prepare sign-off closeout

## 7. Coding-agent rules

1. Keep one task `in_progress` at a time.
2. Do not mark a task done without verification evidence.
3. Prefer standard provider behavior over custom recovery logic.
4. If reset UX can be done more simply, choose the simpler valid option.
5. Do not let 002 silently absorb account deletion work.

## 8. Autonomous execution contract

Use this section when the package is resumed by a recurrent check or unattended restart.

Rules:
- If the current package is incomplete, the next tracker task is documented, and no true external blocker is active, start or resume that task without waiting for fresh human confirmation.
- If a prior worker stopped unexpectedly but the documented next action is unchanged and still safe, auto-relaunch implementation from that next action.
- Prefer acting first and reporting second; do not stop at a status-only update when in-scope work still remains.
- Only escalate instead of continuing when one of the following is true:
  - a human product/scope decision is required
  - destructive ambiguity exists
  - repeated provider/env/runtime failure prevents truthful progress
  - the package has reached a truthful handoff/sign-off stop point
- If provider/env truth may have changed, mark the old blocker `pending-revalidation`, run the smallest useful recheck, and continue if the blocker no longer reproduces.
- Before stopping, sync `todo.md`, `docs/BLACKBOARD.md`, and `NIGHT_RUN_REPORT.md` so the next unattended agent can resume from exact current truth.
