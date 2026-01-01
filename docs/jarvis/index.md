---
title: Overview for JARVIS Implementation
sidebar_position: 0
---

JARVIS is the first-party, open-source **reference stack** for ARP Standard v1.

It provides runnable services (HTTP) and a pinned deployment bundle that implements the **node-centric execution fabric** contracts, plus practical non-spec internal services needed for a real deployment (stores, event streaming, artifacts).

:::note Standard vs. implementation

Normative protocol requirements live under **ARP Standard** (OpenAPI + JSON Schemas + conformance rules).
This **JARVIS** section documents our first-party implementation of those contracts, including behavior and tooling that is not part of the spec (for example defaults, operational posture, and non-spec internal services).

:::

## Who this is for

- You want to run an end-to-end ARP stack locally (recommended: `JARVIS_Release` Docker Compose).
- You’re implementing your own ARP service and want a reference implementation to compare against.
- You’re integrating an app against ARP APIs and want a working endpoint to test with.

## What’s in the stack

JARVIS is split into multiple repos (one per component). Core components are intended to be versioned in lockstep and pinned via `JARVIS_Release`.

Recommended operating model:
- **Deploy** using `JARVIS_Release` (Docker Compose, consuming **per-service GHCR images**).
- **Interact** with the running stack via the `Run Gateway` HTTP API (curl, SDKs, or app integrations).
- **Run services outside Docker (advanced)** using the single meta CLI `arp-jarvis` (preferred over per-component CLIs).

Execution fabric (ARP Standard v1 services):

| Component | Package | Docs |
| --- | --- | --- |
| Run Gateway | `arp-jarvis-rungateway` | [Run Gateway](./component-implementations/run-gateway.md) |
| Run Coordinator | `arp-jarvis-run-coordinator` | [Run Coordinator](./component-implementations/run-coordinator.md) |
| Atomic Executor | `arp-jarvis-atomic-executor` | [Atomic Executor](./component-implementations/atomic-executor.md) |
| Composite Executor | `arp-jarvis-composite-executor` | [Composite Executor](./component-implementations/composite-executor.md) |
| Node Registry | `arp-jarvis-node-registry` | [Node Registry](./component-implementations/node-registry.md) |
| Selection Service | `arp-jarvis-selection-service` | [Selection Service](./component-implementations/selection-service.md) |
| PDP | `arp-jarvis-pdp` | [PDP](./component-implementations/pdp.md) |

Internal services (JARVIS-only, non-spec):

| Component | Package | Notes |
| --- | --- | --- |
| Run Store | `arp-jarvis-runstore` | Persistence backing for coordinator (v0.x defaults: SQLite) |
| Event Stream | `arp-jarvis-eventstream` | NDJSON event persistence + streaming |
| Artifact Store | `arp-jarvis-artifactstore` | Large I/O backing (v0.x defaults: filesystem) |

:::tip Choosing what to run

If you want a runnable baseline with the fewest moving parts:
- start with the version-pinned `JARVIS_Release` docker stack (recommended)
- begin by running the “general planner” composite node (`jarvis.composite.planner.general`)

:::

## Start here

- New to ARP + JARVIS: follow the [Quickstart](../getting-started/quickstart.md).
- Auth posture and token exchange: [Authentication in JARVIS](./authentication.md).
- Understanding the wire contracts: start with [ARP Standard](../arp-standard/index.md) and [ARP Standard: Services](../arp-standard/components/index.md).
- Running each service + configuration: see [JARVIS Component Implementations](./component-implementations/index.md).
- Looking for endpoint/payload reference pages: see [ARP Standard](../arp-standard/index.md).

## Packaging

JARVIS provides a version-pinned meta distribution:

- `arp-jarvis` (pins compatible versions of core JARVIS component packages, plus the first-party node pack)

`arp-jarvis` also provides a single CLI entrypoint:
- `arp-jarvis versions` (inspect installed pins)
- `arp-jarvis run-gateway -- ...`, `arp-jarvis run-coordinator -- ...`, etc (pass-through to component CLIs)

Docs treat `arp-jarvis` as the **recommended** CLI surface for local/dev usage. Component-specific CLIs still exist but are not the default interface we document.

For “full stack bring-up”, prefer a version-pinned stack repo:
- `AgentRuntimeProtocol/JARVIS_Release`

`JARVIS_Release` is also the source of truth for the stack pinning:
- `stack.lock.json` lists the pinned component versions and corresponding GHCR image references.
- `compose/docker-compose.yml` consumes the GHCR images using `STACK_VERSION` tags.

You can also install component packages directly (one per service) if you’re running them outside Docker.

:::note Default local ports

Default ports are implementation defaults and may vary by deployment profile.
See each component’s documentation for its CLI defaults and `.env.example`.

:::

:::caution MVP maturity

JARVIS is still early. Treat it as a development/reference implementation unless you have validated your deployment posture (auth, policy, audit retention, and operational hardening).

:::
