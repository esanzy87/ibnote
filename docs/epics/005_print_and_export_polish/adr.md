# IBNote 005 Print and Export Polish ADR

Status: Draft - decisions to be hardened before implementation sign-off
Source of truth: `docs/epics/005_print_and_export_polish/prd.md`

## 1. Purpose

This document records the architectural and product-boundary decisions for 005 so future implementation stays low-risk and does not drift into a document/export platform.

## 2. Accepted decisions

### ADR-001. 005 is a preservation/readability package, not an export platform
- Date: 2026-03-15
- Status: accepted
- Context: after 004, the repo needs a deliberately lower-risk package with tight scope and easy verification.
- Decision: 005 is limited to improving how existing IBNote outputs are preserved, printed, or browser-saved in low-complexity ways.
- Consequence: server-side document generation, delivery systems, and file workflow capability are out of scope.

### ADR-002. Browser-native print/save paths are the default technical strategy
- Date: 2026-03-15
- Status: accepted
- Context: the product already has some print-related behavior, and the package should remain implementation-light.
- Decision: prefer browser-native print/save behavior, print CSS refinement, and touched-surface layout cleanup over new export infrastructure.
- Consequence: wording must stay honest about what the browser does versus what IBNote directly provides.

### ADR-003. Surface selection must stay minimal and payoff-driven
- Date: 2026-03-15
- Status: accepted
- Context: preservation polish can sprawl if every route is treated as potentially printable.
- Decision: implementation should choose the smallest set of existing surfaces with the clearest preservation payoff, with `/my/summary` as the default first anchor, `/my/records/[id]` as conditional follow-on only if the same small pass clearly improves preserved readability, and `/templates/[slug]` excluded from the default touched set.
- Consequence: touching template detail or adjacent surfaces requires explicit continuity rationale.

### ADR-004. Preserved output must stay modest, parent-facing, and non-report-like
- Date: 2026-03-15
- Status: accepted
- Context: export/preservation work can accidentally make the product feel like official assessment or reporting.
- Decision: keep printed/saved output calm, archive-friendly, and useful for revisit without report-card or diagnostic tone.
- Consequence: avoid institutional labels, assessment framing, or official-document semantics.

### ADR-005. Verification must privilege print-readability truth over cosmetic claims
- Date: 2026-03-15
- Status: accepted
- Context: polish packages are easy to overstate if evidence remains subjective.
- Decision: 005 completion claims must be backed by print-emulation checks, route/content review, scope audit, and repo-health commands.
- Consequence: if before/after preservation value is not concrete, tasks remain open.

## 3. Deferred or explicitly rejected directions

### REJ-001. Full PDF generation pipeline
- Reason rejected now: too much system/capability expansion for a low-risk polish package.

### REJ-002. Email/share/send export flows
- Reason rejected now: requires broader delivery semantics and user expectations than 005 should own.

### REJ-003. Download history or saved-export library
- Reason rejected now: turns a bounded preservation package into file management.

### REJ-004. Portfolio/report-card assembly
- Reason rejected now: too close to broad reporting and educational overclaim.

## 4. Revisit triggers

Revisit these decisions only if:
- a later package is explicitly chartered for richer document/export capability
- human sign-off intentionally broadens the product into file delivery or reporting workflows
- repeated real-user evidence shows browser-native print/save is insufficient for the product goal
