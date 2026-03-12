# IBNote Night Run Report

## Completed tasks

- `A-01` Scaffold Next.js App Router project
- `A-02` Install Tailwind and Firebase SDK
- `A-03` Add Firebase env config pattern
- `A-04` Create app shell layout and nav
- `A-05` Add landing page route shell
- `A-06` Add login page route shell
- `B-01` Define template types and filter helpers
- `B-02` Create initial published template pack
- `B-03` Implement template repository and ordered list export
- `B-04` Build protected template library route
- `B-05` Build protected template detail route
- `B-06` Add print styles and print action
- `C-03` Implement login and account-creation flow
- `C-01` Initialize Firebase Auth and Firestore modules
- `C-02` Implement auth user hook and route guard
- `C-04` Define record/profile types
- `C-05` Implement record repository CRUD and queries
- `C-10` Add Firestore security rules and baseline index config

## Current in-progress task

- `C-08` Build records list route (`todo`)

## Verification results per task

### A-01 Scaffold Next.js App Router project

- Static scaffold present and dependency installation succeeded with `npm install`
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed after removing unsupported `reactCompiler` config from `next.config.ts`
- Verification pass 3: booted `npm run dev` and fetched `/`, confirming the app served the home page without runtime crash
- Result: task completed truthfully

### A-02 Install Tailwind and Firebase SDK

- Installed `firebase`, `tailwindcss`, `@tailwindcss/postcss`, and `postcss`
- Added `postcss.config.mjs` and updated `src/styles/globals.css` to use Tailwind v4 CSS import
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: booted `npm run dev`, fetched the served stylesheet, and confirmed Tailwind utility tokens like `min-h-screen`, `bg-stone-100`, and `shadow-sm` were present
- Result: task completed truthfully

### A-03 Add Firebase env config pattern

- Added `.env.example` with required `NEXT_PUBLIC_FIREBASE_*` keys
- Added `src/lib/firebase/client.ts` with lazy env validation and single-app bootstrap helpers
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled the Firebase client module and executed `getFirebaseApp()` with all Firebase env vars unset, which failed clearly with `Missing required Firebase env var: NEXT_PUBLIC_FIREBASE_API_KEY...`
- Result: task completed truthfully

### A-04 Create app shell layout and nav

- Updated `src/app/layout.tsx` to add a shared header shell, product branding, safe home navigation, and non-link placeholders for future service areas
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: booted `npm run dev` and fetched `/`, confirming the rendered HTML included the shared shell brand, tagline, home nav label, and future-route placeholders
- Result: task completed truthfully

### A-05 Add landing page route shell

- Updated `src/app/page.tsx` with a structured landing shell covering hero, 3-step flow, example template cards, a next-step CTA area, and a privacy note
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: booted `npm run dev` and fetched `/`, confirming the rendered HTML included the hero, how-it-works section, example cards, CTA placeholder, and privacy note
- Result: task completed truthfully

### A-06 Add login page route shell

- Added `src/app/login/page.tsx` with labeled email/password shell fields, placeholder sign-in/create-account actions, and `next` return-path messaging
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: booted `npm run dev` and fetched `/login?next=/templates`, confirming the rendered HTML included the login shell hero, field labels, placeholder actions, and the expected return-path notice
- Result: task completed truthfully

### B-01 Define template types and filter helpers

- Added `src/lib/templates/template-types.ts` with the spec-defined unions and `WorksheetTemplate` contract
- Added `src/lib/utils/filters.ts` with default template filters plus search, grade-band, competency, and PYP-theme matching helpers
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled the helper modules and executed `filterTemplates(...)` against sample data, which correctly returned `my-opinion-matters`
- Result: task completed truthfully

### B-02 Create initial published template pack

- Added the full preferred set of 12 published, typed template files under `src/content/templates/literacy`, `src/content/templates/thinking`, and `src/content/templates/expression`
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: confirmed 12 template files exist and that all 12 include both `export default` and `isPublished: true`
- Result: task completed truthfully

### B-03 Implement template repository and ordered list export

- Added `src/content/templates/template-list.ts` in the preferred spec order and `src/lib/templates/template-repo.ts` for list/slug reads
- Normalized content-file type imports so the repository layer can be executed independently for verification
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled the repository modules and executed a smoke test that returned `count=12`, the expected first three slugs, and a successful detail lookup for `notice-think-wonder-about-nature`
- Result: task completed truthfully

### C-01 Initialize Firebase Auth and Firestore modules

- Added `src/lib/firebase/auth.ts` and `src/lib/firebase/firestore.ts` as thin service wrappers around the shared Firebase app bootstrap
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled the Firebase service modules and executed both helpers with Firebase env vars unset, confirming both fail through the existing clear missing-env path
- Result: task completed truthfully

### C-02 Implement auth user hook and route guard

- Added `src/lib/auth/use-auth-user.ts` for client-side auth state tracking with retry support and error handling
- Added `src/lib/auth/ensure-auth.ts` for safe `next` path normalization, login redirect URL building, and post-login fallback handling
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled `ensure-auth.ts` and executed the helper functions, confirming `/my/records` becomes `/login?next=%2Fmy%2Frecords`, invalid absolute URLs fall back to `/templates`, and unsafe `//...` paths are rejected
- Result: task completed truthfully

### C-03 Implement login and account-creation flow

- Replaced the login shell with a live email/password auth form, a sign-in/create-account mode toggle, and safe return-path handling in `src/app/login/page.tsx` and `src/components/ui/login-form.tsx`
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed after moving client-only login logic out of the route page and into a dedicated client component
- Verification pass 3: used Playwright on `http://127.0.0.1:3000/login?next=/templates` and confirmed the `next` notice rendered, the mode switched to create-account, and empty submit showed `이메일과 비밀번호를 모두 입력해 주세요.`
- Result: implementation is in place, but the task remained open at the time of this verification because successful sign-in/create-account and post-login landing still needed truthful end-to-end verification against a real protected route

### Session tracker truth sync

- Updated `docs/features/000_bootstrap/todo.md` so `C-03` is no longer marked `blocked`; the Firebase env/runtime blocker is cleared and the task is now tracked as `todo` pending final end-to-end verification
- Updated the active work snapshot to `Phase B - Static template system` with `B-04` as the single in-progress task, reflecting that `/templates` is the next missing route after successful login
- Verification pass 1: re-read the updated tracker sections and confirmed the C-03/B-04 status changes match the documented execution order and the current repo state
- Verification pass 2: `npm run lint` and `npm run typecheck` passed
- Verification pass 3: `npm run build` passed with `.env.local` loaded, and the route manifest still truthfully shows `/templates` is not implemented yet
- Result: tracker and report are now truthful for the current run state

### B-04 Build protected template library route

- Added `src/app/templates/page.tsx` plus reusable library UI in `src/components/templates/template-library-client.tsx`, `src/components/templates/template-library-filters.tsx`, and `src/components/templates/template-card.tsx`
- Updated `src/app/layout.tsx` so the shared nav now links to the real `Login` and `Templates` routes instead of stale placeholders
- Verification pass 1: used Playwright against `http://127.0.0.1:3001/templates` and confirmed unsigned access redirected to `/login?next=%2Ftemplates`, a newly created account landed on `/templates`, the signed-in page showed 12 published templates, a no-match search showed the empty state, and `필터 초기화` restored the full list immediately
- Verification pass 2: `npm run lint` and `npm run typecheck` passed
- Verification pass 3: `npm run build` passed and the route manifest now includes `/templates`
- Result: task completed truthfully

### B-05 Build protected template detail route

- Added `src/app/templates/[slug]/page.tsx` with static params from the published template pack and a protected client wrapper in `src/components/templates/protected-template-detail.tsx`
- Implemented the required detail sections for valid templates, a signed-in invalid-slug state, and a protected redirect path for unsigned access to a specific slug
- Verification pass 1: used Playwright on `http://127.0.0.1:3001/templates/my-opinion-matters` and confirmed the full detail content rendered for a signed-in session; then opened `/templates/not-a-real-template` and confirmed the invalid-template state; then cleared browser auth storage and confirmed the same invalid slug redirected to `/login?next=%2Ftemplates%2Fnot-a-real-template`
- Verification pass 2: `npm run lint` and `npm run typecheck` passed
- Verification pass 3: `npm run build` passed and the route manifest now includes `/templates/[slug]` with generated static params
- Result: task completed truthfully

### B-06 Add print styles and print action

- Added `src/styles/print.css` and imported it from `src/app/layout.tsx`, hiding app chrome in print and expanding the printable template detail layout for grayscale-friendly output
- Replaced the detail-page placeholder with a real `window.print()` action via `src/components/ui/print-button.tsx`, and marked the detail action row and header as print-hidden
- Verification pass 1: used Playwright on `http://127.0.0.1:3001/templates/my-opinion-matters`, confirmed the `인쇄하기` button invoked `window.print()`, then emulated print media and verified the header and action row resolved to `display: none` while the printable root width expanded to `max-width: none`
- Verification pass 2: `npm run lint` and `npm run typecheck` passed
- Verification pass 3: `npm run build` passed with print support included in the route output
- Result: task completed truthfully

### C-03 Implement login and account-creation flow

- No new auth code was required after `B-04` through `B-06`; the closeout work here was end-to-end runtime verification against real protected routes
- Verification pass 1: used Playwright to create a new Firebase email/password account and confirmed it landed on `/templates`; then signed in with the same account via `/login?next=/templates/my-opinion-matters` and confirmed it returned to the intended protected route
- Verification pass 2: `npm run lint` and `npm run typecheck` passed with the existing auth implementation unchanged
- Verification pass 3: `npm run build` passed with `/login`, `/templates`, and `/templates/[slug]` all in the route manifest
- Result: task completed truthfully

### C-04 Define record/profile types

- Added `src/lib/records/record-types.ts` with the spec-defined `AbsoluteGrade`, `RecordStatus`, `WorksheetRecord`, and `UserProfile` contracts
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: confirmed the exported contract names and types exist in `record-types.ts`
- Result: task completed truthfully

### C-05 Implement record repository CRUD and queries

- Added `src/lib/records/record-repo.ts` with current-user-scoped create, read, list, update, and delete-all helpers plus explicit path helpers
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: compiled the repository module and confirmed it only builds `users/{uid}/records` paths, while Firestore access still flows through the existing missing-env guard when config is absent
- Result: task completed truthfully

### C-10 Add Firestore security rules and baseline index config

- Added `firestore.rules` with per-user access rules for `/users/{uid}`, `/profile/*`, and `/records/*`
- Added `firestore.indexes.json` with the baseline `status + updatedAt` composite index for record queries
- Verification pass 1: `npm run typecheck` passed
- Verification pass 2: `npm run build` passed
- Verification pass 3: confirmed the rules file contains only `request.auth.uid == userId` scoped access and the index config contains `status` plus `updatedAt`
- Result: task completed truthfully

## Blockers encountered

- Historical blocker note: an earlier verification pass reproduced `403 PERMISSION_DENIED` for current-user `/users/{uid}/records` access, which is why `C-07` had been marked `blocked`.
- Protocol correction applied on 2026-03-12: after the human reported an external Firebase rules update, that older blocker should have been downgraded to `pending revalidation` instead of being treated as still-confirmed truth without a fresh runtime check.
- Latest manual revalidation supplied by the human on 2026-03-12 showed a different runtime reality: login succeeded, `/templates` loaded, `/my/records/<record-id>` opened, and no Firestore `403 PERMISSION_DENIED` signal was observed in the browser console during that check.
- Updated interpretation: the previously confirmed Firestore permission blocker is no longer the best current explanation for `C-07`. The blocker is resolved for record-open verification, and the remaining limitation is product scope: the editor save/submit behaviors are still placeholder UX and belong to `C-09`, not to a runtime permission blocker.
- Process blocker discovered: stale blocker text survived an external change because no mandatory smoke revalidation step ran immediately after the human update. The protocol/docs were updated so future external fixes move blocker state to `pending revalidation` until a fresh smoke check confirms `resolved` or `blocked` again.
- End-of-run notification command failed because the local `openclaw` gateway on `ws://127.0.0.1:18789` was unavailable (`1006 abnormal closure`).

## Assumptions made

- Used `npm` as the package manager because `pnpm`, `yarn`, and `bun` are not installed.
- Kept Tailwind on the current v4 CSS-first path because it is the smallest setup compatible with the installed Next.js version.
- Used lazy Firebase env validation so missing config fails clearly when Firebase is actually invoked, without breaking the public landing page by default.

## Deferred env/config items

- No current Firebase permission blocker is confirmed after the latest human manual revalidation. Keep using the new revalidation protocol whenever a future external Firebase change is reported.

## Next recommended steps

- Update the bootstrap tracker so `C-07` is no longer marked `blocked` by the stale Firebase permission claim.
- Treat the latest truthful state as: record-open/runtime verification now passes at a smoke level, while save/submit behavior remains future work under `C-09`.
- Resume Phase C execution with the next unblocked task (`C-08`) or explicitly re-close `C-07` if one more fresh QA pass is captured and written back to the tracker.

## Night summary

Phase A is complete and Phase B remains closed. The earlier Firestore `PERMISSION_DENIED` blocker should no longer be treated as the current runtime truth after the human's latest manual revalidation. The operational correction for this repo is to require immediate smoke revalidation after any external Firebase change, so stale blocker text does not survive past a human-reported fix. Current remaining work is product implementation (`C-08`, `C-09`, and later tasks), not a confirmed Firebase permission outage.
