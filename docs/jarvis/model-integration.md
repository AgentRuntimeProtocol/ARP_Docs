---
title: Model Integration
sidebar_position: 2
---

This page describes how **JARVIS Runtime** integrates with model providers (or runs without one) when executing runs.

:::note ARP Standard vs. JARVIS

ARP Standard does not define model/provider integration. It defines the HTTP+JSON wire contracts (endpoints, payload schemas, conformance rules).

Model integration is an implementation concern, documented here for JARVIS. We are looking into ways on how we can standardize LLM provider interfaces, but in the meantime, for the normative contracts, see [ARP Standard](../arp-standard/index.md).

:::

## Supported modes (today)

JARVIS Runtime currently supports:

| Mode | External provider | What changes |
| --- | --- | --- |
| `stub` (default) | none | deterministic “heuristic” Planner/ToolArgs/Chat roles used for demos and tests |
| `openai` (optional) | OpenAI via the OpenAI Python SDK | LLM-backed roles; Planner + tool-args use JSON Schema structured outputs |

Current limitations:

- No streaming responses.
- No other model providers are officially supported.
- No stable provider/plugin abstraction yet (adding providers requires code changes).

## Configuration

### Switching modes

Use `--mode stub|openai` (or set `JARVIS_RUNTIME_MODE`).

Example (meta CLI):

```bash
arp-jarvis runtime run \
  --mode stub \
  --tool-registry-url http://127.0.0.1:8000 \
  --request "What time is it in UTC?"
```

:::tip Component CLI

The same flags work if you run the component CLI directly (for example `arp-jarvis-runtime run …`).

:::

### OpenAI configuration

Install the optional dependency:

```bash
python3 -m pip install "arp-jarvis-runtime[openai]"
```

:::tip Pinned stack

If you installed the pinned meta package (`arp-jarvis`), you can enable OpenAI mode via:

```bash
python3 -m pip install "arp-jarvis[openai]"
```

:::

Required:

- `OPENAI_API_KEY` (or `JARVIS_OPENAI_API_KEY`)

Optional:

- `OPENAI_BASE_URL` (or `JARVIS_OPENAI_BASE_URL`) to point at a compatible endpoint
- `JARVIS_MODEL_DEFAULT` (default: `gpt-5-nano`)
- `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

Run:

```bash
export OPENAI_API_KEY="..."

arp-jarvis runtime run \
  --mode openai \
  --tool-registry-url http://127.0.0.1:8000 \
  --request "What time is it in UTC?"
```

## Adding other providers

JARVIS does not currently provide a stable provider/plugin interface. If you need a different model provider today, you’ll need to modify the JARVIS runtime code and add a new runtime mode.

## See also

- [JARVIS Runtime](./component-implementations/runtime.md)
- [Quickstart](../quickstart.md)
