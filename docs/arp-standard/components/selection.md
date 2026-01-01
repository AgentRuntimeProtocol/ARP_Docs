---
title: Selection
sidebar_position: 7
---

The **`Selection`** service is the ARP Standard v1 service that generates **bounded candidate sets** for mapping a subtask to one or more `NodeType`s.

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS Selection Service](../../jarvis/component-implementations/selection-service.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/selection.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Selection MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/candidate-sets` | Generate a bounded candidate set (`CandidateSetRequest` → `CandidateSet`) |

## Key payloads

- `CandidateSetRequest`: `spec/v1/schemas/selection/candidate_sets/candidate_set_request.schema.json`
- `CandidateSet`: `spec/v1/schemas/core/candidate_set.schema.json`

## Notes

- “Bounded” means the selection output is an enforceable limit on action space (not “a suggestion in a prompt”).
- Implementations typically depend on `Node Registry` inventory and may be LLM-driven.

## See also

- Concepts: [Candidate Sets](../../fundamentals/concepts/candidate-sets.md)
- ARP Standard: [Node Registry](./node-registry.md)
- JARVIS: [Selection Service (implementation)](../../jarvis/component-implementations/selection-service.md)
