# IBNote 007 Micro Usability and Empty State Polish Spec

Status: Implementation-ready
Source of truth: `docs/epics/007_micro_usability_and_empty_state_polish/prd.md`
Companion docs:
- `docs/epics/007_micro_usability_and_empty_state_polish/todo.md`
- `docs/epics/007_micro_usability_and_empty_state_polish/risk_analysis.md`
- `docs/epics/007_micro_usability_and_empty_state_polish/adr.md`

## 1. Purpose

This spec turns the 007 PRD into an execution-safe plan for improving small usability and empty-state moments without drifting into broader redesign or new capability.

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `006` remain inherited baseline truth.
- 007 improves micro-usability, empty-state clarity, and recovery guidance.
- 007 must stay intentionally narrow, deterministic, and easy to verify.
- Every meaningful change must be justified by lower friction in a real existing moment.

### 2.2 Core review questions
- Does this change reduce hesitation in a first-use, empty, error, or no-result state?
- Does it make the next step clearer without adding new capability?
- Does it preserve route purpose and current product truth?
- Is the gain concrete enough to justify touching the surface?
- Can the result be verified with route review, runtime smoke, and repo-health checks?

### 2.3 Route scope
Locked implementation surfaces:
- `/templates`
- `/my/summary`

Explicitly deferred by default:
- `/templates/[slug]`
- `/my/records`
- `/my/settings`
- `/login`
- `/reset-password`

Locked Phase A conclusion for 007:
- the smallest valid surface set is `/templates` plus `/my/summary`
- `/templates` carries the best remaining low-risk empty/no-result/first-use friction opportunity
- `/my/summary` carries the best remaining low-risk empty/recovery/next-step clarity opportunity
- default toward copy/hierarchy/action-clarity changes before any structural UI changes
- do not reopen deferred surfaces unless a tiny continuity fix is required to keep the touched set truthful during implementation or QA

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- new product capability or workflow semantics
- major route or information-architecture redesign
- recommendation/search/archive/dashboard expansion
- schema or backend behavior change beyond trivial continuity support
- broad brand/visual overhaul without a concrete usability reason

## 3. Shared implementation rules

### 3.1 Micro-usability rules
- Prefer calmer next-step clarity over more UI.
- Prefer better recovery cues over extra explanation.
- Prefer route-local improvements over cross-product churn.
- Keep empty-state language honest, modest, and action-oriented.
- Avoid inventing urgency or capability the product does not have.

### 3.2 Empty-state and recovery rules
- Empty states should explain what is missing and what the safest next step is.
- No-result states should help the parent recover without blame or confusion.
- Error-adjacent states should give the smallest truthful retry/recovery cue.
- First-use states should feel welcoming without becoming tutorial-heavy.

### 3.3 Scope guardrails
Do not introduce:
- new recommendation or personalization behavior
- new dashboard/search/filter systems beyond clarifying existing behavior
- new auth/account/provider workflows
- admin/reporting capability
- major visual-system redesign
- new promises about automation, guidance depth, or intelligence

## 4. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Micro-usability improves | touched surfaces show clearer next-step or recovery behavior in real low-friction moments | before/after review note |
| VR-02 | Empty/no-result clarity improves | empty/no-result/first-use states are calmer and easier to act on | route/content review note |
| VR-03 | Scope safety | no capability drift or unjustified surface sprawl appears | scope audit checklist |
| VR-04 | Runtime/repo safety | touched surfaces still work and repo health stays green | runtime smoke + command outputs |
| VR-05 | Governance complete | closeout risk disposition is explicit | closeout note |

## 5. Task plan

1. freeze 007 scope and choose the smallest valid surface set (`/templates`, `/my/summary`)
2. improve the chosen surfaces with modest, truthful first-use, empty-state, and recovery guidance
3. verify the touched set remains narrow and worth the package cost
4. run route/content review plus affected runtime smoke and repo-health verification
5. prepare closeout
