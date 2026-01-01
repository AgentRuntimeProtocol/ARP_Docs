---
title: Debug using artifacts
---

:::caution Stub
This How-to is a stub. The artifact model exists (candidate sets, decisions, evaluations), but a fully polished “artifact debugger” UX is planned.
:::

## Goal

You will debug a run using the canonical artifact chain:
`CandidateSet` → `SelectionDecision` / binding decision → `EvaluationResult` → `RecoveryAction`.

## When to use this

- A run failed and you need to understand why.
- You want to audit what decisions the system made.

## Prerequisites

- Durable artifacts are enabled and stored
- You can query artifacts by `run_id` / `node_run_id`

## Steps

1. Start from the failed `node_run_id` (or the root).
2. Retrieve the candidate set(s) that were generated.
3. Retrieve the binding decision(s) and the chosen `NodeTypeRef`.
4. Retrieve the execution output artifacts.
5. Retrieve evaluation and recovery artifacts (if present).

## Verify

- You can narrate a run as a sequence of durable decisions and outputs.
- The evidence chain is complete (no “it just happened” gaps).

## Troubleshooting

- Missing links between artifacts → ensure stable IDs (`subtask_id`, `candidate_set_id`) are carried through.
- Artifacts too verbose → summarize for UI, keep full data in storage.
- Sensitive data in artifacts → enforce redaction and re-run.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- How-to: [Replay a Run](../running-work/replay-a-run.md)

