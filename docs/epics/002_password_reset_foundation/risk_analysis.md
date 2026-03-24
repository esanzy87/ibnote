# IBNote 002 Password Reset Foundation Risk Analysis

Status: Signed off for implementation start; open risks remain tracked here
Source of truth: `docs/epics/002_password_reset_foundation/prd.md`

## 1. Purpose

This document tracks risks that are unsafe to leave implicit during 002 planning and implementation.

## 2. Open risks and unresolved items

### R-01. Reset UX can make auth entry feel more complex

- Issue: adding reset affordance may make `/login` feel crowded or less clear.
- Impact: sign-in/create-account conversion drops.
- Default handling: keep reset affordance visible but clearly secondary, and default to a dedicated minimal reset-request route rather than modal/inline complexity.
- Human decision needed: none unless auth surface becomes too dense in review.

### R-02. Messaging can leak account existence implicitly

- Issue: overly specific success/error copy may suggest whether an email is registered.
- Impact: auth privacy posture weakens.
- Default handling: use generic post-submit guidance and avoid explicit existence confirmation.
- Human decision needed: none unless legal/privacy stance changes.

### R-03. Runtime reset behavior may depend on provider/env truth

- Issue: password reset delivery can fail if active auth configuration is incomplete or mismatched.
- Impact: false sense of readiness or blocked QA.
- Default handling: runtime verification is required before closeout; separate request-initiation verification from independent delivery verification, and if env/provider truth blocks delivery, report it explicitly as env/runtime truth rather than product completion.
- Human decision needed: possibly, if provider-side setup is incomplete.

### R-04. Reset scope can drift into broader lifecycle work

- Issue: implementation may start pulling in account deletion, password change, support tooling, or settings expansion.
- Impact: package grows beyond its intended leverage and slips.
- Default handling: explicit scope audit before closeout.
- Human decision needed: only if scope expansion is intentionally requested.

### R-05. Done-state can be overstated from code-only evidence

- Issue: reset UI may exist even if the real runtime path was not verified, or request initiation may be verified while delivery truth remains unknown.
- Impact: package is called done without real recovery truth.
- Default handling: require runtime QA in addition to lint/typecheck/build, and require the exact evidence boundary to be stated explicitly.
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

## 4.1 Sign-off record for 2026-03-14

Recorded human sign-off truth:
- `002_password_reset_foundation sign-off ok.`
- This package includes email/password self-serve password reset only.
- Account deletion, provider expansion, and broader account lifecycle work remain out of scope for 002.
- Implementation may proceed on this basis.

## 4.2 Closeout disposition for 2026-03-14 17:00 Asia/Seoul

Final human-review-style checklist pass recorded by the agent against the implemented package and current evidence set:
- Discoverability from `/login`: accepted. Reset entry is visible and clearly secondary to sign-in/create-account.
- Auth clarity after adding reset affordance: accepted. The three auth actions remain distinguishable.
- Post-submit guidance truthfulness: accepted with explicit evidence boundary. Request initiation is verified; inbox delivery is not independently claimed.
- Account-existence leakage: accepted. Copy remains ambiguity-safe and does not depend on disclosing whether an email exists.
- Scope drift check: accepted. No drift into account deletion, provider expansion, admin recovery, or `/my/settings` reset controls was found.
- Runtime evidence honesty: accepted. Current package truth claims only what was freshly verified in C-01/C-02.

Risk disposition:
- R-01: accepted for launch in current form.
- R-02: accepted with current ambiguity-safe copy.
- R-03: partially resolved by fresh runtime verification; remaining inbox-delivery uncertainty stays explicitly out of the claimed evidence boundary.
- R-04: resolved for 002 closeout by explicit scope audit.
- R-05: resolved for 002 closeout by runtime-backed evidence plus explicit delivery-boundary wording.

Closeout conclusion:
- Agent-side implementation, QA, and closeout recording for `002_password_reset_foundation` are complete.
- The package is now in truthful `ready-handoff` state pending any explicit human acknowledgment / next-package selection, not further implementation.

## 5. Exit condition for this document

An item can move out of this file only when:
- runtime evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off
