# IBNote 006 Record Revisit Convenience Pack ADR

Status: Hardened draft - default touched-surface hypothesis and implementation boundaries locked for sign-off
Source of truth: `docs/epics/006_record_revisit_convenience_pack/prd.md`

## 1. Purpose

This document records the architectural and product-boundary decisions for 006 so future implementation stays low-risk and does not drift into recommendation or archive-management territory.

## 2. Accepted decisions

### ADR-001. 006 is a revisit-convenience package, not a recommendation system
- Date: 2026-03-15
- Status: accepted
- Context: after 005, the repo needs another deliberately low-risk package with tight scope and easy verification.
- Decision: 006 is limited to improving how parents return to and understand existing records on current record surfaces.
- Consequence: recommendation, resurfacing, ranking, or reminder capability remains out of scope.

### ADR-002. Existing record surfaces are the default technical strategy
- Date: 2026-03-15
- Status: accepted
- Context: revisit convenience can sprawl if new navigation or organization systems are introduced.
- Decision: prefer low-complexity improvements on `/my/records` first and `/my/records/[id]` only if the same small pass clearly improves re-entry truth.
- Consequence: new archive/search/tagging systems are out of scope.

### ADR-003. Surface selection must stay minimal and payoff-driven
- Date: 2026-03-15
- Status: accepted
- Context: many routes could be argued to “support revisit,” but that would weaken the package.
- Decision: implementation should choose the smallest set of existing surfaces with the clearest revisit-convenience payoff, with `/my/records` as the default first anchor, `/my/records/[id]` as conditional follow-on only if the same small pass clearly improves resumed reading/editing, and `/my/summary` excluded from the default touched set.
- Debate/sign-off refinement: current source truth shows `/my/records` already contains the strongest 006 leverage points (status labels, reopen/continue CTA wording, summary handoff, and list-level revisit framing), so the first implementation worker should begin from `/my/records` only. `/my/records/[id]` is allowed later only if a specific continuity gap is found during implementation that cannot stay truthful with list-only changes.
- Consequence: touching summary or unrelated surfaces requires explicit continuity rationale.

### ADR-004. Revisit output must stay modest, parent-facing, and non-systemic
- Date: 2026-03-15
- Status: accepted
- Context: convenience work can accidentally become management or recommendation framing.
- Decision: keep revisit language calm, practical, and continuity-oriented rather than predictive, managerial, or evaluative.
- Consequence: avoid institutional labels, recommendation framing, or “organize your archive” semantics.

### ADR-005. Verification must privilege reduced friction truth over cosmetic claims
- Date: 2026-03-15
- Status: accepted
- Context: convenience packages are easy to overstate if evidence stays subjective.
- Decision: 006 completion claims must be backed by route/content review, runtime smoke, scope audit, and repo-health commands.
- Debate/sign-off refinement: accepted red-team critique says the package fails if it merely makes `/my/records` look busier or more dashboard-like. Evidence must therefore show lower re-entry friction or clearer continue/revisit understanding, not just more labels or controls.
- Consequence: if before/after revisit value is not concrete, tasks remain open.

## 3. Deferred or explicitly rejected directions

### REJ-001. Smart resurfacing or recommendation engine
- Reason rejected now: too much product and system expansion for a low-risk follow-on package.

### REJ-002. Reminder or notification flows
- Reason rejected now: adds scheduling and messaging semantics beyond record revisit convenience.

### REJ-003. Archive-management features such as folders, tags, or saved views
- Reason rejected now: turns a bounded convenience package into a record-management system.

### REJ-004. Broad dashboard or summary-home redesign
- Reason rejected now: too close to wider navigation/product-definition work.

## 4. Revisit triggers

Revisit these decisions only if:
- a later package is explicitly chartered for recommendations, reminders, or archive organization
- human sign-off intentionally broadens the product into more advanced record management
- repeated real-user evidence shows current revisit convenience is insufficient without a broader system
