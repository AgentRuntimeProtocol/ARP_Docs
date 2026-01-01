---
title: Wrap an LLM call as an atomic node
---

:::caution Stub
This How-to is a stub. We need a stable pattern for “LLM as an atomic capability” with structured output + budgets.
:::

## Goal

You will expose an LLM interaction as a bounded atomic capability with deterministic envelopes (structured output and error model).

## When to use this

- You want a reusable, auditable “LLM-powered capability” (extract, classify, summarize).
- You want to keep planners and selectors focused on orchestration, not raw prompting.

## Prerequisites

- A JARVIS stack with `arp-llm` configured (or a compatible provider)
- A defined response schema for structured outputs

## Steps

1. Define a response schema (JSON Schema) for the node output.
2. Implement the node handler using `arp-llm` structured response helpers.
3. Register the `NodeType` and validate selection behavior.

## Verify

- Outputs are schema-valid.
- Costs/timeouts are bounded and visible in artifacts/events.

## Troubleshooting

- Model returns invalid JSON → tighten schema + add retry-with-repair (bounded retries).
- Costs spike → enforce budgets (token caps, max retries) and emit cost artifacts.
- Selection keeps picking the LLM node for everything → constrain via metadata + policy/selection rules.

## Cleanup / Rollback

- Deprecate the node or move it to an experimental channel.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Atomic Executor](../../arp-standard/components/atomic-executor.md)
- How-to: [Add budgets to composite execution](../composite-nodes/add-budgets.md)

