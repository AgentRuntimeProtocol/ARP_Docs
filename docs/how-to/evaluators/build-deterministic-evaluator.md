---
title: Build a deterministic evaluator
---

:::caution Stub
This How-to is a stub. JARVIS emits evaluation artifacts, but a stable “evaluator authoring + registration” workflow is still in progress.
:::

## Goal

You will implement a deterministic evaluator that checks postconditions/state and produces an `EvaluationResult` artifact.

## When to use this

- The outcome can be validated mechanically (schema checks, invariants, state transitions).
- You want high signal and low flakiness for promotion/regression testing.

## Prerequisites

- A clear target to evaluate (a `Run`, a `NodeRun`, or a specific artifact)
- A place to store the evaluation output (artifact store or run store extensions)
- A stable failure/error model (what counts as “fail” vs “inconclusive”)

## Steps

1. Define evaluation inputs:
   - the artifact(s) to inspect,
   - the expected constraints/postconditions.
2. Implement checks as pure functions (no network, no side effects).
3. Emit an `EvaluationResult` with:
   - `passed` boolean,
   - failure reasons,
   - evidence references (artifact IDs / node run IDs).

## Verify

- The evaluator produces consistent results across repeated runs (“no flake”).
- Failed evaluations are easy to debug (clear reason + evidence links).

## Troubleshooting

- Evaluation depends on non-deterministic data → move that to a rubric evaluator instead.
- Missing artifacts → ensure the producer stores outputs in the artifact store.
- Too strict → add “inconclusive” outcomes rather than guessing.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- How-to: [Build a rubric-based evaluator](./build-rubric-evaluator.md)
