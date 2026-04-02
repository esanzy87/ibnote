# IBNote 014 UI/UX Completion Program Spec

Version: 0.1
Date: 2026-03-24
Owner: agent-authored docpack
Status: Active
Depends on:
- `013_records_surface_stitch_polish`

## 1. Implementation intent

014 is a rolling UI/UX completion program, not a single fixed-scope implementation package.

Its purpose is to improve overall finish quality through repeated bounded phases that follow the same loop:
1. inspect current product reality
2. define one bounded improvement slice
3. implement and validate that slice
4. record findings from real outcomes
5. write the next phase brief from those findings

## 2. Operating model for this epic

### 2.1 Epic lifecycle rule

014 remains the active UI/UX improvement epic until James explicitly says to close it.
Do not auto-close 014 just because one phase finishes.

### 2.2 Phase progression rule

Every phase should produce three durable outputs inside this docpack:
- a completed task ledger entry in `todo.md`
- a findings entry in `findings.md`
- a next-phase brief in this `spec.md` before the next implementation slice begins

Each phase should also pass two checks before it is treated as complete:
- a bounded scope check: the audited or implemented surface set is explicitly named
- a rollover check: the next phase brief is grounded in concrete findings rather than intuition

### 2.3 Documentation update rule

When a phase changes state, next action, or blocker truth:
1. update `docs/BLACKBOARD.md` first
2. sync `todo.md`
3. sync `findings.md` when new evidence or decisions were produced
4. sync `spec.md`
5. sync `prd.md` only if epic framing or durable purpose changed

## 3. Quality lens for phase selection

The highest-value next phase should usually improve one or more of the following:
- start clarity
- route orientation
- information hierarchy
- interaction continuity
- recovery from confusion or hesitation
- cross-route visual/system coherence
- mobile readability and density control
- brand presence and logo consistency
- image/illustration quality where imagery materially affects comprehension or finish quality

Reject or defer candidate work that is mostly:
- cosmetic without user-flow leverage
- broad redesign without bounded validation
- new feature expansion disguised as polish
- inconsistent with IBNote's calm, humane parent-facing tone
- large asset generation before style direction is validated on representative screens

## 4. Current phase brief

### Phase 1 - baseline audit and first bounded slice selection

Phase 1 objective:
- inspect the current product for the most important UI/UX finish-quality gaps
- convert those gaps into a prioritized candidate list
- choose one bounded implementation slice for follow-through
- define the success checks that will determine whether the slice actually improved the experience
- identify where brand/logo inconsistency or missing imagery is materially weakening perceived product completeness

Phase 1 expected outputs:
- an audited view of the highest-friction or lowest-finish surfaces
- a ranking rationale for why the chosen slice should go first
- a locked first implementation target that is small enough to execute safely
- a dedicated findings record in `findings.md`
- a draft brief for Phase 2 that can be refined after Phase 1 findings exist

Phase 1 live status as of 2026-03-24:
- Gate A is complete
- Gate B is complete after a capped manual pilot validated representative discovery/template image direction
- the first bounded implementation target is locked to authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`
- Phase 1 is complete and ready to hand off into the locked Phase 2 implementation slice

Phase 1 initial focus areas:
- parent-facing core routes rather than edge/admin/system surfaces
- visible UX friction with meaningful leverage
- finish-quality gaps that affect perceived product completeness
- one small representative `imagegen` pilot only if asset direction needs validation before broader rollout

### Phase 1 gates

#### Gate A - audit lock

Gate A is complete only if all are true:
- the Phase 1 audit route set is explicitly reviewed
- findings are recorded in `findings.md` with route-level evidence
- the candidate list for the first bounded slice is ranked rather than merely listed

Gate A completion status:
- completed on 2026-03-24 using the locked minimum route set
- evidence and candidate ranking are recorded in `findings.md`
- the locked first bounded slice is the authenticated workspace coherence pass across `/my/records`, `/my/records/[id]`, and `/my/summary`

#### Gate B - bounded pilot lock

Gate B is optional and should open only if Gate A findings show that missing or weak imagery is materially hurting completion quality.

If Gate B opens, it is complete only if all are true:
- the pilot asset set stays within the explicit Phase 1 pilot cap
- the pilot is limited to representative routes only
- the pilot is used to validate direction, not to silently expand into broad asset production

Gate B status:
- complete
- justification: `findings.md` entry `P1-F04`
- current output: manual prompt pack at [014_phase1_gate_b_image_prompt_pack.md](/home/dev/projects/ibnote/docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014_phase1_gate_b_image_prompt_pack.md)
- current unblock: `findings.md` entry `P1-F06`
- final review result: `findings.md` entry `P1-F08`
- next step: none inside Phase 1

### Phase 1 audit route set

Phase 1 should audit this minimum parent-facing route set:
- `/`
- `/login`
- `/templates`
- `/templates/[slug]`
- `/my/records`
- `/my/records/[id]`
- `/my/summary`
- `/reset-password`

Additional routes may be reviewed, but Phase 1 should not be considered complete until the minimum set above is covered.

### Phase 1 audit dimensions

Use Phase 1 to inspect at least these dimensions:
- color and surface-token consistency across pages
- tone-and-manner consistency in parent-facing copy
- style-collapse or stale-design residue across routes
- hierarchy and composition quality, including hero/orientation/action separation
- density and mobile readability
- component reuse drift and affordance consistency
- interaction continuity across the main parent journey
- image-asset integrity, placeholder presence, and narrative usefulness
- brand presence and logo-usage consistency

### Phase 1 image/asset rule

Phase 1 may include image work, but only in this bounded form:
- audit missing, empty, weak, or placeholder-like assets
- define the desired visual thesis for generated assets
- create only a small pilot set of representative assets, or a manual prompt handoff that stays within the same cap, if direct generation is intentionally delegated outside the repo workflow

Phase 1 pilot cap:
- at most 3 generated assets
- only for representative parent-facing routes from the Phase 1 audit set
- intended to validate direction, not to finish all remaining asset work
- broader rollout or batch generation must wait for the next phase brief

Do not treat Phase 1 as the batch-production phase for all assets.
Broader generation should wait until the pilot direction is validated.

## 5. Next phase brief

### Phase 2 brief

Phase 2 target:
- authenticated workspace coherence across `/my/records`, `/my/records/[id]`, and `/my/summary`

Phase 2 objective:
- unify the authenticated `/my` journey into one recognizable IBNote workspace rather than three adjacent surfaces with different orientation patterns
- strengthen brand presence, route continuity, and calmer parent-facing tone across record list, record editor, and summary
- align shell, CTA treatment, and section framing without reopening unrelated routes or broad redesign work

Phase 2 planned scope:
- create or refine one shared workspace shell/header pattern that clearly anchors `/my/records`, `/my/records/[id]`, and `/my/summary`
- make navigation affordances, entry points, and return paths feel consistent across the main parent loop
- remove remaining admin-like or English residue across records list, record editor, and summary where it weakens the calm parent-facing voice
- harmonize major surface, hero, and CTA treatment enough that the three routes read as one product journey

Phase 2 allowed changes:
- shell/header composition for the locked `/my` routes
- workspace navigation pattern, active-state treatment, and route-to-route return links
- primary and secondary CTA hierarchy, labels, and shared styling on the locked routes
- top-level route headings plus loading, empty, error, and guidance copy on the locked routes
- outer section framing and hero treatment where needed to align the three locked routes into one workspace identity

Phase 2 non-goals inside the locked routes:
- no changes to data models, persistence, or authentication behavior
- no changes to record filtering logic, summary calculation logic, or ordering semantics
- no changes to the record editor input schema, field set, or submission rules
- no restructuring of record cards or summary metrics in ways that change what information is shown
- no image rollout, brand-asset expansion, or new public-route polish beyond what is already documented

Phase 2 exclusions:
- no homepage redesign
- no batch generation of more public/template images
- no expansion into `/my/settings` or unrelated routes unless Phase 2 work reveals a direct blocker inside the locked scope

Phase 2 success checks:
- `/my/records`, `/my/records/[id]`, and `/my/summary` each expose the same recognizable workspace shell/header pattern
- the locked `/my` routes expose one consistent navigation affordance set for records, summary, and template return paths where relevant
- English UI residue is removed from headings, labels, guidance copy, and loading/error/empty states on the locked routes
- primary and secondary CTA styling follows one shared hierarchy across the locked routes
- users can move between records, summary, and templates without the experience feeling like separate subsystems
- mobile readability remains acceptable after shell alignment, including a first viewport that still surfaces route identity, key navigation, and at least one primary action without excessive crowding

Phase 2 verification notes:
- verify the locked routes at desktop and mobile widths
- judge completion against the concrete checks above, not against an open-ended “feels more polished” standard
- if a proposed change requires altering behavior or information architecture outside the allowed changes, stop and document it as out of scope rather than widening the phase silently

Phase 2 evidence basis:
- carry forward `P1-F01`, `P1-F02`, and `P1-F03` as primary implementation drivers
- treat `P1-F08` as supporting evidence only, not as a mandate for immediate additional image production

Phase 2 execution status (current step):
- completed: `/my/summary` now renders the shared `RecordsWorkspaceShell` with `active="summary"` in loading/error/empty/content states (`findings.md` `P2-F01`).
- completed: `/my/records/[id]` key loading/error/missing/admin-state copy and privacy guidance has been localized and aligned to parent-facing Korean language (`findings.md` `P2-F02`).
- completed: `/my/records` non-content states now use the shared workspace frame and `RecordsWorkspaceShell` so the `/my` route family keeps a consistent shell through auth/loading/error/redirect transitions (`findings.md` `P2-F03`).
- completed: `/my/records/[id]` non-content states now use `RecordEditorFrame` with `RecordsWorkspaceShell active="records"` so editor auth/loading/error/missing/redirect transitions remain inside the locked workspace shell (`findings.md` `P2-F04`).
- completed: `/my/summary` redirect state now renders inside `SummaryWorkspaceFrame` to preserve shell continuity on `unauthenticated` transitions.
- completed: `/my/records` content now renders `RecordsWorkspaceShell` before the page hero, so first-viewport identity remains on the shared shell across all three locked routes.
- completed: a host-side headless validation pass now confirms that `/my/records`, `/my/records/[id]`, and `/my/summary` each expose the shared workspace shell and readable first-viewport loading states at both desktop and mobile widths.
- completed: a development-only local auth bypass is now available in the client auth hook for `localhost` development sessions when `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true`, using the documented QA email/password account for real Firebase sign-in.
- completed: the development QA-account auto sign-in path now sets Firebase auth persistence to in-memory storage and applies an explicit sign-in timeout plus UID mismatch guard, so headless validation should surface a concrete auth error instead of hanging in loading indefinitely if the bypass still fails.
- completed: a headed Chrome validation pass now confirms authenticated content-state behavior for `/my/records`, `/my/records/[id]`, and `/my/summary` at desktop and mobile widths, including shared shell/header continuity, visible route identity, route-aware nav pills, calm Korean top-level guidance, and acceptable first-viewport CTA density.
- completed: Phase 2 success checks are now satisfied for the locked `/my` routes. A headless auth-settling mismatch remains as a tooling-specific follow-up candidate, but it does not contradict the user-facing Phase 2 outcome verified in headed Chrome.
- next: keep Phase 2 closed and choose the next bounded Phase 3 slice from the remaining epic program work before making any further route changes.
- blocker: none for Phase 2 closeout.

### Future phase briefs

Append new sections sequentially:
- `Phase 3 brief`
- `Phase 4 brief`
- and so on

Do not overwrite earlier phase briefs once they become part of the decision chain.

### Phase 3 brief

Phase 3 target:
- shift the authenticated `/my` workspace visual language toward the public discovery baseline defined by `/`, `/templates`, and `/templates/[slug]`

Phase 3 objective:
- make `/my/records`, `/my/records/[id]`, and `/my/summary` feel like a continuation of the warm parent-facing discovery journey instead of a separate calmer subsystem
- treat `/`, `/templates`, and `/templates/[slug]` as the visual baseline for color, surface warmth, and top-level tone unless a Phase 2 clarity gain would be lost

Phase 3 planned scope:
- restore a coherent top-of-page brand/navigation anchor across the public discovery routes and the locked `/my` workspace routes where header absence currently makes the journey feel broken
- restyle `/my/records`, `/my/records/[id]`, and `/my/summary` so their shells, hero surfaces, and panel framing inherit the warmer color-language already established on `/`, `/templates`, and `/templates/[slug]`
- tighten typography, surface treatment, and section framing so the locked workspace reads as a continuation of the public journey rather than a parallel design system
- preserve the stronger workspace coherence achieved in Phase 2 while replacing the remaining stone/slate heaviness that now makes the handoff feel abrupt

Phase 3 allowed changes:
- bounded top-bar/header treatment adjustments on `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary` where needed to restore brand and navigation continuity without changing route purpose
- route-level color tokens, gradients, panel backgrounds, and accent usage on `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`
- bounded shell/hero visual treatment adjustments on the locked `/my` routes that pull them toward the public-route baseline without changing route purpose
- top-level route framing copy where minor tone adjustment is required to make the transition from discovery to workspace feel continuous

Phase 3 non-goals:
- no changes to authentication, data models, persistence, filtering, summary logic, or editor schema
- no route expansion beyond the documented public discovery routes plus the already-locked `/my` workspace routes
- no broad information architecture rewrite, template taxonomy rewrite, or asset-generation program
- no reopening of Phase 2 shell/navigation mechanics unless a fresh contradiction is directly discovered

Phase 3 success checks:
- no core Phase 3 route is missing an intentional top-bar or equivalent global brand/navigation anchor
- `/my/records`, `/my/records/[id]`, and `/my/summary` visibly inherit the warmer visual language already established on `/`, `/templates`, and `/templates/[slug]`
- the discovery-to-workspace handoff no longer feels like a jump into a separate darker product
- shared color and surface language strengthens IBNote recognition while preserving the route clarity gains closed in Phase 2
- mobile readability remains acceptable on both public and locked routes after any continuity adjustments

Phase 3 verification notes:
- compare top-bar/header presence and continuity across `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`
- compare desktop and mobile first-view impressions across at least one public route and each locked `/my` route to confirm the locked surfaces now read as descendants of the public baseline
- verify that pulling the locked workspace toward the public language does not erase the workspace clarity gains closed in Phase 2

### Phase 3 route audit summary

Audit basis:
- implementation review of `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`
- stored route references under `docs/stitch_screens/`

Observed public-route baseline:
- `/` uses `bg-background-light`, orange `primary` accents, soft white cards, ambient glow, and light CTA treatment rather than dark hero framing (`src/app/page.tsx`)
- `/templates` uses the same cream background, orange pill filters, pale guidance bands, and airy white card grid (`src/components/templates/template-library-client.tsx`, `src/components/templates/template-card.tsx`)
- `/templates/[slug]` keeps the same warm language with image-led hero, orange metadata pills, pale utility cards, and orange-outlined secondary action (`src/components/templates/protected-template-detail.tsx`)

Observed locked-route mismatches:
- `/templates` and `/templates/[slug]` currently lack the clear sticky top navigation/brand bar that exists on `/`, while the locked `/my` routes begin directly with `RecordsWorkspaceShell`, leaving the overall journey without one consistent top-of-page anchor (`src/app/page.tsx`, `src/components/templates/template-library-client.tsx`, `src/components/templates/protected-template-detail.tsx`, `src/components/records/records-workspace-shell.tsx`)
- `/my/records` still opens on `bg-stone-100` and a dark slate gradient hero, which makes the route read more like a dashboard than a continuation of the public discovery flow (`src/components/records/records-list-client.tsx`)
- `/my/records/[id]` shares the same stone page frame and dark hero band in `EntryIntro`, so the editor inherits Phase 2 coherence but not public-route warmth (`src/components/records/record-editor.tsx`)
- `/my/summary` is closer to the target because `SummaryOverview` already introduces amber tinting, but the route still sits inside the cooler `bg-stone-100` frame and keeps black primary CTA usage in empty/error branches (`src/components/summary/summary-page-client.tsx`)
- the shared `RecordsWorkspaceShell` still uses white/slate pills and a black active state, so every locked route announces a colder subsystem before any route-specific content appears (`src/components/records/records-workspace-shell.tsx`)

Concrete implementation plan:

1. Top-bar continuity restore
- decide one bounded top-bar pattern for Phase 3 routes: a public-style sticky brand bar for `/`, `/templates`, and `/templates/[slug]`, plus a compatible locked-route top anchor that coexists cleanly with `RecordsWorkspaceShell`
- add or restore the missing public-route top bar on `/templates` and `/templates/[slug]`
- ensure the locked `/my` routes expose a clear global IBNote anchor at the top without duplicating or fighting the workspace shell beneath it

2. Shared `/my` shell and page frame rewarm
- change the shared `/my` page backgrounds from `bg-stone-100` to the same cream family used on public routes
- restyle `RecordsWorkspaceShell` so its container, label, and active/inactive pills inherit public-route orange/cream language instead of black/slate emphasis
- keep the existing navigation structure and active-route clarity from Phase 2; only visual language should change

3. `/my/records` hero and action hierarchy
- replace the current dark gradient `RecordsHero` with a light hero panel that uses warm tint, lighter borders, and public-route badge styling
- convert major actions from black-filled pills toward the public primary/orange filled CTA plus soft tinted secondary buttons
- restyle filter and utility panels so they feel like descendants of `/templates` guidance/filter surfaces rather than neutral admin cards

4. `/my/records/[id]` editor atmosphere shift
- replace the dark `EntryIntro` band with a lighter, image-free but warm hero surface that matches the public template-detail atmosphere
- rework top metadata blocks, guidance cards, and section wrappers from stone/slate-heavy neutrals toward cream, clay, and pale orange surfaces
- keep the form structure, step logic, and section order intact while making the editor feel like a warm continuation of template selection

5. `/my/summary` finish pass
- pull the outer page frame and non-hero surfaces into the same cream/warm-white family so the existing amber summary hero no longer sits inside a cooler shell
- restyle empty/error CTA pairs to use the same primary/secondary hierarchy as public routes
- align supporting metric cards and basis panels with the softer border and fill rhythm used on template cards and detail utility blocks

6. Verification pass
- compare top-of-page continuity for `/`, `/templates`, `/templates/[slug]`, and the locked `/my` routes
- compare desktop/mobile first view for `/templates` vs `/my/records`
- compare desktop/mobile first view for `/templates/[slug]` vs `/my/records/[id]`
- compare desktop/mobile first view for `/templates` vs `/my/summary`
- verify that active navigation, route identity, and primary action discoverability remain intact after the rewarm pass

Phase 3 execution status (current step):
- completed: `P3-02` top-bar continuity restore. A shared `GlobalTopBar` now provides one product-level brand/navigation anchor across `/`, `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/[id]`, and `/my/summary`, while the locked `/my` variant stays visually lighter than `RecordsWorkspaceShell` so the workspace shell remains the stronger local header.
- completed: `npm run lint` after the top-bar implementation.
- completed: a headed Chrome verification pass on `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true`, using desktop `1440x1200` and mobile `390x844` screenshots for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, confirmed the new top-of-page anchor across the Phase 3 route set and showed authenticated content-state first views for the three locked `/my` routes without top-bar-induced header crowding.
- completed: `P3-03` shared `/my` shell/page-frame rewarm. `/my/records`, `/my/records/[id]`, and `/my/summary` now open on a cream gradient frame, and `RecordsWorkspaceShell` plus the shared top-level non-error frames now use warmer `primary`-tinted borders/fills with an orange active pill while keeping the same layout and local nav structure.
- completed: a headed Chrome verification pass on `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true`, using desktop `1440x1200` and mobile `390x844` screenshots for `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, confirmed that the shell reads warmer, the active nav pill remains the strongest shell affordance, and the shell label/title remain readable on mobile.
- completed: `P3-04` hero/CTA restyle. `/my/records` now carries its primary actions inside a warm hero while still naming the current summary window, and `/my/records/[id]` now uses a lighter intro band with an immediate write/edit CTA that jumps straight to the form.
- completed: a headed Chrome verification pass on `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true`, using desktop `1440x1200` and mobile `390x844` screenshots for `/my/records` and `/my/records/lUNzWkHKzC5441JlUmdQ`, confirmed that summary-window context remains visible, record-stage / write-edit intent remains immediate, and the orange primary CTA stays stronger than nearby badges or metadata.
- completed: `P3-05` supporting-surface harmonization. The locked `/my` filters, cards, metadata panels, rating controls, summary basis cards, and metric/record modules now use the same warm border/fill rhythm as the public template routes while preserving semantic colors and strong selected states where the workflow depends on them.
- completed: `P3-06` final verification. A headed Chrome pass on `http://127.0.0.1:3040` with `NEXT_PUBLIC_DEV_AUTH_BYPASS_ENABLED=true` captured desktop/mobile comparisons for `/`, `/templates`, `/templates/what-changed-in-my-day`, `/my/records`, `/my/records/lUNzWkHKzC5441JlUmdQ`, and `/my/summary`, plus full-page `/my/records`, `/my/records/[id]`, `/my/summary`, and representative filtered-empty `/my/records` screenshots. The evidence confirms top-bar continuity, public-vs-locked first-view warmth, authenticated content-state behavior for the locked `/my` routes, readable dense surfaces, obvious selected rating buttons, and one representative empty-state hierarchy check.
- completed: Phase 3 success checks are now satisfied for the documented route slice.
- next: execute the bounded Phase 4 image-realization slice for `/`, `/templates`, and `/templates/[slug]`.

### Phase 4 brief

Phase 4 target:
- replace the remaining placeholder-grade imagery on the public discovery/template routes with secured real image assets

Phase 4 objective:
- make `/`, `/templates`, and `/templates/[slug]` consume finished route-appropriate imagery instead of oversized icon blocks or other placeholder stand-ins
- carry the validated Gate B warm family-reflection image thesis into the live product without widening into a broad asset program or redesign

Phase 4 planned scope:
- identify the exact image placements on `/`, `/templates`, and `/templates/[slug]` that still rely on placeholder or icon-only treatment
- secure the bounded asset set needed to satisfy those placements inside the repo
- wire the secured assets into the existing public-route hero/card/detail surfaces with appropriate cropping and fallback treatment
- keep the current Phase 3 public-to-locked continuity intact while raising finish quality on the discovery/template routes

Phase 4 asset procurement path:
- first attempt to generate the needed assets from within the Codex environment using the default available image-generation path
- if direct Codex-side generation is unavailable or fails to produce truthful usable files, write finalized prompts and filenames for an external-generation fallback
- in the fallback path, James may generate the assets in an external tool such as Google Gemini Nano Banana and place the resulting files into the repo via inbox for final selection, integration, and verification
- do not close Phase 4 on prompts alone; the route only counts once the actual asset files are present in the repo and wired into the live surfaces
- the current bounded external-generation handoff artifact is `docs/epics/014_ui_ux_completion_program/artifacts/phase4_asset_handoff/014_phase4_image_asset_prompt_pack.md`

Phase 4 allowed changes:
- image asset files, image references, and bounded presentation-layer updates required to place those assets cleanly on `/`, `/templates`, and `/templates/[slug]`
- small route-level layout or overlay adjustments required to preserve text readability, crop behavior, and CTA clarity once real imagery replaces placeholders
- supporting docpack updates that record which assets were secured, where they were placed, and what was verified

Phase 4 non-goals:
- no authentication, data, persistence, template taxonomy, filtering, summary, or editor behavior changes
- no widening into locked `/my` route redesign, new route creation, or a whole-site art direction rewrite
- no open-ended batch asset generation program beyond the bounded assets needed to replace the current placeholder slots in scope
- no claim that an image is production-ready unless the actual file is present in the repo and rendered in the route

Phase 4 success checks:
- the homepage hero and supporting public discovery image placements no longer read as placeholder icon blocks where a real image surface is intended
- the template library and template detail routes each use secured image assets rather than placeholder-grade stand-ins for the key in-scope surfaces
- desktop and mobile first views keep route labels, CTA hierarchy, and text readability after the new imagery is applied
- no in-scope route closes with only prompt-pack or planning evidence; the actual asset files must be present and consumed by the route
- the bounded Phase 4 asset set is complete only when all nineteen expected files from the external prompt pack have been returned into `docs/inbox/`

Phase 4 verification notes:
- verify desktop and mobile first views for `/`, `/templates`, and `/templates/[slug]` after the new assets are wired in
- verify that image crops, overlays, and fallback behavior remain stable on the actual rendered routes
- compare the final in-scope public surfaces against the pre-Phase 4 placeholder state so finish-quality improvement is based on real route evidence rather than asset review alone

### Phase 3 red-team validation

Primary ways this plan could fail:

1. Warmth erases route clarity
- risk: replacing dark shell/hero treatment too aggressively could make `/my` feel prettier but less orienting, especially if the active nav pill, current route heading, or primary action lose contrast
- guardrail: no Phase 3 step is complete unless active route indication remains visually stronger than inactive pills and the first viewport still exposes one unmistakable route heading plus one primary action

2. Public baseline gets copied too literally
- risk: `/templates` and `/templates/[slug]` are inspiration surfaces, not direct behavioral twins of list/editor/summary workflows; blindly copying their layout patterns would create style debt or workflow regressions
- guardrail: Phase 3 should import only the public baseline's color, surface warmth, badge language, and CTA hierarchy, not its information architecture or decorative imagery requirements

2a. Top-bar fixes accidentally create double headers or route clutter
- risk: adding a missing top bar without reconciling it with `RecordsWorkspaceShell` could stack two competing anchors and make the first viewport feel crowded
- guardrail: any new global top anchor on locked routes must stay visually subordinate to workspace navigation and preserve first-view action density

3. Dense work surfaces lose scannability
- risk: filters, rating controls, metadata blocks, summary charts, and error states carry more operational density than public marketing/discovery cards; overusing pale fills or low-contrast borders could make these harder to parse
- guardrail: neutral support contrast is still allowed where it carries meaningful scan structure; selected, error, submitted, and summary-related states must keep stronger contrast than surrounding decorative warmth

4. Verification stays too soft
- risk: Phase 3 could be declared done from code review or loading-state screenshots even if authenticated content states regress
- guardrail: closeout must include direct checks on authenticated content states for `/my/records`, `/my/records/[id]`, and `/my/summary`, plus at least one loading or empty/error state where shell readability is still visible

Execution constraints derived from the red-team pass:
- resolve top-bar continuity before claiming visual-system continuity; header absence is a structural break, not a polish detail
- sequence changes so `RecordsWorkspaceShell` and page-frame warmth land before route-specific hero work; otherwise the route hero diff will overstate improvement while the subsystem split remains
- do not recolor status semantics into one orange family; submitted/draft/error/summary-included states need semantic differentiation beyond simple brand warmth
- do not replace all dark emphasis with warm emphasis; a small amount of strong contrast is still needed for selected nav, primary CTA, and interactive focus
- treat `/my/summary` as the canary route for over-softening dense information, because it contains charts, counters, and metric cards that can quickly lose hierarchy

Concrete acceptance gates by step:

Step 1 gate: top-bar continuity
- `/templates` and `/templates/[slug]` are no longer header-less
- locked `/my` routes expose a clear global brand anchor without creating a visually competing double header
- mobile first viewport still keeps route identity and at least one primary action visible after the top-anchor change

Step 2 gate: shared shell rewarm
- the shell reads warmer than before
- active nav remains the highest-contrast pill in the shell
- shell title and route family label remain readable on mobile without wrapping into visual clutter

Step 3 gate: hero and CTA restyle
- `/my/records` still exposes the current summary window and one clear start/revisit action in the first viewport
- `/my/records/[id]` still exposes record stage and write/edit intent immediately on entry
- no first-view CTA becomes visually weaker than surrounding badges or metadata cards

Step 4 gate: supporting surface harmonization
- filters remain easy to scan and change quickly
- selected rating buttons remain obviously selected from adjacent unselected grades
- summary bars, counts, and error/empty branches retain stronger hierarchy than surrounding decorative surface tint

Step 5 gate: validation
- desktop and mobile first views confirm continuity against the public baseline
- authenticated content-state checks confirm no readability or hierarchy regression
- if only loading-state evidence is available for a route, Phase 3 cannot be closed for that route

## 6. Explicit exclusions

014 must not become:
- a justification for unlimited whole-app redesign
- a dumping ground for unrelated product ideas
- a status-fiction epic that keeps growing without concrete phase closure

Each phase must stay bounded enough that its outcome can be judged honestly.
