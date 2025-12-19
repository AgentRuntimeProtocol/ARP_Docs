---
title: Overview
sidebar_position: 0
---

High-level overview of the public interfaces documented on this site.

:::note Standard vs. implementation

The pages in this section describe the current **JARVIS** interfaces (primarily HTTP). For the normative ARP Standard OpenAPI/JSON Schema contracts, start with [ARP Standard](../arp-standard/index.md).

:::

## References

- ARP services:
  - [Tool Registry API Reference](./tool-registry.md)
  - [Runtime API Reference](./runtime.md)
  - [Daemon API Reference](./daemon.md)
- Model integration (configuration, not a standalone ARP service): [Model Integration](../jarvis/model-integration.md)

## Conventions

:::note Authentication (MVP)

JARVIS services do not implement authentication/authorization. Treat them as development/reference components.

:::

### Content types

- Requests that include a body use `Content-Type: application/json`.
- Responses are JSON (`application/json; charset=utf-8`).

### Error shapes + status codes

Across JARVIS services:

- Request/route errors return an ARP Standard `ErrorEnvelope`: `{"error": {"code": "...", "message": "...", ...}}`
- Execution outcomes are returned as typed ARP objects (for example `ToolInvocationResult` or `RunResult`) and may include an embedded `error` object.

Common status codes:

- `200` OK (success)
- `202` accepted (daemon `POST /v1/runs`)
- `400` bad request (invalid JSON or invalid request shape)
- `404` not found (unknown route, unknown run/tool ID)
- `405` method not allowed (Tool Registry)
- `409` conflict (for example “not cancelable” or “instance not ready”, depending on service)
- `500` internal error

## Versioning

Versioning exists at a few layers:

- **HTTP API version**: endpoints are under `/v1/...`.
- **Service version**: `GET /v1/version` returns `service_version` (typically the underlying Python package version).

Formal compatibility guarantees are defined by the ARP Standard v1 schema and OpenAPI contracts.
