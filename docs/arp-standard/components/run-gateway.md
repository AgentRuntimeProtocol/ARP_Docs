---
title: Run Gateway
sidebar_position: 2
---

The **Run Gateway** is the client-facing ARP Standard v1 service for starting and querying runs.

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see the JARVIS Run Gateway docs: [JARVIS Run Gateway](../../jarvis/component-implementations/run-gateway.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/run-gateway.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Run Gateway MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/runs` | Start run (`RunStartRequest` → `Run`) |
| `GET /v1/runs/{run_id}` | Get run (`Run`) |
| `POST /v1/runs/{run_id}:cancel` | Cancel run (`Run`) |

Optional:

- `GET /v1/runs/{run_id}/events` (NDJSON; `RunEvent` per line)

## Key payloads

- `RunStartRequest`: `spec/v1/schemas/run_gateway/runs/run_start_request.schema.json`
  - required: `root_node_type_ref`, `input`
- `Run`: `spec/v1/schemas/core/run.schema.json`

## Notes

- The gateway is intended to be **thin**: it can validate/authenticate at the edge, normalize context, and forward to a `Run Coordinator`.
- ARP Standard does not require that the gateway be stateful.
