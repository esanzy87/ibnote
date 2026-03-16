# IBNote 006 Record Revisit Convenience Pack PRD

Version: 0.1
Date: 2026-03-15
Owner: James / 1-person founder
Primary use: next-feature low-risk revisit-convenience package for documented implementation
Status: Hardened draft - sign-off/debate pass recorded

---

## 1. Document purpose

This PRD defines the next package after 005 print/preservation polish.

This package exists to make already-created IBNote records easier to come back to, continue from, and revisit in small everyday moments without changing the product into a recommendation system, heavy archive manager, or broad workflow redesign.

The package should stay intentionally narrow and operationally safe.
It should focus on small revisit-convenience improvements around existing records and record lists.

This is not an AI recommendation feature.
This is not a new dashboard system.
This is not a major information-architecture rewrite.

---

## 2. Package definition

### 2.1 One-line package definition
`006_record_revisit_convenience_pack` improves the convenience of finding, understanding, and resuming existing records so parents can re-enter their reflection flow with less friction.

### 2.2 Baseline truth inherited from earlier packages
- `000_bootstrap` remains the closed product baseline truth.
- `001_brand_marketing_design_foundation` remains the launch-surface expression baseline.
- `002_password_reset_foundation` remains the auth-recovery baseline.
- `003_learning_experience_foundation` remains the templates -> records -> summary continuity baseline.
- `004_everyday_activity_pack_foundation` remains the activity-coverage and discovery baseline.
- `005_print_and_export_polish` remains the preservation/print readability baseline.
- Existing auth, record storage, summary calculation, and route ownership rules remain baseline truth unless 006 explicitly improves revisit convenience on already-existing record surfaces.

### 2.3 Package thesis
After improving preservation value in 005, the next low-risk leverage is making existing records easier to re-open and continue using in normal parent life. The goal is not more content generation or intelligence. The goal is lower revisit friction.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
After 005, the control-plane decision is to continue with the already-sequenced low-risk follow-on package `006_record_revisit_convenience_pack`.

### 3.2 Product risk being addressed
Without this package:
- previously created records may be harder to re-enter than they should be
- draft vs submitted meaning may remain clear enough to understand but not as convenient as it could be for quick revisit
- record-list and record-detail continuity may still require extra interpretation effort
- parents may lose momentum because returning to an old note feels slightly heavier than starting fresh

### 3.3 Expected product impact
This package should improve:
- convenience of returning to existing records
- clarity of what can be continued, reviewed, or left as-is
- confidence that older notes are still usable and worth reopening
- product polish without materially increasing architecture or operational risk

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Make existing records easier to revisit from the current record surfaces.
2. Clarify continue/review/revisit cues on the smallest high-value surfaces.
3. Reduce re-entry friction without changing record meaning or storage semantics.
4. Keep the experience modest, parent-facing, and continuity-oriented.
5. Stay safe for unattended implementation and truthful verification.

### 4.2 Non-goals
This package must not:
- introduce recommendation, ranking, or AI revisit guidance
- add archive management, folders, tagging systems, or search platforms beyond small in-scope convenience work
- redesign the summary system or create a new dashboard product
- alter auth/account lifecycle behavior
- introduce notifications, reminders, or messaging workflows
- rewrite the record model, submission semantics, or permissions model

### 4.3 Release rule
If a proposed change requires new data modeling, broad navigation redesign, recommendation logic, or operational scheduling semantics, it belongs in a later package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- small revisit-convenience improvements on existing record-centered surfaces
- clearer status/continuation/revisit cues on `/my/records` and, if justified, `/my/records/[id]`
- low-risk continuity wording or layout adjustments that help parents understand what to reopen or continue
- modest supporting cues that connect recent records and revisit intent more clearly

### 5.2 Out-of-scope
- recommendations or smart resurfacing systems
- new reminder/notification features
- broad filtering/search platforms unless narrowly justified as minimal convenience work
- major summary redesign
- export/storage/file management expansion
- admin, analytics, AI, payments, or platform-management features

### 5.3 Boundary interpretation rule
If a change makes existing records easier to reopen, continue, or understand with low complexity on existing surfaces, it is probably in scope.
If it adds intelligence, new systems, or broad archive-management semantics, it is probably out of scope.

---

## 6. Candidate anchor surfaces

006 should stay anchored to the most revisit-relevant existing record surfaces, in likely priority order:
1. `/my/records`
2. `/my/records/[id]`
3. `/my/summary` only if a very small continuity cue is needed to keep revisit flow truthful

The package does not need to touch every candidate surface. It should choose the smallest set with the clearest revisit-convenience payoff.

Hardening/sign-off conclusion for v0.1:
- start from `/my/records` first
- keep `/my/records/[id]` conditional rather than assumed
- keep `/my/summary` excluded by default
- reject any implementation direction that makes the records list feel like a new dashboard, archive manager, or recommendation surface

---

## 7. User story focus

Primary user story:
- As a parent, I want it to be easy to return to records I already made so I can continue or reread them without extra friction.

Supporting user stories:
- As a parent looking at my record list, I want to understand quickly which notes I can continue versus simply revisit.
- As a parent reopening a record, I want the page to support re-entry calmly instead of feeling like I have to re-figure out the flow.
- As a parent using IBNote in short everyday moments, I want returning to old records to feel lightweight and worth doing.

---

## 8. Quality principles

### 8.1 Product experience principles
- prefer revisit convenience over feature breadth
- prefer calmer continuity cues over clever systems
- keep status and action language honest and modest
- support real parent reuse without implying intelligence or evaluation
- keep improvements archive- and continuity-friendly

### 8.2 Technical principles
- prefer existing-surface improvements over new infrastructure
- keep scope bounded to copy, structure, and low-risk interaction polish where possible
- avoid new schema or orchestration complexity
- keep verification concrete and repeatable

---

## 9. Definition of done

This package is done only when all are true:
1. the chosen revisit surfaces show materially lower re-entry friction
2. before/after evidence exists for the touched surfaces
3. no drift into recommendation, archive-management, or broad workflow capability occurred
4. runtime and repo-health checks remain green where applicable
5. sign-off/debate conclusion is recorded on the 006 docpack before implementation worker launch or closeout stage transitions that require it

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- route-level before/after review for the touched revisit surfaces
- evidence that continue/review/revisit cues are clearer
- evidence that re-entry friction is lower on the chosen surfaces
- scope-audit result showing no drift into recommendations, notifications, or archive platforms
- verification logs for lint, typecheck, build, and any relevant runtime smoke
- explicit sign-off/debate record for `prd.md`, `spec.md`, `todo.md`, and supporting docs

Evidence must distinguish between:
- direct runtime/implementation verification
- human quality judgment/sign-off
- still-open items that cannot yet be claimed as done

---

## 11. Guardrails for coding agents

1. Do not turn 006 into a recommendation, reminder, or archive-management system.
2. Prefer small, existing-surface revisit-convenience improvements.
3. Tie every touched change to lower revisit friction or clearer continuation intent.
4. Do not reopen broader summary/template/navigation work unless a minimal continuity adjustment truly requires it.
5. If evidence is missing, leave the item open rather than overstating completion.
