# BLACKBOARD

> Purpose: human-agent control plane for IBNote overnight work.
> Scope: use this file for human intervention notes, external blocker updates, restart control, and short operating decisions.
> Non-goal: this is **not** the main task tracker. `docs/features/000_bootstrap/todo.md` remains the official execution tracker.

## Operating rules
- **Newest entries must always be added at the top** of each section so an agent does not need to read the whole file.
- Keep entries short, concrete, and action-oriented.
- If an item is no longer relevant, change its status instead of silently deleting it unless it is pure noise.
- Agents should read this file **before** starting or resuming unattended work.
- When an item here affects execution truth, the agent should reflect that in `todo.md` and/or `NIGHT_RUN_REPORT.md` as appropriate.

## Status legend
- `pending`: new note or action the agent has not applied yet
- `applied`: the agent read and applied this note
- `blocked-external`: needs real human/external action outside the repo
- `resolved`: blocker or decision has been resolved
- `stale`: no longer valid, kept only for short history

---

## 1. Active human notes
> Put the newest note at the top.

- [pending] 2026-03-11 23:34 Asia/Seoul — Bootstrap operating rule: when Firestore runtime permissions block record CRUD verification, prioritize environment-independent work first (`C-08`, `D-01`, then possible `E-01~E-03`), and do not claim blocked runtime flows as done.

---

## 2. External blockers
> Put the newest blocker update at the top.

- [blocked-external] 2026-03-11 23:34 Asia/Seoul — Active Firebase runtime currently returns `403 PERMISSION_DENIED` for current-user `/users/{uid}/records` access during manual QA. Human/external action likely required: confirm active Firebase project, deploy correct Firestore rules/indexes, and verify authenticated read/write to `/users/{uid}/records/*` succeeds.

---

## 3. Decisions
> Put the newest decision at the top.

- [pending] 2026-03-11 23:34 Asia/Seoul — `docs/BLACKBOARD.md` is the human intervention / restart-control surface for this repo. It should be read before any unattended restart or periodic status-check relaunch. `todo.md` remains SSOT for task progress; `NIGHT_RUN_REPORT.md` remains SSOT for run outcomes.

---

## 4. Next feature ideas
> Put the newest idea at the top.
> Use this section for candidate next-feature ideas, business pressure notes, customer requests, or sequencing hints that should be considered before the next feature package is selected.

- No entries yet.

---

## 5. Agent consumption log
> Put the newest consumption record at the top.
> Use this to mark what the agent actually read and acted on.

- No entries yet.

---

## 6. Optional handoff snippets
> Put the newest snippet at the top.
> Use only for short, high-signal notes that help the next unattended run.

- No entries yet.
