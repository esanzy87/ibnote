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
| P4-04 | 4 | Verify desktop/mobile asset fit, continuity, and readability after placeholder replacement | P0 | in_progress | Desktop and mobile checks confirm that the new assets render correctly, keep text readable, and improve finish quality without introducing broken crops, contrast regressions, or layout instability. |

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
- Phase 3 route audit is now complete: actual route code plus the stored route-screen references confirm that the public baseline is defined by cream backgrounds, orange-accented chips/buttons, image-backed or light hero panels, and low-contrast warm card surfaces, while `/my` still opens on stone/slate framing, dark hero bands, and black primary CTAs.
- The audit also surfaced a top-bar continuity gap: `/` already has a sticky global header, but `/templates` and `/templates/[slug]` currently render without a matching top navigation bar, and the locked `/my` routes expose only the workspace shell rather than a clear global brand/navigation anchor.
- `P3-02` is now complete. A shared `GlobalTopBar` pattern anchors `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`, with the locked `/my` version kept visually lighter than `RecordsWorkspaceShell` so the routes gain a global brand anchor without double-header competition.
- A fresh headed Chrome validation pass on `localhost:3040` confirmed top-of-page continuity at `1440x1200` and `390x844` for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, including authenticated content states for the three locked `/my` routes.
- `P3-03` is now complete. The shared `/my` page frames now use a warmer cream gradient instead of the colder stone fill, and `RecordsWorkspaceShell` now uses warm cream/orange framing with an orange active pill while preserving the existing navigation structure and route-family hierarchy.
- A second headed Chrome pass on `localhost:3040` confirmed the `P3-03` shell/page-frame change at `1440x1200` and `390x844` for `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`: the shell reads warmer than before, the active pill remains the strongest shell affordance, and the shell label/title stay readable on mobile without wrapping into clutter.
- `P3-04` is now complete. `/my/records` and `/my/records/[id]` now use warm first-view hero panels and orange-led CTA hierarchy, with `새 기록 시작` / `내 요약 보기` moved into the record-list hero and a direct write/edit CTA added to the editor intro so the first viewport keeps one unmistakable primary action.
- A third headed Chrome pass on `localhost:3040` confirmed the `P3-04` hero/CTA change at `1440x1200` and `390x844` for `/my/records` and `/my/records/lUNzWkHKzC5441JlUmdQ`: summary-window context remains visible on `/my/records`, record stage and write/edit intent remain immediate on `/my/records/[id]`, and the orange primary CTA reads stronger than adjacent status pills or metadata cards on both widths.
- `P3-05` is now complete. The remaining filters, list/detail cards, editor guide/metadata panels, rating controls, summary basis cards, and metric modules now use the same warm border/fill rhythm as the discovery/template routes while preserving semantic states and strong selected-state contrast.
- `P3-06` is now complete. A final headed Chrome validation pass on `localhost:3040` captured desktop and mobile screenshots for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, plus full-page screenshots for `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, `/my/summary`, and a representative filtered-empty `/my/records` state. The evidence confirms top-bar continuity, public-vs-locked first-view warmth, authenticated content-state behavior for the three locked `/my` routes, obvious selected rating buttons, readable summary bars/count cards, and one representative empty-state hierarchy check.
- Phase 3 is now truthfully complete. The locked `/my` routes in scope feel like descendants of the public baseline while preserving the route clarity, active-nav contrast, primary-action discoverability, selected-state clarity, and dense-data readability gains required by the Phase 3 acceptance gates.
- A red-team pass on the plan found four concrete failure modes to guard against: losing active-nav contrast in the shared shell, weakening first-viewport route identity while lightening heroes, over-warming dense form/summary surfaces until scannability drops, and claiming success from partial loading-state validation.
- Phase 3 implementation is complete for the locked route scope.
- Phase 4 is now locked as a bounded public-route image-realization slice: secure the required image assets and place them into the current placeholder locations on `/`, `/templates`, and `/templates/[slug]`.
- The existing Gate B pilot assets remain direction evidence, but Phase 4 is where the product should actually consume a finished asset set rather than leaving icon-only placeholders in place.
- Phase 4 asset procurement should first attempt Codex-side image generation in the default environment. If that path cannot produce the needed files truthfully, the fallback is for James to generate the prompted assets in an external tool such as Google Gemini Nano Banana and place the resulting files into the repo via inbox for final integration.
- The Phase 4 external-generation handoff pack at `docs/epics/014_ui_ux_completion_program/artifacts/phase4_asset_handoff/014_phase4_image_asset_prompt_pack.md` now defines the full bounded asset set as 19 files: 1 homepage hero, 3 homepage example-card images, and 15 slug-specific template images reused between `/templates` cards and their matching `/templates/[slug]` heroes.
- Asset 1 through Asset 11 are now integrated into the live route code path: the returned files were moved out of `docs/inbox/` into `public/images/phase4/`, the homepage hero and three homepage example cards now use the new image assets, and `/templates` plus the matching `/templates/[slug]` routes now consume the available slug-specific assets for `ask-better-questions`, `compare-two-ideas`, `explain-what-you-noticed`, `family-rule-builder`, `high-low-next-talk`, `my-opinion-matters`, and `my-small-action-this-week`.
- Asset 12 through Asset 19 are now also integrated into the same `public/images/phase4/` location. The currently published template slugs now all have wired image assets, including `notice-think-wonder-about-nature`, `one-minute-mini-speech`, `spot-fact-vs-opinion`, `waste-flow-map`, `water-use-check`, and `what-changed-in-my-day`.
- Three extra prompt-pack template files are staged in `public/images/phase4/` but are not currently consumed by live routes because `high-low-next-talk`, `pattern-hunt-at-home`, and `sort-what-belongs-together` are not present in the current `src/content/templates/template-list.ts` inventory.
- The full homepage asset set and every currently published template route are now wired into the actual route code path for `/`, `/templates`, and `/templates/[slug]`; the old template-image placeholder fallback path remains in code only as a safety net, not as the expected steady-state for any live in-scope slug.
- Local verification for the full-wiring pass is complete: `npm run typecheck` and `npm run build` both passed after the remaining asset mapping landed.
- Next action is to complete `P4-04` with final desktop/mobile crop and readability verification on the live routes before treating the Phase 4 slice as fully closed.

Future phases should be appended below this section rather than replacing the epic.
