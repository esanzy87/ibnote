# Epic 014 Phase 4 Image Asset Prompt Pack

Status: active manual generation handoff
Date: 2026-03-26
Owner: James external generation handoff
Scope cap: 19 prompts only

## Purpose

This prompt pack is the bounded Phase 4 asset-procurement handoff for epic 014.

Unlike the earlier Phase 1 Gate B pack, this document is not only for direction validation.
Its job is to define every image asset needed to replace the current placeholder-grade imagery on the in-scope public routes:

- `/`
- `/templates`
- `/templates/[slug]`

James will generate these assets manually in an external tool such as Google Gemini Nano Banana, return the selected files to `docs/inbox/`, and then the Phase 4 implementation pass will wire them into the live routes.

Phase 4 does not close on prompt quality alone.
It closes only after the actual files are present in the repo and rendered on the live routes.

## Current placeholder map

Current code review shows these placeholder/image slots still need real assets:

1. Homepage hero illustration slot on `/`
2. Three homepage example-card slots on `/`
3. One visual slot per template card on `/templates`
4. One hero visual per template detail route on `/templates/[slug]`

To avoid the template library feeling repetitive or placeholder-like, the template cards should not reuse the same cluster image over and over.
Instead, each template slug should receive its own representative image, and that same image can then be reused by the matching template-detail hero for consistency.

That yields this final asset set:

- 1 homepage hero image
- 3 homepage example-card images
- 15 template-specific representative images reused across `/templates` cards and matching `/templates/[slug]` hero surfaces

Total: 19 files

## Stitch-aligned reading

The stored Stitch reference screens suggest a warmer and more mixed-media direction than a purely photoreal family-lifestyle approach.

Key takeaways to preserve:

- warmth comes mainly from cream surfaces, orange accents, soft spacing, and gentle image choice rather than photo realism
- the landing route can support one calm people-centered illustration, but should not depend on editorial photography
- the template library benefits from varied media so the cards feel distinct at a glance
- template imagery should often center on activities, objects, textures, nature, or hands-in-action rather than repeating similar parent-child portrait scenes
- quiet, symbolic, or object-led imagery is often a better fit for template detail heroes than literal family stock-photo moments

Do not treat Stitch as a reason to make every asset abstract.
The images should still feel route-appropriate and help each activity read clearly.
The goal is mixed-media warmth with strong card-level distinction, not generic decoration.

## Shared direction

- Product tone: calm, humane, parent-facing, non-institutional
- Narrative emphasis: noticing, talking, sorting, choosing, exploring, recording, revisiting ordinary home moments
- Visual character: warm editorial illustration, softly stylized lifestyle art, quiet object studies, and occasional gentle natural photography
- Surface fit: imagery should sit comfortably inside cream backgrounds, muted orange accents, and soft rounded cards
- Composition rule: preserve clean negative space where UI text or overlays may sit later
- Library rule: prioritize distinct silhouettes, materials, and focal subjects so neighboring cards do not blur together
- Household context: natural home spaces, paper, books, plants, simple daily materials, light wood, soft fabric, tidy visual rhythm
- Emotional rule: gentle attention over performance; connection over instruction

Default style preference:

1. warm editorial illustration or softly stylized semi-realistic digital painting
2. quiet object-led or hands-led lifestyle composition
3. restrained natural photography only where the concept clearly benefits from it

Avoid:

- hard photorealism as the default style
- classroom or school imagery
- teachers, grading, charts, uniforms, or report-card energy
- text baked into the image
- visible logos, trademarks, or watermarks
- app screens, device mockups, browser frames, or poster layouts
- stock-photo smiles, stiff poses, or ad-like family perfection
- toy-store clutter, overly saturated color, or cinematic drama
- flat undifferentiated abstract shapes that do not help the activity read

## Asset strategy by slot

Use this table to keep the set varied and Stitch-aligned instead of letting all 19 assets collapse into the same family-photo treatment.

| Asset | Route / slug | Recommended medium | Why this is the best fit |
| --- | --- | --- | --- |
| 1 | `/` hero | editorial illustration | Stitch landing warmth is illustration-led, not photo-led |
| 2 | home example `opinion-talk` | softly stylized illustration | a simple people scene can stay readable at small size |
| 3 | home example `noticing-change` | object-led or hands-led illustration | the concept reads better through one clear changed thing |
| 4 | home example `small-action` | object-led illustration or quiet still life | a practical choice moment does not need a portrait |
| 5 | `ask-better-questions` | illustration with people | dialogue benefit is easiest to read through expression and gesture |
| 6 | `compare-two-ideas` | object-led composition with hands | the comparison itself should be the focal point |
| 7 | `explain-what-you-noticed` | close observation scene | object plus pointing/explaining reads better than portraiture |
| 8 | `family-rule-builder` | hands, paper, and shared arrangement | the collaborative rule-making artifact is the point |
| 9 | `high-low-next-talk` | calm people-centered illustration | this template is about emotional check-in |
| 10 | `my-opinion-matters` | people-centered illustration | child voice and respect should stay visible |
| 11 | `my-small-action-this-week` | note/object-led composition | practical commitment reads well through one small chosen action |
| 12 | `notice-think-wonder-about-nature` | quiet natural photography or botanical illustration | Stitch detail references support symbolic nature-led hero imagery |
| 13 | `one-minute-mini-speech` | illustration with child focal figure | confidence and speaking gesture matter more than realism |
| 14 | `pattern-hunt-at-home` | pattern-rich object composition | the pattern source should dominate, not the people |
| 15 | `sort-what-belongs-together` | top-down grouping scene | sorting needs clean visual categorization |
| 16 | `spot-fact-vs-opinion` | object-plus-conversation scene | the weighing mood matters more than portrait realism |
| 17 | `waste-flow-map` | object-led household still life | packaging/material flow is the subject |
| 18 | `water-use-check` | close lifestyle crop or hands-led scene | water habit imagery works best through an ordinary action detail |
| 19 | `what-changed-in-my-day` | before/after object scene | one changed home detail can carry the idea more clearly than faces |

## Output instructions

- Format: `png`
- Return location: `docs/inbox/`
- If you generate multiple variants, keep only the single best file for each prompt under the exact recommended filename below.
- Do not rename the files.
- If one prompt keeps producing text or UI artifacts, regenerate the same prompt with stricter `no text`, `no interface`, `no poster`, and `no screen` emphasis rather than inventing a new concept.
- If one prompt keeps producing uncanny photoreal people, switch the same concept toward `editorial illustration`, `softly stylized`, `painted`, or `hands/object-led` wording before broadening the idea.
- For template-specific images, prefer one strong representative scene per slug rather than trying to literalize every word of the title.

## Asset 1

- `Target route`: `/`
- `Target slot`: homepage hero image
- `Recommended filename`: `docs/inbox/014-p4-home-hero-family-reflection.png`
- `Use case`: landing-page hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `warm editorial illustration or softly stylized semi-realistic digital painting`
- `Prompt`:

```text
Create a warm editorial illustration or softly stylized semi-realistic digital painting for a parent-facing reflection app homepage hero.

Show one parent and one elementary-age child at home during a quiet everyday moment of shared attention. They are seated together near a table or low surface with a notebook, drawing paper, or one small activity in front of them. The child is noticing or explaining something, and the parent is listening with calm interest rather than teaching formally. The image should feel like a meaningful moment worth recording and revisiting later.

Use soft natural daylight, warm neutral tones, light wood, cream and beige textures, and a calm lived-in home interior. Keep the emotional tone thoughtful, reassuring, and human. Compose the scene so that one side of the image stays visually open and calm for future headline and CTA overlay. The people and their hands should remain safely visible after a wide crop.

The style should feel polished, warm, and intentionally illustrated rather than photoreal. It should sit naturally beside off-white UI surfaces and muted orange accents.

Do not include classroom cues, uniforms, grading symbols, visible text, logos, watermarks, phones as the focal point, app UI, or browser framing. Avoid stock-photo stiffness, exaggerated smiles, or toy-commercial color intensity.

--aspect-ratio 16:9
```

## Asset 2

- `Target route`: `/`
- `Target slot`: homepage example card for "내 생각 말해 보기"
- `Recommended filename`: `docs/inbox/014-p4-home-example-opinion-talk.png`
- `Use case`: small example card image
- `Aspect ratio`: `16:9`
- `Recommended medium`: `softly stylized editorial illustration`
- `Prompt`:

```text
Create a clean, warm editorial illustration for a small homepage activity card in a parent-facing app.

Show a parent and child in a short conversational moment at home where the child is expressing an opinion and the parent is listening closely. The scene should feel natural and simple, as if they are deciding between two small everyday options or talking about one choice the child made. Keep the focus on eye contact, gesture, and one clear moment of self-expression.

Use warm daylight, soft household textures, and a calm neutral palette with subtle apricot or orange warmth. The composition must read clearly at small card size, so keep the background uncluttered and the main interaction obvious in the center of the frame.

The style should feel like polished lifestyle illustration rather than photoreal portrait photography.

Do not include text, logos, app screens, posters, classroom furniture, multiple extra people, or busy decorative clutter. Avoid making the scene feel like a staged advertisement.
```

## Asset 3

- `Target route`: `/`
- `Target slot`: homepage example card for "오늘 달라진 점 찾기"
- `Recommended filename`: `docs/inbox/014-p4-home-example-noticing-change.png`
- `Use case`: small example card image
- `Aspect ratio`: `16:9`
- `Recommended medium`: `object-led illustration or hands-led home vignette`
- `Prompt`:

```text
Create a warm, concise object-led illustration for a small homepage activity card in a parent-facing reflection product.

Show one simple changed thing in an ordinary home context: for example a drawing with one new detail, a plant with fresh growth, two slightly different object arrangements, or a before-and-after household moment. A parent and child may appear through hands, partial figures, or a subtle nearby presence, but the changed detail should be the clear focal point.

Use soft daylight, gentle contrast, warm neutral surfaces, and a tidy composition with one obvious visual difference. Keep the central interaction easy to read even when the image is reduced to a small card.

The style should feel softly illustrated or gently painted, not photoreal and not infographic-like.

Do not include visible text, logos, charts, school cues, fake UI, arrows, labels, or cluttered shelves full of distracting objects. Avoid dramatic cinematic effects or toy-commercial brightness.
```

## Asset 4

- `Target route`: `/`
- `Target slot`: homepage example card for "이번 주 작은 실천 정하기"
- `Recommended filename`: `docs/inbox/014-p4-home-example-small-action.png`
- `Use case`: small example card image
- `Aspect ratio`: `16:9`
- `Recommended medium`: `quiet still life or object-led illustration`
- `Prompt`:

```text
Create a warm, readable object-led illustration or quiet still-life image for a small homepage activity card in a calm parent-facing app.

Show one small practical action being chosen in an everyday home setting. This could be a hand pointing to one simple object, a tiny household task being selected, or a calm tabletop arrangement that suggests one manageable commitment. If people appear, keep them partial and secondary to the chosen action.

Use warm natural daylight, soft neutral colors, light wood or paper textures, and a composition that remains clear at small card size. The chosen action should be the visual center, with minimal background noise.

The style should feel intentional, warm, and premium rather than photoreal family advertising.

Do not include text, logos, posters, app screens, reward charts, school symbolism, or exaggerated motivational energy. Avoid a productivity-ad feel.
```

## Asset 5

- `Target route`: `/templates` and `/templates/ask-better-questions`
- `Target slot`: template card and detail hero for `ask-better-questions`
- `Recommended filename`: `docs/inbox/014-p4-template-ask-better-questions.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `warm people-centered editorial illustration`
- `Prompt`:

```text
Create a warm editorial illustration for a parent-facing reflection template called "ask better questions."

Show a parent and child at home in a calm moment where a simple everyday topic is turning into a richer conversation. The child should appear to be thinking, clarifying, or responding to a more open-ended question, while the parent listens attentively with curiosity rather than instruction. The scene should suggest that a better question helped the child say more.

Make the composition work both as a small template card and as a larger template-detail hero. Keep the central interaction easy to read at small size, and leave one lower side calm enough for title overlay.

Use warm light, soft household texture, and a restrained palette that fits cream backgrounds and muted orange UI accents.

Do not include visible text, logos, UI, classroom cues, or staged educational posing.
```

## Asset 6

- `Target route`: `/templates` and `/templates/compare-two-ideas`
- `Target slot`: template card and detail hero for `compare-two-ideas`
- `Recommended filename`: `docs/inbox/014-p4-template-compare-two-ideas.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `object-led composition with hands or partial figures`
- `Prompt`:

```text
Create a warm object-led image for a parent-facing reflection template about comparing two ideas.

Show two simple options, objects, drawings, or pictures side by side on a table or surface at home, with a parent and child comparing them through pointing, arranging, or discussing. The comparison itself should be the main visual subject. Faces may be partial or secondary.

Keep the scene clear enough for small card use, with the two items and the comparing gesture still legible. Preserve one lower area calm enough for detail-page title overlay.

The style should feel like refined illustration or softly stylized lifestyle art rather than literal photoreal portraiture.

Do not include text labels, charts, worksheets with readable writing, logos, or classroom energy.
```

## Asset 7

- `Target route`: `/templates` and `/templates/explain-what-you-noticed`
- `Target slot`: template card and detail hero for `explain-what-you-noticed`
- `Recommended filename`: `docs/inbox/014-p4-template-explain-what-you-noticed.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `close observation scene with object focus`
- `Prompt`:

```text
Create a calm, warm image for a parent-facing reflection template about explaining what you noticed.

Show one ordinary object, small scene, or household detail in close focus while a child explains something they observed. Use pointing hands, body angle, or one attentive listening figure to show that observation is turning into language. The object or detail being noticed should remain the clear focal point.

Make the image usable both as a small card and a larger detail hero. Keep the visual focal point simple and easy to read.

Prefer polished editorial illustration or softly stylized art over hard photorealism.

Do not include text, logos, fake UI, classroom cues, or decorative clutter that hides the noticing moment.
```

## Asset 8

- `Target route`: `/templates` and `/templates/family-rule-builder`
- `Target slot`: template card and detail hero for `family-rule-builder`
- `Recommended filename`: `docs/inbox/014-p4-template-family-rule-builder.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `hands, paper, and collaborative tabletop composition`
- `Prompt`:

```text
Create a warm, grounded image for a parent-facing reflection template about building a family rule together.

Show a parent and child at home discussing one simple household expectation or agreement in a calm, collaborative way. Focus on hands, paper, small objects, and shared arrangement more than facial portraiture. A blank note or paper can be present, but it must not contain readable text.

Compose the image so it still reads clearly at card size and leaves one calm lower area for possible title overlay at hero size.

The style should feel tidy, premium, and gently illustrated or softly stylized.

Do not include punishment cues, charts with text, classroom framing, logos, or moralizing poster energy.
```

## Asset 9

- `Target route`: `/templates` and `/templates/high-low-next-talk`
- `Target slot`: template card and detail hero for `high-low-next-talk`
- `Recommended filename`: `docs/inbox/014-p4-template-high-low-next-talk.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `calm people-centered editorial illustration`
- `Prompt`:

```text
Create a warm editorial illustration for a parent-facing reflection template about a short high-low-next conversation.

Show a parent and child in a quiet daily check-in moment at home, such as after dinner or before bedtime, reflecting together on one good part of the day, one hard part, and one next step. The emotional tone should feel safe, short, and honest rather than dramatic.

Keep the composition simple enough for card use and calm enough for detail-hero overlay.

Use soft warm light and a restrained cream, beige, and muted orange palette.

Do not include text, bedtime-story cliches, fake interface elements, classroom symbolism, or exaggerated sadness or excitement.
```

## Asset 10

- `Target route`: `/templates` and `/templates/my-opinion-matters`
- `Target slot`: template card and detail hero for `my-opinion-matters`
- `Recommended filename`: `docs/inbox/014-p4-template-my-opinion-matters.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `people-centered illustration`
- `Prompt`:

```text
Create a warm editorial illustration for a parent-facing reflection template about helping a child express their own opinion.

Show a parent and child at home in a moment where the child is clearly sharing a preference or view and the parent is listening with respect. The image should feel empowering but calm, with the child visibly engaged in speaking or gesturing.

Make the interaction readable both in a small card and a larger detail hero, with one lower side calm enough for text overlay.

Do not include staged debate vibes, classroom discussion framing, visible text, logos, or ad-like smiles.
```

## Asset 11

- `Target route`: `/templates` and `/templates/my-small-action-this-week`
- `Target slot`: template card and detail hero for `my-small-action-this-week`
- `Recommended filename`: `docs/inbox/014-p4-template-my-small-action-this-week.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `note/object-led composition with optional hands`
- `Prompt`:

```text
Create a warm, grounded object-led image for a parent-facing reflection template about choosing one small action for the week.

Show one manageable action or habit being chosen in a home setting. Focus on one simple object, small task setup, or one tabletop decision moment. Hands or partial figures may appear, but the chosen action should be the clear visual anchor. A blank note can support the scene, but no readable text should appear.

Keep the image clear at small size and calm enough for hero overlay use.

Prefer refined illustration or softly stylized lifestyle art over literal photoreal family portraiture.

Do not include motivational poster aesthetics, charts, visible writing, logos, or school-like planning scenes.
```

## Asset 12

- `Target route`: `/templates` and `/templates/notice-think-wonder-about-nature`
- `Target slot`: template card and detail hero for `notice-think-wonder-about-nature`
- `Recommended filename`: `docs/inbox/014-p4-template-notice-think-wonder-about-nature.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `quiet natural photography or botanical illustration`
- `Prompt`:

```text
Create a warm, reflective image for a parent-facing reflection template about noticing, thinking, and wondering about nature.

Show a plant, leaf, flower, window-view branch, or another small natural detail in or near the home. The image should communicate calm attention, curiosity, and a question-forming mood. A parent or child may be implied through scale, hands, or framing, but the natural detail should be primary.

Make the scene readable at both card and hero sizes, with one lower area calm enough for title overlay.

This concept may use quiet natural photography, macro-style botanical focus, or a restrained botanical illustration if it fits the warm IBNote palette. Keep it gentle and non-spectacular.

Do not include field-trip vibes, classroom materials, readable labels, logos, or dramatic nature photography spectacle.
```

## Asset 13

- `Target route`: `/templates` and `/templates/one-minute-mini-speech`
- `Target slot`: template card and detail hero for `one-minute-mini-speech`
- `Recommended filename`: `docs/inbox/014-p4-template-one-minute-mini-speech.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `illustration with child focal figure`
- `Prompt`:

```text
Create a warm editorial illustration for a parent-facing reflection template about a short one-minute mini speech.

Show a child at home sharing one short idea confidently with a parent listening supportively nearby. The mood should feel light, safe, and encouraging, like informal home practice rather than performance or public speaking training.

Keep the child and listener readable at small card size and preserve one calm lower area for hero overlay.

Do not include microphones, stages, classrooms, visible text, logos, or talent-show energy.
```

## Asset 14

- `Target route`: `/templates` and `/templates/pattern-hunt-at-home`
- `Target slot`: template card and detail hero for `pattern-hunt-at-home`
- `Recommended filename`: `docs/inbox/014-p4-template-pattern-hunt-at-home.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `pattern-rich object composition`
- `Prompt`:

```text
Create a warm object-led image for a parent-facing reflection template about finding patterns at home.

Show repeated shapes, arrangements, textures, shadows, or household object patterns in an ordinary home setting. A parent and child may participate through hands, pointing, or partial presence, but the pattern source should be the visual star.

Compose the image so the pattern source and the discovery gesture remain legible at small size, and keep one lower area calm enough for detail-hero text overlay.

Prefer refined illustration, collage-like lifestyle art, or a very restrained object photograph with soft warm light.

Do not include worksheets, visible numbers, classroom charts, logos, or bright toy-store clutter.
```

## Asset 15

- `Target route`: `/templates` and `/templates/sort-what-belongs-together`
- `Target slot`: template card and detail hero for `sort-what-belongs-together`
- `Recommended filename`: `docs/inbox/014-p4-template-sort-what-belongs-together.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `top-down grouping scene`
- `Prompt`:

```text
Create a warm, tidy image for a parent-facing reflection template about sorting what belongs together.

Show a parent and child grouping a small number of objects or picture cards on a table at home. Focus on the arrangement, categories, and emerging connections rather than facial portraiture. The grouping should feel visually clear and calm from above or at a slight angle.

Keep the composition readable at card size and leave one lower side visually quiet for title overlay in hero use.

The style should feel gently illustrated, premium, and highly legible.

Do not include readable labels, classroom bins, fake app UI, logos, or clutter that hides the grouping action.
```

## Asset 16

- `Target route`: `/templates` and `/templates/spot-fact-vs-opinion`
- `Target slot`: template card and detail hero for `spot-fact-vs-opinion`
- `Recommended filename`: `docs/inbox/014-p4-template-spot-fact-vs-opinion.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `object-plus-conversation scene`
- `Prompt`:

```text
Create a warm image for a parent-facing reflection template about distinguishing fact and opinion.

Show a parent and child discussing one picture, claim, or everyday situation at home with a thoughtful, questioning mood. Focus on the feeling of weighing and considering rather than debate. The visual subject can be a picture card, object, or scene they are discussing, supported by gesture or attentive posture.

Make the image work as both a small card and a larger hero, with one lower side calm enough for overlay text.

Prefer softly stylized illustration or object-led lifestyle art over literal photoreal portraits.

Do not include newspapers with readable headlines, school desks, speech bubbles, logos, or debate-club energy.
```

## Asset 17

- `Target route`: `/templates` and `/templates/waste-flow-map`
- `Target slot`: template card and detail hero for `waste-flow-map`
- `Recommended filename`: `docs/inbox/014-p4-template-waste-flow-map.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `object-led household still life`
- `Prompt`:

```text
Create a warm, grounded object-led image for a parent-facing reflection template about following the flow of waste or used materials at home.

Show one everyday used item or piece of packaging in a home setting, with a parent and child considering what happens next. Use hands, placement, or nearby bins or surfaces to suggest thought about household systems without turning the image into a poster or diagram.

Keep the composition simple enough for small card use and quiet enough for hero overlay.

The style should feel practical, calm, and slightly premium rather than campaign-like.

Do not include recycling posters, readable labels, environmental campaign graphics, logos, or classroom project vibes.
```

## Asset 18

- `Target route`: `/templates` and `/templates/water-use-check`
- `Target slot`: template card and detail hero for `water-use-check`
- `Recommended filename`: `docs/inbox/014-p4-template-water-use-check.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `close lifestyle crop or hands-led scene`
- `Prompt`:

```text
Create a warm image for a parent-facing reflection template about noticing water use at home.

Show an ordinary water-use moment such as hand washing, dish rinsing, or another simple home habit. Focus on the everyday action, hands, sink area, and small adjustment mood rather than portraiture. The feeling should be observant and calm, not guilty or instructional.

Make the image readable both as a card and a hero, with one lower side calm enough for title overlay.

Use soft light, restrained color, and either a gently stylized illustration or a very soft close-cropped lifestyle image.

Do not include visible text, environmental campaign posters, classroom science energy, logos, or dramatic save-the-planet styling.
```

## Asset 19

- `Target route`: `/templates` and `/templates/what-changed-in-my-day`
- `Target slot`: template card and detail hero for `what-changed-in-my-day`
- `Recommended filename`: `docs/inbox/014-p4-template-what-changed-in-my-day.png`
- `Use case`: reusable per-template card plus detail hero
- `Aspect ratio`: `16:9`
- `Recommended medium`: `before/after object scene`
- `Prompt`:

```text
Create a warm, reflective image for a parent-facing reflection template about noticing what changed during the day.

Show a simple everyday before-and-after difference in a home context. This could be a room corner, a drawing, a plant, clothes, food preparation, weather outside the window, or another ordinary daily change. A parent or child may be implied through hands or partial presence, but the changed detail should stay primary.

Keep the visual story easy to understand at card size while leaving one lower side calm enough for hero overlay.

The image should feel gently illustrative, quiet, and symbolic rather than like a literal stock-family scene.

Do not include visible text, arrows, labels, split-screen graphics, classroom materials, logos, or infographic treatment.
```

## What To Drop Back In Repo

After external generation, place only the single chosen final file for each prompt into `docs/inbox/` under the exact filenames above.

Expected returned files:

- `docs/inbox/014-p4-home-hero-family-reflection.png`
- `docs/inbox/014-p4-home-example-opinion-talk.png`
- `docs/inbox/014-p4-home-example-noticing-change.png`
- `docs/inbox/014-p4-home-example-small-action.png`
- `docs/inbox/014-p4-template-ask-better-questions.png`
- `docs/inbox/014-p4-template-compare-two-ideas.png`
- `docs/inbox/014-p4-template-explain-what-you-noticed.png`
- `docs/inbox/014-p4-template-family-rule-builder.png`
- `docs/inbox/014-p4-template-high-low-next-talk.png`
- `docs/inbox/014-p4-template-my-opinion-matters.png`
- `docs/inbox/014-p4-template-my-small-action-this-week.png`
- `docs/inbox/014-p4-template-notice-think-wonder-about-nature.png`
- `docs/inbox/014-p4-template-one-minute-mini-speech.png`
- `docs/inbox/014-p4-template-pattern-hunt-at-home.png`
- `docs/inbox/014-p4-template-sort-what-belongs-together.png`
- `docs/inbox/014-p4-template-spot-fact-vs-opinion.png`
- `docs/inbox/014-p4-template-waste-flow-map.png`
- `docs/inbox/014-p4-template-water-use-check.png`
- `docs/inbox/014-p4-template-what-changed-in-my-day.png`

## Validation checklist

When choosing the best variant for each prompt, prefer the one that:

- feels calm and parent-facing rather than institutional
- reads clearly at the target crop
- leaves enough negative space for UI overlays where needed
- avoids any baked text, watermark, or interface residue
- avoids over-relying on hard photoreal family portrait language unless that slot explicitly benefits from it
- visually upgrades the current placeholder-icon treatment
- matches the warm, humane IBNote tone already validated in epic 014
- makes neighboring cards in the template library feel distinct rather than repeated
- still feels usable when the same file is shown as both a template card and the matching detail hero

## Handoff note

If any generated image repeatedly includes text, UI chrome, or poster framing:

- keep the same filename target
- rerun the same prompt with stronger negative instructions about `no text`, `no UI`, `no poster`, and `no interface`
- do not broaden the concept unless the image keeps failing the crop/readability requirement

If any generated image keeps drifting into generic stock-photo realism:

- keep the same filename target
- rerun the same prompt with stronger style direction such as `editorial illustration`, `softly stylized`, `painted`, `paper-textured`, `object-led`, or `hands-led`
- prefer changing the medium before changing the concept
