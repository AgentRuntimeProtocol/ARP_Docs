---
title: Atomic Executor
sidebar_position: 4
---

The **`Atomic Executor`** is the ARP Standard v1 service that executes **atomic `NodeRun`s**.

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS Atomic Executor](../../jarvis/component-implementations/atomic-executor.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/atomic-executor.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Atomic Executor MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/node-runs/{node_run_id}:execute` | Execute an atomic `NodeRun` (request/response defined by schema) |

## Key payloads

See the OpenAPI file for the exact request/response schemas and error envelopes:
- `spec/v1/openapi/atomic-executor.openapi.yaml`

## Notes

- The executor should treat the coordinator as the source of truth for `NodeRun` state.
- The executor is responsible for producing `outputs` and/or `output_artifacts` for a `NodeRun`.
