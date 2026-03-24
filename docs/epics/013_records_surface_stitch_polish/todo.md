# IBNote 013 Records Surface Stitch Polish Todo

Status: `done`
Source of truth: `docs/epics/013_records_surface_stitch_polish/prd.md`
Companion docs:
- `docs/epics/013_records_surface_stitch_polish/spec.md`
- `docs/epics/013_records_surface_stitch_polish/adr.md`
- `docs/epics/013_records_surface_stitch_polish/risk_analysis.md`

## 1. Task ledger

| ID | Task | Priority | Status | Done condition |
| --- | --- | --- | --- | --- |
| A-01 | Inspect live `/my/records` and `/my/records/[id]` versus expected Stitch-style target | P0 | done | Current route reality is inspected directly and the main visual gap is documented without guessing. |
| A-02 | Identify the missing visible design layer versus what 012 actually delivered | P0 | done | The gap is locked as visible hierarchy/shell translation rather than behavior/auth/data semantics. |
| A-03 | Inspect current non-landing app shell/top-nav drift and define bounded correction target | P0 | done | A minimal allowed shell-correction target is defined without reopening broad global redesign scope. |
| B-01 | Strengthen `/my/records` visible Stitch-style hierarchy and cards | P1 | done | The route gains a clearly leading top visual layer and the records cards feel intentionally branded rather than merely neat. |
| B-02 | Strengthen `/my/records/[id]` visible Stitch-style hierarchy and sections | P1 | done | The editor no longer reads like a stack of equal-weight form boxes, and orientation/guidance/form/action hierarchy is visibly clearer. |
| B-03 | Restore bounded non-landing top navigation/app-shell truth | P1 | done | Records routes visibly belong to one coherent non-landing product shell without pulling unrelated routes into a larger redesign. |
| B-04 | Tune density and guidance after style alignment is visible | P1 | done | Copy/spacing/guidance feel calmer after hierarchy restoration, without weakening the newly restored visual layer. |
| C-01 | Validate that both routes now visibly feel Stitch-aligned in real use and non-landing navigation no longer feels missing by accident | P1 | done | Authenticated browser review confirms `/my/records`, `/my/records/[id]`, and the new-record entry flow now hold session correctly and expose the intended 013 visual hierarchy in live use. |

## 2. Current note

013 is intentionally small and route-specific. It exists because 012 changed these surfaces, but real-use review suggests the visible Stitch-style application is still incomplete.

Phase A is now locked:
- the main gap is visible hierarchy/shell translation, not behavior semantics
- `/my/records` now has a stronger top orientation layer and card-level hierarchy.
- `/my/records/[id]` now has clearer entry and section hierarchy through dedicated orientation and action grouping.
- a bounded non-landing shell correction is allowed, but only as a coherence fix
- density tuning is secondary to restoring the missing visible Stitch layer

### Completed in this run
- `B-01` completed: `/my/records` now has a stronger orientation-first hero, more explicit section hierarchy, and stronger card-level contrast.
- `B-02` completed: `/my/records/[id]` now uses a stronger entry point and clear orientation/guide/action layering.
- `B-03` completed: non-landing workspace shell now appears as a shared route-local frame on `/my/records` and `/my/records/[id]`.
- `B-04` completed: section spacing/section hierarchy now follows a calmer density profile while preserving visible guidance depth.
- `C-01` completed (visual-review-only): `/my/records` and `/my/records/[id]` were rechecked in the code-path pass for visual hierarchy and shared shell continuity. No additional runtime-only validation was run in this step.

### Closeout note
- Fresh manual browser verification on 2026-03-24 cleared the older auth/protected-route revalidation concern after the active local env was corrected.
- `/my/records` now renders the intended hero, workspace shell, filters, and card hierarchy in an authenticated session.
- A follow-up records-card layout defect found during live review was corrected in `records-list-client.tsx`, and the card badge/summary area now renders without vertical collapse.
- `/my/records/[id]` loads successfully in the same authenticated session.
- `새 기록 시작 -> /templates -> 템플릿 상세 -> 기록 시작` also stays authenticated and reaches the editor successfully, so the prior `/login?next=...` blocker should now be treated as stale for 013 closeout.

## 3. Verification notes for completed tasks

- `A-01` completed via direct inspection of the current `/my/records` route shell, records list client, record-editor route shell, record-editor client, and root layout. Confirmed that both routes are structurally improved but still under-translate the Stitch visual layer in real use.
- `A-02` completed by comparing the current route surfaces against the 012 next-step briefing. Locked the main design gap as missing visible hierarchy/shell coherence rather than missing behavior, auth, or data semantics.
- `A-03` completed by inspecting the current root layout and non-landing rendering truth. Locked a bounded correction target: a small shared non-landing shell/header/navigation treatment is allowed only to restore coherence and should not expand into a broad app-shell redesign.
- `B-01` completed through `/my/records` hierarchy + card-level contrast restoration in `records-list-client.tsx`.
- `B-02` completed through `/my/records/[id]` entry/section/action layering restoration in `record-editor.tsx`.
- `B-03` completed by introducing and applying `RecordsWorkspaceShell` to records list and record editor for bounded shell coherence.
- `B-04` completed by converting repeated equal-weight blocks into guided hierarchy bands and reduced visual crowding on the editor surface.
- `C-01` visual review completed as a focused inspection pass over both surfaces after `B-01`~`B-04` implementation.
- `C-01` earlier runtime revalidation attempted on 2026-03-24 with:
  - `npm run build` passing in a listener-capable environment
  - `next start --hostname 127.0.0.1 --port 3301` serving successfully
  - `scripts/qa/013_records_surface_closeout.mjs` using canonical QA account `qa-primary`
- Intermediate result: the browser stayed on `/login?next=%2Fmy%2Frecords`, so closeout remained pending until the active env was corrected.
- `C-01` closeout was then completed by fresh authenticated browser verification on 2026-03-24:
  - `/my/records` loaded successfully and visibly showed the strengthened 013 hero, workspace shell, filter panel, and records-card hierarchy
  - a live records-card layout defect was found and corrected in `src/components/records/records-list-client.tsx`
  - `/my/records/[id]` loaded successfully from the same authenticated session
  - `새 기록 시작 -> /templates -> 템플릿 상세 -> 기록 시작` stayed authenticated and reached the editor without bouncing back to `/login`
- Result: 013 closeout is now truthful. The earlier auth/protected-route stop point should be treated as stale for this package rather than as an open blocker.
