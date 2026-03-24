# IBNote 008 Parent Revisit Continuity Foundation PRD

Version: 0.1
Date: 2026-03-15
Owner: agent-authored docpack
Primary use: next-feature continuity package for documented implementation
Status: Hardened - ready for implementation

## 1. Document purpose

This PRD defines the next safe feature package that can be prepared while 007 remains frozen at an auth/protected-route closeout stop point.

This package exists to deepen the value of revisiting existing records over time without turning IBNote into a recommendation engine, analytics product, or school-style evaluation workflow.

It should strengthen the parent loop after a note already exists: re-entry, connection, orientation, and modest understanding.

## 2. Package definition

### 2.1 One-line package definition
`008_parent_revisit_continuity_foundation` improves how parents understand and navigate the relationship between recent records and summary context so revisit feels more connected, more reusable, and more worth returning to.

### 2.2 Baseline truth inherited from earlier packages
- `000` through `007` remain inherited baseline truth.
- `003_learning_experience_foundation` remains the core templates -> records -> summary continuity baseline.
- `005_print_and_export_polish` remains the preservation baseline.
- `006_record_revisit_convenience_pack` remains the record-list re-entry convenience baseline.
- `007_micro_usability_and_empty_state_polish` remains the current frozen execution package and should not be silently reopened under 008.

### 2.3 Package thesis
After several bounded low-risk polish passes, the next higher-leverage safe step is not more generic micro-polish. It is making already-captured moments feel more connected across revisit surfaces, so parents can better understand what they are looking at and why it matters to return.

## 3. Why this package exists now

### 3.1 Sequencing reason
`AMBITION.md` says the strongest near-term leverage now lives in summary and revisit usefulness, continuity across moments, and preserving a calm parent-facing loop. 008 should therefore strengthen revisit value more materially than another isolated polish pass.

### 3.2 Product risk being addressed
Without this package:
- parents may revisit records one by one without a strong sense of continuity across moments
- summary may remain modest but still feel somewhat separate from concrete recent records
- IBNote may become smoother without becoming meaningfully more reusable over time
- iterative progress may over-select safe polish while under-investing in leverage across the core parent loop

### 3.3 Expected product impact
This package should improve:
- continuity between record list/detail context and summary context
- parent understanding of what recent records are collectively showing
- re-entry confidence when deciding what to reopen, reread, or reflect on next
- revisit usefulness without increasing institutional or analytical tone

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Make revisit across recent records and summary feel more connected.
2. Improve parent orientation on existing revisit surfaces without adding intelligence claims.
3. Clarify what a summary is showing and how it relates to concrete recent records.
4. Increase re-read value through calmer continuity cues and modest pattern-reading support.
5. Stay implementable on a small set of existing surfaces.

### 4.2 Non-goals
This package must not:
- add AI interpretation, recommendation, ranking, or diagnosis
- add reminders, notifications, or resurfacing systems
- add broad dashboard, archive, tagging, or search capability
- redesign the entire summary model or records architecture
- introduce school/report-card language, scoring expansion, or institutional framing
- silently absorb 007 auth/debug work under this package label

## 5. Candidate package shortlist and recommendation

Required shortlist considered for 008:
1. **Parent revisit continuity foundation** (recommended)
2. Summary explanation / calmer pattern-reading polish only
3. Template-to-record handoff refinement follow-up
4. Broader archive/search/recommendation-style revisit system

Why #1 wins now:
- strengthens `AMBITION.md` pillars 5.3 and 5.5 most directly
- improves the core parent loop rather than adding isolated surface polish
- can stay on existing surfaces with low capability risk
- has more leverage than another wording-only package, while avoiding the product drift of archive/recommendation systems

Why others lose now:
- #2 is safer but too narrow and risks becoming another low-leverage polish pass
- #3 is useful, but revisit/summary continuity now offers stronger compounding value after 003/006/007 sequencing
- #4 violates anti-drift guardrails and is too broad for a safe follow-on package

## 6. In-scope and out-of-scope

### 6.1 In-scope
- existing revisit surfaces that connect recent records with summary understanding
- modest continuity cues that help a parent move between record-level and summary-level understanding
- low-risk structure/copy/presentation improvements that make revisit more understandable
- route-local before/after evidence showing stronger continuity and reread value

### 6.2 Likely anchor surfaces
Default candidate surfaces, in likely priority order:
1. `/my/summary`
2. `/my/records`
3. `/my/records/[id]` only if a small continuity cue is needed to keep the chosen set truthful

### 6.3 Out-of-scope
- new record schema or summary algorithm changes unless tiny presentation-support adjustments are required
- recommendation or "what you should do next" systems
- reminders or scheduled revisit nudges
- broad information architecture or navigation redesign
- template system expansion unrelated to revisit continuity

## 7. User story focus

Primary user story:
- As a parent revisiting IBNote, I want recent records and summary context to feel meaningfully connected, so I can understand my child a little better over time without feeling judged or overwhelmed.

Supporting user stories:
- As a parent viewing summary, I want to understand what recent records are contributing to it.
- As a parent looking at my records, I want clearer orientation about what is worth reopening or rereading now.
- As a parent reopening a note, I want it to feel like part of an ongoing reflection loop rather than an isolated entry.

## 8. Ambition alignment

This package is recommended because it most clearly strengthens:
- **5.3 Make revisit genuinely useful**
- **5.5 Compound understanding over time**
- secondarily **5.1 Lower the starting barrier** for re-entry into an existing record set

Anti-drift check:
- does not require institutional reporting
- does not require AI judgment
- does not require admin/dashboard/platform expansion
- should remain calm, parent-facing, and continuity-oriented

## 9. Definition of done

This package is done only when all are true:
1. the chosen revisit surfaces show materially stronger connection between concrete records and summary context
2. before/after evidence exists for continuity and reread-value gains
3. no recommendation, reminder, archive-management, or evaluative drift appears
4. runtime and repo-health checks remain green where applicable
5. the docpack is hardened enough that implementation can begin without guessing

## 10. Guardrails for implementation

1. Prefer continuity leverage over surface breadth.
2. Tie each change to clearer parent understanding, not smarter-looking product behavior.
3. Keep wording humble and observational, not predictive or evaluative.
4. If a proposed change looks like a dashboard, recommendation engine, or archive manager, reject it.
5. If a continuity gain can be delivered on fewer surfaces, prefer the smaller touched set.
