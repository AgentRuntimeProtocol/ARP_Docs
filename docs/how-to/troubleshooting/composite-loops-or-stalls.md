---
title: Fix “composite node loops or stalls”
---

:::caution Stub
This How-to is a stub. JARVIS supports budgets and recovery artifacts, but durable scheduling and loop prevention are still evolving.
:::

## Goal

You will stop composite execution loops/stalls by tuning budgets, tightening recovery, and inspecting artifacts.

## When to use this

- A run keeps creating more node runs without finishing.
- A composite node run never reaches a terminal state.

## Prerequisites

- Budgets/constraints enabled
- Access to artifacts/events for the run

## Steps

1. Inspect decomposition output (subtasks) for runaway expansion.
2. Inspect recovery actions for repeated retries/remaps.
3. Tighten budgets:
   - max depth,
   - max subtasks,
   - max decomposition rounds,
   - max retries/remaps.
4. Fail closed when budgets are exceeded.

## Verify

- The run terminates deterministically (success or safe failure).

## Troubleshooting

- Planner keeps expanding → enforce hard bounds after parsing.
- Binding keeps choosing failing nodes → add remap limits and better candidate filtering.
- Stalls after creating children → scheduling/dispatch issue → inspect coordinator dispatch configuration.

## Cleanup / Rollback

- Reset budgets to defaults after fixing root cause.

## Next steps

- How-to: [Apply runtime budgets](../running-work/apply-runtime-budgets.md)
- How-to: [Implement recovery actions](../composite-nodes/implement-recovery-actions.md)
