---
title: Policy Decision Point — PDP
sidebar_position: 8
---

The **Policy Decision Point (`PDP`)** is an optional ARP Standard v1 service that returns policy decisions (for example allow/deny/require-approval) at defined checkpoints.

ARP Standard separates:
- **decision** (`PDP` returns a decision artifact), from
- **enforcement** (`Run Coordinator` / executors must enforce it).

:::note Standard vs. implementation

This page documents the ARP Standard contract (OpenAPI + schemas).

For a runnable reference implementation, see: [JARVIS PDP](../../jarvis/component-implementations/pdp.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/pdp.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

PDP MUST implement:

| Endpoint | Description |
| --- | --- |
| `POST /v1/policy:decide` | Decide policy outcome (`PolicyDecisionRequest` → `PolicyDecision`) |

## Key payloads

- `PolicyDecisionRequest`: `spec/v1/schemas/pdp/policy/policy_decision_request.schema.json`
- `PolicyDecision`: `spec/v1/schemas/core/policy_decision.schema.json`

## Notes

- PDP policies often depend on:
  - caller identity (JWT claims)
  - `Run`/`NodeRun` context (including constraints)
  - node type metadata (via `Node Registry`)

## See also

- Concepts: [Policy Checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- ARP Standard: [Node Registry](./node-registry.md)
- JARVIS: [PDP (implementation)](../../jarvis/component-implementations/pdp.md)
