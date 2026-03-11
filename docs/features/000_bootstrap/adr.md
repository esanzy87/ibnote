# IBNote Bootstrap ADR

Status: Active defaults for MVP implementation
Source of truth: `docs/features/000_bootstrap/prd.md`

## 1. Purpose

This document records decisions that the coding agent should treat as fixed during implementation.

Rules:
- if the PRD already makes the decision, record it here for fast reference
- if the PRD gives multiple valid options and implementation would otherwise require guessing, choose the smallest valid default and record it here
- if something is still unresolved, keep it in `docs/features/000_bootstrap/risk_analysis.md` instead

## ADR-001. Use the low-ops web SaaS stack from the PRD

- Status: accepted
- PRD trace: sections 3.2, 8, 9.1, 10
- Context: the founder wants the first launchable version to be cheap, simple, web-only, and safe for vibe-coding.
- Decision: use Next.js App Router, TypeScript, Tailwind CSS, Firebase Auth with email/password accounts, Cloud Firestore, and Vercel beta/prototype deployment.
- Consequences:
  - implementation stays web-first and avoids custom backend work
  - templates remain static repo content
  - private user data stays in Firestore
  - Firebase Storage is excluded from MVP

## ADR-002. Keep templates in the repository and keep Firestore private-data only

- Status: accepted
- PRD trace: sections 3.3, 10.1, 10.2, 10.3, 17.3
- Context: the PRD explicitly separates public marketing content from authenticated user data.
- Decision: store template data as typed repository files and do not store templates in Firestore.
- Consequences:
  - no CMS or admin publishing flow is needed for MVP
  - template publishing happens through code change plus deploy
  - Firestore security scope remains limited to user-owned records/profile data

## ADR-003. Keep the landing page public and gate the actual service behind login

- Status: accepted
- PRD trace: sections 2, 8, 13, 14, 25
- Context: the product is now web SaaS only and should serve logged-in accounts only, but the landing page still needs to explain the product and funnel users into sign-in.
- Decision: keep `/` public as a marketing/entry route. Require a signed-in account for `/templates`, `/templates/[slug]`, and all `/my/*` routes. Add a dedicated `/login` route for sign-in and account creation.
- Consequences:
  - template browsing becomes part of the authenticated service experience
  - route protection must redirect unsigned users to `/login`
  - there is now an explicit auth screen in MVP

## ADR-004. Use simple custom hooks plus minimal context for state management

- Status: accepted
- PRD trace: section 18.1, section 18.2
- Context: the PRD allows several state approaches but recommends the lowest cognitive-load option.
- Decision: use simple custom hooks plus minimal context as the default architecture.
- Consequences:
  - implementation remains understandable to a low-skill coding agent
  - avoid introducing Zustand, TanStack Query, SWR, or equivalent libraries in MVP unless a documented blocker appears
  - state should stay close to the feature modules listed in the recommended repo structure

## ADR-005. Prefer one-time Firestore fetches over live listeners unless a route clearly benefits from live updates

- Status: accepted
- PRD trace: section 18.3
- Context: the PRD allows live fetch or one-time fetch for records. The MVP does not require collaborative or real-time behavior.
- Decision: default to one-time reads/writes for records and summary pages. Add live listeners only if a specific route becomes simpler with them and does not increase complexity.
- Consequences:
  - less subscription lifecycle complexity
  - easier debugging for draft/save/submit flows
  - records refresh on page load or explicit post-save reload behavior rather than passive live sync

## ADR-006. Create the record immediately when the user starts recording

- Status: accepted
- PRD trace: sections 13.3, 14.2, 15.3, 20.4
- Context: the PRD says `Start record` should create a draft record and redirect to the editor.
- Decision: the primary user flow creates the draft immediately from the template detail page and then opens `/my/records/[id]`.
- Consequences:
  - template snapshot fields are locked at draft creation time
  - the user never lands on an empty record form detached from a stored draft
  - `/my/records/new?template={slug}` may exist only as an implementation helper, not as a manual creation workflow

## ADR-007. Display summary averages as numeric score plus nearest letter label

- Status: accepted
- PRD trace: section 15.6
- Context: the PRD allows either number plus label or rounded letter display.
- Decision: show each competency average as a rounded numeric value plus the nearest letter label.
- Consequences:
  - users can see both precision and a simple grade-like meaning
  - the summary remains understandable without charts
  - the implementation stays inside the PRD's allowed display options

## ADR-008. Keep account lifecycle minimal in bootstrap MVP

- Status: accepted
- PRD trace: sections 13, 15.7, 22, 25
- Context: the direction changed from anonymous auth to login-account-only access. Account creation and sign-in are required, but full account management would expand scope.
- Decision: support account creation, sign-in, sign-out, and delete-all-record-data. Do not include full account deletion or password-reset flows in bootstrap MVP.
- Consequences:
  - settings stays focused on record-data deletion and sign-out
  - login/account UX remains buildable for a low-skill coding agent
  - broader account lifecycle features move out of bootstrap scope

## ADR-009. Use route-local loading, empty, and error states instead of a shared complex state framework

- Status: accepted
- PRD trace: sections 21.3, 28.4, 30, 31
- Context: the PRD requires explicit loading, empty, and error states across the app.
- Decision: implement simple route-local states for each page rather than building a global async state abstraction.
- Consequences:
  - each route remains easier to reason about for a low-skill coding agent
  - error handling stays close to the relevant query or mutation
  - there is less shared infrastructure to debug during MVP buildout
