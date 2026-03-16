# IBNote 007 Micro Usability and Empty State Polish ADR

Status: Accepted for implementation

## ADR-001 — Keep 007 as a narrow post-006 polish package
- Date: 2026-03-15
- Status: Accepted

### Context
After 005 and 006, the next sequenced unattended-friendly package is `007_micro_usability_and_empty_state_polish`.

### Decision
Treat 007 as a narrow polish package focused on small usability, empty-state clarity, no-result recovery, and low-data guidance on already-shipped surfaces.

### Consequences
- 007 remains lower-risk than broader feature or IA work.
- The package should start with doc hardening and target selection, not broad implementation.
- Surface sprawl is the main risk to guard against.

## ADR-002 — Default to the smallest real friction points, not general beautification
- Date: 2026-03-15
- Status: Accepted

### Decision
Prefer one or two concrete friction moments over broad all-route polish.

### Consequences
- Empty/no-result/recovery moments get priority.
- Copy/hierarchy/action clarity should be preferred before structural UI changes.
- If no concrete friction point is found, the package should stay narrow rather than inventing work.
- For this package, the locked implementation surfaces are `/templates` and `/my/summary`; other candidate surfaces remain deferred unless a tiny continuity fix becomes strictly necessary.
