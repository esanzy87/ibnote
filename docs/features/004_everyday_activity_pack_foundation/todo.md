# IBNote 004 Everyday Activity Pack Foundation Todo

Status: Implementation-ready tracker - sign-off recorded on 2026-03-14
Source of truth: `docs/features/004_everyday_activity_pack_foundation/spec.md`
Companion docs:
- `docs/features/004_everyday_activity_pack_foundation/prd.md`
- `docs/features/004_everyday_activity_pack_foundation/adr.md`
- `docs/features/004_everyday_activity_pack_foundation/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 004 implementation.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 004 into a template-count project
- implementation may start from Phase A because sign-off truth is now recorded; keep 004 locked to home-natural pack expansion and cluster-quality rules

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and cluster selection
2. Phase B - Pack expansion and discovery refinement
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Scope drift risk | Phases B-C | schoolization/AI/admin/lifecycle boundaries are explicit |
| GB-02 | Quantity-over-quality risk | Phases B-C | cluster rationale and quality bar are explicit |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 004 scope, quality bar, and research-backed principles | P0 | todo | - |
| A-02 | A | Select highest-leverage cluster additions for foundation scope | P0 | todo | A-01 |
| A-03 | A | Define discovery and record-worthiness evidence shape | P0 | todo | A-02 |
| B-01 | B | Add or revise pack items for chosen clusters | P1 | todo | A-03 |
| B-02 | B | Improve discovery/grouping/descriptions for expanded pack | P1 | todo | B-01 |
| B-03 | B | Verify record-worthiness and revisit fit of added packs | P1 | todo | B-02 |
| C-01 | C | Run route/content review and affected runtime smoke | P1 | todo | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | todo | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | todo | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and cluster selection

#### A-01 Freeze 004 scope, quality bar, and research-backed principles
- Priority: `P0`
- Status: `todo`
- Scope:
  - confirm home-natural inquiry/activity routine expansion as the real package thesis
  - explicitly exclude school-like Unit of Inquiry carryover, evaluation framing, AI/admin/lifecycle expansion
- QA:
  - no doc ambiguity remains about what 004 is and is not

#### A-02 Select highest-leverage cluster additions for foundation scope
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-01`
- Scope:
  - choose the best cluster additions from the research-backed candidate set
  - keep foundation scope focused instead of attempting every plausible cluster at once
  - default mandatory set: conversational check-ins + notice/pattern/sort
  - treat choice/reason/responsibility and play-based inquiry loops as secondary/stretch unless a stronger rationale is documented
- QA:
  - chosen clusters increase useful home coverage without making the pack random or heavy

#### A-03 Define discovery and record-worthiness evidence shape
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-02`
- Scope:
  - define how expanded-pack quality will be evidenced beyond “there are more templates now”
  - define the practical review questions for low-burden fit and record-worthiness
- QA:
  - evidence is explicit for coverage, clarity, and record-worthiness

### Phase B - Pack expansion and discovery refinement

#### B-01 Add or revise pack items for chosen clusters
- Priority: `P1`
- Status: `todo`
- Blocked by: `A-03`
- Scope:
  - add or update activity pack items for the selected clusters
- QA:
  - new items satisfy the quality bar and do not feel school-like

#### B-02 Improve discovery/grouping/descriptions for expanded pack
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-01`
- Scope:
  - make the larger pack understandable and navigable
- QA:
  - expansion improves useful breadth without increasing confusion too much

#### B-03 Verify record-worthiness and revisit fit of added packs
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-02`
- Scope:
  - ensure the new pack items naturally lead into good records and later revisit value
  - verify that each chosen activity type yields at least one meaningful capture target such as child words, choice, observation, or change over time
- QA:
  - added packs are worth recording and make sense inside IBNote's loop
  - there is a credible reason to revisit the note later rather than only proving the activity happened once

### Phase C - QA and closeout

#### C-01 Run route/content review and affected runtime smoke
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-03`
- QA method:
  - review template-library and template-detail changes
  - recheck affected main-path flow(s) to ensure the expanded pack still works cleanly

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-01`
- QA method:
  - confirm no schoolization/admin/AI/lifecycle drift and repo health remains green

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded

## 6. Current progress snapshot

- Current phase: `Phase A - Scope lock and cluster selection`
- Current task: `A-01`
- Last completed task: `-`
- Active blocker: `none confirmed`
- Notes: 004 sign-off is now recorded. 004 is intentionally framed as a meaningful everyday activity/routine coverage package rather than a template-count expansion. Research says the winning direction is low-burden, repeatable, home-natural inquiry/activity routines, not school-like curriculum packaging.

## 7. Completion rule

004 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- new clusters satisfy the quality bar and useful coverage rationale
- no drift into school structure, evaluation framing, AI/admin/lifecycle expansion is found
- human sign-off is recorded before package closeout
