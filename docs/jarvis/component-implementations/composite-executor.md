---
title: Composite Executor
sidebar_position: 13
---

JARVIS Composite Executor executes **composite `NodeRun`s**. In v0.3.x, it is an LLM-driven “planner + binder + arg-gen” engine.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Composite Executor](../../arp-standard/components/composite-executor.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_CompositeExecutor`
- PyPI: `arp-jarvis-composite-executor`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-composite-executor:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `composite-executor`
- Internal URL: `http://composite-executor:8083`
- Exposed host URL: (not exposed by default)

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.5"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis composite-executor -- --host 127.0.0.1 --port 8083
```

## What it does (v0.3.x)

- **Planning**: decompose a composite goal into bounded subtasks (LLM).
- **Selection**: call `Selection Service` to get bounded candidate sets per subtask.
- **Binding**: pick one candidate (v0: deterministic first candidate).
- **Arg-gen**: generate concrete `inputs` for the chosen `NodeType` schema (LLM).
- **Sequential execution**: create one child `NodeRun` at a time via `Run Coordinator`, wait for completion, then continue.

## Why sequential for now?

Sequential execution makes context propagation straightforward:
- later steps can include outputs from earlier steps without inventing a separate “shared working memory” service.

The long-term design can evolve toward concurrent execution once durable context patterns are stabilized.
