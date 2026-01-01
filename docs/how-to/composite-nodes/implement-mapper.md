---
title: Implement the mapper
---

:::caution Stub
This How-to is a stub. JARVIS has a working mapper (Selection → binding → arg-gen), but the user-facing authoring story is still evolving.
:::

## Goal

You will map each subtask to a bounded `CandidateSet`, bind to a specific `NodeTypeRef`, and generate the concrete input for the chosen node.

## When to use this

- You want a clean separation of responsibilities:
  - `Selection` produces a bounded menu (`CandidateSet`),
  - the composite executor performs binding + argument generation.

## Prerequisites

- A running `Selection` service that can query `Node Registry` inventory
- A binding strategy (deterministic first; LLM-assisted later)
- An argument generation (arg-gen) schema for each target `NodeType` input

## Steps

1. For each subtask, call `Selection` to get a bounded `CandidateSet`.
2. Choose one candidate (binding decision) and record it as an artifact/event.
3. Run arg-gen to produce the concrete input JSON for the chosen `NodeTypeRef`.
4. Create the child `NodeRun` via `Run Coordinator`.

## Verify

- Each subtask produces:
  - a `CandidateSet` artifact,
  - a binding decision artifact,
  - an arg-gen artifact (inputs for the chosen node).
- Child `NodeRun`s are created with schema-valid inputs.

## Troubleshooting

- Empty candidate set → inventory/policy/constraints filtered everything → validate `Node Registry` seeding + `Selection` configuration.
- Binding picks a wrong node → keep binding deterministic and conservative until eval/recovery loops are mature.
- Arg-gen produces invalid inputs → fail closed; trigger recovery (remap or retry with bounds).

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Selection](../../arp-standard/components/selection.md)
- How-to: [Implement recovery actions](./implement-recovery-actions.md)
