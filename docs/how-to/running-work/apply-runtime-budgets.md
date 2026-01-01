---
title: Apply runtime budgets
---

:::caution Stub
This How-to is a stub. JARVIS has early constraint propagation, but the full budget enforcement surface is still evolving.
:::

## Goal

You will apply runtime budgets (depth, branching, retries, timeouts) so runs cannot spiral into runaway execution.

## When to use this

- You want predictable cost and latency.
- You need safety bounds for production.

## Prerequisites

- Budgets/constraints represented as `Run`/`NodeRun` extensions (or equivalent)
- Enforcement points in:
  - `Run Coordinator` (structural limits),
  - `Composite Executor` (planner/arg-gen bounds),
  - `Atomic Executor` (timeouts/IO limits).

## Steps

1. Set default budgets for the stack (environment/profile).
2. Pass budgets through the request chain (gateway → coordinator → executors).
3. Enforce budgets before:
   - creating new node runs,
   - making LLM calls,
   - executing irreversible actions.

## Verify

- Over-budget execution fails deterministically.
- Budget failures are visible as events/artifacts (for debugging).

## Troubleshooting

- Budgets missing → ensure extension propagation is implemented end-to-end.
- Budgets too strict → tune gradually and validate with evaluation runs.
- Budgets too loose → tighten and add policy gates for irreversible actions.

## Cleanup / Rollback

- Reset budgets to defaults and re-run.

## Next steps

- How-to: [Add budgets to composite execution](../composite-nodes/add-budgets.md)
- How-to: [Composite node loops or stalls](../troubleshooting/composite-loops-or-stalls.md)
