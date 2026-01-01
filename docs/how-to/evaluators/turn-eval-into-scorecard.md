---
title: Turn evaluator outputs into a Scorecard entry
---

:::caution Stub
This How-to is a stub. JARVIS does not yet ship a stable Scorecard schema or persistence layer in `Node Registry`.
:::

## Goal

You will convert evaluator outputs into a “Scorecard” record that can be attached to a `NodeType` version as promotion evidence.

## When to use this

- You want a capability catalog that carries quality evidence.
- You need to justify promotion decisions (human review or automated gates).

## Prerequisites

- Evaluations that produce durable `EvaluationResult` artifacts
- A Scorecard schema (what evidence is stored, who authored it, when it was produced)
- A place to attach it (typically `Node Registry`)

## Steps

1. Define the Scorecard fields you will persist (metrics + evidence links).
2. Aggregate one or more `EvaluationResult`s into the Scorecard.
3. Attach the Scorecard to the target `NodeType` version.

## Verify

- Scorecards are queryable alongside `NodeType` versions.
- Evidence links resolve to durable artifacts.

## Troubleshooting

- Scorecard schema drift → version Scorecards explicitly and keep them append-only.
- Evidence too large → store details as artifacts and link from Scorecard.
- Missing evaluator provenance → record tool/model/profile + stack version.

## Cleanup / Rollback

- Remove/replace Scorecards only via an explicit “decision record” workflow (avoid silent edits).

## Next steps

- How-to: [Attach Scorecards to capability versions](../node-registry/attach-scorecards.md)
- How-to: [Promotion workflow](../node-registry/promotion-workflow.md)
