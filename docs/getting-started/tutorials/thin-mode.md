---
slug: /tutorials/thin-mode
title: Thin Mode — Wrap an Existing API
sidebar_position: 0
---

Thin mode is the fastest adoption path: **keep your existing service as-is**, and expose it as an atomic `NodeType` by running a small “wrapper node” inside `Atomic Executor`.

This tutorial is intentionally practical: you’ll build a real, runnable node pack and verify it works.

:::note Standard vs. implementation
ARP Standard defines the *execution contracts* (`NodeType`, `NodeRun`, `Atomic Executor`). How you *author and distribute node handlers* is an implementation choice.

JARVIS (v0.x) uses a Python “node pack” mechanism based on packaging entry points (`jarvis.nodepacks`).
:::

## Goal

You will:

1) Wrap an existing HTTP API as a new atomic `NodeType`.
2) Install it as a JARVIS node pack so:
   - `Node Registry` seeds the `NodeType` metadata, and
   - `Atomic Executor` loads the handler.
3) Execute it via the ARP `Atomic Executor` API.

## When to use this

- You already have a stable upstream API and want to make it callable as an ARP capability.
- You want to avoid running untrusted code (the wrapper code is *your* code, deployed in your stack).

## Prerequisites

- Python `>=3.11`
- A reachable upstream HTTP API (for this tutorial we assume it has a `GET /health`)
- JARVIS components available locally (recommended):
  - Install `arp-jarvis` (pins compatible component versions)
  - Run `Node Registry` + `Atomic Executor` via `arp-jarvis node-registry ...` and `arp-jarvis atomic-executor ...`

For a “no Keycloak” local run, you can disable inbound auth with `ARP_AUTH_MODE=disabled` (dev only).

## Step 0: Start a tiny demo upstream API (optional)

If you don’t already have an upstream API to wrap, start a tiny local server that exposes `GET /health`:

```bash
python3 - <<'PY'
from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):  # noqa: N802
        if self.path != "/health":
            self.send_response(404)
            self.end_headers()
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"ok")

HTTPServer(("127.0.0.1", 9999), Handler).serve_forever()
PY
```

## How node packs work in JARVIS v0.x

JARVIS discovers node packs via Python packaging **entry points**:

- Entry point group: `jarvis.nodepacks`
- Each entry point resolves to a `NodePack` object (metadata + handlers)

Then:

- `Node Registry` loads `NodeType` metadata from all installed packs and seeds them into its DB on startup.
- `Atomic Executor` loads handlers from all installed packs and executes them by `node_type_id`.

## Step 1: Create a node pack package

Create a new folder (name it anything; `acme-jarvis-nodepack` is an example):

```bash
mkdir -p acme-jarvis-nodepack/src/acme_jarvis_nodepack
cd acme-jarvis-nodepack
```

Create `pyproject.toml`:

```toml
[build-system]
requires = ["setuptools>=70", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "acme-jarvis-nodepack"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "arp-jarvis-atomic-nodes[runtime]==0.3.3",
]

[project.entry-points."jarvis.nodepacks"]
"acme.thin" = "acme_jarvis_nodepack.pack:pack"

[tool.setuptools]
package-dir = { "" = "src" }

[tool.setuptools.packages.find]
where = ["src"]
```

Create `src/acme_jarvis_nodepack/__init__.py`:

```python
__version__ = "0.1.0"
```

## Step 2: Implement a wrapper node

Create `src/acme_jarvis_nodepack/health_node.py`:

```python
from __future__ import annotations

import os

from jarvis_atomic_nodes.sdk import NodeContext, atomic_node


HEALTH_INPUT_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "base_url": {"type": ["string", "null"]},
    },
    "required": ["base_url"],
}

HEALTH_OUTPUT_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "status_code": {"type": "integer"},
        "text": {"type": "string"},
    },
    "required": ["status_code", "text"],
}


@atomic_node(
    name="acme.api.health",
    side_effect="read",
    trust_tier="first_party",
    egress_policy="external_http",
    input_schema=HEALTH_INPUT_SCHEMA,
    output_schema=HEALTH_OUTPUT_SCHEMA,
)
async def acme_api_health(inputs: dict, ctx: NodeContext) -> dict:
    \"\"\"Call `GET /health` on an existing service and return the raw response text.\"\"\"

    base_url = (inputs.get("base_url") or os.environ.get("ACME_API_BASE_URL") or "").strip()
    if not base_url:
        raise ValueError("Missing base URL (set ACME_API_BASE_URL or pass base_url)")

    import httpx

    async with httpx.AsyncClient(timeout=5.0) as client:
        resp = await client.get(f\"{base_url.rstrip('/')}/health\")
    return {"status_code": resp.status_code, "text": resp.text}
```

Notes:
- This node uses `httpx` only at runtime (imported inside the handler), so metadata discovery can stay lightweight.
- In v0.x, `Atomic Executor` runs this code in-process; treat it as trusted.

## Step 3: Export a `NodePack`

Create `src/acme_jarvis_nodepack/pack.py`:

```python
from __future__ import annotations

from jarvis_atomic_nodes.sdk import NodePack

from . import __version__
from .health_node import acme_api_health

pack = NodePack(
    pack_id="acme.thin",
    version=__version__,
    nodes=[acme_api_health],
)
```

## Step 4: Install the pack (local dev)

In the pack folder:

```bash
python3 -m pip install -e .
```

## Step 5: Run Node Registry and Atomic Executor

Run Node Registry (seeds `NodeType`s from installed packs on startup):

```bash
export ARP_AUTH_MODE=disabled
export JARVIS_NODE_REGISTRY_DB_URL=sqlite:///./jarvis_node_registry.sqlite
export JARVIS_NODE_REGISTRY_SEED=true

arp-jarvis node-registry -- --host 127.0.0.1 --port 8084
```

Run Atomic Executor (loads handlers from installed packs on startup):

```bash
export ARP_AUTH_MODE=disabled
export ACME_API_BASE_URL=http://127.0.0.1:9999

arp-jarvis atomic-executor -- --host 127.0.0.1 --port 8082
```

## Step 6: Verify discovery + execution

Verify the `NodeType` exists in Node Registry:

```bash
curl -sS http://127.0.0.1:8084/v1/node-types?q=acme.api.health | python3 -m json.tool
```

Execute the node directly via Atomic Executor:

```bash
curl -sS -X POST http://127.0.0.1:8082/v1/atomic-node-runs:execute \
  -H 'Content-Type: application/json' \
  -d '{
    "run_id": "run_demo",
    "node_run_id": "node_run_demo",
    "node_type_ref": {"node_type_id": "acme.api.health", "version": "0.1.0"},
    "inputs": {}
  }' | python3 -m json.tool
```

You should get an `AtomicExecuteResult` with:
- `state: "completed"` (on success)
- `outputs` matching your output schema (`status_code`, `text`)

## Troubleshooting

- `unknown_node_type` from Atomic Executor: the pack was not installed in the executor environment, or the entry point is missing.
- Node Registry doesn’t show the node type: `JARVIS_NODE_REGISTRY_SEED=false`, or the pack is not installed, or the entry point is wrong.
- `401/403` from either service: set `ARP_AUTH_MODE=disabled` for local dev, or configure JWT properly.
- HTTP failures: verify `ACME_API_BASE_URL` and that the upstream service is reachable.

## Production note (how this gets deployed)

In production, install your node pack into the same environments/images as:

- `Node Registry` (so it can seed the `NodeType` metadata), and
- `Atomic Executor` (so it can execute the handler).

If you deploy via `JARVIS_Release` (recommended), the stack consumes **version-pinned GHCR images** by default.
To include your custom pack, build *derived images* from the pinned upstream images (install your pack with `pip`),
then point Docker Compose to your derived images (or use a small compose override file).

## Next steps

- How-to: [Wrap an HTTP API as an atomic node](../../how-to/atomic-nodes/wrap-http-api-as-atomic-node.md)
- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Atomic Executor](../../arp-standard/components/atomic-executor.md)
