---
title: Runtime
sidebar_position: 2
---

JARVIS Runtime is a Python runtime that implements the **ARP Runtime API v1** and a CLI for demos and local runs.

At a high level it runs a simple 3-role loop:

1. **Planner** (decide next steps)
2. **Tool Executor** (generate args + invoke a tool via Tool Registry)
3. **Chat** (final response)

:::note Spec reference

This page documents the JARVIS implementation. For the normative ARP Standard contract, see:

- [ARP Standard: Runtime](../../arp-standard/components/runtime.md)
- OpenAPI source: `ARP_Standard/spec/v1/openapi/runtime.openapi.yaml`

:::

:::tip Runtime vs Daemon

- Run the Runtime directly when you have a single runtime process and you’re iterating locally.
- Use the [JARVIS Daemon](./daemon.md) when you need instance lifecycle management (spawn/register/route runs).

:::

## Run (CLI)

Run a demo flow against a Tool Registry service:

```bash
arp-jarvis tool-registry
arp-jarvis runtime demo --tool-registry-url http://127.0.0.1:8000
```

Run a single request:

```bash
arp-jarvis runtime run --tool-registry-url http://127.0.0.1:8000 --request "What time is it in UTC?"
```

Replay Chat from a recorded trace:

```bash
arp-jarvis runtime replay --trace ./runs/<flow_id>/trace.jsonl
```

:::tip Component CLI

You can also run the component CLI directly (equivalent):

- `arp-jarvis-runtime demo …`
- `arp-jarvis-runtime run …`
- `arp-jarvis-runtime replay …`

:::

## Run (HTTP server)

```bash
arp-jarvis runtime serve --host 127.0.0.1 --tool-registry-url http://127.0.0.1:8000
```

The default port is `8081`. If the selected port is unavailable, the runtime can fall back to a free port:

- omit `--port` (default `8081`) to allow fallback when `8081` is already in use
- use `--port 0` to always pick a free port
- use `--auto-port` to fall back when an explicit `--port` is in use

HTTP endpoints (v1):

- `GET /v1/health`
- `GET /v1/version`
- `POST /v1/runs`
- `GET /v1/runs/{run_id}`
- `GET /v1/runs/{run_id}/result`

Optional endpoints are implemented as explicit “not supported” responses in this runtime:

- `POST /v1/runs/{run_id}:cancel` (returns `409`)
- `GET /v1/runs/{run_id}/events` (returns `501`)

### Example: create a run

```bash
curl -sS -X POST http://127.0.0.1:8081/v1/runs \
  -H 'Content-Type: application/json' \
  -d '{"input":{"goal":"What is (19*23)?"}}'
```

:::note Execution model

This runtime executes runs synchronously. In practice, `POST /v1/runs` returns a terminal `RunStatus` and writes a `RunResult` you can fetch via `GET /v1/runs/{run_id}/result`.

:::

## Configuration

Common CLI flags (and env vars):

- Tool Registry URL: `--tool-registry-url` (env: `ARP_TOOL_REGISTRY_URL`, back-compat: `JARVIS_TOOL_REGISTRY_URL`)
- Trace dir: `--trace-dir` (env: `JARVIS_TRACE_DIR`, default: `./runs`)
- Prompt redaction: `--redact-prompts` (env: `JARVIS_REDACT_PROMPTS`)
- Mode: `--mode stub|openai` (env: `JARVIS_RUNTIME_MODE`, default: `stub`)

### OpenAI mode (optional)

To enable OpenAI-backed roles:

- install: `python3 -m pip install "arp-jarvis-runtime[openai]"`
- set: `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`)

Optional overrides:

- `OPENAI_BASE_URL` / `JARVIS_OPENAI_BASE_URL` (default: `https://api.openai.com/v1`)
- `JARVIS_MODEL_DEFAULT` (default: `gpt-5-nano`)
- `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

## Tracing

The runtime writes a JSONL trace under `--trace-dir` (default `./runs`):

- CLI mode: `./runs/<flow_id>/trace.jsonl` (a generated UUID flow ID)
- HTTP server mode: `<trace-dir>/<run_id>/trace.jsonl`

In HTTP server mode, the runtime also writes:

- `<trace-dir>/<run_id>/request.json`
- `<trace-dir>/<run_id>/status.json`
- `<trace-dir>/<run_id>/result.json`

Common event types include: `flow_started`, `step_created`, `step_started`, `tool_args_generated`, `tool_invocation`, `tool_result`, `llm_call`, `llm_result`, `flow_completed`.
