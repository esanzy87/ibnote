# Feature Advancement Protocol

> Purpose: define how IBNote moves from current-feature execution to next-feature preparation without losing context.
> Scope: this protocol governs unattended runs, periodic status checks, human intervention notes, and the creation of the next feature-doc package.
> Non-goal: this document does not replace per-feature `todo.md` trackers or `NIGHT_RUN_REPORT.md` run reports.

## 1. Core principle

IBNote should not stop at "the current run is done." 
When a feature is either completed or paused by a truthful blocker, the operating model should preserve momentum by:
1. reading the latest human intervention state,
2. checking whether more progress is possible on the current feature,
3. and, when appropriate, preparing the next feature package in a documented, reviewable way.

This protocol exists to make that transition explicit and repeatable.

---

## 2. Source-of-truth split

Use the following document roles strictly:

- `docs/features/{seq_no}_{feature_name}/todo.md`
  - official execution tracker for a feature
  - source of truth for task status, priority, dependency, blockers, and phase completion

- `NIGHT_RUN_REPORT.md`
  - truthful record of what a specific unattended run completed, verified, assumed, or could not complete

- `docs/BLACKBOARD.md`
  - human-agent control plane
  - used for human intervention notes, external blocker updates, restart control, and next-feature ideas
  - must be read before any unattended start or unattended resume

This separation must be preserved.
Do not turn `BLACKBOARD.md` into a second `todo.md`.
Do not use `NIGHT_RUN_REPORT.md` as the main task tracker.

---

## 3. Required read order for unattended work

### 3.1 Current-feature execution loop
Before any unattended run or periodic status-check relaunch, read in this order:
1. `docs/BLACKBOARD.md`
2. current feature `todo.md`
3. current feature `spec.md`
4. `NIGHT_RUN_REPORT.md`

### 3.2 Next-feature preparation loop
When the current feature is considered complete enough to prepare the next one, read in this order:
1. `docs/BLACKBOARD.md`
2. `NIGHT_RUN_REPORT.md`
3. current feature `todo.md`
4. current feature `prd.md`
5. current feature `spec.md`
6. `docs/features/` directory listing

---

## 4. Current-feature execution loop

The current-feature loop exists to finish the active feature as far as truthfully possible.

### 4.1 Default loop behavior
For unattended work:
1. read `BLACKBOARD.md`
2. read the current feature tracker and report
3. continue the highest-priority unblocked task
4. keep the tracker truthful
5. keep the run report truthful
6. do not claim blocked runtime-dependent work as complete

### 4.2 Status classification for periodic checks
A periodic check should classify the current state into one of four modes:

- `active`
  - unattended work is still progressing
  - report only brief progress

- `resumable`
  - the run stopped, but another truthful step can be taken without human input
  - relaunch automatically if safe

- `blocked-human`
  - progress now depends on human/external action
  - do not relaunch blindly; report blocker only

- `feature-complete-candidate`
  - the current feature appears complete enough for next-feature preparation
  - run the completion check before moving on

### 4.3 Human-blocker rule
If the blocker requires real external action (for example, Firebase rules deployment, account permission changes, billing, provider setup, or admin console action), do not pretend the blocker is solved.
If `BLACKBOARD.md` does not contain a newer resolving note, remain blocked and report the blocker clearly.

---

## 5. Completion check for a feature

A feature is not treated as complete just because the run stopped.
A feature becomes a `feature-complete-candidate` only when all of the following are true:

1. the current feature `todo.md` is fully `done` or explicitly `cancelled`
2. phase gates are truthfully closed
3. `NIGHT_RUN_REPORT.md` is up to date and does not hide unresolved execution truth
4. any remaining blocker that affects future planning is written into `docs/BLACKBOARD.md`

If these are not true, remain in the current-feature execution loop.

---

## 6. Next-feature preparation loop

When a feature passes the completion check, the system may prepare the next feature package.
This is a documentation-and-decision workflow, not immediate implementation.

### 6.1 Feature folder naming rule
The next feature folder must use this naming convention:

`docs/features/{seq_no}_{feature_name}/`

Rules:
- `seq_no` must be zero-padded
- `seq_no` is the next integer after the highest existing feature folder number
- `feature_name` must be short, lowercase, and underscore-separated

Example:
- `000_bootstrap`
- `001_records_summary_polish`
- `002_parent_revisit_loop`

### 6.2 Inputs for next-feature selection
The selection process should consider:
- the current feature outcome
- unresolved blockers from the current feature
- human notes from `docs/BLACKBOARD.md`
- operational friction observed during the run
- customer-facing value opportunities
- business urgency

### 6.3 Required candidate shortlisting
Before selecting the next feature, shortlist 2-4 plausible candidates.
Do not jump directly from feature completion to PRD writing without comparing candidates.

---

## 7. Multi-perspective debate requirement

The next feature should be selected only after a structured debate.

### 7.1 Required perspectives
Use these perspectives:
- planning/product perspective
- development/implementation perspective
- operations/maintenance perspective
- marketing/growth perspective
- CEO/revenue-pressure perspective
- parent/customer perspective

### 7.2 Debate depth
Run a 5-round debate before locking the next feature.
The debate must produce:
1. the recommended next feature
2. the strongest alternative candidates
3. why the rejected candidates lost for now

### 7.3 Blackboard input rule
If `docs/BLACKBOARD.md` contains human ideas, blockers, or priority notes relevant to next-feature selection, they must be included as inputs to the debate.

---

## 8. Required next-feature document package

Once the next feature is selected, create:

- `docs/features/{seq_no}_{feature_name}/prd.md`
- `docs/features/{seq_no}_{feature_name}/spec.md`
- `docs/features/{seq_no}_{feature_name}/todo.md`
- if needed for clarity, decision durability, or unresolved-risk visibility, supporting artifacts such as `docs/features/{seq_no}_{feature_name}/adr.md` and `docs/features/{seq_no}_{feature_name}/risk_analysis.md`
- enough validation passes, in 3-round red-team increments, to make the package safe for unattended execution or to clearly prove that human input is still required

### 8.1 PRD requirements
The PRD must explain:
- why this feature is next
- what user or business problem it solves
- why alternative candidates were not selected now
- what is in scope and out of scope
- what success means

### 8.2 Spec requirements
The spec must reduce ambiguity enough for an unattended coding run to begin without guessing.
It should include:
- route/module scope where relevant
- data contracts where relevant
- operational constraints
- verification expectations
- explicit exclusions

### 8.3 TODO requirements
The TODO must be execution-ready.
It must explicitly include:
- priority
- dependencies
- blocked-by relationships
- phase or slice grouping where useful
- done conditions
- verification method

The TODO is not a vague idea list.
It must be usable as the next unattended implementation tracker.

---

## 9. Red-team validation loop requirement

Before calling the next feature package ready, run a 3-round red-team validation/improvement loop against the newly created PRD, spec, and TODO.
If the red-team loop reveals unresolved decisions, major tradeoffs, or risks that cannot be cleanly absorbed into those three docs, it may also create supporting artifacts such as `adr.md`, `risk_analysis.md`, or similarly scoped companion docs inside the same feature folder.
If the result after 3 rounds is still not clear enough for confident unattended execution, run additional red-team loops in increments of 3 rounds until the package is strong enough or until the remaining uncertainty clearly requires human input.

### 9.1 Red-team goals
The loop must focus on:
- resolving ambiguity
- improving document-to-document consistency
- surfacing missing dependencies or blockers
- detecting scope creep
- preventing implementation drift
- deciding whether additional artifacts are needed for durable clarity
- making the package safe for an unattended overnight run

### 9.2 Expected outcome
After each 3-round red-team loop, reassess whether the package is ready enough that an unattended coding agent can start from the docs with minimal guessing.
If not, continue with another 3-round loop rather than stopping at an arbitrary pass count.
If the loop produced additional artifacts like `adr.md` or `risk_analysis.md`, those artifacts become part of the feature package and should be included in future unattended read order when relevant.

---

## 10. Recommended automation behavior

### 10.1 Periodic check behavior
A periodic check may do one of the following:
- report that current work is still active
- relaunch the current-feature run if progress is still possible without human input
- report a human blocker and pause
- if the feature is complete, trigger next-feature preparation

### 10.2 Automatic relaunch rule
Automatic relaunch is allowed only when:
- more truthful work exists without human intervention
- or `BLACKBOARD.md` contains new information that resolves the blocker

Do not relaunch in a loop when:
- the blocker still requires external action
- the same blocker remains unresolved
- the docs are inconsistent enough that execution truth would degrade

---

## 11. Blackboard operating rule

`docs/BLACKBOARD.md` is the required human-agent control plane.

Rules:
- newest entries belong at the top of each section
- entries must be short and action-oriented
- agents should prefer changing status over silently deleting history
- agents must read it before unattended work starts or resumes

Recommended use cases:
- human notes that change priority
- blocker resolution updates
- external actions performed outside the repo
- next-feature ideas
- temporary "do this before that" operating decisions

---

## 12. Practical default flow

### 12.1 While a feature is still active
- keep working the current feature
- keep periodic checks brief
- use `BLACKBOARD.md` for human intervention

### 12.2 When blocked by human/external action
- report the blocker briefly
- wait for `BLACKBOARD.md` updates or actual external resolution
- do not fake closure

### 12.3 When the feature is complete
- shortlist next-feature candidates
- run the required 5-round debate
- create the next feature-doc package
- run the 3-round red-team loop
- report that the next feature package is ready for an overnight run

---

## 13. Why this protocol exists

This protocol exists to prevent three common failures:
1. losing momentum after a feature finishes
2. confusing human intervention notes with the formal task tracker
3. starting the next overnight run from vague or inconsistent docs

The intended result is a smooth chain:

`current feature execution -> truthful completion/blocker state -> next feature selection -> next feature package -> next unattended run`
