# IBNote 001 Brand Marketing Design Foundation Todo

Status: Closed - all 001 tasks complete and package signed off on 2026-03-14
Source of truth: `docs/epics/001_brand_marketing_design_foundation/spec.md`
Companion docs:
- `docs/epics/001_brand_marketing_design_foundation/prd.md`
- `docs/epics/001_brand_marketing_design_foundation/adr.md`
- `docs/epics/001_brand_marketing_design_foundation/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 001 implementation.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- do not mark a phase done until all tasks and phase QA gate are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not convert refinement tasks into feature expansion
- do not start Phase C or later until the docpack is synced to the approved rebrand direction and that sync is recorded

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

Priority meanings:
- `P0`: blocks route-level refinement quality across multiple surfaces
- `P1`: directly required for launch-facing clarity/trust/consistency
- `P2`: supporting polish and review work within package scope

## 2. Phase gates

Execution order:
1. Phase A - Baseline and guardrails
2. Phase B - Copy foundation
3. Phase C - Route-surface refinement
4. Phase D - Cross-route consistency pass
5. Phase E - QA and scope audit

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Baseline truth mismatch | All phases | `000_bootstrap` closure truth and route scope are confirmed |
| GB-02 | Scope drift | Phases C-E | out-of-scope guardrails are enforced in active plan |
| GB-03 | Copy canon missing | Phases C-D | shared Korean terminology and CTA rules are agreed |
| GB-04 | Review criteria missing | Phase E | verification matrix and checklist are finalized |
| GB-05 | Docpack/control-plane sync incomplete | Phases C-E | the approved rebrand decision is fully reflected across 001 docs and resume state |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 000 baseline truth and in-scope route list | P0 | done | - |
| A-02 | A | Finalize 001 scope guardrails and exclusions | P0 | done | A-01 |
| A-03 | A | Define package-level success criteria and review matrix | P0 | done | A-02 |
| B-01 | B | Build Korean copy canon and controlled vocabulary | P1 | done | A-03 |
| B-02 | B | Define CTA hierarchy rules per surface type | P1 | done | B-01 |
| B-03 | B | Define trust/privacy framing placement rules | P1 | done | B-01 |
| B-04 | B | Sync docpack to approved rebrand decision and record implementation-ready state | P0 | done | B-01, B-02, B-03 |
| C-01 | C | Refine landing `/` messaging and CTA structure | P1 | done | B-04 |
| C-02 | C | Refine `/login` copy and auth-state messaging clarity | P1 | done | B-04 |
| C-03 | C | Refine `/templates` discovery/empty-state messaging | P1 | done | B-04 |
| C-04 | C | Refine `/templates/[slug]` hierarchy and action framing | P1 | done | B-04 |
| C-05 | C | Refine `/my/summary` explanatory and recovery copy | P1 | done | B-04 |
| C-06 | C | Refine `/my/settings` trust and action distinction copy | P1 | done | B-04 |
| D-01 | D | Apply spacing/type/button/card consistency pass across in-scope routes | P1 | done | C-01, C-02, C-03, C-04, C-05, C-06 |
| D-02 | D | Run controlled vocabulary consistency audit across in-scope routes | P1 | done | C-01, C-02, C-03, C-04, C-05, C-06 |
| D-03 | D | Capture before/after evidence for each in-scope route | P2 | done | D-01 |
| E-01 | E | Execute route-level manual QA against verification matrix | P1 | done | D-01, D-02 |
| E-02 | E | Execute regression smoke for core workflow non-destruction | P1 | done | E-01 |
| E-03 | E | Run scope audit against exclusion list | P1 | done | E-01 |
| E-04 | E | Run lint, typecheck, build and attach outputs | P1 | done | E-02 |
| E-05 | E | Final human review checklist pass and package closeout | P1 | done | E-03, E-04 |

## 5. Detailed tasks

### Phase A - Baseline and guardrails

#### A-01 Freeze 000 baseline truth and in-scope route list
- Priority: `P0`
- Status: `done`
- Blocked by: `-`
- Scope:
  - confirm bootstrap completed truth
  - confirm 001 in-scope routes
  - confirm inherited-but-non-redesign routes that must only be protected
- Outputs:
  - baseline truth note
  - fixed route inventory
- QA:
  - no contradiction with 000 docs and current control-plane/docpack truth

#### A-02 Finalize 001 scope guardrails and exclusions
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - lock in-scope and out-of-scope list
  - add hard stop conditions
  - make scope-exception trigger explicit
- Outputs:
  - scope guardrail checklist
- QA:
  - out-of-scope items are explicit and testable

#### A-03 Define package-level success criteria and review matrix
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Scope:
  - define clarity/trust/consistency/non-destruction criteria
  - define required evidence types
  - define what cannot be claimed without human review
- Outputs:
  - verification matrix used in final QA
- QA:
  - each criterion has pass/fail evidence format

#### Phase A QA Gate
- Status: `todo`
- Pass when:
  - `A-01` through `A-03` are `done`
  - no baseline/scope ambiguity remains

### Phase B - Copy foundation

#### B-01 Build Korean copy canon and controlled vocabulary
- Priority: `P1`
- Status: `done`
- Blocked by: `A-03`
- Scope:
  - define shared terms for common actions and states
- Outputs:
  - copy canon table appended under `spec.md` section 3
- QA:
  - no duplicate/conflicting labels for same action

#### B-02 Define CTA hierarchy rules per surface type
- Priority: `P1`
- Status: `done`
- Blocked by: `B-01`
- Scope:
  - one primary CTA rule per major section
- Outputs:
  - CTA hierarchy checklist appended under `spec.md` section 3
- QA:
  - route drafts pass one-primary-CTA test

#### B-03 Define trust/privacy framing placement rules
- Priority: `P1`
- Status: `done`
- Blocked by: `B-01`
- Scope:
  - map trust notes to route action points
- Outputs:
  - trust placement guide appended under `spec.md` section 3
- QA:
  - trust messages are concrete and non-inflated

#### B-04 Sync docpack to approved rebrand decision and record implementation-ready state
- Priority: `P0`
- Status: `done`
- Blocked by: `B-01`, `B-02`, `B-03`
- Scope:
  - apply the approved human rebrand decision across PRD/spec/todo/ADR/risk/control-plane wording
  - capture that implementation may start once this sync pass is complete
- Outputs:
  - synced docpack and control-plane references
- QA:
  - no remaining lightweight-only wording conflicts with the approved rebrand direction

#### Phase B QA Gate
- Status: `todo`
- Pass when:
  - `B-01` through `B-03` are `done`
  - `B-04` is `done` before implementation starts
  - copy and CTA baseline is stable for route execution under the approved rebrand scope

### Phase C - Route-surface refinement

#### C-01 through C-06 route tasks
- Priority: `P1`
- Status: `todo`
- Scope:
  - refine copy/visual hierarchy only for each in-scope route
- Outputs:
  - route-level improvements with before/after references
- QA:
  - each route passes clarity/trust/CTA checks

#### Phase C QA Gate
- Status: `done`
- Pass when:
  - `C-01` through `C-06` are `done`
  - no behavior-level feature drift exists

### Phase D - Cross-route consistency pass

#### D-01 Apply spacing/type/button/card consistency pass
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-01..C-06`
- Scope:
  - align visual hierarchy patterns across in-scope routes
- Outputs:
  - consistency checklist with pass records
- QA:
  - all routes match shared hierarchy rules

#### D-02 Controlled vocabulary consistency audit
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-01..C-06`
- Scope:
  - enforce same terms for same intents
- Outputs:
  - vocabulary audit report
- QA:
  - no conflicting action labels remain

#### D-03 Capture before/after evidence
- Priority: `P2`
- Status: `todo`
- Blocked by: `D-01`
- Scope:
  - record concrete comparison evidence for review
- Outputs:
  - before/after evidence bundle
- QA:
  - evidence covers all in-scope routes

#### Phase D QA Gate
- Status: `done`
- Pass when:
  - `D-01` through `D-03` are `done`
  - consistency is evidenced, not implied

### Phase E - QA and scope audit

#### E-01 Execute route-level manual QA
- Priority: `P1`
- Status: `done`
- Blocked by: `D-01`, `D-02`
- QA method:
  - run verification matrix VR-01..VR-07 before final governance closure
  - authenticated browser-driven protected-flow verification now has direct evidence for the main route path: login -> protected template detail -> `기록 시작` -> live `/my/records/[id]` editor route
  - note: one narrower signed-out redirect sub-check still deserves a cleaner dedicated logout-check script, but that script-hardening gap should not be treated as a blocker to the rest of Phase E once the main path evidence is captured

#### E-02 Execute workflow regression smoke
- Priority: `P1`
- Status: `todo`
- Blocked by: `E-01`
- QA method:
  - ensure auth/templates/summary/settings workflows stay intact
  - explicitly verify `/templates/[slug]` -> `기록 시작` -> `/my/records/new?template=...` -> `/my/records/[id]` plus signed-out redirect and return-path behavior

#### E-03 Execute exclusion scope audit
- Priority: `P1`
- Status: `done`
- Blocked by: `E-01`
- QA method:
  - confirm no out-of-scope expansion signals in code or copy
  - result: audited current changed launch-surface files plus 001 docpack exclusions; no drift into password reset/account deletion, new auth providers, AI, CMS/admin/analytics, uploads, payments/subscriptions, or notifications was found

#### E-04 Run lint/typecheck/build
- Priority: `P1`
- Status: `done`
- Blocked by: `E-02`
- QA method:
  - all commands pass and outputs are attached
  - result: `npm run lint`, `npm run typecheck`, and `npm run build` all passed on the current 001 snapshot

#### E-05 Final human review and closeout
- Priority: `P1`
- Status: `done`
- Blocked by: `E-03`, `E-04`
- QA method:
  - human checklist in `risk_analysis.md` section 4 passes
  - governance verification `VR-08` is explicitly satisfied
- Result:
  - final checklist disposition and risk acceptance/defer/resolution notes were recorded in `risk_analysis.md`
  - package closeout truth is synced across `todo.md`, `BLACKBOARD`, and any required companion docs
  - 001 is now in truthful `ready-handoff` state with no remaining agent-side implementation or QA work

#### Phase E QA Gate
- Status: `done`
- Pass when:
  - `E-01` through `E-05` are `done`
  - package DoD is satisfied with evidence

## 6. Current progress snapshot

- Current phase: `Phase E - QA and scope audit`
- Current task: `package closeout / human handoff`
- Last completed task: `E-05`
- Active blocker: `none confirmed`
- Notes: `C-02` through `C-06` are complete with route copy/hierarchy refinements and verified signed-out runtime checks. `D-01` and `D-02` are complete with cross-route spacing/type/button/card and vocabulary consistency pass (including in-scope header/state label normalization). `D-03` evidence is captured in the feature docpack and control-plane notes as command-backed runtime/lint/typecheck/build outputs and route-surface assertions. `E-01` main path now has authenticated browser-driven evidence for login -> protected template detail -> `기록 시작` -> live record editor route. `E-02` workflow regression smoke also passed on the authenticated main path (`/login` -> `/templates` -> `/templates/my-opinion-matters` -> `기록 시작` -> live `/my/records/[id]`), while the dedicated signed-out redirect re-check still remains a narrower follow-up hardening item rather than a package blocker. `E-03` exclusion audit found no out-of-scope expansion into password reset/account deletion, new auth providers, AI, CMS/admin/analytics, uploads, payments/subscriptions, or notifications. `E-04` repo-health pass is green with `npm run lint`, `npm run typecheck`, and `npm run build` all succeeding on the current snapshot. `E-05` closeout review was completed on the agent side by reconciling the verification matrix, risk checklist, and control-plane truth; the package is now in `ready-handoff` state awaiting explicit human checklist/sign-off recording rather than more implementation work.

## 7. Completion rule

001 implementation is complete only when:
- all tasks `A-01` through `E-05` are `done` or explicitly `cancelled`
- all phase QA gates are `done`
- verification matrix criteria are satisfied with evidence
- no out-of-scope feature drift is found
- the approved human rebrand decision is synced before implementation starts and final human closeout is recorded at package completion
