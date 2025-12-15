---
title: Runtime
sidebar_position: 2
---

The ARP "Jarvis" Runtime is the execution engine for agents. It orchestrates model calls and
tool usage to complete tasks. A Runtime Instance is the component most resembling an individual AI "Agent".

## Responsibilities

- Executes a `flow`: **Planner → Tool Executor → Chat**.
  - The `Planner` outputs a list of further `plan` or `tool` steps needed to achieve the goal. This provides LLM-driven self-mutation capability to the flows. 
  - The `Tool Executor` generate the exact arguments needed to call a `tool` via the tool registry client, then make the call.
  - Once all steps are executed, the `Chat` handler reads the execution record of the steps, and returns a final result.
- Maintains execution context across steps (`user_request`, `step_results`, trace metadata).
- Integrates with `Tool Registry` for tool discovery (`list_tools`), schema lookup (`get_tool`), and invocation (`invoke`).
- Emits a JSONL trace (`trace.jsonl`) capturing step lifecycle and tool/LLM calls.

In the current MVP, the Runtime is primarily a **CLI** (`jarvis-runtime …`) plus a small set of Python orchestration classes you can embed.

## Interfaces

### CLI (MVP)

- `jarvis-runtime demo`: runs a small multi-request demo flow
- `jarvis-runtime run --request "<text>"`: runs a single request
- `jarvis-runtime replay --trace <path>`: replays Chat from a recorded trace

### Python (library entry points)

- `jarvis_runtime.orchestrator.FlowOrchestrator`: executes a flow and returns a `RunResult` (final text, status, steps, and trace paths).
- `jarvis_runtime.tool_registry_client.HttpToolRegistryClient` / `InProcessToolRegistryClient`: Tool Registry integration.

High-level input/output:

- **Input**: a `user_request: str`
- **Output**: a final `final_text: str` plus a trace file path (`runs/<flow_id>/trace.jsonl`)

## Configuration

The Runtime is configured via CLI flags and environment variables:

- Tool Registry:
  - `--tool-registry http|inproc` (or `JARVIS_TOOL_REGISTRY_MODE`)
  - `--tool-registry-url http://…` (or `JARVIS_TOOL_REGISTRY_URL`)
- Tracing:
  - `--trace-dir <path>` (or `JARVIS_TRACE_DIR`)
  - `--redact-prompts` (or `JARVIS_REDACT_PROMPTS`)
- Model mode:
  - `--mode stub|openai` (or `JARVIS_RUNTIME_MODE`)

When using `--mode openai`, the Runtime requires `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`) and optionally supports:

- `OPENAI_BASE_URL` / `JARVIS_OPENAI_BASE_URL`
- `JARVIS_MODEL_DEFAULT`, `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

## Lifecycle

A typical run looks like:

1. **Flow starts** with `user_request`.
2. **Planner step** decides what to do next (often returns one or more `tool` steps).
3. **Tool step(s)**:
   - Runtime fetches tool schema from Tool Registry (`GET /v1/tools/{name}`).
   - Tool args are generated and validated against the tool’s JSON Schema.
   - Tool is invoked via Tool Registry (`POST /v1/tools/{name}:invoke`).
4. **Chat step** produces the final user-facing response using accumulated context.
5. **Trace is written** throughout (`flow_started`, `step_created`, `tool_invocation`, `tool_result`, `llm_call`, `flow_completed`, …).
