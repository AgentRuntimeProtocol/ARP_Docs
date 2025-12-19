---
title: Tool Registry
sidebar_position: 3
---

JARVIS Tool Registry is a small Python HTTP service that implements the **ARP Tool Registry API v1**.
It’s the default tool backend used by JARVIS runtimes for tool discovery and invocation.

It is responsible for:

- publishing a list of available tools (`ToolDefinition[]`)
- validating and executing tool invocations (`ToolInvocationRequest` → `ToolInvocationResult`)

:::note Spec reference

This page documents the JARVIS implementation. For the normative ARP Standard contract, see:

- [ARP Standard: Tool Registry](../../arp-standard/components/tool-registry.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/tool-registry.openapi.yaml`

:::

## Run

Terminal A:

```bash
arp-jarvis tool-registry
```

This uses the defaults:

- host: `127.0.0.1`
- port: `8000`
- domains: `core`

:::tip Component CLI

The meta CLI is a thin pass-through wrapper. You can also run:

```bash
arp-jarvis-tool-registry
```

:::

### Ports and fallback behavior

- If you use the default port (`8000`) and it’s already in use, the service binds to a free port and logs it.
- If you set an explicit port (for example `--port 8000`) and want fallback when it’s in use, add `--auto-port`.
- To always pick a free port, use `--port 0`.

### Configuration (env)

- `TOOL_REGISTRY_HOST` (default: `127.0.0.1`)
- `TOOL_REGISTRY_PORT` (default: `8000`)
- `TOOL_REGISTRY_DOMAINS` (default: `core`, comma-separated)
- `LOG_LEVEL` (default: `INFO`)

## HTTP API (v1)

- `GET /v1/health`
- `GET /v1/version`
- `GET /v1/tools`
- `GET /v1/tools/{tool_id}`
- `POST /v1/tool-invocations`

### Example: invoke a tool

This endpoint accepts either `tool_id` or `tool_name`.

```bash
curl -sS http://127.0.0.1:8000/v1/tool-invocations \
  -H 'Content-Type: application/json' \
  -d '{
    "invocation_id": "inv_001",
    "tool_name": "time_now",
    "args": { "tz": "UTC" }
  }'
```

## Tool registration model (domains)

Tools are loaded at startup from “domain modules” inside the Tool Registry codebase:

- module path: `tool_registry.domains.<domain>`
- required function: `load_tools() -> list[tool_registry.catalog.Tool]`

Enable domains with `--domains core,my_domain` (or `TOOL_REGISTRY_DOMAINS=core,my_domain`).

### Built-in domain: `core`

The `core` domain ships three tools:

- `echo` (`tool_id: tool_echo`)
- `calc` (`tool_id: tool_calc`)
- `time_now` (`tool_id: tool_time_now`)

:::tip Adding your own tools

Follow [Integrating Your First Custom Tool](../../guides/tool-development-guide.md).
Then restart Tool Registry with your domain enabled (for example `TOOL_REGISTRY_DOMAINS=core,my_domain …`).

:::

## Limitations (MVP)

- No authentication/authorization.
- No MCP aggregation implementation (design docs may describe planned behavior, but the MVP server is domain-only today).
