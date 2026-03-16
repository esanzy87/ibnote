# IBNote 007 Micro Usability and Empty State Polish PRD

Status: Scope locked
Owner: unattended agent
Last updated: 2026-03-15

## 1. Why this package exists

Packages 005 and 006 intentionally delivered narrow, low-risk improvements around preservation and revisit convenience. The next safe package should stay small and unattended-friendly while improving the lived usability of already-existing surfaces.

007 exists to make minor friction points, empty states, and recovery cues feel calmer and easier to act on without expanding product capability.

## 2. Problem statement

IBNote already covers the core launch flows, but some surfaces may still contain small hesitations or low-confidence moments:
- empty states that are technically correct but not maximally reassuring
- recovery actions that are present but not always the clearest next step
- small wording/hierarchy inconsistencies across already-shipped surfaces
- micro-friction in low-data, no-result, or first-time-use moments

These gaps do not justify a broad redesign. They do justify a tightly bounded polish package.

## 3. Goals

- Reduce small usability friction on already-existing launch surfaces.
- Improve empty-state clarity and recovery guidance where the next step is deterministic.
- Keep first-use, no-result, and low-data moments calm and parent-friendly.
- Preserve current product truth and route responsibilities.

## 4. Non-goals

- no new capability, workflow, or backend logic
- no recommendation, reminder, archive, search, or dashboard expansion
- no auth/account/provider scope expansion
- no broad visual redesign or IA rewrite
- no major copy overhaul unrelated to concrete usability friction
- no reopening already-closed packages unless a small continuity adjustment is required for the touched 007 surfaces

## 5. Candidate in-scope surfaces

Locked review set for implementation:
- `/templates`
- `/my/summary`

Explicitly deferred by default:
- `/templates/[slug]`
- `/my/records`
- `/my/settings`
- `/login`
- `/reset-password`

Selection rule outcome:
- the smallest surface set with the clearest remaining micro-usability gain is `/templates` plus `/my/summary`
- `/templates` is the primary first-use / no-result / choice-clarity surface
- `/my/summary` is the primary low-data / empty-state / recovery surface
- broader “general polish” appetite remains out of scope

## 6. User-value thesis

A parent should more quickly understand:
- what this screen is showing
- what to do next when there is nothing here yet
- how to recover from no-result or low-data states
- which action is the safest next step

The package succeeds when these small moments feel less hesitant without making IBNote feel heavier.

## 7. Expected outcome

A narrow polish package that improves micro-usability and empty-state clarity on a very small number of existing surfaces, with clear evidence and no capability drift.
