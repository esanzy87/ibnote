# IBNote 014 UI/UX Completion Program Todo

Status: `active`
Source of truth: `docs/epics/014_ui_ux_completion_program/spec.md`
Companion docs:
- `docs/epics/014_ui_ux_completion_program/prd.md`
- `docs/epics/014_ui_ux_completion_program/findings.md`
- `docs/epics/014_ui_ux_completion_program/adr.md`
- `docs/epics/014_ui_ux_completion_program/risk_analysis.md`

## 1. Phase outline

1. Phase 1 - baseline audit and first bounded slice selection
2. Phase 1 Gate B - optional bounded image direction pilot
3. Future phases - append sequentially after each phase closes

## 2. Operating note

014 is intentionally open-ended.
Do not mark this epic complete unless James explicitly asks to close epic 014.

At the end of every phase:
- capture findings truthfully
- record those findings in `findings.md`
- write the next phase brief before resuming implementation
- append the next phase to this file instead of opening a replacement epic by default

## 3. Task ledger

| ID | Phase | Task | Priority | Status | Done condition |
| --- | --- | --- | --- | --- | --- |
| P1-01 | 1 | Audit the minimum Phase 1 route set for finish-quality gaps across color, tone, style, hierarchy, density, and interaction continuity | P0 | completed | The locked minimum route set is reviewed and core route gaps are identified from current product reality without guessing. |
| P1-02 | 1 | Audit brand presence, logo consistency, and image/asset integrity across the same route set | P0 | completed | Brand/logo drift and missing or placeholder-like asset gaps are documented with route-level evidence. |
| P1-03 | 1 | Record Phase 1 findings in structured form and rank the highest-value candidates for the first bounded slice | P0 | completed | Findings include route references, decisions, and carry-forward value, and the candidate list is explicitly ranked. |
| P1-04 | 1 | Lock the first implementation target and validation checks | P0 | completed | Scope, exclusions, and honest success checks are defined clearly enough to implement without guessing. |
| P1-05 | 1B | If Gate B opens, define image direction and execute a capped pilot handoff for representative routes | P1 | completed | A capped prompt pack exists, returned pilot outputs were reviewed truthfully, and the final correction remained limited to representative routes within the original cap. |
| P1-06 | 1 | Write the Phase 2 brief from Phase 1 findings | P1 | completed | `findings.md` and `spec.md` now carry the closed Phase 1 evidence into a concrete Phase 2 brief. |

## 4. Current note

014 opened on 2026-03-24 as the active rolling UI/UX completion epic.

Current truth:
- 013 remains closed
- Phase 1 Gate A is complete based on the locked minimum route-set audit and structured findings in `findings.md`
- the first implementation slice is locked to authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`
- Gate B is complete after the bounded manual pilot validated warm parent-facing image direction for `/`, `/templates`, and `/templates/[slug]`
- Phase 1 is complete
- the next action is to begin Phase 2 with the locked authenticated workspace coherence slice

Future phases should be appended below this section rather than replacing the epic.
