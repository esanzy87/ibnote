# IBNote Unattended Worker Launch Guide

Purpose: launch and evaluate detached coding/QA workers without confusing leftover tmux shells for live work.

## Core rules
- A tmux session name alone does **not** prove a worker is active.
- A worker is considered live only when recent pane output or process evidence shows ongoing execution and no truthful stop/completion state has been reached.
- If a worker has already reached a stop point, completion state, or idle shell, do not treat that tmux session as a blocker to the next launch.
- Prefer one worker per clear NextAction unless the work is explicitly parallel-safe.

## Preferred launch default
For unattended coding/implementation work:
- OpenClaw toolchain
- OpenCode `/ulw-loop`
- `tmux`

For unattended QA work:
- prefer the most observable path first
- if direct `process/background` execution provides clearer logs, exit code, and artifacts, prefer it over `tmux`
- use documented QA credentials from `docs/guides/QA_TEST_ACCOUNTS.md` when protected-flow verification is required
- use `tmux` only when the QA flow truly benefits from interactive iteration more than from observability

## Launch pattern
1. Read `docs/BLACKBOARD.md` first.
2. Determine active package and NextAction from BLACKBOARD + current package docs.
3. Choose launch mode based on work type:
   - coding/implementation loop -> usually `tmux`
   - deterministic QA/verification -> usually direct `process/background`
4. Check whether an actually live worker/process already exists for the same NextAction.
5. If not, spawn exactly one detached worker/process.
6. Require truthful doc sync (`todo.md`, `NIGHT_RUN_REPORT.md`, and BLACKBOARD when relevant).
7. Include a completion wake command.
8. Prefer a finish path that leaves no ambiguous live-worker signal behind (clean shell exit, stale marking, or process exit with retained logs).

## Live-worker check
A worker counts as live only if most of the following are true:
- recent pane output shows active tool execution, file edits, test/build/QA commands, or agent progress
- no stop-point/completion message has already been emitted
- the pane is not sitting at an idle shell prompt
- the process state is consistent with ongoing work rather than a finished command

A worker is stale if any of the following are true:
- completion or stop-point notification has already been sent
- pane output shows an idle prompt or post-run shell
- the command failed and tmux remained open
- the session exists but no recent execution evidence is present

## Finish hygiene
When a worker reaches a truthful stop point, prefer one of:
- exit the shell cleanly after writing docs/report truth
- explicitly mark the session stale in control-plane notes if the shell must remain open
- avoid leaving ambiguous idle tmux sessions that later orchestrators might count as active

## Minimal worker prompt addendum
Use wording like:
- "If you reach a truthful stop point, sync docs, emit the completion wake event, and end cleanly so this tmux session is not mistaken for a live worker."

## Rationale
This guide exists because unattended orchestration can otherwise under-launch or misclassify work when tmux sessions remain after the underlying agent command has already stopped.
