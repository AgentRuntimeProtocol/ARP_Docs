---
title: Implement the decomposer
---

:::caution Stub
This How-to is a stub. JARVIS implements decomposition in `Composite Executor`, but we have not yet stabilized a public “decomposer authoring” surface beyond the internal planner prompt + JSON schema.
:::

## Goal

You will implement bounded decomposition: turning a composite goal into a small set of subtasks while enforcing depth/branch limits.

## When to use this

- You are authoring a planner-style composite node (general planner, coder planner, domain planner).
- You want deterministic safety bounds (no unbounded action space).

## Prerequisites

- A running `Composite Executor` implementation
- A constraints model (examples: max depth, max subtasks, max decomposition rounds)
- A structured planner output schema (strict JSON)
- An LLM provider configured (default `openai`, or opt into `dev-mock` for offline tests)

## Steps

1. Define the planner output schema as strict JSON (subtasks list with stable IDs).
2. Write a planner system prompt that:
   - repeats the hard bounds explicitly,
   - disallows side quests,
   - emits only schema-valid JSON.
3. Enforce bounds after parsing:
   - reject outputs that violate bounds,
   - record the failure as an artifact/event,
   - (optional) retry with a bounded “repair” prompt.

## Verify

- The decomposer output is schema-valid JSON.
- Decomposition never exceeds the configured max subtasks/depth/rounds.

## Troubleshooting

- Invalid JSON → tighten schema + add bounded repair retries.
- Too many subtasks → enforce bounds after parsing and fail deterministically.
- Planner ignores constraints → treat violations as errors; do not “best effort” execute.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Composite Executor](../../arp-standard/components/composite-executor.md)
- How-to: [Implement the mapper](./implement-mapper.md)
