# IBNote 010 Stitch UI Adoption Foundation Todo

Status: `ready-hardened`
Source of truth: `docs/epics/010_stitch_ui_adoption_foundation/spec.md`
Companion docs:
- `docs/epics/010_stitch_ui_adoption_foundation/prd.md`
- `docs/epics/010_stitch_ui_adoption_foundation/mismatch_ledger.md`

## 1. How to use this file

This file is the execution tracker for 010.

Rules for the coding agent:
- keep one task `in_progress` at a time unless explicitly marked parallel-safe
- do not start implementation until route classification, mismatch policy, and phase-1 scope lock are hardened
- if this file conflicts with `spec.md`, `spec.md` wins and this file is updated immediately
- do not turn 010 into a product-expansion package under the label of design adoption
- do not leave fake capabilities in place without an explicit documented disposition

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `done`
- `cancelled`

## 2. Phase gates

Execution order:
1. Phase A - Scope lock and screen classification
2. Phase B - Mismatch policy and phased rollout hardening
3. Phase C - Implementation prep closeout
4. Phase D - Phase-1 route implementation
5. Phase E - QA and go/no-go for phase expansion

## 3. Global blockers

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Product-truth drift risk | Phases A-E | Stitch elements are classified and fake capabilities are dispositioned |
| GB-02 | Placeholder spread risk | Phases B-E | allowed vs disallowed placeholder policy is hardened |
| GB-03 | Screen-sprawl risk | Phases B-E | phase-1 route set is explicitly locked |
| GB-04 | Cosmetic-only adoption risk | Phases A-E | visual uplift is tied to real route clarity/coherence gains |
| GB-05 | Premature phase expansion risk | Phase E | phase-2 remains closed unless phase-1 gates pass |

## 4. Task ledger

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Freeze 010 scope, Stitch adoption thesis, and capability boundaries | P0 | done | - |
| A-02a | A | Classify `template_detail` against current IBNote truth | P0 | done | A-01 |
| A-02b | A | Classify `record_creation_transition` against current IBNote truth | P0 | done | A-01 |
| A-02c | A | Classify `template_library` against current IBNote truth | P0 | done | A-01 |
| A-02d | A | Classify `password_reset` against current IBNote truth | P0 | done | A-01 |
| A-02e | A | Classify `landing` and `login_sign_up` as phase-2 adaptation candidates | P0 | done | A-01 |
| A-02f | A | Classify `record_editor`, `my_records_journal`, and `settings_privacy` as deferred/high-risk screens | P0 | done | A-01 |
| A-03 | A | Lock phase-1 route set and deferred route set | P0 | done | A-02a |
| B-01 | B | Define mismatch ledger format and screen-by-screen disposition rules | P1 | done | A-03 |
| B-02 | B | Harden placeholder policy and fake-feature removal rules | P1 | done | B-01 |
| B-03 | B | Define phase-1 verification criteria and route-level acceptance checks | P1 | done | B-02 |
| C-01 | C | Review 010 against AMBITION and inherited feature truth | P1 | done | B-03 |
| C-02 | C | Finalize ready-for-implementation docpack | P1 | done | C-01 |
| D-01 | D | Implement Stitch-derived UI adaptation for `/templates/[slug]` | P1 | done | C-02 |
| D-02 | D | Implement Stitch-derived UI adaptation for record creation transition surface | P1 | done | D-01 |
| D-03 | D | Implement Stitch-derived UI adaptation for `/templates` | P1 | done | D-02 |
| D-04 | D | Implement Stitch-derived UI adaptation for `/reset-password` | P1 | done | D-03 |
| E-01 | E | Run phase-1 route/content review and runtime smoke | P1 | done | D-04 |
| E-02 | E | Audit fake-feature removal, placeholder compliance, and scope control | P1 | done | E-01 |
| E-03 | E | Decide phase-2 go / no-go | P1 | todo | E-02 |

## 5. Current progress snapshot

- Current phase: `Phase E - QA and go/no-go for phase expansion`
- Current task: `E-03 Decide phase-2 go / no-go`
- Last completed task: `E-02 Audit fake-feature removal, placeholder compliance, and scope control`
- Active blocker: `none`
- Notes: Phase-1 implementation is complete for all four approved routes. Cleanup pass for 010 completed: reverted extra templates, removed fake app shell elements, fixed encoding and hardcoded images, and refined copy to be more practical and product-honest.
