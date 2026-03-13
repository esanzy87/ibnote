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

- [applied] 2026-03-13 09:19 Asia/Seoul — Human manually executed the full C-09 owner-flow runtime QA and reported all expected outcomes: draft save worked, submit without ratings was rejected, submit with at least one rating worked, and later edits preserved `submitted` status.
- [applied] 2026-03-12 21:12 Asia/Seoul — Update the IBNote repeat-check / forward-progress protocol from every 3 hours to every hour on the hour. Future unattended restart or status-check scheduling should use hourly top-of-hour cadence unless a newer human instruction overrides it.
- [applied] 2026-03-12 18:46 Asia/Seoul — Human manually confirmed that `/my/records` currently loads successfully in the active runtime. Treat the records-list route as externally smoke-verified and update blocker/task truth before continuing unattended work.
- [applied] 2026-03-12 09:34 Asia/Seoul — Human updated the active IBNote Firebase console Firestore rules to allow authenticated owner-only access on `/users/{uid}`, `/users/{uid}/profile/*`, and `/users/{uid}/records/*`, with a deny-all fallback for every other path.
- [applied] 2026-03-11 23:34 Asia/Seoul — Bootstrap operating rule: when Firestore runtime permissions block record CRUD verification, prioritize environment-independent work first (`C-08`, `D-01`, then possible `E-01~E-03`), and do not claim blocked runtime flows as done.

---

## 2. External blockers
> Put the newest blocker update at the top.

- [resolved] 2026-03-14 00:08 Asia/Seoul — Revalidated after human-reported external Firebase summary index setup. Runtime QA now reaches `/my/summary` populated and empty states on desktop/mobile without summary error, so the former D-06 index-rollout blocker is closed.
- [resolved] 2026-03-12 18:46 Asia/Seoul — Human manually revalidated that `/my/records` loads successfully in the active runtime. Records-list access should not be treated as blocked by Firebase permissions unless a fresh runtime failure is reproduced.
- [resolved] 2026-03-12 16:23 Asia/Seoul — Human manually revalidated the active runtime after the Firebase console rules update: login succeeded, `/templates` loaded, `/my/records/<record-id>` loaded, and no Firestore `403 PERMISSION_DENIED` signal was observed in the browser console during the check. This resolves the previously confirmed runtime permission blocker for record open/load verification.
- [pending-revalidation] 2026-03-12 09:35 Asia/Seoul — Human reported updating the active Firebase console Firestore rules for owner-scoped `/users/{uid}` access. Re-run authenticated manual QA on `/users/{uid}/records/*` before continuing to treat the old 403 blocker as current truth.
- [stale] 2026-03-11 23:34 Asia/Seoul — Active Firebase runtime previously returned `403 PERMISSION_DENIED` for current-user `/users/{uid}/records` access during manual QA. This blocker claim became stale once the human reported an external rules update and should not be reused without fresh verification.

---

## 3. Decisions
> Put the newest decision at the top.

- [applied] 2026-03-13 22:40 Asia/Seoul — Bootstrap is currently in closeout mode. Keep the existing task ledger IDs/order as-is, keep launchability-critical unresolved in-scope work in the bootstrap blocker path, and route non-critical or out-of-scope findings to handoff/next-feature buckets.
- [applied] 2026-03-11 23:34 Asia/Seoul — `docs/BLACKBOARD.md` is the human intervention / restart-control surface for this repo. It should be read before any unattended restart or periodic status-check relaunch. `todo.md` remains SSOT for task progress; `NIGHT_RUN_REPORT.md` remains SSOT for run outcomes.

---

## 4. Next feature ideas
> Put the newest idea at the top.
> Use this section for candidate next-feature ideas, business pressure notes, customer requests, or sequencing hints that should be considered before the next feature package is selected.

- [pending] 2026-03-13 22:40 Asia/Seoul — Consider post-bootstrap account lifecycle expansion (`password reset`, optional account deletion) only after bootstrap closeout gates pass.
- [pending] 2026-03-13 22:40 Asia/Seoul — Run content-quality follow-up for Korean UX copy polish and educational quality review of the initial template pack after launchability-closeout tasks are complete.

---

## 5. Agent consumption log
> Put the newest consumption record at the top.
> Use this to mark what the agent actually read and acted on.

- 2026-03-14 00:08 Asia/Seoul — Consumed the external Firebase-index completion truth, revalidated runtime with fresh Playwright smoke on `/my/summary`, confirmed populated + empty summary states on desktop/mobile plus print-path behavior, closed D-06 and E-05, completed E-06 exclusions audit (no launchability-critical drift), and synced closeout docs accordingly.
- 2026-03-13 23:02 Asia/Seoul — Ran bootstrap closeout D-05/D-06 push: implemented and browser-verified sign-out landing behavior (`/my/settings` logout now lands on `/` and protected re-entry redirects to `/login?next=...`), executed Firebase runtime probe that reproduced the summary missing-index error, added the proven composite index to `firestore.indexes.json`, audited E-01..E-04 route-state/privacy coverage as already satisfied in current code, and synced tracker/report truth with D-06 marked `pending_revalidation` until runtime index rollout is confirmed.
- 2026-03-13 09:20 Asia/Seoul — Read the human C-09 manual QA result, updated the task/report truth to close C-09, marked Phase C QA gate done, and moved the current execution focus to D-01.
- 2026-03-12 21:22 Asia/Seoul — Consumed the earlier human `/my/records/<record-id>` smoke-success note during the C-07 closeout run, revalidated the editor route on a fresh local runtime, confirmed signed-out redirect, owner-only load, invalid-id missing state, and second-user non-access, and concluded the old Firebase-permission blocker remains resolved for C-07.
- 2026-03-12 21:12 Asia/Seoul — Read the human scheduling instruction, updated the unattended IBNote repeat-check / forward-progress cadence from every 3 hours to every hour on the hour, and recorded the new scheduling rule for future relaunches.
- 2026-03-12 19:12 Asia/Seoul — Consumed the human `/my/records` smoke-success note during the C-08 closeout run, verified the records list route end to end, closed the route-level blocker truth, and synced the task tracker/report to mark C-08 done.
- 2026-03-12 18:46 Asia/Seoul — Read the new human note that `/my/records` currently loads successfully, updated the blocker truth to resolved for records-list access, and prepared the repo for an unattended C-08 closeout run.
- 2026-03-12 16:30 Asia/Seoul — Read the human Firestore rules-update notes, reclassified the old 403 claim under the new pending-revalidation protocol, and reflected the latest human manual QA outcome (`/templates` and `/my/records/<record-id>` opened without visible 403) in the blocker state.

---

## 6. Optional handoff snippets
> Put the newest snippet at the top.
> Use only for short, high-signal notes that help the next unattended run.

- 2026-03-14 00:08 Asia/Seoul — Revalidation run result: D-06/E-05/E-06 now closed after fresh runtime checks; no active launchability-critical bootstrap blocker remains from the prior summary-index rollout issue.
- 2026-03-13 23:02 Asia/Seoul — Closeout truth snapshot: D-05 and E-01..E-04 are complete; D-06 is `pending_revalidation` until the new summary composite index is created in active runtime. Remaining bootstrap closeout-critical work is D-06 runtime revalidation, then E-05 (desktop/mobile/print QA evidence) and E-06 (scope audit evidence). Keep scope tight and route non-critical findings to handoff/next-feature buckets.
- 2026-03-13 22:40 Asia/Seoul — Bootstrap closeout truth snapshot: D-04 complete, D-05 next; bootstrap still open. Keep active focus on D-05 -> D-06 -> E-01..E-06. Treat non-critical/out-of-scope findings as handoff or next-feature candidates unless launchability is materially impacted.
