# IBNote 005 Print and Export Polish Spec

Status: Draft - ready for hardening/sign-off
Source of truth: `docs/features/005_print_and_export_polish/prd.md`
Companion docs:
- `docs/features/005_print_and_export_polish/todo.md`
- `docs/features/005_print_and_export_polish/risk_analysis.md`
- `docs/features/005_print_and_export_polish/adr.md`

## 1. Purpose

This spec turns the 005 PRD into an execution-safe plan for improving preservation/readability behavior without drifting into heavy export infrastructure.

The agent must know exactly:
- which preservation problems are in scope
- which surfaces are valid to touch
- what “good print/export polish” means in product terms
- what must remain out of scope
- how to verify completion truthfully

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000` through `004` remain inherited baseline truth.
- 005 improves preservation/readability, not capability breadth.
- 005 must stay intentionally narrower and lower-risk than 003 and 004.
- Every meaningful change must be justified by readability, preservation value, or export-adjacent clarity.

### 2.2 Core review questions
- Does this change make a printed or browser-saved output easier to reread later?
- Does it clarify what is worth preserving without overstating what IBNote produces?
- Does it keep the product modest rather than turning output into a report-card artifact?
- Does it reduce friction using mostly browser-native behavior rather than new infrastructure?
- Does it avoid introducing heavy file workflow expectations?

### 2.3 Route scope
Primary in-scope surfaces:
- `/my/records/[id]` in preserved/read-state context
- `/my/summary`
- shared print-style support that affects those surfaces

Conditionally allowed supporting surfaces:
- `/templates/[slug]` only for shared print-style cleanup or wording continuity if the final touched set cannot be kept truthful without it
- small linked copy or action-label changes on adjacent touched surfaces when needed for continuity

Current default touched-surface hypothesis for 005 hardening:
- primary implementation target: `/my/summary`
- secondary/conditional target: `/my/records/[id]` only if record preserved output truthfully benefits from the same small print/readability pass
- keep `/templates/[slug]` out of the default touched set because template print support already exists and 005 should not reopen it without a concrete preservation gap

Non-redesign baseline surfaces to protect:
- `/login`
- `/reset-password`
- `/my/settings`
- core summary calculation semantics
- account/profile/auth capability
- template-pack scope beyond preservation continuity needs

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- server-rendered PDF or file generation pipelines
- persistent export/download history
- email/share/send delivery flows
- attachment/media packaging
- major record or summary schema changes
- broad route or information-architecture redesign
- capability expansion beyond preservation/readability polish

## 3. Shared implementation rules

### 3.1 Preservation-design rules
- Prefer browser-native print/save paths over new export machinery.
- Prefer calmer printed hierarchy over screen-density carryover.
- Make important note content easy to scan in print.
- Keep archive intent modest and parent-facing.
- Avoid institutional/report-card tone.
- Avoid promising formats or delivery paths the product does not actually support.

Safe wording examples:
- `지금 화면을 인쇄하거나 PDF로 저장해 나중에 다시 보기 쉽게 정리했습니다.`
- `기록의 핵심 내용이 출력물에서도 잘 보이도록 구성합니다.`

Avoid wording examples:
- `공식 보고서로 내보내기`
- `전문 포트폴리오 문서를 생성합니다.`

### 3.2 Preservation priorities for this run
Default priority order:
1. summary preservation readability
2. export-adjacent action clarity on `/my/summary`
3. shared print-style cleanup across the final touched set
4. record preservation readability only if the same small pass clearly justifies reopening `/my/records/[id]`

Selection rule for implementation:
- choose the smallest surface set that can deliver an obvious preservation-quality gain
- prefer changes that are easy to verify with print emulation, runtime smoke, and source review
- avoid opening broader editor/summary redesign work under the label of polish

### 3.3 Scope guardrails
Do not introduce:
- PDF generation services or libraries unless already trivially present and no new system semantics are required
- email/share/download-center/export-history features
- storage/file library semantics
- teacher/report-card/assessment framing
- admin capability or workflow orchestration
- major visual redesign beyond preservation/readability needs
- new product promises that imply richer export capability than actually exists

## 4. Surface requirements

### 4.1 Record preservation readability
Purpose: make a saved/printed record easier to keep and reread if the record surface is ultimately included.

Required outcomes:
- the record's key context and reflection content are clear in print
- print output reduces irrelevant screen UI noise
- hierarchy supports later rereading rather than only live editing

Acceptance checks:
- important record sections remain visible and ordered sensibly in print
- non-essential interactive chrome is reduced or removed
- printed output does not feel like a broken copy of the screen UI
- if this surface is not selected after final hardening, its requirements remain deferred rather than silently assumed complete

### 4.2 Summary preservation readability
Purpose: make summary output easier to preserve without overstating what the summary means.

This is the current default 005 anchor surface because `/my/summary` already expresses preservation/revisit value and currently has no dedicated print-first treatment documented.

Required outcomes:
- the printed/saved summary keeps its modest explanatory framing
- key counts/trends/recent items are readable in print
- empty/error/help states remain understandable if they appear in preserved form

Acceptance checks:
- printed summary hierarchy is understandable without relying on screen-only layout cues
- wording remains modest and non-diagnostic
- summary output is still honest about what IBNote is showing

### 4.3 Export-adjacent action clarity
Purpose: make preservation actions feel intentional while staying honest about capability.

Required outcomes:
- action labels or supporting copy make browser-native preservation easier to understand
- users are not misled into expecting a richer export system than exists
- preservation actions feel connected to revisit value rather than as random utilities

Acceptance checks:
- touched actions use truthful wording
- action placement or support copy clarifies save/print intent
- no new fake promises about downloads, delivery, or generated reports appear

### 4.4 Evidence shape for each touched preservation surface
Each touched surface should expose all of the following in implementation or review notes:
- hierarchy evidence:
  - key preserved sections or content blocks are easier to scan in print/save output
- noise-reduction evidence:
  - non-essential interactive chrome is reduced or hidden in preserved output
- preservation-intent evidence:
  - action wording or supporting copy clearly explains what can be preserved and how
- modesty evidence:
  - no report-card, diagnostic, or heavy export-platform language appears

Route-surface translation check:
- print output should emphasize content worth rereading over interactive screen controls
- preservation actions should clarify browser-native print/save behavior rather than imply hidden infrastructure

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Preservation readability improves | the final chosen touched surfaces print/save more clearly, with `/my/summary` required unless explicitly descoped by a newer signed decision | before/after review note |
| VR-02 | Action clarity improves | preservation actions/copy are more understandable on the final touched set without overstating capability | route/content review note |
| VR-03 | Scope safety | no PDF platform/share/file-system drift and no unjustified reopening of template print support | scope audit checklist |
| VR-04 | Runtime/repo safety | touched surfaces still work and print path remains healthy | runtime smoke + print checks + command outputs |
| VR-05 | Governance complete | sign-off recorded and risk disposition explicit | sign-off note |

## 6. Task plan

1. freeze 005 scope, touched surfaces, and capability boundaries
2. identify the highest-leverage preservation/readability gaps on existing print/save paths
3. improve record and/or summary preservation readability on the chosen surfaces
4. refine export-adjacent action wording/continuity where needed
5. run print/runtime review plus scope audit and repo-health verification
6. prepare sign-off closeout

## 7. Coding-agent rules

1. Keep one task `in_progress` at a time.
2. Do not mark a task done without evidence.
3. Prefer small, high-confidence preservation improvements over broad redesign.
4. Reject any change that turns 005 into a document platform.
5. Keep wording honest about browser-native print/save behavior.

## 8. Preservation acceptance checklist

A touched preservation surface should not be treated as done unless it can answer yes to all of the following:
1. Is it clearer in print or browser-saved form than before?
2. Are the most important content blocks easier to reread later?
3. Has unnecessary interactive noise been reduced?
4. Does the action wording stay truthful about what the product actually supports?
5. Does the output avoid report-card, official-document, or assessment framing?
6. Can the improvement be verified concretely with source review and print/runtime checks?
