# IBNote Web SaaS MVP PRD

Version: 1.0  
Date: 2026-03-09  
Owner: James / 1-person founder  
Primary use: Starting point for vibe-coding and coding-agent execution  
Status: Build-ready

---

## 1. Document purpose

This PRD defines the **first launchable web SaaS version** of IBNote.

This document is intentionally optimized for:
- **1-person development**
- **very low hosting cost**
- **very low operational burden**
- **fast public launch**
- **safe scope for a low-skill coding agent**

This is **not** a long-term full product blueprint. It is a **tight MVP spec**.

If there is any conflict between a “nice feature” and “fast/cheap/simple launch”, the product must choose:
1. simpler
2. cheaper
3. lower maintenance
4. faster to ship

---

## 2. Product definition

### 2.1 One-line product definition
IBNote is a **web-based worksheet template and growth record tool** for parents of elementary students.

### 2.2 Core loop
The entire MVP is built around one loop:

1. Parent browses a worksheet template.
2. Parent uses it with the child at home.
3. Parent records a short result.
4. Parent sees recent records and a simple growth summary.
5. Parent comes back and repeats.

### 2.3 What the MVP is **not**
The MVP is **not**:
- an AI worksheet generator
- a teacher LMS
- a tutoring marketplace
- a PDF export platform
- a portfolio builder with uploads and printing pipelines
- a payment-ready subscription SaaS

### 2.4 Product thesis
The initial product value is **not “smart generation”**.
The initial product value is:
- trusted templates
- low friction usage
- repeated recording
- visible growth history

The template triggers the habit.
The record becomes the asset.

---

## 3. Why this scope exists

### 3.1 Founder constraints
The founder is a solo developer and wants:
- to ship via vibe-coding
- web-first SaaS, not app-first
- almost no fixed cost
- almost no operational burden
- minimal customer support load
- no custom backend to maintain

### 3.2 Architecture consequence
Therefore the MVP must avoid:
- server-side PDF generation
- background jobs
- file processing pipelines
- image optimization pipelines
- moderation queues
- admin CMS
- payment integration
- complex role systems
- multi-tenant teacher workflows
- AI generation cost and quality management

### 3.3 Strategic consequence
The MVP will launch as:
- **public landing + authenticated template/record experience**
- **account-based login for service access**
- **text-only records**
- **print-friendly web pages instead of file generation**

---

## 4. Product goals and non-goals

## 4.1 Goals
The MVP must allow a parent to:
1. discover worksheet templates
2. open a template in the browser
3. print the template using browser print
4. save a record after doing the activity
5. see recent records
6. see a simple last-14-days summary

## 4.2 Non-goals
The MVP must NOT include:
- AI generation
- AI grading
- image upload
- child photo upload
- PDF export generation
- subscription/payment
- social features
- teacher/admin dashboard
- notifications
- recommendation engine beyond a tiny heuristic
- multi-child family management
- fine-grained permissions

## 4.3 Release rule
If a feature is not strictly required to support the loop
**template → do activity → save record → review history**,
it must be moved out of MVP.

---

## 5. Research-informed product constraints

This product is aimed at parents of elementary children. The educational framing should align with:
- **IB PYP**: inquiry-based, transdisciplinary, student-centered learning with agency and action
- **Korea 2022 revised curriculum**: competency-based learning with strong emphasis on core competencies and digital literacy
- **current 2028+ assessment direction**: growth/achievement emphasis, 5-grade reporting, and increasing importance of written/constructed response

To reflect those trends without overbuilding, templates in MVP should follow this structure:
- big question
- short input/observation
- thinking prompt
- expression/output task
- small action
- reflection
- simple rubric/checklist

This keeps the content philosophy aligned while still remaining implementation-light.

---

## 6. Target user

## 6.1 Primary user
Parent of an elementary-aged child in Korea who:
- wants structured home learning
- likes worksheet-based activities
- cares about literacy / thinking / expression / digital habits
- does not want complex teacher software
- is willing to spend 5–20 minutes per activity

## 6.2 User maturity assumption
The primary user is **not** assumed to understand IB terminology deeply.
Therefore product copy must be simple.

Avoid jargon-heavy phrasing like:
- transdisciplinary inquiry sequence
- assessment for learning pipeline
- evidence-based developmental portfolio architecture

Prefer simple copy like:
- topic
- activity
- reflection
- what went well
- growth check

## 6.3 User jobs to be done
- “Give me a good activity I can do today.”
- “Let me save what my child did.”
- “Help me see whether we are doing enough.”
- “I want something structured, but not heavy.”

---

## 7. Product principles

1. **One screen should answer one question.**
2. **Every feature must reduce friction, not add ceremony.**
3. **No file pipeline unless it is essential.**
4. **No backend logic if client + Firebase can do it safely.**
5. **No feature that requires weekly operations.**
6. **Text beats media in MVP if it saves cost and support burden.**
7. **Privacy minimization is a product feature, not a legal afterthought.**

---

## 8. MVP scope summary

### 8.1 Included in MVP
- public landing page
- login page
- authenticated template library
- authenticated template detail page
- print-friendly template view
- account creation and sign-in
- record create/edit/submit
- my records list
- simple last-14-days summary
- settings page with sign-out/delete-stored-record-data action

### 8.2 Excluded from MVP
- photo upload
- PDF export
- file attachments
- child names stored in cloud
- reminders
- recommendations based on ML/AI
- template CMS
- Stripe or any billing
- server-generated reports

---

## 9. Recommended technical stack

## 9.1 Stack choice
Use:
- **Next.js App Router + TypeScript**
- **Tailwind CSS**
- **Firebase Auth (Email/Password)**
- **Cloud Firestore**
- **Vercel deployment for prototype/beta**

## 9.2 Why this stack
This combination minimizes:
- infra setup time
- custom backend code
- deployment friction
- ops overhead

## 9.3 Important deployment note
Vercel Hobby is appropriate for personal/prototype use, but Vercel documents Hobby as a free plan for personal and non-commercial use. If the product becomes publicly commercial, the project should upgrade to Pro or move to another hosting arrangement. Do not rely on Hobby forever.

## 9.4 Important storage note
Do **not** use Firebase Storage in MVP.
Reason:
- as of early February 2026, Cloud Storage for Firebase requires the Blaze plan to maintain access to default buckets
- this conflicts with the founder’s low-cost / near-zero-cost goal

Therefore:
- no photo upload in MVP
- no attachment upload in MVP
- no server-side PDF generation in MVP

## 9.5 Important privacy note
The product is aimed at parents, but it still touches child-related activity data.
To reduce compliance burden in MVP:
- do not require real child name
- do not require school name
- do not require child age or birthdate
- do not store child face/image
- store only optional **grade band** and text reflections
- show onboarding copy: “Please do not enter real child names, school names, or sensitive personal information.”

---

## 10. App architecture

## 10.1 High-level architecture
- Public content pages are rendered by Next.js.
- Template content is stored in the repository as static TypeScript/JSON content.
- Private user records are stored in Firestore.
- Authentication uses login accounts and protects the service routes.
- No custom API backend is required for MVP.

## 10.2 Rule: static content first
Templates are not stored in Firestore.
Templates must live in the codebase.

Reason:
- simpler deployment
- easier version control
- no CMS burden
- no admin screen needed
- cheaper and safer

## 10.3 Rule: private data only in Firestore
Firestore is only for:
- user profile shell (optional)
- records
- maybe lightweight app settings per user

---

## 11. Content model for templates

## 11.1 Template design philosophy
Each template must map to:
- 1 PYP theme
- 2–3 competencies
- 1 grade band
- 1 clear home activity

## 11.2 Template shape
Each template must include the following blocks:

1. **Title**
2. **One-line summary**
3. **Grade band**
4. **Duration**
5. **PYP theme**
6. **Competencies**
7. **Big question**
8. **What you need**
9. **Do the activity**
10. **Talk / think prompt**
11. **Write / draw / explain prompt**
12. **Reflection questions**
13. **Parent observation checklist**
14. **Simple A–E rubric for the selected competencies**

## 11.3 Template content file format
Use repository-based TypeScript objects, not MDX, for MVP.

Recommended file structure:

```text
src/
  content/
    templates/
      template-list.ts
      literacy/
        my-opinion-matters.ts
        compare-two-ideas.ts
      thinking/
        waste-flow-map.ts
      expression/
        explain-what-you-noticed.ts
```

## 11.4 Template object shape

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

## 11.5 MVP template count
MVP target:
- minimum 10 templates
- preferred 12 templates
- maximum 20 templates before launch

Do not delay launch to create more than 20 templates.

## 11.6 Initial template pack
The first release should include at least the following 12 templates:

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
11. Notice–Think–Wonder About Nature
12. My Small Action This Week

Each template must have:
- clear title
- clear use case
- grade band
- 2–3 competencies
- parent-friendly language

---

## 12. Record model

## 12.1 Record philosophy
A record must be short enough to complete in 1–3 minutes.
If the form takes longer than that, the product will lose repeat usage.

## 12.2 Record data fields
Store records in Firestore under the current user.

Recommended schema:

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
  performedOn: string; // YYYY-MM-DD
  status: RecordStatus;
  childGradeBand?: GradeBand | null;
  childNicknameLocalOnly?: never; // not stored in Firestore
  childReflection: string;
  parentMemo: string;
  competencyRatings: Partial<Record<Competency, AbsoluteGrade>>;
  checklistState: Record<string, boolean>;
  createdAt: number;
  updatedAt: number;
}
```

## 12.3 Data rules
- `templateTitleSnapshot` must be denormalized into the record.
- `pypThemeSnapshot` must be denormalized into the record.
- `competenciesSnapshot` must be denormalized into the record.
- No child real name field.
- No image field.
- No PDF/attachment field.

## 12.4 Firestore path

```text
/users/{uid}
/users/{uid}/records/{recordId}
```

Optional profile doc:

```text
/users/{uid}/profile/main
```

---

## 13. Auth model

## 13.1 Auth strategy
Use Firebase Auth with email/password accounts.

## 13.2 When auth happens
Keep `/` public as the marketing entry point.
Require sign-in for:
- `/templates`
- `/templates/[slug]`
- `/my/records`
- `/my/records/[id]`
- `/my/summary`
- `/my/settings`

Add `/login` as the dedicated sign-in and account-creation route.

## 13.3 UX rule
If the user is not signed in and clicks “Start record”:
1. redirect to `/login?next=/my/records/new?template={slug}`
2. complete sign-in or account creation
3. create draft record
4. redirect to record editor

## 13.4 Future-proofing rule
Auth implementation must be written in a way that can later support:
- Google sign-in
- Apple sign-in
- password reset

But those are not part of MVP.

---

## 14. Page map and routes

## 14.1 Public routes
- `/` — landing page
- `/login` — sign-in and create-account page

## 14.2 Private routes
- `/templates` — template library
- `/templates/[slug]` — template detail + print-friendly activity page
- `/my/records` — my records list
- `/my/records/new?template={slug}` — create draft and open editor
- `/my/records/[id]` — edit/view a specific record
- `/my/summary` — last-14-days summary
- `/my/settings` — sign-out/delete-stored-record-data page

## 14.3 Route decision rules
- Only the landing page and login page are public in bootstrap MVP.
- Service routes must redirect unsigned users to `/login` with a return path.
- There is a dedicated login screen in MVP.

---

## 15. Detailed page requirements

## 15.1 Landing page `/`
### Purpose
Explain the product in very simple language and push the user into login.

### Required sections
1. hero
2. how it works (3 steps)
3. example template cards (3)
4. why this helps section
5. CTA to start with login
6. privacy note for parents

### Required copy principles
- easy Korean
- no education buzzwords overload
- no claims about guaranteed academic success

### Primary CTA
- “로그인하고 시작하기”

### Acceptance criteria
- Page loads without auth.
- User can reach login in 1 click.
- Hero explains product in under 2 lines.

---

## 15.2 Template library `/templates`
### Purpose
Allow fast template discovery.

### Required UI
- search input (title keyword)
- grade band filter
- competency filter
- PYP theme filter
- card list/grid

### Template card fields
- title
- summary
- grade band
- duration
- competency chips
- theme label
- CTA: “열어보기”

### Default behavior
- show all published templates
- filter client-side

### Acceptance criteria
- Filters update results instantly.
- No page reload required for basic filtering.
- Empty state exists.

---

## 15.3 Template detail `/templates/[slug]`
### Purpose
Show the worksheet clearly and make it printable.

### Required sections
1. title + summary
2. grade band / duration / competencies / theme
3. big question
4. materials
5. steps
6. thinking prompt
7. output prompt
8. reflection questions
9. checklist
10. rubric
11. buttons:
   - “기록 시작”
   - “인쇄하기”

### Print behavior
The page must be printable using `window.print()`.
Use print CSS to:
- hide nav/footer
- increase content width
- keep activity sections visible
- avoid button printing

### Acceptance criteria
- Page is readable on mobile and desktop.
- Print button works.
- Record button starts draft creation for the signed-in user.

---

## 15.4 Record editor `/my/records/[id]`
### Purpose
Let the parent save a short reflection and rating.

### Form sections
1. header with template snapshot info
2. performed date
3. child grade band (optional)
4. child reflection (textarea)
5. parent memo (textarea)
6. competency ratings (A–E only for competencies in this template)
7. checklist checkboxes
8. action buttons:
   - save draft
   - submit record
   - back to records

### Important simplification
No autosave in MVP.
Reason:
- less complexity
- easier debugging
- lower chance of partial-state confusion

### Validation rules
- `performedOn` required
- `childReflection` optional but recommended
- `parentMemo` optional
- at least 1 competency rating required before submit
- save draft can work with incomplete data

### Status rules
- draft = editable incomplete record
- submitted = final-ish record, but still editable in MVP

### Acceptance criteria
- Save draft persists record.
- Submit changes status to `submitted`.
- Editing after submit still works.
- Form loads correctly from Firestore.

---

## 15.5 My records `/my/records`
### Purpose
Show history and provide quick access.

### Required UI
- list of records ordered by updated date desc
- optional filter by status
- optional filter by template
- card rows showing:
  - template title snapshot
  - performedOn
  - status
  - top competencies
  - edit/view link

### Empty state
- explain no records yet
- link to templates

### Acceptance criteria
- Newly created records appear in list.
- Draft and submitted are visually distinct.

---

## 15.6 Summary `/my/summary`
### Purpose
Give a lightweight feeling of progress without building analytics-heavy infrastructure.

### Time window
Always default to **last 14 days**.
Optional toggle later for 30 days, but not required in MVP.

### Metrics to show
1. total submitted records
2. counts by competency
3. average grade by competency
4. recent 5 submitted records

### Grade calculation
Map:
- A = 5
- B = 4
- C = 3
- D = 2
- E = 1

Average is calculated on submitted records only.
Display can be:
- number + label
or
- rounded score converted back to nearest letter

### Important simplification
No charts library is required.
A simple table or progress bars is enough.

### Acceptance criteria
- Summary loads from real user data.
- If no records exist, show a clear empty state.
- Result must be understandable without explanation.

---

## 15.7 Settings `/my/settings`
### Purpose
Reduce support burden and provide privacy control.

### Required actions
1. show auth type = email/password
2. explain that data is tied to the signed-in account
3. button: “모든 내 기록 삭제”
4. button: “로그아웃”

### Delete flow
- confirm modal
- delete all user records
- optionally delete user profile doc

### Sign-out flow
- sign out the current user
- redirect to landing page
- do not delete stored records on sign-out

### Acceptance criteria
- User can self-serve delete all stored record data.
- No admin support is required for basic deletion.

---

## 16. Firestore schema

## 16.1 Collections
Use only these in MVP:

```text
/users/{uid}
/users/{uid}/profile/main
/users/{uid}/records/{recordId}
```

## 16.2 Profile doc shape

```ts
export interface UserProfile {
  uid: string;
  authType: 'email_password';
  createdAt: number;
  updatedAt: number;
  lastSeenAt: number;
}
```

## 16.3 Record doc shape
Use the `WorksheetRecord` type defined above.

## 16.4 Query rules
- records list: order by `updatedAt desc`
- summary: query submitted records from the last 14 days

## 16.5 Indexes
Expect at least one composite index for:
- `status + updatedAt`
- maybe `performedOn + status`

The coding agent should let Firebase generate required indexes during development, then commit the index configuration.

---

## 17. Firebase security rules

## 17.1 Security goal
Users must only access their own record data.

## 17.2 Firestore rules (MVP baseline)

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

## 17.3 Rule notes
- Do not use allow-all rules.
- Templates are not in Firestore, so no public rules needed there.
- Because Firebase web config is public, the app depends on proper security rules.

---

## 18. State management and data fetching

## 18.1 Recommendation
Use either:
- React context + hooks + Firebase listeners
or
- Zustand
or
- TanStack Query with Firebase wrappers

For lowest cognitive load, recommended default:
- **simple custom hooks + minimal context**

## 18.2 Recommended hooks
- `useAuthUser()`
- `useRequireAccountAuth()`
- `useTemplates()`
- `useTemplate(slug)`
- `useUserRecords()`
- `useRecord(recordId)`
- `useSummary(days = 14)`

## 18.3 Caching strategy
- template content is imported statically from repo
- records use Firestore live fetch or one-time fetch
- do not add SWR/react-query unless needed

---

## 19. Repository structure

Recommended structure:

```text
src/
  app/
    layout.tsx
    page.tsx
    templates/
      page.tsx
      [slug]/page.tsx
    my/
      records/
        page.tsx
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
      *.ts
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

---

## 20. Functional requirements list

## 20.1 FR-01: Browse templates
User can browse published templates with filters.

## 20.2 FR-02: Open template detail
User can open a template page and read all activity content.

## 20.3 FR-03: Print template
User can print the template page from the browser.

## 20.4 FR-04: Start record
User can start a record from a template page.
If unsigned, the app redirects to login and then continues the intended flow after success.

## 20.5 FR-05: Save draft record
User can save a partially completed record.

## 20.6 FR-06: Submit record
User can submit a record with at least one competency rating.

## 20.7 FR-07: View record history
User can see past records.

## 20.8 FR-08: View simple summary
User can see last-14-days summary based on submitted records.

## 20.9 FR-09: Delete own data
User can delete all their own stored record data.

---

## 21. Non-functional requirements

## 21.1 Performance
- public pages should feel instant on broadband/mobile
- landing page should not block on auth
- summary page should finish in <2 sec under small MVP dataset

## 21.2 Maintainability
- no feature should require manual weekly operations
- template publishing should mean code change + deploy only

## 21.3 Reliability
- if Firestore fails, the public landing page must still work
- private pages must show clear error states

## 21.4 Accessibility
- buttons and form labels required
- keyboard navigation should work for form inputs
- print page should remain readable in grayscale

---

## 22. Privacy and legal minimization requirements

## 22.1 Data minimization
MVP must not collect:
- child real name
- child photo
- school name
- birthdate
- address
- phone number

## 22.2 Copy requirement
Where records are created, show a small note:
“Please do not enter real names, school names, or other sensitive personal information.”

## 22.3 Parent-first framing
On landing or settings page, explain:
- this tool is intended for parent use
- the parent should manage the stored record content

## 22.4 Export restriction
No bulk export feature in MVP.
This reduces accidental data spread.

---

## 23. Metrics for MVP

Keep metrics simple.
Do not add heavy analytics infra.

## 23.1 Success metrics
- templates opened per week
- records created per week
- draft-to-submitted conversion rate
- percentage of users with 2+ submitted records in 14 days

## 23.2 How to measure
Initial measurement can be manual from Firestore counts and record patterns.
No dedicated analytics dashboard required in MVP.

---

## 24. Launch content requirements

Before public launch, the product must have:
- at least 10 published templates
- landing page copy
- privacy note
- record flow tested end-to-end
- summary page tested with seed data

If fewer than 10 templates exist, do not launch publicly.

---

## 25. Acceptance criteria for the whole MVP

The MVP is considered “launchable” only if all of the following are true:

1. A new user can open the website, reach the login flow, create an account, and sign in.
2. A signed-in user can browse templates.
3. A draft record can be saved and re-opened later under the same signed-in account.
4. A submitted record appears in the user’s records list.
5. A submitted record contributes to the 14-day summary.
6. A user cannot read another user’s record through Firestore.
7. The template page prints cleanly.
8. The app contains no photo upload feature.
9. The app contains no AI feature.
10. The app contains no payment feature.

---

## 26. Explicit out-of-scope backlog

Move all of these to post-MVP backlog:
- Google/Apple login
- password reset
- image upload
- PDF export
- portfolio page
- child profile management
- multi-child support
- recommendation engine
- AI feedback
- AI worksheet adaptation
- saved favorites
- admin template CMS
- payment
- email reminders

---

## 27. Post-MVP roadmap (for reference only)

### v1.1
- optional single photo upload (only after cost decision)
- Google sign-in
- 30-day summary toggle

### v1.2
- lightweight portfolio view
- template favorites
- basic recommendation by underused competency

### v2
- AI feedback on child reflection
- AI-assisted template variation

Do not build these during MVP.

---

## 28. Coding-agent implementation plan

This section is written for a low-skill coding agent.
Follow the steps in order.
Do not skip ahead.

### Phase 0 — project bootstrap
1. Create a Next.js App Router app with TypeScript and Tailwind.
2. Add Firebase JS SDK.
3. Add environment variable support for Firebase web config.
4. Create a basic layout and nav.
5. Deploy a basic placeholder to Vercel.

### Phase 1 — static template system
1. Define the template TypeScript types.
2. Create 10–12 template data files.
3. Build `/templates` list page.
4. Build `/templates/[slug]` detail page.
5. Add print button and print CSS.
6. Verify landing works without auth and protected routes redirect to login.

### Phase 2 — account auth + Firestore
1. Initialize Firebase Auth and Firestore.
2. Create login/account-auth helper.
3. Create Firestore collections under `/users/{uid}`.
4. Add security rules.
5. Add `save draft` record functionality.
6. Add record edit page.
7. Add record list page.

### Phase 3 — summary + settings
1. Build last-14-days summary calculation.
2. Build summary page.
3. Build settings page with delete-all-data and sign-out.
4. Test signed-in and signed-out flows from a clean browser.

### Phase 4 — polish and launch readiness
1. Add loading states.
2. Add empty states.
3. Add error states.
4. Add privacy warning copy.
5. Test desktop and mobile.
6. Test print view.
7. Confirm no out-of-scope features were accidentally added.

---

## 29. Task breakdown for a coding agent

The agent should create tickets/tasks exactly like this.

### Task group A — foundation
- A1: scaffold Next.js app
- A2: install Tailwind and Firebase SDK
- A3: create app layout and nav shell
- A4: create env config and Firebase client module

### Task group B — template system
- B1: define template types
- B2: implement 10 template data files
- B3: implement template library page
- B4: implement template detail page
- B5: implement print CSS and print button

### Task group C — auth and records
- C1: implement login/account-auth helper
- C2: implement Firestore record type and repository
- C3: implement create draft flow
- C4: implement record editor form
- C5: implement record list page
- C6: implement save draft and submit actions

### Task group D — summary and settings
- D1: implement 14-day summary calculation
- D2: implement summary page UI
- D3: implement settings page
- D4: implement delete-all-data flow

### Task group E — QA
- E1: test landing without auth and templates with auth
- E2: test new signed-in user record flow
- E3: test edit existing record
- E4: test security rules manually
- E5: test print layout

---

## 30. Definition of done

A task is not done unless:
- code compiles
- route works in browser
- loading state exists
- empty state exists if applicable
- error state exists if applicable
- no TypeScript errors remain
- feature is inside MVP scope

The project is not done unless:
- all core routes work
- account auth works
- Firestore rules are set
- at least 10 templates exist
- records can be created and viewed
- summary works
- delete-stored-record-data works

---

## 31. QA checklist

### 31.1 Functional QA
- sign in and browse templates
- open template detail
- print template page
- start record from template page
- create account and sign in successfully
- save draft
- submit record
- view records list
- view summary
- delete stored record data

### 31.2 Negative QA
- open invalid template slug
- open private record URL when signed out
- query another user’s data
- submit record with zero competency ratings
- summary page with no data

### 31.3 Device QA
- desktop Chrome
- mobile Safari or Chrome
- print preview on desktop

---

## 32. Key implementation guardrails

1. Do not introduce server actions unless truly needed.
2. Do not introduce route handlers unless truly needed.
3. Do not introduce image upload.
4. Do not introduce payment.
5. Do not introduce PDF generation.
6. Do not introduce admin tooling.
7. Do not store child real names in Firestore.
8. Do not depend on Firebase Storage.
9. Do not let protected routes leak content before auth is confirmed.
10. Do not let scope expand during implementation.

---

## 33. Research notes that materially changed the MVP

These external constraints influenced the design:

1. **IB PYP official framework** emphasizes inquiry-based, transdisciplinary, student-centered learning, agency, reflection, and action. That is why templates are structured around big question → thinking → expression → reflection instead of quiz-only content.
2. **Korea’s 2022 revised curriculum** emphasizes core competencies and digital basic literacy. That is why templates and records are competency-tagged.
3. **2028 admissions reform direction** already locks in high-school internal grade changes toward a 5-grade structure, which makes simple A–E style rubrics a useful fit for parent-facing growth records.
4. **Firebase email/password auth** keeps bootstrap implementation simple while still enforcing account-based access.
5. **Cloud Firestore** still offers a free quota suitable for small MVPs.
6. **Cloud Storage for Firebase** requires Blaze-plan access to default buckets as of early February 2026, which is why uploads are removed from MVP.
7. **Vercel Hobby** is free but positioned for personal/non-commercial use, so it is fine for prototype/beta but should not be treated as the final commercial hosting assumption.
8. **Korean privacy guidance for under-14 users** reinforces minimizing child personal information collection. That is why the MVP avoids real child names and media uploads.

---

## 34. Final decision summary

The launchable MVP is:
- a **web app**, not a mobile app
- a **template and record tool**, not an AI generator
- **public landing + authenticated templates and private text records**
- **login accounts + Firestore**
- **no uploads, no PDFs, no payments, no backend**

If a feature pressures the product away from those constraints, it should be postponed.
