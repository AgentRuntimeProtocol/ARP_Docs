---
title: Run multi-trial stability evaluation
---

:::caution Stub
This How-to is a stub. The JARVIS stack does not yet ship a standard multi-trial harness or a scorecard persistence model.
:::

## Goal

You will run an evaluator multiple times (pass^k-style) to measure stability and reduce flakiness before promotion.

## When to use this

- The system includes LLM steps (planner, selection ranking, arg-gen, rubric eval).
- You need “evidence” before promoting a capability to a more trusted channel.

## Prerequisites

- A deterministic test case or dataset (inputs are fixed)
- An evaluator (deterministic or rubric-based)
- A way to record results across trials (artifact store + run metadata)

## Steps

1. Define the test case(s) (input + expected outcome).
2. Run `k` independent trials (fresh runs, controlled inputs).
3. Record:
   - pass rate,
   - failure modes,
   - representative artifacts for debug.
4. Decide promotion thresholds based on stability (see next How-to).

## Verify

- Results are reproducible given the same stack version + model profile.
- Failures cluster into actionable categories (not random noise).

## Troubleshooting

- Too expensive → reduce `k` and increase only for borderline cases.
- Non-reproducible → pin model/profile and capture prompts + schemas as artifacts.
- Hidden state leaks → ensure services are stateless or reset state between trials.

## Cleanup / Rollback

- Clean up test runs if needed (depends on retention policy).

## Next steps

- How-to: [Define promotion thresholds](./define-promotion-thresholds.md)
- How-to: [Turn evaluator outputs into a Scorecard entry](./turn-eval-into-scorecard.md)
