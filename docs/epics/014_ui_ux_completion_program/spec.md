# IBNote 014 UI/UX Completion Program Spec

Version: 0.1
Date: 2026-03-24
Owner: agent-authored docpack
Status: Active
Depends on:
- `013_records_surface_stitch_polish`

## 1. Implementation intent

014 is a rolling UI/UX completion program, not a single fixed-scope implementation package.

Its purpose is to improve overall finish quality through repeated bounded phases that follow the same loop:
1. inspect current product reality
2. define one bounded improvement slice
3. implement and validate that slice
4. record findings from real outcomes
5. write the next phase brief from those findings

## 2. Operating model for this epic

### 2.1 Epic lifecycle rule

014 remains the active UI/UX improvement epic until James explicitly says to close it.
Do not auto-close 014 just because one phase finishes.

### 2.2 Phase progression rule

Every phase should produce three durable outputs inside this docpack:
- a completed task ledger entry in `todo.md`
- a findings entry in `findings.md`
- a next-phase brief in this `spec.md` before the next implementation slice begins

Each phase should also pass two checks before it is treated as complete:
- a bounded scope check: the audited or implemented surface set is explicitly named
- a rollover check: the next phase brief is grounded in concrete findings rather than intuition

### 2.3 Documentation update rule

When a phase changes state, next action, or blocker truth:
1. update `docs/BLACKBOARD.md` first
2. sync `todo.md`
3. sync `findings.md` when new evidence or decisions were produced
4. sync `spec.md`
5. sync `prd.md` only if epic framing or durable purpose changed

## 3. Quality lens for phase selection

The highest-value next phase should usually improve one or more of the following:
- start clarity
- route orientation
- information hierarchy
- interaction continuity
- recovery from confusion or hesitation
- cross-route visual/system coherence
- mobile readability and density control
- brand presence and logo consistency
- image/illustration quality where imagery materially affects comprehension or finish quality

Reject or defer candidate work that is mostly:
- cosmetic without user-flow leverage
- broad redesign without bounded validation
- new feature expansion disguised as polish
- inconsistent with IBNote's calm, humane parent-facing tone
- large asset generation before style direction is validated on representative screens

## 4. Current phase brief

### Phase 1 - baseline audit and first bounded slice selection

Phase 1 objective:
- inspect the current product for the most important UI/UX finish-quality gaps
- convert those gaps into a prioritized candidate list
- choose one bounded implementation slice for follow-through
- define the success checks that will determine whether the slice actually improved the experience
- identify where brand/logo inconsistency or missing imagery is materially weakening perceived product completeness

Phase 1 expected outputs:
- an audited view of the highest-friction or lowest-finish surfaces
- a ranking rationale for why the chosen slice should go first
- a locked first implementation target that is small enough to execute safely
- a dedicated findings record in `findings.md`
- a draft brief for Phase 2 that can be refined after Phase 1 findings exist

Phase 1 live status as of 2026-03-24:
- Gate A is complete
- Gate B is complete after a capped manual pilot validated representative discovery/template image direction
- the first bounded implementation target is locked to authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`
- Phase 1 is complete and ready to hand off into the locked Phase 2 implementation slice

Phase 1 initial focus areas:
- parent-facing core routes rather than edge/admin/system surfaces
- visible UX friction with meaningful leverage
- finish-quality gaps that affect perceived product completeness
- one small representative `imagegen` pilot only if asset direction needs validation before broader rollout

### Phase 1 gates

#### Gate A - audit lock

Gate A is complete only if all are true:
- the Phase 1 audit route set is explicitly reviewed
- findings are recorded in `findings.md` with route-level evidence
- the candidate list for the first bounded slice is ranked rather than merely listed

Gate A completion status:
- completed on 2026-03-24 using the locked minimum route set
- evidence and candidate ranking are recorded in `findings.md`
- the locked first bounded slice is the authenticated workspace coherence pass across `/my/records`, `/my/records/[id]`, and `/my/summary`

#### Gate B - bounded pilot lock

Gate B is optional and should open only if Gate A findings show that missing or weak imagery is materially hurting completion quality.

If Gate B opens, it is complete only if all are true:
- the pilot asset set stays within the explicit Phase 1 pilot cap
- the pilot is limited to representative routes only
- the pilot is used to validate direction, not to silently expand into broad asset production

Gate B status:
- complete
- justification: `findings.md` entry `P1-F04`
- current output: manual prompt pack at [014_phase1_gate_b_image_prompt_pack.md](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014_phase1_gate_b_image_prompt_pack.md)
- current unblock: `findings.md` entry `P1-F06`
- final review result: `findings.md` entry `P1-F08`
- next step: none inside Phase 1

### Phase 1 audit route set

Phase 1 should audit this minimum parent-facing route set:
- `/`
- `/login`
- `/templates`
- `/templates/[slug]`
- `/my/records`
- `/my/records/[id]`
- `/my/summary`
- `/reset-password`

Additional routes may be reviewed, but Phase 1 should not be considered complete until the minimum set above is covered.

### Phase 1 audit dimensions

Use Phase 1 to inspect at least these dimensions:
- color and surface-token consistency across pages
- tone-and-manner consistency in parent-facing copy
- style-collapse or stale-design residue across routes
- hierarchy and composition quality, including hero/orientation/action separation
- density and mobile readability
- component reuse drift and affordance consistency
- interaction continuity across the main parent journey
- image-asset integrity, placeholder presence, and narrative usefulness
- brand presence and logo-usage consistency

### Phase 1 image/asset rule

Phase 1 may include image work, but only in this bounded form:
- audit missing, empty, weak, or placeholder-like assets
- define the desired visual thesis for generated assets
- create only a small pilot set of representative assets, or a manual prompt handoff that stays within the same cap, if direct generation is intentionally delegated outside the repo workflow

Phase 1 pilot cap:
- at most 3 generated assets
- only for representative parent-facing routes from the Phase 1 audit set
- intended to validate direction, not to finish all remaining asset work
- broader rollout or batch generation must wait for the next phase brief

Do not treat Phase 1 as the batch-production phase for all assets.
Broader generation should wait until the pilot direction is validated.

## 5. Next phase brief

### Phase 2 brief

Phase 2 target:
- authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`

Phase 2 objective:
- unify the authenticated `/my` journey into one recognizable IBNote workspace rather than three adjacent surfaces with different orientation patterns
- strengthen brand presence, route continuity, and calmer parent-facing tone across record list, record editor, and summary
- align shell, CTA treatment, and section framing without reopening unrelated routes or broad redesign work

Phase 2 planned scope:
- create or refine one shared workspace shell/header pattern that clearly anchors `/my/records`, `/my/records/[id]`, and `/my/summary`
- make navigation affordances, entry points, and return paths feel consistent across the main parent loop
- remove remaining admin-like or English residue across records list, record editor, and summary where it weakens the calm parent-facing voice
- harmonize major surface, hero, and CTA treatment enough that the three routes read as one product journey

Phase 2 allowed changes:
- shell/header composition for the locked `/my` routes
- workspace navigation pattern, active-state treatment, and route-to-route return links
- primary and secondary CTA hierarchy, labels, and shared styling on the locked routes
- top-level route headings plus loading, empty, error, and guidance copy on the locked routes
- outer section framing and hero treatment where needed to align the three locked routes into one workspace identity

Phase 2 non-goals inside the locked routes:
- no changes to data models, persistence, or authentication behavior
- no changes to record filtering logic, summary calculation logic, or ordering semantics
- no changes to the record editor input schema, field set, or submission rules
- no restructuring of record cards or summary metrics in ways that change what information is shown
- no image rollout, brand-asset expansion, or new public-route polish beyond what is already documented

Phase 2 exclusions:
- no homepage redesign
- no batch generation of more public/template images
- no expansion into `/my/settings` or unrelated routes unless Phase 2 work reveals a direct blocker inside the locked scope

Phase 2 success checks:
- `/my/records`, `/my/records/[id]`, and `/my/summary` each expose the same recognizable workspace shell/header pattern
- the locked `/my` routes expose one consistent navigation affordance set for records, summary, and template return paths where relevant
- English UI residue is removed from headings, labels, guidance copy, and loading/error/empty states on the locked routes
- primary and secondary CTA styling follows one shared hierarchy across the locked routes
- users can move between records, summary, and templates without the experience feeling like separate subsystems
- mobile readability remains acceptable after shell alignment, including a first viewport that still surfaces route identity, key navigation, and at least one primary action without excessive crowding

Phase 2 verification notes:
- verify the locked routes at desktop and mobile widths
- judge completion against the concrete checks above, not against an open-ended “feels more polished” standard
- if a proposed change requires altering behavior or information architecture outside the allowed changes, stop and document it as out of scope rather than widening the phase silently

Phase 2 evidence basis:
- carry forward `P1-F01`, `P1-F02`, and `P1-F03` as primary implementation drivers
- treat `P1-F08` as supporting evidence only, not as a mandate for immediate additional image production

### Future phase briefs

Append new sections sequentially:
- `Phase 3 brief`
- `Phase 4 brief`
- and so on

Do not overwrite earlier phase briefs once they become part of the decision chain.

## 6. Explicit exclusions

014 must not become:
- a justification for unlimited whole-app redesign
- a dumping ground for unrelated product ideas
- a status-fiction epic that keeps growing without concrete phase closure

Each phase must stay bounded enough that its outcome can be judged honestly.
