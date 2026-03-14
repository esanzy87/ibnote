# IBNote 003 Learning Experience Foundation Todo

Status: Implementation-ready tracker - sign-off recorded on 2026-03-14
Source of truth: `docs/features/003_learning_experience_foundation/spec.md`
Companion docs:
- `docs/features/003_learning_experience_foundation/prd.md`
- `docs/features/003_learning_experience_foundation/adr.md`
- `docs/features/003_learning_experience_foundation/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 003 implementation.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 003 into a generic polish bucket
- implementation may start from Phase A because sign-off truth is now recorded; keep 003 locked to anchor-flow learning-experience improvements only

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and experience diagnosis
2. Phase B - Flow A/B/C implementation
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Scope drift risk | Phases B-C | non-experience expansion boundaries are explicit |
| GB-02 | Experience proof too subjective | Phases B-C | before/after anchor-flow evidence is explicit |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 003 scope and anchor flows | P0 | todo | - |
| A-02 | A | Identify highest-leverage gaps in Flow A/B/C | P0 | todo | A-01 |
| A-03 | A | Define before/after evidence shape and closeout criteria | P0 | todo | A-02 |
| B-01 | B | Improve Flow A: template discovery -> selection | P1 | todo | A-03 |
| B-02 | B | Improve Flow B: record start -> writing | P1 | todo | B-01 |
| B-03 | B | Improve Flow C: record revisit -> summary reading | P1 | todo | B-02 |
| B-04 | B | Run cross-flow continuity pass across touched surfaces | P1 | todo | B-03 |
| C-01 | C | Capture before/after evidence and main-path runtime smoke | P1 | todo | B-04 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | todo | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | todo | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and experience diagnosis

#### A-01 Freeze 003 scope and anchor flows
- Priority: `P0`
- Status: `todo`
- Scope:
  - confirm Flow A/B/C as the required anchor flows
  - explicitly exclude account lifecycle, AI, admin, and backend-platform expansion
- QA:
  - no doc ambiguity remains about what 003 is really trying to improve

#### A-02 Identify highest-leverage gaps in Flow A/B/C
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-01`
- Scope:
  - identify the most important understanding/friction/continuity gaps in each anchor flow
  - choose only the top 1-2 leverage points per flow for implementation focus
- QA:
  - the package is framed around the biggest experience wins, not random polish
  - the package does not turn into a broad all-surface cleanup effort

#### A-03 Define before/after evidence shape and closeout criteria
- Priority: `P0`
- Status: `todo`
- Blocked by: `A-02`
- Scope:
  - define how quality improvements will be evidenced without relying on taste-only claims
- QA:
  - completion evidence is explicit, not subjective hand-waving

### Phase B - Flow A/B/C implementation

#### B-01 Improve Flow A: template discovery -> selection
- Priority: `P1`
- Status: `todo`
- Blocked by: `A-03`
- Scope:
  - improve template discovery and selection understanding
  - address only the highest-leverage Flow A issues identified in Phase A
- QA:
  - choosing the right activity feels easier and less abstract
  - a parent can understand more quickly when and why a template fits the current need

#### B-02 Improve Flow B: record start -> writing
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-01`
- Scope:
  - improve guidance and reduce hesitation in record start/writing flow
  - address only the highest-leverage Flow B issues identified in Phase A
- QA:
  - writing feels more guided and less burdensome
  - before writing starts, it is clearer what kind of note will be written

#### B-03 Improve Flow C: record revisit -> summary reading
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-02`
- Scope:
  - improve revisit/summary continuity and usefulness
  - address only the highest-leverage Flow C issues identified in Phase A
  - keep Flow C strictly free of summary-intelligence, recommendation, or pseudo-evaluative expansion
- QA:
  - revisit value feels stronger and easier to understand
  - records and summary feel more like one connected revisit experience

#### B-04 Run cross-flow continuity pass across touched surfaces
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-03`
- Scope:
  - align tone, continuity, and structural handoff across the three anchor flows
  - limit this pass to final continuity cleanup after the highest-leverage fixes are already implemented
- QA:
  - screens feel like one connected product experience
  - this pass does not become a broad all-surface redesign effort

### Phase C - QA and closeout

#### C-01 Capture before/after evidence and main-path runtime smoke
- Priority: `P1`
- Status: `todo`
- Blocked by: `B-04`
- QA method:
  - capture before/after evidence for each anchor flow
  - rerun the affected main user path to ensure continuity still works

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-01`
- QA method:
  - confirm no scope drift and repo health remains green

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded

## 6. Current progress snapshot

- Current phase: `Phase A - Scope lock and experience diagnosis`
- Current task: `A-01`
- Last completed task: `-`
- Active blocker: `none confirmed`
- Notes: 003 sign-off is now recorded. 003 is intentionally framed as a substantial learning-experience package rather than a small polish pass. It should produce stronger felt usefulness across templates, writing, revisit, and summary without adding new core capabilities.

## 7. Completion rule

003 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- anchor-flow evidence exists for Flow A, Flow B, and Flow C
- no scope drift into account lifecycle, AI, admin, payment, or backend-platform expansion is found
- human sign-off is recorded before package closeout
