# IBNote 012 Stitch Warmth and Deferred Surface Reintegration Todo

Status: `completed`
Source of truth: `docs/features/012_stitch_warmth_and_deferred_surface_review/spec.md`
Companion docs:
- `docs/features/012_stitch_warmth_and_deferred_surface_review/prd.md`
- `docs/features/012_stitch_warmth_and_deferred_surface_review/reintegration_ledger.md`
- `docs/features/012_stitch_warmth_and_deferred_surface_review/signoff_briefing.md`
- `docs/features/012_stitch_warmth_and_deferred_surface_review/signoff_decision.md`

## 1. Phase outline

1. Phase A - review and route-by-route reintegration decision
2. Phase B - broad bounded implementation
3. Phase C - validation and closeout

## 2. Task ledger

| ID | Phase | Task | Priority | Status |
| --- | --- | --- | --- | --- |
| A-01 | A | Review current stabilized routes for safe 10-15% warmth increase | P0 | done |
| A-02 | A | Re-review all deferred 010 surfaces and preserved patches route by route | P0 | done |
| A-03 | A | Produce keep/rewrite/remove/reintegrate judgments for all included routes | P0 | done |
| A-04 | A | Prepare 012 reintegration ledger and sign-off briefing | P0 | done |
| B-01 | B | Implement bounded warmth polish on included stabilized routes | P1 | done |
| B-02 | B | Implement approved reintegration for `/my/records` | P1 | done |
| B-03 | B | Implement selective approved reintegration for `/my/records/[id]` | P1 | done |
| B-04 | B | Implement selective approved reintegration for `/my/summary` | P1 | done |
| C-01 | C | Validate route truth, scope discipline, and product coherence | P1 | done |
| C-02 | C | Close out 012 with explicit note about remaining rejected ideas | P1 | done |

## 3. Current note

012 is completed as a broad but bounded implementation package.

Summary of implementation:
- **Strongly Reintegrated**: `/my/records` (added revisit overview, continue-vs-reread framing, summary connection).
- **Selectively Reintegrated**: `/my/records/[id]` (added status headline/body and writing guide), `/my/summary` (added summary basis explanation and improved recovery).
- **Warmth Polish Applied**: `/`, `/login`, `/templates`, `/templates/[slug]`, record creation transition, and `/reset-password`.

**Explicitly Rejected/Excluded**:
- Print-heavy/preservation-heavy summary expansion (from deferred patches).
- Social login and fake social proof.
- Fictional product moments or fake support surfaces.
- Semantic drift in the record-editor core.
- Bloat that would weaken functional clarity.
