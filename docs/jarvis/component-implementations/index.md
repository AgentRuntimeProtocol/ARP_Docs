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

JARVIS is a node-centric execution fabric:

- **`Run Gateway`** is the client entrypoint (stateless proxy).
- **`Run Coordinator`** is the run authority (system-of-record; enforcement and dispatch).
- **`Atomic Executor`** executes atomic `NodeRun`s.
- **`Composite Executor`** executes composite `NodeRun`s (planning + binding + arg-gen).
- **`Node Registry`** catalogs `NodeType`s.
- **`Selection Service`** produces bounded candidate sets.
- **`PDP`** returns allow/deny decisions (optional).

Internal persistence/services used by the coordinator:
- `Run Store`
- `Event Stream`
- `Artifact Store`

## Components

Recommended local deployment is via the version-pinned `JARVIS_Release` stack managed with `arp-jarvis stack` (GHCR images).

| Component | Compose service | Internal URL | Exposed host URL | Docs |
| --- | --- | --- | --- | --- |
| Run Gateway | `run-gateway` | `http://run-gateway:8080` | `http://127.0.0.1:8081` | [Run Gateway](./run-gateway.md) |
| Run Coordinator | `run-coordinator` | `http://run-coordinator:8081` | `http://127.0.0.1:8082` | [Run Coordinator](./run-coordinator.md) |
| Atomic Executor | `atomic-executor` | `http://atomic-executor:8082` | (not exposed) | [Atomic Executor](./atomic-executor.md) |
| Composite Executor | `composite-executor` | `http://composite-executor:8083` | (not exposed) | [Composite Executor](./composite-executor.md) |
| Node Registry | `node-registry` | `http://node-registry:8084` | (not exposed) | [Node Registry](./node-registry.md) |
| Selection Service | `selection-service` | `http://selection-service:8085` | (not exposed) | [Selection Service](./selection-service.md) |
| PDP | `pdp` | `http://pdp:8086` | (not exposed) | [PDP](./pdp.md) |

Notes:
- Exposed ports are the default `JARVIS_Release` host port mappings and may vary by profile.
- To debug a non-exposed service, use `arp-jarvis stack exec <service> -- <cmd>` (or `docker compose exec`) or temporarily add a `ports:` mapping in `compose/docker-compose.yml`.

## Common conventions

- **ARP Standard Python packages**: components use `arp-standard-model`, `arp-standard-client`, and `arp-standard-server` for spec-aligned types and scaffolding.
- **Versioned HTTP APIs**: ARP services use `/v1/...` endpoints and expose `GET /v1/health` + `GET /v1/version`.
- **Recommended bring-up**: for most users, `JARVIS_Release` + `arp-jarvis stack` is the supported way to run JARVIS locally and in production-like environments.
