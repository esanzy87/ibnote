# IBNote Recurrent Unattended Prompt (Recommended Thin Prompt)

Purpose: recommended recurring-check prompt that behaves like an operator, not just a reporter.

## Recommended prompt

Read `docs/BLACKBOARD.md` first, then the active feature docpack and tracker.

Act-first, report-second.

Rules:
1. Determine the active package and exact next action from BLACKBOARD + the active package tracker.
2. If the package is incomplete, the next documented action is in scope, and no true external blocker is active, resume work immediately.
3. If no worker is truly active and the package is still incomplete with a safe documented next action, automatically launch the appropriate worker instead of sending a status-only update.
4. If a previous blocker may have changed because of external/provider/env truth, downgrade it to `pending-revalidation`, run the smallest useful smoke/recheck first, and then continue or escalate based on fresh evidence.
5. Send a status-only update only when:
   - the package is complete, or
   - a true human decision is required, or
   - repeated execution failed and now needs intervention.
6. Before stopping, sync `docs/BLACKBOARD.md`, the active package `todo.md`, and `NIGHT_RUN_REPORT.md` to current truth.

## Example version

Inspect `docs/BLACKBOARD.md` and the active feature tracker.
If the active package is not complete and the next task is documented, in scope, and not truly blocked, do the work immediately.
If no worker is actually live, launch one.
Do not stop at a passive status report unless the package is complete or a real human decision/intervention is needed.
If a blocker might have changed externally, revalidate first, then continue if safe.
Before stopping, sync BLACKBOARD, tracker, and NIGHT_RUN_REPORT to exact current truth.

## Why this prompt works better

This avoids the common failure mode where a recurrent task correctly observes the next action but declines to relaunch work because the prompt only asked for a status check.
The prompt stays thin, but BLACKBOARD remains the real control plane for package selection, blocker interpretation, and relaunch policy.
