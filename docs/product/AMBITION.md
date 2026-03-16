# IBNote Ambition

> Purpose: define the long-term product direction that should guide feature selection, doc shaping, and unattended forward progress.
> Scope: this document captures strategic direction, product ambition, anti-goals, and feature-selection criteria.
> Non-goal: this is not a feature spec, implementation plan, or task tracker.

## 1. Why this document exists

IBNote now uses a more autonomous unattended operating model.
That makes it more important to keep one durable product-direction document that answers a higher-level question:

**What kind of product is IBNote trying to become, and what kinds of features are most worth building next?**

`todo.md` files define execution truth.
`spec.md` files define implementation truth.
`BLACKBOARD.md` defines current operating truth.
This document defines **strategic product-direction truth**.

Agents should use this document to avoid two failure modes:
1. repeatedly choosing only the safest micro-polish work with low long-term leverage
2. drifting into impressive-but-misaligned product expansion

---

## 2. Product ambition

IBNote exists to help parents build a calmer, more human, more reusable way to notice, record, and revisit a child's learning moments.

The product is not trying to turn family learning into a school-style evaluation workflow.
Instead, it aims to help a parent move from vague memory and one-off impressions toward a lightweight but meaningful loop of:

- noticing a moment,
- choosing a way to engage,
- recording what mattered,
- and revisiting that record later with more context and understanding.

The long-term ambition is not just "a place to store notes."
The long-term ambition is to become a practical companion for family learning reflection — one that helps parents see more, remember more, and understand more over time without becoming institutional, heavy, or judgmental.

---

## 3. Who this is for

IBNote is primarily for:
- parents or guardians who want to better notice and support a child's learning in everyday life
- families who benefit from low-pressure prompts, lightweight records, and meaningful revisit value
- people who want a more intentional home-learning reflection habit without needing formal education tooling

IBNote is not primarily for:
- schools or institutions running official evaluation workflows
- teachers managing classes, grading, or compliance reporting
- organizations that need administrative dashboards or formal reporting systems
- users who mainly want AI-generated judgment, scoring, or diagnosis

---

## 4. The change we want to create

IBNote should help create these shifts:

- from **"I know something happened, but I don't remember enough to use it later"**
  to **"I have a short record that captures the part worth revisiting"**

- from **"I don't know how to start"**
  to **"I can begin with one manageable activity or one useful question"**

- from **"This record is just stored"**
  to **"This record becomes easier to revisit, connect, and learn from later"**

- from **"I am evaluating my child"**
  to **"I am understanding my child a little better over time"**

This product should increase understanding, continuity, and relationship value — not administrative burden.

---

## 5. Strategic pillars

A strong IBNote feature usually strengthens at least one of these pillars clearly and truthfully.

### 5.1 Lower the starting barrier
A parent should be able to begin without feeling like they are entering a formal documentation workflow.
Good features reduce hesitation, confusion, and activation burden.

### 5.2 Help capture what is actually worth keeping
The product should make it easier to notice and preserve the part of a moment that is genuinely useful to remember later.
Good features improve record-worthiness, not just data volume.

### 5.3 Make revisit genuinely useful
A record should feel more worth revisiting over time.
Good features improve clarity, continuity, re-entry, and meaning during revisit rather than just archival storage.

### 5.4 Keep the product human and non-institutional
IBNote should remain calm, parent-facing, and relationship-centered.
Good features preserve humility and avoid school/report-card/diagnosis energy.

### 5.5 Compound understanding over time
The product should gradually help a parent understand patterns, context, and the child's growth more clearly.
Good features create continuity across moments rather than only polishing isolated screens.

---

## 6. Anti-goals

IBNote should explicitly avoid drifting into these identities unless a later human decision intentionally changes product direction.

### 6.1 Not a school-style evaluation platform
Do not turn IBNote into a grading, ranking, rubric, or report-card system.

### 6.2 Not an institutional documentation product
Do not optimize the product around compliance, teacher workflow, class operations, or formal parent-report delivery.

### 6.3 Not a heavy export or file-management platform
Do not drift into document-center, file-history, PDF-management, share-center, or broad export-system behavior unless that becomes a deliberate product direction later.

### 6.4 Not an over-automated AI judgment engine
Do not rush toward strong recommendation, diagnosis, scoring, or pseudo-expert interpretation as the core product value.

### 6.5 Not a broad admin/CMS/platform build-out
Do not let unattended feature selection default toward admin dashboards, complex content operations, or broad systemization that does not clearly strengthen the parent reflection loop.

---

## 7. What makes a strong next feature

A strong next feature usually does one or more of the following:
- lowers the effort required to start, continue, or resume the parent workflow
- increases the chance that a meaningful moment becomes a useful record
- increases the value of revisit, continuity, and rereadability
- improves the parent's ability to connect moments over time
- protects the calm, human, non-judgmental tone of the product while making the workflow more usable
- creates leverage across the core loop instead of adding isolated novelty

A weak next feature often looks like this:
- easy to ship but low in long-term product leverage
- aesthetically attractive but mostly disconnected from the core parent loop
- adds product surface area faster than it adds parent value
- sounds sophisticated but pulls the product toward institutional, evaluative, or platform-heavy behavior
- solves an edge-case convenience issue while leaving the main learning-record-revisit loop unchanged

When choosing between safe candidates, prefer the one that improves the quality of the parent loop more materially.
When choosing between ambitious candidates, prefer the one that preserves the product's human shape and verification honesty.

---

## 8. Near-term ambition

In the near term, IBNote should focus on becoming a clearly usable parent reflection tool with low friction and meaningful revisit value.

That means the highest-leverage near-term work usually lives in:
- template discovery and chooseability
- record start / writing / submission continuity
- summary and revisit usefulness
- gentle parent-facing guidance and recovery states
- preserving useful records in a form worth reading again

Near-term ambition should favor improvements that are:
- easy to explain
- easy to verify truthfully
- tightly scoped
- aligned with the existing product loop

---

## 9. Far-term ambition

In the longer term, IBNote may become a stronger family-learning companion that helps parents build deeper understanding over time.

That does **not** require becoming a formal analytics or evaluation system.
Instead, the far-term direction is toward:
- richer continuity between moments
- better parent understanding through accumulated context
- more reusable reflection loops
- more meaningful revisit paths that stay humane and modest

Far-term ambition should expand understanding, not bureaucracy.

---

## 10. How to use this document in feature selection

Before selecting or shaping the next feature, ask:
1. Which strategic pillar does this feature strengthen?
2. Does it improve the core parent loop, or just add surface area?
3. Does it move IBNote toward calmer understanding, or toward institutional complexity?
4. Is this feature strong because it creates real leverage, or only because it is safe and easy?
5. Does it violate any anti-goal even if it sounds useful in isolation?

Use this document together with:
- `docs/BLACKBOARD.md` for current operational truth
- `docs/guides/FEATURE_ADVANCEMENT_PROTOCOL.md` for feature progression rules
- each feature `prd.md` for package-specific justification

If these documents ever conflict:
- `BLACKBOARD.md` wins for current operational truth
- feature `spec.md` wins for implementation truth inside an active package
- `AMBITION.md` wins for long-term direction and next-feature judgment

---

## 11. Writing rule for future updates

This document should change rarely.
Update it only when there is a real product-direction shift, not just because a single feature was completed.

Prefer preserving a stable north star over rewriting the ambition to match the latest implementation.
