# IBNote 003 Learning Experience Foundation Todo

Status: Implementation-ready tracker - sign-off recorded on 2026-03-14
Source of truth: `docs/epics/003_learning_experience_foundation/spec.md`
Companion docs:
- `docs/epics/003_learning_experience_foundation/prd.md`
- `docs/epics/003_learning_experience_foundation/adr.md`
- `docs/epics/003_learning_experience_foundation/risk_analysis.md`

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
| A-01 | A | Freeze 003 scope and anchor flows | P0 | done | - |
| A-02 | A | Identify highest-leverage gaps in Flow A/B/C | P0 | done | A-01 |
| A-03 | A | Define before/after evidence shape and closeout criteria | P0 | done | A-02 |
| B-01 | B | Improve Flow A: template discovery -> selection | P1 | done | A-03 |
| B-02 | B | Improve Flow B: record start -> writing | P1 | in_progress | B-01 |
| B-03 | B | Improve Flow C: record revisit -> summary reading | P1 | todo | B-02 |
| B-04 | B | Run cross-flow continuity pass across touched surfaces | P1 | todo | B-03 |
| C-01 | C | Capture before/after evidence and main-path runtime smoke | P1 | todo | B-04 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | todo | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | todo | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and experience diagnosis

#### A-01 Freeze 003 scope and anchor flows
- Priority: `P0`
- Status: `done`
- Scope:
  - confirm Flow A/B/C as the required anchor flows
  - explicitly exclude account lifecycle, AI, admin, and backend-platform expansion
- Implementation truth locked on 2026-03-14:
  - Flow A stays anchored to `/templates` and `/templates/[slug]`
  - Flow B stays anchored to `/my/records/new` and `/my/records/[id]`
  - Flow C stays anchored to `/my/records` and `/my/summary`
  - 003 remains limited to experience continuity, guidance, and revisit-value improvements on these surfaces
  - out of scope remains locked: account lifecycle, new auth providers, AI/recommendation, admin/payment, and backend/platform expansion
- QA:
  - no doc ambiguity remains about what 003 is really trying to improve

#### A-02 Identify highest-leverage gaps in Flow A/B/C
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - identify the most important understanding/friction/continuity gaps in each anchor flow
  - choose only the top 1-2 leverage points per flow for implementation focus
- Highest-leverage gaps locked on 2026-03-14:
  - Flow A:
    - `/templates` cards/listing tell what exists, but do not yet help a parent quickly choose based on today's need or uncertainty level
    - `/templates/[slug]` explains content, but the step from "interesting activity" to "I can start this now and know what kind of note I will leave" is still thinner than desired
  - Flow B:
    - `/my/records/new` currently jumps straight into draft creation; the transition is operational but under-guided, so starting a record can still feel abrupt
    - `/my/records/[id]` is functional, but the writing surface still reads more like a form than a calm, guided reflection flow
  - Flow C:
    - `/my/records` shows records clearly enough, but revisit value and "what should I reopen first" are not yet well framed
    - `/my/summary` presents counts/grades, but its relationship to concrete recent records and humble next-use value can feel more analytical than connected
- Chosen implementation focus:
  - Flow A: strengthen choice guidance on library/detail surfaces and make the handoff into record start feel more earned
  - Flow B: add calmer start-context and lighter writing guidance before/inside the editor
  - Flow C: connect list + summary more explicitly to recent activity meaning without adding intelligence/recommendation behavior
- QA:
  - the package is framed around the biggest experience wins, not random polish
  - the package does not turn into a broad all-surface cleanup effort

#### A-03 Define before/after evidence shape and closeout criteria
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Scope:
  - define how quality improvements will be evidenced without relying on taste-only claims
- Evidence shape locked on 2026-03-14:
  - Flow A evidence must show clearer chooseability on `/templates` plus clearer start-context/handoff on `/templates/[slug]`
  - Flow B evidence must show clearer pre-write context on `/my/records/new` and less intimidating guidance/section framing on `/my/records/[id]`
  - Flow C evidence must show stronger continuity between `/my/records` and `/my/summary`, with summary language staying modest and non-intelligent
  - closeout evidence should combine route before/after review notes, runtime smoke of the main affected path, scope audit, and lint/typecheck/build outputs
- Closeout criteria:
  - do not claim completion from visual preference alone
  - explain each major change as understanding improvement, friction reduction, continuity gain, or revisit-value gain
  - keep Flow C language humble and avoid recommendation/pseudo-evaluation wording
- QA:
  - completion evidence is explicit, not subjective hand-waving

### Phase B - Flow A/B/C implementation

#### B-01 Improve Flow A: template discovery -> selection
- Priority: `P1`
- Status: `done`
- Blocked by: `A-03`
- Scope:
  - improve template discovery and selection understanding
  - address only the highest-leverage Flow A issues identified in Phase A
- Implementation completed on 2026-03-14:
  - strengthened `/templates` choice guidance so the library better frames how to choose based on today's need, time, and certainty level
  - strengthened template cards with a clearer "이런 때 잘 맞아요" cue derived from the existing big question so the list feels less abstract during comparison
  - strengthened `/templates/[slug]` handoff copy so a parent can better anticipate what kind of activity and what kind of record will follow before pressing `기록 시작`
  - added a dedicated pre-start guidance block on the detail surface to make the step into record creation feel more earned and less abrupt
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

- Current phase: `Phase B - Flow A/B/C implementation`
- Current task: `B-02`
- Last completed task: `B-01`
- Active blocker: `none confirmed`
- Notes: Phase A doc sync is now complete with explicit implementation truth for the chosen leverage points and evidence shape. The older worker-launch wording should be treated as historical context only; current truthful next action is `B-01` and autonomous work should continue rather than waiting on worker-liveness assumptions.

## 7. Completion rule

003 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- anchor-flow evidence exists for Flow A, Flow B, and Flow C
- no scope drift into account lifecycle, AI, admin, payment, or backend-platform expansion is found
- human sign-off is recorded before package closeout
