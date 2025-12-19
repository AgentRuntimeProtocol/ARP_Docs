---
title: Tool Registry
sidebar_position: 1
---

The **Tool Registry** is the ARP service responsible for **tool discovery** and **tool invocation**.

:::note Standard vs. implementation

This page documents the ARP Standard contract. For the runnable JARVIS implementation (CLI, defaults, domain loading), see [JARVIS Tool Registry](../../jarvis/component-implementations/tool-registry.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/tool-registry.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Tool Registry MUST implement:

| Endpoint | Description |
| --- | --- |
| `GET /v1/tools` | List tools as `ToolDefinition[]` |
| `GET /v1/tools/{tool_id}` | Fetch a tool definition by `tool_id` |
| `POST /v1/tool-invocations` | Invoke a tool by `tool_id` or `tool_name` |

## Key payloads

### `ToolDefinition`

Defined by `spec/v1/schemas/tool_registry/tools/tool_definition.schema.json`.

Required fields:

- `tool_id` (string)
- `name` (string)
- `input_schema` (JSON Schema object)
- `source` (`registry_local` | `remote`)

Optional fields include `description`, `output_schema`, `metadata`, and `extensions`.

### `ToolInvocationRequest`

Defined by `spec/v1/schemas/tool_registry/tools/tool_invocation_request.schema.json`.

Required fields:

- `invocation_id` (string)
- `args` (object)
- one of: `tool_id` or `tool_name`

Optional fields include `context`, `caller`, and `extensions`.

### `ToolInvocationResult`

Defined by `spec/v1/schemas/tool_registry/tools/tool_invocation_result.schema.json`.

Required fields:

- `invocation_id` (string)
- `ok` (boolean)

Optional fields include `result` (object), `error` (an ARP `Error` object), `duration_ms`, and `extensions`.

## Error handling

- **Transport/request failures** (invalid route, invalid JSON, etc.) return an `ErrorEnvelope` (see `spec/v1/schemas/common/error.schema.json`).
- **Invocation outcomes** are represented by `ToolInvocationResult.ok` and optional `ToolInvocationResult.error` (see `spec/v1/schemas/common/error_detail.schema.json`).

## See also

- [Services](./index.md)
- [Data Schemas & Conventions](../data-schemas.md)
- [Conformance](../conformance.md)
