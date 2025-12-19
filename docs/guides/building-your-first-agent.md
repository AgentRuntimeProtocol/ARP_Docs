---
title: Building Your First Agent Runtime
sidebar_position: 2
---

In ARP, your “agent” is typically implemented as an ARP **Runtime** service: it accepts a `RunRequest` and returns a `RunStatus` / `RunResult`.

This guide builds a tiny Runtime in Python and runs it in a local ARP stack alongside the JARVIS Tool Registry (and optionally routes runs through the JARVIS Daemon).

:::note Standard vs. implementation

This guide focuses on implementing the **ARP Standard v1 Runtime** contract, then composing it with the **JARVIS** services.

- Runtime Spec: [ARP Standard: Runtime](../arp-standard/components/runtime.md)
- Tool discovery/invocation: [JARVIS Tool Registry](../jarvis/component-implementations/tool-registry.md)
- Routing to runtimes: [JARVIS Daemon](../jarvis/component-implementations/daemon.md)

:::

## What you’ll build

- A minimal Runtime HTTP server that implements the required v1 endpoints
- A deterministic (non-LLM) “agent” that calls a Tool Registry tool (`calc` or `echo`)
- Optional: register your Runtime with the Daemon and submit runs through it

## Prerequisites

- Python `>=3.10`
- The JARVIS stack installed (`arp-jarvis`) so you can run Tool Registry + Daemon (see the [Quickstart](../quickstart.md))

:::tip Meta CLI vs component CLIs

This guide uses the meta CLI (`arp-jarvis …`). You can also run component CLIs directly (for example `arp-jarvis-tool-registry`, `arp-jarvis-daemon`).

:::

---

## Step 1: Start Tool Registry

Terminal A:

```bash
arp-jarvis tool-registry
```

Sanity check:

```bash
curl -sS http://127.0.0.1:8000/v1/health
curl -sS http://127.0.0.1:8000/v1/version
curl -sS http://127.0.0.1:8000/v1/tools
```

If Tool Registry is not running on `:8000`, update the base URL in the commands above (and `ARP_TOOL_REGISTRY_URL` below) to match.

The default `core` domain includes tools you can call immediately: `calc`, `echo`, `time_now`.

---

## Step 2: Implement a minimal Runtime (your agent)

An ARP Runtime has two responsibilities:

- **HTTP contract**: implement the required `/v1/...` endpoints.
- **Agent logic**: decide what to do for a goal (and optionally call tools).

To keep the HTTP server example readable, we split those concerns into two small files:

- `my_agent_runtime/agent.py`: deterministic “agent” logic + Tool Registry calls
- `my_agent_runtime/app.py`: FastAPI app that implements the Runtime API and delegates to `run_goal(...)`

File layout:

```text
my_agent_runtime/
  agent.py
  app.py
```

Create the folder:

```bash
mkdir -p my_agent_runtime
```

:::note Why a folder?

We use a `my_agent_runtime/` package folder so `uvicorn my_agent_runtime.app:app` can import your server module cleanly.

:::

### Step 2.1: Agent logic (`my_agent_runtime/agent.py`)

This file is the “agent brain”. It takes a `goal` string and deterministically decides which tool to call. Keeping this separate makes it easy to iterate on agent behavior without touching the HTTP layer.

:::note Deterministic example (no LLM)

This guide uses a deterministic agent so you can run it without model credentials and get predictable behavior.

An LLM-based agent uses the same structure: keep the Runtime HTTP server and tool wrappers the same, and replace only `run_goal(...)` with code that calls your model and decides which tools to invoke.

If you want to wire in a model, see [Custom Model Integration (JARVIS Runtime)](./custom-model-integration.md).

:::

```py title="my_agent_runtime/agent.py"
from __future__ import annotations

import os
import re
import uuid

from arp_sdk.tool_registry import InvokeToolRequest, ToolRegistryClient


def _tool_registry_client() -> ToolRegistryClient:
    # -----------------------------------------------------------------------------
    # Tool Registry client
    # -----------------------------------------------------------------------------
    #
    # Tool Registry base URL is passed via env so this runtime can be
    # deployed/routed flexibly.
    # JARVIS Daemon sets ARP_TOOL_REGISTRY_URL for managed runtimes
    # automatically when provided.
    base_url = (
        os.getenv("ARP_TOOL_REGISTRY_URL") or "http://127.0.0.1:8000"
    ).rstrip("/")
    return ToolRegistryClient(base_url=base_url)


def _tool_error(inv) -> str:
    # -----------------------------------------------------------------------------
    # Errors
    # -----------------------------------------------------------------------------
    #
    # When ok=False, Tool Registry returns a typed error object.
    # We serialize it into a readable message.
    err = inv.error.to_dict() if hasattr(inv.error, "to_dict") else {}
    return (
        f"Tool error: {err.get('code', 'tool.error')}: "
        f"{err.get('message', 'Unknown tool error')}"
    )


def call_calc(expression: str) -> str:
    # -----------------------------------------------------------------------------
    # Tool wrappers
    # -----------------------------------------------------------------------------
    #
    # Invoke the built-in `calc` tool from the `core` domain.
    client = _tool_registry_client()
    inv = client.invoke_tool(
        InvokeToolRequest(
            # invocation_id is caller-supplied; make it unique so it can be
            # traced end-to-end.
            invocation_id=f"inv_{uuid.uuid4().hex[:8]}",
            # InvokeToolRequest requires either tool_id or tool_name.
            # tool_name is easiest to read in tutorials.
            tool_name="calc",
            # Args must match the tool's input_schema (see Tool Registry `/v1/tools`).
            args={"expression": expression},
        )
    )
    if not inv.ok:
        return _tool_error(inv)
    # Successful results are nested under inv.result, which is a typed model.
    result = inv.result.to_dict() if hasattr(inv.result, "to_dict") else {}
    return f"{result.get('expression', expression)} = {result.get('value')}"


def call_echo(text: str) -> str:
    # Invoke the built-in `echo` tool from the `core` domain.
    client = _tool_registry_client()
    inv = client.invoke_tool(
        InvokeToolRequest(
            invocation_id=f"inv_{uuid.uuid4().hex[:8]}",
            tool_name="echo",
            args={"text": text},
        )
    )
    if not inv.ok:
        return _tool_error(inv)
    result = inv.result.to_dict() if hasattr(inv.result, "to_dict") else {}
    return str(result.get("text", ""))


def run_goal(goal: str) -> str:
    # -----------------------------------------------------------------------------
    # Goal execution (your "agent")
    # -----------------------------------------------------------------------------
    #
    # Minimal deterministic "planner":
    # - If the user included parentheses with an arithmetic expression, call `calc`.
    # - Otherwise call `echo` to prove the plumbing end-to-end.
    match = re.search(r"\(([^()]+)\)", goal)
    if match:
        return call_calc(match.group(1).strip())
    return call_echo(goal)
```

### Step 2.2: Runtime HTTP server (`my_agent_runtime/app.py`)

This file implements the **ARP Runtime API v1** endpoints and delegates the core decision making to `run_goal(...)`.

```py title="my_agent_runtime/app.py"
from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import Body, FastAPI
from fastapi.responses import JSONResponse

from arp_sdk.runtime.models import RunRequest, RunResult, RunStatus, RunStatusState
from arp_sdk.runtime.types import Unset as RuntimeUnset

from my_agent_runtime.agent import run_goal

# This FastAPI app is your Runtime HTTP server.
# It implements the required ARP Runtime v1 endpoints:
# - POST /v1/runs
# - GET  /v1/runs/{run_id}
# - GET  /v1/runs/{run_id}/result
app = FastAPI(title="Example Agent Runtime", version="0.1.0")

# For a tutorial we keep state in-memory.
# In a real runtime you would persist these and support long-running/async states.
# Also note: in-memory dicts won't work across multiple workers/processes.
_RUN_STATUSES: dict[str, RunStatus] = {}
_RUN_RESULTS: dict[str, RunResult] = {}


def _utc_now() -> datetime:
    return datetime.now(timezone.utc).replace(microsecond=0)


def _error_envelope(
    *,
    code: str,
    message: str,
    details: Any | None = None,
) -> dict[str, Any]:
    # The ARP error shape is:
    # {"error": {"code": "...", "message": "...", "details": {...}}}
    payload: dict[str, Any] = {"error": {"code": code, "message": message}}
    if details is not None:
        payload["error"]["details"] = details
    return payload


@app.get("/v1/health")
def health() -> dict[str, Any]:
    return {"status": "ok", "time": _utc_now().isoformat(), "checks": []}


@app.get("/v1/version")
def version() -> dict[str, Any]:
    return {
        "service_name": "example-agent-runtime",
        "service_version": "0.1.0",
        "supported_api_versions": ["v1"],
    }


@app.post("/v1/runs")
def create_run(body: dict[str, Any] = Body(...)) -> JSONResponse:
    # -----------------------------------------------------------------------------
    # Core endpoint: accept a RunRequest and return a RunStatus
    # -----------------------------------------------------------------------------
    #
    # Parse and validate against the ARP Standard RunRequest schema
    # using the generated SDK model.
    try:
        request = RunRequest.from_dict(body)
    except Exception as exc:  # noqa: BLE001 - demo error handling
        return JSONResponse(
            status_code=400,
            content=_error_envelope(
                code="bad_request",
                message="Invalid RunRequest",
                details={"error": str(exc)},
            ),
        )

    # openapi-python-client uses an UNSET sentinel for optional fields.
    # If the caller did not provide run_id, we assign one.
    if isinstance(request.run_id, RuntimeUnset):
        request.run_id = f"run_{uuid.uuid4().hex[:12]}"
    run_id = str(request.run_id)

    # This tutorial runtime executes synchronously: it completes the run
    # before returning RunStatus.
    # (The ARP spec also allows queued/running async patterns;
    # see ARP Standard: Runtime.)
    started_at = _utc_now()
    final_text = run_goal(str(request.input_.goal))
    ended_at = _utc_now()

    # For simplicity, we always mark the run as succeeded.
    # If you want tool failures to produce failed runs, set state=FAILED
    # and return ok=False in RunResult.
    status = RunStatus(
        run_id=run_id,
        state=RunStatusState.SUCCEEDED,
        started_at=started_at,
        ended_at=ended_at,
    )

    # Persist status + result so the caller can fetch them later via the GET endpoints.
    #
    # RunResult.output is an object (schema allows arbitrary keys).
    # We use `final_text` as a simple convention.
    result = RunResult.from_dict(
        {
            "run_id": run_id,
            "ok": True,
            "output": {"final_text": final_text},
        }
    )

    _RUN_STATUSES[run_id] = status
    _RUN_RESULTS[run_id] = result

    return JSONResponse(status_code=200, content=status.to_dict())


@app.get("/v1/runs/{run_id}")
def get_run_status(run_id: str) -> JSONResponse:
    # Required endpoint: return the status for a previously created run_id.
    status = _RUN_STATUSES.get(run_id)
    if status is None:
        return JSONResponse(
            status_code=404,
            content=_error_envelope(
                code="not_found",
                message=f"Unknown run_id: {run_id}",
            ),
        )
    return JSONResponse(status_code=200, content=status.to_dict())


@app.get("/v1/runs/{run_id}/result")
def get_run_result(run_id: str) -> JSONResponse:
    # Required endpoint: return the result for a previously created run_id.
    result = _RUN_RESULTS.get(run_id)
    if result is None:
        return JSONResponse(
            status_code=404,
            content=_error_envelope(
                code="not_found",
                message=f"Unknown run_id: {run_id}",
            ),
        )
    return JSONResponse(status_code=200, content=result.to_dict())
```

This Runtime is intentionally small:

- It implements the **required** Runtime v1 endpoints (health/version + runs/status/result).
- It calls Tool Registry deterministically:
  - If the goal contains a parenthesized arithmetic expression, it calls `calc`.
  - Otherwise, it calls `echo`.

---

## Step 3: Run your Runtime

Terminal B:

```bash
export ARP_TOOL_REGISTRY_URL=http://127.0.0.1:8000
python3 -m uvicorn my_agent_runtime.app:app \
  --host 127.0.0.1 \
  --port 43120
```

Sanity check:

```bash
curl -sS http://127.0.0.1:43120/v1/health
curl -sS http://127.0.0.1:43120/v1/version
```

---

## Step 4: Submit a run (direct)

Create a run:

```bash
curl -sS -X POST http://127.0.0.1:43120/v1/runs \
  -H 'Content-Type: application/json' \
  -d '{"input":{"goal":"What is (19*23)?"}}'
```

Then fetch the result (copy `run_id` from the response):

```bash
curl -sS \
  http://127.0.0.1:43120/v1/runs/<run_id>/result
```

---

## Step 5 (Optional): Route runs through the Daemon

Terminal C (daemon server):

```bash
arp-jarvis daemon \
  --host 127.0.0.1 \
  --port 8082
```

Terminal D (register your already-running runtime):

```bash
arp-jarvis daemon register \
  --runtime-api-endpoint http://127.0.0.1:43120
```

The response includes `instance.instance_id` (for example `ext_abc123...`). Create a `RunRequest` JSON file that targets that instance:

```bash
cat > run-request.json <<'JSON'
{
  "input": { "goal": "What is (19*23)?" },
  "runtime_selector": { "instance_id": "<instance_id>" }
}
JSON
```

Submit a run via the daemon:

```bash
arp-jarvis daemon run \
  --request-json ./run-request.json
```

Then fetch the result (copy `run_id` from the status output):

```bash
arp-jarvis daemon result <run_id>
```

:::tip Managed instances (optional)

If you want the daemon to start/stop your runtime process, use **runtime profiles** (`extensions["arp.jarvis.exec"]`) and `arp-jarvis daemon start ...`.

See [JARVIS Daemon](../jarvis/component-implementations/daemon.md).

:::

## Next steps

- ARP Runtime contract details: [ARP Standard: Runtime](../arp-standard/components/runtime.md)
- Conformance and required endpoints: [ARP Standard: Conformance](../arp-standard/conformance.md)
- Add your own tools to Tool Registry: [Integrating Your First Custom Tool](./tool-development-guide.md)
