# IBNote 001 Brand Marketing Design Foundation Spec

Status: Signed off - implementation and closeout completed on 2026-03-14
Source of truth: `docs/features/001_brand_marketing_design_foundation/prd.md`
Companion docs:
- `docs/features/001_brand_marketing_design_foundation/adr.md`
- `docs/features/001_brand_marketing_design_foundation/risk_analysis.md`

## 1. Purpose

This spec converts the 001 PRD into a concrete launch-surface rebrand plan that a low-skill coding agent can execute without guessing.

The agent must know exactly:
- which routes are in-scope
- what copy/visual/UX rebrand changes are allowed
- what is explicitly forbidden
- how to verify improvement without feature expansion
- when to stop and wait for human direction instead of proceeding

If this spec conflicts with 001 PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000_bootstrap` remains completed baseline truth.
- This package is rebrand-only at the launch-surface layer.
- No new capability, route, workflow, backend, or auth lifecycle expansion is allowed.
- Human sign-off for the rebrand direction now exists in principle, and this synced docpack is the implementation baseline for Phase C onward.

If older bootstrap text conflicts with closeout truth, use `docs/features/000_bootstrap/todo.md` current snapshot and `NIGHT_RUN_REPORT.md` as canonical.

### 2.2 Route scope
In-scope routes only:
- `/`
- `/login`
- `/templates`
- `/templates/[slug]`
- `/my/summary`
- `/my/settings`

Inherited-but-non-redesign routes to protect during regression:
- `/my/records`
- `/my/records/new?template={slug}`
- `/my/records/[id]`

These inherited routes may be referenced only for terminology and non-destruction checks. They are not redesign targets in 001 unless a purely shared style touch is unavoidable and behavior remains unchanged.

### 2.3 Core workflow protection
Refinement must not break or redefine:
- auth gating model
- start-record path
- records and summary behavior
- settings action behavior

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- new product logic or new persisted state
- route additions or route splitting
- copy that implies new legal/privacy commitments beyond existing truth
- UI changes whose correctness depends on undocumented founder preference beyond the already-approved rebrand direction
- reopening bootstrap baseline behavior

## 3. Shared refinement rules

### 3.1 Copy rules
- Use plain, parent-friendly Korean.
- Avoid educational jargon in primary UI copy.
- Keep one dominant message per major section.
- Avoid inflated claims (for example, guaranteed performance outcomes).

### 3.2 CTA hierarchy rules
- One primary CTA per major section.
- Primary CTA uses explicit action language.
- Secondary CTAs are visually weaker and support context, not competition.

### 3.3 Trust and privacy framing rules
- Place trust/privacy messaging near relevant actions.
- Keep wording concrete, short, and non-legalistic.
- Preserve existing privacy-minimization truth from bootstrap.

### 3.4 Visual consistency rules
- Keep launch-facing spacing rhythm consistent between routes.
- Keep headline/body scale relationships consistent.
- Keep button and card hierarchy consistent (primary, secondary, neutral).
- Deep visual redesign is allowed, but it must stay attached to existing route purpose and behavior rather than inventing new UI capability.

### 3.5 Scope guardrails
Do not introduce:
- password reset/account deletion scope
- new auth provider UI
- AI/recommendation surface
- CMS/admin/analytics dashboard
- backend/platform feature work
- product renaming away from `IBNote`

### 3.6 Controlled vocabulary baseline
Use one preferred label per intent unless existing product truth forces otherwise.

| Intent | Preferred wording rule | Avoid drift examples |
| --- | --- | --- |
| start a record from template | use one consistent verb phrase across in-scope routes | `기록 시작`, `작성 시작`, `바로 해보기` mixed together without intent difference |
| sign in vs create account | keep mode labels explicit and paired | vague mixed labels like `계속하기` without auth context |
| summary / recent activity | keep the time-window framing consistent with existing product truth | inconsistent labels that imply a different time range |
| delete data vs sign out | explicitly distinguish outcome ownership | copy that suggests account deletion exists |
| privacy/trust note | reference data handling truth concretely, not aspirationally | vague claims like `완전 안전`, `100% 보호` |

If implementation discovers existing canonical UI labels in code, update this table to match them instead of inventing a new synonym set.

### 3.7 Surface-level trust placement checklist
- `/`: trust note near first meaningful CTA or lower-page decision point.
- `/login`: trust/return-path guidance near form submit area.
- `/templates`: trust framing only if it supports browsing confidence; do not force legal copy into content areas.
- `/templates/[slug]`: keep benefit and action framing factual; do not imply guaranteed outcomes.
- `/my/summary`: frame recent activity insight as supportive summary, not evaluation or diagnosis.
- `/my/settings`: place ownership/action consequence copy adjacent to destructive or session actions.

## 4. Route-by-route requirements

### 4.1 Landing `/`
Purpose: clarify product value quickly, express a stronger launch-ready brand, and drive a confident next step.

Required outcomes:
- hero answers "what this product is" in simple language
- supporting copy answers "why this is useful for parents"
- CTA hierarchy makes next action obvious
- trust/privacy note is visible and plain

Rules:
- do not add new feature promises
- keep section-level copy compact and scannable
- remove placeholder-like uncertainty language where present
- preserve bootstrap-required landing section coverage (hero, 3-step flow, example templates, value section, CTA, privacy note), even if wording and hierarchy are refined

Acceptance checks:
- first-screen copy can be understood in under 10 seconds
- one clear primary CTA exists in the hero area
- trust note remains aligned to bootstrap privacy stance

### 4.2 Login `/login`
Purpose: reduce friction and uncertainty before authentication while carrying the new launch-surface brand tone.

Required outcomes:
- mode intent (login/create account) is clear
- return-path explanation is understandable
- error guidance is actionable and non-technical

Rules:
- keep auth capability unchanged (email/password only)
- avoid enumeration-prone or over-detailed auth failures
- preserve existing redirect behavior
- preserve bootstrap-required controls on the same route (email, password, sign-in/create-account path, error area, next-path guidance)
- do not split auth flow into additional lifecycle routes inside this package

Acceptance checks:
- user can identify next action immediately
- error area wording guides retry clearly
- no new auth lifecycle claims are added

### 4.3 Templates `/templates`
Purpose: make template discovery feel trustworthy, focused, easy, and visually coherent with the rebrand.

Required outcomes:
- current-view summary copy is clear and useful
- filtering purpose and reset behavior are understandable
- empty state drives a clear recovery action

Rules:
- keep filter behavior unchanged
- keep protected-route behavior unchanged
- improve copy clarity and visual hierarchy only

Acceptance checks:
- primary page message and supporting hints are non-redundant
- empty state CTA is explicit and helpful
- no behavior drift in auth/filters

### 4.4 Template detail `/templates/[slug]`
Purpose: improve activity understanding, confidence to start record, and launch-surface visual coherence.

Required outcomes:
- hierarchy between template title, summary, and metadata is clear
- action area prioritizes "start record" while preserving print action
- trust framing avoids over-claim language

Rules:
- keep template content blocks unchanged in meaning
- keep start-record and print behaviors unchanged
- avoid adding workflow steps

Acceptance checks:
- action priority is visually obvious
- information chunks are easier to scan
- invalid-template state remains clear and recovery-oriented

### 4.5 Summary `/my/summary`
Purpose: reinforce understandable value from recent activity history with stronger launch-surface clarity and tone consistency.

Required outcomes:
- summary explanation is concise and confidence-building
- metric labels and helper text are parent-friendly
- empty/error states guide next action clearly

Rules:
- keep summary logic and data contract unchanged
- keep period definition unchanged (last 14 days)

Acceptance checks:
- users can understand what each block means without extra explanation
- retry/recovery actions remain explicit
- no metric logic changes are introduced

### 4.6 Settings `/my/settings`
Purpose: strengthen trust through ownership and control clarity within the new launch-surface brand direction.

Required outcomes:
- account ownership explanation is short and clear
- destructive-action messaging is explicit and truthful
- sign-out and data-delete guidance avoids confusion

Rules:
- keep delete/sign-out behavior unchanged
- do not imply account deletion support

Acceptance checks:
- user can distinguish delete-data vs sign-out outcomes
- trust framing stays concrete and non-ambiguous
- no scope drift into account lifecycle expansion

## 5. Launch-surface rebrand contract

### 5.1 Token-level expectations (implementation-safe)
- color: define and apply consistent semantic roles (surface/text/primary/warning/error)
- spacing: define baseline section/card/button spacing tiers
- type: define consistent scale for page title/section title/body/meta
- controls: define button/card visual hierarchy rules

Global-style boundary:
- shared token/global style updates are allowed only if they do not materially restyle non-target routes or alter shared-shell behavior outside 001 intent.

### 5.2 Implementation boundary
This contract is for route-surface rebrand execution only. It may materially change the visual presentation of in-scope routes, but it is not a product-capability change or a full design-system migration.

## 6. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Product clarity up | In-scope route purpose and next action are immediately understandable | Before/after review sheet |
| VR-02 | Trust expression up | Trust/privacy framing is visible, concise, and consistent | Route copy checklist |
| VR-03 | CTA hierarchy improved | One primary CTA per major section, with visual dominance | Route-level UI review |
| VR-04 | Visual consistency improved | Spacing/type/button/card hierarchy follows shared rules | Cross-route consistency checklist |
| VR-05 | Workflow non-destructive | Auth/templates/summary/settings behavior unchanged | Manual route smoke QA |
| VR-06 | Scope safe | No out-of-scope feature drift | Scope audit checklist |
| VR-07 | Repo health retained | lint/typecheck/build pass | Command outputs |
| VR-08 | Governance complete | Human sign-off recorded and unresolved doc risks explicitly dispositioned | Sign-off note + doc closeout record |

## 7. Test plan template for implementation

## Objective
Verify launch-facing clarity/trust/consistency improvements without capability expansion.

## Prerequisites
- branch with only 001 implementation changes
- baseline screenshots or notes for before state
- explicit confirmation that the doc-sync pass below is complete and 001 implementation may start from the synced docpack

## Test cases
1. Landing clarity check: first-screen message + CTA comprehension in 10 seconds -> pass/fail note.
2. Login trust check: mode/return-path/error guidance clarity -> pass/fail note.
3. Templates discoverability check: filter/empty/reset clarity -> pass/fail note.
4. Template detail action check: start-record priority + print secondary clarity -> pass/fail note.
5. Summary comprehension check: metric meaning and recovery paths clarity -> pass/fail note.
6. Settings trust check: delete-data vs sign-out distinction clarity -> pass/fail note.
7. Workflow regression check: `/templates/[slug]` -> `기록 시작` -> `/my/records/new?template=...` -> `/my/records/[id]` (including signed-out redirect and return-path) still works -> pass/fail note.
8. Scope audit check: no excluded feature introduced -> pass/fail note.
9. Governance check: human sign-off record exists and any remaining risk items are marked open, deferred, or accepted explicitly -> pass/fail note.

## Success criteria
All test cases pass and VR-01 through VR-08 are satisfied.

## How to execute
- route-level manual QA on desktop/mobile
- run lint/typecheck/build in repo
- record structured before/after results
- attach the synced sign-off/control-plane reference before closing package

## 8. Final guardrail checklist

Stop and re-scope if any planned change requires:
- new backend/state architecture
- new auth lifecycle features
- new product workflow
- analytics/CMS/AI feature add-ons
- undocumented founder preference being guessed as product truth

When uncertain, choose the smallest refinement that improves clarity/trust/consistency while preserving existing behavior.

## 9. Resumption protocol

Before any agent starts implementation work on 001, confirm all of the following in order:
1. `docs/BLACKBOARD.md` has been read.
2. The newest 001-related note does not say `pending` or `awaiting sign-off`.
3. `prd.md`, `spec.md`, `todo.md`, `adr.md`, and `risk_analysis.md` are internally consistent.
4. Current task and next task in `todo.md` are explicit.
5. The docpack no longer describes 001 as lightweight-only if the latest human decision allows a deeper rebrand.
6. Any unresolved risk items are either accepted by human review or treated as blockers.

If any of the above is false, do not start implementation; update docs or wait for human direction first.
