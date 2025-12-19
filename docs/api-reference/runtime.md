---
title: Runtime API Reference
sidebar_position: 2
---

Authoritative reference for the **JARVIS Runtime** interfaces (HTTP + CLI).

:::note Spec reference

JARVIS Runtime implements the ARP Standard Runtime API v1:

- [ARP Standard: Runtime](../arp-standard/components/runtime.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/runtime.openapi.yaml`

:::

## HTTP server

Default base URL: `http://127.0.0.1:8081`

Run it:

```bash
arp-jarvis runtime serve --host 127.0.0.1 --port 8081
```

### `POST /v1/runs`

Request body (`RunRequest`):

```json
{ "input": { "goal": "What is (19*23)?" } }
```

Response body (`RunStatus`):

```json
{ "run_id": "run_abc123", "state": "succeeded", "started_at": "…", "ended_at": "…" }
```

:::note Execution model

JARVIS Runtime executes runs synchronously today. The returned `RunStatus` is typically already `succeeded` or `failed`.

:::

### `GET /v1/runs/{run_id}`

Returns `RunStatus`.

### `GET /v1/runs/{run_id}/result`

Returns `RunResult`.

In JARVIS, the `output` object includes:

- `final_text` (string)
- `trace_uri` (file URI to `trace.jsonl`)

### Optional endpoints (present but not implemented)

- `POST /v1/runs/{run_id}:cancel` → `409` (`not_cancelable`)
- `GET /v1/runs/{run_id}/events` → `501` (`not_implemented`)

## CLI

- `arp-jarvis runtime demo`
- `arp-jarvis runtime run --request "<text>"`
- `arp-jarvis runtime replay --trace <path> [--original]`
- `arp-jarvis runtime serve …`

Exit codes:

- `run`: exits `0` on `completed`, `1` on `failed`

## Tracing (JSONL)

The runtime writes `trace.jsonl` where each line is a JSON object with:

- `ts`: ISO timestamp
- `type`: event type
- event-specific fields (for example `tool_invocation.args`, `tool_result.result`, `llm_call.role`)

Common event types include: `flow_started`, `step_created`, `step_started`, `step_completed`, `flow_completed`, `flow_failed`, `tool_args_generated`, `tool_args_invalid`, `tool_invocation`, `tool_result`, `llm_call`, `llm_result`.
