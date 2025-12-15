---
title: Quickstart Guide
sidebar_position: 2
---

Follow this guide to quickly set and get familiar with an ARP stack.

## Prerequisites

- Python `>=3.10`
- Optional (for real LLM integration): an active OpenAI API key.

---

## Step 1: Install / setup

Create a virtual environment and install the MVP packages:

```bash
python3 -m venv .venv
source .venv/bin/activate

pip install jarvis-arp
```

:::note using the `jarvis-arp` package

This package provides an out-of-the-box installation of the 3 packages `jarvis-model`, `jarvis-tool-registry` and `jarvis-runtime`. Each release of the `jarvis-arp` package contains a compatible version set of the 3 packages, and is the **preferred way** of installing the ARP stack.

This is not to say that devs cannot directly install the packages. If your specific needs only requires a subset of them, feel free to pick and choose. Do note that given active development you may see changing contract across versions and backward compatibility is not always guaranteed.

:::

---

## Step 2: Start the tool registry 

Tools are registered by the **Tool Registry service** (at startup only, for now.) 

Tools live in domain modules (for example, `tool_registry/domains/core.py` in the tool registry repo) and are enabled via the `TOOL_REGISTRY_DOMAINS` environment variable. The `core` domain is added by default.

To start the tool registry, open terminal and run:

```bash
tool-registry
```

:::note MVP Tool Registry

The default `core` domain ships with a few sample tools (`echo`, `calc`, `time_now`) so you can run end-to-end without writing code. This is not an accurate representation of what post-release tool landscape looks like. There is [active development](./core-concepts/tool-registry.md) in expanding the capability of the `Tool Registry`, including things like MCP support and more first-party tools. Stay tuned!

:::

### Optional: Step 2.5: Writing and using your new tool

Minimal tool definition format, using part of `core` module for reference:

```py
from jarvis_model import ToolDefinition

def load_tools() -> list[Tool]:
    return [
        Tool(definition=_echo_definition(), handler=_echo),
    ]

# The definition as the registry sees and exposes.
def _echo_definition() -> ToolDefinition:
    return ToolDefinition(
        name="echo",
        description="Echoes the provided text.",
        version="0.1.0",
        parameters={
            "type": "object",
            "properties": {"text": {"type": "string"}},
            "required": ["text"],
            "additionalProperties": False,
        },
        tags=["core"],
    )

# The tool handler that actually execute the action.
def _echo(args: dict[str, Any], context: Optional[dict[str, Any]], trace: Optional[dict[str, Any]]) -> dict[str, Any]:
    return {"text": str(args.get("text") or "")}

```

To add your own tool during development, clone the `tool-registry` repo and follow the Tool Registry pattern:

- Implement it in a domain module under `tool_registry/domains/`.
  - Use the existing `core.py` for reference.
- Start the server with your domain enabled: `TOOL_REGISTRY_DOMAINS=core,<your_domain> tool-registry`.

---

## Step 3: Configure model integration

The runtime supports two execution modes:

- `stub` (default): fully local, deterministic roles (no external model calls).
  - This is a good option if you just want to see Jarvis runtime in action, in some fixed workflows. You can use it to confirm your setup, and view some execution records and trace logs. 

- `openai`: uses the OpenAI Python SDK to call the OpenAI Responses API (Planner + tool-args generation + Chat). 
  - This actually calls OpenAI and you can see the Jarvis agent runtime instance provide real responses to your query.
  - To enable `openai` mode, run:

    ```bash
    pip install openai
    export OPENAI_API_KEY="..."
    ```
  - Optional overrides:
    - `OPENAI_BASE_URL` (or `JARVIS_OPENAI_BASE_URL`)
    - `JARVIS_MODEL_DEFAULT` (default: `gpt-5-nano`)
    - `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

:::note OPENAI INTEGRATION

There is a small change to make `openai` part of the `jarvis-arp` package to eliminate the need for this installation. This guide will be updated once that is checked in. 

:::

---

## Step 4: Run your first query with Jarvis runtime

:::tip Using `openai` mode

Add `--mode openai` (or set `JARVIS_RUNTIME_MODE=openai`) to the `jarvis-runtime …` commands below, and make sure `OPENAI_API_KEY` is set.

Example (no ports, in-process Tool Registry):

```bash
jarvis-runtime run --mode openai --tool-registry inproc --request "What time is it in UTC?"
```

:::


### Option A (Recommended): run against a running Tool Registry HTTP service.

Terminal A (Tool Registry):

```bash
tool-registry
```

Terminal B (Runtime):

```bash
jarvis-runtime demo --tool-registry http --tool-registry-url http://127.0.0.1:8000
```

### Option B: run with in-process Tool Registry; useful in restricted environments:

```bash
jarvis-runtime demo --tool-registry inproc
```

The runtime prints the final text output plus a trace file path. By default, traces are written to `./runs/<flow_id>/trace.jsonl` (override with `--trace-dir`).

If you prefer a single request instead of the demo:

```bash
jarvis-runtime run --request "What time is it in UTC?" --tool-registry http --tool-registry-url http://127.0.0.1:8000
```

---

## Step 5: Review your execution traces 

Every `jarvis-runtime` run writes a `JSONL` trace file and prints its path in the terminal.

:::tip Using `.jsonl` files

`jsonl` is a format for logging in a structured way. Each line is a JSON event object. For Jarvis runtime traces, each event has a `ts` timestamp and a `type`, and some other useful debugging information. 

:::

1. Ctrl-click the trace file path in the terminal, if you are using one that supports it like `vscode`. Or, 
2. Copy the path from the runtime output and open it:

   ```bash
   cat ./runs/<flow_id>/trace.jsonl
   ```

Useful things to look for:

- `flow_started` / `flow_completed` (overall status and final text)
- `step_created` / `step_started` / `step_completed` (plan/tool/chat step lifecycle)
- `tool_args_generated`, `tool_invocation`, `tool_result` (tool execution)
- `llm_call`, `llm_result` (only in `--mode openai`)

:::tip Run without traces

If you want traces without prompt contents, run the runtime with `--redact-prompts`.

:::

## Next steps

- Read the [Core Concepts](./core-concepts/overview.md) pages to understand Runtime, Tool Registry, and Model Integration.
- Follow [Building Your First Agent](./guides/building-your-first-agent.md) to add a custom tool and run a flow end-to-end.
- Use the [API Reference](./api-reference/overview.md) when integrating programmatically.
