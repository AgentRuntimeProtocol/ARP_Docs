---
title: Implement recovery actions
---

:::caution Stub
This How-to is a stub. JARVIS models recovery actions as artifacts/events, but the supported recovery catalog is not yet stabilized.
:::

## Goal

You will implement bounded recovery actions (`retry`, `remap`, `escalate`, `abort`) and record them as durable artifacts.

## When to use this

- A subtask fails and you need deterministic “what happens next”.
- You want replayable debugging (recovery decisions are durable, not ephemeral).

## Prerequisites

- A recovery action schema
- Budgets for recovery (max retries, max remaps, max total node runs)
- An enforcement point that prevents infinite loops

## Steps

1. Define the supported recovery actions for the executor (start small).
2. On failure, choose a recovery action within budget.
3. Emit a recovery artifact/event and apply it deterministically:
   - `retry` → re-run the same node run (idempotency required),
   - `remap` → pick another candidate and regenerate args,
   - `escalate` → produce an “operator required” artifact,
   - `abort` → fail the composite node run.

## Verify

- Failures always produce a recovery artifact/event.
- Recovery does not exceed budgets and cannot loop indefinitely.

## Troubleshooting

- Infinite retries/remaps → enforce max retries/remaps and fail closed.
- Recovery is non-deterministic → record the action + rationale in the artifact payload.
- Recovery needs approval semantics → integrate `PDP` “require approval” later.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [ARP Standard: Run Coordinator](../../arp-standard/components/run-coordinator.md)
- How-to: [Add budgets to composite execution](./add-budgets.md)
