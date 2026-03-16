# IBNote 006 Record Revisit Convenience Pack Risk Analysis

Status: Hardened draft - debate/red-team pass reflected
Source of truth: `docs/features/006_record_revisit_convenience_pack/prd.md`

## 1. Purpose

This document tracks the main risks of improving revisit convenience while keeping 006 intentionally narrow and low-risk.

## 2. Open risks and unresolved items

### R-01. 006 can drift into a recommendation or resurfacing system
- Issue: small revisit improvements can easily expand into “we think you should revisit this” logic.
- Impact: complexity rises quickly and the package stops being a low-risk follow-on.
- Default handling: keep capability boundaries explicit in PRD/spec/ADR and reject recommendation/reminder semantics.
- Human decision needed: none unless product strategy intentionally broadens.

### R-02. The package can become cosmetic polish with weak product payoff
- Issue: revisit-convenience work can consume effort without materially lowering friction.
- Impact: low strategic return and ambiguous done-state.
- Default handling: require before/after clarity evidence, continuity evidence, and friction-reduction rationale.
- Debate update: accepted. The first implementation pass should prefer one clearly valuable records-list improvement over a wider-but-weaker polish sweep.
- Human decision needed: none.

### R-03. Surface scope can sprawl across too many routes
- Issue: once revisit is discussed, many routes can appear “worth touching.”
- Impact: implementation risk rises and verification becomes muddy.
- Default handling: force minimal surface selection and justify every touched route. Current default boundary is `/my/records` first, `/my/records/[id]` only if clearly justified, and no default reopening of `/my/summary`.
- Debate update: accepted. For the first worker launch, treat `/my/records`-only as the default execution hypothesis, and require a concrete implementation finding before expanding into `/my/records/[id]`.
- Human decision needed: only if a larger revisit sweep is intentionally desired.

### R-04. Convenience wording can overpromise capability
- Issue: labels can imply recommendations, reminders, or organization power the app does not really provide.
- Impact: user trust erodes and future scope pressure increases.
- Default handling: keep wording honest about simple revisit/continue behavior and avoid smart-management language.
- Human decision needed: none.

### R-05. Revisit improvements can unintentionally change workflow semantics
- Issue: copy or UI changes on record surfaces can accidentally alter the meaning of draft/submitted states or editing expectations.
- Impact: a low-risk package creates confusion on core record flows.
- Default handling: keep submission/edit semantics unchanged and re-verify runtime truth on touched surfaces.
- Human decision needed: none.

### R-06. Re-entry polish can unintentionally harm live usability
- Issue: convenience-focused changes can clutter or destabilize the current record experience.
- Impact: a small package creates avoidable regressions on key routes.
- Default handling: pair route/content review with minimal runtime smoke and repo-health verification.
- Human decision needed: none.

## 3. Threats and failure modes to test explicitly

### T-01. The record list becomes a pseudo-dashboard instead of a simple revisit surface
- Mitigation: require modesty and route-boundary review.
- Red-team note: new summary-stat blocks, management-heavy labels, or broader organization affordances should be treated as failure modes unless they directly reduce revisit friction without creating dashboard expectations.

### T-02. Action labels imply recommendations or management systems that do not exist
- Mitigation: review touched wording against the capability-honesty rule.

### T-03. Reopened-record cues accidentally change draft/submitted expectations
- Mitigation: explicitly recheck current record semantics after implementation.

### T-04. A convenience fix silently regresses live route usability
- Mitigation: pair route review with runtime smoke on touched surfaces.

## 4. Human review checklist

Before package sign-off or closeout, a human should review:
1. whether the chosen surfaces are truly the smallest high-leverage revisit set
2. whether reopening records is materially easier than before
3. whether action wording stays honest about current capability
4. whether any output drifted toward recommendation, reminder, or archive-management framing
5. whether the package stayed narrow and low-risk
6. whether evidence quality is explicit enough to justify sign-off
7. whether `/my/records/[id]` was kept deferred unless a specific list-only gap forced that expansion

## 5.1 Closeout disposition for 2026-03-15

- Closeout result: accepted as a narrow, truthful revisit-convenience package.
- Runtime revalidation: the older listener-startup blocker was downgraded to pending revalidation and proved stale in the current runner. Raw local bind, `npm run start -- --hostname 127.0.0.1 --port 3301`, and Playwright protected-flow smoke all succeeded.
- Scope disposition: accepted. The final implementation stayed on `/my/records` only and did not reopen `/my/records/[id]` or `/my/summary` because no fresh continuity gap required expansion.
- Capability honesty disposition: accepted. Final wording remains about continue/revisit convenience only and does not imply recommendation, reminder, or archive-management capability.
- Repo-health disposition: accepted. `npm run lint`, `npm run typecheck`, and `npm run build` all passed on the final 006 snapshot.
- Follow-up note: 006 is package-complete and should not be relaunched unless explicit rework is requested or a future package uncovers a concrete continuity regression tied back to the records list.

## 6. Exit condition for this document

An item can move out of this file only when:
- runtime or implementation evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off or closeout
