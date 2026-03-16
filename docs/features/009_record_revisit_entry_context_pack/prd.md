# IBNote 009 Record Revisit Entry Context Pack PRD

Version: 0.1
Date: 2026-03-16
Owner: unattended agent
Primary use: next-feature continuity package for documented implementation
Status: Hardened - ready for implementation

## 1. Document purpose

This PRD defines the next safe feature package after 008 closeout.

This package exists to make reopening an existing record feel more oriented and context-rich, so a parent can quickly remember what this note is, why it matters, and how it connects to the recent reflection loop without turning the editor into a dashboard or recommendation surface.

## 2. Package definition

### 2.1 One-line package definition
`009_record_revisit_entry_context_pack` improves the first moments of re-entering an existing record so parents can regain context faster and continue or reread more confidently.

### 2.2 Baseline truth inherited from earlier packages
- `000` through `008` remain inherited baseline truth.
- `006_record_revisit_convenience_pack` remains the list-level re-entry convenience baseline on `/my/records`.
- `008_parent_revisit_continuity_foundation` remains the summary/list continuity baseline on `/my/summary` + `/my/records`.
- `007_micro_usability_and_empty_state_polish` remains a frozen historical runtime-debug stop point and must not be silently reopened under 009.

### 2.3 Package thesis
After 006 improved how parents return to the records list and 008 improved how record lists relate to summary context, the next strongest small leverage step is the record entry point itself: when a parent opens a specific draft or submitted record, the screen should help them remember the moment and its current state more quickly and more calmly.

## 3. Why this package exists now

### 3.1 Sequencing reason
`AMBITION.md` says strong near-term work should increase revisit usefulness, continuity, and compounded understanding over time. 009 extends that loop one step deeper by improving the transition from list/summary context into a specific record.

### 3.2 Product risk being addressed
Without this package:
- reopening an existing record may still feel like dropping back into a form rather than resuming a reflection thread
- the parent may need to reconstruct context from raw fields instead of getting a calm re-entry frame
- the revisit loop may remain stronger at the list/summary level than at the actual record-entry level

### 3.3 Expected product impact
This package should improve:
- re-entry clarity when reopening a record
- understanding of draft vs submitted state and what can be done next
- continuity between record snapshot context and the broader revisit loop
- revisit usefulness without adding analytics, reminders, or institutional workflow

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Make reopening `/my/records/[id]` feel more context-rich and less like returning to a bare form.
2. Clarify the record's current state, basis, and safest next action in a calm parent-facing way.
3. Strengthen continuity between the specific record and the broader revisit flow already improved in 006/008.
4. Stay narrowly bounded to existing record-entry surfaces.

### 4.2 Non-goals
This package must not:
- add recommendation, reminder, resurfacing, or scheduling behavior
- redesign the record data model or submission rules
- add dashboard, archive, search, or tagging systems
- reopen auth, templates, settings, or broad summary architecture
- turn the record editor into a school-style progress or evaluation surface

## 5. Candidate package shortlist and recommendation

Required shortlist considered for 009:
1. **Record revisit entry context pack** (recommended)
2. Summary deepening / pattern-reading follow-up only
3. Template-to-record start-context refinement follow-up
4. Broader revisit archive/search system

Why #1 wins now:
- strengthens `AMBITION.md` pillars 5.3 and 5.5 directly
- continues the proven revisit chain from 006 -> 008 into the next natural continuity surface
- remains narrowly scoped and verifiable on one main route plus minimal supporting context
- has higher leverage than another summary-only copy pass while avoiding archive-system drift

Why others lose now:
- #2 risks another overly-local summary polish cycle after 008 already improved that area
- #3 is still useful, but current leverage is stronger on re-entry/revisit than on first-start flow
- #4 violates anti-goal and scope-safety rules by pushing toward archive-management behavior

## 6. In-scope and out-of-scope

### 6.1 In-scope
- existing record-entry revisit cues on `/my/records/[id]`
- modest orientation/context blocks that help a parent remember what this record is and what state it is in
- low-risk structure/copy/presentation improvements that make continue vs reread behavior easier to understand
- route-local before/after evidence showing stronger re-entry clarity and revisit value

### 6.2 Likely anchor surfaces
Locked implementation surfaces:
1. `/my/records/[id]`
2. `/my/records` only if a tiny handoff cue is later proven necessary to keep the re-entry path honest

Current hardening conclusion:
- implementation starts on `/my/records/[id]` only
- `src/components/records/record-editor.tsx` is the primary execution surface
- `/my/records` stays deferred at implementation start because 006/008 already provide sufficient list-level continuity

### 6.3 Out-of-scope
- summary algorithm/model changes
- new notifications or revisit resurfacing systems
- new filters, tags, folders, or archive-management behaviors
- template library/detail changes unless required for a tiny wording sync

## 7. User story focus

Primary user story:
- As a parent reopening one of my records, I want to regain context quickly and understand whether I am continuing a draft or rereading a submitted note, so the revisit feels calm and useful instead of disorienting.

Supporting user stories:
- As a parent reopening a draft, I want a quick reminder of what I was trying to capture before I continue.
- As a parent reopening a submitted record, I want to understand how it sits inside my ongoing reflection flow without feeling pushed toward evaluation.

## 8. Ambition alignment

This package is recommended because it most clearly strengthens:
- **5.3 Make revisit genuinely useful**
- **5.5 Compound understanding over time**
- secondarily **5.1 Lower the starting barrier** for re-entry into an already-started note

Anti-drift check:
- does not require institutional reporting
- does not require AI judgment
- does not require archive/file-management expansion
- should remain calm, parent-facing, and continuity-oriented

## 9. Definition of done

This package is done only when all are true:
1. reopening a record gives better orientation about the record's meaning and current state
2. before/after evidence exists for re-entry clarity and revisit-value gain
3. no recommendation, archive-management, or evaluative drift appears
4. runtime and repo-health checks remain green where applicable
5. the docpack is hardened enough that an unattended implementation worker can begin without guessing

## 10. Guardrails for implementation

1. Prefer re-entry clarity over new controls.
2. Tie each change to calmer parent understanding, not smarter-looking product behavior.
3. Keep wording humble and observational, not predictive or evaluative.
4. If a proposed change looks like a dashboard, timeline-analysis, or archive manager, reject it.
5. If the gain can be delivered on `/my/records/[id]` alone, prefer that smaller touched set.
