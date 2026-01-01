---
title: Capability Lifecycle
sidebar_position: 1
---

COP treats capability development as a lifecycle. ARP/JARVIS support this lifecycle with durable artifacts and stable interfaces (for example publishing a capability as a versioned **`NodeType`**).

## Lifecycle (high level)

1) **Define**: describe a capability (what it does, schemas, side effects).
2) **Implement**: write the atomic/composite node implementation.
3) **Evaluate**: run deterministic tests and/or rubric-based evaluation; collect artifacts.
4) **Publish**: register the `NodeType` in `Node Registry`.
5) **Promote**: gate “stable” vs “experimental” via scorecards and policy.
6) **Reuse**: selection + planners prefer promoted capabilities; build larger workflows from smaller proven ones.
7) **Operate**: monitor regressions, rollback, and re-evaluate continuously.

## What the stack provides today (v0.x)

JARVIS v0.3.x focuses on the execution fabric and core artifacts:
- `NodeType`s, `NodeRun`s, `Run`s
- candidate sets and binding metadata
- durable event streams and artifact references
- policy checkpoints for allow/deny enforcement

Evaluation “promotion gates” are tracked as design intent and will expand as the core stabilizes.

## Where to go next

- ARP objects and artifacts: [ARP Concepts](../concepts/index.md)
- JARVIS components: [JARVIS](../../jarvis/index.md)
