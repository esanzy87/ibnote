# IBNote 013 Records Surface Stitch Polish Risk Analysis

Version: 0.1
Date: 2026-03-17
Status: Active

## 1. Main risks

### R-01 Scope creep into broad shell redesign
Risk:
- once non-landing shell drift is acknowledged, implementation may drift into a broader app-shell or navigation redesign

Mitigation:
- keep shell work explicitly bounded to the smallest correction that improves records-route coherence
- do not reopen unrelated routes or information architecture

### R-02 Mistaking density cleanup for the real problem
Risk:
- implementation may reduce copy or spacing without restoring the missing visible hierarchy, producing only a weaker but still not clearly Stitch-aligned result

Mitigation:
- treat visible hierarchy restoration as the first priority
- evaluate density changes only after the style gap is visibly corrected

### R-03 Over-warming the surfaces and harming product honesty
Risk:
- in trying to make the routes feel more designed, implementation may become too decorative or emotionally louder than the product truth supports

Mitigation:
- preserve current semantics and helpful guidance
- prefer calm hierarchy, shell coherence, and branded card treatment over dramatic copy or fictional emotional framing

### R-04 Control-plane drift reappears
Risk:
- unattended work may still misread current truth if BLACKBOARD, 013 docs, and dirty tree diverge again

Mitigation:
- keep 013 as the active package in the BLACKBOARD snapshot until closeout
- sync tracker/report truth whenever implementation state changes materially
- separate incidental generated dirt from real package work

## 2. Ready-to-implement verdict

Current verdict: `conditionally ready`

Reason:
- the package is now specific enough to start bounded implementation on `/my/records`, `/my/records/[id]`, and a minimal non-landing shell correction
- however, closeout honesty still depends on maintaining control-plane sync during execution
