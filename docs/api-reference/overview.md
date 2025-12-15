---
title: Overview
sidebar_position: 1
---

High-level overview of the ARP APIs.

## References

- [Runtime API Reference](./runtime.md)
- [Tool Registry API Reference](./tool-registry.md)
- [Model API Reference](./model.md)

## Conventions

### Authentication / authorization (MVP)

The MVP services do not implement authentication or authorization yet. Treat them as development components and put them behind your own gateway if exposing them in a shared environment.

### Content types

- Requests that include a body use `Content-Type: application/json`.
- Responses are JSON (`application/json; charset=utf-8`).

### Error shapes + status codes

Tool Registry uses two top-level response shapes:

- `{"error": <Error>}` for routing and request-shape failures (for example `route.not_found`, `request.invalid_json`).
- `<ToolResult>` for tool invocation outcomes (including `ok: false` with an `error` object).

Common status codes:

- `200` OK (success)
- `400` bad request (invalid JSON, invalid request shape, or tool args validation failures)
- `404` not found (unknown tool or unknown route)
- `405` method not allowed
- `500` server/tool error

## Versioning

Versioning exists at a few layers in the MVP:

- **HTTP API version**: Tool Registry endpoints are under `/v1/...`.
- **Contract version**: typed payloads include `schema_version` (from `jarvis-model`, currently `"0.1.0"`).
- **Tool version**: tool definitions include a `version` string (example: `"0.1.0"`).

Formal compatibility guarantees will be documented as the public surface area stabilizes.
