---
title: Invoke an atomic node directly for debugging
---

:::caution Stub
This How-to is a stub. JARVIS supports atomic execution, but the “direct invoke for debugging” surface is not yet standardized across stacks.
:::

## Goal

You will invoke an atomic capability directly as a debugging path (bypassing full composite planning).

## When to use this

- You are developing a new atomic node and want fast feedback.
- You want to isolate failures (node execution vs coordinator orchestration).

## Prerequisites

- A running `Atomic Executor` service
- A target `NodeTypeRef` for an atomic node
- A schema-valid input JSON for that node type

## Steps

1. Choose the `NodeTypeRef` (example: `jarvis.core.uuid_v4@<version>`).
2. Call the atomic executor endpoint (implementation-defined) with:
   - `node_type_ref`,
   - `input`,
   - `run_id` / `node_run_id` context (if required).

## Verify

- You get a successful response (or a structured error) from the executor.
- The result is recorded as an artifact (or included in the response).

## Troubleshooting

- `404` for node type → the executor does not have the node pack installed.
- Schema errors → validate input JSON against the node’s schema.
- Policy denies execution → confirm PDP policy and node metadata (trust tier, side effects).

## Cleanup / Rollback

- None.

## Next steps

- How-to: [Start a Run (Run Gateway)](./start-a-run.md)
- How-to: [Execute a composite node end-to-end](./execute-composite-end-to-end.md)
