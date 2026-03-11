# IBNote Bootstrap Spec

Status: Draft for implementation
Source of truth: `docs/features/000_bootstrap/prd.md`
Companion docs:
- `docs/features/000_bootstrap/adr.md`
- `docs/features/000_bootstrap/risk_analysis.md`

## 1. Purpose

This document converts the PRD into an implementation spec for a low-skill coding agent.

The agent must be able to start implementation without guessing:
- what to build first
- what file/module shape to use
- what each route must do
- what data is stored versus local only
- what validation and QA are required
- what is explicitly out of scope

If any statement in this file conflicts with `prd.md`, follow `prd.md` and update this file.

## 2. How to use this document

Implementation order is fixed:
1. Foundation
2. Static template system
3. Account auth and record flow
4. Summary and settings
5. Polish and launch QA

Before each implementation slice:
- read the slice goal
- create only the files needed for that slice
- satisfy the slice QA checklist before moving on
- do not add post-MVP features

When the PRD offers multiple possible approaches, use the defaults recorded in `adr.md`.
When something is still unresolved or depends on external verification, check `risk_analysis.md`.

## 3. Product boundary

### 3.1 Build exactly this MVP

Build a web app that lets a parent:
1. create an account and sign in
2. browse worksheet templates after sign-in
3. print the template from the browser
4. start a record from a signed-in session
5. save a draft record
6. submit a record
7. review past records
8. view a simple 14-day summary
9. delete their own stored data

### 3.2 Do not build these features

Do not implement:
- AI generation
- AI grading
- image upload
- child photo upload
- PDF export generation
- payment or subscription
- teacher/admin dashboard
- notifications
- multi-child family management
- fine-grained permissions
- template CMS
- custom backend unless later required by a documented blocker

### 3.3 Product principles that must shape implementation

- Prefer simpler over richer.
- Prefer cheaper over more scalable.
- Prefer lower maintenance over automation-heavy systems.
- Prefer faster shipping over speculative flexibility.
- The landing page must work without auth, and the service must require login.
- Private data must stay in Firestore under the current user.
- Privacy minimization is mandatory, not optional.

## 4. Fixed technical constraints

### 4.1 Required stack

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth email/password accounts
- Cloud Firestore
- Vercel deployment for prototype/beta

Do not introduce Firebase Storage in MVP.

### 4.2 Architecture rules

- Template content lives in the repository, not Firestore.
- Private user data lives in Firestore under `/users/{uid}`.
- The landing page is public, but the actual service routes require login.
- A dedicated login page exists in MVP.
- No server-side PDF generation.
- No background jobs.
- No image or file processing pipeline.

### 4.3 Required repository scaffold

Create the project using this structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    login/page.tsx
    templates/
      page.tsx
      [slug]/page.tsx
    my/
      records/
        page.tsx
        new/page.tsx
        [id]/page.tsx
      summary/page.tsx
      settings/page.tsx
  components/
    layout/
    templates/
    records/
    summary/
    ui/
  content/
    templates/
      template-list.ts
      literacy/
      thinking/
      expression/
  lib/
    firebase/
      client.ts
      auth.ts
      firestore.ts
      rules-notes.md
    auth/
      ensure-auth.ts
      use-auth-user.ts
    records/
      record-types.ts
      record-repo.ts
      use-record.ts
      use-records.ts
      use-summary.ts
    templates/
      template-types.ts
      template-repo.ts
    utils/
      dates.ts
      grades.ts
      filters.ts
  styles/
    globals.css
    print.css
```

The coding agent may add only small helper modules that directly support this structure, and must not collapse all logic into route files.

### 4.4 Module responsibilities

Use the scaffold above with these responsibilities:
- `src/app/layout.tsx`: app-wide shell, nav, and global styles import
- `src/app/page.tsx`: landing page only
- `src/app/login/page.tsx`: sign-in and create-account page only
- `src/app/templates/page.tsx`: template library page only
- `src/app/templates/[slug]/page.tsx`: template detail page only
- `src/app/my/records/page.tsx`: records list page only
- `src/app/my/records/new/page.tsx`: transition route that validates `template`, creates a draft, and redirects to `/my/records/[id]`
- `src/app/my/records/[id]/page.tsx`: record editor page only
- `src/app/my/summary/page.tsx`: summary page only
- `src/app/my/settings/page.tsx`: settings page only
- `src/content/templates/**`: static typed template data files
- `src/lib/templates/template-repo.ts`: template list/read helpers only
- `src/lib/firebase/client.ts`: Firebase app initialization only
- `src/lib/firebase/auth.ts`: Firebase auth helpers only
- `src/lib/firebase/firestore.ts`: Firestore instance helpers only
- `src/lib/auth/ensure-auth.ts`: route-safe auth guard and return-path helper
- `src/lib/auth/use-auth-user.ts`: current auth user state hook
- `src/lib/records/record-repo.ts`: record CRUD and query functions only
- `src/lib/records/use-record.ts`: single-record loading and mutation hook
- `src/lib/records/use-records.ts`: records-list loading hook
- `src/lib/records/use-summary.ts`: summary query and calculation hook
- `src/styles/print.css`: print-only behavior

Do not put Firestore write logic directly inside UI components if a repository helper can hold it instead.

## 5. Shared implementation rules

### 5.1 Type and schema rules

- Keep TypeScript types in `src/lib/templates/template-types.ts` and `src/lib/records/record-types.ts`.
- Reuse shared union types instead of duplicating literals across files.
- Keep repo static template content strongly typed.
- Keep Firestore document writes aligned to the exact record/profile shapes below.

### 5.2 Privacy rules

Never store:
- real child name
- school name
- child age or birthdate
- child photo
- attachments

Show this note anywhere the user creates or edits a record:
`Please do not enter real names, school names, or other sensitive personal information.`

### 5.3 UX rules

- Use simple parent-facing copy.
- Do not use jargon-heavy education terminology in primary UI.
- Every page must define loading, empty, error, and success states where applicable.
- Every button and form field must have a clear visible label.
- Print output must remain readable in grayscale.

### 5.4 Data ownership rules

- A user can only read and write their own Firestore documents.
- Private routes must not reveal other users' record IDs or content.
- Firestore rules must never use open access.

## 6. Data contracts

### 6.1 Template types

Implement these core types:

```ts
export type Competency =
  | 'literacy'
  | 'thinking'
  | 'expression'
  | 'collaboration'
  | 'digital_literacy';

export type PypTheme =
  | 'who_we_are'
  | 'where_we_are_in_place_and_time'
  | 'how_we_express_ourselves'
  | 'how_the_world_works'
  | 'how_we_organize_ourselves'
  | 'sharing_the_planet';

export type GradeBand = 'g1_2' | 'g3_4' | 'g5_6';

export interface WorksheetTemplate {
  slug: string;
  version: number;
  title: string;
  summary: string;
  gradeBand: GradeBand;
  durationMinutes: number;
  subjectTags: string[];
  pypTheme: PypTheme;
  competencies: Competency[];
  bigQuestion: string;
  materials: string[];
  steps: string[];
  thinkingPrompt: string;
  outputPrompt: string;
  reflectionQuestions: string[];
  checklist: string[];
  rubric: {
    competency: Competency;
    levels: {
      A: string;
      B: string;
      C: string;
      D: string;
      E: string;
    };
  }[];
  isPublished: boolean;
}
```

Implementation rules:
- `slug` must be stable and unique.
- `version` must start at `1` for the initial pack.
- `competencies` must contain 2 or 3 values.
- each checklist item string must be unique within a template.
- `rubric` must include only competencies already listed in `competencies`.
- Library pages must use `isPublished === true` templates only.

### 6.2 Initial template pack

Initial release must include at least 10 published templates.
Preferred initial pack is 12 templates:
1. My Opinion Matters
2. Compare Two Ideas
3. What Changed in My Day?
4. Explain What You Noticed
5. Family Rule Builder
6. Waste Flow Map
7. Water Use Check
8. Spot Fact vs Opinion
9. One-Minute Mini Speech
10. Ask Better Questions
11. Notice-Think-Wonder About Nature
12. My Small Action This Week

Each template file must export exactly one typed template object.
`template-list.ts` must import all published templates and export the ordered list used by the library page.

Each template object must include all required blocks from the PRD:
- title
- one-line summary
- grade band
- duration
- PYP theme
- competencies
- big question
- what you need
- do the activity
- talk or think prompt
- write or draw or explain prompt
- reflection questions
- parent observation checklist
- simple A-E rubric for the selected competencies

### 6.3 Record types

Implement these core types:

```ts
export type AbsoluteGrade = 'A' | 'B' | 'C' | 'D' | 'E';
export type RecordStatus = 'draft' | 'submitted';

export interface WorksheetRecord {
  id: string;
  uid: string;
  templateSlug: string;
  templateVersion: number;
  templateTitleSnapshot: string;
  pypThemeSnapshot: PypTheme;
  competenciesSnapshot: Competency[];
  gradeBandSnapshot: GradeBand;
  performedOn: string;
  status: RecordStatus;
  childGradeBand?: GradeBand | null;
  childNicknameLocalOnly?: never;
  childReflection: string;
  parentMemo: string;
  competencyRatings: Partial<Record<Competency, AbsoluteGrade>>;
  checklistState: Record<string, boolean>;
  createdAt: number;
  updatedAt: number;
}
```

Implementation rules:
- first draft must be created with:
  - `id`: generated record ID
  - `uid`: current signed-in user ID
  - `templateSlug`: source template slug
  - `templateVersion`: source template version
  - `templateTitleSnapshot`: source template title
  - `pypThemeSnapshot`: source template PYP theme
  - `competenciesSnapshot`: source template competencies
  - `gradeBandSnapshot`: source template grade band
  - `performedOn`: local today date in `YYYY-MM-DD`
  - `status`: `draft`
  - `childGradeBand`: `null`
  - `childReflection`: empty string
  - `parentMemo`: empty string
  - `competencyRatings`: empty object
  - `checklistState`: object with one key per checklist string, all values `false`
  - `createdAt`: current timestamp in milliseconds
  - `updatedAt`: same value as `createdAt`
- `performedOn` format is `YYYY-MM-DD`.
- `childNicknameLocalOnly` must never be written to Firestore.
- `templateTitleSnapshot`, `pypThemeSnapshot`, `competenciesSnapshot`, and `gradeBandSnapshot` must be copied from the template when the draft record is created.
- `checklistState` keys must match the template checklist strings at draft creation time.
- Save draft allows incomplete form data.
- Submit requires `performedOn` and at least one competency rating.
- Submitted records remain editable in MVP.

### 6.4 Profile type

```ts
export interface UserProfile {
  uid: string;
  authType: 'email_password';
  createdAt: number;
  updatedAt: number;
  lastSeenAt: number;
}
```

Default profile rule:
- do not create `/users/{uid}/profile/main` unless the app needs it for a real screen or account-session flow
- if `/users/{uid}/profile/main` is created, keep `authType`, `createdAt`, `updatedAt`, and `lastSeenAt` aligned with the signed-in account session
- do not create extra profile fields in MVP

### 6.5 Firestore paths

Allowed collection paths:

```text
/users/{uid}
/users/{uid}/profile/main
/users/{uid}/records/{recordId}
```

Do not create additional collections for templates, analytics, uploads, or admin tools.

### 6.6 Query rules

- Records list: order by `updatedAt desc`.
- Summary: query submitted records in the last 14 days only.
- Summary date filtering must use `performedOn`, not `updatedAt`.
- Expect at least one composite index for `status + updatedAt`.
- Expect a summary-supporting index if Firestore requires one for `status + performedOn`.
- If Firestore requests another index during development, add that index config to the repo.
- When a summary query also orders results, use `performedOn desc` as the primary summary ordering field.

### 6.7 Summary calculation contract

For the summary page:
- include only records where `status === 'submitted'`
- include only records whose `performedOn` falls inside the local-calendar window of today plus the previous 13 days
- convert grades with `A=5`, `B=4`, `C=3`, `D=2`, `E=1`
- for counts by competency, increment once for each competency present in a submitted record's `competencyRatings`
- for average grade by competency, average only the ratings that exist for that competency
- list recent 5 submitted records ordered by `performedOn desc`, breaking ties with `updatedAt desc`
- display each average as a numeric value rounded to one decimal place plus the nearest letter label

If there are no submitted records in the window, show the empty state instead of zero-filled analytics blocks.

## 7. Auth and access flow

### 7.1 Public route rules

Public routes:
- `/`
- `/login`

Requirements:
- must load without auth
- must not trigger protected data queries on page load
- must keep the landing page usable even if Firebase is temporarily unavailable

If Firebase is unavailable on a public page:
- the landing page must still render its static content
- the login page must show an auth-specific error state instead of a broken screen

### 7.2 Private route rules

Private routes:
- `/templates`
- `/templates/[slug]`
- `/my/records`
- `/my/records/new?template={slug}`
- `/my/records/[id]`
- `/my/summary`
- `/my/settings`

Requirements:
- signed-in account auth is required before loading route data
- if unsigned, redirect to `/login?next=<target>`
- while auth state is being established, show a loading state
- if auth fails, show a recoverable error state with retry

Auth failure rule:
- do not enter redirect loops
- do not show stale private data
- do not create a partial draft record before auth succeeds

Route note:
- `/my/records/new?template={slug}` exists as a transition route only. It must never show a standalone manual form.

### 7.3 Start record flow

When the user clicks `Start record` on a template detail page:
1. verify that the template slug exists and is published
2. verify that the user is signed in
3. if the session is missing, redirect to `/login?next=/my/records/new?template={slug}`
4. create a draft record using template snapshot fields
5. write the draft to `/users/{uid}/records/{recordId}`
6. redirect to `/my/records/[id]`

Allowed implementation paths:
- create the draft directly from `/templates/[slug]`, then redirect to `/my/records/[id]`
- or navigate to `/my/records/new?template={slug}` only if that route immediately performs the same create-and-redirect flow

Do not render an empty record editor at `/my/records/new`.

### 7.4 My records and summary entry flow

When an unsigned user opens `/my/records`, `/my/summary`, or `/my/settings`:
1. show route-level loading state
2. redirect to `/login?next=<target>`
3. after successful login, return to the intended route
4. on login failure, show the login-page error state and retry action

When a user opens `/my/records/new?template={slug}`:
1. validate that the `template` query parameter exists
2. validate that the template exists and is published
3. verify that the user is signed in or redirect to `/login?next=/my/records/new?template={slug}`
4. create the draft record with the required initial values
5. redirect to `/my/records/[id]`
6. if validation fails, show an invalid-template state and do not create a record

## 8. Route-by-route requirements

### 8.1 Landing page `/`

Purpose: explain the product simply and move the user to login.

Required sections:
1. hero
2. how it works in 3 steps
3. 3 example template cards
4. why this helps section
5. CTA to start with login
6. privacy note for parents

Rules:
- hero message must explain the product in 2 lines or less
- primary CTA text should be `로그인하고 시작하기`
- no auth gate
- no exaggerated academic claims

States:
- loading: normal Next.js page render only
- empty: not applicable
- error: generic page-level fallback if static content fails
- success: user reaches `/login` in one click

### 8.2 Login `/login`

Purpose: let the user sign in or create an account to enter the service.

Required UI:
- email field
- password field
- sign-in submit button
- create-account submit button or mode toggle
- error message area
- optional return-path notice when `next` query exists

Rules:
- use Firebase Auth email/password methods only in bootstrap MVP
- keep sign-in and create-account on the same route to avoid extra page sprawl
- no password-reset flow in bootstrap MVP
- on successful auth, redirect to the `next` query target if present; otherwise redirect to `/templates`

States:
- loading: auth submission in progress
- empty: not applicable
- error: invalid credentials, duplicate account, or Firebase auth failure
- success: authenticated user reaches the target route

### 8.3 Template library `/templates`

Purpose: fast authenticated discovery of published templates.

Required UI:
- search input for title keyword
- grade band filter
- competency filter
- PYP theme filter
- card grid or list

Template card must show:
- title
- summary
- grade band
- duration
- competency chips
- theme label
- open CTA text `열어보기`

Rules:
- default view shows all published templates
- basic filtering is client-side
- filter changes must update instantly without page reload
- title search must be case-insensitive substring matching
- empty state must explain no matches and allow reset

States:
- loading: auth resolution plus route render
- empty: no published templates or no filter matches
- error: static import failure fallback
- success: open template detail page

### 8.4 Template detail `/templates/[slug]`

Purpose: clearly present one worksheet and support print and record start.

Required sections:
1. title and summary
2. grade band, duration, competencies, theme
3. big question
4. materials
5. steps
6. thinking prompt
7. output prompt
8. reflection questions
9. checklist
10. rubric
11. actions for start record and print

Action text:
- start record button: `기록 시작`
- print button: `인쇄하기`

Print rules:
- print action uses `window.print()`
- hide nav/footer/actions in print
- increase content width in print
- keep activity content visible
- maintain grayscale readability

States:
- loading: route render
- empty: not applicable
- invalid slug: show not-found state
- error: static content failure fallback
- success: page readable on mobile and desktop

### 8.5 Record editor `/my/records/[id]`

Purpose: save a short result in 1 to 3 minutes.

Required form sections:
1. header with template snapshot info
2. performed date
3. child grade band optional
4. child reflection textarea
5. parent memo textarea
6. competency rating controls only for competencies in the template snapshot
7. checklist checkboxes
8. actions for save draft, submit record, back to records

Validation rules:
- `performedOn` required for submit
- `childReflection` optional but visually encouraged
- `parentMemo` optional
- at least 1 competency rating required for submit
- save draft allowed with incomplete data
- `Save draft` is available only while `status === 'draft'`

Behavior rules:
- no autosave
- submitted records stay editable
- load data from Firestore for the current user only
- update `updatedAt` on every save or submit
- save draft keeps `status` as `draft`
- submit record sets `status` to `submitted`
- once a record becomes `submitted`, later edits must preserve `status: 'submitted'`
- submitted records must not revert to `draft` in MVP
- record ID never changes after first draft creation

States:
- loading: auth and record fetch
- empty: missing record for current user
- invalid id: same as missing record
- error: fetch/write failure with retry
- success: draft saves and submit changes status to `submitted`

### 8.6 My records `/my/records`

Purpose: review history and reopen records quickly.

Required UI:
- records ordered by updated date descending
- optional filter by status
- optional filter by template
- row or card view showing template title snapshot, performed date, status, top competencies, and edit/view link

Rules:
- newest updated record appears first
- draft and submitted states must look visually distinct
- `top competencies` means the `competenciesSnapshot` values shown as simple text/chips in stored order
- empty state must explain that there are no records yet and link to templates

States:
- loading: auth and records query
- empty: no records for current user
- error: query failure with retry
- success: navigate to record editor

### 8.7 Summary `/my/summary`

Purpose: give lightweight progress feedback using submitted records from the last 14 days.

Metrics:
1. total submitted records
2. counts by competency
3. average grade by competency
4. recent 5 submitted records

Grade mapping:
- A = 5
- B = 4
- C = 3
- D = 2
- E = 1

Rules:
- use submitted records only
- default window is today plus the previous 13 local calendar days
- no chart library required
- simple table, stat cards, or progress bars are sufficient
- recent records list on the page must use the same ordering rule as the summary calculation contract

States:
- loading: auth and summary query
- empty: no submitted records in the last 14 days
- error: query/calculation failure with retry
- success: summary is understandable without extra explanation

### 8.8 Settings `/my/settings`

Purpose: reduce support burden and let the user control stored data.

Required UI:
- show auth type as email/password
- explain data is tied to the signed-in account
- delete all records button
- sign out button

`Delete all records` flow:
1. ask for confirmation
2. delete all user records
3. optionally delete `/profile/main` if it exists
4. do not attempt auth reset or account deletion
5. remain on `/my/settings` and show success feedback

`Sign out` flow:
1. ask for confirmation
2. sign the current user out
3. redirect to `/`
4. do not delete stored data during sign-out

Button semantics:
- `Delete all records` deletes all record documents for the current user and may also delete `/profile/main`.
- `Sign out` ends the current session and returns the user to the public landing page.

Post-action state:
- after `Delete all records`, remain on `/my/settings`, show success feedback, and make subsequent visits to `/my/records` and `/my/summary` hit their empty states
- after successful sign-out, redirect to `/` and require login again before entering any protected route

States:
- loading: auth and settings load
- empty: not applicable
- error: delete/sign-out failure with retry-safe messaging
- success: user can self-serve delete data without admin help

## 9. Firestore and security rules

### 9.1 Baseline Firestore rules

Use these baseline rules for MVP and keep them in the repo:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /profile/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      match /records/{recordId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### 9.2 Security requirements

- Do not use allow-all rules.
- Firebase web config being public is expected; security depends on proper rules.
- Templates are stored in the repo, so no public Firestore reads are needed for templates.
- Manual QA must confirm that one user cannot read another user's records.

## 10. Delivery slices

Each slice must finish with passing local verification before the next slice starts.

### 10.1 Slice A - Foundation

Goal: create the base app shell and deployment-ready local scaffold.

Tasks:
1. scaffold Next.js App Router app with TypeScript and Tailwind
2. add Firebase JS SDK
3. add env var support for Firebase web config
4. create basic layout and nav shell
5. deploy or prepare a placeholder for Vercel beta/prototype deployment

Required outputs:
- app shell routes exist
- global style entry exists
- Firebase client bootstrap module exists
- `.env` example or equivalent developer documentation exists for required Firebase web config keys

Done when:
- app boots locally
- root layout and nav render
- env access pattern exists
- Firebase client can initialize from env values

QA:
- app starts without runtime crash
- placeholder home page renders
- missing env values show clear developer-facing failure or guard behavior

### 10.2 Slice B - Static template system

Goal: authenticated template browsing and printable template detail work with a public landing page.

Tasks:
1. define template types
2. create 10 to 12 template data files
3. create template repository/list export
4. build `/templates`
5. build `/templates/[slug]`
6. add print button and print CSS

Required outputs:
- typed template data files for the initial pack
- template list loader/repository
- library page filter UI
- template detail renderer
- print stylesheet and print trigger action

Done when:
- template library shows published templates
- detail pages resolve by slug
- print button works
- landing page works without auth and protected routes require login

QA:
- load landing page unsigned
- verify `/templates` redirects to `/login` when unsigned
- filter templates client-side
- open valid slug
- open invalid slug
- print preview hides UI chrome

### 10.3 Slice C - Account auth and records

Goal: user can start, save, reopen, and submit records.

Tasks:
1. initialize Firebase Auth and Firestore
2. implement login and account-creation flow
3. implement record/profile types and repository
4. implement draft creation from template page
5. build record editor
6. build records list
7. implement save draft and submit actions
8. add Firestore rules and index config

Required outputs:
- login page and auth guard helper
- record repository functions for create, read, update, list, and delete-all-by-user
- record editor form with validation
- records list page
- security rules file and index config file

Done when:
- a new user can create an account and sign in
- draft record is created with template snapshots
- draft can be saved and reopened
- submitted record appears in records list

QA:
- clean browser login and start-record flow
- save incomplete draft
- submit with one rating
- reject submit with zero ratings
- signed-out access to protected routes redirects to `/login` and returns after success

### 10.4 Slice D - Summary and settings

Goal: user can see the last 14 days and delete their own data.

Tasks:
1. implement summary calculation for submitted records in last 14 days
2. build summary page
3. build settings page
4. implement delete-all-data flow
5. implement sign-out flow

Required outputs:
- summary calculation utility or hook
- summary UI
- settings UI
- delete-all-data action path
- truthful delete/sign-out messaging

Done when:
- summary loads from real user data
- empty summary state exists
- user can delete their own records without admin help

QA:
- summary with seed records
- summary empty state
- delete all records and verify list becomes empty
- verify the app returns to the public landing page after sign-out

### 10.5 Slice E - Polish and launch QA

Goal: all required states exist and the MVP remains inside scope.

Tasks:
1. add loading states
2. add empty states
3. add error states
4. add privacy warning copy
5. test desktop, mobile, and print
6. confirm excluded features were not added

Required outputs:
- route-level loading, empty, and error states across all in-scope pages
- privacy note rendered in record flow
- manual QA evidence for desktop, mobile, print, and scope audit

Done when:
- each route has required states
- privacy note appears in record flow
- launch checklist passes

QA:
- desktop route pass
- mobile route pass
- print pass
- scope audit pass

## 11. Verification matrix

### 11.1 Functional requirements mapping

| ID | Requirement | Required evidence |
| --- | --- | --- |
| FR-01 | Browse templates | Signed-in user opens `/templates`, sees published templates, filters update instantly |
| FR-02 | Open template detail | Valid slug opens detail page with all required sections |
| FR-03 | Print template | Print action triggers browser print and print preview hides non-content UI |
| FR-04 | Start record | Signed-in user clicks start record, draft is created, editor opens |
| FR-05 | Save draft record | Partial form saves and persists after reload |
| FR-06 | Submit record | Submit changes status to `submitted` when validation passes |
| FR-07 | View record history | Submitted and draft records appear in `/my/records` in updated order |
| FR-08 | View simple summary | `/my/summary` shows last 14 days from submitted records only |
| FR-09 | Delete own data | User deletes all stored records and cannot see them afterward |

### 11.2 Negative verification

Must test:
- invalid template slug
- invalid or missing record ID
- unsigned access to protected route
- submit with zero competency ratings
- summary with no submitted data
- Firestore rules prevent another user's access

### 11.3 Non-functional verification

Must confirm:
- landing page feels fast and does not wait on auth
- summary page loads under small MVP dataset without heavy analytics
- landing page still works if Firestore fails
- private pages show clear error states on Firestore failure
- keyboard navigation works for forms
- print output stays readable in grayscale

## 12. Launch gate

Do not call the MVP launchable until all are true:
1. a new user can create an account and sign in
2. signed-in user can browse templates
3. draft record can be saved and reopened later for the same signed-in account
4. submitted record appears in records list
5. submitted record affects 14-day summary
6. Firestore rules block cross-user access
7. template page prints cleanly
8. app contains no photo upload feature
9. app contains no AI feature
10. app contains no payment feature
11. at least 10 published templates exist

## 13. Final implementation checklist

Before closing the feature, confirm every item below:
- code compiles
- all core routes render
- account auth works
- Firestore rules exist
- at least 10 templates exist
- records can be created and viewed
- summary works
- delete-my-data works
- loading state exists where applicable
- empty state exists where applicable
- error state exists where applicable
- no TypeScript errors remain
- no out-of-scope feature slipped in

## 14. Scope guardrails for the coding agent

Stop and do not implement if the work begins to drift into any of these:
- uploads
- Storage bucket setup
- PDF generation
- billing
- admin tooling
- account linking
- Google or Apple sign-in
- multi-child support
- analytics dashboard

When in doubt, choose the smaller implementation that still satisfies the PRD.
