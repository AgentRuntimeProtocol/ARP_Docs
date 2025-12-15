---
title: Model Integration
sidebar_position: 4
---

Model Integration describes how ARP connects to LLM providers and how to configure
model execution in the runtime.

## Supported providers (MVP)

The MVP runtime supports:

- **`stub` mode (default)**: no external model provider; deterministic “heuristic” Planner/ToolArgs/Chat roles used for demos and tests.
- **`openai` mode (optional)**: OpenAI Responses API via the OpenAI Python SDK (Planner + tool-args generation use JSON Schema structured outputs).

Current limitations (MVP):

- No streaming responses.
- No built-in provider abstraction beyond the OpenAI-backed client.
- Provider auth/policy/multi-tenant concerns are out of scope for now.

## Configuration

### Switching modes

- Use `--mode stub|openai` (or `JARVIS_RUNTIME_MODE`).

### OpenAI configuration

Required:

- `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`)

Optional:

- `OPENAI_BASE_URL` (or `JARVIS_OPENAI_BASE_URL`) to point at a compatible endpoint
- `JARVIS_MODEL_DEFAULT` (default: `gpt-5-nano`)
- `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

## Extensibility

There isn’t a plugin system yet; adding a new model provider currently requires code changes in the runtime:

- Implement the `LlmClient` interface (a single `responses(system_prompt, user_prompt, output_schema?, model_override?)` call).
- Wire your client into `LlmPlanner`, `LlmToolArgsGenerator`, and `LlmChat` (or create a new `--mode` that selects them).

This is expected to evolve as ARP’s model/provider abstraction stabilizes.
