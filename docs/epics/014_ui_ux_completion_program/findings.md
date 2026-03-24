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
