---
title: Daemon API Reference
sidebar_position: 4
---

Authoritative reference for the **JARVIS Daemon** interfaces (HTTP + CLI).

:::note Spec reference

JARVIS Daemon implements the ARP Standard Daemon API v1:

- [ARP Standard: Daemon](../arp-standard/components/daemon.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/daemon.openapi.yaml`

:::

## Base URL

Default: `http://127.0.0.1:8082`

Run it:

```bash
arp-jarvis daemon --host 127.0.0.1 --port 8082
```

FastAPI docs: `http://127.0.0.1:8082/docs`

## Key endpoints

### Instances

- `GET /v1/instances`
- `POST /v1/instances`
- `DELETE /v1/instances/{instance_id}`
- `POST /v1/instances:register`

### Runtime profiles (safe list)

- `GET /v1/admin/runtime-profiles`
- `PUT /v1/admin/runtime-profiles/{runtime_profile}`
- `DELETE /v1/admin/runtime-profiles/{runtime_profile}`

:::note JARVIS-specific exec config

ARP Standard keeps runtime launch configuration in `RuntimeProfile.extensions`.

JARVIS uses `extensions["arp.jarvis.exec"]` to configure how managed runtimes are started (pip-installed venv vs command template).

:::

### Runs

- `GET /v1/runs` (supports `page_size` and `page_token`)
- `POST /v1/runs` (returns `202` with `RunStatus`)
- `GET /v1/runs/{run_id}`
- `GET /v1/runs/{run_id}/result`
- `GET /v1/runs/{run_id}/trace` (optional in ARP Standard; implemented by JARVIS)

## CLI (client mode)

Set `ARP_DAEMON_URL` (or pass `--daemon-url`) and use:

- `arp-jarvis daemon runtime-profiles list|upsert|delete`
- `arp-jarvis daemon start|list|delete|register`
- `arp-jarvis daemon run|runs|status|result|trace`

## Common error cases (JARVIS)

- `404 instances.not_found`: selector refers to an unknown `instance_id`
- `409 instances.not_ready`: selected instance exists but is not ready
- `409 instances.no_ready`: matching instances exist but none are ready
