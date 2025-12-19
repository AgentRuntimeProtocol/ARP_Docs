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

- Implementers building an ARP **Tool Registry**, **Runtime**, **Daemon**, or even a **Control Plane**.
- Teams validating service conformance
- Client developers using generated SDKs (for example Python `arp-standard-py` / `arp_sdk`)

## Spec layout (v1)

The canonical spec sources live in the [`ARP_Standard` repository](https://GitHub.com/AgentRuntimeProtocol/ARP_Standard) under `spec/v1/`:

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

ARP Standard v1 defines three primary HTTP services:

| Service | Purpose | OpenAPI | Conformance |
| --- | --- | --- | --- |
| [Tool Registry](./components/tool-registry.md) | Tool discovery + invocation | `tool-registry.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Runtime](./components/runtime.md) | Run execution + lifecycle | `runtime.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |
| [Daemon](./components/daemon.md) | Runtime instances + route runs | `daemon.openapi.yaml` | Required endpoints are listed under [Conformance](./conformance.md). |

:::note Memory service (WIP)

The v1 spec includes an ARP Memory OpenAPI placeholder (`memory.openapi.yaml`) that currently only defines `GET /v1/health` and `GET /v1/version`. This will be updated once a Memory Service is shaped and integrated.

:::

## Start here

- Service responsibilities and required endpoints: [Services](./components/index.md)
- Shared payload conventions (errors, extensions, endpoint locators): [Data Schemas & Conventions](./data-schemas.md)
- How conformance is defined and validated: [Conformance](./conformance.md)
- Generated client SDKs: [SDKs](./sdk/index.md) (Python: [arp_sdk](./sdk/python.md))

## Relationship to JARVIS

JARVIS is the first-party OSS implementation of ARP. Although it is strictly compliant with ARP Standard, it may include behavior that is not required by (or not yet covered by) the ARP Standard. 

See: [JARVIS Implementation](../jarvis/index.md) and the end-to-end [Quickstart](../quickstart.md).
