# IBNote 010 Stitch UI Adoption Foundation Mismatch Ledger

Status: Hardened - Phase-1 implemented
Source of truth: `docs/features/010_stitch_ui_adoption_foundation/spec.md`

## 1. Purpose

This ledger records the gap between Stitch-generated screen outputs and current IBNote product truth.

Its job is to prevent two failure modes:
1. shipping fake capabilities because they look good in the design
2. losing the strongest Stitch design gains because no one explicitly recorded what should survive

## 2. Decision categories

Every notable Stitch element must land in one of these categories:
- `adopt_as_is`
- `adopt_with_rewrite`
- `visual_only_reference`
- `remove_for_truth_mismatch`
- `defer_for_later_decision`

## 3. Implementation Status - Phase 1

All Phase-1 routes have been implemented following the decisions below:
- `/templates/[slug]` (Mode B)
- record creation transition surface (Mode A/B)
- `/templates` (Mode B)
- `/reset-password` (Mode A)

## 4. Screen-level ledger

| Screen | Current route target | Element | Stitch behavior | Current IBNote truth | Decision | Implementation note |
| --- | --- | --- | --- | --- | --- | --- |
| `template_detail` | `/templates/[slug]` | warm hero + calm quick-decision block | strong visual framing, good decision support | route already helps judge activity fit and start record | `adopt_with_rewrite` | preserve layout rhythm and quick-decision framing; remove non-essential decorative/social cues |
| `template_detail` | `/templates/[slug]` | share/bookmark actions | implies extra capability surface | IBNote does not currently support these actions | `remove_for_truth_mismatch` | remove entirely in phase 1 |
| `template_detail` | `/templates/[slug]` | sticky CTA pair | start + print actions clearly surfaced | current route already has start and print emphasis | `adopt_as_is` | map to real actions only |
| `record_creation_transition` | record creation transition | warm loading shell | reassuring transitional state | current route already has loading/error/redirect states | `adopt_as_is` | preserve calm transition feel; avoid fake progress claims |
| `record_creation_transition` | record creation transition | progress bar with arbitrary percent | implies precise backend progress | current route does not expose trustworthy progress percentage | `adopt_with_rewrite` | use indeterminate loading/progress treatment instead |
| `template_library` | `/templates` | guidance block (“pick one”) | strong low-pressure chooseability cue | aligns with current product truth and ambition | `adopt_as_is` | localize truthfully into Korean product copy |
| `template_library` | `/templates` | category chips / filter treatment | visually useful, but taxonomy may differ | current product already has filter/search model | `adopt_with_rewrite` | preserve chip/filter style while mapping to real taxonomy |
| `template_library` | `/templates` | image-heavy editorial cards | strong mood, weaker chooseability if overused | IBNote is activity-pick flow, not lifestyle content catalog | `visual_only_reference` | tone down imagery and preserve clearer activity metadata |
| `template_library` | `/templates` | suggest activity / footer community links | implies broader community/product scope | current product does not support those areas | `remove_for_truth_mismatch` | remove entirely |
| `password_reset` | `/reset-password` | split calm reassurance layout | good emotional tone and clear recovery structure | aligns well with current product need | `adopt_as_is` | keep security/privacy text truthful and modest |
| `login_sign_up` | `/login` | polished two-panel auth layout | visually strong but semantically expanded | current auth is email/password only | `adopt_with_rewrite` | preserve panel rhythm, remove fake auth providers/support surfaces |
| `login_sign_up` | `/login` | Google / Apple login | fake capability | not supported | `remove_for_truth_mismatch` | remove entirely |
| `login_sign_up` | `/login` | support center / social-proof claims | fake scope and unsupported claims | current product does not support these surfaces/claims | `remove_for_truth_mismatch` | remove entirely |
| `landing` | `/` | calm premium hero and section rhythm | strong first-impression benefit | route purpose is public explanation + start | `adopt_with_rewrite` | preserve compositional warmth, replace marketing overstatement with truthful product framing |
| `landing` | `/` | “join thousands of parents” / broad social proof | unsupported claim | no evidence-backed basis in current product docs | `remove_for_truth_mismatch` | remove entirely |
| `landing` | `/` | editorial imagery-heavy sections | visually attractive but can over-market the product | current route must quickly explain actual loop | `adopt_with_rewrite` | reduce imagery and strengthen product loop explanation |
| `record_editor` | `/my/records/[id]` | calm shell + sticky action bar | visually useful | route is high-semantic-risk and already tightly coupled to record truth | `visual_only_reference` | borrow visual primitives only in 010; direct redesign deferred |
| `record_editor` | `/my/records/[id]` | reinterpreted rating semantics | changes meaning of existing model | current record/editor semantics already documented in prior features | `remove_for_truth_mismatch` | do not transplant semantics under 010 |
| `my_records_journal` | `/my/records` | softer revisit card language | partially useful visual inspiration | current route has stronger revisit/summarization truth than Stitch output | `visual_only_reference` | use only spacing/card cues later if needed |
| `my_records_journal` | `/my/records` | FAB create-new-record | suggests alternate loop entry | current loop starts from templates | `remove_for_truth_mismatch` | remove entirely |
| `settings_privacy` | `/my/settings` | warm settings shell | visually attractive | current settings scope is narrower than Stitch concept | `visual_only_reference` | direct route redesign deferred |
| `settings_privacy` | `/my/settings` | export/profile/edit/help/version surfaces | expands product/admin scope | not current product truth | `remove_for_truth_mismatch` | remove entirely |

## 4. Positive adoption primitives

These are the strongest Stitch traits that 010 should try to preserve deliberately:
- warm neutral palette with restrained primary accent
- generous spacing and soft rounded containers
- guidance blocks that reduce anxiety without over-explaining
- clear primary CTA hierarchy with quieter secondary actions
- premium-but-simple card rhythm
- calm loading and recovery states that still feel branded

## 5. Elements to tone down

These may be visually useful but should usually be reduced or rewritten:
- editorial photography dependence
- inspirational/wellness slogans
- oversized marketing-site section density
- abstract journey/magic/family-story language that obscures the actual workflow

## 6. Elements to remove by default

These should not survive 010 unless a separate product decision explicitly reopens them:
- social login
- share/bookmark actions
- support center/community/resources surfaces
- export/profile-edit/account-expansion actions not in current scope
- fake social proof
- fake privacy/security claims beyond current product truth
