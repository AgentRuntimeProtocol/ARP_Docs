---
title: Services
sidebar_position: 1
---

ARP Standard v1 defines a set of HTTP services. This section summarizes what each service does and links to the normative OpenAPI + JSON Schema sources.

:::note Standard vs. implementation

This is the **spec**. For the JARVIS implementation details (how to run these services, CLI flags, defaults), see **JARVIS Implementation**.

:::

## Required endpoints (all services)

Each service **MUST** implement:

- `GET /v1/health`
- `GET /v1/version`

## Service map (v1)

| Service | Purpose | OpenAPI |
| --- | --- | --- |
| [Run Gateway](./run-gateway.md) | Client entrypoint for runs | `run-gateway.openapi.yaml` |
| [Run Coordinator](./run-coordinator.md) | Run authority + enforcement points | `run-coordinator.openapi.yaml` |
| [Atomic Executor](./atomic-executor.md) | Execute atomic `NodeRun`s | `atomic-executor.openapi.yaml` |
| [Composite Executor](./composite-executor.md) | Execute composite `NodeRun`s | `composite-executor.openapi.yaml` |
| [Node Registry](./node-registry.md) | Catalog `NodeType`s | `node-registry.openapi.yaml` |
| [Selection](./selection.md) | Generate bounded candidate sets | `selection.openapi.yaml` |
| [PDP](./pdp.md) | Policy decisions (optional) | `pdp.openapi.yaml` |

Required endpoints per service are defined by:

- OpenAPI documents under `ARP_Standard/spec/v1/openapi/`
- The conformance required endpoints list: `ARP_Standard/spec/v1/conformance/rules/required.md`

## Run Gateway

Purpose: client entrypoint for starting/querying/canceling runs (+ optional NDJSON streaming).

Required endpoints:

- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `POST /v1/runs/{run_id}:cancel`

Optional endpoint:

- `GET /v1/runs/{run_id}/events` (NDJSON)

OpenAPI: `ARP_Standard/spec/v1/openapi/run-gateway.openapi.yaml`

Details: [Run Gateway](./run-gateway.md)

## Run Coordinator

Purpose: the run authority. Owns `Run` + `NodeRun` lifecycle, enforcement checkpoints, scheduling/dispatch, and durable history.

Required endpoints:

- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `POST /v1/runs/{run_id}:cancel`
- `POST /v1/node-runs` (create subtasks)
- `GET /v1/node-runs/{node_run_id}`
- `POST /v1/node-runs/{node_run_id}:evaluation`
- `POST /v1/node-runs/{node_run_id}:complete`

Optional endpoints (not required for conformance):

- `GET /v1/runs/{run_id}/events` (NDJSON)
- `GET /v1/node-runs/{node_run_id}/events` (NDJSON)

OpenAPI: `ARP_Standard/spec/v1/openapi/run-coordinator.openapi.yaml`

Details: [Run Coordinator](./run-coordinator.md)

## Executors, registry, selection, PDP

These services are referenced throughout the execution fabric:

- Atomic Executor: [Atomic Executor](./atomic-executor.md)
- Composite Executor: [Composite Executor](./composite-executor.md)
- Node Registry: [Node Registry](./node-registry.md)
- Selection: [Selection](./selection.md)
- PDP: [PDP](./pdp.md)

## See also

- [Data schemas & conventions](../data-schemas.md)
- [Conformance](../conformance.md)
