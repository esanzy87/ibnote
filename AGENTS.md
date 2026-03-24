# AGENTS

## Purpose

This file defines stable operating rules for work in this repository.
Keep it short, durable, and mostly independent of any single epic.

## Core rules

1. Read [docs/BLACKBOARD.md](/home/dev/projects/ibnote/docs/BLACKBOARD.md) before substantial work.
2. Treat the active epic docpack as the execution source of truth for epic scope, task state, and verification.
3. If documents disagree, prefer the newest clearly justified source and then sync the others.
4. When an epic changes state, next action, or blocker truth, update [docs/BLACKBOARD.md](/home/dev/projects/ibnote/docs/BLACKBOARD.md) first.
5. Do not keep epic-local logs, historical run notes, or temporary status trails in this file.
6. Keep changes scoped. Do not reopen unrelated routes, systems, or product areas unless the active epic docpack explicitly allows it.
7. Revalidate blockers after external changes before treating an old failure as current truth.
8. Record durable decisions in the active epic docpack or [docs/BLACKBOARD.md](/home/dev/projects/ibnote/docs/BLACKBOARD.md), not in ad hoc notes.
9. Prefer updating existing docs over creating new parallel status documents.
10. Keep verification claims honest. If something was not rerun or directly checked, do not present it as confirmed.
11. When an epic is complete or durably blocked, move to the next highest-leverage documented step instead of leaving the repo in a passive status state.
12. When creating a git commit, follow [docs/guides/COMMIT_RULE.md](/home/dev/projects/ibnote/docs/guides/COMMIT_RULE.md).

## Document roles

- `AGENTS.md`: stable repo-wide operating rules
- `docs/BLACKBOARD.md`: minimal current coordination snapshot
- `docs/product/AMBITION.md`: product direction and prioritization lens
- `docs/epics/<active-epic>/todo.md`: task tracker and execution SSOT for the active epic
- `docs/epics/<active-epic>/spec.md`, `prd.md`, `adr.md`, `risk_analysis.md`: epic-level scope, decisions, and verification context
