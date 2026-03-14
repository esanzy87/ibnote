# IBNote 003 Learning Experience Foundation Risk Analysis

Status: Signed off for implementation start; open risks remain tracked here
Source of truth: `docs/features/003_learning_experience_foundation/prd.md`

## 1. Purpose

This document tracks the main risks of a package that aims to improve experience quality without drifting into fuzzy or unbounded work.

## 2. Open risks and unresolved items

### R-01. 003 can degrade into a vague polish bucket

- Issue: the package can turn into many small tweaks with weak overall leverage.
- Impact: lots of changes, little felt improvement, weak closeout.
- Default handling: tie every significant task to Flow A, B, or C and reject changes that do not improve understanding, continuity, friction, or revisit value.
- Human decision needed: none unless the package loses a coherent story.

### R-02. Flow improvements can become too subjective

- Issue: people may disagree whether the package actually improved the product.
- Impact: done-state becomes fuzzy and hard to sign off.
- Default handling: require before/after evidence and explicit anchor-flow rationale.
- Human decision needed: yes, at final sign-off.

### R-03. Scope can drift into new product capabilities

- Issue: attempts to improve usefulness may accidentally add AI, lifecycle, or platform features.
- Impact: package becomes larger, riskier, and slower.
- Default handling: explicit scope audit before closeout, with special scrutiny on Flow C so summary/revisit improvements do not drift into intelligence, recommendation, or pseudo-evaluative capability.
- Human decision needed: only if scope expansion is intentionally requested.

### R-04. Summary improvements can overclaim educational meaning

- Issue: making summaries feel more useful may lead to evaluative or inflated language.
- Impact: product truth and trust posture weaken.
- Default handling: keep summaries helpful and modest; avoid interpretation that implies intelligence or diagnosis beyond current truth.
- Human decision needed: none unless product positioning changes.

### R-05. Cross-flow continuity work can spread too broadly

- Issue: if continuity is interpreted too broadly, almost every screen can become fair game.
- Impact: package size and verification costs rise sharply.
- Default handling: keep scope anchored to the listed routes and the three anchor flows, and explicitly limit implementation to the top 1-2 leverage points per flow before any final continuity cleanup pass.
- Human decision needed: none unless boundary pressure becomes persistent.

## 3. Threats and failure modes to test explicitly

### T-01. Template changes improve wording but not actual choice clarity
- Mitigation: require explicit explanation of how Flow A improved.

### T-02. Record-writing changes add more UI but not less hesitation
- Mitigation: bias toward simpler, more supportive guidance.

### T-03. Summary changes feel smarter but become less truthful
- Mitigation: preserve modest language and avoid pseudo-intelligence framing.

### T-04. Package produces disconnected micro-fixes instead of one stronger journey
- Mitigation: include a cross-flow continuity pass and before/after journey review.

## 4. Human review checklist

Before package closeout, a human should review:
1. whether Flow A feels easier and less abstract
2. whether Flow B feels less intimidating and more guided
3. whether Flow C feels more connected and more worth revisiting
4. whether the overall product journey feels more coherent
5. whether any change drifted into new capability rather than stronger experience
6. whether evidence quality is explicit enough to justify sign-off

## 4.1 Sign-off record for 2026-03-14

Recorded human sign-off truth:
- `003_learning_experience_foundation sign-off ok.`
- This package remains anchored to Flow A (template discovery -> selection), Flow B (record start -> writing), and Flow C (record revisit -> summary reading).
- Account lifecycle, provider expansion, AI/recommendation capability, admin/payment expansion, and major backend/platform redesign remain out of scope for 003.
- Implementation may proceed on this basis.

## 5. Exit condition for this document

An item can move out of this file only when:
- runtime evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off
