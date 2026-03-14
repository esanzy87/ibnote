# IBNote 003 Learning Experience Foundation Spec

Status: Signed off - implementation-ready baseline
Source of truth: `docs/features/003_learning_experience_foundation/prd.md`
Companion docs:
- `docs/features/003_learning_experience_foundation/todo.md`
- `docs/features/003_learning_experience_foundation/risk_analysis.md`
- `docs/features/003_learning_experience_foundation/adr.md`

## 1. Purpose

This spec turns the 003 PRD into an execution-safe plan for improving the felt learning experience of IBNote without turning the package into an unfocused polish bucket.

The agent must know exactly:
- which user flows anchor the package
- which surfaces can be improved
- how to judge experience improvements beyond taste-only feedback
- which scope boundaries must remain locked
- how to verify completion truthfully

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000_bootstrap`, `001_brand_marketing_design_foundation`, and `002_password_reset_foundation` remain inherited baseline truth.
- 003 improves the user experience of already-in-scope parent workflows.
- 003 must not become a grab-bag of unrelated polish.
- Every task must map to at least one anchor flow.

### 2.2 Anchor flows
- Flow A: template discovery -> template selection
- Flow B: record start -> record writing
- Flow C: record revisit -> summary reading

Anchor-flow core review questions:
- Flow A: can a parent understand more quickly when and why a template fits the current need, and does selection feel less abstract than before?
- Flow B: before writing starts, is it clearer what kind of note will be written, and does the writing experience feel less intimidating than before?
- Flow C: do records and summary now feel like one connected revisit experience, and is the reason to come back and read them more obvious than before?

### 2.3 Route scope
Primary in-scope surfaces:
- `/templates`
- `/templates/[slug]`
- `/my/records/new`
- `/my/records/[id]`
- `/my/records`
- `/my/summary`

Allowed supporting surfaces only when needed for continuity:
- `/`
- minimal in-scope labels/copy on shared shell elements already connected to these flows

Non-redesign baseline surfaces to protect:
- `/login`
- `/reset-password`
- `/my/settings`

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- account lifecycle expansion
- AI/recommendation capability
- admin/business/payment capability
- a new template platform or authoring system
- major data model/backend redesign outside experience continuity needs

## 3. Shared implementation rules

### 3.1 Experience rules
- Improve usefulness, continuity, and clarity, not just surface polish.
- Prefer plain Korean and concrete guidance.
- Reduce hesitation at transition points between screens.
- Keep the product humble and parent-facing.
- If a change cannot be explained as helping a user move through Flow A, B, or C, it probably does not belong.

### 3.2 Scope guardrails
Do not introduce:
- account deletion
- new auth providers
- AI generation or recommendations
- summary-intelligence upgrades, recommendation engines, or automatic meaning inference
- educational-performance evaluation language that overclaims what the product can know
- admin or analytics dashboards
- major backend/platform redesign
- purely aesthetic changes with no anchor-flow benefit

### 3.3 Proof rule
Taste-only claims are insufficient.
For any important change, the implementation should be explainable as improving one or more of:
- understanding
- friction reduction
- continuity
- revisit value

## 4. Surface requirements

### 4.1 Flow A: template discovery -> template selection
Purpose: help a parent understand what each template is for and choose with less uncertainty.

Required outcomes:
- templates feel easier to compare and understand
- template detail clarifies why and when to use the activity
- the step from browsing to choosing feels more natural

Acceptance checks:
- the parent can quickly infer which activity fits the current need
- template detail explains value without abstraction overload
- CTA into record start feels contextually earned

### 4.2 Flow B: record start -> record writing
Purpose: make record initiation and writing feel more guided and less like form burden.

Required outcomes:
- the parent understands what kind of note to write before writing begins
- the writing experience reduces uncertainty and intimidation
- the product feels supportive rather than demanding

Acceptance checks:
- record-start context feels clear before the parent writes
- the writing surface offers enough structure without feeling heavy
- the transition from template detail into writing feels continuous

### 4.3 Flow C: record revisit -> summary reading
Purpose: make revisiting records and summaries feel useful, connected, and re-usable.

Required outcomes:
- records and summary surfaces feel connected to the originating activity
- summary is easier to interpret without overclaiming educational meaning
- the parent can more easily understand what happened and what to do next

Flow C hard boundary:
- do not add summary intelligence, recommendation logic, automatic interpretation engines, or pseudo-evaluative language
- do not make the summary sound like the product has inferred more than the current product truth supports

Acceptance checks:
- revisit surfaces are easier to parse and more meaningfully connected
- summary remains modest and helpful rather than abstract, evaluative, or pseudo-intelligent
- return value of the product feels stronger after a record already exists

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Flow A improved | template discovery/selection clarity improved with before/after evidence | route review note |
| VR-02 | Flow B improved | record start/writing clarity improved with before/after evidence | route review note |
| VR-03 | Flow C improved | revisit/summary continuity improved with before/after evidence | route review note |
| VR-04 | Scope safety | no drift into excluded capabilities | scope audit checklist |
| VR-05 | Runtime path safety | affected main-path flows still work | runtime smoke QA |
| VR-06 | Repo health retained | lint/typecheck/build pass | command outputs |
| VR-07 | Governance complete | human sign-off recorded and risk disposition explicit | sign-off note |

## 6. Task plan

1. lock 003 scope and anchor flows
2. identify the highest-leverage experience gaps in each anchor flow
3. implement the 1-2 highest-leverage improvements in Flow A
4. implement the 1-2 highest-leverage improvements in Flow B
5. implement the 1-2 highest-leverage improvements in Flow C
6. run a final cross-flow continuity pass only after the highest-leverage fixes are already in place
7. run before/after evidence review and runtime smoke QA
8. run scope audit and repo-health verification
9. prepare sign-off closeout

## 7. Coding-agent rules

1. Keep one task `in_progress` at a time.
2. Do not mark a task done without evidence.
3. Tie every task to at least one anchor flow.
4. Prefer clearer continuity over larger redesign.
5. Do not silently absorb unrelated polish or new capabilities.
