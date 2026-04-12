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
| P3-01 | 3 | Audit the locked `/my` routes against the public discovery baseline and record concrete visual mismatches | P0 | completed | Actual route implementations and available route screenshots identify the highest-value shell, hero, CTA, and surface mismatches without guessing. |
| P3-02 | 3 | Restore top-bar continuity across the public discovery and locked workspace routes | P0 | completed | `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary` each expose an intentional top-of-page brand/navigation anchor, and no core route feels header-less or detached from the wider IBNote journey. |
| P3-03 | 3 | Restyle the shared `/my` shell, page backgrounds, and top-level framing to inherit the public route warmth | P0 | completed | `/my/records`, `/my/records/[id]`, and `/my/summary` no longer open on stone/slate-heavy framing and instead share the warmer cream/orange baseline, while the active nav pill, route heading, and shell-level hierarchy remain immediately legible at desktop and mobile widths. |
| P3-04 | 3 | Replace the dark `/my` hero bands and black-primary CTA hierarchy with the warmer public-route hero language | P0 | completed | `/my` hero sections and first-view CTAs use public-route color energy, pill treatment, and card atmosphere rather than dark dashboard-like blocks, without hiding summary-window context, record status meaning, or primary-action discoverability in the first viewport. |
| P3-05 | 3 | Harmonize secondary cards, filters, badges, and info panels across the locked `/my` routes with public-route surface treatment | P1 | completed | Core content cards, guidance panels, filter shells, metadata chips, rating controls, and metric modules on `/my` use the same warm border/fill rhythm and rounded-card feel established on `/templates` and `/templates/[slug]`, while dense content remains scannable and selected/error states keep sufficient contrast. |
| P3-06 | 3 | Verify desktop/mobile first-view continuity after the Phase 3 restyle without regressing Phase 2 route clarity | P0 | completed | Desktop and mobile checks confirm that the warmer `/my` presentation still keeps route identity, navigation clarity, top-bar continuity, primary actions, selected-state contrast, and dense-data readability intact across representative loading, empty, and authenticated content states. |
| P4-01 | 4 | Lock the Phase 4 image-realization brief around public-route asset procurement and placeholder replacement | P0 | completed | The docpack explicitly scopes Phase 4 to securing the required image assets and placing them into the current placeholder slots on `/`, `/templates`, and `/templates/[slug]`, with exclusions and honest verification gates. |
| P4-02 | 4 | Secure the bounded image asset set needed for the Phase 4 public-route surfaces | P0 | completed | The needed asset list is fulfilled with repo-available files suitable for the homepage hero, homepage example cards, and one slug-specific representative image for each template card/detail pair, using either successful Codex-side generation in the default environment or user-supplied external outputs delivered back into the repo. |
| P4-03 | 4 | Replace the remaining public-route placeholder imagery with the secured Phase 4 asset set | P0 | completed | `/`, `/templates`, and `/templates/[slug]` no longer rely on placeholder-grade icon blocks where the Phase 4 brief expects image-backed surfaces. |
| P4-04 | 4 | Verify desktop/mobile asset fit, continuity, and readability after placeholder replacement | P0 | completed | Desktop and mobile checks confirm that the new assets render correctly, keep text readable, and improve finish quality without introducing broken crops, contrast regressions, or layout instability. |
| P5-01 | 5 | Implement multi-language support (i18n) framework with Korean/English support | P0 | completed | `next-intl` is integrated, routes are moved under `[locale]`, and core localized dictionaries exist. |
| P5-02 | 5 | Localize all product routes and workspace components | P0 | completed | Home, Templates, Records, and Summary pages are fully localized in KO/EN. |
| P5-03 | 5 | Implement localized metadata and a language switcher | P1 | completed | `generateMetadata` handles dynamic titles/descriptions and a language switcher is available in the top bar. |
| P5-04 | 5 | Verify i18n implementation and remove hardcoded Korean strings | P0 | completed | `npm run lint` and `tsc` pass, and code audit confirms removal of non-brand hardcoded strings. |

## 4. Current note

014 opened on 2026-03-24 as the active rolling UI/UX completion epic.

Current truth:
- Phase 4 is complete: all homepage and template assets are wired and verified for desktop/mobile crop and readability.
- Phase 5 is complete: multi-language (Korean/English) support is fully implemented using `next-intl`, covering all routes, components, and hooks.
- A final verification pass (lint/tsc) confirmed the stability of the i18n refactor.

Future phases should be appended below this section rather than replacing the epic.
