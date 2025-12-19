---
title: Custom Model Integration - Gemini As An Example
sidebar_position: 4
---

Extend the **JARVIS Runtime** to use a different LLM provider (example: Google Gemini).

:::note Standard vs. implementation

ARP Standard does not define a “model provider” API. Model calls are an implementation detail of the Runtime you run.

This page is about adding a provider to the **JARVIS Runtime** (modes, adapters, and structured outputs).

:::

## When to use this

Common reasons:

- You want to use a non-OpenAI provider (local model, enterprise gateway, Gemini, etc.).
- You need custom auth/routing, policy enforcement, or observability hooks around model calls.
- You want different latency/cost tradeoffs per role (Planner vs tool-args vs Chat).
- You want offline/sandboxed execution where external network calls are not allowed.

## What you’ll build

- A new runtime mode (for example `--mode gemini`)
- A provider adapter that implements the runtime’s `LlmClient` interface
- Optional: structured outputs (JSON Schema) for Planner + tool args generation

:::note Current state (MVP)

In this repo, the JARVIS runtime ships:

- `stub` mode (deterministic, no network)
- `openai` mode (OpenAI Responses via the OpenAI Python SDK)

There is no Google/Gemini adapter in the codebase yet. The Gemini sections below show what you would implement.

:::

---

## How JARVIS uses models 

JARVIS Runtime splits “LLM work” into roles:

- **Planner**: turns a request into tool/plan steps
- **Tool args generator**: produces tool argument JSON that matches each tool’s `input_schema`
- **Chat**: produces the final user-facing response

All LLM-backed roles call a single interface:

- `jarvis_runtime.llm.client.LlmClient.responses(system_prompt, user_prompt, output_schema?, model_override?) -> dict`

In `openai` mode, JARVIS passes an `output_schema` that requests **JSON Schema structured outputs**. For example, tool args generation constructs an OpenAI-style schema request:

```json
{
  "format": {
    "type": "json_schema",
    "name": "tool_args",
    "schema": { "...": "..." },
    "strict": true
  }
}
```

See also: [Model API Reference](../api-reference/model.md).

---

## Example provider: Google Gemini (GenAI SDK)

Google’s GenAI SDK lets you call Gemini models, and it also supports JSON Schema structured outputs (return JSON that conforms to a schema).

Basic text generation looks like:

```py
from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3-flash-preview",
    contents="Explain how AI works in a few words",
)

print(response.text)
```

Structured output generation can be requested by setting the response MIME type and a JSON Schema.

:::tip Why this matters for JARVIS

JARVIS uses structured outputs to reliably parse:

- planned steps (Planner)
- tool arguments (Tool args generator)

If your provider supports JSON Schema structured outputs, you can keep the same JARVIS role logic and swap only the `LlmClient` implementation.

:::

### Step 1: Map JARVIS `output_schema` → Gemini structured output config

JARVIS passes `output_schema` as an OpenAI-style envelope (`{"format": {"type":"json_schema", ...}}`).

A Gemini adapter typically needs:

- `response_mime_type: "application/json"`
- `response_json_schema: <your_schema_dict>`

Your adapter’s job is to convert between those shapes.

### Step 2: Implement a Gemini-backed `LlmClient`

Example adapter (new file):

```py title="jarvis_runtime/llm/gemini_genai_client.py"
from __future__ import annotations

import json
import time
from dataclasses import dataclass
from typing import Any, Mapping, Optional

from google import genai


@dataclass(frozen=True, slots=True)
class GeminiGenAIClient:
    # Pick a default Gemini model for your runtime mode.
    default_model: str

    def responses(
        self,
        system_prompt: str,
        user_prompt: str,
        output_schema: Optional[Mapping[str, Any]] = None,
        model_override: Optional[str] = None,
    ) -> dict[str, Any]:
        model = model_override or self.default_model
        start = time.perf_counter()

        client = genai.Client()

        # The simplest integration is to concatenate prompts.
        # If you want role-separated prompts, adapt this to the SDK features you use.
        contents = f"{system_prompt}\n\n{user_prompt}"

        config: dict[str, Any] | None = None
        if output_schema is not None:
            # JARVIS passes:
            # {"format": {"type":"json_schema", "schema": {...}, "strict": True, ...}}
            schema = dict(output_schema.get("format", {}).get("schema") or {})
            config = {
                "response_mime_type": "application/json",
                "response_json_schema": schema,
            }

        resp = client.models.generate_content(
            model=model,
            contents=contents,
            config=config,
        )

        text = getattr(resp, "text", None) or ""
        latency_ms = int((time.perf_counter() - start) * 1000)

        parsed: dict[str, Any] | None = None
        if config is not None:
            # When structured output is requested, JARVIS expects a JSON object.
            parsed_obj = json.loads(text or "{}")
            if isinstance(parsed_obj, dict):
                parsed = parsed_obj

        return {
            "output_text": text,
            "parsed": parsed,
            "usage": None,
            "latency_ms": latency_ms,
        }
```

### Step 3: Wire your adapter into a new runtime mode

In `jarvis_runtime/cli.py`, add a new `--mode` choice (for example `gemini`) and instantiate `GeminiGenAIClient` when that mode is selected.

Keep the existing behavior:

- `stub` stays as a deterministic fallback
- `openai` stays as the shipped provider integration

### Step 4: Validate end-to-end behavior

After wiring the mode, validate with:

- `arp-jarvis runtime run --mode gemini ...`
- Traces (`trace.jsonl`) to confirm you see `llm_call` / `llm_result` events
- Tool args validity (`tool_args_invalid` should be rare if schemas are compatible)

## Notes on tool schemas + structured outputs

Tool schemas (`ToolDefinition.input_schema`) are used for both:

- validating invocations, and
- driving structured tool-args generation.

If you plan to use structured outputs for tool args, keep tool schemas strict and compatible with your provider’s JSON Schema subset.

See: [Integrating Your First Custom Tool](./tool-development-guide.md).

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

#### Expected return shape

JARVIS roles read these fields from the returned dict:

- `output_text`: string output (required for Chat; Planner/ToolArgs can also fall back to this)
- `parsed`: parsed structured output (dict) when `output_schema` is used
- `usage`: provider-specific usage object (optional)
- `latency_ms`: integer milliseconds (optional)

### 3. Validation and rollout

- Keep `stub` mode working as a deterministic fallback for testing and demos.
- Add unit tests around the new client adapter and failure modes.
- Use traces (`trace.jsonl`) to compare tool selection, tool args, and final responses across providers.
- Roll out behind a new mode flag so you can switch providers without changing tool contracts.
