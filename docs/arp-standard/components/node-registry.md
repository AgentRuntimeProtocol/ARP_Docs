---
title: Node Registry
sidebar_position: 6
---

The **`Node Registry`** is the ARP Standard v1 service that catalogs **`NodeType`s**:
- publish/get/search node type metadata
- versioning and deprecation
- input/output JSON schemas per node type

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS Node Registry](../../jarvis/component-implementations/node-registry.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/node-registry.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Node Registry MUST implement:

| Endpoint | Description |
| --- | --- |
| `GET /v1/node-types` | List node types (`NodeType[]`; optional `q` + `kind`) |
| `POST /v1/node-types` | Publish a node type (`NodeTypePublishRequest` → `NodeType`) |
| `GET /v1/node-types/{node_type_id}` | Get node type (`NodeType`; optional `version`) |

## Key payloads

- `NodeType`: `spec/v1/schemas/core/node_type.schema.json`
- `NodeTypePublishRequest`: `spec/v1/schemas/node_registry/node_types/node_type_publish_request.schema.json`

## Notes

- The registry stores **metadata**, not executable code.
- `Selection` and `PDP` often depend on registry metadata to make decisions.
- `NodeType`s are “capability contracts”: stable `node_type_id` + versioned schemas + descriptive metadata for selection/binding.

## See also

- Concepts: [Capabilities and NodeTypes](../../fundamentals/concepts/capabilities-and-nodes.md)
- Concepts: [Candidate Sets](../../fundamentals/concepts/candidate-sets.md)
- JARVIS: [Node Registry (implementation)](../../jarvis/component-implementations/node-registry.md)
