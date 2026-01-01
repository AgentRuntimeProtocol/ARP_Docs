---
title: Composite Executor
sidebar_position: 5
---

The **`Composite Executor`** is the ARP Standard v1 service that executes **composite `NodeRun`s**.

Composite execution is intentionally implementation-defined (planner/evaluator/recovery strategies vary). ARP Standard focuses on standardizing:
- the on-wire requests/responses
- the artifacts emitted (candidate sets, binding decisions, evaluations, recovery actions)
- the enforcement points (coordinator + policy checkpoints)

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS Composite Executor](../../jarvis/component-implementations/composite-executor.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/composite-executor.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Composite Executor MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/node-runs/{node_run_id}:begin` | Begin executing a composite `NodeRun` |

## Notes

- Composite executors typically:
  - decompose a task into subtasks (plan)
  - call `Selection` to produce bounded candidate sets
  - generate arguments for chosen node types
  - request `NodeRun` creation via the coordinator
  - observe execution outcomes and report evaluation/recovery
