---
title: JARVIS Component Implementations
sidebar_position: 1
---

This section documents how the first-party **JARVIS** components are implemented and how to run them locally.

:::note ARP Standard vs. JARVIS

JARVIS is an implementation of the ARP Standard contracts.
If you’re looking for normative endpoints and schemas (what every conformant service MUST implement), start with [ARP Standard: Services](../../arp-standard/components/index.md).

:::

## How the pieces fit together

- The **Runtime** executes runs and calls tools via the **Tool Registry**.
- The **Daemon** manages Runtime instances (spawn/register/list) and routes run requests to them.
- The **Control Plane** is an optional UI/API layer on top of a running Daemon (not part of ARP Standard).

## Components

| Component | Purpose | Default local URL | Docs |
| --- | --- | --- | --- |
| Tool Registry | Tool discovery + invocation | `http://127.0.0.1:8000` | [Tool Registry](./tool-registry.md) |
| Runtime | Run execution | `http://127.0.0.1:8081` | [Runtime](./runtime.md) |
| Daemon | Instance mgmt + routed runs | `http://127.0.0.1:8082` | [Daemon](./daemon.md) |
| Control Plane | High-level agent orchestration and observability | TBD | [Control Plane](./control-plane.md) |

## Common conventions

- **ARP Standard SDK**: components use the ARP Standard Python SDK (`arp-standard-py` / `arp_sdk`) for typed payloads.
- **Versioned HTTP APIs**: ARP services use `/v1/...` endpoints and expose `GET /v1/health` + `GET /v1/version`.
- **Local-first defaults**: services default to `127.0.0.1` and common ports (see table above).

## Pinned stack CLI (optional)

The `arp-jarvis` meta package installs a pinned, known-compatible stack and provides a pass-through CLI:

- `arp-jarvis versions`
- `arp-jarvis tool-registry …`
- `arp-jarvis runtime …`
- `arp-jarvis daemon …`

:::tip Use component CLIs directly

You can also run the underlying CLIs directly:

- `arp-jarvis-tool-registry`
- `arp-jarvis-runtime`
- `arp-jarvis-daemon`

:::
