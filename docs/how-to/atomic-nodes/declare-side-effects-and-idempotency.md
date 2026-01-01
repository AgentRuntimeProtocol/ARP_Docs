---
title: Declare side effects and idempotency
---

:::caution Stub
This How-to is a stub. Side-effect classes exist in design, but enforcement patterns are still being stabilized in the stack.
:::

## Goal

You will declare a node’s side-effect class and idempotency posture so retries are safe and policy can reason about risk.

## When to use this

- You are authoring a node that can mutate external state (write/irreversible).
- You need safe retry semantics for durable execution.

## Prerequisites

- A `NodeType` metadata model that includes side-effect class and idempotency hints
- A policy/checkpoint strategy for “pre-irreversible action”

## Steps

1. Classify the node as `read`, `write`, or `irreversible`.
2. Define an idempotency key strategy (request-level / resource-level).
3. Ensure retries are safe (or explicitly disallowed) and observable in artifacts.

## Verify

- Retries do not duplicate side effects.
- Policy can deny irreversible actions unless explicitly allowed.

## Troubleshooting

- “Duplicate write” incidents → idempotency is missing → require idempotency keys and enforce them in the handler.
- Policy denies unexpectedly → you marked a node as `write`/`irreversible` → update policy profile or node classification.
- Ambiguous side effects → split a node into smaller capabilities with clearer semantics.

## Cleanup / Rollback

- Deprecate a risky node version and roll back to a safe version.

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [ARP Standard: PDP](../../arp-standard/components/pdp.md)
- How-to: [Configure PDP checkpoints](../security/configure-pdp-checkpoints.md)

