---
title: Tool Development Guide
sidebar_position: 3
---

How to create a new tool and add it to the registry.

## Tool design

Best practices for the MVP Tool Registry implementation:

- Keep tool inputs strict: `type: "object"`, explicit `required`, and `additionalProperties: false`.
- Keep outputs JSON-serializable (return a `dict` with simple scalars/arrays/objects).
- Prefer small, stable tool contracts: choose a stable `name` and evolve via `version`.
- Raise `ValueError("...")` for expected execution errors; Tool Registry normalizes this to a `tool.execution_error`.
- Use `context` and `trace` only for correlation/observability; tools should be safe to run repeatedly (idempotent when possible).

## Implement and register

Tools live in **domain modules** under `tool_registry/domains/`. Each module exports `load_tools() -> list[Tool]`.

Skeleton:

```py
from __future__ import annotations

from typing import Any, Optional

from jarvis_model import ToolDefinition

from tool_registry.catalog import Tool


def load_tools() -> list[Tool]:
    return [Tool(definition=_definition(), handler=_handler)]


def _definition() -> ToolDefinition:
    return ToolDefinition(
        name="my_tool",
        description="Describe what the tool does.",
        version="0.1.0",
        parameters={
            "type": "object",
            "properties": {"input": {"type": "string"}},
            "required": ["input"],
            "additionalProperties": False,
        },
        tags=["my_domain"],
    )


def _handler(args: dict[str, Any], context: Optional[dict[str, Any]], trace: Optional[dict[str, Any]]) -> dict[str, Any]:
    return {"output": args["input"]}
```

Registration (MVP):

1. Add your domain module (for example, `tool_registry/domains/my_domain.py`).
2. Start Tool Registry with the domain enabled:

   ```bash
   TOOL_REGISTRY_DOMAINS=core,my_domain tool-registry
   ```

## Runtime invocation

Verify discovery via HTTP:

```bash
curl http://127.0.0.1:8000/v1/tools
curl http://127.0.0.1:8000/v1/tools/my_tool
```

Verify invocation directly:

```bash
curl -X POST http://127.0.0.1:8000/v1/tools/my_tool:invoke \
  -H 'content-type: application/json' \
  -d '{"schema_version":"0.1.0","args":{"input":"hello"}}'
```

To have the Runtime call your tool as part of a flow, run in `openai` mode (so the planner/tool-args generator can choose it and produce valid args), then inspect the trace for `tool_invocation` / `tool_result` events.
