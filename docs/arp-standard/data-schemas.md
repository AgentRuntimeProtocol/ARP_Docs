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

## Where the schemas live

The canonical schemas live in the `AgentRuntimeProtocol/ARP_Standard` repository:

- JSON Schemas: `spec/v1/schemas/**`
- OpenAPI contracts: `spec/v1/openapi/*.openapi.yaml`
- Examples + golden vectors:
  - Examples: `spec/v1/examples/**`
  - Conformance vectors: `spec/v1/conformance/json_vectors/**`

## Schema groups

| Group | What it covers |
| --- | --- |
| `common/` | shared types (health, version, errors, extensions, pagination, etc.) |
| `core/` | shared domain objects (`Run`, `NodeRun`, `NodeTypeRef`, `RunEvent`, etc.) |
| `run_gateway/` | run entrypoint payloads (start/get/cancel + optional event streaming) |
| `run_coordinator/` | run authority + node-run lifecycle payloads |
| `atomic_executor/` | atomic node-run execution payloads |
| `composite_executor/` | composite node-run execution payloads |
| `node_registry/` | node type catalog payloads |
| `selection/` | candidate set payloads |
| `pdp/` | policy decision payloads |

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

When a schema includes an endpoint field (for example `coordinator_endpoint` in composite execution), the value uses the shared `EndpointLocator` type (a URI string that may be `http://...` or other future schemes like `unix://...`):

- `spec/v1/schemas/common/endpoint_locator.schema.json`

### Pagination

List endpoints that support pagination return a `pagination` object with a `next_page_token`:

- `spec/v1/schemas/common/pagination.schema.json`

### Event streaming (NDJSON)

Some services expose optional NDJSON event streams:
- Run Gateway: `GET /v1/runs/{run_id}/events`
- Run Coordinator: `GET /v1/runs/{run_id}/events`, `GET /v1/node-runs/{node_run_id}/events`

The event line shape is `RunEvent`:
- `spec/v1/schemas/core/run_event.schema.json`

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
