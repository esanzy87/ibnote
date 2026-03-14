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

## ADR-003. Prefer `/reset-password` as the dedicated minimal reset-request route

- Status: accepted
- Context: reset can be made discoverable in multiple valid ways, but unattended implementation becomes safer when the UX shape is fixed up front.
- Decision: use `/reset-password` as the dedicated minimal reset-request route for 002, linked from `/login`. Preserve a sanitized `next` query only for the return-to-login context rather than expanding the reset route into a broader auth surface.
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

## ADR-006. Treat existing settings account actions as regression-only during 002

- Status: accepted
- Context: `/my/settings` already contains account-adjacent actions from the baseline product, but 002 is only meant to add password-reset discovery and request initiation.
- Decision: do not add reset controls to `/my/settings`, and do not modify the existing delete-data/logout behaviors as part of 002.
- Consequences:
  - 002 stays narrowly focused on reset recovery
  - regression scope stays clear without reopening broader lifecycle design
