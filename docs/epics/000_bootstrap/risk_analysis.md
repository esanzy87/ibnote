# IBNote Bootstrap Risk Analysis

Status: Open risks and closeout classification notes
Source of truth: `docs/epics/000_bootstrap/prd.md`

## 1. Purpose

This document holds items that are not safe to leave implicit during implementation.

Each item is here because at least one of the following is true:
- the PRD is ambiguous
- the PRD offers more than one valid implementation path
- the work depends on external service behavior
- the work may fail in production if a human does not review it

Resolved implementation defaults belong in `docs/epics/000_bootstrap/adr.md`, not here.

## 1.1 Closeout classification rule

During bootstrap closeout:
- keep only launchability-critical in-scope unresolved work in the bootstrap blocker path
- keep non-critical findings as closeout notes unless a fresh failure proves launchability risk
- route out-of-scope or nice-to-have items to next-feature candidates or handoff notes
- do not pull routed items back into bootstrap scope without an explicit scope decision

## 2. Open risks and unresolved items

### R-01. Final Korean product copy is not fully specified

- PRD basis: sections 6.2, 15.1, 15.7, 22.2
- Issue: the PRD says copy should be simple and parent-friendly, but it does not provide final Korean text for landing, login, template CTAs, privacy notes, settings explanations, or empty states.
- Impact: a low-skill coding agent may create awkward, inconsistent, or overly technical copy.
- Affected areas: landing page, login page, template pages, record editor, settings, empty/error states.
- Default handling: use plain, simple Korean aligned to the PRD and avoid education jargon.
- Human decision needed: founder/content review before public launch.
- Decision deadline: before launch polish is considered complete.

### R-02. Initial template content quality depends on human review

- PRD basis: sections 5, 11.1, 11.6, 24
- Issue: the PRD defines template structure and names, but it does not provide final text content for all 10 to 12 templates.
- Impact: implementation may satisfy the data shape while still shipping weak or inconsistent educational content.
- Affected areas: `src/content/templates/**`, template detail pages, launch readiness.
- Default handling: structure template files exactly as specified and keep language parent-friendly.
- Human decision needed: template content review for educational quality and brand fit.
- Decision deadline: before public launch because at least 10 published templates are mandatory.

### R-03. Firestore index set cannot be finalized from the PRD alone

- PRD basis: section 16.5
- Issue: the PRD expects at least one composite index and notes that Firebase may generate required indexes during development, but it does not fully enumerate the final index list.
- Impact: record list or summary queries may fail at runtime until missing indexes are created.
- Affected areas: `/my/records`, `/my/summary`, deployment readiness.
- Default handling: let Firebase surface required indexes during development, then commit generated index config.
- Human decision needed: none if development environment confirms the final set; otherwise founder review if index count grows unexpectedly.
- Decision deadline: before staging or production deployment.

### R-04. Email/password account flow needs runtime verification

- PRD basis: sections 13, 14, 15.7, 21.3
- Issue: the product decision is settled, but real sign-in, sign-up, sign-out, expired-session, and route-return behavior still depend on Firebase runtime behavior and UI implementation quality.
- Impact: a route may loop, drop the return path, or become unusable if auth state changes are not tested from a clean browser session.
- Affected areas: `/login`, protected routes, `Start record` flow, settings sign-out flow.
- Default handling: keep auth UX minimal and test sign-in, sign-out, expired-session, and return-path flows manually from a clean browser.
- Human decision needed: none, but manual QA is mandatory.
- Decision deadline: before launch sign-off.

### R-05. Password-reset and account-deletion flows are intentionally excluded from bootstrap MVP

- PRD basis: auth direction change and ADR-008
- Issue: the product now requires login accounts, but bootstrap scope intentionally excludes broader account lifecycle features.
- Impact: support expectations may drift if the product copy implies full account management.
- Affected areas: login page, settings page, support messaging.
- Default handling: keep copy truthful that bootstrap MVP supports sign-in, sign-up, sign-out, and record-data deletion only.
- Human decision needed: founder review on whether password reset or account deletion should enter a later milestone before public launch.
- Decision deadline: before launch messaging is finalized.

### R-06. Delete-all-data flow can be destructive if not carefully scoped

- PRD basis: sections 15.7, 22, 25
- Issue: the app must delete only the current user's stored data. A bug in path construction or query scope could delete the wrong documents.
- Impact: severe privacy and trust failure.
- Affected areas: record repository, settings actions, security QA.
- Default handling: keep deletion scoped strictly to `/users/{uid}` and verify with manual QA plus security-rule testing.
- Human decision needed: none.
- Decision deadline: before settings release.

## 3. Threats and failure modes to test explicitly

### T-01. Privacy regression through free-text fields

- Risk: users may still type real names or school names into reflection fields.
- Why it matters: the product strategy depends on minimizing child-related personal information.
- Required mitigation: show the privacy warning at record entry points and avoid adding fields that encourage sensitive data.
- Residual risk: medium, because free-text cannot be perfectly prevented without moderation.

### T-02. Scope creep by convenience additions

- Risk: a coding agent may add uploads, richer auth providers, password-reset flows, account deletion, charts, or admin tools because they seem convenient.
- Why it matters: the MVP is intentionally narrow and cost-constrained.
- Required mitigation: run a scope audit after every major slice and compare against the PRD exclusions list.
- Residual risk: medium.

### T-03. Firestore misconfiguration exposing user data

- Risk: permissive rules or incorrect path usage could expose records.
- Why it matters: Firebase config is public and security depends on rules.
- Required mitigation: keep the baseline rules in the repo and manually test cross-user denial.
- Residual risk: high until verified.

## 4. Human review checklist

Before public launch, a human should review:
1. Korean copy quality and tone
2. educational quality of the first 10 to 12 templates
3. summary wording and usefulness
4. login/settings wording for truthfulness
5. whether password reset or account deletion should remain out of bootstrap scope
6. final hosting plan if the product moves beyond prototype/beta

## 5. Exit condition for this document

This document is reduced, not deleted, as items become resolved.

An item can move out of this file only when one of the following is true:
- the PRD or implementation proves a single clear answer
- a deliberate default is recorded in `adr.md`
- the item is no longer relevant to MVP scope
