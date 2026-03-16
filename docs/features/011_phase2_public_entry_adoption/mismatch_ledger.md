# IBNote 011 Phase-2 Public Entry Adoption Mismatch Ledger

Status: Draft
Source of truth: `docs/features/011_phase2_public_entry_adoption/spec.md`

## 1. Purpose

This ledger records the gap between the Stitch landing/login concepts and current IBNote public-entry truth.

It exists to preserve the strongest visual gains while preventing public-entry surfaces from drifting into unsupported auth or marketing scope.

## 2. Decision categories

- `adopt_as_is`
- `adopt_with_rewrite`
- `visual_only_reference`
- `remove_for_truth_mismatch`
- `defer_for_later_decision`

## 3. Route-level ledger

| Screen | Route | Element | Stitch behavior | Current IBNote truth | Decision | Implementation note |
| --- | --- | --- | --- | --- | --- | --- |
| `ibnote_landing_page` | `/` | calmer hero composition | strong first-impression structure | landing already explains product and start path | `adopt_with_rewrite` | keep warmth and hierarchy, rewrite copy to explain real product loop plainly |
| `ibnote_landing_page` | `/` | top navigation with How it works / Activities / Privacy | expands marketing-site navigation | current product does not expose those public sections | `remove_for_truth_mismatch` | remove unsupported top-nav sections |
| `ibnote_landing_page` | `/` | primary CTA emphasis | useful and aligned | landing should clearly guide users to login/start | `adopt_as_is` | keep single truthful CTA path to login/start |
| `ibnote_landing_page` | `/` | editorial child/family photography | attractive but implies brand/editorial layer | current landing is product-explanation-first | `visual_only_reference` | avoid image dependence; use calm composition instead |
| `ibnote_landing_page` | `/` | fake quotes / latest reflection card | suggests richer content/brand storytelling than product guarantees | current landing should explain actual flow, not fictional moments | `remove_for_truth_mismatch` | do not use fictional reflection previews |
| `ibnote_landing_page` | `/` | “mindful parenting”, “reflection journey”, “magic” language | wellness/lifestyle framing | IBNote should remain practical and parent-facing | `remove_for_truth_mismatch` | replace with product-honest language |
| `ibnote_landing_page` | `/` | “Join thousands of parents” style social proof | unsupported claim | no evidence-backed social-proof basis in product docs | `remove_for_truth_mismatch` | remove completely |
| `ibnote_landing_page` | `/` | activity examples section | useful if tied to real templates | current landing already previews template examples | `adopt_with_rewrite` | keep product-linked examples only |
| `login_sign_up` | `/login` | structured two-panel layout | strong visual baseline | login can benefit from calmer split layout | `adopt_with_rewrite` | preserve balanced info/form layout while keeping current auth truth |
| `login_sign_up` | `/login` | Google / Apple login | unsupported auth expansion | current auth is email/password only | `remove_for_truth_mismatch` | remove entirely |
| `login_sign_up` | `/login` | Support Center link | unsupported support surface | not current product scope | `remove_for_truth_mismatch` | remove entirely |
| `login_sign_up` | `/login` | fake usage/social proof (“12,000+ parents”) | unsupported trust device | no evidence-backed support in product truth | `remove_for_truth_mismatch` | remove completely |
| `login_sign_up` | `/login` | reassuring informational panel | helpful when tied to actual next-step behavior | current login already explains nextTarget and auth state | `adopt_with_rewrite` | preserve reassurance but ground it in real post-login flow |
| `login_sign_up` | `/login` | visibility toggle / polished inputs | useful presentational upgrade | current login can adopt calmer form styling | `adopt_with_rewrite` | optional if it does not add auth complexity |

## 4. Positive adoption primitives

These are the strongest public-entry design traits worth preserving from Stitch:
- warmer and more premium first impression
- calmer hero hierarchy
- softer split-panel auth layout
- stronger CTA emphasis
- cleaner visual rhythm between explanation and action

## 5. Elements to tone down

- oversized marketing-page section density
- editorial imagery
- lifestyle-brand slogans
- decorative navigation or footer clutter that implies unsupported scope

## 6. Elements to remove by default

- fake social proof
- social login
- support/community/resources surfaces
- fictional reflection cards or fabricated product moments
- unsupported privacy/security promises beyond current product behavior
