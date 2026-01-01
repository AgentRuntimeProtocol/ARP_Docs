---
title: Fix “evaluation flaky or inconsistent”
---

:::caution Stub
This How-to is a stub. Evaluator authoring is still evolving; this page captures the intended debugging workflow.
:::

## Goal

You will reduce evaluator flakiness by controlling inputs, running multi-trial evaluations, and separating deterministic vs rubric checks.

## When to use this

- A capability passes sometimes and fails sometimes for the same test.
- Rubric evaluation scores vary widely.

## Prerequisites

- A test case/dataset with fixed inputs
- An evaluator (deterministic or rubric-based)
- An LLM profile pinned (for rubric-based evaluation)

## Steps

1. Make inputs deterministic (pin versions, fix prompts, remove external variability).
2. Prefer deterministic checks where possible.
3. For rubric evaluation:
   - run `k` trials,
   - aggregate results and record uncertainty.
4. Treat missing evidence as failure or inconclusive (avoid guessing).

## Verify

- The evaluation result is stable enough to support promotion decisions.

## Troubleshooting

- External dependencies → mock or record as artifacts.
- Prompt drift → pin prompts and schemas; store them as artifacts.
- Too subjective → refine rubric criteria and scoring guidance.

## Cleanup / Rollback

- None.

## Next steps

- How-to: [Run multi-trial stability evaluation](../evaluators/run-multi-trial-evaluation.md)
- How-to: [Define promotion thresholds](../evaluators/define-promotion-thresholds.md)

