---
title: Add budgets to composite execution
---

:::caution Stub
This How-to is a stub. JARVIS supports early constraints, but the full budget surfaces + enforcement checkpoints are still evolving.
:::

## Goal

You will configure and enforce budgets (depth, branching, retries, time, cost) to prevent runaway composite execution.

## When to use this

- You are moving from “it works” to “it’s safe to run”.
- You need predictable cost/latency bounds.

## Prerequisites

- A constraints model carried on `Run`/`NodeRun` extensions (or equivalent)
- Enforcement in `Run Coordinator` (hard structural limits) and `Composite Executor` (planner/arg-gen limits)

## Steps

1. Define run-level budgets (examples: max depth, max node runs, max runtime).
2. Define composite-level planner budgets (examples: max subtasks, max decomposition rounds).
3. Define recovery budgets (examples: max retries, max remaps).
4. Enforce budgets at decision points:
   - before creating new node runs,
   - before any irreversible action node,
   - before any LLM call that can expand work.

## Verify

- Over-budget runs fail deterministically with clear artifacts/events.
- Composite execution cannot exceed max depth/branching/steps.

## Troubleshooting

- Budgets aren’t applied → enforcement isn’t wired → validate the active policy/constraints and checkpoints.
- Planner ignores bounds → enforce after parsing; do not proceed on violations.
- Budgets too strict → loosen gradually and evaluate stability before promotion.

## Cleanup / Rollback

- Reset budgets to defaults and re-run evaluation.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Run Coordinator](../../arp-standard/components/run-coordinator.md)
- How-to: [Apply runtime budgets](../running-work/apply-runtime-budgets.md)
