# IBNote 013 Records Surface Stitch Polish PRD

Version: 0.1
Date: 2026-03-17
Owner: agent-authored docpack
Status: Closed
Depends on:
- `012_stitch_warmth_and_deferred_surface_review`

## 1. Purpose

013 is a small follow-on package opened after real-use review showed that `/my/records` and `/my/records/[id]` still do not visibly feel Stitch-aligned enough, even after 012.

The purpose of 013 is to complete the visibly recognizable Stitch-style polish on the records list and record editor surfaces without reopening broad reintegration scope.

## 2. One-line definition

`013_records_surface_stitch_polish` strengthens the visible Stitch-style application on `/my/records` and `/my/records/[id]` so those routes match the rest of the redesigned product more clearly in real use.

## 3. Why this package exists

012 successfully advanced reintegration and warmth in multiple areas, but real-use feedback showed that the records list and record editor still do not read as clearly Stitch-styled surfaces.

That means 012 improved structure/content but did not fully complete the visible design translation on those routes.

013 exists to close that gap with a narrow, route-specific polish pass.

## 4. In scope

- `/my/records`
- `/my/records/[id]`
- route-specific visual hierarchy polish
- stronger visible Stitch-style card/section treatment
- density cleanup after the visible style gap is closed

## 5. Out of scope

- `/my/summary`
- landing/login/templates/detail/transition/reset
- auth or data-model changes
- new features or capability expansion
- semantic redefinition of record/editor behavior

## 6. Goals

1. make `/my/records` feel visibly Stitch-aligned in real use
2. make `/my/records/[id]` feel visibly Stitch-aligned in real use
3. restore a bounded top-navigation/app-shell truth on non-landing routes
4. reduce density only after the missing style layer is corrected
5. preserve current product truth and reintegration boundaries

## 7. Success criteria

013 is successful only if:
1. a human can clearly see the Stitch-style alignment on `/my/records`
2. a human can clearly see the Stitch-style alignment on `/my/records/[id]`
3. density and guidance feel calmer, not heavier
4. product truth remains unchanged

## 8. Current closeout truth

- Phase A through Phase B implementation is present in the current worktree.
- The route-local workspace shell and stronger visual hierarchy are now applied on both records surfaces.
- Static repo health is expected to stay green after any final cleanup.
- Fresh authenticated browser verification on 2026-03-24 cleared the earlier protected-route QA concern after the active local env was corrected.
- `/my/records`, `/my/records/[id]`, and the `새 기록 시작 -> /templates -> 템플릿 상세 -> 기록 시작` path were all verified in live use.
- A records-card layout issue found during final review was corrected before closeout.
- The next truthful action is not more 013 implementation; it is next-feature selection and promotion.
