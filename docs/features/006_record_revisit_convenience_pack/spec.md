# IBNote 006 Record Revisit Convenience Pack Spec

Status: Hardened draft - sign-off/debate pass recorded, ready-implementation when a worker is launched
Source of truth: `docs/features/006_record_revisit_convenience_pack/prd.md`
Companion docs:
- `docs/features/006_record_revisit_convenience_pack/todo.md`
- `docs/features/006_record_revisit_convenience_pack/risk_analysis.md`
- `docs/features/006_record_revisit_convenience_pack/adr.md`

## 1. Purpose

This spec turns the 006 PRD into an execution-safe plan for improving record revisit convenience without drifting into recommendations, archive-management systems, or broad UX redesign.

The agent must know exactly:
- which revisit problems are in scope
- which surfaces are valid to touch
- what “lower revisit friction” means in product terms
- what must remain out of scope
- how to verify completion truthfully

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `005` remain inherited baseline truth.
- 006 improves revisit convenience, not product intelligence or system breadth.
- 006 must stay intentionally narrower and lower-risk than 003 and 004.
- Every meaningful change must be justified by lower re-entry friction, clearer revisit intent, or calmer continuity.

### 2.2 Core review questions
- Does this change make it easier to reopen or understand an existing record?
- Does it clarify what can be continued versus simply revisited?
- Does it keep the product modest rather than turning revisit into recommendation logic?
- Does it improve continuity using existing surfaces rather than new systems?
- Does it avoid introducing archive-management expectations?

### 2.3 Route scope
Primary in-scope surfaces:
- `/my/records`
- `/my/records/[id]`

Conditionally allowed supporting surfaces:
- `/my/summary` only for a very small continuity cue if the final touched set cannot remain truthful without it
- small linked copy or label changes on adjacent record-flow surfaces when needed for continuity

Current default touched-surface hypothesis for 006 initial hardening:
- primary implementation target: `/my/records`
- secondary/conditional target: `/my/records/[id]` only if record re-entry truthfully benefits from the same small revisit-convenience pass
- keep `/my/summary` out of the default touched set because 006 should remain a record-centered package unless a tiny continuity cue is clearly needed
- sign-off/debate lock for this pass: current code already gives `/my/records` the clearest 006 leverage (`기록 다시 보기` / `기록 이어서 입력`, status chips, summary handoff), so the first implementation pass should start there and only pull `/my/records/[id]` in if the records-list work exposes a small shared re-entry gap that cannot stay truthful otherwise
- red-team warning accepted: do not let “revisit convenience” become a stealth dashboard/search/filter expansion; existing filters may be clarified, but new management semantics are out of scope

Non-redesign baseline surfaces to protect:
- `/login`
- `/reset-password`
- `/my/settings`
- template discovery/detail surfaces
- summary-calculation semantics
- auth/account/profile capability

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- recommendation or smart resurfacing logic
- new reminders/notifications/messaging behavior
- new archive/search/tagging/folder systems
- major record schema changes
- broad route or IA redesign
- capability expansion beyond revisit-convenience polish

## 3. Shared implementation rules

### 3.1 Revisit-design rules
- Prefer clarity of current record state over extra system behavior.
- Prefer calm continuation cues over feature-heavy management controls.
- Make it easier to understand what to reopen and why.
- Keep revisit intent parent-facing and modest.
- Avoid evaluative, predictive, or recommendation-like framing.
- Avoid promising organization/search power the product does not truly have.

Safe wording examples:
- `이전에 남긴 기록을 다시 읽거나 이어서 정리하기 쉽게 정돈합니다.`
- `지금 이어서 볼 수 있는 기록인지 빠르게 이해할 수 있게 돕습니다.`

Avoid wording examples:
- `다음에 꼭 봐야 할 기록을 추천합니다.`
- `기록 보관함을 체계적으로 관리합니다.`

### 3.2 Revisit priorities for this run
Default priority order:
1. record-list revisit clarity on `/my/records`
2. re-entry/continuation clarity on `/my/records/[id]`
3. tiny continuity cue on `/my/summary` only if needed

Selection rule for implementation:
- choose the smallest surface set that can deliver an obvious revisit-convenience gain
- prefer changes that are easy to verify with runtime smoke, source review, and scope audit
- avoid reopening broader navigation or dashboard work under the label of convenience
- for the initial worker launch, assume `/my/records` only unless a concrete source/runtime finding during implementation proves that a tiny `/my/records/[id]` companion pass is needed to keep revisit wording or re-entry truth internally consistent

### 3.3 Scope guardrails
Do not introduce:
- recommendation/ranking/resurfacing logic
- reminders/notifications/emails
- folders/tags/archive libraries/search platforms
- teacher/report-card/assessment framing
- admin capability or workflow orchestration
- major visual redesign beyond revisit convenience needs
- new product promises that imply richer organization capability than actually exists

## 4. Surface requirements

### 4.1 Records list revisit clarity
Purpose: make the records list a calmer and more useful re-entry surface.

Required outcomes:
- parents can understand record state and revisit options faster
- draft vs submitted meaning remains clear and more actionable
- list-level cues reduce hesitation about reopening a record

Acceptance checks:
- state/action cues are easier to scan
- continuity language supports revisit rather than forcing re-interpretation
- the route remains modest and does not become a management dashboard

### 4.2 Record detail re-entry clarity
Purpose: make reopening a record feel lighter and easier to resume if this surface is included.

Required outcomes:
- a reopened record gives a calm sense of what the parent can do next
- the surface better supports reread-versus-continue understanding
- current submission semantics remain truthful and unchanged

Acceptance checks:
- re-entry language or structure reduces confusion
- no status or mutation semantics are changed accidentally
- the route does not turn into a workflow engine or progress tracker

### 4.3 Continuity wording and action honesty
Purpose: make revisit cues feel intentional while staying honest about capability.

Required outcomes:
- action labels or supporting copy make revisit/continue intent easier to understand
- users are not misled into expecting reminders, recommendations, or advanced record management
- revisit actions feel connected to continuity, not product expansion

Acceptance checks:
- touched actions use truthful wording
- continuity support is clearer on the final touched set
- no fake promises about organization or smart resurfacing appear

### 4.4 Evidence shape for each touched revisit surface
Each touched surface should expose all of the following in implementation or review notes:
- revisit-clarity evidence:
  - it is easier to understand which records to reopen or continue
- continuity evidence:
  - the route better supports re-entry into the existing reflection flow
- noise-reduction evidence:
  - unnecessary ambiguity or friction is reduced
- modesty evidence:
  - no recommendation, archive-management, or evaluative language appears

Route-surface translation check:
- revisit output should emphasize clarity and continuity over system cleverness
- revisit actions should clarify existing behavior rather than imply hidden intelligence

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Revisit convenience improves | the final chosen touched surfaces make reopening/continuing records clearer, with `/my/records` required unless explicitly descoped by a newer signed decision | before/after review note |
| VR-02 | Action/continuity clarity improves | revisit/continue cues are more understandable on the final touched set without overstating capability | route/content review note |
| VR-03 | Scope safety | no recommendation/reminder/archive-platform drift and no unjustified reopening of unrelated surfaces | scope audit checklist |
| VR-04 | Runtime/repo safety | touched surfaces still work and revisit path remains healthy | runtime smoke + command outputs |
| VR-05 | Governance complete | sign-off/debate conclusion is recorded before or at worker launch, and closeout risk disposition is explicit | sign-off note |

## 6. Task plan

1. freeze 006 scope, touched surfaces, and capability boundaries
2. identify the highest-leverage revisit-convenience gaps on existing record surfaces
3. improve record-list and/or record-detail revisit convenience on the chosen surfaces
4. refine continuity wording and action clarity where needed
5. run runtime review plus scope audit and repo-health verification
6. prepare sign-off closeout

## 7. Coding-agent rules

1. Keep one task `in_progress` at a time.
2. Do not mark a task done without evidence.
3. Prefer small, high-confidence revisit-convenience improvements over broad redesign.
4. Reject any change that turns 006 into a recommendation or archive-management system.
5. Keep wording honest about current revisit capability.

## 8. Revisit acceptance checklist

A touched revisit surface should not be treated as done unless it can answer yes to all of the following:
1. Is it easier to understand what can be reopened or continued?
2. Are the most important re-entry cues easier to notice?
3. Has unnecessary revisit friction been reduced?
4. Does the action wording stay truthful about what the product actually supports?
5. Does the output avoid recommendation, official-management, or assessment framing?
6. Can the improvement be verified concretely with source review and runtime checks?
7. If `/my/records/[id]` is touched, was that expansion justified by a concrete records-list continuity gap rather than by vague polish appetite?
