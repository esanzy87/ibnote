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
| P2-01 | 2 | Add the shared `/my` workspace shell pattern to `/my/summary` for cross-route continuity | P0 | completed | `/my/summary` renders `RecordsWorkspaceShell` with `active="summary"` across loading, error, empty, and content states. |
| P2-02 | 2 | Remove remaining English residue on `/my/records/[id]` copy and headers while preserving record behavior | P1 | completed | English labels in loading/error/missing states, top-level header sections, and privacy guidance were removed and replaced with Korean copy while preserving behavior. |
| P2-03 | 2 | Apply shared `/my` shell and state framing parity on `/my/records` so route continuity remains aligned with `/my/records/[id]` and `/my/summary` | P0 | completed | `/my/records` shows `RecordsWorkspaceShell` with the same header/nav treatment in loading/error/empty/redirect states before content, including direct record/summary/template navigation. |
| P2-04 | 2 | Apply shared `/my` shell and state framing to `/my/records/[id]` non-content states | P0 | completed | Record editor loading/error/missing/redirect states now render inside `RecordEditorFrame` with `RecordsWorkspaceShell active="records"` before the form content appears. |
| P2-05 | 2 | Apply shared `/my` shell/state framing to `/my/summary` redirect state | P0 | completed | `my/summary` unauthenticated redirect path now uses `SummaryWorkspaceFrame` so auth states all keep the same shell and workspace navigation. |

## 4. Current note

014 opened on 2026-03-24 as the active rolling UI/UX completion epic.

Current truth:
- 013 remains closed
- Phase 1 Gate A is complete based on the locked minimum route-set audit and structured findings in `findings.md`
- the first implementation slice is locked to authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`
- Gate B is complete after the bounded manual pilot validated warm parent-facing image direction for `/`, `/templates`, and `/templates/[slug]`
- Phase 1 is complete
- Phase 2 continues with `P2-05` completed (`/my/summary` now keeps the shared workspace shell during unauthenticated redirect state as well), and `/my/records` content now renders the shared shell before its hero/intro content.
- A host-served validation pass is now partially complete: headless browser screenshots at desktop/mobile widths confirmed that `/my/records`, `/my/records/[id]`, and `/my/summary` all expose the shared workspace shell and readable first-viewport loading states.
- A development-only auth bypass path is now implemented for local `localhost` validation using the documented QA email/password account through real Firebase sign-in.
- Fresh revalidation after restart showed a narrower blocker: in the available headless browser context, `/my/settings`, `/my/records`, and `/my/summary` stayed on loading-state UI even after extended waits.
- The dev auth hook is now tightened again so the QA-account auto sign-in uses in-memory Firebase persistence and a bounded timeout/error path instead of indefinite loading.
- Fresh reruns after restart still show `/my/settings` and `/my/records` stuck on loading-state UI, so the tighter hook has not yet surfaced an auth error or reached authenticated steady state in headless validation.
- A headed Chrome validation pass is now complete: authenticated desktop and mobile screenshots confirmed `/my/records`, `/my/records/[id]`, and `/my/summary` in signed-in steady state with shared shell/header identity, consistent nav affordances, visible route identity, and acceptable first-viewport action density.
- Phase 2 is now truthfully complete. Headless auth-settling remains a tooling quirk for future automation work, but it no longer blocks Phase 2 closeout because the required locked-route checks have been completed in a real headed browser session.
- Phase 3 is now opened as the next bounded slice: align brand continuity across `/`, `/templates`, `/templates/[slug]`, and the locked `/my` workspace so the product feels like one IBNote journey rather than separate public and authenticated subsystems.
- Next action is to execute the Phase 3 brief without reopening Phase 2, starting with a bounded audit of the public-to-locked color, shell, and tone discontinuities that remain most visible at route entry points.

Future phases should be appended below this section rather than replacing the epic.
