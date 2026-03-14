# IBNote 001 Brand Marketing Design Foundation ADR

Status: Signed-off defaults and execution record for closed 001 package
Source of truth: `docs/features/001_brand_marketing_design_foundation/prd.md`

## 1. Purpose

This document records fixed decisions for the 001 package so implementation does not drift into feature expansion.

Rules:
- if 001 PRD already makes the decision, record it here for fast reference
- if multiple valid refinement options exist, choose the smallest valid default
- unresolved review-sensitive items belong in `risk_analysis.md`

## ADR-001. Keep 001 as a refinement-only package

- Status: accepted
- Context: post-bootstrap priority is launch-facing clarity/trust/consistency, not capability breadth.
- Decision: 001 modifies copy, visual hierarchy, and surface consistency only.
- Consequences:
  - no new workflow/auth lifecycle/backend features are introduced
  - scope control is simpler and verification is clearer

## ADR-002. Treat 000 bootstrap as closed baseline truth

- Status: accepted
- Context: bootstrap closeout has completed and must not be implicitly reopened.
- Decision: all 001 requirements inherit the existing product loop, route map, and behavior contracts.
- Consequences:
  - 001 focuses on expression quality of existing surfaces
  - any capability change request must become a separate future package

## ADR-003. Preserve route map and access model

- Status: accepted
- Context: launch-facing reliability depends on stable public/protected route semantics.
- Decision: keep `/`, `/login` public and existing service routes protected as-is.
- Consequences:
  - no access-control re-architecture inside 001
  - route-level refinements stay low risk

## ADR-004. Use plain Korean, parent-first tone canon

- Status: accepted
- Context: copy quality is a primary risk area and major launch-facing lever.
- Decision: adopt plain Korean with minimal jargon, concrete wording, and no inflated claims.
- Consequences:
  - copy reviews become more objective
  - trust messaging is easier to keep consistent across routes

## ADR-005. One primary CTA per major section

- Status: accepted
- Context: mixed CTA emphasis weakens conversion clarity.
- Decision: each major section uses one dominant next action; secondary actions are supportive.
- Consequences:
  - clearer user progression
  - less visual and messaging competition

## ADR-006. Full launch-surface rebrand is allowed, but product truth remains fixed

- Status: accepted
- Context: the human explicitly approved a deeper brand/marketing/design reset for launch surfaces, while preserving the product name and all capability/auth/backend/workflow truth.
- Decision: allow a materially deeper rebrand across in-scope launch-facing surfaces, including stronger visual redesign and brand expression, as long as `IBNote` remains the product name and no new capability is introduced.
- Consequences:
  - implementation is no longer limited to lightweight polish
  - scope control must focus on preserving product truth rather than preserving the old visual baseline

## ADR-007. Verify with before/after review + regression checks

- Status: accepted
- Context: this package can otherwise degrade into subjective taste discussion.
- Decision: use route-level before/after checks plus lint/typecheck/build and workflow regression smoke.
- Consequences:
  - completion criteria stay measurable
  - "looks nicer" alone is not accepted as completion evidence

## ADR-008. Require synced documentation after human sign-off before implementation start

- Status: accepted
- Context: the human has now approved the rebrand direction in principle, but the docs still contained the earlier lightweight-only assumption.
- Decision: implementation may start only after the approved decision is synced across the docpack and control plane.
- Consequences:
  - implementation does not start from stale constraints
  - review disagreements are resolved in docs before code churn begins

## ADR-009. Prefer weakening unsupported claims over inventing support

- Status: accepted
- Context: launch-facing copy packages can drift into unverifiable promises when evidence is thin.
- Decision: if the docs cannot support a claim from existing product truth, weaken, narrow, or remove the claim.
- Consequences:
  - package truthfulness stays auditable
  - coding agents have less incentive to fabricate rationale or DoD evidence

## ADR-010. Make resumability a first-class package requirement

- Status: accepted
- Context: unattended or restarted work can misread drafted docpacks and start implementation prematurely.
- Decision: the package must include explicit current-state, next-step, sign-off, and stop-work instructions across `spec.md`, `todo.md`, and `docs/BLACKBOARD.md`.
- Consequences:
  - future agents can resume safely with less interpretation
  - recurrent work is less likely to duplicate debate or skip governance
