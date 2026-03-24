# IBNote 004 Everyday Activity Pack Foundation Spec

Status: Signed off - implementation-ready baseline
Source of truth: `docs/epics/004_everyday_activity_pack_foundation/prd.md`
Companion docs:
- `docs/epics/004_everyday_activity_pack_foundation/todo.md`
- `docs/epics/004_everyday_activity_pack_foundation/risk_analysis.md`
- `docs/epics/004_everyday_activity_pack_foundation/adr.md`

## 1. Purpose

This spec turns the 004 PRD into an execution-safe plan for expanding IBNote's activity pack without drifting into school-like curriculum packaging or quantity-only template work.

The agent must know exactly:
- what kind of activity clusters are desired
- what “good pack expansion” means in product terms
- how to preserve home-natural, low-burden parent use
- what must remain out of scope
- how to verify completion truthfully

If this spec conflicts with the PRD, follow the PRD and update this file.

## 2. Package operating mode

### 2.1 Baseline constraints
- `000`, `001`, `002`, and `003` remain inherited baseline truth.
- 004 expands activity coverage, not school structure.
- 004 must not become a quantity-only template project.
- Every major addition must be justified by activity-cluster coverage and quality bar fit.

### 2.2 Core review questions
- Does this new or revised activity feel natural at home rather than imported from school?
- Is it repeatable across different moments rather than a one-off novelty task?
- Will a parent understand quickly when to use it?
- Does it naturally produce something worth recording and later revisiting?
- Does it avoid assignment/evaluation/teacher-like framing?

Record-worthiness review questions:
- Is there at least one meaningful thing to capture from this activity such as the child's words, choice, observation, or change in thinking/action?
- Does the activity create a credible reason to revisit the note later rather than only proving that the activity happened once?
- Does the activity leave material that still fits IBNote's modest summary/revisit loop without pretending to assess or diagnose the child?

### 2.3 Route scope
Primary in-scope surfaces:
- `/templates`
- `/templates/[slug]`
- activity content/template definitions that feed those surfaces

Allowed supporting surfaces only when needed for continuity:
- minimal linked wording on record-start surfaces if required to preserve the new pack's clarity

Non-redesign baseline surfaces to protect:
- `/login`
- `/reset-password`
- `/my/settings`
- summary/revisit intelligence semantics beyond continuity needs

### 2.4 Stop-work conditions
Stop and request human direction if any planned change requires:
- Unit-of-Inquiry-style school structure
- rubric/evaluation framing
- AI-generated or adaptive activity capability
- admin/CMS tooling
- major platform/template-engine redesign
- capability expansion beyond pack coverage/discovery quality

## 3. Shared implementation rules

### 3.1 Pack-design rules
- Prefer reusable routines over novelty ideas.
- Prefer thought/action moves over topic-only categorization.
- Keep parent-facing copy light, supportive, and concrete.
- Favor short setup and low burden.
- Avoid homework tone, performance tone, and teacher tone.

Safe wording examples:
- `오늘 아이가 무엇을 먼저 알아차렸는지 짧게 남겨보세요.`
- `정답보다 아이가 어떻게 생각했는지를 적어보세요.`

Avoid wording examples:
- `아이가 목표를 달성했는지 평가해보세요.`
- `활동 결과를 기준에 따라 점검해보세요.`

### 3.2 Cluster priorities
Priority clusters for foundation scope:
- conversational check-ins
- notice / pattern / sort routines
- choice / reason / responsibility routines
- play-based inquiry loops

Foundation execution default:
- mandatory default clusters: conversational check-ins, notice / pattern / sort routines
- secondary/stretch clusters unless explicitly promoted with rationale: choice / reason / responsibility, play-based inquiry loops

Later/optional clusters unless explicitly chosen:
- expression / storytelling / making reflection
- mini inquiry experiments
- slow-burn personal inquiry packs

### 3.3 Scope guardrails
Do not introduce:
- Unit-of-Inquiry structures, lines of inquiry, rubric-style packaging, or exhibition-style project framing
- AI recommendation or generation
- admin/editor CMS
- account lifecycle changes
- score/evaluation/progress-report semantics
- major information-architecture or navigation redesign beyond the minimum discovery/grouping changes needed for the expanded pack
- purely quantitative template growth without quality/coverage rationale

## 4. Surface requirements

### 4.1 Pack coverage and clustering
Purpose: increase the number of real home moments that IBNote can support, without making the pack feel random or overwhelming.

Required outcomes:
- new coverage clearly maps to everyday family use
- cluster structure feels coherent and understandable
- expansion increases usable breadth, not confusion

Acceptance checks:
- new items belong to a clear cluster rationale
- cluster names and descriptions are understandable to parents
- the expanded library still feels navigable

### 4.2 Template detail usefulness
Purpose: help a parent quickly understand when and why to use a template.

Required outcomes:
- each relevant template feels easier to choose in real life
- descriptions reduce abstraction and increase situational clarity
- “why this activity is useful” becomes more obvious without schoolization

Acceptance checks:
- a parent can tell more quickly whether the activity fits now
- descriptions avoid teacher-like or assignment-like framing
- the activity still feels light enough to try today

### 4.3 Record-worthiness and revisit fit
Purpose: ensure new activity packs naturally fit IBNote's record/revisit loop.

Required outcomes:
- the new activity types generate meaningful but low-burden notes
- they connect naturally to later record review and modest summary value
- they do not require heavy artifacts or curriculum tracking to feel complete

Acceptance checks:
- the activity invites a useful record rather than requiring a formal write-up
- later revisit still makes sense from the activity's structure
- no pseudo-assessment or overclaim language appears

## 5. Verification matrix

| ID | Requirement | Pass criteria | Evidence |
| --- | --- | --- | --- |
| VR-01 | Coverage expansion is coherent | new clusters clearly extend home-use coverage | cluster review note |
| VR-02 | Parent usability is improved | parents can more quickly understand when/why to use added packs | route/content review note |
| VR-03 | Record-worthiness is preserved | new packs naturally produce meaningful records/revisit value | before/after review note |
| VR-04 | Scope safety | no schoolization, AI, admin, lifecycle, or evaluation drift | scope audit checklist |
| VR-05 | Runtime/repo safety | touched main-path surfaces still work | runtime smoke + command outputs |
| VR-06 | Governance complete | human sign-off recorded and risk disposition explicit | sign-off note |

## 6. Task plan

1. lock 004 scope, quality bar, and target clusters
2. choose the highest-leverage cluster additions for foundation scope
3. add or revise pack items for the chosen clusters
4. improve discovery/grouping/description quality for the expanded pack
5. verify record-worthiness and revisit fit of the chosen additions
6. run scope audit and repo-health verification
7. prepare sign-off closeout

## 7. Coding-agent rules

1. Keep one task `in_progress` at a time.
2. Do not mark a task done without evidence.
3. Do not optimize for raw pack size.
4. Tie every meaningful addition to a cluster rationale and quality bar.
5. Reject school-like, evaluative, or teacher-led framing even if it sounds more “educational”.

## 8. New pack item acceptance checklist

A new or meaningfully revised pack item should not be treated as done unless it can answer yes to all of the following:
1. Is it obvious within a few seconds when this item fits a real home moment?
2. Does it avoid homework, performance pressure, and teacher-led framing?
3. Can it be repeated in multiple situations rather than only once?
4. Does it create at least one meaningful capture target such as the child's words, choice, observation, or change?
5. Does it create a credible reason to revisit the note later?
6. Does it fit IBNote's modest record/revisit loop without implying evaluation, diagnosis, or hidden intelligence?
