---
title: FAQ / Troubleshooting
sidebar_position: 1
---

Common questions and errors, along with suggested fixes.

## Common issues

### Runtime

- **I get “Missing OPENAI_API_KEY”**: You’re running the runtime with `--mode openai` (or `JARVIS_RUNTIME_MODE=openai`) but haven’t set `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`). Set the env var or switch back to `stub` mode.
- **OpenAI SDK errors**: `openai` mode requires the optional dependency: `python3 -m pip install "arp-jarvis-runtime[openai]"` (or `python3 -m pip install "arp-jarvis[openai]"` if you installed the pinned stack).
- **Tool Registry connection errors (connection refused / timeout)**: Ensure Tool Registry is running (`arp-jarvis tool-registry` or `arp-jarvis-tool-registry`) and that the runtime is pointing at the correct URL via `--tool-registry-url` (or `ARP_TOOL_REGISTRY_URL`).

### Tool Registry

- **Tool not found**: Confirm it appears in `GET /v1/tools`. In JARVIS Tool Registry, tools are loaded from enabled domain modules at startup; ensure your domain is included in `TOOL_REGISTRY_DOMAINS`.
- **tool.invalid_args**: Tool invocation args did not match the tool’s `input_schema`. Fetch the definition via `GET /v1/tools/{tool_id}` and ensure your `args` object satisfies the schema (`required`, `additionalProperties`, types). JARVIS returns an `issues: string[]` list in `ToolInvocationResult.error.details`.
- **tool.execution_error / tool.handler_error**: The tool handler raised an exception. For expected errors, raise `ValueError("...")` so Tool Registry returns a clean `tool.execution_error` message.

### Daemon

- **Unknown runtime_profile**: The daemon only creates managed instances from its runtime profile safe list (unless started with `--allow-unsafe-runtime-profiles`). List profiles with `arp-jarvis daemon runtime-profiles list`.
- **instances.not_ready / instances.no_ready**: The selected (or matched) runtime instance is not in the `ready` state. Check `arp-jarvis daemon list` and verify the runtime process is healthy (`GET /v1/health`).

## Contact / support

Report issues in the repo that owns the behavior:

- Docs site: `https://github.com/AgentRuntimeProtocol/ARP_Docs/issues`
- ARP Standard: `https://github.com/AgentRuntimeProtocol/ARP_Standard/issues`
- Runtime: `https://github.com/AgentRuntimeProtocol/JARVIS_Runtime/issues`
- Tool Registry: `https://github.com/AgentRuntimeProtocol/JARVIS_Tool_Registry/issues`
- Daemon: `https://github.com/AgentRuntimeProtocol/JARVIS_Daemon/issues`
- Control Plane: `https://github.com/AgentRuntimeProtocol/JARVIS_ControlPlane/issues`
