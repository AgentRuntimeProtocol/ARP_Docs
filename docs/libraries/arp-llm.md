---
title: arp-llm
sidebar_position: 2
---

`arp-llm` is a shared helper for calling LLM providers in a consistent way across the ARP/JARVIS stack.

It provides two primary interfaces:
- `ChatModel.response(...)` (text/chat + optional JSON Schema structured output)
- `Embedder.embed(...)` (embeddings)

## Where it’s used in JARVIS (v0.3.x)

- **`Selection Service`**: rank `NodeType`s into bounded candidate sets
- **`Composite Executor`**: planning (decomposition) and argument generation

## Configuration model

`arp-llm` uses an env-driven “profile” pattern:
- default profile: `openai` (requires `ARP_LLM_API_KEY` + `ARP_LLM_CHAT_MODEL`)
- optional profile: `dev-mock` (no network; requires explicit `ARP_LLM_PROFILE=dev-mock`)

See:
- GitHub: `AgentRuntimeProtocol/ARP_LLM`
- PyPI: `arp-llm`
