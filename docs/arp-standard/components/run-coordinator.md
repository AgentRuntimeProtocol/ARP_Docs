---
title: Run Coordinator
sidebar_position: 3
---

The **Run Coordinator** is the ARP Standard v1 service that acts as the **run authority**:
- owns `Run` + `NodeRun` lifecycle state
- enforces budgets/constraints and policy checkpoints
- provides durable audit surfaces (via events + stored `NodeRun`s)

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS Run Coordinator](../../jarvis/component-implementations/run-coordinator.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/run-coordinator.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Runs:

| Endpoint | Description |
| --- | --- |
| `POST /v1/runs` | Start run (`RunStartRequest` → `Run`) |
| `GET /v1/runs/{run_id}` | Get run (`Run`) |
| `POST /v1/runs/{run_id}:cancel` | Cancel run (`Run`) |

`NodeRun`s:

| Endpoint | Description |
| --- | --- |
| `POST /v1/node-runs` | Create sub-`NodeRun`s (`NodeRunsCreateRequest` → `NodeRunsCreateResponse`) |
| `GET /v1/node-runs/{node_run_id}` | Get NodeRun (`NodeRun`) |
| `POST /v1/node-runs/{node_run_id}:evaluation` | Report evaluation (`204`) |
| `POST /v1/node-runs/{node_run_id}:complete` | Complete NodeRun (`204`) |

Optional streams:

- `GET /v1/runs/{run_id}/events` (NDJSON)
- `GET /v1/node-runs/{node_run_id}/events` (NDJSON)

## Key payloads

- `Run`: `spec/v1/schemas/core/run.schema.json`
- `NodeRun`: `spec/v1/schemas/core/node_run.schema.json`
- `NodeRunsCreateRequest`: `spec/v1/schemas/run_coordinator/node_runs/node_runs_create_request.schema.json`
- `NodeRunsCreateResponse`: `spec/v1/schemas/run_coordinator/node_runs/node_runs_create_response.schema.json`

## Notes

- ARP Standard does not mandate how executors are discovered/bound; it standardizes the request/response artifacts and enforcement points.
- Implementations typically persist `NodeRun`s and emit events for audit and replay.
