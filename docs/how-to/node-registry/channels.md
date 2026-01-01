---
title: Use channels for capability routing
---

:::caution Stub
This How-to is a stub. A channel model is planned for JARVIS, but routing semantics are not yet fully implemented end-to-end.
:::

## Goal

You will use channels (`experimental` → `candidate` → `stable`) to control which `NodeType` versions are eligible for selection/execution.

## When to use this

- You want to test new versions without impacting production runs.
- You need a safe rollout story for capability evolution.

## Prerequisites

- A channel model and routing rules (default channel per environment)
- A way for `Selection` (and/or `PDP`) to filter candidates based on channel

## Steps

1. Define channels and what they mean operationally.
2. Assign versions to channels (start new versions as `experimental`).
3. Configure `Selection` to prefer/allow specific channels.
4. Promote/demote versions by moving channel assignments.

## Verify

- `Selection` candidate sets respect channel filters.
- You can promote a version without changing code (metadata-only change).

## Troubleshooting

- Wrong version selected → tighten channel filters and pin versions during debug.
- Channels ignored → ensure the filter is applied in `Selection` and/or `PDP`.
- Promotions are noisy → require evaluator evidence + decision record.

## Cleanup / Rollback

- Demote the version and re-run evaluation.

## Next steps

- How-to: [Attach Scorecards](./attach-scorecards.md)
- How-to: [Promotion workflow](./promotion-workflow.md)
