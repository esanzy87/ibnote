# IBNote 008 Parent Revisit Continuity Foundation Spec

Status: Hardened - ready for implementation
Source of truth: `docs/features/008_parent_revisit_continuity_foundation/prd.md`

## 1. Purpose

This spec turns the 008 PRD into an execution-safe plan for improving revisit continuity across existing parent-facing surfaces without drifting into analytics, recommendation, or archive-management behavior.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `007` remain inherited baseline truth.
- 008 improves revisit continuity and summary usefulness, not product intelligence.
- Every meaningful change must be justified by clearer parent understanding, calmer re-entry, or stronger continuity across moments.
- 008 must stay bounded to existing revisit surfaces.

### 2.2 Core review questions
- Does this change help a parent connect a concrete record with broader recent context?
- Does it make revisit more useful without adding hidden intelligence claims?
- Does it preserve the calm, non-institutional tone described in `AMBITION.md`?
- Is the gain stronger than generic micro-polish?
- Can the result be verified through route review, runtime smoke, and scope audit?

## 3. Candidate surfaces and default lock

### 3.1 Candidate surfaces
- `/my/summary`
- `/my/records`
- `/my/records/[id]` only if needed for continuity honesty

### 3.2 Default locking hypothesis
Current locked touched set for 008:
- required first anchor: `/my/summary`
- required second anchor: `/my/records`
- deferred companion anchor: `/my/records/[id]` by default

Lock justification:
- `/my/summary` already contains the strongest continuity opportunity: clarifying what the current window is based on, how recent submitted records contribute to the summary, and how to move back into concrete records without implying recommendation.
- `/my/records` already acts as the re-entry surface where parents decide whether to continue a draft or reread a submitted note, so it is the smallest truthful companion to summary-side continuity work.
- `/my/records/[id]` currently already contains enough local writing/revisit guidance that 008 does not need to reopen the editor by default. Only reopen it if a concrete honesty gap is found during Phase B route review.

### 3.3 Surface selection rule
Choose the smallest set of existing revisit surfaces that can deliver a clear continuity gain.
Do not reopen templates, auth, settings, or unrelated routes by default.

## 4. Shared implementation rules

### 4.1 Continuity rules
- connect concrete recent records with summary understanding more clearly
- make "what this summary is based on" easier to grasp
- make record revisit feel like part of an ongoing loop rather than isolated storage
- prefer parent-facing orientation cues over new controls

### 4.2 Tone rules
- keep language modest, humane, and observational
- avoid report-card, evaluation, or diagnostic framing
- avoid recommendation-style wording such as "you should review" or "suggested next record"
- avoid managerial/archive semantics such as folders, work queues, or system dashboards

### 4.3 Scope guardrails
Do not introduce:
- reminders, notifications, or resurfacing logic
- AI or rule-based pattern interpretation
- new search/tag/filter systems beyond tiny clarity adjustments on existing behavior
- score expansion or institutional metrics framing
- backend/platform expansion

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Record-summary continuity improves | chosen surfaces make the relationship between recent records and summary context easier to understand | before/after review note |
| VR-02 | Revisit usefulness improves | reread/re-entry value is clearer without adding recommendation semantics | route/content review note |
| VR-03 | Tone remains humane and modest | no evaluative, institutional, or pseudo-intelligent language appears | wording audit |
| VR-04 | Scope safety holds | no archive/recommendation/dashboard drift or unjustified surface sprawl appears | scope audit |
| VR-05 | Runtime/repo safety | touched surfaces still work and repo health remains green | runtime smoke + command outputs |

## 6. Task plan

1. freeze 008 scope, continuity thesis, and anti-drift boundaries
2. lock the touched surface set to `/my/summary` + `/my/records`, with `/my/records/[id]` deferred by default
3. implement continuity improvements that make summary basis and revisit flow easier to understand on the locked surfaces
4. verify the result improves understanding and reread value without expanding capability or implying intelligence
5. run runtime smoke, scope audit, and repo-health verification
6. prepare closeout

## 6.1 Locked implementation focus

### `/my/summary`
- make the summary basis easier to understand at a glance: which records count, what window is being shown, and why drafts are excluded
- strengthen continuity from summary back to recent submitted records without turning the screen into a recommendation dashboard
- improve reread value of the recent-record section so it feels like a continuity surface, not just a detached list

### `/my/records`
- make the distinction between `continue draft` and `reread submitted` feel more connected to the summary loop
- make it easier to understand which records are already reflected in summary and which are not
- keep list-level continuity cues modest and local to the current screen

### Deferred by default
- `/my/records/[id]` remains deferred unless implementation on the two locked surfaces reveals a concrete truth gap that cannot be solved honestly without a tiny editor-surface continuity cue
- `/templates`, `/templates/[slug]`, `/login`, `/reset-password`, and `/my/settings` are out of scope for 008 by default

## 7. Acceptance checklist

A touched 008 surface should not be considered done unless all are yes:
1. Is it easier to understand how recent records relate to the summary view?
2. Does the change help the parent orient without implying smart analysis?
3. Does the surface feel more worth revisiting over time?
4. Does the wording stay modest and parent-facing?
5. Was the touched surface count kept as small as possible?
6. If `/my/records/[id]` was touched, was that expansion justified by a concrete continuity gap rather than vague polish appetite?
