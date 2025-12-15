---
title: FAQ / Troubleshooting
sidebar_position: 1
---

Common questions and errors, along with suggested fixes.

## Common issues

- **I get “Missing OPENAI_API_KEY”**: You’re running the runtime with `--mode openai` but haven’t set `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`). Set the env var or switch back to `--mode stub`.
- **Tool Registry connection errors (connection refused / timeout)**: Ensure the service is running (`tool-registry`), and that the runtime is pointing at the correct URL via `--tool-registry-url` (default `http://127.0.0.1:8000`).
- **Tool not found**: Confirm it appears in `GET /v1/tools`. In the MVP, tools are loaded from domain modules at server start; ensure your domain is enabled via `TOOL_REGISTRY_DOMAINS`.
- **tool.invalid_args**: The tool invocation args did not match the tool’s JSON Schema. Fetch the definition via `GET /v1/tools/<name>` and ensure your `args` object satisfies `parameters` (`required`, `additionalProperties`, types).
- **tool.execution_error / tool.handler_error**: The tool raised an exception. For expected errors, raise `ValueError("...")` so Tool Registry returns a clean `tool.execution_error` with a message.
- **OpenAI SDK errors**: `openai` mode requires the OpenAI Python SDK (`pip install "jarvis-runtime[openai]"`). Network/API errors are surfaced as runtime exceptions; check the trace for `llm_call`/`llm_result` events.

## Contact / support

Report issues in the repo that owns the behavior:

- Runtime: `https://github.com/AgentRuntimeProtocol/JARVIS_Runtime/issues`
- Tool Registry: `https://github.com/AgentRuntimeProtocol/Tool_Registry/issues`
- Shared schemas: `https://github.com/AgentRuntimeProtocol/JARVIS_Runtime_Model/issues`
