---
title: Selection Service
sidebar_position: 15
---

JARVIS Selection Service produces **bounded candidate sets** for mapping subtasks to `NodeType`s.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Selection](../../arp-standard/components/selection.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_SelectionService`
- PyPI: `arp-jarvis-selection-service`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-selection-service:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `selection-service`
- Internal URL: `http://selection-service:8085`
- Exposed host URL: (not exposed by default)

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.7"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis selection-service -- --host 127.0.0.1 --port 8085
```

## Default behavior (v0.3.x)

- Builds a `NodeType` inventory from `Node Registry`.
- Uses `arp-llm` to rank atomic `NodeType`s for each subtask.
- Adds a composite planner `NodeType` when the task does not fit a single atomic node.
- Returns an error if selection cannot be produced (no silent fallback).
