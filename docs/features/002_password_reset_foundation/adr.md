# IBNote 002 Password Reset Foundation ADR

Status: Signed-off defaults for 002 implementation
Source of truth: `docs/features/002_password_reset_foundation/prd.md`

## 1. Purpose

This document records fixed decisions for the 002 package so planning and implementation do not drift into broader account-lifecycle work.

## ADR-001. Keep 002 as password-reset-only scope

- Status: accepted
- Context: the next highest-leverage account-lifecycle gap is password reset, not full account management.
- Decision: 002 adds password reset only.
- Consequences:
  - account deletion stays out of scope
  - package size and verification remain manageable

## ADR-002. Defer account deletion to a later package

- Status: accepted
- Context: account deletion carries reauthentication, destructive UX, and data-cleanup complexity beyond the desired 002 slice.
- Decision: do not include account deletion in 002.
- Consequences:
  - 002 stays small and launch-relevant
  - deletion can be designed separately with the right safeguards later

## ADR-003. Prefer a dedicated minimal reset-request route as the default UX shape

- Status: accepted
- Context: reset can be made discoverable in multiple valid ways, but unattended implementation becomes safer when the UX shape is fixed up front.
- Decision: use a dedicated minimal reset-request route as the default implementation shape, linked from `/login`, unless implementation truth reveals a smaller route-equivalent shape with the same clarity and lower risk.
- Consequences:
  - `/login` stays simpler and less crowded
  - reset flow QA becomes easier to isolate
  - unattended implementation has less room to invent modal/inline complexity

## ADR-004. Use existing auth infrastructure instead of custom recovery logic

- Status: accepted
- Context: standard provider behavior is safer than bespoke recovery mechanics.
- Decision: use the existing email/password auth stack's standard reset mechanism.
- Consequences:
  - lower technical and security risk
  - less maintenance burden

## ADR-005. Prefer ambiguity-safe messaging over account-existence disclosure

- Status: accepted
- Context: reset UX can accidentally leak whether an email is registered if copy is too specific.
- Decision: use calm, generic success/help wording that does not depend on exposing account existence.
- Consequences:
  - safer auth messaging
  - clearer privacy posture
