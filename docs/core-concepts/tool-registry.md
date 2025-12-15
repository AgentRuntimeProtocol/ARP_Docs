---
title: Tool Registry
sidebar_position: 3
---

The Tool Registry defines and manages tools that can be invoked by the runtime.

## Tool definition

Tools are described by a `ToolDefinition` (from `jarvis-model`):

- `name`: stable identifier used in requests (example: `time_now`)
- `description`: short human-readable description (used by planners)
- `version`: tool version string (example: `0.1.0`)
- `parameters`: a JSON Schema object describing tool inputs (validated by Tool Registry)
- Optional fields: `returns`, `tags`, `source`
- `schema_version`: shared schema version for ARP contracts (current: `0.1.0`)

Tool Registry also exposes a minimal **planner view** for discovery: `{ "name", "description" }`.

## Registration

### How tools are registered (MVP)

The MVP Tool Registry does not yet support dynamic registration via API. Tools are loaded from **domain modules** inside the Tool Registry codebase at startup:

- Tools live under `tool_registry/domains/`.
- Each domain module exports `load_tools() -> list[Tool]`.
- Enabled domains are configured via `TOOL_REGISTRY_DOMAINS` (default: `core`).

### Discovery + validation behavior

- `GET /v1/tools` returns a list of `{name, description}` for planners.
- `GET /v1/tools/{name}` returns the full `ToolDefinition` (including `parameters` JSON Schema).
- `POST /v1/tools/{name}:invoke`:
  - validates the request shape (`schema_version`, `args`, optional `context` and `trace`)
  - validates `args` against the tool’s `parameters` JSON Schema
  - returns a normalized `ToolResult` (`ok: true|false`, `result` or `error`, plus `metrics.latency_ms`)

## Runtime integration

The Runtime integrates with Tool Registry in three places:

1. **Planning**: the planner receives the tool list from `GET /v1/tools` (minimal view to keep prompts small).
2. **Execution**: before invoking a tool, the runtime fetches its schema from `GET /v1/tools/{name}`.
3. **Invocation**: tools are executed via `POST /v1/tools/{name}:invoke` with:
   - `args`: tool parameters (validated)
   - `context`: flow context (optional; useful for stateful tools later)
   - `trace`: a small trace context (flow_id/step_id) for correlation
