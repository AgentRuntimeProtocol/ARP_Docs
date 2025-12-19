---
title: Tool Registry API Reference
sidebar_position: 3
---

Authoritative reference for the **JARVIS Tool Registry** HTTP API.

:::note Spec reference

JARVIS Tool Registry implements the ARP Standard Tool Registry API v1:

- [ARP Standard: Tool Registry](../arp-standard/components/tool-registry.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/tool-registry.openapi.yaml`

:::

## Base URL

Default: `http://127.0.0.1:8000`

Configured via:

- CLI: `arp-jarvis tool-registry --host … --port …` (or `arp-jarvis-tool-registry --host … --port …`)
- env: `TOOL_REGISTRY_HOST`, `TOOL_REGISTRY_PORT`

## Endpoints

### `GET /v1/tools`

Returns a list of `ToolDefinition` objects.

Example (built-in `core` domain tools):

```json
[
  {
    "tool_id": "tool_echo",
    "name": "echo",
    "description": "Echoes the provided text.",
    "input_schema": {
      "type": "object",
      "properties": { "text": { "type": "string" } },
      "required": ["text"],
      "additionalProperties": false
    },
    "source": "registry_local"
  }
]
```

### `GET /v1/tools/{tool_id}`

Returns the full `ToolDefinition` for the requested `tool_id`.

### `POST /v1/tool-invocations`

Invokes a tool by `tool_id` or `tool_name`.

Request body (`ToolInvocationRequest`):

```json
{
  "invocation_id": "inv_001",
  "tool_name": "calc",
  "args": { "expression": "(19*23)" }
}
```

Response body (`ToolInvocationResult`):

```json
{
  "invocation_id": "inv_001",
  "ok": true,
  "result": { "expression": "(19*23)", "value": 437 },
  "duration_ms": 1
}
```

## Error behavior (JARVIS)

### ErrorEnvelope responses

These errors return an ARP `ErrorEnvelope` (`{"error": {...}}`):

- unknown route: `404` (`route.not_found`)
- method not allowed: `405` (`request.method_not_allowed`)
- invalid JSON: `400` (`request.invalid_json`)
- invalid request shape: `400` (`request.invalid_shape`)
- unknown tool ID (lookup): `404` (`tool.not_found`)

### Invocation failures

If the invocation request is valid JSON and passes request-shape checks, the Tool Registry returns `200` with a `ToolInvocationResult`:

- `ok: true` with `result`, or
- `ok: false` with `error` (for example `tool.not_found`, `tool.invalid_args`, `tool.execution_error`, `tool.handler_error`)

### Request IDs

Every response includes an `X-Request-Id` header. You can also send your own `X-Request-Id` to propagate it through logs.
