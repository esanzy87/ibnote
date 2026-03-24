# IBNote 001 Brand Marketing Design Foundation Risk Analysis

Status: Signed off - closeout review completed and package closed on 2026-03-14
Source of truth: `docs/epics/001_brand_marketing_design_foundation/prd.md`

## 1. Purpose

This document tracks risks that are unsafe to leave implicit during launch-facing refinement work.

Each item is here because at least one of the following is true:
- scope can drift from refinement into expansion
- quality is hard to judge without explicit criteria
- copy/design decisions can become subjective and inconsistent
- implementation can accidentally damage core workflow clarity
- implementation can start without governance clarity or safe resumability

Resolved defaults should move to `adr.md`.

## 2. Open risks and unresolved items

### R-01. Korean UX copy quality can remain uneven across routes

- PRD basis: sections 1, 7, 9
- Issue: parent-facing Korean may become inconsistent in tone, register, and terminology.
- Impact: product trust and clarity regress despite visual polishing effort.
- Affected areas: `/`, `/login`, `/templates`, `/templates/[slug]`, `/my/summary`, `/my/settings`
- Default handling: enforce copy principles + controlled vocabulary + route copy checklist.
- Human decision needed: founder copy review before claiming package completion.
- Decision deadline: before implementation sign-off.

### R-02. Branding ambiguity can produce mismatched route voices

- PRD basis: sections 2, 3, 7
- Issue: route copy can imply different product identities (education app, record tracker, or generalized parenting tool).
- Impact: weak product definition and lower conversion confidence.
- Affected areas: landing hero, login intro, template route headings, summary framing.
- Default handling: require one product-definition line and shared value framing across all in-scope routes.
- Human decision needed: final message hierarchy review.
- Decision deadline: before launch-facing QA closeout.

### R-03. Rebrand-overreach risk can expand scope beyond package intent

- PRD basis: sections 4, 5, 8
- Issue: the now-approved deeper rebrand can drift into product renaming, capability invention, component-system rewrite beyond route needs, or new feature surfaces.
- Impact: schedule slip and bootstrap-truth erosion.
- Affected areas: all in-scope routes and shared style layers.
- Default handling: allow deep visual redesign, but enforce hard stops on product-name changes and all capability/auth/backend/workflow expansion.
- Human decision needed: none unless a true scope exception is explicitly requested.
- Decision deadline: continuous during execution.

### R-04. Subjective review loops can block completion

- PRD basis: sections 9, 10
- Issue: without objective checks, review can stall on taste-based feedback.
- Impact: no clear done-state despite significant edits.
- Affected areas: route-level copy/hierarchy and visual polish.
- Default handling: use verification matrix with pass/fail criteria and before/after evidence.
- Human decision needed: approver confirms matrix-based completion, not aesthetic preference alone.
- Decision deadline: final QA gate.

### R-05. Trust framing can accidentally over-claim educational outcomes

- PRD basis: sections 3, 7, 9
- Issue: marketing wording may overpromise measurable academic outcomes.
- Impact: trust loss and support burden.
- Affected areas: landing and summary explanatory copy.
- Default handling: ban guarantee language and enforce concrete, truthful benefit framing.
- Human decision needed: final claim-language review.
- Decision deadline: before launch-facing publishing.

### R-06. Workflow regression hidden by surface-only focus

- PRD basis: sections 2, 9, 10
- Issue: route polish can unintentionally break existing CTA paths or auth redirects.
- Impact: conversion drop and functional regressions.
- Affected areas: login redirect, template start-record action, settings actions.
- Default handling: mandatory smoke checks on protected-route access and CTA flows.
- Human decision needed: none.
- Decision deadline: each implementation slice.

### R-07. Approved sign-off truth may remain unsynced in execution docs

- PRD basis: sections 9, 10, 11
- Issue: the human has already approved the rebrand direction in principle, but stale docs may still tell an agent that implementation is blocked on missing sign-off or limited to lightweight polish.
- Impact: premature blocking, stale scope assumptions, or incorrect implementation constraints.
- Affected areas: whole 001 package.
- Default handling: require docpack/control-plane sync before implementation starts and treat stale wording as a blocker until corrected.
- Human decision needed: none unless the approved direction changes again.
- Decision deadline: before any implementation task moves out of planning.

### R-08. Resumption after a pause can skip debate or reopen closed questions poorly

- PRD basis: sections 10, 11
- Issue: a later agent may not know whether 001 is drafted, approved, blocked, or already being implemented.
- Impact: duplicate work, skipped review, or partial execution from stale assumptions.
- Affected areas: `todo.md`, `docs/BLACKBOARD.md`, package state transitions.
- Default handling: require explicit current-state snapshot, next-step line, and sign-off blocker in docs.
- Human decision needed: none beyond maintaining sign-off truth.
- Decision deadline: before implementation handoff.

### R-09. Definition of done can be claimed without verifiable evidence quality

- PRD basis: sections 9, 10
- Issue: evidence references like "before/after review" can be asserted loosely without proving what changed or who approved it.
- Impact: package may be called done while remaining subjective or under-documented.
- Affected areas: QA closeout and human review.
- Default handling: require evidence to be labeled as runtime-verified, doc-reviewed, or still-open; reject ambiguous proof language.
- Human decision needed: final evidence adequacy review.
- Decision deadline: package closeout.

## 3. Threats and failure modes to test explicitly

### T-01. Scope creep by convenience additions

- Risk: introducing password reset, account deletion, provider expansion, analytics, CMS, or AI under "polish" framing.
- Mitigation: enforce out-of-scope audit in every QA gate.
- Residual risk: medium.

### T-02. CTA competition inside the same section

- Risk: multiple equally weighted actions reduce next-step clarity.
- Mitigation: one primary CTA per section, secondary CTA visual demotion.
- Residual risk: medium.

### T-03. Inconsistent terminology for same actions

- Risk: users see different labels for same intent across routes.
- Mitigation: shared controlled vocabulary review before completion.
- Residual risk: medium.

### T-04. Visual hierarchy mismatch across routes

- Risk: spacing/type/card/button hierarchy differs by route and harms brand coherence.
- Mitigation: apply the approved launch-surface rebrand contract and cross-route visual checklist.
- Residual risk: medium.

### T-05. Governance bypass by "implementation can decide later"

- Risk: open brand/copy decisions are pushed into code work instead of being resolved or explicitly deferred in docs.
- Mitigation: block implementation on stale doc-sync status and list stop-work conditions in spec.
- Residual risk: medium.

### T-06. Resumption from stale control-plane truth

- Risk: a restarted agent reads the docpack but not the latest BLACKBOARD state and starts the wrong phase.
- Mitigation: resumption protocol requires BLACKBOARD read plus explicit task snapshot verification.
- Residual risk: medium.

## 4. Human review checklist

Before package closeout, a human should review:
1. parent-friendly Korean readability and tone consistency
2. product-definition clarity in first-screen copy
3. trust/privacy wording truthfulness and placement
4. CTA hierarchy clarity on all in-scope routes
5. no out-of-scope feature signals in copy or UI
6. before/after evidence quality and honesty
7. explicit decision that 001 doc-sync is complete and implementation may proceed, or that another doc revision is still required
8. explicit confirmation that open risks are either accepted, deferred, or still blocking

## 4.1 Closeout disposition for 2026-03-14

Final human-style review pass was executed against the current implementation evidence and route copy diffs.

Checklist disposition:
1. parent-friendly Korean readability and tone consistency -> accepted for 001 closeout; major in-scope routes use simpler, more consistent parent-facing wording
2. product-definition clarity in first-screen copy -> accepted; landing hero now explains product purpose and next step more directly
3. trust/privacy wording truthfulness and placement -> accepted with no over-claim language found
4. CTA hierarchy clarity on all in-scope routes -> accepted; primary actions are clearer and secondary/support actions are visually demoted
5. no out-of-scope feature signals in copy or UI -> accepted; `E-03` exclusion audit found no drift
6. before/after evidence quality and honesty -> accepted as implementation-diff plus runtime/command evidence, though visual screenshot packaging can still be improved later if desired
7. explicit decision that 001 doc-sync is complete and implementation may proceed, or that another doc revision is still required -> accepted as complete; doc-sync and implementation evidence are aligned for package closeout
8. explicit confirmation that open risks are either accepted, deferred, or still blocking -> completed below; no remaining item is treated as a blocker for 001 closeout

Risk disposition summary:
- `R-01` accepted for this package closeout; future copy polish can continue as a later content-quality follow-up rather than a blocker
- `R-02` accepted; route voice now stays aligned to IBNote as a parent-facing home-activity record product
- `R-03` accepted/monitored; exclusion audit and task history found no rebrand overreach
- `R-04` accepted; matrix/task evidence was sufficient to avoid taste-only review loops for this package
- `R-05` accepted; no educational outcome over-claim language was found in the reviewed surfaces
- `R-06` accepted with evidence; protected-flow QA and regression smoke covered the main non-destructive paths
- `R-07` resolved in practice; docpack/control-plane sync is now reflected across `BLACKBOARD`, `todo.md`, and closeout notes
- `R-08` resolved in practice; current-state snapshot and exact next action are now explicit in control-plane docs
- `R-09` accepted; evidence is explicit enough for truthful closeout, while richer visual evidence bundling remains optional future polish

## 5. Exit condition for this document

An item can move out of this file only when one of the following is true:
- a default is fixed in `adr.md`
- implementation evidence resolves the risk with repeatable checks
- the item is no longer relevant to 001 package scope
- a human explicitly accepts or defers the risk in package sign-off
