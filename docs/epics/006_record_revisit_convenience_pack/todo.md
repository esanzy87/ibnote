# IBNote 006 Record Revisit Convenience Pack Todo

Status: Complete through `C-03` - ready handoff / next-package prep
Source of truth: `docs/epics/006_record_revisit_convenience_pack/spec.md`
Companion docs:
- `docs/epics/006_record_revisit_convenience_pack/prd.md`
- `docs/epics/006_record_revisit_convenience_pack/adr.md`
- `docs/epics/006_record_revisit_convenience_pack/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 006.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 006 into a recommendation/reminder/archive-management package
- implementation must not start until doc hardening and sign-off truth are recorded

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and revisit target selection
2. Phase B - Revisit convenience and continuity polish
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Scope drift into recommendation/reminder/archive capability | Phases A-C | capability boundaries remain explicit |
| GB-02 | False-convenience risk | Phases B-C | touched changes produce real revisit-value gain, not cosmetic churn |
| GB-03 | Surface sprawl risk | Phases A-C | chosen surfaces stay tightly bounded and justified |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 006 scope, revisit thesis, and capability boundaries | P0 | done | - |
| A-02 | A | Choose the smallest high-leverage revisit surfaces and evidence shape | P0 | done | A-01 |
| A-03 | A | Define revisit-convenience acceptance criteria and closeout evidence | P0 | done | A-02 |
| B-01 | B | Improve revisit convenience on the chosen record surfaces | P1 | done | A-03 |
| B-02 | B | Refine continue/revisit action wording and continuity | P1 | done | B-01 |
| B-03 | B | Verify the touched revisit surfaces remain modest, clear, and worth reopening | P1 | done | B-02 |
| C-01 | C | Run route/content review and affected runtime smoke | P1 | done | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | done | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | done | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and revisit target selection

#### A-01 Freeze 006 scope, revisit thesis, and capability boundaries
- Priority: `P0`
- Status: `done`
- Evidence:
  - hardened PRD/spec/ADR/risk docs now explicitly lock 006 as revisit convenience only and restate recommendation/reminder/archive-management exclusions
  - debate/red-team pass accepted the narrower interpretation: start from existing record surfaces only and reject dashboard-like broadening
- Scope:
  - lock 006 as a low-risk revisit-convenience package
  - explicitly exclude recommendation, reminder, archive-management, and broad dashboard semantics
  - preserve inherited route/data/product truth unless a minimal revisit-convenience improvement requires continuity changes
- QA:
  - no doc ambiguity remains about what 006 is and is not
- Evidence target:
  - `spec.md`, `adr.md`, and `risk_analysis.md` make recommendation/archive/reminder drift explicitly out of scope

#### A-02 Choose the smallest high-leverage revisit surfaces and evidence shape
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Evidence:
  - current source review confirmed `/my/records` already contains the strongest 006 leverage points (status labels, reopen/continue CTA wording, summary handoff, and revisit framing)
  - locked the implementation default to `/my/records` first, `/my/records/[id]` conditional only if a concrete continuity gap appears, `/my/summary` excluded by default
- Scope:
  - inspect existing record revisit behavior and choose the smallest surface set with the clearest payoff
  - current draft hypothesis: default focus is `/my/records`, with `/my/records/[id]` kept conditional and `/my/summary` kept out of the default touched set
  - define the before/after evidence shape for revisit clarity, continuity, and friction reduction
- QA:
  - chosen surfaces are tightly bounded, easy to verify, and worth the package cost
- Evidence target:
  - `todo.md` and `spec.md` explicitly record the chosen surface set and evidence expectations

#### A-03 Define revisit-convenience acceptance criteria and closeout evidence
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Evidence:
  - verification matrix and acceptance checklist were tightened so dashboard/search/filter expansion fails by default unless it clearly lowers revisit friction
  - sign-off/debate conclusion is now recorded as required governance evidence before implementation start
- Scope:
  - define what counts as lower revisit friction versus cosmetic movement
  - define action-wording honesty rules so the product does not overpromise recommendation or management capability
  - define closeout evidence for runtime smoke/repo-health checks
- QA:
  - closeout truth can distinguish real revisit gains from superficial polish
- Evidence target:
  - explicit verification matrix and closeout defaults exist in `spec.md` and are reflected here

### Phase B - Revisit convenience and continuity polish

#### B-01 Improve revisit convenience on the chosen record surfaces
- Priority: `P1`
- Status: `done`
- Blocked by: `A-03`
- Evidence:
  - `/my/records` now replaces the older technical quick-check panel with a calmer re-entry overview that explains how drafts and submitted records can be reopened using only existing record-list data
  - added status-aware quick-filter shortcuts and a no-match filter reset path so parents can get back to the right revisit slice faster without leaving the records list
  - implementation stayed inside `src/components/records/records-list-client.tsx`; `/my/records/[id]` and `/my/summary` were not reopened because no concrete continuity gap required expansion
- Scope:
  - improve revisit hierarchy, reduce ambiguity, and strengthen re-entry clarity on the chosen surfaces
- QA:
  - reopening existing records feels calmer, clearer, and more worthwhile

#### B-02 Refine continue/revisit action wording and continuity
- Priority: `P1`
- Status: `done`
- Blocked by: `B-01`
- Evidence:
  - records-list header copy, re-entry overview copy, and per-card guidance now distinguish truthful draft continuation from submitted-record rereading without implying reminders, recommendations, or archive management
  - kept action honesty aligned with current runtime semantics: drafts are framed as continue-able, and submitted records are framed as readable plus saveable in submitted state if the parent makes changes later
  - existing action labels remain continuity-oriented (`기록 이어서 입력`, `기록 다시 보기`) instead of introducing new workflow or management language
- Scope:
  - align action labels and supporting copy so revisit/continue behavior is understandable and truthful
- QA:
  - actions feel intentional but do not imply reminders, recommendations, or archive systems

#### B-03 Verify the touched revisit surfaces remain modest, clear, and worth reopening
- Priority: `P1`
- Status: `done`
- Blocked by: `B-02`
- Evidence:
  - final source review confirmed the 006 touched surface set remains `/my/records` only, with no recommendation/reminder/archive-management additions and no unjustified expansion into `/my/records/[id]` or `/my/summary`
  - repo-health verification passed on the Phase B snapshot via `npm run lint`, `npm run typecheck`, and `npx next build --webpack`
  - default `npm run build` hit a Turbopack sandbox port-bind panic while processing `src/styles/print.css`; treated as environment noise because the same snapshot compiled successfully under webpack, so live route/runtime verification remains correctly open in `C-01`
- Scope:
  - confirm the improved revisit surfaces remain modest, continuity-oriented, and non-systemic
  - verify that reopened records still fit IBNote's reflection/revisit loop
- QA:
  - revisit output feels useful without turning into recommendation or management framing

### Phase C - QA and closeout

#### C-01 Run route/content review and affected runtime smoke
- Priority: `P1`
- Status: `done`
- Blocked by: `B-03`
- QA method:
  - review touched record surfaces
  - run minimal runtime smoke needed for the affected main path(s)
- Evidence:
  - revalidated the old listener blocker first: a raw Python socket bind on `127.0.0.1:3301` succeeded, so the earlier `listen EPERM` result is now stale in this runner
  - `npm run start -- --hostname 127.0.0.1 --port 3301` booted successfully and served the local production runtime
  - Playwright protected-flow smoke passed with the canonical QA account against `http://127.0.0.1:3301`, and the evidence log was written to `tmp/qa-logs/e01_protected_flow.json`
  - route/content review remained aligned with the implemented `/my/records` list-only pass, and no fresh continuity gap justified reopening `/my/records/[id]` or `/my/summary`

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `done`
- Blocked by: `C-01`
- QA method:
  - confirm no drift into recommendation/reminder/archive capability and repo health remains green
- Evidence:
  - scope audit confirmed the 006 closeout snapshot remains constrained to `/my/records` list-only revisit convenience with no drift into recommendation, reminder, archive-management, `/my/records/[id]`, or `/my/summary` expansion
  - `npm run lint` passed
  - `npm run typecheck` passed
  - `npm run build` passed in the current runner, replacing the older Turbopack panic note as the best current build truth for 006

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `done`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded
- Evidence:
  - closeout disposition is now recorded in `risk_analysis.md` section `5.1 Closeout disposition for 2026-03-15`

## 6. Current progress snapshot

- Current phase: `Phase C - QA and closeout`
- Current task: `Complete through C-03`
- Last completed task: `C-03 Final human review checklist pass and package closeout`
- Active blocker: `none confirmed`
- Notes: 006 is now truthfully complete after fresh revalidation cleared the old listener blocker. `/my/records` list-only runtime smoke, route/content review, scope audit, and repo-health verification all passed. `/my/records/[id]` was not reopened because no concrete continuity gap required expansion, and `/my/summary` remained excluded by default.

## 7. Completion rule

006 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- touched revisit surfaces materially improve re-entry clarity and revisit convenience
- no drift into recommendation/reminder/archive-management capability is found
- closeout checklist and risk disposition are explicitly recorded before package closeout
