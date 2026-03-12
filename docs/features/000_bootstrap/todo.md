# IBNote Bootstrap Todo

Status: Ready for execution tracking
Source of truth: `docs/features/000_bootstrap/spec.md`
Companion docs:
- `docs/features/000_bootstrap/prd.md`
- `docs/features/000_bootstrap/adr.md`
- `docs/features/000_bootstrap/risk_analysis.md`

## 1. How to use this file

This file is the execution tracker for the bootstrap implementation.

Rules for the coding agent:
- update task `Status` in place as work progresses
- keep only one task `in_progress` at a time unless the tasks are explicitly parallel-safe
- do not start a task while any task in its `Blocked by` field is incomplete
- do not mark a phase complete until all tasks in that phase and the phase QA gate are complete
- if implementation decisions conflict with this file, `spec.md` wins and this file must be updated immediately
- cross-phase prerequisites are allowed only when they are explicitly listed in a task's `Blocked by` field or in the `Cross-phase exceptions` section below
- if a human reports an external fix for a blocker, do not keep the task as if it were freshly `blocked` without a new smoke verification; temporarily move it to `pending_revalidation` until current runtime truth is rechecked

Allowed status values:
- `todo`
- `in_progress`
- `blocked`
- `pending_revalidation`
- `done`
- `cancelled`

Priority meanings:
- `P0`: blocks multiple later tasks or core app access
- `P1`: directly required for MVP user flow
- `P2`: required polish or support work inside MVP scope

## 2. Phase gates

Execution order is fixed:
1. Phase A - Foundation
2. Phase B - Static template system
3. Phase C - Account auth and records
4. Phase D - Summary and settings
5. Phase E - Polish and launch QA

Do not pull work from a later phase forward unless the task is explicitly marked as parallel-safe and has no unmet blockers.

Cross-phase exceptions:
- `C-01`, `C-02`, and `C-03` are allowed to start before Phase B is closed because protected template routes cannot be verified without working auth
- `D-06` is allowed to update index config after Phase C because summary queries may reveal additional required indexes

## 3. Global blockers

These conditions block large parts of the work:

| ID | Blocker | Affects | Clear when |
| --- | --- | --- | --- |
| GB-01 | Base app scaffold missing | All phases | Next.js app, Tailwind, and Firebase client bootstrap exist |
| GB-02 | Auth guard missing | Protected routes in Phases B-D | Login flow and route guard work |
| GB-03 | Template data missing | Record creation, template browsing, print | Published template pack exists |
| GB-04 | Firestore rules/index config missing | Records, summary, settings | Security rules and required indexes are committed |

## 4. Task ledger

Use this table as the high-level progress board.

| ID | Phase | Task | Priority | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| A-01 | A | Scaffold Next.js App Router project | P0 | done | - |
| A-02 | A | Install Tailwind and Firebase SDK | P0 | done | A-01 |
| A-03 | A | Add Firebase env config pattern | P0 | done | A-02 |
| A-04 | A | Create app shell layout and nav | P1 | done | A-01 |
| A-05 | A | Add landing page route shell | P1 | done | A-04 |
| A-06 | A | Add login page route shell | P1 | done | A-04 |
| B-01 | B | Define template types and filter helpers | P0 | done | A-01 |
| B-02 | B | Create initial published template pack | P0 | done | B-01 |
| B-03 | B | Implement template repository and ordered list export | P0 | done | B-02 |
| B-04 | B | Build protected template library route | P1 | done | A-06, B-03, C-02 |
| B-05 | B | Build protected template detail route | P1 | done | A-06, B-03, C-02 |
| B-06 | B | Add print styles and print action | P1 | done | B-05 |
| C-01 | C | Initialize Firebase Auth and Firestore modules | P0 | done | A-03 |
| C-02 | C | Implement auth user hook and route guard | P0 | done | C-01, A-06 |
| C-03 | C | Implement login and account-creation flow | P0 | done | C-01, C-02 |
| C-04 | C | Define record/profile types | P0 | done | C-01 |
| C-05 | C | Implement record repository CRUD and queries | P0 | done | C-04, C-01 |
| C-06 | C | Implement `/my/records/new` draft creation transition | P1 | done | C-03, C-05, B-05 |
| C-07 | C | Build record editor route | P1 | pending_revalidation | C-05, C-06 |
| C-08 | C | Build records list route | P1 | done | C-05, C-03 |
| C-09 | C | Add save-draft and submit behaviors | P1 | todo | C-07 |
| C-10 | C | Add Firestore security rules and baseline index config | P0 | done | C-05 |
| D-01 | D | Implement summary calculation logic | P1 | todo | C-05 |
| D-02 | D | Build summary route | P1 | todo | D-01, C-03 |
| D-03 | D | Build settings route | P1 | todo | C-03, C-05 |
| D-04 | D | Implement delete-stored-record-data flow | P1 | todo | D-03, C-05 |
| D-05 | D | Implement sign-out flow | P1 | todo | D-03, C-03 |
| D-06 | D | Finalize summary-required Firestore indexes | P1 | todo | D-01, C-10 |
| E-01 | E | Add required loading states across routes | P2 | todo | B-04, B-05, C-07, C-08, D-02, D-03 |
| E-02 | E | Add required empty states across routes | P2 | todo | B-04, C-08, D-02 |
| E-03 | E | Add required error states across routes | P2 | todo | B-04, B-05, C-03, C-07, C-08, D-02, D-03 |
| E-04 | E | Add privacy warning copy in record flow | P2 | todo | C-07 |
| E-05 | E | Run desktop, mobile web, and print QA | P1 | todo | E-01, E-02, E-03, E-04 |
| E-06 | E | Run scope audit against exclusions list | P1 | todo | E-05 |

## 5. Detailed tasks

### Phase A - Foundation

#### A-01 Scaffold Next.js App Router project
- Priority: `P0`
- Status: `done`
- Blocked by: `-`
- Scope:
  - create the Next.js App Router app
  - enable TypeScript
  - confirm the base route structure can exist under `src/app`
- Outputs:
  - project scaffold exists
  - app boots locally
- QA:
  - local dev server starts without runtime crash

#### A-02 Install Tailwind and Firebase SDK
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - install Tailwind CSS
  - install Firebase JS SDK
- Outputs:
  - dependencies declared
  - global styles path exists
- QA:
  - Tailwind styles apply in a rendered page

#### A-03 Add Firebase env config pattern
- Priority: `P0`
- Status: `done`
- Blocked by: `A-02`
- Scope:
  - define required Firebase web config env keys
  - add example env documentation
  - create Firebase client bootstrap module
- Outputs:
  - env access pattern exists
  - Firebase client init module exists
- QA:
  - missing env values fail clearly for developers

#### A-04 Create app shell layout and nav
- Priority: `P1`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - implement `src/app/layout.tsx`
  - add minimal nav shell consistent with MVP routes
- Outputs:
  - app shell renders
- QA:
  - root layout renders without broken links

#### A-05 Add landing page route shell
- Priority: `P1`
- Status: `done`
- Blocked by: `A-04`
- Scope:
  - create public landing route shell at `/`
  - leave room for final landing sections in later implementation
- Outputs:
  - landing route exists
- QA:
  - unsigned user can load `/`

#### A-06 Add login page route shell
- Priority: `P1`
- Status: `done`
- Blocked by: `A-04`
- Scope:
  - create `/login` route shell
  - reserve space for sign-in/create-account UI and `next` handling
- Outputs:
  - login route exists
- QA:
  - `/login` renders without hitting protected data queries

#### Phase A QA Gate
- Status: `done`
- Pass when:
  - `A-01` through `A-06` are `done`
  - app boots locally
  - landing and login route shells render
  - Firebase env bootstrap pattern is present

### Phase B - Static template system

#### B-01 Define template types and filter helpers
- Priority: `P0`
- Status: `done`
- Blocked by: `A-01`
- Scope:
  - implement template type contracts from `spec.md`
  - implement filter utility helpers used by the library page
- Outputs:
  - `template-types.ts`
  - filter helpers
- QA:
  - template type enforces required fields and unions

#### B-02 Create initial published template pack
- Priority: `P0`
- Status: `done`
- Blocked by: `B-01`
- Scope:
  - create at least 10 published typed template files
  - prefer the full initial pack of 12 names from `spec.md`
- Outputs:
  - template data files under `src/content/templates/**`
- QA:
  - each file exports one typed template object

#### B-03 Implement template repository and ordered list export
- Priority: `P0`
- Status: `done`
- Blocked by: `B-02`
- Scope:
  - create ordered template list export
  - create template read helpers by slug/list
- Outputs:
  - `template-list.ts`
  - `template-repo.ts`
- QA:
  - published templates load in a deterministic order

#### B-04 Build protected template library route
- Priority: `P1`
- Status: `done`
- Blocked by: `A-06`, `B-03`, `C-02`
- Scope:
  - build `/templates`
  - add search, grade, competency, and PYP theme filters
  - keep library route protected behind login
- Outputs:
  - template library page
- QA:
  - unsigned access redirects to `/login`
  - signed-in view filters instantly without page reload

#### B-05 Build protected template detail route
- Priority: `P1`
- Status: `done`
- Blocked by: `A-06`, `B-03`, `C-02`
- Scope:
  - build `/templates/[slug]`
  - render all required template sections
  - support invalid slug state
- Outputs:
  - template detail page
- QA:
  - valid slug loads full content
  - invalid slug shows the required not-found style state

#### B-06 Add print styles and print action
- Priority: `P1`
- Status: `done`
- Blocked by: `B-05`
- Scope:
  - implement print button
  - add `print.css`
  - hide non-content UI in print
- Outputs:
  - print action and stylesheet
- QA:
  - print preview hides nav/footer/actions and preserves activity content readability

#### Phase B QA Gate
- Status: `done`
- Pass when:
  - `B-01` through `B-06` are `done`
  - `C-01`, `C-02`, and `C-03` are `done`
  - unsigned users are redirected from protected template routes to `/login`
  - signed-in users can browse templates and print detail pages
  - at least 10 published templates exist

### Phase C - Account auth and records

#### C-01 Initialize Firebase Auth and Firestore modules
- Priority: `P0`
- Status: `done`
- Blocked by: `A-03`
- Scope:
  - finalize Firebase auth and Firestore instances
  - expose initialization helpers
- Outputs:
  - `lib/firebase/auth.ts`
  - `lib/firebase/firestore.ts`
- QA:
  - Firebase services initialize from env config

#### C-02 Implement auth user hook and route guard
- Priority: `P0`
- Status: `done`
- Blocked by: `C-01`, `A-06`
- Scope:
  - implement current user hook
  - implement auth guard with `next` return-path handling
- Outputs:
  - `use-auth-user.ts`
  - `ensure-auth.ts`
- QA:
  - protected routes redirect unsigned users to `/login?next=...`

#### C-03 Implement login and account-creation flow
- Priority: `P0`
- Status: `done`
- Blocked by: `C-01`, `C-02`
- Scope:
  - implement sign-in form
  - implement create-account path on the same route
  - redirect to `next` target or `/templates` after success
- Outputs:
  - working login page behavior
- QA:
  - new user can create account and land in the service
  - existing user can sign in and return to the intended route

#### C-04 Define record/profile types
- Priority: `P0`
- Status: `done`
- Blocked by: `C-01`
- Scope:
  - implement `WorksheetRecord` type
  - implement `UserProfile` type
- Outputs:
  - `record-types.ts`
- QA:
  - type contracts match `spec.md` exactly

#### C-05 Implement record repository CRUD and queries
- Priority: `P0`
- Status: `done`
- Blocked by: `C-04`, `C-01`
- Scope:
  - create record read/write/list functions
  - include delete-all-by-user-records behavior
  - keep Firestore paths limited to `/users/{uid}` branches
- Outputs:
  - `record-repo.ts`
- QA:
  - repository functions operate on current-user scope only

#### C-06 Implement `/my/records/new` draft creation transition
- Priority: `P1`
- Status: `done`
- Blocked by: `C-03`, `C-05`, `B-05`
- Scope:
  - validate `template` query param
  - validate published template exists
  - create draft with required snapshot/default fields
  - redirect to `/my/records/[id]`
- Outputs:
  - transition route behavior
- QA:
  - invalid template does not create a record
  - valid template creates a draft and redirects

#### C-07 Build record editor route
- Priority: `P1`
- Status: `pending_revalidation`
- Blocked by: `C-05`, `C-06`
- Scope:
  - build record editor UI and data load path
  - include all required fields and controls
- Outputs:
  - record editor page
- QA:
  - record loads only for the current user
  - missing record shows the required empty/invalid state

#### C-08 Build records list route
- Priority: `P1`
- Status: `done`
- Blocked by: `C-05`, `C-03`
- Scope:
  - build `/my/records`
  - show records ordered by `updatedAt desc`
  - include status and template filters
- Outputs:
  - records list page
- QA:
  - draft and submitted records appear with distinct states
  - signed-out access redirects to `/login?next=/my/records`
  - signed-in runtime shows `updatedAt desc`, status/template filters, loading state, empty state, and retryable error state truthfully

#### C-09 Add save-draft and submit behaviors
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-07`
- Scope:
  - implement save draft
  - implement submit with validation
  - preserve submitted status on later edits
- Outputs:
  - draft/save/submit behavior
- QA:
  - incomplete draft saves
  - submit requires date plus at least one rating
  - submitted records do not revert to draft

#### C-10 Add Firestore security rules and baseline index config
- Priority: `P0`
- Status: `done`
- Blocked by: `C-05`
- Scope:
  - add baseline rules
  - commit baseline index config requested by records queries during development
- Outputs:
  - Firestore rules file
  - initial index config file
- QA:
  - cross-user access is denied

#### Phase C QA Gate
- Status: `todo`
- Pass when:
  - `C-01` through `C-10` are `done`
  - sign-in and create-account flow works
  - start-record creates a draft and opens the editor
  - save draft and submit both work
  - Firestore rules protect per-user data

### Phase D - Summary and settings

#### D-01 Implement summary calculation logic
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-05`
- Scope:
  - implement 14-day submitted-record summary logic
  - apply grade mapping and ordering rules from `spec.md`
- Outputs:
  - summary utility/hook
- QA:
  - summary uses only submitted records in the defined window

#### D-02 Build summary route
- Priority: `P1`
- Status: `todo`
- Blocked by: `D-01`, `C-03`
- Scope:
  - build `/my/summary`
  - show stat blocks and recent records
- Outputs:
  - summary page
- QA:
  - empty state appears when no submitted records exist in the window

#### D-03 Build settings route
- Priority: `P1`
- Status: `todo`
- Blocked by: `C-03`, `C-05`
- Scope:
  - build `/my/settings`
  - show auth type and account ownership messaging
  - include delete-all-records and sign-out actions
- Outputs:
  - settings page
- QA:
  - settings route loads only for signed-in user

#### D-04 Implement delete-stored-record-data flow
- Priority: `P1`
- Status: `todo`
- Blocked by: `D-03`, `C-05`
- Scope:
  - delete the current user's record documents
  - optionally delete `/profile/main` if it exists
  - keep the user on `/my/settings`
- Outputs:
  - delete-record-data behavior
- QA:
  - records disappear from list and summary afterward

#### D-05 Implement sign-out flow
- Priority: `P1`
- Status: `todo`
- Blocked by: `D-03`, `C-03`
- Scope:
  - sign out the current user
  - redirect to `/`
  - do not delete stored data during sign-out
- Outputs:
  - sign-out behavior
- QA:
  - after sign-out, protected routes require login again

#### D-06 Finalize summary-required Firestore indexes
- Priority: `P1`
- Status: `todo`
- Blocked by: `D-01`, `C-10`
- Scope:
  - run summary queries against Firebase
  - add any additional index config required for summary-specific filters or ordering
- Outputs:
  - updated index config covering summary queries
- QA:
  - summary route no longer fails due to missing indexes

#### Phase D QA Gate
- Status: `todo`
- Pass when:
  - `D-01` through `D-06` are `done`
  - summary works on real user data
  - delete stored record data works safely
  - sign-out returns to the public landing page

### Phase E - Polish and launch QA

#### E-01 Add required loading states across routes
- Priority: `P2`
- Status: `todo`
- Blocked by: `B-04`, `B-05`, `C-07`, `C-08`, `D-02`, `D-03`
- Scope:
  - add loading states where `spec.md` requires them
- Outputs:
  - route-level loading states
- QA:
  - each affected route shows a non-broken loading state

#### E-02 Add required empty states across routes
- Priority: `P2`
- Status: `todo`
- Blocked by: `B-04`, `C-08`, `D-02`
- Scope:
  - add empty states for library, records, and summary where applicable
- Outputs:
  - route-level empty states
- QA:
  - empty paths explain the situation and provide the expected next action

#### E-03 Add required error states across routes
- Priority: `P2`
- Status: `todo`
- Blocked by: `B-04`, `B-05`, `C-03`, `C-07`, `C-08`, `D-02`, `D-03`
- Scope:
  - add recoverable error states
  - avoid broken-route dead ends
- Outputs:
  - route-level error states
- QA:
  - auth/data failures show retry-safe messaging

#### E-04 Add privacy warning copy in record flow
- Priority: `P2`
- Status: `todo`
- Blocked by: `C-07`
- Scope:
  - add the required privacy note anywhere records are created or edited
- Outputs:
  - privacy warning in record flow
- QA:
  - warning is visible in both draft creation/edit contexts

#### E-05 Run desktop, mobile web, and print QA
- Priority: `P1`
- Status: `todo`
- Blocked by: `E-01`, `E-02`, `E-03`, `E-04`
- Scope:
  - run full functional and device QA from `spec.md`
  - include print verification
- Outputs:
  - manual QA evidence
- QA:
  - desktop, mobile web, and print checks all pass

#### E-06 Run scope audit against exclusions list
- Priority: `P1`
- Status: `todo`
- Blocked by: `E-05`
- Scope:
  - compare implementation against the excluded-features list
  - confirm no drift into uploads, AI, payments, admin tooling, or broader auth scope
- Outputs:
  - scope audit result
- QA:
  - all exclusions remain excluded

#### Phase E QA Gate
- Status: `todo`
- Pass when:
  - `E-01` through `E-06` are `done`
  - all route states exist
  - privacy note is present
  - desktop/mobile web/print QA passes
  - scope audit passes

## 6. Recommended execution order inside phases

Use this sequence unless a blocker forces a pause:

1. `A-01` -> `A-02` -> `A-03` -> `A-04` -> `A-05` -> `A-06`
2. `B-01` -> `B-02` -> `B-03` -> `B-04` and `B-05` -> `B-06`
3. `C-01` -> `C-02` -> `C-03`; then close `B-04` / `B-05` / `B-06` if still open; then `C-04` -> `C-05` -> `C-06` -> `C-07` and `C-08` -> `C-09` -> `C-10`
4. `D-01` -> `D-02`; `D-03` -> `D-04` and `D-05`; then `D-06`
5. `E-01` / `E-02` / `E-03` / `E-04` -> `E-05` -> `E-06`

Parallel-safe notes:
- `B-04` and `B-05` may run in parallel after `B-03`
- `C-01`, `C-02`, and `C-03` may be pulled forward before Phase B closes because protected template routes depend on working auth
- `C-07` and `C-08` may run in parallel after `C-05` and `C-06` where applicable
- `D-02` and `D-03` may run in parallel after their blockers clear
- `E-01` through `E-04` may run in parallel after route implementation stabilizes

## 7. Current progress snapshot

Update this section at the start and end of each work session.

- Current phase: `Phase C - Account auth and records`
- Current task: `C-09`
- Last completed task: `C-08`
- Active blocker: `No confirmed Firebase permission blocker is currently active after the latest human smoke revalidation; `/my/records` and `/my/records/<record-id>` both have human-reported smoke success, while save/submit behavior remains future scope under C-09.`
- Notes: `C-08 is now closed after repo-backed runtime QA confirmed signed-out protection, signed-in list load, `updatedAt desc` ordering, status/template filtering, draft/submitted visual distinction, empty state, and retryable records-list error handling. Latest human smoke QA still means the old Firebase-permissions blocker must not be reused for C-07/C-08 without a fresh runtime failure.`

## 8. Completion rule

The bootstrap feature is done only when:
- all tasks `A-01` through `E-06` plus `D-06` are `done` or explicitly `cancelled`
- every phase QA gate is `done`
- the launch gate in `docs/features/000_bootstrap/spec.md` is satisfied
- no out-of-scope feature was added during implementation
