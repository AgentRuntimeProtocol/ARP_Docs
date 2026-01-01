---
title: Define promotion thresholds
---

:::caution Stub
This How-to is a stub. The v0.x JARVIS stack is still stabilizing; thresholds are planned but not yet enforced automatically.
:::

## Goal

You will define clear promotion thresholds for `experimental` → `candidate` → `stable` capability channels.

## When to use this

- You have baseline evaluation data and want consistent promotion decisions.
- You want to reduce “it seems good” subjectivity.

## Prerequisites

- A channel model (`experimental`, `candidate`, `stable`)
- Evaluation metrics (deterministic + rubric + stability)
- A decision process (human approval now; automation later)

## Steps

1. Choose the metrics that matter (pass rate, stability, policy adherence).
2. Set minimum thresholds per channel (start conservative).
3. Record the thresholds as a decision record and apply consistently.

## Verify

- Two reviewers using the same data reach the same promotion decision.
- Promotions are reversible (rollback strategy exists).

## Troubleshooting

- Thresholds too strict → start with `candidate` and tighten gradually.
- Thresholds too loose → require higher `k` or stricter policy gates.
- Mixed workloads → define thresholds per capability class (read-only vs write/irreversible).

## Cleanup / Rollback

- Revise thresholds only via a versioned decision record.

## Next steps

- How-to: [Promotion workflow](../node-registry/promotion-workflow.md)
- How-to: [Deprecate / rollback a capability version](../node-registry/deprecate-rollback.md)

