---
title: Runtime API Reference
sidebar_position: 2
---

Authoritative reference for Runtime public APIs.

## Endpoints / interfaces

The MVP Runtime is exposed as a CLI plus a Python orchestration class (there is no HTTP server API yet).

### CLI

- `jarvis-runtime demo`
  - Runs a small multi-request demo flow.
- `jarvis-runtime run --request "<text>"`
  - Runs a single request and prints the final text plus a trace path.
- `jarvis-runtime replay --trace <path> [--original]`
  - Replays the final Chat step from a recorded trace (or prints the recorded final text with `--original`).

Common options:

- `--tool-registry http|inproc`
- `--tool-registry-url http://…`
- `--trace-dir <path>`
- `--mode stub|openai`

### Python

- `jarvis_runtime.orchestrator.FlowOrchestrator.run(user_request=...) -> RunResult`

## Data models

Key concepts (from `jarvis-model`):

- `FlowRun`: a flow instance (created_at, input, status).
- `FlowStep`: a step in the flow (types: `plan`, `tool`, `chat`).
- `Error`: normalized error object with `code`, `message`, and optional `details`.

Tracing:

- Traces are JSONL files at `runs/<flow_id>/trace.jsonl` (configurable via `--trace-dir`).
- Each line is a JSON object with:
  - `ts`: ISO timestamp
  - `type`: event type
  - event-specific fields (for example `tool_invocation.args`, `tool_result.result`, `llm_call.role`)

Common event types include: `flow_started`, `step_created`, `step_started`, `step_completed`, `flow_completed`, `flow_failed`, `tool_args_generated`, `tool_args_invalid`, `tool_invocation`, `tool_result`, `llm_call`, `llm_result`.

## Errors

Runtime failures surface in a few ways:

- CLI exit code: `jarvis-runtime run` exits `0` on `completed`, `1` on `failed`.
- Trace events: failures are written as `flow_failed` with an `Error` payload.
- OpenAI mode configuration: missing `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`) causes an immediate process error when `--mode openai` is selected.

Tool invocation failures are normalized by Tool Registry as `ToolResult.ok: false` with a structured `error` object; the Runtime records these in the trace and final chat context.
