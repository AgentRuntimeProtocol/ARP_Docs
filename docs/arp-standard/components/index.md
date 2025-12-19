---
title: Services
sidebar_position: 1
---

ARP Standard v1 defines a set of HTTP services. This section summarizes what each service does and links to the normative OpenAPI + JSON Schema sources.

:::note Standard vs. implementation

This is the **spec**. For the JARVIS implementation details (how to run these services, CLI flags, defaults), see **JARVIS Implementation**.

:::

## Required endpoints (all services)

Each service **MUST** implement:

- `GET /v1/health`
- `GET /v1/version`

## Service map (v1)

| Service | Purpose | OpenAPI |
| --- | --- | --- |
| [Tool Registry](./tool-registry.md) | Tool discovery + invocation | `tool-registry.openapi.yaml` |
| [Runtime](./runtime.md) | Run execution lifecycle | `runtime.openapi.yaml` |
| [Daemon](./daemon.md) | Runtime instances + routed runs | `daemon.openapi.yaml` |

Required endpoints per service are defined by:

- OpenAPI documents under `ARP_Standard/spec/v1/openapi/`
- The conformance required endpoints list: `ARP_Standard/spec/v1/conformance/rules/required.md`

## Tool Registry

Purpose: tool discovery + invocation.

Required endpoints:

- `GET /v1/tools`
- `GET /v1/tools/{tool_id}`
- `POST /v1/tool-invocations`

OpenAPI: `ARP_Standard/spec/v1/openapi/tool-registry.openapi.yaml`

Details: [Tool Registry](./tool-registry.md)

## Runtime

Purpose: execute runs.

Required endpoints:

- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `GET /v1/runs/{run_id}/result`

Optional endpoints (not required for conformance):

- `POST /v1/runs/{run_id}:cancel`
- `GET /v1/runs/{run_id}/events` (SSE)

OpenAPI: `ARP_Standard/spec/v1/openapi/runtime.openapi.yaml`

Details: [Runtime](./runtime.md)

## Daemon

Purpose: manage runtime instances and route run requests to them.

Required endpoints:

- Instances: `GET /v1/instances`, `POST /v1/instances`, `DELETE /v1/instances/{instance_id}`
- External instances: `POST /v1/instances:register`
- Runtime profiles (safe list): `GET /v1/admin/runtime-profiles`, `PUT /v1/admin/runtime-profiles/{runtime_profile}`, `DELETE /v1/admin/runtime-profiles/{runtime_profile}`
- Runs: `GET /v1/runs`, `POST /v1/runs`, `GET /v1/runs/{run_id}`, `GET /v1/runs/{run_id}/result`

Optional endpoint (not required for conformance):

- `GET /v1/runs/{run_id}/trace`

OpenAPI: `ARP_Standard/spec/v1/openapi/daemon.openapi.yaml`

Details: [Daemon](./daemon.md)

:::note Memory service (placeholder)

The v1 spec also includes an ARP Memory OpenAPI placeholder (`memory.openapi.yaml`) that currently only defines `GET /v1/health` and `GET /v1/version`.

:::

## See also

- [Data schemas & conventions](../data-schemas.md)
- [Conformance](../conformance.md)
