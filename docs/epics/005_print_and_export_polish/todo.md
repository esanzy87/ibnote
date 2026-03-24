# IBNote 005 Print and Export Polish Todo

Status: Package complete - Phase C closeout recorded
Source of truth: `docs/epics/005_print_and_export_polish/spec.md`
Companion docs:
- `docs/epics/005_print_and_export_polish/prd.md`
- `docs/epics/005_print_and_export_polish/adr.md`
- `docs/epics/005_print_and_export_polish/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for 005.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start a task before its blockers are done
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 005 into a PDF/share/file-management package
- implementation must not start until doc hardening and sign-off truth are recorded

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and preservation target selection
2. Phase B - Preservation readability and action polish
3. Phase C - QA and closeout

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Scope drift into heavy export capability | Phases A-C | export boundaries remain explicit |
| GB-02 | False-polish risk | Phases B-C | touched changes produce real preservation value, not cosmetic churn |
| GB-03 | Surface sprawl risk | Phases A-C | chosen surfaces stay tightly bounded and justified |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 005 scope, preservation thesis, and capability boundaries | P0 | done | - |
| A-02 | A | Choose the smallest high-leverage preservation surfaces and evidence shape | P0 | done | A-01 |
| A-03 | A | Define print/export-adjacent acceptance criteria and closeout evidence | P0 | done | A-02 |
| B-01 | B | Improve preservation readability on the chosen record/summary surfaces | P1 | done | A-03 |
| B-02 | B | Refine print/export-adjacent action wording and continuity | P1 | done | B-01 |
| B-03 | B | Verify preserved output remains modest, readable, and worth revisiting | P1 | done | B-02 |
| C-01 | C | Run route/content review and affected print/runtime smoke | P1 | done | B-03 |
| C-02 | C | Run scope audit and lint/typecheck/build | P1 | done | C-01 |
| C-03 | C | Final human review checklist pass and package closeout | P1 | done | C-02 |

## 5. Detailed tasks

### Phase A - Scope lock and preservation target selection

#### A-01 Freeze 005 scope, preservation thesis, and capability boundaries
- Priority: `P0`
- Status: `done`
- Scope:
  - lock 005 as a low-risk preservation/readability package
  - explicitly exclude PDF platforms, sharing systems, file history, and report-card generation
  - preserve inherited route/data/product truth unless a minimal preservation improvement requires continuity changes
- QA:
  - no doc ambiguity remains about what 005 is and is not
- Evidence target:
  - `spec.md`, `adr.md`, and `risk_analysis.md` make heavy export/document-platform drift explicitly out of scope

#### A-02 Choose the smallest high-leverage preservation surfaces and evidence shape
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - inspect existing print/save behavior and choose the smallest surface set with the clearest payoff
  - current hardening conclusion: default focus is `/my/summary`, with `/my/records/[id]` kept conditional and `/templates/[slug]` kept out of the default touched set
  - define the before/after evidence shape for readability, noise reduction, and preservation intent
- Completion note:
  - current doc-level decision is that 005 should launch implementation only if it starts from `/my/summary` first and reopens `/my/records/[id]` only when a small shared preservation pass clearly justifies it
- QA:
  - chosen surfaces are tightly bounded, easy to verify, and worth the package cost
- Evidence target:
  - `todo.md` and `spec.md` explicitly record the chosen surface set and evidence expectations

#### A-03 Define print/export-adjacent acceptance criteria and closeout evidence
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Scope:
  - define what counts as better print/save readability versus cosmetic movement
  - define action-wording honesty rules so the product does not overpromise export capability
  - define closeout evidence for print emulation/runtime smoke/repo-health checks
- Completion note:
  - closeout evidence must explicitly distinguish required `/my/summary` print/readability gains from optional `/my/records/[id]` gains so implementation does not over-touch the app under a polish label
- QA:
  - closeout truth can distinguish real preservation gains from superficial polish
- Evidence target:
  - explicit verification matrix and closeout defaults exist in `spec.md` and are reflected here

### Phase B - Preservation readability and action polish

#### B-01 Improve preservation readability on the chosen record/summary surfaces
- Priority: `P1`
- Status: `done`
- Blocked by: `A-03`
- Scope:
  - improve print/save hierarchy, reduce interactive noise, and strengthen rereadability on the chosen surfaces
- QA:
  - preserved output feels calmer, clearer, and more worth keeping
- Evidence:
  - kept the touched surface set anchored to `/my/summary`; `/my/records/[id]` was not reopened because the same small preservation pass was not required to deliver the package gain
  - `src/components/summary/summary-page-client.tsx` now applies dedicated summary print structure (`summary-print-page`, `summary-print-root`, `summary-print-card`) so the preserved layout has clearer section hierarchy and lower visual noise
  - recent-record cards, count cards, and average cards now use print-aware card treatment, while navigation-only actions are hidden from preserved output
  - `src/styles/print.css` now adds summary-specific print cleanup for page spacing, card backgrounds, metric layout, and chart-bar contrast

#### B-02 Refine print/export-adjacent action wording and continuity
- Priority: `P1`
- Status: `done`
- Blocked by: `B-01`
- Scope:
  - align action labels and supporting copy so browser-native print/save behavior is understandable and truthful
- QA:
  - actions feel intentional but do not imply a richer export system than exists
- Evidence:
  - `/my/summary` now includes a dedicated preservation-action block that explains the browser-native print/save path without implying IBNote-owned export infrastructure
  - the new copy explicitly states that PDF saving depends on browser support rather than promising an app-level export system
  - the preserved-output path now uses the existing `PrintButton` only on `/my/summary`; `/templates/[slug]` and `/my/records/[id]` were not reopened for new 005 behavior

#### B-03 Verify preserved output remains modest, readable, and worth revisiting
- Priority: `P1`
- Status: `done`
- Blocked by: `B-02`
- Scope:
  - confirm the improved preservation surfaces remain modest, archive-friendly, and non-report-like
  - verify that printed/saved output still fits IBNote's reflection/revisit loop
- QA:
  - preserved output feels useful without turning into assessment or official-document framing
- Evidence:
  - source review confirmed `/my/summary` keeps the humble framing added in 003 (`자동 추천이나 진단이 아니라...`) while adding preservation-specific copy that stays browser-native and non-institutional
  - print-only copy now frames the page as a rereadable summary of recent submitted records rather than as an official report/export artifact
  - screen-only navigation continuity (`흐름 연결`) remains available in live UI but is removed from print output so preserved pages stay calmer and more archive-friendly

### Phase C - QA and closeout

#### C-01 Run route/content review and affected print/runtime smoke
- Priority: `P1`
- Status: `done`
- Blocked by: `B-03`
- QA method:
  - review touched record/summary surfaces
  - run print-emulation and any minimal runtime smoke needed for the affected main path(s)
- Evidence:
  - route/content review is complete for the touched `/my/summary` surface, and the summary-only scope still matches the hardened 005 plan
  - fresh revalidation disproved the earlier listener blocker: a raw Node listener bind succeeded on `127.0.0.1:3301`
  - `npm run start -- --hostname 127.0.0.1 --port 3301` booted successfully in the current environment
  - protected-flow Playwright smoke (`scripts/qa/e01_protected_flow_check.mjs`) completed successfully against `BASE_URL=http://127.0.0.1:3301` with the canonical QA account, so the runtime path is no longer blocked
  - the earlier `listen EPERM` stop point should now be treated as stale history, not current package truth

#### C-02 Run scope audit and lint/typecheck/build
- Priority: `P1`
- Status: `done`
- Blocked by: `C-01`
- QA method:
  - confirm no drift into heavy export/share/file-management capability and repo health remains green
- Evidence:
  - scope audit confirmed 005 remains constrained to `/my/summary` preservation/readability improvements with no drift into PDF/share/file-management/report-platform capability
  - `npm run lint` passed
  - `npm run typecheck` passed
  - `npm run build` passed

#### C-03 Final human review checklist pass and package closeout
- Priority: `P1`
- Status: `done`
- Blocked by: `C-02`
- QA method:
  - human checklist and risk disposition are explicitly recorded
- Evidence:
  - closeout disposition is recorded in `risk_analysis.md`
  - the tracker now truthfully records 005 complete through `C-03`

## 6. Current progress snapshot

- Current phase: `Phase C - QA and closeout complete`
- Current task: `C-03 done`
- Last completed task: `C-03 Final human review checklist pass and package closeout`
- Active blocker: `none confirmed`
- Notes: 005 implementation touches `/my/summary` only. `/my/records/[id]` remains deferred because the same small preservation/readability pass was not required to justify reopening the editor surface. The earlier listener blocker proved stale during fresh revalidation; local listener bind, `npm run start -- --hostname 127.0.0.1 --port 3301`, protected-flow smoke, `npm run lint`, `npm run typecheck`, and `npm run build` all completed successfully.

## 7. Completion rule

005 implementation is complete only when:
- all tasks `A-01` through `C-03` are `done` or explicitly `cancelled`
- touched preservation surfaces materially improve print/save readability and preservation value
- no drift into PDF/share/file-management/report-platform capability is found
- human sign-off is recorded before package closeout
