---
title: Promote a capability version
---

:::caution Stub
This How-to is a stub. JARVIS does not yet ship an end-to-end promotion API; the workflow is planned as metadata + decision records.
:::

## Goal

You will promote a capability version (e.g., `experimental` → `candidate` → `stable`) using evaluator evidence and a decision record.

## When to use this

- You want to safely roll out a new capability version.
- You want promotion to be auditable and reversible.

## Prerequisites

- Evaluator evidence (deterministic + multi-trial + policy adherence)
- A Scorecard attached to the version
- Channel definitions and routing rules

## Steps

1. Gather evidence (evaluation artifacts + Scorecard).
2. Write a decision record (who approved, why, what evidence).
3. Update the version’s channel assignment (promotion).
4. Monitor for regressions and keep rollback ready.

## Verify

- `Selection` can route to the promoted version in the target environment.
- Old versions remain available for rollback.

## Troubleshooting

- Promotions aren’t reflected → caches/inventory snapshots need refresh.
- Regression after promotion → rollback quickly and investigate artifacts.
- Evidence incomplete → treat as “do not promote”.

## Cleanup / Rollback

- Demote the version and pin back to the previous stable one.

## Next steps

- How-to: [Deprecate / rollback](./deprecate-rollback.md)
- How-to: [Define promotion thresholds](../evaluators/define-promotion-thresholds.md)
