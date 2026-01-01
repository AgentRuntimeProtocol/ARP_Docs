---
title: Create a composite node skeleton
---

:::caution Stub
This How-to is a stub. JARVIS ships a Composite Executor, but the “author a custom composite node” workflow still needs a stable template + registry story.
:::

## Goal

You will create a composite `NodeType` skeleton that follows the canonical lifecycle: decompose → map → execute → evaluate → recover.

## When to use this

- You are building a reusable orchestrator capability (planner, coder, domain workflow).
- You want bounded orchestration with durable artifacts and explicit constraints.

## Prerequisites

- A running JARVIS stack (or equivalent ARP implementation)
- A `NodeType` metadata model for composite nodes (inputs, outputs, constraints)
- A clear decision on where composite logic lives:
  - in a dedicated Composite Executor service, vs
  - in a “composite node marketplace” pack (not planned for v0.x).

## Steps

1. Define the composite node’s input schema (intent + context).
2. Define the composite node’s output schema (final result + artifact refs).
3. Implement the planner logic in the Composite Executor.
4. Register the composite `NodeType` in the Node Registry.

## Verify

- A run can start with your composite `NodeTypeRef`.
- The Composite Executor emits durable artifacts: candidate sets, binding decisions, evaluations, and recovery actions.

## Troubleshooting

- Composite node never executes → coordinator dispatch isn’t configured → confirm `JARVIS_COMPOSITE_EXECUTOR_URL` and dispatch settings.
- Empty candidate sets → selection/registry inventory is empty → validate Node Registry is seeded and Selection can reach it.
- Run stalls after creating children → durable execution loop isn’t implemented yet → start with sequential execution and add scheduling later.

## Cleanup / Rollback

- Deprecate the composite node version and roll back to the previous stable version.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Composite Executor](../../arp-standard/components/composite-executor.md)
- How-to: [Implement the decomposer](./implement-decomposer.md)
