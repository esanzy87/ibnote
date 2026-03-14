# IBNote 004 Everyday Activity Pack Foundation Risk Analysis

Status: Signed off for implementation start; open risks remain tracked here
Source of truth: `docs/features/004_everyday_activity_pack_foundation/prd.md`

## 1. Purpose

This document tracks the main risks of expanding the activity pack while preserving home-natural usability and product coherence.

## 2. Open risks and unresolved items

### R-01. 004 can become a template-count project with weak product leverage

- Issue: the package may optimize for “more templates” rather than better activity coverage.
- Impact: larger library, weak felt value, and poor strategic payoff.
- Default handling: require cluster rationale and quality-bar fit for meaningful additions.
- Human decision needed: none unless the package loses strategic coherence.

### R-02. Pack expansion can accidentally schoolize the product

- Issue: activity packs may drift toward Unit-of-Inquiry structure, assignment framing, or teacher-led tone.
- Impact: parent burden rises, repeat use drops, and product identity weakens.
- Default handling: explicitly reject school-like structures, rubric language, evaluation tone, and lesson-plan framing.
- Human decision needed: none unless product positioning changes.

### R-03. New packs can increase breadth while lowering clarity

- Issue: more activity coverage can make discovery harder.
- Impact: parents feel overloaded or unsure what to pick.
- Default handling: pair pack expansion with grouping/description/discovery clarity work.
- Human decision needed: none.

### R-04. Some research-backed clusters may still be too heavy for foundation scope

- Issue: certain formats (e.g. slow-burn inquiry or heavier mini-experiments) may be valid but too demanding for this package.
- Impact: burden increases and repeat use weakens.
- Default handling: prioritize the lightest, most repeatable cluster set first, with conversational check-ins, notice/pattern/sort, choice/reason/responsibility, and play-based inquiry loops as the default foundation cluster set.
- Human decision needed: only if a heavier cluster is intentionally promoted into scope.

### R-05. Added packs may look interesting but fail to create record/revisit value

- Issue: some activities may be enjoyable but not worth recording or revisiting.
- Impact: weak fit to the product loop.
- Default handling: require explicit record-worthiness and revisit-fit review before closeout.
- Human decision needed: none.

## 3. Threats and failure modes to test explicitly

### T-01. New pack feels educational but not actually home-natural
- Mitigation: require household-context rationale for each chosen cluster.

### T-02. New pack feels like homework or enrichment pressure
- Mitigation: reject assignment-like tone and high-burden setup.

### T-03. Discovery gets more crowded as coverage grows
- Mitigation: include a discovery/grouping clarity pass in the package itself.

### T-04. Added pack items cannot be meaningfully recorded later
- Mitigation: require record-worthiness review instead of relying only on activity interest.

## 4. Human review checklist

Before package closeout, a human should review:
1. whether the new clusters really increase useful everyday coverage
2. whether activities still feel natural and light in a home setting
3. whether the expanded pack remains understandable to browse
4. whether the new activities seem worth recording and revisiting
5. whether any item drifted into schoolization, evaluation, AI/admin, or unrelated platform scope
6. whether evidence quality is explicit enough to justify sign-off

## 4.1 Sign-off record for 2026-03-14

Recorded human sign-off truth:
- `004_everyday_activity_pack_foundation sign-off ok.`
- This package remains a home-friendly inquiry/activity routine expansion package, not a school-structure or template-count project.
- Mandatory default clusters for foundation scope are conversational check-ins and notice/pattern/sort; choice/reason/responsibility and play-based inquiry loops remain secondary/stretch unless explicitly promoted with stronger rationale.
- Account lifecycle, AI/recommendation capability, admin/CMS tooling, school-style Unit-of-Inquiry framing, evaluation semantics, and major IA/platform redesign remain out of scope for 004.
- Implementation may proceed on this basis.

## 5. Exit condition for this document

An item can move out of this file only when:
- runtime or implementation evidence resolves it
- it is fixed in `adr.md`
- it is explicitly accepted/deferred in sign-off
