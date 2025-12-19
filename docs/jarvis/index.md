---
title: Overview for JARVIS Implementation
sidebar_position: 0
---

JARVIS is the first-party, open-source implementation of the **Agent Runtime Protocol (ARP)** ecosystem.
It provides runnable services and CLIs that implement the **ARP Standard v1** HTTP contracts, plus a small amount of convenience tooling.

:::note Standard vs. implementation

Normative protocol requirements live under **ARP Standard** (OpenAPI + JSON Schemas + conformance rules).
This **JARVIS** section documents our first-party implementation of those contracts, including behavior and tooling that is not part of the spec (for example CLIs, defaults, traces, and the optional Control Plane).

:::

## Who this is for

- You want to run an end-to-end ARP stack locally (Tool Registry + Runtime, optionally a Daemon).
- You’re implementing your own ARP service and want a reference implementation to compare against.
- You’re integrating an app against ARP APIs and want a working endpoint to test with.

## What’s in the stack

| Component | ARP role | How you run it | Purpose | Docs |
| --- | --- | --- | --- | --- |
| Tool Registry | Tool Registry service | `arp-jarvis tool-registry` or `arp-jarvis-tool-registry` | Tool discovery + invocation | [Tool Registry](./component-implementations/tool-registry.md) |
| Runtime | Runtime service | `arp-jarvis runtime …` or `arp-jarvis-runtime …` | Run execution (`/v1/runs`) | [Runtime](./component-implementations/runtime.md) |
| Daemon | Daemon service | `arp-jarvis daemon …` or `arp-jarvis-daemon …` | Instance management + routed runs | [Daemon](./component-implementations/daemon.md) |
| Control Plane (WIP) | Not part of ARP Standard | `arp-jarvis-control-plane` | High-level Orchestration Layer | [Control Plane](./component-implementations/control-plane.md) |

:::tip Choosing what to run

- If you want to execute runs against a single runtime, start with **Tool Registry + Runtime**.
- If you need instance lifecycle management (spawn/register/route), add the **Daemon**.

:::

## Start here

- New to ARP + JARVIS: follow the [Quickstart](../quickstart.md).
- Understanding the wire contracts: start with [ARP Standard](../arp-standard/index.md) and [ARP Standard: Services](../arp-standard/components/index.md).
- Running each service + CLI details: see [JARVIS Component Implementations](./component-implementations/index.md).
- Runtime model/provider configuration: see [Model Integration](./model-integration.md).
- How-tos and extension guides: browse [User Guides](../guides/index.md).
- Looking for endpoint/payload reference pages: see [API Reference](../api-reference/index.md).

## Packaging

The recommended install is the pinned meta package:

- `arp-jarvis` (installs pinned versions of `arp-standard-py`, `arp-jarvis-tool-registry`, `arp-jarvis-runtime`, `arp-jarvis-daemon`)
- Meta CLI: `arp-jarvis` (pass-through to the component CLIs; see `arp-jarvis versions`)

You can also install component packages directly:

- `arp-jarvis-tool-registry`
- `arp-jarvis-runtime`
- `arp-jarvis-daemon`

The Control Plane is an optional, separate package:

- `arp-jarvis-control-plane`

:::note Default local ports

By default, JARVIS services commonly bind to:

- Tool Registry: `http://127.0.0.1:8000`
- Runtime: `http://127.0.0.1:8081`
- Daemon: `http://127.0.0.1:8082`

The Control Plane defaults to `http://127.0.0.1:8000` (`CP_PORT=8000`), so you may want to change either the Tool Registry port or `CP_PORT` to avoid conflicts.

:::

:::caution MVP maturity

JARVIS is intentionally minimal today: there is no built-in authentication, multi-tenancy, or production hardening. Treat it as a development/reference implementation unless you front it with your own controls.

:::
