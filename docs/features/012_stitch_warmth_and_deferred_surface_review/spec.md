# IBNote 012 Stitch Warmth and Deferred Surface Reintegration Spec

Status: Hardened - broad implementation package
Source of truth: `docs/features/012_stitch_warmth_and_deferred_surface_review/prd.md`

## 1. Purpose

This spec structures 012 as a broad reintegration and implementation package rather than a review-only package.

## 2. Included route surfaces

### 2.1 Warmth polish surfaces
- `src/app/page.tsx`
- `src/components/ui/login-form.tsx`
- `src/components/templates/template-library-client.tsx`
- `src/components/templates/protected-template-detail.tsx`
- `src/components/records/create-record-transition.tsx`
- `src/components/ui/password-reset-request-form.tsx` (minor alignment only if needed)

### 2.2 Deferred reintegration surfaces
- `src/components/records/record-editor.tsx`
- `src/components/records/records-list-client.tsx`
- `src/components/summary/summary-page-client.tsx`

## 3. Required source material

- `docs/features/010_stitch_ui_adoption_foundation/carry_forward_notes.md`
- `tmp/010_carry_forward_patches/record-editor.patch`
- `tmp/010_carry_forward_patches/records-list.patch`
- `tmp/010_carry_forward_patches/summary-page.patch`
- current post-010/011 implementations of landing/login/templates/detail/transition/reset

## 4. Route policy matrix

| Route | Warmth target | Deferred salvage target | Risk posture |
| --- | --- | --- | --- |
| `/` | medium-high | n/a | preserve product explanation over brand flourish |
| `/login` | medium | n/a | preserve email/password truth |
| `/templates` | medium | n/a | keep chooseability dominant |
| `/templates/[slug]` | low-medium | n/a | keep activity-fit clarity dominant |
| record creation transition | low-medium | n/a | keep transitional honesty dominant |
| `/reset-password` | low | n/a | keep recovery clarity dominant |
| `/my/records` | low-medium | high | strongest deferred reintegration candidate |
| `/my/records/[id]` | low | medium | selective reintegration only |
| `/my/summary` | low | medium-low | partial reintegration only |

## 5. Reintegration rules

### 5.1 Warmth rules
- warmth should be added primarily in headline tone, section framing, and micro-reassurance
- warmth must not replace clear workflow explanation
- avoid reintroducing wellness-brand, campaign-like, or fictional language

### 5.2 Deferred reintegration rules
- preserved patches are candidate input, not automatic truth
- `/my/records` may absorb the most salvageable concepts
- `/my/records/[id]` should absorb only ideas that improve re-entry without redefining record semantics
- `/my/summary` should absorb only explanation and continuity improvements that do not turn the page into a report/export surface

## 6. Required outputs

012 implementation prep should produce:
1. keep/rewrite/remove matrix across all included surfaces
2. route-specific implementation bounds
3. explicit note on what from deferred patches is accepted versus still rejected
4. sign-off guidance for broad but bounded implementation

## 7. Initial implementation priorities

1. `/my/records` deferred reintegration
2. selective `/my/records/[id]` reintegration
3. selective `/my/summary` reintegration
4. public-entry and core-route warmth polish pass

## 8. Acceptance checklist

012 should not be treated as ready unless all are yes:
1. Are all deferred 010 surfaces explicitly re-reviewed?
2. Is it clear where warmth is allowed to rise and where clarity must dominate?
3. Are `/my/records`, `/my/records/[id]`, and `/my/summary` given separate reintegration judgments?
4. Is fake surface expansion still explicitly forbidden?
5. Would an implementation worker know what to integrate, narrow, or still reject?
