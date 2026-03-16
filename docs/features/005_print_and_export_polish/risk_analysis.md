# IBNote 005 Print and Export Polish Risk Analysis

Status: Closed - package complete through C-03
Source of truth: `docs/features/005_print_and_export_polish/prd.md`

## 1. Purpose

This document tracks the main risks of improving preservation/readability while keeping 005 intentionally narrow and low-risk.

## 2. Open risks and unresolved items

### R-01. 005 can drift into a larger export platform than intended
- Issue: small preservation improvements can easily expand into PDF generation, downloads, history, or sharing expectations.
- Impact: complexity rises quickly and the package stops being a low-risk follow-on.
- Default handling: keep capability boundaries explicit in PRD/spec/ADR and reject delivery/history/platform semantics.
- Human decision needed: none unless product strategy intentionally broadens.

### R-02. The package can become cosmetic polish with weak product payoff
- Issue: print/export polish can consume effort without materially improving preservation value.
- Impact: low strategic return and ambiguous done-state.
- Default handling: require before/after readability evidence, noise-reduction evidence, and revisit-value rationale.
- Human decision needed: none.

### R-03. Surface scope can sprawl across too many routes
- Issue: once preservation is discussed, many surfaces can appear "worth touching."
- Impact: implementation risk rises and verification becomes muddy.
- Default handling: force minimal surface selection and justify every touched route. Current default boundary is `/my/summary` first, `/my/records/[id]` only if clearly justified, and no default reopening of `/templates/[slug]`.
- Human decision needed: only if a larger preservation sweep is intentionally desired.

### R-04. Export-adjacent wording can overpromise capability
- Issue: labels like export/download/report can imply richer functionality than the app truly provides.
- Impact: user trust erodes and future scope pressure increases.
- Default handling: keep wording honest about browser-native print/save behavior and avoid delivery/platform language.
- Human decision needed: none.

### R-05. Preserved output can accidentally feel like assessment or official reporting
- Issue: cleaner print output may drift toward report-card or institutional-document tone.
- Impact: product identity weakens and educational modesty is lost.
- Default handling: keep preserved output calm, parent-facing, and non-diagnostic.
- Human decision needed: none unless product positioning changes.

### R-06. Print-specific cleanup can unintentionally harm live-screen usability
- Issue: preservation-focused markup/style changes can break or clutter the normal interactive screen.
- Impact: a low-risk package creates avoidable regressions on core routes.
- Default handling: verify both live runtime behavior and print-emulated output for touched surfaces.
- Human decision needed: none.

## 3. Threats and failure modes to test explicitly

### T-01. Printed output still looks like a broken screen capture
- Mitigation: require hierarchy and noise-reduction review in print mode.

### T-02. Action labels imply richer export capability than exists
- Mitigation: review touched wording against the browser-native honesty rule.

### T-03. Summary preservation drifts into evaluative or official-report language
- Mitigation: explicitly recheck modesty and non-diagnostic wording on summary output.

### T-04. A preservation fix silently regresses live route usability
- Mitigation: pair print checks with minimal runtime smoke on touched surfaces.

## 4. Human review checklist

Before package sign-off or closeout, a human should review:
1. whether the chosen surfaces are truly the smallest high-leverage preservation set
2. whether printed/saved output is materially easier to reread later
3. whether action wording stays honest about current capability
4. whether any output drifted toward report-card, official-document, or evaluative framing
5. whether the package stayed narrow and low-risk
6. whether evidence quality is explicit enough to justify sign-off

## 4.1 Closeout disposition for 2026-03-15

Current disposition:
- `/my/summary` remained the only touched 005 surface through package closeout. `/my/records/[id]` stayed deferred because the same small preservation/readability pass was not required to justify reopening the editor surface.
- `R-01`, `R-03`, and `R-04` closed acceptably: the final implementation stayed inside browser-native print/save wording, added no delivery/history/platform semantics, and did not reopen `/templates/[slug]` or `/my/records/[id]`.
- `R-02` closed acceptably with concrete implementation evidence on `/my/summary`: dedicated print structure, print-hidden noise reduction, calmer hierarchy, and preservation framing all landed without widening scope.
- `R-05` closed acceptably: the touched summary copy still explicitly avoids recommendation/diagnosis framing, and the preservation language remains parent-facing and reread-oriented rather than official or evaluative.
- `R-06` was revalidated and resolved: the earlier listener blocker proved stale, a raw Node listener bind succeeded on `127.0.0.1:3301`, `npm run start -- --hostname 127.0.0.1 --port 3301` booted successfully, and the protected-flow Playwright smoke script completed successfully against `BASE_URL=http://127.0.0.1:3301` with the canonical QA account.
- Repo-health evidence captured during closeout: `npm run lint` passed, `npm run typecheck` passed, and `npm run build` passed.
- Final disposition: 005 is truthfully complete through `C-03` and ready for human acknowledgment/sign-off rather than further autonomous implementation.

## 5. Exit condition for this document

An item can move out of this file only when:
- runtime or implementation evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off or closeout
