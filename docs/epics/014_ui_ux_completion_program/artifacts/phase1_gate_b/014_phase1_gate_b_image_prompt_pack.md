# Epic 014 Phase 1 Gate B Image Prompt Pack

Status: completed manual pilot pack
Date: 2026-03-24
Owner: James manual generation handoff
Scope cap: 3 prompts only

## Purpose

This prompt pack is the capped Gate B image-direction handoff for epic 014 Phase 1.

It exists to validate image direction on representative audited routes without batch production.
James ran these prompts manually in Google Gemini Nano Banana, and the resulting files now live alongside this document in the same artifact folder.

Pilot outcome:
- all three requested files were returned to `docs/inbox/`
- the `/templates` image required one stricter regeneration to remove baked text and mock UI framing
- after that bounded correction, the pack served its Gate B direction-validation purpose

## Shared direction

- Product tone: calm, humane, parent-facing, non-institutional
- Narrative emphasis: a parent and child noticing, talking, recording, and revisiting ordinary learning moments at home
- Visual character: warm daylight, soft editorial realism, subtle lived-in textures, emotionally gentle rather than commercial-hyperpolished
- Composition rule: keep clean negative space where UI text or overlays could plausibly sit later
- Avoid:
  - classroom or school imagery
  - teacher, grading, charts, clipboards, uniforms, or report-card energy
  - exaggerated fantasy visuals
  - stock-photo smiles or staged corporate poses
  - visible logos, trademarks, or watermarks
  - text baked into the image

## Output instructions

- Aspect ratio:
  - Prompt 1: wide hero image, 16:10 or 3:2
  - Prompt 2: landscape card image, 16:9
  - Prompt 3: landscape detail hero image, 16:9
- Format: `png`
- Save location: `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/`
- If you generate multiple variants, keep only the single best file for each prompt under the exact recommended filename below.

## Prompt 1

- `Target route`: `/`
- `Recommended filename`: `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-home-hero-family-reflection.png`
- `Use case`: landing-page hero validation
- `Prompt`:

```text
Create a warm, editorial-style lifestyle illustration or semi-realistic digital painting for a parent-facing edtech landing page.

Show one parent and one elementary-age child at home during a quiet everyday learning moment. They are seated together at a table with a notebook, a few colored pencils, and one simple worksheet or paper activity. The child is pointing at something they noticed, and the parent is listening with a gentle, encouraging expression rather than teaching formally. The scene should feel like noticing and recording a meaningful small moment, not studying for school.

Use soft natural daylight from a nearby window, warm neutral tones, subtle orange accents, and a calm home interior with light wood, paper texture, and a little lived-in warmth. Keep the emotional tone thoughtful, reassuring, and human. Preserve generous negative space on one side of the composition for future UI text placement.

Do not include classroom cues, uniforms, grading, charts, laptops as the focal point, visible text, logos, or watermarks. Avoid stock-photo stiffness or exaggerated cheerfulness.
```

## Prompt 2

- `Target route`: `/templates`
- `Recommended filename`: `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-card-conversation.png`
- `Use case`: template-card imagery direction validation
- `Prompt`:

```text
Create a clean, warm image for a template library card in a parent-facing reflection product.

Show a close, intimate home scene where a parent and child are in mid-conversation during a small hands-on activity. Focus on the feeling of curiosity and dialogue: the child is explaining an idea or pointing to a drawing or object, and the parent is paying close attention. Include simple activity materials like paper, crayons, small objects, or craft pieces, but keep the composition uncluttered so it still reads clearly at small card size.

The style should feel like polished editorial illustration or softly stylized lifestyle art with warm natural light, gentle contrast, and a calm, premium finish. Use a palette that works with off-white backgrounds and muted orange UI accents. Compose the image so the subjects are immediately readable even when cropped into a 16:9 card.

Do not include text, logos, classroom furniture, grading symbolism, speech bubbles, or cartoon exaggeration. Avoid busy backgrounds and avoid making the scene feel like a school lesson.
```

## Prompt 3

- `Target route`: `/templates/[slug]`
- `Recommended filename`: `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-detail-noticing-moment.png`
- `Use case`: template-detail hero validation
- `Prompt`:

```text
Create a wide hero image for a template detail page in a calm parent reflection app.

Show a specific “noticing” moment at home: a parent and child are observing or discussing something simple they discovered together, such as a plant leaf, a small object collection, a drawing, or a change they noticed in their day. The child should appear engaged and thoughtful, and the parent should feel present, curious, and supportive. The image should communicate observation, conversation, and future reflection rather than formal instruction.

Use warm daylight, soft shadows, natural home textures, and a composed scene that feels intentional and slightly premium. Keep the lower-left or lower-center area visually calm enough that a UI title chip and page heading could sit on top without fighting the image. Make the scene feel emotionally grounded and useful for a reflection product, not generic family advertising.

Do not include visible text, logos, school or classroom cues, grading imagery, or highly saturated toy-commercial colors. Avoid a flat icon look, avoid photographic harshness, and avoid over-dramatic cinematic effects.
```

## What To Drop Back In Repo

Final files for this completed pilot live here:

- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-home-hero-family-reflection.png`
- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-card-conversation.png`
- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-detail-noticing-moment.png`

## Validation Checklist

When choosing the best variant for each prompt, prefer the one that:

- feels calm and parent-facing rather than institutional
- reads clearly at the target crop
- leaves enough negative space for UI overlays where needed
- visually upgrades the current placeholder-icon treatment
- matches the warm, humane IBNote tone from the audited routes

## Final returned files

- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-home-hero-family-reflection.png`
- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-card-conversation.png`
- `docs/epics/014_ui_ux_completion_program/artifacts/phase1_gate_b/014-p1-gateb-template-detail-noticing-moment.png`
