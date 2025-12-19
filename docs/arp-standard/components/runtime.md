---
title: Runtime
sidebar_position: 2
---

The **Runtime** is the ARP service responsible for executing a **run** and producing a result.

:::note Standard vs. implementation

This page documents the ARP Standard contract. For the runnable JARVIS implementation (CLI flags, defaults, tracing), see [JARVIS Runtime](../../jarvis/component-implementations/runtime.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/runtime.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Runtime MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/runs` | Create a run (`RunRequest` → `RunStatus`) |
| `GET /v1/runs/{run_id}` | Get run status (`RunStatus`) |
| `GET /v1/runs/{run_id}/result` | Get run result (`RunResult`) |

Optional (not required for conformance):

- `POST /v1/runs/{run_id}:cancel`
- `GET /v1/runs/{run_id}/events` (SSE; each event line contains a JSON `RunEvent`)

## Key payloads

### `RunRequest`

Defined by `spec/v1/schemas/runtime/runs/run_request.schema.json`.

At minimum:

- `input.goal` (string)

Optional fields include:

- `run_id` (client-specified; otherwise server may assign)
- `input.context` and `input.data` (arbitrary objects)
- `runtime_selector` (routing hints, typically used by a daemon)
- `tool_policy` (allow/deny tool IDs)
- `limits` (timeout/max steps/max tokens)
- `metadata` and `extensions`

### `RunStatus`

Defined by `spec/v1/schemas/runtime/runs/run_status.schema.json`.

Key fields:

- `run_id`
- `state`: `queued` | `running` | `succeeded` | `failed` | `canceled`
- optional timestamps: `started_at`, `ended_at`

### `RunResult`

Defined by `spec/v1/schemas/runtime/runs/run_result.schema.json`.

Key fields:

- `run_id`
- `ok` (boolean)
- `output` (object) and/or `error`
- optional: `artifacts`, `usage`, `extensions`

### `RunEvent` (optional)

Defined by `spec/v1/schemas/runtime/runs/run_event.schema.json`.

Used by `GET /v1/runs/{run_id}/events` when the optional SSE endpoint is implemented.

## Error handling

Non-2xx responses return an `ErrorEnvelope` (see `spec/v1/schemas/common/error.schema.json`).

## See also

- [Services](./index.md)
- [Data Schemas & Conventions](../data-schemas.md)
- [Conformance](../conformance.md)
