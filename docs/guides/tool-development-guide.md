---
title: Integrating Your First Custom Tool
sidebar_position: 3
---

Add a custom tool to the **JARVIS Tool Registry** using its built-in “domain module” pattern, then verify discovery and invocation over HTTP.

:::note Standard vs. implementation

- ARP Standard defines the Tool Registry API and payload schemas: [ARP Standard: Tool Registry](../arp-standard/components/tool-registry.md)
- This guide shows the JARVIS *implementation* mechanism for loading tools (domain modules): [JARVIS Tool Registry](../jarvis/component-implementations/tool-registry.md)

:::

:::tip Meta CLI vs component CLI

This guide uses the meta CLI (`arp-jarvis tool-registry`). You can also run `arp-jarvis-tool-registry` directly.

:::

## What you’ll do

- Create a new domain module (`tool_registry/domains/<your_domain>.py`)
- Add a tool definition + handler
- Start Tool Registry with your domain enabled
- Invoke the tool via `POST /v1/tool-invocations`

## Prerequisites

- Python `>=3.10`
- `curl`
- A local checkout of the Tool Registry codebase (so you can edit domain modules)

---

## Step 1: Set up a local Tool Registry dev environment

In the Tool Registry repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate

# Install the pinned JARVIS stack (includes the meta CLI).
python3 -m pip install arp-jarvis

# Install Tool Registry from your checkout so your edits take effect.
python3 -m pip install -e .
```

:::tip Already using the Quickstart venv?

That’s fine. The important part is that the environment you run Tool Registry from uses your local checkout (pip editable install) so that changes you make will be applied to the package you loaded.

:::

---

## Step 2: Add a tool (domain module)

JARVIS Tool Registry loads tools at startup from Python modules:

- module path: `tool_registry.domains.<domain>`
- required function: `load_tools() -> list[tool_registry.catalog.Tool]`

Pick a domain name that is a valid Python module name (for example `my_domain`), then create:

```py title="tool_registry/domains/my_domain.py"
from __future__ import annotations

from typing import Any, Optional

from arp_sdk.tool_registry.models import (
    ToolDefinition,
    ToolDefinitionInputSchema,
    ToolDefinitionSource,
)

from ..catalog import Tool


def load_tools() -> list[Tool]:
    # Tool Registry imports this domain module at startup and calls load_tools()
    # to discover the tools in this domain.
    return [Tool(definition=_reverse_text_definition(), handler=_reverse_text)]


def _reverse_text_definition() -> ToolDefinition:
    return ToolDefinition(
        # tool_id must be unique across all enabled domains.
        tool_id="tool_reverse_text",
        # name is what runtimes typically invoke via tool_name.
        name="reverse_text",
        description="Reverse the provided text.",
        input_schema=ToolDefinitionInputSchema.from_dict(
            {
                # Keep schemas strict so they validate cleanly and so LLM tool-args
                # generation can follow them reliably.
                "type": "object",
                "properties": {"text": {"type": "string"}},
                # OpenAI Structured Outputs expects properties to be listed in
                # required (optional fields are typically modeled as nullable types).
                "required": ["text"],
                "additionalProperties": False,
            }
        ),
        source=ToolDefinitionSource.REGISTRY_LOCAL,
    )


def _reverse_text(
    args: dict[str, Any],
    context: Optional[dict[str, Any]],
    trace: Optional[dict[str, Any]],
) -> dict[str, Any]:
    # JARVIS Tool Registry currently passes trace=None.
    # (Reserved for future use.)
    # context can include caller metadata (for example trace IDs).
    _ = context
    _ = trace
    text = str(args.get("text") or "")
    return {"reversed": text[::-1]}
```

:::warning Why the `input_schema` is in this format

In ARP Standard, `ToolDefinition.input_schema` is just simply any JSON object. In practice, JARVIS uses it in a more specific way:

- In `arp-jarvis runtime --mode openai`, the runtime asks an OpenAI LLM to generate tool arguments using **OpenAI Structured Outputs** (JSON Schema), and it passes your tool’s `input_schema` as the schema the model must follow. 
- Specifically, the runtime sends your `input_schema` to the OpenAI API with `strict: true`, utilizing the *Structured Output* capability of OpenAI models. If the json does not meet OpenAI’s schema constraints, the API request fails.

Effectively, for JARVIS stack, we have to have the `input_schema` following OpenAI's standard for now.

This is a known gap: today, the “best” schema shape is influenced by OpenAI’s structured output requirements, which is vendor-specific. While this is not ideal, and doesn't fully align with ARP Standard's principle of vendor-neutrality, we decided to accept this for now. As more model providers/modes are supported, we will develop tools and helpers to translate schemas if their contract differs, to make tool definition simpler and more standardized.

For now, use the [OpenAI official documentation on Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) to format the `input_schema` of your tools, if you want to use them in the JARVIS stack.

:::

:::tip Tool design checklist

- If you plan to use `arp-jarvis runtime --mode openai`, follow the OpenAI Structured Outputs constraints.
- Pick stable identifiers: `tool_id` and `name` must be unique across enabled domains, so using a namespace like `your_domain.your_tool` may be useful.
- For expected failures, raise `ValueError("...")` (JARVIS normalizes to `tool.execution_error`).
- Always return a JSON object (`dict`) from your handler.

:::

---

## Step 3: Run Tool Registry with your domain enabled

```bash
arp-jarvis tool-registry \
  --domains core,my_domain
```

This tells Tool Registry to import:

- `tool_registry.domains.core`
- `tool_registry.domains.my_domain`

and load tools from each module’s `load_tools()`.

If the server binds to a different port, update the base URL in the commands below.

You can either:

- pass `--auto-port` to fall back to a free port when `8000` is in use, or
- pass `--port 0` to always pick a free port.

---

## Step 4: Verify discovery and invocation

Tool discovery uses `tool_id`:

- `GET /v1/tools` returns all `ToolDefinition`s (including `tool_id` and `name`)
- `GET /v1/tools/{tool_id}` fetches one tool definition

Tool invocation accepts either `tool_id` or `tool_name`. In this guide we invoke by `tool_name`.

List tools:

```bash
curl -sS http://127.0.0.1:8000/v1/tools
```

Fetch the tool definition:

```bash
curl -sS http://127.0.0.1:8000/v1/tools/tool_reverse_text
```

Invoke by `tool_name`:

```bash
curl -sS -X POST http://127.0.0.1:8000/v1/tool-invocations \
  -H 'Content-Type: application/json' \
  -d '{
    "invocation_id": "inv_001",
    "tool_name": "reverse_text",
    "args": { "text": "hello" }
  }'
```

:::note Troubleshooting

- `tool.not_found`: make sure Tool Registry was restarted with `--domains core,my_domain`.
- `tool.invalid_args`: confirm your request matches the tool’s `input_schema`.

:::

## Step 5 (Optional): Call your tool from a Runtime

Nothing about a Runtime changes when you add a tool—only the agent logic needs to choose it.

If you followed [Building Your First Agent Runtime](./building-your-first-agent.md), add a wrapper just like `call_echo(...)` / `call_calc(...)`, and let the new method invoke `tool_name="reverse_text"`. Then, use the new method in `run_goal(...)`.

## Next steps

- Tool definition + request/response schemas: [ARP Standard: Tool Registry](../arp-standard/components/tool-registry.md)
- Tool Registry service details (domains, flags, env): [JARVIS Tool Registry](../jarvis/component-implementations/tool-registry.md)
- Using a different model: [Custom Model Integration (JARVIS Runtime)](./custom-model-integration.md)
