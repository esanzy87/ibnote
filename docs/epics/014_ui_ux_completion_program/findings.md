# IBNote 014 UI/UX Completion Program Findings

Status: Active
Date opened: 2026-03-24
Purpose: durable phase-by-phase findings log for epic 014

## 1. Usage rule

Record findings here after each phase closes or when a phase produces durable evidence that should shape the next brief.

This file is the evidence log for:
- what was observed
- why it matters
- what decision was made
- what should carry forward into the next phase

Do not use this file for temporary work notes or running scratch logs.

## 2. Findings template

For each finding, capture:
- `ID`: stable identifier such as `P1-F01`
- `Finding`: concise name of the issue or learned truth
- `Affected routes`: exact routes or surfaces touched by the finding
- `Evidence`: what was directly observed
- `Impact`: why it matters for UI/UX completion quality
- `Priority`: `P0`, `P1`, or `P2`
- `Decision`: fix now, defer, reject, or carry forward
- `Validation needed`: what still needs to be checked before closeout or rollout
- `Carry-forward`: how the next phase brief should reflect it

## 3. Phase 1 findings

Status: Phase 1 complete on 2026-03-24. Gate A completed, Gate B completed through a capped manual pilot review, and the next step is the locked Phase 2 implementation slice.

Phase 1 should at minimum capture findings across:
- visual-system consistency
- tone-and-manner consistency
- style-collapse or stale-design residue
- hierarchy and composition quality
- density and readability
- interaction continuity
- brand presence and logo consistency
- image-asset integrity and placeholder pressure

### `P1-F01`
- `Finding`: The locked route set currently splits across two competing visual systems instead of reading like one calm parent journey.
- `Affected routes`: `/`, `/login`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, `/my/summary`, `/reset-password`
- `Evidence`: Direct audit of the locked route code shows the public/auth surfaces lean on warm `primary` orange, soft glow treatments, and rounded marketing cards ([page.tsx](/home/dev/projects/ibnote/src/app/page.tsx#L43), [login-form.tsx](/home/dev/projects/ibnote/src/components/ui/login-form.tsx#L92), [password-reset-request-form.tsx](/home/dev/projects/ibnote/src/components/ui/password-reset-request-form.tsx#L98), [template-library-client.tsx](/home/dev/projects/ibnote/src/components/templates/template-library-client.tsx#L83), [protected-template-detail.tsx](/home/dev/projects/ibnote/src/components/templates/protected-template-detail.tsx#L63)). The authenticated record flow instead shifts to stone/slate surfaces, dark gradient heroes, and black pill CTAs ([records-list-client.tsx](/home/dev/projects/ibnote/src/components/records/records-list-client.tsx#L87), [records-list-client.tsx](/home/dev/projects/ibnote/src/components/records/records-list-client.tsx#L112), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L157), [summary-page-client.tsx](/home/dev/projects/ibnote/src/components/summary/summary-page-client.tsx#L240)).
- `Impact`: Cross-route continuity is the biggest finish-quality gap right now. The user moves from a warm, parent-facing discovery flow into a more dashboard-like workspace, which makes the product feel stitched together instead of deliberately composed.
- `Priority`: `P0`
- `Decision`: carry forward
- `Validation needed`: Confirm that the first bounded implementation slice can create a shared visual shell and CTA language across the main `/my` journey without reopening unrelated routes.
- `Carry-forward`: Treat authenticated workspace continuity as the leading candidate for Phase 2 because it improves the core template -> record -> summary loop with the least surface-area expansion.

### `P1-F02`
- `Finding`: Brand presence and navigation reuse drift inside the authenticated workspace, so the main parent journey lacks one consistent IBNote shell.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: `/my/records` renders both a custom hero and `RecordsWorkspaceShell` ([records-list-client.tsx](/home/dev/projects/ibnote/src/components/records/records-list-client.tsx#L564), [records-workspace-shell.tsx](/home/dev/projects/ibnote/src/components/records/records-workspace-shell.tsx#L19)); `/my/records/[id]` also renders `RecordsWorkspaceShell` plus separate intro/header blocks ([record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L416), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L163), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L224)); `/my/summary` renders neither the workspace shell nor an IBNote logo/header at all and starts immediately with summary cards ([summary-page-client.tsx](/home/dev/projects/ibnote/src/components/summary/summary-page-client.tsx#L493)).
- `Impact`: Users do not get a stable orientation pattern once they are inside the product. That weakens affordance consistency, hurts brand recall, and makes the summary page feel detached from the rest of the main parent flow.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: Verify that one bounded shell treatment can cover records list, record editor, and summary without reducing density on mobile.
- `Carry-forward`: Lock the first implementation target around shared workspace shell, brand anchor, and navigation continuity across the `/my` routes.

### `P1-F03`
- `Finding`: Tone-and-manner residue remains in the record editor, where several system states still speak in English and slightly admin-like language instead of the calmer parent-facing voice used elsewhere.
- `Affected routes`: `/my/records/[id]`
- `Evidence`: The record editor still ships labels such as `Record editor`, `Redirecting`, `Record error`, and `Record not found` in key state headers ([record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L72), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L91), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L105), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L132), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L229), [record-editor.tsx](/home/dev/projects/ibnote/src/components/records/record-editor.tsx#L275)).
- `Impact`: This is a smaller surface-area issue than the shell split, but it weakens the product's calm and humane voice at exactly the moment a parent is asked to write and reflect.
- `Priority`: `P1`
- `Decision`: carry forward
- `Validation needed`: Confirm whether copy cleanup can be fully absorbed into the same bounded workspace-coherence slice instead of becoming a separate phase.
- `Carry-forward`: Fold tone cleanup into the locked `/my` workspace target so the core authoring flow reads consistently in Korean and stays parent-facing.

### `P1-F04`
- `Finding`: Imagery across the public discovery and template routes is still placeholder-grade, relying almost entirely on oversized Material icons instead of route-specific visual narrative.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: The home hero and example sections use icon-only frames rather than a representative product or family-learning visual ([page.tsx](/home/dev/projects/ibnote/src/app/page.tsx#L92), [page.tsx](/home/dev/projects/ibnote/src/app/page.tsx#L141)); template cards use the same icon-block pattern for every card ([template-card.tsx](/home/dev/projects/ibnote/src/components/templates/template-card.tsx#L16)); the template detail hero is also an icon-only panel with no route-specific asset support ([protected-template-detail.tsx](/home/dev/projects/ibnote/src/components/templates/protected-template-detail.tsx#L65)).
- `Impact`: The product loop is understandable, but these routes still feel unfinished at first glance. Because the issue appears on the home page and the template decision surfaces, it materially reduces perceived product completeness and narrative usefulness.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: Run only a capped Gate B pilot on representative audited routes to test image direction before any batch generation.
- `Carry-forward`: Open Gate B and validate at most three assets for representative discovery/template surfaces before broader image rollout is considered.

### `P1-F05`
- `Finding`: Gate B is justified but execution is currently blocked by image-generation tooling constraints in this session.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: The active Phase 1 findings already justify a capped image-direction pilot on representative discovery/template routes (`P1-F04`). The required `imagegen` skill specifies that normal work should use the built-in `image_gen` tool and that the CLI fallback is explicit-only, must not be chosen automatically, and requires James to opt into that path ([SKILL.md](/mnt/c/Users/junwon/.codex/skills/imagegen/SKILL.md#L14), [SKILL.md](/mnt/c/Users/junwon/.codex/skills/imagegen/SKILL.md#L24), [SKILL.md](/mnt/c/Users/junwon/.codex/skills/imagegen/SKILL.md#L101)). This session does not expose the built-in `image_gen` tool, so the pilot cannot be executed truthfully without an explicit fallback decision.
- `Impact`: Phase 1 cannot close yet because Gate B remains open but unexecuted. Pretending that prompt drafting or speculative art direction equals a pilot would create status fiction.
- `Priority`: `P0`
- `Decision`: defer
- `Validation needed`: Either the built-in `image_gen` tool must be available in-session, or James must explicitly opt into the CLI fallback path with a usable `OPENAI_API_KEY` setup before the capped pilot can run.
- `Carry-forward`: Keep Phase 1 in Gate B blocked state. The next truthful action is to resume the capped pilot only after an approved generation path exists.

### `P1-F06`
- `Finding`: Gate B is now unblocked through a capped manual-generation handoff: the pilot deliverable for this phase is a prompt pack plus fixed filenames for James to generate externally and return to `docs/inbox/`.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: James explicitly redirected Gate B away from the `imagegen` skill and asked for image-specific prompts plus concrete filenames so he can generate the pilot images himself in Google Gemini Nano Banana and place them in the repo. A capped three-prompt pack was written at [014_phase1_gate_b_image_prompt_pack.md](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014_phase1_gate_b_image_prompt_pack.md), covering the representative audited routes implicated by `P1-F04`.
- `Impact`: This preserves the bounded Gate B intent without reopening tooling decisions inside the repo. Phase 1 can now move forward as soon as the external pilot outputs are dropped back into the workspace for review.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: Review the three returned files from the Phase 1 Gate B artifact folder against the prompt-pack checklist before deciding whether Gate B direction is validated or still needs one tighter prompt revision.
- `Carry-forward`: Treat the prompt pack as the current Gate B output. The next step is result review, not more prompt expansion or batch production.

### `P1-F07`
- `Finding`: The first manual Gate B pilot partially validates the direction, but the `/templates` representative image still fails the no-text/no-UI-frame requirement and needs one tighter regeneration.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: Visual review of the three returned pilot files in the Phase 1 Gate B artifact folder found that [014-p1-gateb-home-hero-family-reflection.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-home-hero-family-reflection.png) successfully replaces the placeholder icon treatment with a calm parent-child reflection scene and usable warm tone; [014-p1-gateb-template-detail-noticing-moment.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-detail-noticing-moment.png) also validates the “noticing moment” thesis for `/templates/[slug]`; but [014-p1-gateb-template-card-conversation.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-card-conversation.png) includes baked text (`UI Template Library`) and a mock UI frame, which violates the prompt-pack avoid rules and makes it unsuitable as a pure featured image asset.
- `Impact`: Gate B has produced meaningful direction evidence, but it is not fully closed yet. Two representative routes now support the image thesis, while the template-card route still risks importing UI-chrome residue into the asset layer.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: Regenerate only the `/templates` card image with stricter instructions forbidding any embedded text, border frame, or mock-screen treatment; then re-review whether the revised image reads cleanly at card size.
- `Carry-forward`: Keep Gate B open for one bounded regeneration only. If the revised `/templates` card image passes, treat the pilot direction as validated and move straight to Phase 1 closeout.

### `P1-F08`
- `Finding`: The revised `/templates` pilot image completes Gate B validation: the representative public/template routes now support a usable warm family-reflection image direction without placeholder-icon dependence.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: Re-review of [014-p1-gateb-template-card-conversation.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-card-conversation.png) shows the regeneration removed the previous baked text and mock UI frame while preserving a clear parent-child conversation scene readable at card scale. Together with [014-p1-gateb-home-hero-family-reflection.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-home-hero-family-reflection.png) and [014-p1-gateb-template-detail-noticing-moment.png](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-detail-noticing-moment.png), the capped pilot now validates a consistent visual thesis: warm domestic observation, calm editorial finish, and parent-facing emotional tone. Directly observed residual note: the returned pilot files are still direction samples rather than final production crops, so future implementation can crop or re-render as needed.
- `Impact`: Gate B can close truthfully. Phase 1 now has enough image-direction evidence to move on without reopening batch generation or speculative brand-asset expansion.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: No further Phase 1 image validation is required. Future phases may refine crop/usage only when the product implementation actually consumes these assets.
- `Carry-forward`: Use the validated image thesis as supporting evidence for later public/template polish, but do not expand into batch featured-image production inside the next implementation slice.

## 4. Phase 1 candidate ranking

1. `Locked for Phase 2`: unify the authenticated `/my` journey shell across `/my/records`, `/my/records/[id]`, and `/my/summary`, including shared brand anchor, navigation continuity, calmer copy, and aligned CTA styling.
2. `Second`: refresh public/template composition around stronger brand framing and better transition from discovery into the authenticated workspace.
3. `Third`: tighten auth-only polish on `/login` and `/reset-password`, mainly density, placeholder text, and copy finishing.

## 5. Locked Phase 2 target

- `Target`: authenticated workspace coherence for `/my/records`, `/my/records/[id]`, and `/my/summary`
- `Why this goes first`: it fixes the highest-leverage continuity break in the main parent loop without reopening the entire app, and it can absorb the most visible tone residue at the same time.
- `Planned scope`: shared shell/header treatment, clearer brand presence, consistent nav affordances, unified CTA hierarchy, and copy cleanup where the current `/my` flow still feels admin-like.
- `Explicit exclusions`: no broad homepage redesign, no batch asset generation, no expansion into settings or new routes during this slice, and no behavioral changes to record filtering, summary calculations, or editor form structure.
- `Success checks`: the three `/my` routes should share one recognizable shell/header, expose one consistent navigation affordance set, remove English UI residue across headings and state copy, preserve mobile readability, and maintain clear links back into templates and summary.

## 6. Next expected update

Begin the locked Phase 2 implementation slice for authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`, using the carry-forward items from `P1-F01` through `P1-F03` and the bounded image-direction evidence from `P1-F08`.

## 7. Phase 2 in-progress findings

### `P2-F01`
- `Finding`: `/my/summary` now uses the shared workspace shell/header treatment, reducing the `/my` route split.
- `Affected routes`: `/my/summary`, `/my/records`, `/my/records/[id]`
- `Evidence`: `SummaryPageClient` now renders `SummaryWorkspaceFrame`, which prepends `RecordsWorkspaceShell` with `active="summary"` to loading, error, empty, and loaded summary states (`summary-page-client.tsx:31`, `summary-page-client.tsx:455`, `summary-page-client.tsx:470`, `summary-page-client.tsx:484`, `summary-page-client.tsx:505`, `summary-page-client.tsx:542`).
- `Impact`: The summary route now shares the same outer shell pattern and route-aware nav affordance as the records list and editor, which addresses one core Phase 2 continuity gap and strengthens brand-facing identity.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: verify at desktop and mobile that the shared shell does not compress first-viewport action visibility and that nav labels remain readable with existing content density.
- `Carry-forward`: Next Phase 2 step should absorb remaining English-label cleanup and CTA hierarchy alignment inside `/my/records/[id]`, then add final shell-completeness pass if any route-level mismatch remains.

### `P2-F02`
- `Finding`: `/my/records/[id]` key state headers and messaging was fully localized to Korean, removing the remaining English residue from edit-path top-level states and copy guidance.
- `Affected routes`: `/my/records/[id]`
- `Evidence`: Updated strings in `RecordLoadingState`, `RecordRedirectingState`, `RecordErrorState`, `MissingRecordState`, `HeaderSummary`, and `RECORD_PRIVACY_NOTE` are now Korean, with no remaining English-facing copy in those state blocks after this pass (`record-editor.tsx`: around top-level state components and line-level text constants).
- `Impact`: This closes the tone and language gap at the primary edit-auth state transitions and aligns `/my/records/[id]` with the parent-facing calmness target in Phase 2.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: confirm no English residue appears in `/my/records/[id]` on mobile and tablet breakpoints under loading/error/missing and in entry/help copy after content load.
- `Carry-forward`: move the next implementation step to `P2-03` (shell/state framing parity on `/my/records`).

### `P2-F03`
- `Finding`: `/my/records` now applies the same workspace shell and state framing in non-content states as the other locked `/my` routes.
- `Affected routes`: `/my/records`
- `Evidence`: `RecordsWorkspaceFrame` now wraps non-content UI branches in `records-list-client.tsx`, placing `RecordsWorkspaceShell` (with `active="records"`) around auth loading, auth error, redirect, record loading/idle, and records error states.
- `Impact`: Route identity and top-level orientation no longer disappear during auth/state transitions, reducing the sense of entering separate subsystems across the `/my` journey.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: validate desktop and mobile first-viewport rhythm, especially shell identity, nav affordance visibility, and primary action accessibility during non-content states.
- `Carry-forward`: next step should verify this parity pass before advancing to any further Phase 2 refinement.

### `P2-F04`
- `Finding`: `/my/records/[id]` now preserves the shared workspace shell in non-content states.
- `Affected routes`: `/my/records/[id]`
- `Evidence`: `record-editor.tsx` now renders `RecordEditorFrame` for auth loading/error/unauthenticated, record loading/idle/error, and missing states; that frame prepends `RecordsWorkspaceShell active="records"` before each state view.
- `Impact`: State transitions in the record editor now keep route identity and workspace nav visible, making `/my/records` and `/my/records/[id]` feel part of the same authenticated loop.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: complete a mobile/desktop first-viewport check for spacing and nav visibility with the added shell in `/my/records/[id]`.
- `Carry-forward`: next step should re-check `/my/summary` redirect state consistency and then confirm all three routes for Phase 2.

### `P2-F05`
- `Finding`: `/my/summary` unauthenticated redirect state now shares the same shell/header composition as other summary/content states.
- `Affected routes`: `/my/summary`
- `Evidence`: `summary-page-client.tsx` now wraps the `authStatus === 'unauthenticated'` branch with `SummaryWorkspaceFrame`, which includes `RecordsWorkspaceShell active="summary"` and keeps nav affordances visible during redirect transitions.
- `Impact`: Removes a remaining shell continuity gap in the final locked `/my` route so users see a consistent workspace identity before any authenticated content appears.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: verify all three locked routes (`/my/records`, `/my/records/[id]`, `/my/summary`) for desktop/mobile first-viewport shell continuity, especially nav button visibility and action crowding on narrow widths.
- `Carry-forward`: next step is a focused visual sanity check and then close/roll phase if no density regressions are found.

### `P2-F06`
- `Finding`: `/my/records` now renders the shared workspace shell before content on the authenticated content state.
- `Affected routes`: `/my/records`
- `Evidence`: `RecordsListClient` content return path now places `RecordsWorkspaceShell active="records"` above `RecordsHero` and filter/action sections (`records-list-client.tsx`).
- `Impact`: First-viewport route identity and nav affordance are now aligned with `/my/records/[id]` and `/my/summary`, reducing the sense of entering separate subsystems on wide and narrow screens.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: run a desktop/mobile width check to confirm nav labels, shell header, and the primary action remain readable with no crowding in the first viewport.
- `Carry-forward`: if density remains acceptable, mark Phase 2 as implementation-ready and close this step with no further `/my`-scope UI edits.

### `P2-F07`
- `Finding`: Runtime visual parity validation is blocked in the current execution environment.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: Attempted local validation command (`npm run dev -- --hostname 127.0.0.1 --port 3040`) exits with `WSL 1 is not supported` and `Could not determine Node.js install directory` before the app can serve pages; no desktop/mobile viewport render check could be completed in this run.
- `Impact`: Phase 2 completion confidence is limited by missing live viewport validation; shell/frame parity is verified by code paths, but density/crowding behavior remains untested.
- `Priority`: `P1`
- `Decision`: defer
- `Validation needed`: rerun a browser-level desktop/mobile sanity check from unauthenticated routes and at least one sample authenticated state once runtime toolchain is available.
- `Carry-forward`: resume `Phase 2` closeout only after viewport validation completes and no spacing/affordance regressions are observed.

### `P2-F08`
- `Finding`: Host-side viewport validation now confirms shared shell parity and acceptable first-viewport readability for the three locked `/my` routes in loading states, but authenticated content-state validation is still pending.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: After the user exposed a running app on `localhost:3040`, headless Chrome screenshots at desktop (`1440x1200`) and mobile (`390x844`) widths were captured against `/my/records`, `/my/records/test-record`, and `/my/summary`. The screenshots show the same `RecordsWorkspaceShell` header pattern, route-appropriate active nav pill, visible route identity, and non-crowded first viewport on all three routes. In the available browser context the pages remain in loading-state UI rather than authenticated content, so this pass does not yet verify content-state CTA hierarchy or post-load route continuity.
- `Impact`: The earlier runtime-startup blocker is no longer the active risk. Phase 2 now has direct viewport evidence for shell/header consistency and mobile readability on accessible loading states, which narrows the remaining uncertainty to signed-in content states only.
- `Priority`: `P1`
- `Decision`: carry forward
- `Validation needed`: rerun the desktop/mobile pass in a signed-in browser context so `/my/records`, `/my/records/[id]`, and `/my/summary` can be checked for authenticated content-state density, CTA hierarchy, and route-to-route continuity.
- `Carry-forward`: treat runtime access as unblocked and keep Phase 2 open only for the final authenticated content-state sanity pass; do not widen scope beyond the locked `/my` routes.

### `P2-F09`
- `Finding`: Local development can now bypass Firebase auth for protected-route validation through a development-only QA email/password sign-in path.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`, `/templates/[slug]`, `/my/settings`
- `Evidence`: `useAuthUser` now signs in with `signInWithEmailAndPassword` when `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true`, `NODE_ENV === 'development'`, and the browser hostname is `localhost` or `127.0.0.1`. The default credentials match the documented canonical QA account in `docs/guides/QA_TEST_ACCOUNTS.md`, and optional env overrides can swap email, password, or expected UID if needed.
- `Impact`: This creates a real Firebase Auth session for local validation without server-side token signing complexity, which is enough for Firestore rules that depend on authenticated Firebase requests.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: restart the running dev server with the new env flags and rerun desktop/mobile protected-route checks to confirm the bypass reaches authenticated content states instead of loading-only states.
- `Carry-forward`: use the bypass only for local development validation; keep production and non-local development auth unchanged.

### `P2-F10`
- `Finding`: The QA-account dev auth bypass is loaded in the restarted app, but headless browser validation still does not settle into authenticated state.
- `Affected routes`: `/my/settings`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: After the user restarted the local server, repeated headless Chrome screenshots against `localhost:3040` still showed loading-state UI on `/my/settings`, `/my/records`, and `/my/summary` even with extended virtual-time waits. This means the browser automation context is not reaching the post-authenticated steady state yet, so the validation pass cannot truthfully assess content-state CTA hierarchy, density, or route continuity.
- `Impact`: Phase 2 is no longer blocked by runtime startup or by the absence of a QA login path, but it is still blocked by unresolved dev-auth settling behavior in browser automation. Until that is fixed, the final authenticated content-state closeout remains unverified.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: inspect why headless browser sessions remain on loading-state UI after the QA-account sign-in path runs, then rerun desktop/mobile checks for `/my/records`, `/my/records/[id]`, and `/my/summary`.
- `Carry-forward`: treat this as the next bounded Phase 2 implementation step; do not widen scope beyond making the dev-auth validation path reach authenticated steady state.

### `P2-F11`
- `Finding`: The dev QA-account bypass now fails fast instead of hanging indefinitely if browser automation cannot complete sign-in cleanly.
- `Affected routes`: `/my/settings`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: `useAuthUser` now sets Firebase auth persistence to `inMemoryPersistence` before the QA-account sign-in attempt and wraps `signInWithEmailAndPassword` in an 8-second timeout. It also throws if the signed-in user UID does not match the expected bypass UID. This narrows the previous ambiguous “loading forever” state into a bounded failure mode that should surface through existing auth error UI.
- `Impact`: Browser automation reruns should now reveal whether the remaining blocker is slow/stuck Firebase sign-in, wrong QA credentials/project binding, or unexpected account identity, which makes the final Phase 2 closeout path much clearer.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: restart the dev server with the updated hook and rerun protected-route checks to confirm whether the pages now reach authenticated content or show an explicit auth error.
- `Carry-forward`: use the surfaced result from the rerun as the next truthful branch point; do not make broader route changes until this auth-path ambiguity is resolved.

### `P2-F12`
- `Finding`: Even with in-memory persistence and the bounded sign-in timeout in place, headless browser reruns still remain on loading-state UI instead of reaching authenticated content or surfacing auth error UI.
- `Affected routes`: `/my/settings`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: After the user restarted the local server with the tightened dev-auth hook, fresh headless Chrome screenshots against `localhost:3040` still showed `설정 화면을 준비하고 있습니다.` on `/my/settings` and `기록 목록을 준비하는 중입니다.` on `/my/records`. This means the browser automation session still does not transition out of loading after the QA-account auto sign-in attempt.
- `Impact`: The remaining blocker is now clearly inside the dev-auth/browser-settling path itself. Phase 2 cannot be closed honestly until authenticated browser sessions either reach steady state or fail into visible auth error UI that can be fixed directly.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: inspect why `useAuthUser` stays in loading under headless validation after the QA-account sign-in attempt, then rerun desktop/mobile checks for `/my/records`, `/my/records/[id]`, and `/my/summary`.
- `Carry-forward`: keep the next slice narrowly focused on surfacing or resolving this auth-settling issue; do not widen back into route redesign work.

### `P2-F13`
- `Finding`: Headed Chrome validation confirms that the locked Phase 2 `/my` routes now behave as one authenticated workspace at both desktop and mobile widths.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: With the local app running on `http://127.0.0.1:3040`, headed Chrome was launched with DevTools remote debugging and authenticated through the development QA-account auto sign-in path. DevTools screenshots were captured for `/my/records`, `/my/records/[id]` (sample record `LPg8cUVqnrJc9i99IwpH`), and `/my/summary` at desktop (`1440x1200`) and mobile (`390x844`) widths. The captures show the same shared workspace shell/header pattern, route-aware top navigation, Korean route framing copy, consistent CTA hierarchy, and readable first viewport with a primary action visible on narrow widths. The record detail screen also exposes the expected return path back to templates/records inside the shared workspace framing.
- `Impact`: Phase 2 closeout is no longer blocked. The user-facing success checks for authenticated workspace coherence across the locked `/my` routes are now directly verified in a real headed browser session.
- `Priority`: `P0`
- `Decision`: close `Phase 2`
- `Validation needed`: none for Phase 2 closeout. If future automation depends on headless auth parity, treat that as a separate tooling follow-up rather than reopening this phase.
- `Carry-forward`: start Phase 3 from the next documented epic priority without reopening the locked `/my` workspace slice unless a fresh contradiction is discovered.

## 8. Locked Phase 3 target

- `Target`: shift `/my/records`, `/my/records/[id]`, and `/my/summary` toward the warmer brand language already established on `/`, `/templates`, and `/templates/[slug]`
- `Why this goes next`: Phase 2 closed the authenticated workspace coherence gap, which makes the next most visible product-level mismatch the jump in color language and visual tone between the public discovery routes and the locked workspace routes.
- `Planned scope`: align color/surface language, hero and shell atmosphere, and top-level route framing so the journey into `/my` feels recognizably IBNote without broad redesign.
- `Explicit exclusions`: no auth/data behavior work, no broad IA rewrite, no reopening of locked Phase 2 route mechanics unless a fresh contradiction is discovered, and no expansion into unrelated routes.
- `Success checks`: public and locked routes should feel intentionally related, preserve route-purpose clarity, avoid a subsystem jump at sign-in, and remain readable on mobile.

## 9. Next expected update

Begin the bounded Phase 3 audit and implementation slice by treating the public discovery routes as the visual source of truth, then selectively restyling the closed Phase 2 workspace surfaces so they inherit that warmer language without losing the verified shell/navigation clarity.

## 10. Phase 3 audit findings

Status: audit completed on 2026-03-25 from actual route implementation plus stored route-screen references.

### `P3-F01`
- `Finding`: The shared `/my` page frame still establishes a colder subsystem before any route-specific content appears.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: All three locked routes still wrap content in `bg-stone-100` page frames, and their shared `RecordsWorkspaceShell` uses white/slate framing with black active pills rather than the orange/cream baseline used on `/`, `/templates`, and `/templates/[slug]` ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx#L87), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L52), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L31), [records-workspace-shell.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-workspace-shell.tsx#L19)). Public routes instead open on `bg-background-light` with orange accent borders, soft white cards, and warm pill treatment ([page.tsx](/Users/junwon/projects/esanzy87/ibnote/src/app/page.tsx#L41), [template-library-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-library-client.tsx#L82), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L61)).
- `Impact`: Even before users evaluate route content, the locked workspace announces “different product” through its shell and background tone. This is now the highest-leverage continuity gap because Phase 2 already solved route identity and nav consistency.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: confirm that rewarming the shared shell preserves active-route contrast and keeps the nav readable on mobile.
- `Carry-forward`: start Phase 3 with shared shell/background retheming before touching route-specific hero sections.

### `P3-F02`
- `Finding`: `/my/records` and `/my/records/[id]` still rely on dark hero bands that conflict with the public journey's lighter, warmer top-of-page atmosphere.
- `Affected routes`: `/my/records`, `/my/records/[id]`
- `Evidence`: `RecordsHero` uses a dark slate gradient with white stats cards, and `EntryIntro` uses a similar dark horizontal gradient plus monochrome chips ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx#L113), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L166)). By contrast, the public library and detail routes rely on cream backgrounds, orange badges, light cards, and image-led or pale hero surfaces ([template-library-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-library-client.tsx#L86), [template-card.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-card.tsx#L13), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L61)).
- `Impact`: These hero sections are the strongest single contributors to the “dashboard jump” when moving from template discovery into writing and revisit.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: compare first-view impressions after hero restyling to ensure the record list/editor still communicate route purpose immediately.
- `Carry-forward`: Phase 3 should replace dark hero emphasis with lighter warm panels and orange-led badge/CTA hierarchy.

### `P3-F03`
- `Finding`: `/my/summary` is partially aligned but still visually cooler than the public baseline in its frame, empty/error actions, and supporting cards.
- `Affected routes`: `/my/summary`
- `Evidence`: `SummaryOverview` already uses `from-white via-stone-50 to-amber-50`, but the surrounding page still uses `bg-stone-100`, many supporting cards stay `border-stone-200 bg-stone-50`, and empty/error branches continue to use black or rose-heavy action treatment instead of the public primary/secondary button rhythm ([summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L31), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L195), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L238), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L289)).
- `Impact`: Summary is the closest locked route to the desired tone, so it should be treated as a finish pass rather than a redesign. That makes it a good proving ground for the shared surface system after shell retheming.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: confirm that the lighter summary treatment still preserves emphasis for key stats and error recovery actions.
- `Carry-forward`: apply shell retheming first, then do a smaller route-specific pass on summary cards and CTA hierarchy.

### `P3-F04`
- `Finding`: Secondary cards, filters, and metadata chips across the locked `/my` routes still read as neutral utility panels instead of warm companion surfaces.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: Filters, metadata panels, guide cards, rating cards, and summary basis cards rely heavily on `border-stone-200`, `bg-white`, and `bg-stone-50` utility styling ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx#L247), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L201), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L283), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L316), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L297), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L316)). Public surfaces instead use warm tinted backgrounds, low-contrast orange borders, and softer CTA fills for guidance and support blocks ([template-library-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-library-client.tsx#L97), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L91), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L108), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L142)).
- `Impact`: If Phase 3 changes only the shell and heroes, the product will still feel split once users scroll into actual work. Supporting surfaces need a second-pass system cleanup to finish the illusion of one product language.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: verify that warmer tinted cards do not reduce scannability for dense content like filters, competency ratings, and metric grids.
- `Carry-forward`: schedule a focused follow-up pass after shell and hero retheming to harmonize internal surfaces.

### `P3-F05`
- `Finding`: The current Phase 3 plan could still fail by importing public-route warmth too literally and accidentally weakening route clarity, selected-state contrast, or dense-data scannability.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: The shared shell currently depends on a black active pill for route emphasis ([records-workspace-shell.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-workspace-shell.tsx#L33)); the record list hero carries crucial summary-window context inside a dark hero block ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx#L121)); the editor uses strong contrast in the intro band and selected rating buttons to communicate stage and selection state ([record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L172), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx#L343)); and the summary route depends on contrast in counts, bars, and CTA pairs to keep dense information readable ([summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L250), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx#L315)).
- `Impact`: Without explicit guardrails, a “warmer is better” pass could produce a superficially more coherent UI that is actually less usable in the working parts of the product.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: require route-specific acceptance gates for shell contrast, first-view CTA visibility, selected-state clarity, and authenticated content-state verification before Phase 3 can close.
- `Carry-forward`: treat the red-team constraints as part of the Phase 3 execution spec, not as optional advice.

### `P3-F06`
- `Finding`: Top-bar continuity is still broken across the Phase 3 route set, and that header absence is itself a visible product-fragmentation issue.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: `/` already renders a sticky top navigation bar with IBNote branding and a login action ([page.tsx](/Users/junwon/projects/esanzy87/ibnote/src/app/page.tsx#L43)), but `/templates` currently starts directly at page content with no matching top bar ([template-library-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-library-client.tsx#L82)), and `/templates/[slug]` similarly starts directly at the detail hero/content stack ([protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L59)). The locked `/my` routes begin with `RecordsWorkspaceShell`, which gives workspace-local navigation but not a clearly global top-of-product anchor ([records-workspace-shell.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-workspace-shell.tsx#L19)).
- `Impact`: Even if colors and surfaces are aligned, users will still feel a seam if core routes inconsistently have or lack a top brand/navigation bar. This is a structural continuity issue, not just a cosmetic one.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: confirm that Phase 3 introduces or restores a coherent top-of-page anchor without creating double-header crowding on the locked `/my` routes.
- `Carry-forward`: treat top-bar continuity as an explicit first implementation step in Phase 3 before shell/hero warmth refinements.

### `P3-F07`
- `Finding`: Phase 3 top-bar continuity is now restored across the public discovery and locked workspace route set without collapsing the `/my` first viewport into competing headers.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: A new shared `GlobalTopBar` now anchors the route set, with `/` switched from its inline home-only header, `/templates` and `/templates/[slug]` wrapped in the same brand/navigation bar, and `/my/records`, `/my/records/[id]`, plus `/my/summary` placing a lighter workspace variant above `RecordsWorkspaceShell` ([global-top-bar.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/navigation/global-top-bar.tsx), [page.tsx](/Users/junwon/projects/esanzy87/ibnote/src/app/page.tsx), [template-library-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-library-client.tsx), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx), [records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx)). `npm run lint` passed after the change, and a headed Chrome pass against `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true` captured desktop (`1440x1200`) and mobile (`390x844`) screenshots for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, showing the restored top anchor plus authenticated content-state first views on the locked `/my` routes.
- `Impact`: The public discovery flow and locked workspace now feel like one product family at the very top of the page, which removes the most structural continuity break before any warmer retheming work begins.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: keep using the headed desktop/mobile route set during `P3-03`+ so the new top anchor stays subordinate to workspace-local hierarchy while the `/my` shell warms up.
- `Carry-forward`: move to `P3-03` next by rewarming the shared `/my` shell and page frame, using the restored top bar as the continuity baseline rather than reopening header mechanics.

### `P3-F08`
- `Finding`: The shared `/my` shell and page frame now inherit the public route warmth without giving up the stronger Phase 2 route hierarchy.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: The three locked `/my` page frames now use a cream gradient instead of `bg-stone-100`, and their top-level non-error `Surface` states plus `RecordsWorkspaceShell` now use warmer `primary`-tinted borders/fills with an orange active pill rather than white/slate framing and a black active pill ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx), [records-workspace-shell.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-workspace-shell.tsx)). A headed Chrome validation pass against `http://127.0.0.1:3040` at `1440x1200` and `390x844` for `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary` showed a warmer shell/frame on both widths, with the active nav pill still the highest-contrast control and the shell title plus route-family label staying readable on mobile.
- `Impact`: The locked workspace now feels materially closer to the public discovery baseline before users even reach the darker route-specific heroes, which means the remaining discontinuity is concentrated in the hero/CTA language rather than the whole subsystem frame.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: when restyling heroes next, keep checking that the warmed shell still outranks inactive pills and that the now-lighter shell does not get visually swallowed by route-specific hero treatment.
- `Carry-forward`: move to `P3-04` next and replace the dark record heroes / black-primary CTA hierarchy, using the warmed shell/frame as the non-negotiable baseline.

### `P3-F09`
- `Finding`: The record-list and record-editor first views now use warmer public-descendant hero language, and their first primary actions are finally explicit in the first viewport instead of hiding below darker work surfaces.
- `Affected routes`: `/my/records`, `/my/records/[id]`
- `Evidence`: `RecordsHero` now uses a warm cream/orange gradient with orange primary/soft secondary CTA buttons inside the hero while still spelling out the active summary window, and the record-list top CTA blocks now follow the same orange-primary hierarchy instead of black-filled pills ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx)). `EntryIntro` now uses a warm hero panel with lighter stage pills plus a direct jump CTA to the writing form, and the editor's missing-record CTA pair now follows the same orange-primary / warm-secondary rhythm ([record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx)). A headed Chrome validation pass against `http://127.0.0.1:3040` at `1440x1200` and `390x844` for `/my/records` and `/my/records/lUNzWkHKzC5441JlUmdQ` confirmed that summary-window context remains visible on the record list, record-stage / write-edit intent remains immediate on the editor, and the new orange primary CTA remains stronger than the nearby status chips or metadata.
- `Impact`: The discovery-to-workspace handoff now feels substantially less like a jump into a dashboard. The remaining mismatch is no longer the hero band itself but the neutral supporting surfaces underneath it.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: carry the same desktop/mobile route set into `P3-05` so warmer support cards do not overpower selected states or flatten dense information.
- `Carry-forward`: move to `P3-05` next and harmonize filters, guidance cards, metadata panels, rating controls, and summary support surfaces while preserving scannability.

### `P3-F10`
- `Finding`: The locked `/my` supporting surfaces now follow the public route warmth more consistently while keeping dense operational states scannable.
- `Affected routes`: `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: The records list now warms its filter shell, empty state, revisit cards, record cards, and neutral summary-window badges; the editor now warms section frames, metadata panels, guide cards, form inputs, checklist shells, rating groups, and save/submit CTA hierarchy; and the summary route now warms its basis cards, metric cards, recent-record cards, empty-state CTA pair, and bar/card surfaces without recoloring the semantic grade/status chips into one flat tone ([records-list-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/records-list-client.tsx), [record-editor.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/records/record-editor.tsx), [summary-page-client.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/summary/summary-page-client.tsx)).
- `Impact`: After the shell and hero work landed, these supporting surfaces were the last major reason the locked workspace still felt like a parallel utility system. Their alignment now makes the whole `/my` slice read more deliberately as one product family.
- `Priority`: `P1`
- `Decision`: fix now
- `Validation needed`: close Phase 3 with direct route comparison and at least one representative empty/content-state check so the warmer support tint is judged in actual use rather than code review only.
- `Carry-forward`: run `P3-06` against the full route comparison set and only close Phase 3 if selected-state contrast, dense-data readability, and empty-state hierarchy still hold.

### `P3-F11`
- `Finding`: Phase 3 exit conditions are now satisfied for the locked route slice.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, `/my/summary`
- `Evidence`: A final headed Chrome pass against `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true` captured desktop (`1440x1200`) and mobile (`390x844`) screenshots for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, plus full-page screenshots for `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, `/my/summary`, and a representative filtered-empty `/my/records` state. The screenshots confirm restored top-bar continuity across the public and locked routes, warmer public-descendant first views on the locked `/my` routes, authenticated content-state behavior for `/my/records`, `/my/records/[id]`, and `/my/summary`, visibly selected rating controls in the editor, readable summary counts/bars/cards, and a representative empty-state CTA hierarchy that stays stronger than the decorative tint. `npm run lint` also passed after the final support-surface pass.
- `Impact`: Phase 3 can now close honestly. The public discovery flow and the locked workspace routes in scope no longer feel like separate products at the top, shell, hero, or supporting-surface layers.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: none for Phase 3 closeout.
- `Carry-forward`: keep Phase 3 closed, preserve this visual baseline, and use Phase 4 to secure the missing public-route image assets and replace the remaining placeholder/icon-only imagery on `/`, `/templates`, and `/templates/[slug]`, first by attempting Codex-side generation in the default environment and then by falling back to user-generated external outputs delivered back into the repo when direct generation is unavailable.

### `P4-F01`
- `Finding`: Phase 4 asset procurement can now proceed through a concrete bounded external-generation handoff even without `OPENAI_API_KEY` in the current Codex environment.
- `Affected routes`: `/`, `/templates`, `/templates/[slug]`
- `Evidence`: The current public routes still rely on one homepage hero placeholder, three homepage example-card icon slots, template-library card placeholders, and template-detail hero placeholders in the live code ([page.tsx](/Users/junwon/projects/esanzy87/ibnote/src/app/page.tsx#L77), [page.tsx](/Users/junwon/projects/esanzy87/ibnote/src/app/page.tsx#L128), [template-card.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/template-card.tsx#L17), [protected-template-detail.tsx](/Users/junwon/projects/esanzy87/ibnote/src/components/templates/protected-template-detail.tsx#L86)). The updated handoff document at [014_phase4_image_asset_prompt_pack.md](/Users/junwon/projects/esanzy87/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase4_asset_handoff/014_phase4_image_asset_prompt_pack.md) now defines the bounded asset set as nineteen files: one homepage hero image, three homepage example-card images, and fifteen slug-specific template images that can be reused between `/templates` cards and their matching `/templates/[slug]` heroes without making the library grid feel repetitive.
- `Impact`: Phase 4 no longer depends on in-session image generation to move forward, and the asset strategy now better matches the template-library browsing experience by avoiding repeated cluster imagery across many cards. James can generate the exact bounded asset set externally and return only the selected final files into `docs/inbox/` for implementation.
- `Priority`: `P0`
- `Decision`: fix now
- `Validation needed`: Confirm that all nineteen expected filenames appear in `docs/inbox/` before wiring assets into the routes.
- `Carry-forward`: once the inbox files exist, move directly into `P4-03` route integration without reopening the bounded asset list.
