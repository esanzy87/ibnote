# ADR — 013 Records Surface Stitch Polish

Date: 2026-03-17
Status: Accepted

## Context

Real-use review after 012 showed that `/my/records` and `/my/records/[id]` improved structurally, but still do not visibly read as clearly Stitch-aligned surfaces.
The main ambiguity before 013 implementation was whether the next work should be mostly density/microcopy tuning or whether a stronger visible hierarchy/shell correction is still missing.

## Decision

013 will treat the missing visible design layer as the primary problem.
Implementation should:
1. restore visible hierarchy first
2. add only the smallest bounded non-landing shell/navigation correction needed for coherence
3. tune density only after the missing style layer is restored

## Consequences

Accepted:
- 013 may touch a bounded shared non-landing shell layer if that is required to make the records routes feel part of one coherent redesigned product
- 013 remains small and route-specific even if a tiny shared shell fix is included

Rejected:
- treating 013 as a broad reintegration or redesign package
- treating copy-density tuning alone as sufficient
- reopening summary/auth/templates/public-entry scope
