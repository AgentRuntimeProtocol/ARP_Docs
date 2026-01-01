---
title: Capabilities and Nodes
sidebar_position: 1
---

In COP, a “capability” is something your system can reliably do — reliably enough to **evaluate**, **publish**, and **reuse** with evidence.

ARP Standard turns that COP idea into concrete, versioned objects:
- capabilities are published as **`NodeType`** records (catalog entries),
- executions are recorded as **`NodeRun`** records (instances with inputs/outputs/events).

## The core objects

- **`NodeType`**: a catalog entry describing *what* can be executed.
  - Includes: `node_type_id`, `version`, `kind` (`atomic` or `composite`), and schemas (inputs/outputs).
- **`NodeTypeRef`**: a stable reference to a `NodeType` (`node_type_id`, `version`).
- **`NodeRun`**: a single execution instance of a `NodeType`.
  - Includes: `node_run_id`, `run_id`, `state`, `inputs`, `outputs`, and `extensions`.
- **`Run`**: the top-level “unit of work” started by a client.
  - Includes: `run_id`, `state`, and a `root_node_run_id` that anchors the `NodeRun` tree.

:::note Standard vs. implementation

These objects and their wire shapes are defined by ARP Standard schemas. Implementations decide *how* `NodeRun`s are scheduled, executed, and stored.

:::

## Atomic vs composite

- **Atomic `NodeType`s** represent leaf work: “do one thing and return outputs.”
  - Executed by an **`Atomic Executor`**.
- **Composite `NodeType`s** represent orchestration/planning work: “turn a goal into more `NodeRun`s.”
  - Executed by a **`Composite Executor`**.

In the JARVIS reference stack:
- the `Run Coordinator` is the **authority** that creates and tracks `NodeRun`s,
- executors are **stateless** (they don’t store `NodeRun` state durably).

## Starting a run

A run starts by choosing a root `NodeTypeRef` and an input payload:

- client calls **`Run Gateway`** `POST /v1/runs` (client entrypoint),
- Run Gateway forwards to **`Run Coordinator`** `POST /v1/runs` (run authority),
- Run Coordinator creates the `Run` + root `NodeRun`, then dispatches it to the right executor.

## Where to go next

- How-to: [Start a run (Run Gateway)](../../how-to/running-work/start-a-run.md)
- How-to: [List node types (Node Registry)](../../how-to/node-registry/list-node-types.md)
- Concept: [Candidate Sets](./candidate-sets.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- Reference: [ARP Standard: Node Registry](../../arp-standard/components/node-registry.md)
