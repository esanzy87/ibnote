# IBNote 010 Stitch UI Adoption Foundation Carry-Forward Notes

Status: Active reference note
Related package: `010_stitch_ui_adoption_foundation`
Purpose: preserve out-of-scope but potentially valuable Gemini-generated ideas without silently expanding 010 ship scope

## 1. Why this note exists

During 010 phase-1 implementation, Gemini produced additional redesign work on routes that were explicitly deferred in the 010 docpack:
- `/my/records/[id]`
- `/my/records`
- `/my/summary`

Those changes should not be accepted into 010 ship scope automatically.
However, they should also not be discarded blindly, because some of the work contains reusable UI and UX ideas that may be valuable in later feature packages.

This note separates:
- what is **out of scope for 010 ship**
- what is **worth carrying forward for future packages**

## 2. Operating rule

The following routes remain **excluded from 010 ship scope** even if local code changes exist:
- `src/components/records/record-editor.tsx`
- `src/components/records/records-list-client.tsx`
- `src/components/summary/summary-page-client.tsx`

Any useful ideas from these files must be treated as:
- future-package input
- reference material
- candidate salvage points

They are not automatically approved for merge under 010.

## 3. Route-by-route carry-forward review

### 3.1 `/my/records/[id]` (`record-editor.tsx`)

#### Why it is out of scope for 010
- 010 phase-1 intentionally deferred this route as high semantic risk
- the Gemini changes go beyond visual adoption and substantially reshape re-entry/context framing
- this overlaps with prior revisit/editor truth rather than staying a pure Stitch baseline adoption

#### Salvage candidates worth preserving
- stronger reopened-record status headline/body framing
- re-entry context block: "what to review first when returning"
- writing guide module that reduces pressure to write a polished document
- calmer reassurance copy around unfinished drafts

#### Risks to watch in future reuse
- do not let UI framing silently redefine existing record semantics
- do not reopen editor IA casually under a design-only package
- reconcile with 009 record re-entry truth before adopting

#### Carry-forward recommendation
- preserve as reference input for a future record-editor refresh or revisit package
- do not ship under 010

### 3.2 `/my/records` (`records-list-client.tsx`)

#### Why it is out of scope for 010
- 010 phase-1 intentionally deferred this route
- the Gemini changes materially deepen revisit flow, summary connection explanation, and list IA
- this is not only styling; it changes how the route explains the product loop

#### Salvage candidates worth preserving
- revisit overview section
- draft vs submitted framing as "이어보기" vs "다시 읽기"
- summary-window connection explanations
- record-level explanation of how a record relates to current summary state
- improved filter/empty-state recovery language

#### Risks to watch in future reuse
- overview layer can become too heavy if the list turns into a mini-summary dashboard
- must preserve chooseability and re-entry clarity rather than adding explanatory bulk
- should be aligned with prior revisit continuity packages before adoption

#### Carry-forward recommendation
- strongest carry-forward candidate among the deferred routes
- evaluate first when opening the next revisit/list package
- do not ship under 010

### 3.3 `/my/summary` (`summary-page-client.tsx`)

#### Why it is out of scope for 010
- 010 phase-1 intentionally deferred this route
- the Gemini changes extend beyond visual adoption into print/preservation/revisit behavior and summary explanation structure
- this overlaps with 005/008 territory rather than remaining a bounded phase-1 UI uplift

#### Salvage candidates worth preserving
- summary basis explanation cards
- clearer empty/error state recovery pathways
- recent-record framing that makes the connection to summary more explicit
- some print-preservation framing may be useful later

#### Risks to watch in future reuse
- avoid making summary too heavy or over-explained
- avoid reopening print/preservation scope casually
- break the change apart before reuse; do not transplant wholesale

#### Carry-forward recommendation
- preserve only as decomposed reference material
- not a direct future transplant candidate
- do not ship under 010

## 4. Priority order for future reuse

Recommended carry-forward priority:
1. `records-list-client.tsx`
2. `record-editor.tsx`
3. `summary-page-client.tsx`

## 5. Practical next-step rule

If 010 phase-1 is being stabilized for merge/review:
- keep these deferred-route ideas documented
- do not use their existence as justification to widen 010
- if needed, preserve code or patch references separately, but keep package truth explicit

## 6. One-line summary

These Gemini-produced deferred-route changes are best understood as **good future-package input, not approved 010 ship scope**.
