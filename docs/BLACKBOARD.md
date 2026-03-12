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
- If a human reports an external fix or settings change, the previous blocker must be treated as **pending revalidation** until a fresh smoke/runtime verification confirms `resolved` or `blocked-external` again.
- When an agent consumes a human note that changes blocker truth, it must add a short entry to the Agent consumption log with what was read, what was rechecked, and what status was concluded.

## Status legend
- `pending`: new note or action the agent has not applied yet
- `applied`: the agent read and applied this note
- `pending-revalidation`: an older blocker/truth state may have changed because of human/external action and must be rechecked before being treated as confirmed current reality
- `blocked-external`: needs real human/external action outside the repo
- `resolved`: blocker or decision has been resolved
- `stale`: no longer valid, kept only for short history

---

## 1. Active human notes
> Put the newest note at the top.

- [pending] 2026-03-12 09:34 Asia/Seoul — Human updated the active IBNote Firebase console Firestore rules to allow authenticated owner-only access on `/users/{uid}`, `/users/{uid}/profile/*`, and `/users/{uid}/records/*`, with a deny-all fallback for every other path.
- [pending] 2026-03-11 23:34 Asia/Seoul — Bootstrap operating rule: when Firestore runtime permissions block record CRUD verification, prioritize environment-independent work first (`C-08`, `D-01`, then possible `E-01~E-03`), and do not claim blocked runtime flows as done.

---

## 2. External blockers
> Put the newest blocker update at the top.

- [resolved] 2026-03-12 16:23 Asia/Seoul — Human manually revalidated the active runtime after the Firebase console rules update: login succeeded, `/templates` loaded, `/my/records/<record-id>` loaded, and no Firestore `403 PERMISSION_DENIED` signal was observed in the browser console during the check. This resolves the previously confirmed runtime permission blocker for record open/load verification.
- [pending-revalidation] 2026-03-12 09:35 Asia/Seoul — Human reported updating the active Firebase console Firestore rules for owner-scoped `/users/{uid}` access. Re-run authenticated manual QA on `/users/{uid}/records/*` before continuing to treat the old 403 blocker as current truth.
- [stale] 2026-03-11 23:34 Asia/Seoul — Active Firebase runtime previously returned `403 PERMISSION_DENIED` for current-user `/users/{uid}/records` access during manual QA. This blocker claim became stale once the human reported an external rules update and should not be reused without fresh verification.

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

- 2026-03-12 16:30 Asia/Seoul — Read the human Firestore rules-update notes, reclassified the old 403 claim under the new pending-revalidation protocol, and reflected the latest human manual QA outcome (`/templates` and `/my/records/<record-id>` opened without visible 403) in the blocker state.

---

## 6. Optional handoff snippets
> Put the newest snippet at the top.
> Use only for short, high-signal notes that help the next unattended run.

- No entries yet.
