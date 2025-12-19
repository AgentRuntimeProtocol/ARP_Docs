---
title: Daemon
sidebar_position: 4
---

JARVIS Daemon is a FastAPI service + CLI that implements the **ARP Daemon API v1**.

:::note Spec reference

This page documents the JARVIS implementation. For the normative ARP Standard contract, see:

- [ARP Standard: Daemon](../../arp-standard/components/daemon.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/daemon.openapi.yaml`

:::

## What the daemon does

- **Managed instances**: start/stop local runtime processes from a safe-listed **runtime profile**.
- **External instances**: register an already-running runtime endpoint (unmanaged).
- **Run routing**: accept `RunRequest` objects and route them to a selected runtime instance.
- **Trace access** (optional): expose a normalized `TraceResponse` for a run.

## Run modes

JARVIS Daemon uses a single CLI in two modes:

- **Server mode**: run the Daemon HTTP API
- **Client mode**: use the same CLI as an HTTP client against a running daemon

### Server mode

```bash
arp-jarvis daemon --host 127.0.0.1 --port 8082
```

FastAPI OpenAPI docs are available at `http://127.0.0.1:8082/docs`.

### Client mode

The same CLI also acts as a client when invoked with a subcommand:

```bash
export ARP_DAEMON_URL=http://127.0.0.1:8082
arp-jarvis daemon runtime-profiles list
```

Client configuration:

- `--daemon-url` (env: `ARP_DAEMON_URL`, back-compat: `JARVIS_DAEMON_URL`)

:::tip Component CLI

You can also run the component CLI directly:

- Server mode: `arp-jarvis-daemon --host … --port …` (or `arp-jarvis-daemon serve …`)
- Client mode: `arp-jarvis-daemon runtime-profiles list` (etc.)

:::

## Data directory (server mode)

By default the daemon stores state under `~/.arp/daemon` (override with `--data-dir`):

- Runtime profiles (safe list): `<data-dir>/runtime_profiles.json`
- Instance registry (persisted): `<data-dir>/instances.json`
- Managed runtime venvs (pip driver): `<data-dir>/venvs/<runtime_profile>/...`
- Run artifacts: `<data-dir>/runs/<run_id>/...` (includes `trace.jsonl`)

When the daemon starts **managed** runtime instances, it sets `JARVIS_TRACE_DIR` to `<data-dir>/runs` unless you override it, so run traces land in the daemon’s run directory.

### Pip/index policy (server mode)

These flags affect how the daemon runs `pip install` for **pip-driver** runtime profiles:

```bash
arp-jarvis daemon --pip-index-url https://pypi.org/simple
arp-jarvis daemon --pip-no-index
arp-jarvis daemon --pip-extra-index-url https://<private-index>/simple --pip-trusted-host <private-index-host>
arp-jarvis daemon --pip-upgrade-pip
```

## Runtime profiles (safe list)

In ARP, runtime profiles are generic objects with an `extensions` field for implementation-specific configuration.

In **JARVIS**, the daemon requires a namespaced extension key:

- `extensions["arp.jarvis.exec"]`

Supported exec drivers:

- `pip`: install a pinned runtime package into a cached venv and run its entrypoint
- `command`: run a local command template directly

`pip_spec` must be pinned (for example `pkg==version`, a local path, or `name @ file:///...`).

:::tip Sample profile JSON

This repo includes a sample runtime profile request file you can adapt:

- `arp/JARVIS_Daemon/jarvis-runtime-profile.json`

:::

### Example: pip driver profile (local dev)

```json
{
  "runtime_name": "arp-jarvis-runtime",
  "extensions": {
    "arp.jarvis.exec": {
      "driver": "pip",
      "pip_spec": "arp-jarvis-runtime @ file:///path/to/arp/JARVIS_Runtime",
      "entrypoint": "arp-jarvis-runtime",
      "entrypoint_args": ["serve"]
    }
  }
}
```

To upsert a profile via the CLI:

```bash
arp-jarvis daemon runtime-profiles upsert jarvis-local --request-json ./jarvis-runtime-profile.json
```

:::note Safe list enforcement

The daemon only creates managed instances from runtime profiles it knows about (its “safe list”).
To bypass this in dev, start the daemon server with `--allow-unsafe-runtime-profiles`.

:::

## Managed instances (create/list/delete)

```bash
arp-jarvis daemon start --runtime-profile <profile> --count 1 --tool-registry-url http://127.0.0.1:8000
arp-jarvis daemon list
arp-jarvis daemon delete <instance_id>
```

## Unmanaged instances (register)

```bash
arp-jarvis daemon register --runtime-api-endpoint http://127.0.0.1:43120
```

## Runs (submit/status/result/trace)

```bash
arp-jarvis daemon run --request-json ./run-request.json
arp-jarvis daemon status <run_id>
arp-jarvis daemon result <run_id>
arp-jarvis daemon trace <run_id>
```

:::tip Typical flow (profiles → instances → runs)

1. Upsert a runtime profile: `arp-jarvis daemon runtime-profiles upsert …`
2. Start an instance: `arp-jarvis daemon start …`
3. Submit a run: `arp-jarvis daemon run --request-json …`

:::
