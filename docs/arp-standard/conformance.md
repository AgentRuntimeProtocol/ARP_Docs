---
title: Conformance
sidebar_position: 3
---

ARP Standard conformance is defined by a small set of **required endpoints** and by **schema-valid payloads**.
The `ARP_Standard` repository includes golden JSON vectors you can use to validate an implementation.

:::note Standard vs. implementation

This page describes how ARP Standard defines conformance.
Implementations (including JARVIS) may provide additional optional endpoints and fields (via `extensions`), but they still need to satisfy the required v1 contracts to be considered conformant.

:::

## What “conformant” means (v1)

At a minimum:

- Each service implements the required v1 endpoints listed in `ARP_Standard/spec/v1/conformance/rules/required.md`.
- Requests and responses validate against the JSON Schemas in `ARP_Standard/spec/v1/schemas/**`.

## Required vs. optional endpoints (v1)

All services MUST implement:

- `GET /v1/health`
- `GET /v1/version`

Tool Registry MUST implement:

- `GET /v1/tools`
- `GET /v1/tools/{tool_id}`
- `POST /v1/tool-invocations`

Runtime MUST implement:

- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `GET /v1/runs/{run_id}/result`

Daemon MUST implement:

- `GET /v1/instances`
- `POST /v1/instances`
- `DELETE /v1/instances/{instance_id}`
- `POST /v1/instances:register`
- `GET /v1/admin/runtime-profiles`
- `PUT /v1/admin/runtime-profiles/{runtime_profile}`
- `DELETE /v1/admin/runtime-profiles/{runtime_profile}`
- `GET /v1/runs`
- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `GET /v1/runs/{run_id}/result`

Optional (v1):

- `POST /v1/runs/{run_id}:cancel` (runtime)
- `GET /v1/runs/{run_id}/events` (runtime)
- `GET /v1/runs/{run_id}/trace` (daemon)

:::tip Source of truth

The canonical list lives in `ARP_Standard/spec/v1/conformance/rules/required.md`.

:::

## Golden vectors

The `ARP_Standard/spec/v1/conformance/json_vectors/` directory contains known-good JSON payloads that must validate against their matching JSON Schemas under `ARP_Standard/spec/v1/schemas/`.

## Validate locally

Run these from the `ARP_Standard` repository root.

Install validator deps:

```bash
python3 -m pip install -r tools/validate/requirements.txt
```

Run validation:

```bash
python3 tools/validate/validate_json_vectors.py --include-examples
```

Success means every JSON file in:

- `spec/v1/conformance/json_vectors/`
- `spec/v1/examples/` (when `--include-examples` is set)

validates against its matching schema in `spec/v1/schemas/`.

## See also

- [Services](./components/index.md)
- [Data schemas & conventions](./data-schemas.md)
