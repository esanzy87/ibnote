# IBNote 010 Stitch UI Adoption Foundation PRD

Version: 0.2
Date: 2026-03-16
Owner: unattended agent
Primary use: next-feature continuity package for documented implementation
Status: Hardened - ready for implementation planning

## 1. Document purpose

This PRD defines a feature package for adopting Stitch-generated screen design direction as the new UI baseline for IBNote while preserving current product truth.

This package exists because the current UI has enough product coverage to validate the core parent loop, but the visual and interaction layer is now lagging behind the intended product shape. Stitch outputs provide a strong starting point for a warmer, calmer, more premium interface, but they also introduce product-surface drift, fake capabilities, and semantics that do not fully match IBNote's current model.

The package must therefore treat Stitch as a **design baseline to adapt**, not a product source of truth to copy blindly.

## 2. Package definition

### 2.1 One-line package definition
`010_stitch_ui_adoption_foundation` adopts Stitch as the visual starting point for a new IBNote UI baseline while explicitly preserving existing product truth, limiting placeholder spread, and documenting design-product mismatches.

### 2.2 Baseline truth inherited from earlier packages
- `000` through `009` remain inherited baseline truth.
- `003_learning_experience_foundation` remains the core templates -> records -> summary loop baseline.
- `008_parent_revisit_continuity_foundation` and `009_record_revisit_entry_context_pack` remain the most recent revisit/continuity baseline.
- Existing route behavior, auth behavior, record model, summary model, and settings scope remain product truth unless this package explicitly documents a safe surface-level adaptation.

### 2.3 Package thesis
IBNote should now establish a stronger design system and visual baseline, but it should do so without accidentally redefining the product into a lifestyle marketing app, journaling brand, or broader platform. The right move is not "copy Stitch screens into production"; it is "use Stitch to accelerate a disciplined UI foundation refresh."

## 3. Why this package exists now

### 3.1 Sequencing reason
`AMBITION.md` says strong near-term work should improve the usability and clarity of the parent loop while preserving the product's calm, human, non-institutional shape. A new UI baseline can improve perceived quality and lower activation friction, but only if it stays subordinate to product truth.

### 3.2 Product risk being addressed
Without this package:
- the current product may remain functionally credible but visually underpowered
- screen-to-screen polish may continue to accumulate unevenly
- unattended work may keep selecting narrow functional polish while delaying a needed visual-system reset
- Stitch outputs may be used informally and inconsistently instead of being brought under controlled product rules

### 3.3 Expected product impact
This package should improve:
- design coherence across core routes
- perceived warmth, calm, and usability of the parent workflow
- trust in the product's visual quality
- implementation leverage for later features by establishing a reusable UI language

This package must not implicitly expand product scope.

## 4. Why this is leverage, not cosmetic-only polish

This package is not being opened merely because the screens look nicer.
It is being opened because the current visual baseline under-expresses the actual product promise.

The intended leverage is:
- **activation leverage**: calmer, clearer first impressions should reduce hesitation at key start and recovery moments
- **trust leverage**: a stronger and more coherent UI should make the product feel more intentional and credible
- **implementation leverage**: later feature work becomes cheaper when the product has a reusable visual system instead of route-by-route stylistic drift
- **positioning leverage**: a warmer, less institutional interface can better communicate the product's intended identity as a calm parent reflection companion

The package should be rejected as failed if it only makes screenshots prettier while leaving product clarity unchanged or product truth weaker.

## 5. Goals and non-goals

### 5.1 Goals
This package must:
1. Establish Stitch-derived visual direction as the new UI starting point for IBNote.
2. Preserve existing product truth on route behavior, available actions, and information architecture unless explicitly justified.
3. Define which Stitch screens can be adopted mostly as-is, which require adaptation, and which are visual reference only.
4. Prevent fake features and product-surface drift from entering production under the label of design adoption.
5. Produce a hardened implementation path that coding agents can follow without guessing what to keep, rewrite, or remove.

### 5.2 Non-goals
This package must not:
- silently add new product capabilities because a Stitch screen visually contains them
- add social login, sharing, bookmarking, export, profile editing, support-center surfaces, community surfaces, or other new product scope unless separately approved later
- redefine the record model, summary model, auth model, or settings scope
- turn IBNote into a lifestyle marketing app, journaling app, or platform-heavy product
- treat placeholder UI as an excuse to leave product-truth violations undocumented

## 6. Candidate package shortlist and recommendation

Required shortlist considered for 010:
1. **Controlled Stitch UI adoption foundation** (recommended)
2. Pure design-system extraction without route adoption
3. Full-screen Stitch clone implementation with later cleanup
4. Narrow single-route redesign only

Why #1 wins now:
- captures the current momentum and user conviction around Stitch as a starting point
- preserves product truth more safely than a direct clone strategy
- creates reusable UI leverage beyond one route
- is more concrete and implementation-ready than a purely abstract design-system exercise

Why others lose now:
- #2 is safer but may fail to convert enthusiasm into a meaningful product shift
- #3 is fastest on paper but has the highest drift risk, placeholder debt risk, and semantic breakage risk
- #4 is too narrow given the desire to use Stitch as the new starting point for the product baseline

## 7. In-scope and out-of-scope

### 7.1 In-scope
- adopting a Stitch-derived UI baseline across selected existing IBNote routes
- route-by-route classification of adoption strategy: mostly-as-is, adapt-to-truth, or reference-only
- use of disabled/placeholder treatment only for existing product actions that are temporarily not yet wired in implementation
- explicit mismatch documentation between Stitch artifacts and current IBNote truth
- a phased rollout strategy that prevents broad uncontrolled surface drift

### 7.2 Likely anchor surfaces
Initial candidate surfaces from the Stitch set:
1. `/templates/[slug]`
2. record creation transition surface
3. `/templates`
4. `/reset-password`
5. `/login`
6. `/`
7. `/my/records/[id]`
8. `/my/records`
9. `/my/settings`

### 7.3 Out-of-scope
- backend changes to support newly invented actions from Stitch screens
- adding new auth providers
- adding social/community/help-center/export systems
- changing the product's route map solely to mirror Stitch outputs
- introducing new data concepts not already present in IBNote's current model

## 8. User story focus

Primary user story:
- As a parent using IBNote, I want the product to feel calm, warm, and polished while still making honest sense, so I trust the experience more without getting confused by fake or mismatched features.

Supporting user stories:
- As a parent choosing an activity, I want a cleaner and more reassuring interface that still helps me pick one activity quickly.
- As a parent opening a record or summary surface, I want the design to feel intentional without losing the actual meaning of the page.
- As a product/operator, I want Stitch outputs to accelerate UI improvement without accidentally redefining the product scope.

## 9. Parent-value framing for phase-1 surfaces

### `/templates/[slug]`
Desired parent gain:
- faster judgment about whether this activity fits the current moment
- calmer confidence about starting

### record creation transition
Desired parent gain:
- less uncertainty during the gap between choosing and writing
- stronger feeling that the next step is lightweight and manageable

### `/templates`
Desired parent gain:
- lower pressure when choosing what to do today
- easier scanning and simpler "pick one" behavior

### `/reset-password`
Desired parent gain:
- less panic during account recovery
- clearer trust that the product can recover gracefully from a problem

## 10. Ambition alignment

This package is recommended because it most clearly strengthens:
- **5.1 Lower the starting barrier** through calmer and more inviting UI
- **5.4 Keep the product human and non-institutional** through a warmer visual language
- secondarily **5.3 Make revisit genuinely useful** if the adopted UI improves clarity on revisit surfaces

Anti-drift check:
- must not turn visual uplift into product-surface expansion
- must not replace humble product behavior with editorial/lifestyle signaling
- must not add institutional or platform-heavy behavior under the guise of design polish

## 11. Positive adoption thesis

010 must preserve the strongest Stitch gains deliberately, not just defend against its weaknesses.

### 11.1 What must survive from Stitch
- warm neutral palette with restrained primary accent
- generous spacing and soft rounded surfaces
- guidance blocks that reduce anxiety without becoming verbose
- clearer primary-vs-secondary CTA hierarchy
- premium-but-simple composition that feels calmer than the current baseline
- loading and recovery states that still feel intentional and branded

### 11.2 What must be toned down
- editorial photography dependence
- lifestyle/wellness language that obscures the actual product loop
- section density that makes routes feel like marketing pages
- decorative product-surface expansion not tied to the current parent workflow

## 12. Core operating principle

The package must follow this rule:

> Stitch is a visual reference baseline, not a source of product truth.

Any Stitch element falls into one of four buckets:
1. **Adopt as-is** — matches current IBNote truth closely enough
2. **Adopt with rewrite** — visual form is useful but copy/IA/action semantics must change
3. **Visual-only reference** — useful for style but not for direct product implementation
4. **Reject for now** — introduces fake capability or product-direction drift

## 13. Early screen classification hypothesis

### 13.1 Strong early candidates
These appear most likely to adopt cleanly with limited truth risk:
- `template_detail`
- `record_creation_transition`
- `template_library`
- `password_reset`

### 13.2 Medium-risk adaptation candidates
These may be adopted only with stronger copy/feature trimming:
- `landing`
- `login_sign_up`

### 13.3 High-risk candidates
These should not be copied directly and require stronger product-truth filtering:
- `record_editor`
- `my_records_journal`
- `settings_privacy`

## 14. Placeholder policy

Allowed placeholder usage:
- disabled state for an existing product action that already belongs in IBNote but is not yet wired during the staged redesign
- small static placeholder area where the product truth is still preserved and the UI does not imply false capability

Disallowed placeholder usage:
- fake social login
- fake share/bookmark/export/profile/help/community actions
- fake navigation destinations that imply a broader product than IBNote currently is
- dummy UI that changes user expectations about scope without explicit documentation and sign-off

## 15. Go / no-go phase expansion rule

Phase-2 should open only if phase-1 demonstrates all of the following:
1. real visual uplift is evident on the implemented routes
2. zero disallowed fake features remain on touched routes
3. the current core product flow still reads honestly and works cleanly
4. adopted visual primitives are reusable across multiple screens
5. implementation did not create new product-scope confusion

If these conditions are not met, remaining routes should be deferred rather than pulled forward for consistency alone.

## 16. Definition of done

This package is done only when all are true:
1. a documented Stitch adoption strategy exists by route and by risk level
2. the feature pack defines which screens are phase-1 adoption targets
3. mismatch categories are explicitly documented and constrained
4. placeholder policy is narrow, explicit, and enforcement-ready
5. implementation can begin without confusion about what is visual inspiration vs product truth

## 17. Guardrails for implementation

1. Preserve product truth before preserving Stitch completeness.
2. Prefer a phased rollout over a broad simultaneous transplant.
3. Remove fake features instead of leaving them in place by default.
4. If a screen is beautiful but semantically misleading, adapt or defer it.
5. If a visual element suggests a new capability, require a separate product decision before implementation.
6. Use Stitch to accelerate coherence, not to invent scope.
