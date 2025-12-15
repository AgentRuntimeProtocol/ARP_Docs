---
title: Building Your First Agent
sidebar_position: 2
---

A detailed walkthrough (beyond the quickstart) for creating an agent step-by-step.

## What you'll build

You will add a custom tool to Tool Registry and run a Runtime flow that:

- discovers the tool via Tool Registry,
- generates valid tool arguments,
- invokes the tool,
- uses the tool result to produce a final answer.

This guide assumes you are working from local clones of the sibling repos so you can add a tool to the Tool Registry codebase.

## Steps

### 1. Define a custom tool

Create or edit a domain module under `tool_registry/domains/`. Example: `tool_registry/domains/demo.py`:

```py
from __future__ import annotations

from typing import Any, Optional

from jarvis_model import ToolDefinition

from tool_registry.catalog import Tool


def load_tools() -> list[Tool]:
    return [Tool(definition=_greet_definition(), handler=_greet)]


def _greet_definition() -> ToolDefinition:
    return ToolDefinition(
        name="greet",
        description="Greet a person by name.",
        version="0.1.0",
        parameters={
            "type": "object",
            "properties": {"name": {"type": "string", "minLength": 1}},
            "required": ["name"],
            "additionalProperties": False,
        },
        tags=["demo"],
    )


def _greet(args: dict[str, Any], context: Optional[dict[str, Any]], trace: Optional[dict[str, Any]]) -> dict[str, Any]:
    name = str(args.get("name") or "")
    return {"message": f"Hello, {name}!"}
```

### 2. Register the tool (MVP behavior)

In the MVP, registration happens at Tool Registry startup by loading domain modules. Enable your domain when starting the service:

```bash
TOOL_REGISTRY_DOMAINS=core,demo tool-registry
```

### 3. Verify the tool is discoverable

```bash
curl http://127.0.0.1:8000/v1/tools
curl http://127.0.0.1:8000/v1/tools/greet
```

You can also invoke it directly (to validate your schema and handler before involving the runtime):

```bash
curl -X POST http://127.0.0.1:8000/v1/tools/greet:invoke \
  -H 'content-type: application/json' \
  -d '{"schema_version":"0.1.0","args":{"name":"Ada Lovelace"}}'
```

### 4. Configure runtime + model integration

To have the planner reliably select your new tool, use `openai` mode:

```bash
pip install "jarvis-runtime[openai]"
export OPENAI_API_KEY="..."
```

Note: `stub` mode is deterministic and only uses a small heuristic set of tools for the demo; it will not automatically discover when to call arbitrary custom tools.

### 5. Execute an agent run and inspect results

Run a single request:

```bash
jarvis-runtime run \
  --mode openai \
  --tool-registry http \
  --tool-registry-url http://127.0.0.1:8000 \
  --request "Use the greet tool to greet Ada Lovelace."
```

The runtime prints the final text plus a path to `trace.jsonl`. To confirm the tool was used, search the trace for:

- `tool_invocation` (the generated args)
- `tool_result` (the normalized `ToolResult`, including the tool’s `result.message`)
