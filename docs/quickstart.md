---
title: Quickstart Guide
sidebar_position: 1
---

Run a minimal end-to-end ARP stack locally using **JARVIS**, the first-party implementation of the ARP Standard.

:::note Standard vs. implementation

This Quickstart focuses on running the JARVIS stack. For ARP contracts (OpenAPI/JSON Schema), see [ARP Standard](./arp-standard/index.md).

:::

:::tip Prerequisites

- Python `>=3.10`
- `curl`
- Optional (for real LLM calls): an OpenAI API key

:::

## What you’ll do

- Install the pinned JARVIS stack (`arp-jarvis`)
- Start Tool Registry (tools + invocations)
- Run a Runtime request that calls a tool
- Inspect the execution trace

---

## Step 1: Install the stack

```bash
python3 -m venv .venv
source .venv/bin/activate

python3 -m pip install arp-jarvis
arp-jarvis versions
```

:::note What `arp-jarvis` installs

`arp-jarvis` pins compatible versions of:

- `arp-standard-py` (ARP Standard SDK)
- `arp-jarvis-tool-registry` (Tool Registry service)
- `arp-jarvis-runtime` (Runtime CLI + HTTP server)
- `arp-jarvis-daemon` (Daemon CLI + HTTP server)

It also provides a pass-through meta CLI: `arp-jarvis`.

:::

:::tip Use component CLIs directly (optional)

All commands in this guide use the meta CLI (`arp-jarvis …`). You can also run:

- `arp-jarvis-tool-registry`
- `arp-jarvis-runtime`
- `arp-jarvis-daemon`

The meta CLI is a thin pass-through wrapper.

:::

---

## Step 2: Start Tool Registry

Terminal A:

```bash
arp-jarvis tool-registry
```

Sanity check (adjust the base URL if it binds to a different port):

```bash
curl -sS http://127.0.0.1:8000/v1/health
curl -sS http://127.0.0.1:8000/v1/version
curl -sS http://127.0.0.1:8000/v1/tools
```

:::tip Built-in tools (core domain)

The default `core` domain ships a few demo tools: `echo`, `calc`, `time_now`.

See the JARVIS Tool Registry implementation docs for details: [Tool Registry](./jarvis/component-implementations/tool-registry.md).

:::

### Optional: add your own tool (local dev)

- Follow [Integrating Your First Custom Tool](./guides/tool-development-guide.md).
- Restart Tool Registry with your domain enabled:

  ```bash
  TOOL_REGISTRY_DOMAINS=core,<your_domain> arp-jarvis tool-registry
  ```

---

## Step 3: Run your first request

Terminal B:

```bash
arp-jarvis runtime run \
  --tool-registry-url http://127.0.0.1:8000 \
  --request "What time is it in UTC?"
```

If Tool Registry is not running on `:8000`, update `--tool-registry-url` to match.

The runtime prints a final answer and a trace path like `./runs/<flow_id>/trace.jsonl`.

### Optional: run via the Runtime HTTP API

Terminal B (Runtime server):

```bash
arp-jarvis runtime serve \
  --host 127.0.0.1 \
  --tool-registry-url http://127.0.0.1:8000
```

This serves on `http://127.0.0.1:8081` by default. If it binds to a different port, update the URLs below.

Terminal C (client):

```bash
curl -sS -X POST http://127.0.0.1:8081/v1/runs \
  -H 'Content-Type: application/json' \
  -d '{"input":{"goal":"What time is it in UTC?"}}'

# Copy run_id from the response, then:
curl -sS http://127.0.0.1:8081/v1/runs/<run_id>/result
```

---

## Step 4 (Optional): Enable OpenAI mode

The execution in previous sections uses a "stub" LLM client that deterministically handle some basic predefined queries for demo purpose. If you want to see a **real** LLM in action, use the `openai` mode of the runtime.

:::tip

You will need an OpenAI API key for this step. If you don't have one, check out OpenAI's [official website](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key).

:::

Install the optional extra and set your key:

```bash
python3 -m pip install "arp-jarvis[openai]"
export OPENAI_API_KEY="<YourApiKey>"
```

Run with OpenAI-backed roles:

```bash
arp-jarvis runtime run \
  --mode openai \
  --tool-registry-url http://127.0.0.1:8000 \
  --request "What time is it in UTC?"
```

Optional overrides:

- `OPENAI_BASE_URL` (or `JARVIS_OPENAI_BASE_URL`)
- `JARVIS_MODEL_DEFAULT` (default: `gpt-5-nano`)
- `JARVIS_MODEL_PLANNER`, `JARVIS_MODEL_TOOL_ARGS`, `JARVIS_MODEL_CHAT`

---

## Step 5: Review your execution traces

Every `arp-jarvis runtime` run writes a JSONL trace file and prints its path in the terminal.

```bash
cat ./runs/<flow_id>/trace.jsonl
```

Useful event types to look for:

- `flow_started` / `flow_completed` (overall status and final text)
- `step_created` / `step_started` / `step_completed` (plan/tool/chat lifecycle)
- `tool_args_generated`, `tool_invocation`, `tool_result` (tool execution)
- `llm_call`, `llm_result` (only in `--mode openai`)

:::tip Trace redaction

Use `--redact-prompts` (or set `JARVIS_REDACT_PROMPTS=1`) to keep prompt contents out of traces.

:::

## Next steps

Congratulations! You just ran your first ARP-compatible stack, and your agent just told you the UTC time retrieved via a tool. This is a very simple RAG use case, but it showcases how the core components of ARP work together. 

The next steps for you, read on about any of the following topics: 

- JARVIS components: [Component Implementations](./jarvis/component-implementations/index.md)
- ARP Standard: [Services](./arp-standard/components/index.md)
- API details: [API Reference](./api-reference/index.md)
- Write your own runtime (agent): [Building Your First Agent Runtime](./guides/building-your-first-agent.md)
- Extend with tools: [Integrating Your First Custom Tool](./guides/tool-development-guide.md)
