# IBNote 002 Password Reset Foundation PRD

Version: 0.1
Date: 2026-03-14
Owner: James / 1-person founder
Primary use: account-lifecycle follow-up package for coding-agent execution
Status: Signed off - implementation may start

---

## 1. Document purpose

This PRD defines the first post-001 account-lifecycle package for IBNote.

This package exists to add the minimum self-serve password reset capability needed for launch trust and recovery, without expanding into broader account-management complexity.

The package should let a locked-out user recover access to the existing product with low confusion and low implementation risk.

This is not a full account-management package.
This is not an account-deletion package.
This is not an auth-provider expansion package.

---

## 2. Package definition

### 2.1 One-line package definition
`002_password_reset_foundation` adds a safe, minimal password-reset flow for email/password accounts so parents can recover access to their existing IBNote records without human intervention.

### 2.2 Baseline truth inherited from 000 and 001
- `000_bootstrap` remains the closed product baseline truth.
- `001_brand_marketing_design_foundation` is sign-off-ready closeout truth for launch-facing expression quality.
- Auth model remains email/password only.
- Existing route model and protected-route behavior remain intact unless this package explicitly adds one minimal reset-recovery entry point.
- Existing data model, records flow, summary flow, and settings behavior remain baseline truth unless directly needed for password-reset clarity.

### 2.3 Package thesis
The next launch risk is not feature breadth. The next launch risk is that a parent who forgets a password can be locked out of their own records with no self-serve recovery path.

---

## 3. Why this package exists now

### 3.1 Sequencing reason
After 001, the highest-leverage trust/completeness improvement is a narrow account-recovery capability rather than broader lifecycle expansion.

### 3.2 Product risk being addressed
Without this package:
- a real parent can fail at re-entry after initial use
- trust drops because the product appears unfinished at a basic account-recovery level
- support burden rises because a standard self-serve auth expectation is missing

### 3.3 Expected launch impact
This package should improve:
- user trust in account ownership continuity
- re-entry success for returning users
- launch readiness of the current email/password auth model

---

## 4. Goals and non-goals

### 4.1 Goals
This package must:
1. Add a clear password-reset entry point for existing email/password users.
2. Let the user request a reset email safely and with low confusion.
3. Keep product truth and privacy posture intact.
4. Preserve existing sign-in/create-account behavior for users who do not need reset.
5. Avoid introducing broader account-lifecycle complexity.

### 4.2 Non-goals
This package must not:
- add account deletion
- add social login or new auth providers
- redesign the full auth system
- add admin/manual account recovery flows
- add profile-management expansion unrelated to reset
- reopen 001 visual scope beyond what is needed for route consistency

### 4.3 Release rule
If a proposal requires broader account lifecycle, reauthentication policy, data deletion semantics, or support tooling beyond minimal password reset, it belongs in a later package.

---

## 5. In-scope and out-of-scope

### 5.1 In-scope
- reset entry point from auth surface
- password reset request flow for email/password accounts
- success/error/help copy for reset initiation
- one dedicated minimal reset-request route as the default UX shape
- minimal route/copy additions required to keep the flow understandable
- regression verification that normal login/create-account still works

### 5.2 Out-of-scope
- account deletion
- password change for already-authenticated users unless implementation truth makes a tiny supporting hook unavoidable
- support-admin override flows
- multi-provider account linking
- phone verification, MFA, or advanced identity recovery
- records/data deletion semantics

### 5.3 Boundary interpretation rule
If the change solves “I forgot my password and need to get back into my existing account” with standard email/password recovery behavior, it is probably in scope.
If it solves a wider account-management or identity problem, it is probably out of scope.

---

## 6. Target surfaces

Primary surfaces likely involved:
- `/login`
- minimal reset-request surface if required by the chosen implementation

Protected routes are not redesign targets in this package except for regression protection.

---

## 7. User story focus

Primary user story:
- As a parent who used IBNote before but forgot my password, I want to request a reset safely and clearly so I can recover access to my saved records without contacting someone.

Supporting user stories:
- As a new user, I should still be able to distinguish sign-in, account creation, and reset clearly.
- As a returning user, I should understand what happens after requesting a reset and what to do next.

---

## 8. Quality principles

### 8.1 Copy and UX principles
- keep the flow plain, calm, and non-technical
- avoid leaking account existence through overly specific messaging
- explain the next step clearly after reset request submission
- keep auth surfaces consistent with 001 tone and trust framing

### 8.2 Technical principles
- use the smallest standard Firebase-compatible reset path
- prefer existing auth infrastructure over custom recovery logic
- keep failure states explicit but non-sensitive

---

## 9. Definition of done

This package is done only when all are true:
1. Existing email/password users can discover the reset path from the auth flow.
2. Reset request submission works on the active runtime for valid auth configuration.
3. The flow does not create new auth ambiguity for sign-in/create-account users.
4. Scope remains limited to password reset.
5. Regression checks for auth entry and protected-route continuity remain green.
6. lint/typecheck/build remain green.
7. Human sign-off is recorded on the 002 docpack.

---

## 10. Acceptance evidence requirements

Implementation acceptance should include:
- route-level/copy review of the reset entry and request state
- runtime verification for reset request initiation on the active project/runtime
- regression checks for standard login/create-account behavior
- scope-audit result showing no drift into delete/provider/admin flows
- verification logs for lint, typecheck, build
- explicit human sign-off record for `prd.md`, `spec.md`, `todo.md`, and `risk_analysis.md`

Evidence must distinguish between:
- verified from runtime/implementation evidence
- approved by human review
- still open and therefore not claimable as done

Runtime evidence rule:
- minimum pass evidence is that the reset request path executes successfully against the active runtime/auth project and the user-facing success/help state is shown truthfully
- stronger optional evidence is that a QA inbox independently confirms delivery of the reset email
- if request initiation is verified but delivery cannot be independently confirmed, do not overclaim full delivery truth; record the exact evidence boundary explicitly
- if provider-side or env-side delivery setup is the blocker, report it as external runtime/provider truth rather than silently converting it into product completion

---

## 11. Guardrails for coding agents

1. Do not add account deletion.
2. Do not add new auth providers.
3. Do not invent support tooling or admin interventions.
4. Keep changes tightly focused on password reset discoverability and request execution.
5. If implementation offers multiple valid UI shapes, choose the smallest understandable flow.
6. If evidence is missing, leave the item open rather than overstating completion.
