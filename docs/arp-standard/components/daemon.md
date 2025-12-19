---
title: Daemon
sidebar_position: 3
---

The **Daemon** is the ARP service responsible for:

- managing a pool of **runtime instances** (managed or external)
- routing **run requests** to an appropriate runtime instance

:::note Standard vs. implementation

This page documents the ARP Standard contract. For the runnable JARVIS implementation (runtime profiles, process management, CLI), see [JARVIS Daemon](../../jarvis/component-implementations/daemon.md).

:::

## OpenAPI (v1)

- `ARP_Standard/spec/v1/openapi/daemon.openapi.yaml`

## Endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

### Instances

| Endpoint | Description |
| --- | --- |
| `GET /v1/instances` | List runtime instances |
| `POST /v1/instances` | Create runtime instances from a runtime profile |
| `DELETE /v1/instances/{instance_id}` | Delete (managed) or deregister (external) |
| `POST /v1/instances:register` | Register an external runtime endpoint (unmanaged) |

### Runtime profiles (safe list)

| Endpoint | Description |
| --- | --- |
| `GET /v1/admin/runtime-profiles` | List runtime profiles |
| `PUT /v1/admin/runtime-profiles/{runtime_profile}` | Upsert a runtime profile |
| `DELETE /v1/admin/runtime-profiles/{runtime_profile}` | Delete a runtime profile |

### Runs

| Endpoint | Description |
| --- | --- |
| `GET /v1/runs` | List runs (paginated) |
| `POST /v1/runs` | Submit a run request (async; returns `RunStatus`, `202 Accepted` in the v1 OpenAPI) |
| `GET /v1/runs/{run_id}` | Get run status |
| `GET /v1/runs/{run_id}/result` | Get run result |

Optional (not required for conformance):

- `GET /v1/runs/{run_id}/trace`

## Key payloads

### `RuntimeProfile` and `RuntimeProfileUpsertRequest`

Runtime profiles define a **safe list** of allowed runtime configurations.

Normative schemas:

- `spec/v1/schemas/daemon/runtime_profiles/runtime_profile.schema.json`
- `spec/v1/schemas/daemon/runtime_profiles/runtime_profile_upsert_request.schema.json`

The ARP Standard intentionally leaves runtime-specific launch details to the `extensions` mechanism.

### `InstanceCreateRequest` / `InstanceRegisterRequest`

Normative schemas:

- `spec/v1/schemas/daemon/instances/instance_create_request.schema.json`
- `spec/v1/schemas/daemon/instances/instance_register_request.schema.json`

### `RunRequest`

The daemon accepts the same `RunRequest` schema as the runtime service (`spec/v1/schemas/runtime/runs/run_request.schema.json`).

`runtime_selector` fields (for example `instance_id` or `runtime_api_endpoint`) provide routing hints that the daemon can use when selecting a runtime instance.

### `RunListResponse` and pagination

`GET /v1/runs` returns a `RunListResponse` (`spec/v1/schemas/daemon/runs/run_list_response.schema.json`) which can include a `pagination` object (`spec/v1/schemas/common/pagination.schema.json`).

## See also

- [Services](./index.md)
- [Data Schemas & Conventions](../data-schemas.md)
- [Conformance](../conformance.md)
