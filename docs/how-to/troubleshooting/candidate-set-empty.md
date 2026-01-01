---
title: Fix “candidate set is empty”
---

:::caution Stub
This How-to is a stub. Candidate sets are implemented, but “one canonical debug path” is still being refined as inventory + policy + ranking evolve.
:::

## Goal

You will debug empty `CandidateSet` results by checking registry inventory, selection constraints, and selection-time policy filtering.

## When to use this

- `Selection` returns a candidate set with `candidates=[]`.
- Composite execution fails because no candidates exist.

## Prerequisites

- Access to `Selection Service` logs
- Ability to list node types from `Node Registry`
- PDP logs if selection-time policy filtering is enabled

## Steps

1. Confirm `Node Registry` has inventory:
   - How-to: [List NodeTypes](../node-registry/list-node-types.md)
2. Confirm `Selection Service` can reach `Node Registry` (network + URL).
3. Confirm constraints:
   - max candidates not set to `0`,
   - allow/deny lists not filtering everything.
4. Confirm policy filtering isn’t denying all candidates.

## Verify

- The same subtask produces a non-empty candidate set after fixing inventory/constraints/policy.

## Troubleshooting

- Inventory empty → seed registry from node packs and restart.
- Policy denies everything → switch to a dev profile to isolate policy vs selection ranking.
- Ranking is too strict → return a small ranked set and let binding decide.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- How-to: [Implement the mapper](../composite-nodes/implement-mapper.md)

