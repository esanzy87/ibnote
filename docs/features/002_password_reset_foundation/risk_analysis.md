# IBNote 002 Password Reset Foundation Risk Analysis

Status: Open risks and review-sensitive items
Source of truth: `docs/features/002_password_reset_foundation/prd.md`

## 1. Purpose

This document tracks risks that are unsafe to leave implicit during 002 planning and implementation.

## 2. Open risks and unresolved items

### R-01. Reset UX can make auth entry feel more complex

- Issue: adding reset affordance may make `/login` feel crowded or less clear.
- Impact: sign-in/create-account conversion drops.
- Default handling: keep reset affordance visible but clearly secondary.
- Human decision needed: none unless auth surface becomes too dense in review.

### R-02. Messaging can leak account existence implicitly

- Issue: overly specific success/error copy may suggest whether an email is registered.
- Impact: auth privacy posture weakens.
- Default handling: use generic post-submit guidance and avoid explicit existence confirmation.
- Human decision needed: none unless legal/privacy stance changes.

### R-03. Runtime reset behavior may depend on provider/env truth

- Issue: password reset delivery can fail if active auth configuration is incomplete or mismatched.
- Impact: false sense of readiness or blocked QA.
- Default handling: runtime verification is required before closeout; if env/provider truth blocks delivery, report it explicitly as env/runtime truth rather than product completion.
- Human decision needed: possibly, if provider-side setup is incomplete.

### R-04. Reset scope can drift into broader lifecycle work

- Issue: implementation may start pulling in account deletion, password change, support tooling, or settings expansion.
- Impact: package grows beyond its intended leverage and slips.
- Default handling: explicit scope audit before closeout.
- Human decision needed: only if scope expansion is intentionally requested.

### R-05. Done-state can be overstated from code-only evidence

- Issue: reset UI may exist even if the real runtime path was not verified.
- Impact: package is called done without real recovery truth.
- Default handling: require runtime QA in addition to lint/typecheck/build.
- Human decision needed: none.

## 3. Threats and failure modes to test explicitly

### T-01. Reset link discoverability too weak
- Mitigation: include focused UI review on `/login`.

### T-02. Reset affordance competes with primary auth actions
- Mitigation: visually subordinate reset entry.

### T-03. Reset copy overpromises delivery certainty
- Mitigation: use truthful wording about checking email without guaranteeing provider outcome.

### T-04. Scope drift into deletion/provider/admin flows
- Mitigation: explicit exclusions audit before closeout.

## 4. Human review checklist

Before package closeout, a human should review:
1. reset entry discoverability from the auth flow
2. auth clarity after adding reset affordance
3. post-submit reset guidance truthfulness
4. no account-existence leakage in messaging
5. no scope drift into deletion/provider/admin flows
6. runtime evidence quality and honesty

## 5. Exit condition for this document

An item can move out of this file only when:
- runtime evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off
