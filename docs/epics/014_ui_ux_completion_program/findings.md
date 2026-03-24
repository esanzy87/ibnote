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

- `Target`: public-to-locked brand continuity across `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`
- `Why this goes next`: Phase 2 closed the authenticated workspace coherence gap, which makes the next most visible product-level mismatch the jump in color language and visual tone between the public discovery routes and the locked workspace routes.
- `Planned scope`: align color/surface language, hero and shell atmosphere, and top-level route framing so the journey into `/my` feels recognizably IBNote without broad redesign.
- `Explicit exclusions`: no auth/data behavior work, no broad IA rewrite, no reopening of locked Phase 2 route mechanics unless a fresh contradiction is discovered, and no expansion into unrelated routes.
- `Success checks`: public and locked routes should feel intentionally related, preserve route-purpose clarity, avoid a subsystem jump at sign-in, and remain readable on mobile.

## 9. Next expected update

Begin the bounded Phase 3 audit and implementation slice for public-to-locked brand continuity, using the closed Phase 1 image-direction evidence and the now-verified Phase 2 workspace shell as the visual anchors.
