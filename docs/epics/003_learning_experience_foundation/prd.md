# IBNote 003 Learning Experience Foundation PRD

Version: 0.1
Date: 2026-03-14
Owner: James / 1-person founder
Primary use: next-feature experience package for documented implementation
Status: Signed off - implementation may start

---

## 1. Document purpose

This PRD defines the next major package after launch-surface hardening (001) and password-recovery baseline (002).

This package exists to improve the real parent experience of using IBNote: choosing an activity, starting a record, writing without friction, revisiting records, and understanding summaries as part of one connected learning experience.

This is not a broad platform expansion package.
This is not an AI/recommendation package.
This is not an account-lifecycle package.

---

## 2. Package definition

### 2.1 One-line package definition
`003_learning_experience_foundation` improves IBNote's core end-user learning experience so parents can move from template discovery to record creation to record review and summary reading with more clarity, lower friction, and stronger felt value.

### 2.2 Baseline truth inherited from earlier packages
- `000_bootstrap` remains the closed product baseline truth.
- `001_brand_marketing_design_foundation` remains the launch-surface expression baseline.
- `002_password_reset_foundation` remains the auth-recovery baseline.
- Existing route model, auth model, and records/summary/settings structure remain baseline truth unless 003 explicitly improves the experience of already-in-scope flows.

### 2.3 Package thesis
The next product leverage is not more launch shell, nor another narrow account feature. The next leverage is making IBNote feel more useful and more worth revisiting through a stronger end-to-end learning experience.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
After 001 and 002, IBNote has stronger launch expression and account recovery. The next highest-leverage improvement is to make the actual product experience more coherent and more reusable.

### 3.2 Product risk being addressed
Without this package:
- template selection can still feel abstract or thin
- record creation can feel like form-filling instead of guided reflection
- record review and summary can feel disconnected from the original activity choice
- the product risks feeling functional but not meaningfully reusable

### 3.3 Expected product impact
This package should improve:
- understanding of what to do next across the main product flow
- parent confidence when starting and completing a record
- perceived usefulness when revisiting records and summaries
- the product's revisit/retention potential

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Make template discovery and selection feel more understandable and more useful.
2. Make the transition from template detail into record writing feel less abstract and less intimidating.
3. Make record revisiting and summary reading feel more connected to the original activity and its purpose.
4. Improve cross-surface tone, structure, and guidance so IBNote feels like one coherent experience rather than separate screens.
5. Preserve truthful scope and avoid feature inflation.

### 4.2 Non-goals
This package must not:
- add account deletion
- add new auth providers
- add AI-generated feedback or recommendation systems
- redesign the entire template system architecture
- add subscription/payment/admin systems
- introduce a new data model that changes product capability beyond experience improvements
- reposition IBNote away from the existing parent-facing reflection/record product truth

### 4.3 Release rule
If a proposed change requires new intelligence systems, broader product capability, destructive account lifecycle work, or major backend/data model expansion, it belongs in a later package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- template discovery and detail-surface clarity improvements
- prompt/copy/structure improvements in record-start and record-writing flow
- records and summary surfaces improvements that make revisit value clearer and easier to understand
- cross-surface guidance/tone/structure improvements across templates -> records -> summary
- limited UI/content restructuring where needed to reduce friction and improve continuity

### 5.2 Out-of-scope
- account deletion
- password-change/account-settings expansion unrelated to learning experience quality
- AI generation, recommendations, or adaptive scoring
- new premium/business/admin capabilities
- full template-engine redesign or template authoring system
- major analytics/telemetry rollout
- broad backend schema redesign

### 5.3 Boundary interpretation rule
If a change improves the clarity, usability, or felt value of the already-in-scope parent journey from choosing an activity to revisiting the result, it is probably in scope.
If it adds a new product capability rather than improving that journey, it is probably out of scope.

---

## 6. Anchor flows

003 should stay anchored to these three main flows:
1. template discovery -> template selection
2. record start -> record writing
3. record revisit -> summary reading

All work in this package should map clearly to at least one of these anchor flows.

---

## 7. User story focus

Primary user story:
- As a parent, I want IBNote to help me choose an activity, capture what happened, and later make sense of it, so the product feels genuinely useful rather than just stored.

Supporting user stories:
- As a parent browsing templates, I want to understand quickly which activity is right for now.
- As a parent starting a record, I want the product to guide me without making the task feel heavy.
- As a parent revisiting a record or summary, I want it to feel connected to what I did and what I might do next.

---

## 8. Quality principles

### 8.1 Product experience principles
- prefer felt usefulness over decorative polish
- reduce abstraction where it increases hesitation
- keep parent-facing language plain and concrete
- improve continuity between adjacent screens rather than optimizing each screen in isolation
- preserve truthful educational modesty; do not overclaim outcomes

### 8.2 Technical principles
- prefer experience-layer changes over new system complexity
- keep route structure and data flow as stable as possible unless a user-facing continuity gain clearly justifies more change
- keep verification explicit; do not mark “quality” work done based on taste alone

---

## 9. Definition of done

This package is done only when all are true:
1. The three anchor flows show materially improved clarity and continuity.
2. Before/after evidence exists for each anchor flow.
3. The package does not drift into account lifecycle, AI, admin, or backend-platform expansion.
4. Runtime and repo-health checks remain green where applicable.
5. Human sign-off is recorded on the 003 docpack.

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- anchor-flow before/after review notes
- route/copy/structure evidence for templates, records, and summary surfaces touched by the package
- runtime smoke checks for affected main-path flows
- scope-audit result showing no drift into excluded capabilities
- verification logs for lint, typecheck, build
- explicit human sign-off record for `prd.md`, `spec.md`, `todo.md`, and `risk_analysis.md`

Evidence must distinguish between:
- direct runtime/implementation verification
- human quality judgment/sign-off
- still-open items that cannot yet be claimed as done

---

## 11. Guardrails for coding agents

1. Do not turn this into a generic polish bucket.
2. Tie every change to one of the three anchor flows.
3. Prefer clearer user experience over broader feature scope.
4. Do not add AI, account deletion, provider expansion, or admin capability.
5. If a proposed change improves appearance but not understanding, continuity, or felt value, deprioritize it.
6. If evidence is missing, leave the item open rather than overstating completion.
