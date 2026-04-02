# IBNote 014 UI/UX Completion Program Risk Analysis

Status: Active
Date: 2026-03-24

## 1. Main risks

| ID | Risk | Why it matters | Mitigation |
| --- | --- | --- | --- |
| R-01 | Endless polish drift | The epic could grow indefinitely without meaningful leverage. | Force each phase to be bounded, ranked, and validated before expanding. |
| R-02 | Cosmetic-only work | Visual tweaks alone may consume time without improving the parent workflow. | Prioritize issues that improve clarity, continuity, or completion quality in real use. |
| R-03 | Scope sprawl | A UI/UX completion program can accidentally become a whole-product redesign. | Keep per-phase exclusions explicit and write them into the active phase brief. |
| R-04 | Weak rollover discipline | Findings may be forgotten, causing the next phase to start from vague intuition again. | Require findings and next-phase brief updates in the 014 docpack before phase rollover. |
| R-05 | False completion claims | The product may feel improved in code review but not in real usage. | Keep validation claims narrow and honest, and verify the affected flows directly when possible. |
| R-06 | Warmth-over-clarity regression | Phase 3 could improve tonal continuity while degrading route identity, active state contrast, or primary action discoverability. | Add route-level acceptance gates that explicitly preserve shell contrast, route headings, and first-viewport CTA visibility. |
| R-07 | Dense-surface readability loss | Filters, rating controls, metric cards, and summary bars may become harder to scan if public-route warmth is copied too literally. | Allow stronger neutral/semantic contrast where operational scannability matters, and verify selected/error/data-heavy states separately from hero polish. |
| R-08 | Baseline overfitting | The public discovery routes are inspiration surfaces, not behavioral twins of the `/my` workflows. | Reuse only the public color/surface/CTA language, not public-route information architecture or decorative requirements. |
| R-09 | Header continuity break | Some core routes currently lack a top bar while others have one, so the product can still feel stitched together even after surface re-theming. | Make top-bar continuity an explicit Phase 3 scope item and verify that any fix does not create double-header crowding on locked routes. |
| R-10 | Asset-fit and provenance regression | Replacing placeholders with real imagery can introduce broken crops, unreadable overlays, or asset-source ambiguity that makes the routes look less trustworthy instead of more finished. | Keep Phase 4 asset scope bounded, require repo-present files before claiming completion, and verify desktop/mobile crop and text readability on the rendered routes. |

## 2. Current risk posture

No blocker is currently confirmed.

The main operational challenge for 014 is not technical feasibility.
It is maintaining disciplined phase boundaries while still allowing the epic to continue forward over time.

For Phase 4 specifically, the main danger shifts from shell warmth to image execution:
using real assets in a way that harms readability, crop stability, or confidence in the asset provenance.
