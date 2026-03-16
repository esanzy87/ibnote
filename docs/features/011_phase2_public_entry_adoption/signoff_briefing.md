# IBNote 011 Phase-2 Public Entry Adoption Sign-off Briefing

Status: Ready for human sign-off
Decision type: go / no-go for bounded phase-2 implementation
Source docs:
- `prd.md`
- `spec.md`
- `todo.md`
- `mismatch_ledger.md`

## 1. What 011 is

011 is the bounded follow-on package after 010 phase-1.
It covers only the two public-entry routes:
- `/`
- `/login`

Its job is to align first impression and login entry with the Stitch-derived visual baseline already established in 010, without expanding auth or marketing scope.

## 2. What 011 is not

011 is not:
- a broad marketing-site rewrite
- a social login package
- a support/community/resources package
- a revisit/settings expansion package
- a hidden auth-model change

## 3. Why do this now

After 010, the product's protected routes now feel more intentional and calm.
The public entry routes should no longer feel visually disconnected from that experience.

Doing 011 now should make the product feel more coherent from first touch through login.

## 4. Proposed scope

### GO targets
- `/`
- `/login`

### Explicit non-scope
- `/reset-password` (already covered by 010)
- templates/detail/transition surfaces (already covered by 010)
- revisit/settings/editor/summary surfaces
- any new auth providers or support surfaces

## 5. Safe-scope matrix

| Route | Decision | Why |
| --- | --- | --- |
| `/` | GO | strong coherence gain if copy is kept product-honest |
| `/login` | GO | strong visual/value gain if auth truth stays narrow |
| social login | NO | unsupported auth expansion |
| support/community/resources | NO | unsupported product-surface expansion |
| testimonials/social proof | NO | unsupported trust signaling |

## 6. Keep / rewrite / remove guidance

### Keep
- calmer visual hierarchy
- warmer baseline visual tone
- stronger CTA emphasis
- cleaner explanatory structure

### Rewrite
- landing hero copy to explain the real templates -> records -> summary loop
- login informational copy to explain actual post-login flow
- any overly poetic language into practical parent-facing language

### Remove
- Google/Apple login
- support center links
- fake social proof
- fictional reflection/story cards
- decorative navigation/footer surface that implies unsupported areas

## 7. Success conditions

011 should proceed only if the implementation aims for all of these:
1. landing and login feel visually coherent with 010
2. no fake auth or marketing surfaces remain
3. the product loop is clearer at entry
4. login remains faithful to email/password truth
5. the result feels calmer, not more bloated

## 8. Recommended sign-off

Recommended decision:
- **GO for bounded 011 implementation on `/` and `/login` only**
- **NO additional scope expansion under the same package**

## 9. Suggested sign-off note

Suggested sign-off message:
- `GO: Proceed with 011 on landing and login only. Keep auth truthful, remove fake marketing/auth surfaces, and preserve practical product-facing copy.`
