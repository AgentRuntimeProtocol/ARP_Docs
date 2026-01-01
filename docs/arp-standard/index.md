---
title: Overview for ARP Standard
sidebar_position: 0
---

The **ARP Standard** is the normative, versioned HTTP+JSON contract for ARP services.
It defines what endpoints exist, what payloads look like, and what “conformant” means.

:::note Standard vs. implementation

ARP Standard defines the wire contract (OpenAPI + JSON Schema + conformance rules).
It does not define CLIs, deployment defaults, or model-provider integrations.

For a runnable reference implementation, see [JARVIS Implementation](../jarvis/index.md).

:::

## Who this is for

- Implementers building ARP Standard v1 services (`Run Gateway`, `Run Coordinator`, executors, registry, selection, `PDP`).
- Teams validating service conformance
- Client developers using generated packages (for example Python `arp-standard-client` / `arp_standard_client`)

## Spec layout (v1)

The canonical spec sources live in the [`ARP_Standard` repository](https://github.com/AgentRuntimeProtocol/ARP_Standard) under `spec/v1/`:

- OpenAPI contracts: `spec/v1/openapi/*.openapi.yaml`
- JSON Schemas: `spec/v1/schemas/**`
- Examples: `spec/v1/examples/**`
- Conformance vectors + required endpoints: `spec/v1/conformance/**`
- Generated SDKs: published both to package provider services (e.g. PyPI) and to GitHub as release artifacts.

:::tip Source of truth

This docs section is a navigation layer over the spec. When in doubt, defer to the spec files.

- Spec v1 index: `ARP_Standard/spec/v1/README.md`
- Required endpoints (v1): `ARP_Standard/spec/v1/conformance/rules/required.md`

:::

## Services (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

ARP Standard v1 defines the node-centric execution fabric service set:

| Service | Purpose | OpenAPI | Conformance |
| --- | --- | --- | --- |
| [Run Gateway](./components/run-gateway.md) | Client entrypoint for runs | `run-gateway.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Run Coordinator](./components/run-coordinator.md) | Run authority + enforcement points | `run-coordinator.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Atomic Executor](./components/atomic-executor.md) | Execute atomic `NodeRun`s | `atomic-executor.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Composite Executor](./components/composite-executor.md) | Execute composite `NodeRun`s | `composite-executor.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Node Registry](./components/node-registry.md) | Catalog `NodeType`s | `node-registry.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Selection](./components/selection.md) | Generate bounded candidate sets | `selection.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [PDP](./components/pdp.md) | Policy decisions (optional) | `pdp.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |

## Start here

- Service responsibilities and required endpoints: [Services](./components/index.md)
- Shared payload conventions (errors, extensions, endpoint locators): [Data Schemas & Conventions](./data-schemas.md)
- How conformance is defined and validated: [Conformance](./conformance.md)
- Generated client SDKs: [SDKs](./sdk/index.md) (Python: [`arp-standard-client`](./sdk/python.md))

## Relationship to JARVIS

JARVIS is the first-party OSS implementation of ARP. Although it is strictly compliant with ARP Standard, it may include behavior that is not required by (or not yet covered by) the ARP Standard. 

See: [JARVIS Implementation](../jarvis/index.md) and the end-to-end [Quickstart](../getting-started/quickstart.md).
