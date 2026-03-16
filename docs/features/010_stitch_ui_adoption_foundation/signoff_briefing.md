# IBNote 010 Stitch UI Adoption Foundation Sign-off Briefing

Status: Ready for human sign-off
Decision type: go / no-go for phase-1 implementation
Source docs:
- `prd.md`
- `spec.md`
- `todo.md`
- `mismatch_ledger.md`

## 1. What this package is

`010_stitch_ui_adoption_foundation` uses Stitch-generated screens as the new visual starting point for IBNote, but explicitly keeps current IBNote product truth in charge.

This package is not a broad product redesign.
It is a controlled UI-baseline adoption package.

## 2. What this package is trying to achieve

Phase-1 goal:
- visibly improve the calmness, warmth, and perceived quality of key routes
- lower friction on choose / start / recover moments
- establish reusable visual primitives for later routes
- avoid fake feature sprawl and scope drift

## 3. Why now

This package is worth doing now because the current UI under-expresses the intended product shape.
A stronger UI baseline should increase trust, perceived polish, and implementation leverage for future work.

This is not considered successful if it only makes screenshots prettier.
It must make the real parent workflow feel clearer and calmer.

## 4. In-scope for phase 1

Approved phase-1 routes:
1. `/templates/[slug]`
2. record creation transition surface
3. `/templates`
4. `/reset-password`

These are the lowest-risk routes for early Stitch adoption.

## 5. Explicitly not in phase 1

Deferred to later / not approved for direct redesign in this package phase:
- `/`
- `/login`
- `/my/records/[id]`
- `/my/records`
- `/my/settings`

Notes:
- `/` and `/login` are phase-2 candidates only after phase-1 passes
- `/my/records/[id]`, `/my/records`, and `/my/settings` are high semantic-mismatch routes and must not be direct-cloned from Stitch in early implementation

## 6. Safe-scope matrix

| Route | Decision | Why |
| --- | --- | --- |
| `/templates/[slug]` | GO | strongest design gain with manageable truth adaptation |
| record creation transition | GO | high visual upside, low semantic risk |
| `/templates` | GO | improves chooseability with controlled adaptation |
| `/reset-password` | GO | good emotional clarity, low scope risk |
| `/` | LATER | useful, but phase-2 only |
| `/login` | LATER | useful, but requires stronger capability trimming |
| `/my/records/[id]` | NO for now | semantic mismatch too high for early transplant |
| `/my/records` | NO for now | route truth stronger than Stitch output |
| `/my/settings` | NO for now | Stitch expands scope too much |

## 7. Must-preserve gains from Stitch

These should survive implementation:
- warm neutral palette
- soft rounded containers
- calmer spacing and hierarchy
- guidance blocks that reduce anxiety
- clearer primary CTA emphasis
- branded, intentional loading and recovery states

## 8. Must-remove or rewrite

These must not ship under 010 phase-1:
- social login
- share/bookmark actions
- support/community/resources surfaces
- export/profile/admin-expansion actions
- fake social proof
- unsupported privacy/security claims
- fake workflow branches

## 9. Go / no-go decision rule for phase-2

Only open phase-2 if phase-1 passes all of these:
1. real visual uplift is obvious
2. no fake features remain on touched routes
3. product truth is still clear and honest
4. core route behavior still works cleanly
5. reusable visual primitives have actually emerged

If not, stop after phase-1 and fix drift before expanding.

## 10. Recommended sign-off

Recommended decision:
- **GO for phase-1 implementation only**
- **NO automatic approval for phase-2**
- require post-phase-1 review before expanding further

Implementation review update:
- Gemini produced additional UI work on deferred routes (`/my/records/[id]`, `/my/records`, `/my/summary`)
- those changes may contain reusable ideas, but they are **not approved 010 ship scope**
- see `carry_forward_notes.md` for salvage guidance and future-package handling

## 11. What the approver is really deciding

You are not deciding whether Stitch is perfect.
You are deciding whether IBNote should use Stitch as a controlled implementation baseline on the approved low-risk routes first.

## 12. Suggested human sign-off format

Suggested sign-off note:
- `GO: Proceed with 010 phase-1 only as documented. Preserve product truth, remove fake capabilities, and do not open phase-2 without review.`
