# IBNote 003 Learning Experience Foundation ADR

Status: Signed-off defaults for 003 implementation
Source of truth: `docs/features/003_learning_experience_foundation/prd.md`

## 1. Purpose

This document records fixed decisions for the 003 package so planning and implementation do not collapse into vague polish work or unrelated feature expansion.

## ADR-001. Keep 003 anchored to three user flows

- Status: accepted
- Context: the package can easily spread unless it is anchored to clear user journeys.
- Decision: 003 must stay tied to three anchor flows only: template discovery -> selection, record start -> writing, and record revisit -> summary reading.
- Consequences:
  - the package keeps a coherent story
  - unrelated polish can be rejected more easily

## ADR-002. Treat 003 as learning-experience hardening, not a copy-only pass

- Status: accepted
- Context: a package framed only as content or copy polish risks feeling too small and too subjective.
- Decision: 003 is an experience package focused on understanding, continuity, felt usefulness, and revisit value.
- Consequences:
  - meaningful UX/content changes are allowed
  - purely decorative or wording-only changes are not enough by themselves

## ADR-003. Exclude account lifecycle and capability expansion

- Status: accepted
- Context: account deletion and similar lifecycle work remains important, but it is not the main product-experience package.
- Decision: keep account lifecycle, provider expansion, AI, admin, and major capability expansion out of 003.
- Consequences:
  - the package remains product-experience focused
  - later packages retain room for clear lifecycle/platform work

## ADR-004. Require before/after evidence tied to the anchor flows

- Status: accepted
- Context: quality packages can otherwise drift into taste-only claims.
- Decision: every major improvement must be explainable and evidenced against at least one anchor flow.
- Consequences:
  - completion can be judged with more discipline
  - red-team review has concrete material to test

## ADR-005. Prefer continuity improvements over structural reinvention

- Status: accepted
- Context: the goal is a stronger connected experience, not a platform rewrite.
- Decision: prefer improving transitions, clarity, and continuity across existing surfaces before inventing new systems.
- Consequences:
  - implementation remains bounded
  - risk of accidental product expansion stays lower
