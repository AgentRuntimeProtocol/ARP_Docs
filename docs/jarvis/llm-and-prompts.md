---
title: LLM usage in JARVIS
sidebar_position: 99
---

JARVIS uses LLMs in a few focused places. The goal is to keep “LLM work” separated from core orchestration and durability concerns.

## Where LLMs are used (v0.3.x)

- **`Selection Service`**: ranks `NodeType`s into a bounded candidate set for a subtask.
- **`Composite Executor`**:
  - planning (decompose a composite goal into subtasks),
  - argument generation (produce concrete `inputs` for a chosen `NodeType` schema).

## Provider integration

All LLM calls go through the shared helper library `arp-llm`, which provides:
- `ChatModel.response(...)` (optionally with JSON Schema structured output),
- a profile-based env configuration pattern.

OpenAI is the default LLM profile. If you do not set `ARP_LLM_PROFILE`, `arp-llm` assumes `openai` and requires:
- `ARP_LLM_API_KEY`
- `ARP_LLM_CHAT_MODEL`

For no-network unit tests and offline development, you can explicitly opt into the deterministic mock:
- `ARP_LLM_PROFILE=dev-mock` (optional; not the default)
  - optional fixtures: `ARP_LLM_DEV_MOCK_FIXTURES_PATH`

## Design intent

JARVIS keeps “memory” out of the LLM helper layer. If you want cross-step context:
- represent it as explicit inputs/artifacts/events, and
- let planners/selectors consume it via prompts (not hidden state).
