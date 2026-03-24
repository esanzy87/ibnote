# IBNote 001 Brand Marketing Design Foundation PRD

Version: 0.2
Date: 2026-03-14
Owner: James / 1-person founder
Primary use: Launch-facing product-surface refinement guide for coding-agent execution
Status: Signed off - package closed on 2026-03-14

---

## 1. Document purpose

This PRD defines IBNote's first post-bootstrap feature package focused on launch-facing brand, marketing, and design rebrand.

This package is intentionally optimized for:
- clearer product messaging
- stronger parent trust framing
- better launch conversion flow
- a deeper launch-surface visual redesign
- a cohesive brand/marketing expression for the existing product
- safe scope for a low-skill coding agent

This is not a product capability expansion package. It is a launch-surface rebrand package for the existing product truth.

---

## 2. Package definition

### 2.1 One-line package definition
`001_brand_marketing_design_foundation` is a launch-facing brand, marketing, and design rebrand pass that makes the existing IBNote product easier to understand, easier to trust, easier to try, and visually distinct at launch while preserving the existing product truth.

### 2.2 Baseline truth inherited from bootstrap
- `000_bootstrap` is complete and remains the closed baseline truth.
- Core product loop remains unchanged: template browse -> home activity -> short record -> recent summary -> repeat.
- Route model remains unchanged:
  - public: `/`, `/login`
  - protected: `/templates`, `/templates/[slug]`, `/my/records`, `/my/records/new?template={slug}`, `/my/records/[id]`, `/my/summary`, `/my/settings`

If older bootstrap text conflicts with closeout truth, use the latest closeout snapshot in `docs/epics/000_bootstrap/todo.md` and current control-plane/docpack truth as canonical.

### 2.3 Package thesis
The next launch risk is not missing feature breadth. The next launch risk is weak product surface clarity, weak trust communication, and a launch presentation that still looks too close to a bootstrap baseline.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
Immediately after bootstrap closeout, the highest leverage work is a launch-facing rebrand of in-scope surfaces, not new feature depth.

### 3.2 Product risk being addressed
Without this package:
- first-time parents may not quickly understand what IBNote does
- trust and privacy framing may feel incomplete or inconsistent
- CTA hierarchy may compete or feel uncertain
- visual rhythm across launch-facing routes may look uneven or too bootstrap-minimal for launch

### 3.3 Expected launch impact
This package should improve:
- product clarity at first glance
- trust perception before sign-in
- confidence to continue into login/templates flow
- consistency across key route surfaces
- stronger launch distinctiveness without changing product behavior

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Increase product clarity on launch-facing routes.
2. Strengthen trust and privacy framing in parent-facing copy.
3. Improve CTA hierarchy so the next action is obvious per screen.
4. Execute a deeper launch-surface visual redesign across in-scope routes while keeping behavior unchanged.
5. Preserve bootstrap-defined workflow and route behavior.

### 4.2 Non-goals
This package must not:
- add new product workflow steps
- expand auth lifecycle
- add data model, backend, or platform work
- introduce analytics infrastructure
- change the product name `IBNote`
- introduce new product capability under rebrand framing

### 4.3 Release rule
If a proposal changes product capability instead of improving clarity/trust/consistency of existing surfaces, move it out of this package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- landing page messaging refinement
- value proposition clarity pass
- CTA hierarchy refinement on launch-facing routes
- trust/privacy framing improvement in user-facing copy
- parent-friendly Korean copy consistency pass
- launch-facing route visual hierarchy, spacing, component, and composition redesign
- launch-surface brand/marketing expression refresh for the existing product
- reworked design foundation rules (color/spacing/type/button/card) for in-scope surfaces only

### 5.2 Out-of-scope
- password reset
- optional account deletion
- new auth providers
- AI features
- recommendation engine
- template CMS
- analytics dashboard
- product renaming away from `IBNote`
- illustration production pipeline
- new backend/platform work

### 5.3 Boundary interpretation rule
If a proposed change needs new product logic, new data requirements, new route states, new UI sections to explain new behavior, or new promises that the current product cannot already support, it is out of scope for 001 even if it appears useful for the rebrand.

---

## 6. Target surfaces

In this package, "launch-facing" includes public entry routes and selected protected early-use/retention routes that directly shape launch trust and return intent.

Primary launch-facing surfaces in this package:
- `/` (landing)
- `/login`
- `/templates`
- `/templates/[slug]`
- `/my/summary`
- `/my/settings`

Related alignment note:
- `/my/records*` is not a redesign target in this package, but any shared terminology/CTA wording that touches it must remain consistent where linked.

---

## 7. Copy and message principles

### 7.1 Korean copy baseline
- Use simple parent-facing Korean.
- Avoid jargon-heavy education wording.
- Avoid inflated claims or guaranteed outcomes.
- Keep one core message per section.

### 7.2 Message hierarchy rule
Each major section should answer in order:
1. What this is
2. Why this matters now
3. What to do next

### 7.3 CTA rule
- One primary CTA per major section.
- CTA labels must be verb-first and specific.
- Secondary CTAs must be visually subordinate.

### 7.4 Trust framing rule
- Place privacy/trust guidance near relevant user action points.
- Keep policy language concrete and short.
- Do not introduce legal over-claims.

---

## 8. Design foundation principles

### 8.1 Scope of design foundation in this package
This package defines an implementation-safe but materially deeper launch-surface rebrand contract:
- shared color usage intent for launch-facing surfaces
- spacing rhythm and section hierarchy rules
- typography scale intent for headline/body/caption
- button, card, and section composition consistency rules
- launch-facing art direction and visual tone changes that do not alter product capability truth

### 8.2 Explicit exclusions
Do not include:
- product renaming away from `IBNote`
- claims that imply new capability, new workflow, or new backend truth
- illustration/content production pipelines that exceed route implementation needs
- broad component library rewrite unrelated to in-scope surfaces

### 8.3 Consistency rule
Prefer route-surface redesign that stays within existing product structure and behavior contracts; visual depth is allowed, workflow rewrite is not.

---

## 9. Definition of done

This package is done only when all are true:
1. Product clarity criteria pass on in-scope routes via VR-01..VR-08 in `docs/epics/001_brand_marketing_design_foundation/spec.md`.
2. Trust/privacy expression is stronger and consistent across in-scope routes.
3. CTA hierarchy is clear and consistent per route.
4. Launch-facing visual hierarchy/spacing/component consistency is improved.
5. Core bootstrap workflow remains non-destructive.
6. Build/lint/typecheck remain green after implementation.
7. Human sign-off for this rebrand direction is explicitly recorded and the synced docpack matches that decision.
8. Execution/handoff notes are sufficient for a new agent to resume without reinterpreting package intent.

Non-acceptable DoD claim:
- "It looks prettier" without clarity/trust/consistency evidence.

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- route-level before/after captures or equivalent structured review notes
- a copy consistency checklist result
- a scope guardrail audit result (no out-of-scope drift)
- verification logs for lint, typecheck, build
- an explicit human sign-off record covering `prd.md`, `spec.md`, `todo.md`, `adr.md`, and `risk_analysis.md`, including the rule that `IBNote` name stays while full launch-surface rebrand is allowed
- a completion snapshot in `todo.md` showing current phase/task truth and next resumable step

Evidence must distinguish between:
- verified from implementation/runtime evidence
- approved by human review
- still open and therefore not claimable as done

---

## 11. Guardrails for coding agents

1. Do not add new product capabilities.
2. Do not alter auth/data/backend behavior.
3. Do not add new routes for this package.
4. Keep changes focused on launch-facing copy/layout/style rebrand of existing surfaces.
5. If unsure, choose smaller refinement and keep workflow unchanged.
6. Do not mark 001 implementation as started until the docpack is synced to the approved rebrand direction and control-plane truth reflects that implementation may begin.
7. If evidence is missing, weaken the claim or leave the item open; do not invent support.
