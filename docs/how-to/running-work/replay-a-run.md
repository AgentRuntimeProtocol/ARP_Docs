---
title: Replay a Run
---

:::caution Stub
This How-to is a stub. JARVIS emits durable artifacts, but a first-class “replay API” is not yet implemented.
:::

## Goal

You will replay a run with the same inputs and compare outputs to debug regressions.

## When to use this

- You want deterministic regression testing across stack versions.
- You need to debug “why did it do that?” with stable inputs.

## Prerequisites

- A run with durable artifacts (candidate sets, decisions, outputs)
- A way to re-run with pinned versions (recommended: `JARVIS_Release` pinning)

## Steps

1. Identify the run to replay (`run_id`).
2. Capture the exact inputs and the pinned stack/node versions.
3. Start a new run with the same inputs and pins.
4. Compare artifacts and outputs.

## Verify

- The replay run completes and produces comparable artifacts.
- Differences are explainable (version change, policy change, model/profile change).

## Troubleshooting

- Non-determinism → pin model/profile and reduce LLM variability.
- Missing artifacts → ensure artifact emission is enabled and stored durably.
- External dependencies changed → record external inputs as artifacts or mock them.

## Cleanup / Rollback

- Optional: delete replay runs according to retention policy.

## Next steps

- How-to: [Diff two runs](./diff-two-runs.md)
- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
