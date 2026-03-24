# IBNote QA Test Accounts

Purpose: narrow-scope operating note for runtime QA accounts used to verify authenticated flows.

## Rules
- Use these accounts only for QA, smoke verification, and browser automation of protected flows.
- Do not use QA accounts as long-term product/user data truth.
- If a listed credential stops working, treat it as replaceable QA infrastructure rather than as a product blocker.
- When a credential is changed or replaced, update this file and add a short BLACKBOARD note.
- Prefer one canonical reusable QA account before creating additional disposable accounts.

## Canonical QA account
- Label: `qa-primary`
- Email: `ibnote.test01@tigsgit.com`
- Password: `1q2w3e4r`
- Status: `working`
- Last checked: `2026-03-14 09:20 Asia/Seoul`
- Last result: direct Firebase Auth account creation succeeded against the active Firebase project using the canonical email/password, so this credential is now available for authenticated QA.
- Recovery action taken: recreated the canonical QA account on the active Firebase project after earlier sign-in returned `INVALID_LOGIN_CREDENTIALS`.

## Recovery rule
If `qa-primary` does not authenticate:
1. First verify that the Firebase project/env in `.env.local` is still the intended active runtime.
2. If env is correct, attempt controlled recreation of the same QA account or create a replacement canonical QA account.
3. After recovery, update this file with the new status and exact last-checked result.
4. Reflect the change in `docs/BLACKBOARD.md` if it affects QA continuity.

## Current implication for 001 / Phase E
- `E-01` authenticated browser-driven QA is no longer blocked by missing documented credentials.
- A canonical reusable QA account now exists for protected-flow verification on the active Firebase project.
- The next QA step should use this credential to run Playwright/browser-driven verification for `E-01`, then continue sequentially if the matrix clears.
