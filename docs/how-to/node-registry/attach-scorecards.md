---
title: Attach Scorecards to capability versions
---

:::caution Stub
This How-to is a stub. Scorecards are planned as first-class registry metadata, but the storage/query surface is not yet fully implemented.
:::

## Goal

You will attach Scorecard evidence (evaluation outputs, metrics, provenance) to a `NodeType` version.

## When to use this

- You want a capability catalog with quality evidence.
- You need traceability for promotion decisions.

## Prerequisites

- Evaluations that produce durable `EvaluationResult` artifacts
- A Scorecard schema (metrics + evidence links + provenance)

## Steps

1. Aggregate evaluator outputs into a Scorecard record.
2. Attach the Scorecard to the target `NodeType` version in `Node Registry`.
3. Ensure Scorecards are immutable/append-only (no silent edits).

## Verify

- Scorecards can be retrieved when inspecting a `NodeType` version.
- Evidence links resolve to durable artifacts.

## Troubleshooting

- Evidence too large → store details as artifacts and link from the Scorecard.
- Missing provenance → record stack version + model profile + evaluator version.
- Schema drift → version the Scorecard schema explicitly.

## Cleanup / Rollback

- Replace Scorecards only via an explicit decision record workflow.

## Next steps

- How-to: [Promotion workflow](./promotion-workflow.md)
- How-to: [Turn evaluator outputs into a Scorecard entry](../evaluators/turn-eval-into-scorecard.md)

