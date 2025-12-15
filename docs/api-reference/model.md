---
title: Model API Reference
sidebar_position: 4
---

Authoritative reference for model integration interfaces and configuration.

## Interfaces

In the MVP, model integration is internal to the Runtime (there is no separate “model service” API).

When running the Runtime in `openai` mode, the Planner, Tool Args Generator, and Chat roles call an `LlmClient`:

- `jarvis_runtime.llm.client.LlmClient.responses(system_prompt, user_prompt, output_schema?, model_override?) -> dict`

The shipped implementation is `OpenAIResponsesClient`, which uses the OpenAI Python SDK to call the OpenAI Responses API and (optionally) request JSON Schema structured outputs.

## Configuration

OpenAI mode configuration:

- Required:
  - `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`)
- Optional:
  - `OPENAI_BASE_URL` (or `JARVIS_OPENAI_BASE_URL`)
  - `JARVIS_MODEL_DEFAULT`
  - `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

Runtime selection:

- `--mode openai` (or `JARVIS_RUNTIME_MODE=openai`)

## Extensibility

To add a new provider in the MVP:

- Implement `LlmClient`.
- Add a new runtime mode that instantiates your client and wires it into `LlmPlanner`, `LlmToolArgsGenerator`, and `LlmChat`.
- Validate behavior via trace output (`llm_call` / `llm_result` events) and keep `stub` mode as a fallback.
