---
title: Candidate Sets — Bounded Action Spaces
sidebar_position: 2
---

Most agent systems fail in production because the “action space” is effectively unbounded: the model can choose from too many tools, too many plans, and too many unsafe paths.

ARP’s core reliability mechanism is to **bound** the next-step action space using **candidate sets**.

## What is a candidate set?

A **`CandidateSet`** is a ranked list of `NodeTypeRef`s that are plausible ways to fulfill a subtask.

It is typically produced by the **`Selection`** service by combining:
- the `Node Registry` inventory (what `NodeType`s exist),
- constraints (what `NodeType`s are allowed/denied, max candidates),
- optional heuristics or LLM ranking.

## Who uses it?

In the JARVIS reference stack:
- **`Composite Executor`** decomposes a composite `NodeRun` into subtasks.
- For each subtask, it calls **`Selection`** to get a bounded candidate set.
- It then makes a **binding decision** (pick one candidate) and (separately) generates the concrete input parameters for that `NodeType`.

## Why not have `Selection` return “the one best node type”?

Returning a bounded candidate set keeps the system more robust:
- the binding layer can apply additional constraints (policy, budgets, runtime availability),
- candidate sets are durable artifacts (useful for audit and evaluation),
- a candidate set can be re-bound deterministically during replay/testing.

## Constraints that bound action space

Constraints can be applied at multiple layers:
- **Selection-time bounds**: max candidates per subtask; allow/deny lists.
- **Coordinator enforcement**: hard structural limits (max depth, max total nodes) and dispatch allow/deny.
- **Policy checkpoints**: allow/deny decisions at well-defined points (for example `node.run.execute`).

:::note Not “policy-only”

Policies answer “is this allowed?” Candidate sets and structural constraints answer “what are the options, and how big can the plan get?”

:::

## Where to go next

- How-to: [Implement “discovery as a capability”](../../how-to/composite-nodes/discovery-as-capability.md)
- Concept: [Policy Checkpoints](./policy-checkpoints.md)
- Reference: [ARP Standard: Selection](../../arp-standard/components/selection.md)
- JARVIS behavior: [Selection Service](../../jarvis/component-implementations/selection-service.md)
