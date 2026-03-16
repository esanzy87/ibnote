# IBNote 013 Records Surface Stitch Polish Todo

Status: `ready-implementation`
Source of truth: `docs/features/013_records_surface_stitch_polish/prd.md`
Companion docs:
- `docs/features/013_records_surface_stitch_polish/spec.md`
- `docs/features/013_records_surface_stitch_polish/adr.md`
- `docs/features/013_records_surface_stitch_polish/risk_analysis.md`

## 1. Task ledger

| ID | Task | Priority | Status | Done condition |
| --- | --- | --- | --- | --- |
| A-01 | Inspect live `/my/records` and `/my/records/[id]` versus expected Stitch-style target | P0 | done | Current route reality is inspected directly and the main visual gap is documented without guessing. |
| A-02 | Identify the missing visible design layer versus what 012 actually delivered | P0 | done | The gap is locked as visible hierarchy/shell translation rather than behavior/auth/data semantics. |
| A-03 | Inspect current non-landing app shell/top-nav drift and define bounded correction target | P0 | done | A minimal allowed shell-correction target is defined without reopening broad global redesign scope. |
| B-01 | Strengthen `/my/records` visible Stitch-style hierarchy and cards | P1 | todo | The route gains a clearly leading top visual layer and the records cards feel intentionally branded rather than merely neat. |
| B-02 | Strengthen `/my/records/[id]` visible Stitch-style hierarchy and sections | P1 | todo | The editor no longer reads like a stack of equal-weight form boxes, and orientation/guidance/form/action hierarchy is visibly clearer. |
| B-03 | Restore bounded non-landing top navigation/app-shell truth | P1 | todo | Records routes visibly belong to one coherent non-landing product shell without pulling unrelated routes into a larger redesign. |
| B-04 | Tune density and guidance after style alignment is visible | P1 | todo | Copy/spacing/guidance feel calmer after hierarchy restoration, without weakening the newly restored visual layer. |
| C-01 | Validate that both routes now visibly feel Stitch-aligned in real use and non-landing navigation no longer feels missing by accident | P1 | todo | Real-use review confirms visual alignment improved, shell absence no longer feels accidental, and product behavior remains unchanged. |

## 2. Current note

013 is intentionally small and route-specific. It exists because 012 changed these surfaces, but real-use review suggests the visible Stitch-style application is still incomplete.

Phase A is now locked:
- the main gap is visible hierarchy/shell translation, not behavior semantics
- `/my/records` still reads too much like a neat utility dashboard
- `/my/records/[id]` still reads too much like a stack of equal-weight form sections
- a bounded non-landing shell correction is allowed, but only as a coherence fix
- density tuning is secondary to restoring the missing visible Stitch layer

## 3. Verification notes for completed tasks

- `A-01` completed via direct inspection of the current `/my/records` route shell, records list client, record-editor route shell, record-editor client, and root layout. Confirmed that both routes are structurally improved but still under-translate the Stitch visual layer in real use.
- `A-02` completed by comparing the current route surfaces against the 012 next-step briefing. Locked the main design gap as missing visible hierarchy/shell coherence rather than missing behavior, auth, or data semantics.
- `A-03` completed by inspecting the current root layout and non-landing rendering truth. Locked a bounded correction target: a small shared non-landing shell/header/navigation treatment is allowed only to restore coherence and should not expand into a broad app-shell redesign.
