---
title: Data Schemas & Conventions
sidebar_position: 2
---

ARP Standard v1 payloads are defined as **JSON Schema** documents. They are the normative source of truth for request/response shapes, and they are referenced by the service OpenAPI specs.

:::note Standard vs. implementation

This page documents the **ARP Standard** schemas and conventions.
Implementations may extend payloads only through explicit extension points (for example `extensions`).

For JARVIS-specific behavior and defaults, see [JARVIS Implementation](../jarvis/index.md).

:::

## Where the schemas live (v1)

- JSON Schemas: `ARP_Standard/spec/v1/schemas/**`
- OpenAPI contracts: `ARP_Standard/spec/v1/openapi/*.openapi.yaml`
- Examples + golden vectors:
  - Examples: `ARP_Standard/spec/v1/examples/**`
  - Conformance vectors: `ARP_Standard/spec/v1/conformance/json_vectors/**`

## Schema groups (v1)

| Group | What it covers |
| --- | --- |
| `common/` | shared types (health, version, errors, extensions, pagination, etc.) |
| `tool_registry/` | tool definitions and invocation payloads |
| `runtime/` | run lifecycle payloads |
| `daemon/` | instance management + routed runs + admin runtime profiles |
| `trace/` | trace event formats |
| `memory/` | placeholder namespace reserved for future memory contracts |

## Key conventions

### Versioning

- HTTP endpoints are versioned under the `/v1` path prefix.
- Services report supported API versions in `VersionInfo.supported_api_versions` (`spec/v1/schemas/common/version_info.schema.json`).

### Strict objects + extension points

Most payload objects are strict (`additionalProperties: false`) and expose explicit, schema-defined escape hatches:

- `extensions` for vendor-specific fields (keys must be namespaced): `spec/v1/schemas/common/extensions.schema.json`
- `metadata` for labels/annotations: `spec/v1/schemas/common/metadata.schema.json`

### Errors (`ErrorEnvelope`)

Non-2xx responses return an `ErrorEnvelope`:

- `ErrorEnvelope` schema: `spec/v1/schemas/common/error.schema.json`

The nested `error` object is an ARP `Error` (code/message + optional details):

- `Error` schema: `spec/v1/schemas/common/error_detail.schema.json`

### Endpoint locator fields

When a schema includes an endpoint field (for example `runtime_selector.runtime_api_endpoint`), the value uses the shared `EndpointLocator` type (a URI string that may be `http://...` or other future schemes like `unix://...`):

- `spec/v1/schemas/common/endpoint_locator.schema.json`

### Pagination

List endpoints that support pagination return a `pagination` object with a `next_page_token`:

- `spec/v1/schemas/common/pagination.schema.json`

### Tracing

Trace payloads use a shared `TraceEvent` format:

- `TraceEvent`: `spec/v1/schemas/trace/trace_event.schema.json`

The Daemon `GET /v1/runs/{run_id}/trace` endpoint (optional) returns a `TraceResponse` that may inline `events` and/or return a `trace_uri` pointer:

- `TraceResponse`: `spec/v1/schemas/daemon/runs/trace_response.schema.json`

## Examples + conformance vectors

Example payloads and golden vectors are designed to validate directly against the schemas:

- Examples: `ARP_Standard/spec/v1/examples/`
- Golden vectors (JSON): `ARP_Standard/spec/v1/conformance/json_vectors/`

:::tip Implementation guidance

When you implement ARP services, validate incoming/outgoing payloads against the schemas and keep conformance vectors in CI. See [Conformance](./conformance.md).

:::

## See also

- [Services](./components/index.md)
- [Conformance](./conformance.md)
- [SDKs](./sdk/index.md)
