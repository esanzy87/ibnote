# IBNote 013 Records Surface Stitch Polish Spec

Version: 0.1
Date: 2026-03-17
Owner: agent-authored docpack
Status: Locked for implementation
Depends on:
- `012_stitch_warmth_and_deferred_surface_review`

## 1. Implementation intent

013 is a narrow records-surface follow-on package.
It exists because 012 improved structure and warmth on the records routes, but did not yet complete the visibly recognizable Stitch-style translation in real use.

The implementation goal is not to redesign behavior.
The goal is to make the existing behavior on `/my/records` and `/my/records/[id]` feel visually consistent with the newer product direction.

## 2. Phase A findings locked for implementation

### A-01 Live surface inspection summary

Current `/my/records` truth:
- the route already has decent information architecture, useful revisit framing, and clear state handling
- however, the page still reads primarily as a clean utility dashboard rather than a clearly Stitch-aligned product surface
- the hero/filter/revisit blocks use similar neutral card treatments, so the page lacks one clearly leading visual layer
- the cards are structurally good but the overall page impression is still closer to "organized admin surface" than "warm guided family-learning surface"

Current `/my/records/[id]` truth:
- the route already has better calmness and re-entry guidance than older versions
- however, the page still feels like a stack of well-structured forms rather than a visibly translated Stitch surface
- multiple sections use nearly identical neutral containers, so the route lacks stronger hierarchy between orientation, writing, checklist, rating, and action zones
- the top experience is serviceable but does not yet create a clearly recognizable designed entry moment

### A-02 Missing visible design layer versus 012

What 012 successfully delivered:
- calmer copy and safer bounded reintegration
- improved re-entry/revisit guidance
- cleaner route-level structure on records surfaces

What 012 did not fully deliver on these routes:
- a strong top-level visual hierarchy that clearly distinguishes hero/orientation zones from working-form zones
- a visibly recognizable Stitch-style shell treatment for records surfaces in real use
- enough contrast between "warm guidance / orientation" sections and "editing / filtering / action" sections
- a bounded but intentional app-shell/navigation truth on non-landing routes, making the records pages feel somewhat isolated rather than fully part of the redesigned product

Implementation implication:
- 013 should prioritize visible hierarchy and shell coherence first
- density tuning should happen only after the missing visible layer is restored

### A-03 Bounded non-landing app-shell correction target

Current drift:
- non-landing routes currently render without a strong shared app-shell/header/navigation truth
- this makes the redesigned records routes feel visually detached from the rest of the product rather than intentionally embedded inside one coherent system

Bounded correction target:
- add or restore a light shared non-landing shell/header/navigation treatment that is clearly present but does not dominate the page
- the shell should support orientation and route coherence, not become a new feature project
- the shell must remain bounded: no auth-flow redesign, no new IA expansion, no landing-page behavior reuse, and no platform-level navigation growth

## 3. In-scope implementation target

### 3.1 `/my/records`
Implement a visibly stronger top hierarchy by:
- making the top orientation/filter region feel like a designed entry surface rather than just another white card
- increasing contrast between the overview/orientation layer and the list-of-records layer
- strengthening card hierarchy so record cards feel intentionally branded rather than generically neat
- reducing density only after the hierarchy gap is solved

### 3.2 `/my/records/[id]`
Implement a visibly stronger editing hierarchy by:
- making the top summary/orientation area feel like a real entry moment
- separating warm guidance/orientation from operational form sections more clearly
- preserving current helpful guidance while reducing the sense of stacked equal-weight boxes
- keeping the save/submit zone clear and calm rather than heavier

### 3.3 Shared non-landing shell
Implement only the smallest shell adjustment needed to:
- make the records routes visibly belong to the redesigned product
- provide bounded orientation/navigation truth
- avoid reopening unrelated routes or broad global redesign work

## 4. Explicit exclusions

013 must not introduce:
- summary-surface redesign
- landing/login/templates/detail/reset changes
- auth logic changes
- record model or mutation semantics changes
- new recommendation, archive, export, print, or dashboard capabilities
- large cross-app shell expansion beyond the minimal non-landing coherence fix

## 5. Verification expectations

013 should be considered implementation-ready only if the worker can execute without guessing the following truths:
- the main gap is visible design translation, not behavior correction
- app-shell work is allowed only as a bounded non-landing coherence fix
- `/my/records` and `/my/records/[id]` are the only intended primary routes
- density cleanup is secondary to visible hierarchy restoration

Implementation closeout should verify:
- both routes visibly feel more Stitch-aligned in side-by-side review
- the non-landing shell no longer feels accidentally missing
- product truth and route behavior remain unchanged
