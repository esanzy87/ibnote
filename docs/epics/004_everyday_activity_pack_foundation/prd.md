# IBNote 004 Everyday Activity Pack Foundation PRD

Version: 0.1
Date: 2026-03-14
Owner: James / 1-person founder
Primary use: next-feature content/experience package for documented implementation
Status: Signed off - implementation may start

---

## 1. Document purpose

This PRD defines the next package after 003 learning-experience hardening.

This package exists to expand IBNote's parent-facing activity coverage so the product can be used in more real home situations without becoming school-like, heavy, or curriculum-driven.

The package should not be treated as a template-count project.
It should be treated as a home-friendly inquiry/activity routine expansion package.

This is not a curriculum delivery package.
This is not a teacher-tool package.
This is not an account-lifecycle package.

---

## 2. Package definition

### 2.1 One-line package definition
`004_everyday_activity_pack_foundation` expands IBNote's everyday parent-facing activity pack so parents can more often find a natural, repeatable, low-burden activity that leads into useful records and later revisit.

### 2.2 Baseline truth inherited from earlier packages
- `000_bootstrap` remains the closed product baseline truth.
- `001_brand_marketing_design_foundation` remains the launch-surface expression baseline.
- `002_password_reset_foundation` remains the auth-recovery baseline.
- `003_learning_experience_foundation` remains the core experience-quality baseline across templates -> records -> summary.
- Existing route model and record/summary structure remain baseline truth unless 004 explicitly improves activity-pack coverage and related discovery quality.

### 2.3 Package thesis
The next leverage is not adding more account controls. The next leverage is helping parents find more home-natural, repeatable, meaningful activities that fit IBNote's reflection-and-record loop.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
After launch expression, auth recovery, and learning-experience hardening, the next high-leverage expansion is broader activity coverage that still feels natural in family life.

### 3.2 Product risk being addressed
Without this package:
- IBNote may feel useful but narrow in what kinds of home moments it supports
- activity choice may be exhausted too quickly
- repeat use may depend too much on a limited starter set
- the product risks feeling like a small template collection rather than a reusable home-learning companion

### 3.3 Expected product impact
This package should improve:
- everyday use frequency potential
- parent sense that there is usually “something fitting to use now”
- activity diversity without increasing burden
- the bridge from home moments into meaningful recorded reflection

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Expand the activity pack with more parent-usable home situations and routines.
2. Favor repeatable, low-burden, natural household inquiry/activity formats over one-off “special project” activities.
3. Preserve IB/PYP-inspired values such as agency, inquiry, reflection, and small action without importing school structure into the home.
4. Improve coverage breadth while keeping discovery understandable and non-overwhelming.
5. Ensure new pack items are worth recording and revisiting inside IBNote.

### 4.2 Non-goals
This package must not:
- turn IBNote into a school curriculum-delivery product
- import Unit of Inquiry structure, lines of inquiry, rubric-style framing, or exhibition/project-school mechanics into the parent experience
- add AI recommendation/generation
- add template authoring CMS or admin content tooling
- add account deletion, provider expansion, payments, or business/admin systems
- become a quantity-only template expansion with weak quality bar

### 4.3 Release rule
If a proposal requires teacher-like planning structures, curriculum-management behavior, admin tooling, AI recommendations, or major platform/content-system redesign, it belongs in a later package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- defining and implementing new activity clusters for everyday parent-child use
- refining discovery/grouping/labels so a larger pack remains easy to browse
- improving template descriptions so parents quickly understand when and why to use an activity
- ensuring new activities fit naturally into records and later revisit/summary value
- modest restructuring of template-pack presentation where needed for clarity and coverage

### 5.2 Out-of-scope
- school-style Unit of Inquiry packaging
- heavy project/exhibition frameworks
- score/rubric/evaluation framing
- AI-generated or auto-authored activities
- admin/editor CMS for template operations
- account-lifecycle expansion
- major backend or template-engine redesign

### 5.3 Boundary interpretation rule
If a change increases home-natural, repeatable, low-burden activity coverage in a way that fits IBNote's existing record/revisit loop, it is probably in scope.
If it makes the product feel more like school, curriculum delivery, evaluation, or admin content operations, it is probably out of scope.

---

## 6. Research-backed design framing

This package should be shaped by the following design truths:
- translate PYP philosophy into home-scale loops, not school-scale structure
- prefer conversation, observation, play, choice, expression, and small action over lesson delivery
- categorize activities by reusable thinking/inquiry moves, not only by topic
- favor routines/rituals that can be repeated in different contexts, not one-off novelty tasks
- keep parent tone supportive and non-interrogative
- avoid school-like burden, evaluation, and assignment feeling

---

## 7. Recommended activity-cluster direction

Priority cluster candidates for foundation scope:
1. conversational check-ins
2. notice / pattern / sort routines
3. choice / reason / responsibility in family life
4. play-based inquiry loops

Foundation execution rule:
- default mandatory foundation clusters are `conversational check-ins` and `notice / pattern / sort routines`
- `choice / reason / responsibility` and `play-based inquiry loops` are default secondary/stretched additions unless a stronger implementation rationale is recorded

Possible later or optional clusters (not necessarily foundation scope):
- expression / storytelling / making-based reflection
- mini inquiry experiments
- slow-burn personal inquiry packs

---

## 8. Quality bar

A new activity pack item is only good enough if it can pass the following practical questions:
1. can a parent understand within a few seconds when this activity fits?
2. does it feel natural in household life rather than imported from school structure?
3. can it be repeated across different moments instead of working only as a one-off novelty task?
4. does it create something worth recording now and revisiting later?
5. is it compatible with modest, non-evaluative summary/revisit language?
6. is the burden low enough that it does not feel like homework, performance pressure, or forced enrichment?

---

## 9. Definition of done

This package is done only when all are true:
1. new activity coverage is materially broader and clearly structured
2. the added/updated packs meet the quality bar above
3. discovery remains understandable and not overloaded
4. no drift into school-structure, evaluation, AI, admin, or lifecycle expansion occurs
5. runtime and repo-health checks remain green where applicable
6. human sign-off is recorded on the 004 docpack

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- documented activity-cluster rationale for what was added and why
- before/after discovery review for the expanded pack
- evidence that new activities are low-burden, repeatable, and record-worthy
- scope-audit result showing no schoolization/admin/AI/lifecycle drift
- verification logs for lint, typecheck, build
- explicit human sign-off record for `prd.md`, `spec.md`, `todo.md`, and `risk_analysis.md`

Evidence must distinguish between:
- direct implementation/runtime verification
- human quality judgment and fit-to-product review
- still-open items not yet claimable as done

---

## 11. Guardrails for coding agents

1. Do not optimize for template count.
2. Do not import school curriculum structures into the parent-facing experience.
3. Prefer repeatable home routines over “special project” activities.
4. Prefer activity coverage that creates recording and revisit value.
5. If a proposed activity feels teacher-led, assignment-like, or evaluative, deprioritize or reject it.
6. If evidence is missing, leave the item open rather than overstating completion.
