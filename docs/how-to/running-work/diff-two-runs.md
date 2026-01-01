---
title: Diff two Runs
---

:::caution Stub
This How-to is a stub. A canonical “diff tool” is planned but not yet shipped in JARVIS.
:::

## Goal

You will compare two runs to find where they diverged (planner output, candidate sets, binding, execution outputs).

## When to use this

- You are debugging regressions between versions.
- You want to understand differences caused by policy or inventory changes.

## Prerequisites

- Two runs (`run_id_a`, `run_id_b`)
- Durable artifacts for both runs

## Steps

1. Compare run-level metadata:
   - root node type ref,
   - policy profile,
   - model/profile (if applicable).
2. Compare decomposition artifacts (subtask lists).
3. Compare candidate sets and binding decisions per subtask.
4. Compare node run outputs and evaluation results.

## Verify

- You can point to a small set of divergence points (not “everything is different”).

## Troubleshooting

- Too much noise → pin versions and run with fixed seeds/temperature (where supported).
- Missing correlation → ensure artifacts include stable IDs (`subtask_id`, `candidate_set_id`, `node_run_id`).
- External side effects → isolate write/irreversible nodes and treat them specially.

## Cleanup / Rollback

- None.

## Next steps

- How-to: [Replay a Run](./replay-a-run.md)
- Troubleshooting: [Evaluation flaky or inconsistent](../troubleshooting/evaluation-flaky.md)
