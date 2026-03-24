# IBNote 009 Record Revisit Entry Context Pack Spec

Status: Hardened - ready for implementation
Source of truth: `docs/epics/009_record_revisit_entry_context_pack/prd.md`

## 1. Purpose

This spec turns the 009 PRD into an execution-safe plan for improving record re-entry clarity on existing parent-facing record surfaces without drifting into recommendation, analytics, or archive-management behavior.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `008` remain inherited baseline truth.
- 009 improves record re-entry context and revisit usefulness, not product intelligence.
- Every meaningful change must be justified by clearer parent orientation, calmer resumption, or stronger continuity between a record and the broader revisit loop.
- 009 must stay bounded to existing record-entry surfaces.

### 2.2 Core review questions
- Does this change help a parent understand what this reopened record is and what state it is in?
- Does it make continue-vs-reread behavior clearer without adding hidden intelligence claims?
- Does it preserve the calm, non-institutional tone described in `AMBITION.md`?
- Is the gain stronger than generic micro-polish?
- Can the result be verified through route review, runtime smoke, and scope audit?

## 3. Candidate surfaces and default lock

### 3.1 Candidate surfaces
- `/my/records/[id]`
- `/my/records` only if needed for handoff honesty

### 3.2 Default locking hypothesis
Current locked touched set for 009:
- required first anchor: `/my/records/[id]`
- deferred companion anchor: `/my/records`

Lock justification:
- `/my/records/[id]` is the narrowest place where record re-entry context can improve meaningfully.
- `/my/records` already received revisit/list-level improvements in 006 and continuity framing in 008, so it should stay deferred unless a tiny handoff cue is required.

### 3.3 Surface selection rule
Choose the smallest set of existing record-entry surfaces that can deliver a clear re-entry gain.
Do not reopen templates, auth, settings, summary, or unrelated routes by default.

## 4. Shared implementation rules

### 4.1 Continuity rules
- clarify what this reopened record represents
- make draft vs submitted state easier to understand at a glance
- help the parent resume or reread without turning the screen into a task manager
- prefer parent-facing orientation cues over new workflow controls

### 4.2 Tone rules
- keep language modest, humane, and observational
- avoid report-card, evaluation, or diagnostic framing
- avoid recommendation-style wording such as "you should review next"
- avoid managerial/archive semantics such as queues, folders, system actions, or progress dashboards

### 4.3 Scope guardrails
Do not introduce:
- reminders, notifications, or resurfacing logic
- AI or rule-based pattern interpretation
- new search/tag/filter systems
- new submission semantics or record-lifecycle states
- backend/platform expansion

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Record re-entry clarity improves | reopened record gives faster understanding of context and current state | before/after review note |
| VR-02 | Revisit usefulness improves | continue vs reread intent is calmer and clearer without recommendation semantics | route/content review note |
| VR-03 | Tone remains humane and modest | no evaluative, institutional, or pseudo-intelligent language appears | wording audit |
| VR-04 | Scope safety holds | no dashboard/archive/recommendation drift or unjustified surface sprawl appears | scope audit |
| VR-05 | Runtime/repo safety | touched surfaces still work and repo health remains green | runtime smoke + command outputs |

## 6. Task plan

1. freeze 009 scope, re-entry thesis, and anti-drift boundaries
2. lock the touched surface set to `/my/records/[id]`, with `/my/records` deferred by default
3. implement re-entry context improvements that make record state and continuity easier to understand on the locked surface
4. verify the result improves orientation and revisit value without expanding capability or implying intelligence
5. run runtime smoke, scope audit, and repo-health verification
6. prepare closeout

## 6.1 Locked implementation focus

### `/my/records/[id]`
- make the reopened-record context easier to understand at a glance: what this note is, whether it is draft or submitted, and how to approach it now
- strengthen continuity from list/summary-level revisit into the specific record without turning the page into a dashboard
- improve re-entry value with calm context framing before the editable form sections
- prefer upgrades to the existing `HeaderSummary`, `WritingGuide`, and adjacent context blocks in `src/components/records/record-editor.tsx` before inventing any new control model
- use already-available record facts first (`status`, `performedOn`, `updatedAt`, template snapshot, competency snapshot, existing field content) rather than adding any backend-derived intelligence

### Deferred by default
- `/my/records` remains deferred unless implementation on `/my/records/[id]` reveals a concrete honesty gap that needs a tiny handoff cue
- current source review indicates `/my/records` already gives sufficient list-level revisit and summary continuity after 006/008, so no companion touch is authorized at implementation start
- `/my/summary`, `/templates`, `/templates/[slug]`, `/login`, `/reset-password`, and `/my/settings` are out of scope for 009 by default

## 7. Acceptance checklist

A touched 009 surface should not be considered done unless all are yes:
1. Is it easier to understand what this reopened record is and what state it is in?
2. Does the change help the parent orient without implying smart analysis?
3. Does the surface feel more worth revisiting over time?
4. Does the wording stay modest and parent-facing?
5. Was the touched surface count kept as small as possible?
6. If `/my/records` was touched, was that expansion justified by a concrete honesty gap rather than vague polish appetite?
