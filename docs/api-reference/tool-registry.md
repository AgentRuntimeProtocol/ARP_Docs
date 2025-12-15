---
title: Tool Registry API Reference
sidebar_position: 3
---

Authoritative reference for Tool Registry public APIs (HTTP APIs and/or config schema).

## Interfaces

Base URL defaults to `http://127.0.0.1:8000` (configurable via `TOOL_REGISTRY_HOST` / `TOOL_REGISTRY_PORT`).

### `GET /v1/tools`

Returns a minimal planner view (list of `{name, description}`):

```json
[
  {"name":"echo","description":"Echoes the provided text."},
  {"name":"calc","description":"Evaluate a simple arithmetic expression."}
]
```

### `GET /v1/tools/{name}`

Returns the full `ToolDefinition` (see schema below).

### `POST /v1/tools/{name}:invoke`

Invokes a tool. Request body (MVP) is a `ToolInvocationRequest`:

```json
{"schema_version":"0.1.0","args":{ /* tool args */ },"context":{},"trace":{}}
```

Response is a normalized `ToolResult`:

```json
{"schema_version":"0.1.0","ok":true,"result":{ /* tool result */ },"metrics":{"latency_ms":12}}
```

## Tool schema

Tool Registry uses the shared schemas from `jarvis-model`:

- `ToolDefinition`
  - required: `schema_version`, `name`, `description`, `version`, `parameters`
  - optional: `returns`, `tags`, `source`
- `ToolInvocationRequest`
  - required: `schema_version`, `args`
  - optional: `context`, `trace`
- `ToolResult`
  - required: `schema_version`, `ok`
  - optional: `result`, `error`, `metrics`, `summary`
- `Error`
  - required: `schema_version`, `code`, `message`, `retryable`
  - optional: `details`, `cause`

## Errors

### Error codes

Common Tool Registry error codes include:

- Routing / request shape:
  - `route.not_found`
  - `request.method_not_allowed`
  - `request.invalid_json`
  - `request.invalid_shape`
- Tool invocation:
  - `tool.not_found`
  - `tool.invalid_args`
  - `tool.execution_error` (expected tool error via `ValueError`)
  - `tool.handler_error` (unexpected exception in the tool handler)

### Status code mapping (invocation)

For `POST /v1/tools/{name}:invoke`:

- `200`: `ToolResult.ok == true`
- `400`: `tool.invalid_args` or request-shape problems
- `404`: `tool.not_found`
- `500`: execution/handler errors
