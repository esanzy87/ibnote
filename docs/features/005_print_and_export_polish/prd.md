# IBNote 005 Print and Export Polish PRD

Version: 0.1
Date: 2026-03-15
Owner: James / 1-person founder
Primary use: next-feature low-risk preservation/readability package for documented implementation
Status: Draft - ready for hardening/sign-off

---

## 1. Document purpose

This PRD defines the next package after 004 everyday activity-pack expansion.

This package exists to make IBNote outputs easier to preserve, read again, and share with oneself in lightweight ways without turning the product into a document-generation system or a file-management product.

The package should stay intentionally narrower and safer than 003 and 004.
It should focus on print readability, export-adjacent convenience, and low-risk preservation value.

This is not a document-builder platform.
This is not a PDF workflow overhaul.
This is not a storage/share system.

---

## 2. Package definition

### 2.1 One-line package definition
`005_print_and_export_polish` improves IBNote's preservation surfaces so parents can print or save records/summaries with better readability, clearer intent, and lower friction, without expanding into heavy export infrastructure.

### 2.2 Baseline truth inherited from earlier packages
- `000_bootstrap` remains the closed product baseline truth.
- `001_brand_marketing_design_foundation` remains the launch-surface expression baseline.
- `002_password_reset_foundation` remains the auth-recovery baseline.
- `003_learning_experience_foundation` remains the core templates -> records -> summary continuity baseline.
- `004_everyday_activity_pack_foundation` remains the activity-coverage and discovery baseline.
- Existing route model, auth model, record model, and summary model remain baseline truth unless 005 explicitly improves preservation/readability behavior on already-existing surfaces.

### 2.3 Package thesis
After expanding the core experience and activity coverage, the next low-risk leverage is not more capability breadth. It is making the existing outputs easier to preserve and revisit in calmer, clearer forms.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
After 004, the control-plane decision is to step down into a safer package with clearer scope boundaries and easier truthful verification.

### 3.2 Product risk being addressed
Without this package:
- printed output may feel visually noisy, incomplete, or less useful for later rereading
- preservation value may remain weaker than the product's reflection loop deserves
- parents may need awkward manual workarounds to keep a usable copy of what they already created
- export-related expectations may grow informally without a bounded product answer

### 3.3 Expected product impact
This package should improve:
- readability of printed/saved output
- parent confidence that notes and summaries can be preserved in a useful form
- revisit value of already-created records
- product polish without increasing product/system risk much

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Improve print readability and preservation quality on the most valuable existing surfaces.
2. Clarify what parts of a record or summary are worth preserving when printed or saved.
3. Reduce friction around lightweight export-adjacent actions without introducing heavy file workflows.
4. Preserve a calm, parent-facing tone while making outputs feel more archive-worthy.
5. Keep implementation and verification low-risk and easy to reason about.

### 4.2 Non-goals
This package must not:
- introduce a full PDF generation pipeline
- add email/share/invite distribution systems
- add cloud file storage, attachments, or download history
- create a broad report-card or portfolio-generation feature
- redesign core record-writing or summary-calculation logic beyond preservation/readability needs
- add admin, AI, account-lifecycle, or platform-management capability

### 4.3 Release rule
If a proposed change needs background file jobs, server-side document rendering, persistent export history, third-party delivery, or broad document-authoring semantics, it belongs in a later package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- print-readability improvements on already-existing printable or preservable surfaces
- lightweight export-adjacent affordances and wording that help parents understand how to preserve content
- route-level restructuring of printed layout where needed for calmer rereading
- modest record/summary presentation changes that improve preservation value without changing product meaning
- small continuity cues that make print/save actions feel intentional rather than tacked on

### 5.2 Out-of-scope
- server-generated PDFs
- email/export delivery flows
- multi-format file export systems
- attachment upload or media bundling
- portfolio/report-card assembly workflows
- analytics, admin tooling, account-lifecycle changes, or new AI behavior
- major data-model or route-architecture redesign

### 5.3 Boundary interpretation rule
If a change helps an existing IBNote record or summary print/save more clearly and usefully in a low-complexity way, it is probably in scope.
If it adds a new document/distribution platform capability, it is probably out of scope.

---

## 6. Candidate anchor surfaces

005 should stay anchored to the most preservation-relevant existing surfaces, in likely priority order:
1. record detail / record editor read-state surfaces
2. summary surfaces
3. template detail only if it materially supports preservation intent without broadening scope

The package does not need to touch every candidate surface. It should choose the smallest set with the clearest preservation payoff.

---

## 7. User story focus

Primary user story:
- As a parent, I want IBNote content to print or save in a form that still feels readable and worth keeping, so the product is more useful beyond the live screen.

Supporting user stories:
- As a parent rereading a printed note later, I want the important parts to stand out without visual clutter.
- As a parent using the browser's save/print path, I want IBNote to make that action feel intentional and low-friction.
- As a parent looking at a summary, I want the preserved version to remain modest, clear, and easy to revisit.

---

## 8. Quality principles

### 8.1 Product experience principles
- prefer preservation usefulness over feature breadth
- prefer calmer, clearer printed hierarchy over decorative density
- keep wording honest about what is and is not truly exported
- improve revisit value without implying official assessment or polished reports
- keep parent-facing output modest and archive-friendly

### 8.2 Technical principles
- prefer browser-native and existing-surface improvements over new infrastructure
- keep scope bounded to presentation and low-risk continuity where possible
- avoid introducing file-pipeline complexity unless explicitly re-scoped later
- keep verification concrete and repeatable

---

## 9. Definition of done

This package is done only when all are true:
1. the chosen preservation surfaces show materially better print/save readability
2. before/after evidence exists for the touched preservation surfaces
3. no drift into server-side export systems, file-management workflows, or broad reporting capability occurred
4. runtime and repo-health checks remain green where applicable
5. sign-off is recorded on the 005 docpack before implementation or closeout stage transitions that require it

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- route-level before/after review for the touched preservation surfaces
- evidence that printed/saved hierarchy is calmer and easier to reread
- evidence that action wording and preservation intent are clearer
- scope-audit result showing no drift into heavy export/distribution/file-management capability
- verification logs for lint, typecheck, build, and any relevant runtime/print smoke
- explicit sign-off record for `prd.md`, `spec.md`, `todo.md`, and `risk_analysis.md`

Evidence must distinguish between:
- direct runtime/implementation verification
- human quality judgment/sign-off
- still-open items that cannot yet be claimed as done

---

## 11. Guardrails for coding agents

1. Do not turn 005 into a PDF platform or sharing system.
2. Prefer browser-native, low-complexity preservation improvements.
3. Tie every touched change to readability, preservation value, or export-adjacent clarity.
4. Do not reopen broader template/records/summary product-definition work unless preservation needs truly require a minimal continuity adjustment.
5. If evidence is missing, leave the item open rather than overstating completion.
