# Epic Advancement Protocol

## Purpose

Reference guide for shaping, closing, and promoting epics.
For day-to-day work resumption, use `AGENTS.md`, `docs/BLACKBOARD.md`, and the active epic docpack.

## Folder rule

Epic docpacks live under:

`docs/epics/{seq_no}_{epic_name}/`

Rules:
- `seq_no` is zero-padded
- `seq_no` increments from the highest existing epic folder number
- `epic_name` is short, lowercase, and underscore-separated

## Required epic docpack

Each active or candidate epic should have:

- `prd.md`
- `spec.md`
- `todo.md`
- `adr.md` when durable decisions need to be fixed explicitly
- `risk_analysis.md` when risks, blockers, or closeout conditions need separate tracking

## Completion rule

An epic is complete only when:

1. `todo.md` is fully `done` or explicitly `cancelled`
2. phase gates are truthfully closed
3. the active epic docpack does not hide unresolved execution truth
4. any still-relevant blocker or follow-up planning note is reflected in `docs/BLACKBOARD.md`

## Next-epic preparation rule

Before promoting the next epic:

1. review `docs/product/AMBITION.md`
2. review `docs/BLACKBOARD.md`
3. shortlist 2-4 plausible candidates
4. choose the next epic deliberately rather than by convenience alone
5. create or harden the next epic docpack until implementation can begin without guessing

## Maintenance rule

Keep this document stable and procedural.
Do not put current project status, active epic names, or run history here.
