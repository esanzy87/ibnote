# IBNote 010 Stitch UI Adoption Foundation Spec

Status: Hardened - ready for implementation planning
Source of truth: `docs/epics/010_stitch_ui_adoption_foundation/prd.md`
Companions:
- `docs/epics/010_stitch_ui_adoption_foundation/mismatch_ledger.md`

## 1. Purpose

This spec turns the 010 PRD into an execution-safe plan for adopting Stitch-derived UI direction without allowing product-truth drift, fake capabilities, or uncontrolled placeholder spread.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `009` remain inherited baseline truth.
- 010 improves visual language, route presentation, and design coherence, not product capability breadth.
- Every meaningful change must be justifiable as one of: clearer parent orientation, warmer/calm visual tone, lower interaction friction, or stronger product coherence.
- 010 must preserve the current product loop: templates -> records -> summary.
- Stitch artifacts are references, not implementation truth.

### 2.2 Core review questions
- Does this change improve UI quality without changing the actual product promise?
- Does it preserve the calm, human, non-institutional tone described in `AMBITION.md`?
- Does it remove or constrain fake capabilities rather than smuggling them in?
- Does it help a parent do the existing product job more clearly?
- Is the design gain worth the implementation surface it touches?

## 3. Route classification framework

Every Stitch-derived route adaptation must be classified into one of these modes:

### 3.1 Mode A — adopt mostly as-is
Use when the Stitch screen is already close to current IBNote truth.
Allowed changes:
- localized copy rewrite
- minor component mapping
- visual cleanup for implementation constraints

### 3.2 Mode B — adopt with truth-preserving adaptation
Use when the visual direction is strong but product semantics, actions, or copy must change.
Required changes:
- remove fake actions
- rewrite misleading labels or navigation
- preserve current route truth and actual actions

### 3.3 Mode C — visual-only reference
Use when the screen is valuable for color/spacing/card/action language but not for direct structure adoption.

### 3.4 Mode D — reject for this package
Use when the screen would create too much product drift, surface sprawl, or semantic confusion for 010.

## 4. Initial route lock hypothesis

### 4.1 Proposed phase-1 routes
Current locked phase-1 implementation targets:
- `/templates/[slug]`
- record creation transition surface
- `/templates`
- `/reset-password`

### 4.2 Proposed phase-2 routes
Only after phase-1 settles:
- `/`
- `/login`

### 4.3 Deferred/high-risk routes
Do not implement directly in phase 1:
- `/my/records/[id]`
- `/my/records`
- `/my/settings`

Justification:
- these routes carry the highest semantic mismatch risk between Stitch outputs and current IBNote truth
- they are more likely to introduce fake scope or misleading product semantics if copied too directly

## 5. Design primitives to preserve

These are the strongest Stitch-derived design traits that phase implementation should preserve deliberately:
- warm neutral base with restrained primary accent
- generous spacing and soft rounded containers
- premium-but-simple card rhythm
- calm guidance blocks that reduce uncertainty
- clear CTA hierarchy with quieter secondary actions
- softer loading/recovery states that still feel intentional

## 6. Design primitives to tone down or remove

### 6.1 Tone down
- heavy editorial photography dependence
- oversized lifestyle/brand copy blocks
- section density that makes utility routes feel like marketing pages
- decorative motion or surface noise that reduces chooseability

### 6.2 Remove by default
- social login
- share/bookmark affordances
- support center/community/resources links
- export/profile-edit/admin-expansion actions
- fake social proof
- unsupported security/privacy claims

## 7. Shared implementation rules

### 7.1 Product-truth rules
- route behavior must remain honest
- existing capabilities must not be visually expanded into new implied capabilities
- if an action exists visually, it must be one of: implemented, intentionally disabled-but-real, or removed
- avoid navigation links that point to non-existent product areas unless explicitly documented as temporary and non-user-facing in implementation branches

### 7.2 Placeholder rules
Allowed:
- disabled button for an existing real action pending wiring
- non-interactive decorative or informational region that does not imply a false workflow

Disallowed:
- social login buttons
- share/bookmark/export/profile/help/community placeholders
- fake counts, fake user testimonials, fake product-scope claims
- CTA labels that imply unavailable workflow branches

### 7.3 Copy rules
- prefer Korean product-facing copy in implementation-ready work
- reduce editorial and inspirational copy that obscures the product job
- avoid wellness-app slogans, institutional terms, and school/report-card semantics
- avoid false social proof and unsupported privacy/security claims

### 7.4 Visual rules
- preserve Stitch strengths: warmth, spacing, rounded surfaces, calm guidance blocks, premium simplicity
- reduce unnecessary imagery when it weakens chooseability or product clarity
- prefer reusable visual primitives over one-off decorative sections

## 8. Route-by-route implementation matrix

| Route | Stitch source | Mode | Parent-facing gain | Must remove / rewrite | File anchors | QA focus |
| --- | --- | --- | --- | --- | --- | --- |
| `/templates/[slug]` | `template_detail` | B | faster fit judgment, calmer start confidence | remove share/bookmark; align section labels and copy to current template truth | `src/app/templates/[slug]/page.tsx`, `src/components/templates/protected-template-detail.tsx` | CTA honesty, print/start behavior, section truth |
| record creation transition | `record_creation_transition` | A/B | less uncertainty between choosing and writing | replace fake progress percentage with truthful indeterminate progress | `src/components/records/create-record-transition.tsx`, related route entry | loading/error honesty, orientation continuity |
| `/templates` | `template_library` | B | lower pressure when choosing what to do today | map chips/taxonomy to real filters; remove fake/community surfaces; tone down imagery dependence | `src/app/templates/page.tsx`, `src/components/templates/template-library-client.tsx` | chooseability, filter truth, card scan quality |
| `/reset-password` | `password_reset` | A | calmer recovery and clearer trust | keep security copy modest and truthful; no overclaiming | `src/app/reset-password/page.tsx`, `src/components/ui/password-reset-request-form.tsx` | recovery clarity, state readability |
| `/` | `ibnote_landing_page` | B (phase 2) | clearer first impression and calmer invitation to start | remove fake social proof; reduce marketing overstatement; keep actual product loop legible | `src/app/page.tsx` | truthful product framing |
| `/login` | `login_sign_up` | B (phase 2) | more reassuring entry into auth flow | remove social login, support-center, fake social proof | `src/app/login/page.tsx`, `src/components/ui/login-form.tsx` | auth truth, next-step clarity |
| `/my/records/[id]` | `record_editor` | C (deferred) | visual inspiration only in 010 | do not transplant semantic reinterpretations of record fields or ratings | `src/app/my/records/[id]/page.tsx`, `src/components/records/record-editor.tsx` | defer direct route redesign |
| `/my/records` | `my_records_journal` | C (deferred) | possible future card/spacing cues only | remove FAB loop change, journaling drift | `src/app/my/records/page.tsx`, `src/components/records/records-list-client.tsx` | defer direct route redesign |
| `/my/settings` | `settings_privacy` | C (deferred) | warm-shell inspiration only | remove export/profile/help/admin-expansion surfaces | `src/app/my/settings/page.tsx`, `src/components/settings/settings-page-client.tsx` | defer direct route redesign |

## 9. Phase expansion gate

### 9.1 Phase-1 success conditions
Phase-1 is considered successful only if all are true:
1. all four phase-1 routes show real visual uplift
2. zero disallowed fake features remain on touched routes
3. parent-facing copy is localized truthfully and does not drift into unsupported brand claims
4. core product actions on touched routes remain honest and functional
5. reusable visual primitives are visibly established across multiple phase-1 routes

### 9.2 Phase-2 go / no-go rule
Open phase-2 (`/` and `/login`) only if phase-1 success conditions are met.
If phase-1 introduces product-truth confusion, placeholder debt, or route instability, phase-2 must remain closed until those issues are resolved.

## 10. Mismatch ledger requirement

Before implementation work claims phase-A closeout, 010 must maintain `mismatch_ledger.md` with at least these categories:
- adopted as-is
- adopted with rewrite
- visual-only reference
- removed for truth mismatch
- deferred for later feature decision

Minimum ledger dimensions:
- route/screen
- specific element
- mismatch type
- action taken
- justification

## 11. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Product truth preserved | no adopted route implies capabilities IBNote does not actually provide | route audit |
| VR-02 | Visual uplift is real | touched routes show coherent, noticeable design improvement | before/after review note |
| VR-03 | Placeholder policy holds | no disallowed placeholder or fake feature remains on touched routes | placeholder audit |
| VR-04 | Scope control holds | touched route count and change scope match the package phase plan | scope audit |
| VR-05 | Runtime/repo safety | touched routes render and core flows remain functional | runtime smoke + command outputs |

## 12. Task plan

1. freeze 010 scope, adoption thesis, and anti-drift boundaries
2. classify each Stitch screen into Mode A/B/C/D with route-specific notes
3. define the mismatch ledger and placeholder policy in implementation-ready detail
4. lock phase-1 route set and success criteria
5. prepare implementation sequencing and verification plan
6. only then begin route implementation

## 13. Acceptance checklist

A 010 implementation plan should not be considered hardened unless all are yes:
1. Is it clear which Stitch screens are safe to implement first?
2. Is it clear which elements must be removed or rewritten?
3. Does the package explicitly prevent fake features from shipping?
4. Does the plan preserve the current IBNote loop and route truth?
5. Is there a documented phased rollout instead of a blanket transplant?
6. Could an implementer execute the plan without guessing what to keep versus trim?
