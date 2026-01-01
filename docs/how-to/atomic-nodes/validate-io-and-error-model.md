---
title: Add input/output validation and an error model
---

:::caution Stub
This How-to is a stub. We need a standard “error codes and remediation” pattern across atomic capabilities.
:::

## Goal

You will validate inputs/outputs and use a predictable error model so failures are actionable and replayable.

## When to use this

- You are making a capability production-grade.
- You want deterministic failure modes and stable integration points.

## Prerequisites

- JSON Schema for inputs and outputs
- A shared error envelope strategy (code/message/details) for atomic execution

## Steps

1. Validate inputs against the `NodeType` input schema.
2. Validate outputs against the output schema (before completing the `NodeRun`).
3. Map known failures to stable error codes and include remediation hints.

## Verify

- Invalid inputs fail fast with actionable errors.
- Outputs are schema-valid (or errors are explicit and durable).

## Troubleshooting

- “Everything is 500” → add stable error codes for known failures.
- “Outputs are inconsistent” → validate outputs and fail deterministically when invalid.
- “Hard to debug” → ensure errors are emitted to the Event Stream and referenced in artifacts.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [ARP Standard: Atomic Executor](../../arp-standard/components/atomic-executor.md)
- How-to: [Build an atomic node in Python](./build-atomic-node-python.md)

