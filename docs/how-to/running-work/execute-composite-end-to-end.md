---
title: Execute a composite node end-to-end
---

:::caution Stub
This How-to is a stub. JARVIS can run composites, but the “one canonical demo composite” and its full artifact walkthrough is still being refined.
:::

## Goal

You will execute a composite workflow end-to-end and inspect the resulting artifacts: decomposition, candidate sets, binding decisions, and node run outputs.

## When to use this

- You want to validate the whole stack (gateway → coordinator → CE → selection → AE).
- You are debugging planning or selection behavior.

## Prerequisites

- A running JARVIS stack (recommended: `JARVIS_Release`)
- A composite planner `NodeTypeRef` available in `Node Registry`
- `Run Store`, `Event Stream`, and `Artifact Store` reachable by the coordinator

## Steps

1. Start a run with a composite planner root:
   - How-to: [Start a Run (Run Gateway)](./start-a-run.md)
2. Watch events (optional but recommended):
   - How-to: [Stream run events (NDJSON)](./stream-run-events.md)
3. Fetch artifacts for the run:
   - candidate sets,
   - binding decisions,
   - node run outputs.

## Verify

- The run reaches a terminal state (success/failure).
- You can trace each child node run to:
  - a candidate set,
  - a binding decision,
  - an execution result.

## Troubleshooting

- Run stalls → dispatch/scheduling missing or misconfigured → check coordinator logs.
- Candidate sets empty → registry inventory/policy filtered everything → validate registry + selection + PDP.
- Executor failures → invoke the atomic node directly to isolate.

## Cleanup / Rollback

- Optional: reset local state.
  - How-to: [Reset local state](../local-dev/reset-local-state.md)

## Next steps

- How-to: [Enforce candidate set bounds](./enforce-candidate-set-bounds.md)
- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
