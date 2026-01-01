---
title: Enforce CandidateSet bounds
---

:::caution Stub
This How-to is a stub. JARVIS emits candidate sets, but the end-to-end “hard enforcement” story (selection-time + coordinator-time) is still being stabilized.
:::

## Goal

You will ensure execution stays within the bounded `CandidateSet` produced for each subtask.

## When to use this

- You are moving from “agentic” to “bounded + auditable”.
- You want deterministic replay and policy enforcement on tool choice.

## Prerequisites

- `Selection` emits bounded candidate sets (max candidates, filtering)
- `Composite Executor` records binding decisions against a candidate set
- `Run Coordinator` enforces that the chosen `NodeTypeRef` is within the candidate set

## Steps

1. Configure `Selection` to return bounded candidate sets (strict max size).
2. In `Composite Executor`, always bind from within the candidate set (never “invent” node types).
3. In `Run Coordinator`, validate:
   - candidate set exists,
   - chosen `NodeTypeRef` is a member,
   - policy allows execution.

## Verify

- Attempts to execute a `NodeTypeRef` not in the candidate set are rejected deterministically.
- Artifacts clearly show `CandidateSet` → binding decision → execution.

## Troubleshooting

- Candidate set not available at enforcement point → propagate `candidate_set_id` and fetch the set from storage.
- Candidate set too permissive → tighten filtering in selection or policy.
- “Planner bypass” → treat any non-candidate execution as policy violation.

## Cleanup / Rollback

- None.

## Next steps

- How-to: [Apply runtime budgets](./apply-runtime-budgets.md)
- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
