---
title: Build a rubric-based evaluator
---

:::caution Stub
This How-to is a stub. Rubric evaluation requires an LLM provider and careful prompt/schema design; the JARVIS “official rubric harness” is not yet stabilized.
:::

## Goal

You will build a rubric-based evaluator (LLM-assisted) for outputs that cannot be judged deterministically.

## When to use this

- The output is subjective or multi-dimensional (helpfulness, completeness, tone).
- Deterministic checks would be brittle or incomplete.

## Prerequisites

- An LLM provider configured (recommended: `arp-llm` with a known profile)
- A rubric (criteria + scoring) and a strict JSON output schema
- A strategy for controlling randomness (temperature, retries, majority vote)

## Steps

1. Write a rubric with explicit criteria and scoring guidance.
2. Design a strict JSON output schema (score + reasons + evidence).
3. Call the LLM with structured output enabled and validate the result schema.
4. Persist the `EvaluationResult` and any LLM trace artifacts.

## Verify

- The evaluator output is schema-valid JSON.
- The evaluator is stable across multiple trials (or you record uncertainty explicitly).

## Troubleshooting

- Flaky scores → run multi-trial evaluation and aggregate.
- Invalid JSON → tighten schema + add bounded repair retries.
- Prompt injection via evaluated content → treat evaluated content as untrusted; isolate it from system instructions.

## Cleanup / Rollback

- None.

## Next steps

- How-to: [Run multi-trial stability evaluation](./run-multi-trial-evaluation.md)
- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
