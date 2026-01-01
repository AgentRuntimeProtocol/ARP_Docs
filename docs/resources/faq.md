---
title: FAQ / Troubleshooting
sidebar_position: 1
---

Common questions and errors, along with suggested fixes.

## Common issues

### Run Gateway

- **Coordinator missing**: `Run Gateway` fails fast if `JARVIS_RUN_COORDINATOR_URL` is not set. Set it to the `Run Coordinator` base URL (example: `http://127.0.0.1:8081`).
- **401 / missing bearer token**: Auth is enabled by default in most JARVIS services. For local dev, set `ARP_AUTH_PROFILE=dev-insecure` (dev only) or configure your STS issuer/audience properly.

### Run Coordinator

- **Deny-by-default**: When `PDP` is not configured, the coordinator defaults to deny unless `JARVIS_POLICY_PROFILE=dev-allow` is set (dev only).
- **Internal stores unavailable**: `Run Coordinator` requires `Run Store`, `Event Stream`, and `Artifact Store` URLs (`JARVIS_RUN_STORE_URL`, `JARVIS_EVENT_STREAM_URL`, `JARVIS_ARTIFACT_STORE_URL`).

### Selection / Composite execution

- **Selection cannot produce candidates**: In JARVIS v0.3.x, `Selection` returns an error rather than silently guessing. Ensure `Node Registry` is reachable and has `NodeType`s seeded.
- **LLM profile issues**: By default, JARVIS expects the `arp-llm` OpenAI profile (`openai`). Configure:
  - `ARP_LLM_API_KEY`
  - `ARP_LLM_CHAT_MODEL`
  - (optional) `ARP_LLM_PROFILE=openai`

  For offline/no-network development, explicitly opt into the deterministic mock:
  - `ARP_LLM_PROFILE=dev-mock` (optional; not the default)

## Contact / support

Report issues in the repo that owns the behavior:

- Docs site: `https://github.com/AgentRuntimeProtocol/ARP_Docs/issues`
- ARP Standard: `https://github.com/AgentRuntimeProtocol/ARP_Standard/issues`
- Run Gateway: `https://github.com/AgentRuntimeProtocol/JARVIS_RunGateway/issues`
- Run Coordinator: `https://github.com/AgentRuntimeProtocol/JARVIS_RunCoordinator/issues`
- Atomic Executor: `https://github.com/AgentRuntimeProtocol/JARVIS_AtomicExecutor/issues`
- Composite Executor: `https://github.com/AgentRuntimeProtocol/JARVIS_CompositeExecutor/issues`
- Node Registry: `https://github.com/AgentRuntimeProtocol/JARVIS_NodeRegistry/issues`
- Selection Service: `https://github.com/AgentRuntimeProtocol/JARVIS_SelectionService/issues`
- PDP: `https://github.com/AgentRuntimeProtocol/JARVIS_PDP/issues`
