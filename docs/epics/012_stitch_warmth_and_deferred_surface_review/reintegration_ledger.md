# IBNote 012 Stitch Warmth and Deferred Surface Reintegration Ledger

Status: Draft
Source of truth: `docs/epics/012_stitch_warmth_and_deferred_surface_review/spec.md`

## 1. Purpose

This ledger records how 012 should treat each included route and each deferred carry-forward surface.

Its job is to make broad scope implementable without guesswork.

## 2. Decision categories

- `keep`
- `rewrite`
- `remove`
- `reintegrate`
- `partial_reintegrate`
- `still_reject`

## 3. Warmth polish surfaces

| Route | Current state after 010/011 | Warmth decision | What to keep | What to rewrite | What to avoid |
| --- | --- | --- | --- | --- | --- |
| `/` | practical and stable, slightly restrained | `rewrite` | visual rhythm, CTA clarity, loop explanation | allow slightly warmer headlines/section intros and softer reassurance language | campaign-like flourish, fake nav, fictional cards, social proof |
| `/login` | stable and truthful, slightly restrained | `rewrite` | two-panel structure, email/password-only auth, reset link | allow slightly warmer heading and intro reassurance while keeping auth guidance practical | social login, support surfaces, over-sentimental auth framing |
| `/templates` | calm and useful, slightly more practical than Stitch | `rewrite` | chooseability, guidance block, cluster grouping | increase warmth modestly in intro and guidance tone | fake shell, decorative chrome, catalog-like bloat |
| `/templates/[slug]` | strong structure, truth mostly preserved | `rewrite` | quick-decision layout, CTA clarity, activity-fit guidance | allow lighter warmth in headings and explanatory transitions | decorative fiction, image-heavy framing |
| record transition | good transitional honesty, calm shell | `rewrite` | indeterminate progress, calm transition, template continuity | allow slightly warmer microcopy only | slogans, decorative over-branding, fake progress claims |
| `/reset-password` | clear and stable | `keep` | current calm recovery clarity | only minor tone polish if needed | over-branding, softened error truth |

## 4. Deferred-route reintegration surfaces

| Route | Carry-forward value | Reintegration decision | Keep | Rewrite | Reject |
| --- | --- | --- | --- | --- | --- |
| `/my/records` | highest | `reintegrate` | revisit overview, continue vs reread framing, summary connection explanation, improved empty/reset handling | trim explanation density; keep it from becoming a mini-summary dashboard | anything that turns the page into summary replacement |
| `/my/records/[id]` | medium-high | `partial_reintegrate` | status headline/body, re-entry guidance, writing guide, unfinished-draft reassurance | keep semantics aligned with current record truth; avoid over-layering cards | any editor IA change that silently redefines record semantics |
| `/my/summary` | medium-low | `partial_reintegrate` | summary basis explanation, clearer empty/error recovery, modest summary-connection cues | reduce explanation density, avoid turning summary into a report/export surface | print/preservation-heavy expansion, overbuilt report framing |

## 5. Broad anti-drift rules

- preserve the current auth model
- preserve the current templates -> records -> summary loop
- do not add fake support/community/resources surfaces
- do not reintroduce social login or fake trust devices
- do not let warmth replace product explanation
- do not let deferred reintegration reopen rejected scope by stealth

## 6. Implementation priority order

1. `/my/records`
2. `/my/records/[id]`
3. `/my/summary`
4. broad warmth polish pass across stabilized routes

## 7. One-line summary

012 should reintegrate the deferred records-list work most aggressively, the record-editor work selectively, the summary work cautiously, and apply warmth increases across stabilized routes without weakening practical product truth.
