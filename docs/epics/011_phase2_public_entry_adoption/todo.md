# IBNote 011 Phase-2 Public Entry Adoption Todo

Status: `closeout-ready`
Source of truth: `docs/epics/011_phase2_public_entry_adoption/spec.md`
Companion docs:
- `docs/epics/011_phase2_public_entry_adoption/prd.md`
- `docs/epics/011_phase2_public_entry_adoption/mismatch_ledger.md`
- `docs/epics/011_phase2_public_entry_adoption/signoff_briefing.md`

## 1. Phase outline

1. Phase A - route review and mismatch identification
2. Phase B - scope lock and sign-off prep
3. Phase C - implementation

## 2. Task ledger

| ID | Phase | Task | Priority | Status |
| --- | --- | --- | --- | --- |
| A-01 | A | Review current landing route against Stitch reference and product truth | P0 | done |
| A-02 | A | Review current login route against Stitch reference and product truth | P0 | done |
| A-03 | A | Create landing/login mismatch notes | P0 | done |
| B-01 | B | Lock keep/rewrite/remove decisions for landing and login | P1 | done |
| B-02 | B | Prepare sign-off briefing for 011 | P1 | done |
| C-01 | C | Implement bounded phase-2 adoption for landing and login only | P1 | done |
| C-02 | C | Validate scope and route truth after implementation | P1 | done |

## 3. Current note

011 is the follow-on to 010 phase-1 and has now reached bounded closeout-ready state for landing and login only. Scope remains intentionally narrow: landing and login only, with explicit exclusion of social login, fake social proof, support/community surfaces, and deferred product routes.

Closeout summary:
- landing and login were adapted to the 010 visual baseline
- auth truth remains email/password only
- fake marketing/auth surfaces were kept out of scope
- remaining repo noise must stay separated from 011 truth

Sign-off note:
- `GO: Proceed with 011 on landing and login only. Keep auth truthful, remove fake marketing/auth surfaces, and preserve practical product-facing copy.`

Repo-local handoff rule for the next step:
- first close the current 011 phase cleanly
- then, if a follow-on polish pass is opened, allow a bounded 10-15% increase in Stitch-style emotional warmth
- keep that later polish pass separate from current 011 closeout and do not let it reopen auth/scope drift
