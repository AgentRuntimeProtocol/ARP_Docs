---
title: Implement streaming outputs for atomic nodes
---

:::caution Stub
This How-to is a stub. Streaming semantics are not yet standardized for ARP v1 atomic execution.
:::

## Goal

You will implement a bounded “streaming output” pattern for atomic capabilities (when outputs are incremental).

## When to use this

- Your capability produces useful incremental outputs (logs, partial results).
- You want real-time observability without waiting for full completion.

## Prerequisites

- A clear streaming contract (NDJSON, SSE, WebSocket) chosen for the implementation
- An event/artifact strategy that remains durable for replay/audit

## Steps

1. Choose a streaming transport for your implementation.
2. Emit incremental outputs as `RunEvent`s and/or artifact chunks.
3. Ensure the final `NodeRun.outputs` remains a stable summary.

## Verify

- Clients can observe incremental progress.
- Durable artifacts remain available after the run completes.

## Troubleshooting

- Stream buffering hides events → use `curl -N` for NDJSON and disable buffering.
- Outputs too large → chunk into artifact references.
- Replay loses stream detail → persist stream events durably (not just OTel).

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- How-to: [Stream run events (NDJSON)](../running-work/stream-run-events.md)

