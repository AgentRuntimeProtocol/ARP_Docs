---
title: Evaluate policy adherence as a quality gate
---

:::caution Stub
This How-to is a stub. JARVIS has policy checkpoints, but “policy adherence as evaluation evidence” is not yet fully integrated into scorecards/promotions.
:::

## Goal

You will evaluate whether a run adhered to policy (tool allowlists, data egress rules) and emit a gate-style `EvaluationResult`.

## When to use this

- You want to promote capabilities only if they respect a security posture.
- You want durable audit evidence beyond request-time allow/deny.

## Prerequisites

- Policy checkpoints enabled (`PDP` integrated)
- Durable artifacts/events for:
  - candidate sets,
  - selection/binding decisions,
  - tool invocations or outbound calls (where applicable).

## Steps

1. Choose the policy assertions you want to evaluate (e.g., “no outbound HTTP”, “no non-1P node types”).
2. Collect evidence from artifacts/events emitted by the run.
3. Emit a pass/fail evaluation with evidence references.

## Verify

- Policy violations are detectable from artifacts/events.
- The evaluation fails closed (missing evidence is treated as failure or inconclusive).

## Troubleshooting

- Missing policy events → add an emission point (or propagate more metadata).
- Policy is enforced but not observable → make checkpoint decisions durable artifacts.
- Too noisy → scope the gate to a small set of high-value checks.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- How-to: [Configure PDP integration and checkpoints](../security/configure-pdp-checkpoints.md)
