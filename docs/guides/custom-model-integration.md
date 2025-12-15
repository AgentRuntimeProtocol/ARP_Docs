---
title: Custom Model Integration
sidebar_position: 4
---

How to integrate a new model provider or adapter with ARP.

## When to use this

Common reasons:

- You want to use a non-OpenAI provider (local model, self-hosted endpoint, enterprise gateway).
- You need custom auth/routing, policy enforcement, or observability hooks around model calls.
- You want different latency/cost tradeoffs per role (Planner vs tool-args vs Chat).
- You want offline/sandboxed execution where external network calls are not allowed.

## Integration steps

### 1. Configuration changes

In the MVP runtime, model selection is driven by:

- `--mode stub|openai` (or `JARVIS_RUNTIME_MODE`)
- model overrides via `JARVIS_MODEL_*` env vars

To add a new provider, you typically introduce a new runtime mode (for example `--mode myprovider`) plus whatever env vars your provider needs.

### 2. Adapter / implementation changes

The runtime’s LLM-backed roles expect a single interface:

- Implement `jarvis_runtime.llm.client.LlmClient` (`responses(system_prompt, user_prompt, output_schema?, model_override?) -> dict`)

Then wire it into:

- `LlmPlanner` (structured output for planned steps)
- `LlmToolArgsGenerator` (structured output for tool args)
- `LlmChat` (final response)

### 3. Validation and rollout

- Keep `stub` mode working as a deterministic fallback.
- Add unit tests around the new client adapter and failure modes.
- Use traces (`trace.jsonl`) to compare tool selection, tool args, and final responses across providers.
- Roll out behind a new mode flag so you can switch providers without changing tool contracts.
