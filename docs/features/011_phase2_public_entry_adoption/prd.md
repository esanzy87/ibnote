# IBNote 011 Phase-2 Public Entry Adoption PRD

Version: 0.2
Date: 2026-03-16
Owner: unattended agent
Status: Hardened - ready for implementation planning
Depends on: `010_stitch_ui_adoption_foundation`

## 1. Purpose

This package defines the next bounded phase after 010 phase-1.
Its purpose is to adapt the remaining lower-risk public entry surfaces inspired by Stitch while keeping IBNote truthful, calm, and non-institutional.

The target of 011 is intentionally narrow:
- `/`
- `/login`

This package exists because 010 phase-1 established a viable Stitch-derived visual baseline on core template and recovery routes, but deliberately held public entry surfaces back until the team could review phase-1 results first.

## 2. One-line definition

`011_phase2_public_entry_adoption` adapts the landing and login entry surfaces to the new Stitch-derived visual baseline without expanding auth scope, marketing claims, or product surface area.

## 3. Why this package exists

After 010 phase-1, the product now has a stronger visual baseline on key protected routes.
The next logical step is to align the public-facing entry surfaces so the first impression and authentication entry point no longer feel disconnected from the rest of the product.

This package should improve:
- first impression coherence
- trust at entry
- clarity of what IBNote does
- consistency between public entry and protected product experience

This package must not turn IBNote into a marketing-heavy or lifestyle-brand landing experience.

## 4. Why this is leverage, not cosmetic-only polish

011 is not just a landing-page beautification task.
It matters because public-entry routes set user expectations before the product loop begins.
If those routes feel visually or conceptually disconnected from the protected product, the product feels less coherent and less trustworthy.

The leverage of 011 is:
- stronger first-touch trust
- clearer explanation of the real product loop
- smoother transition from landing -> login -> templates
- tighter coherence with the 010 baseline already adopted on protected routes

011 should be considered failed if it only produces nicer screenshots while introducing fake marketing/auth surface area or obscuring the real product flow.

## 5. Scope

### 5.1 In scope
- `/`
- `/login`
- copy, hierarchy, layout, componentization, and visual treatment required to align those routes with the 010 baseline

### 5.2 Out of scope
- social login
- support center / community / resources surfaces
- fake testimonials or social proof
- new auth providers
- new marketing claims unsupported by actual product truth
- expansion into deferred revisit/settings surfaces

## 6. User value

### Landing page
The parent should quickly understand:
- what IBNote is
- what the product loop is
- how to start
- why it feels calm and manageable

### Login page
The parent should feel:
- less friction entering the product
- more confidence about what happens next after login
- no confusion about unsupported auth paths

## 7. Goals

1. Bring landing and login into visual alignment with the 010 baseline.
2. Keep public-entry copy more practical than poetic.
3. Preserve product truth and avoid fake surface expansion.
4. Improve perceived quality without turning these routes into overbuilt marketing screens.

## 8. Non-goals

1. No social login.
2. No support/help-center/product-surface expansion.
3. No fake trust devices such as usage counters or testimonials.
4. No hidden auth model change.
5. No broad rewrite of global app chrome beyond what these routes require.

## 9. Relationship to 010

011 should inherit the Stitch-derived visual primitives validated in 010 phase-1:
- warm neutral palette
- soft rounded containers
- calmer spacing
- gentle guidance blocks
- clearer CTA hierarchy

011 must also inherit 010 anti-drift rules:
- product truth over Stitch completeness
- remove fake features rather than placeholdering them
- prefer subtraction over invention when a design element implies unsupported scope

## 10. Parent-value framing

### `/`
Desired parent gain:
- immediately understand what this product is for
- feel that starting is simple and low-pressure
- trust that the product is practical, not school-like or overcomplicated

### `/login`
Desired parent gain:
- enter the product without auth confusion
- understand where they go after login
- feel reassured without being sold extra product surface

## 11. Candidate route assessment

### `/`
Adoption mode hypothesis: `adopt_with_rewrite`

Likely keep:
- calmer hero structure
- sections that explain the product loop clearly
- warm first impression

Must remove/rewrite:
- fake social proof
- generic lifestyle-marketing flourish
- unsupported community/help/privacy claims beyond current scope
- over-editorial imagery dependence

### `/login`
Adoption mode hypothesis: `adopt_with_rewrite`

Likely keep:
- two-panel or structured auth presentation
- calmer form styling
- reassurance around what happens after login

Must remove/rewrite:
- Google/Apple social login
- support-center surfaces
- fake usage counters / social proof
- any auth implication beyond email/password truth

## 12. Positive adoption thesis

011 should preserve these gains from the Stitch concepts:
- a warmer and more premium first impression
- clearer split between explanation and action
- stronger CTA hierarchy
- more reassuring auth entry structure
- calmer visual continuity with phase-1 routes

011 should tone down or remove:
- over-editorial photography
- lifestyle-brand language
- fake credibility cues
- unsupported navigation and footer clutter

## 13. Success criteria

011 is successful only if:
1. `/` and `/login` feel visually coherent with 010 phase-1 routes
2. no fake auth or marketing capabilities appear
3. first impression is clearer and calmer than before
4. login route preserves the real auth model faithfully
5. the public entry experience better matches the product the user actually sees after entering

## 14. Recommended posture

Recommended next move:
- plan 011 as a focused phase-2 package
- keep it independent from deferred revisit/settings work
- require the same scope discipline used in 010
