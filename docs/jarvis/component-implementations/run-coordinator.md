---
title: Run Coordinator
sidebar_position: 11
---

JARVIS Run Coordinator is the **run authority** in the JARVIS stack. It owns `Run` + `NodeRun` lifecycle and is the primary enforcement point for:
- structural constraints (depth/width/budgets),
- policy checkpoints (allow/deny),
- dispatch to atomic/composite executors,
- durable evidence (events + artifacts).

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Run Coordinator](../../arp-standard/components/run-coordinator.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_RunCoordinator`
- PyPI: `arp-jarvis-run-coordinator`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-run-coordinator:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `run-coordinator`
- Internal URL: `http://run-coordinator:8081`
- Exposed host URL: `http://127.0.0.1:8082`

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.4"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis run-coordinator -- --host 127.0.0.1 --port 8082
```

## What it depends on

Internal (JARVIS-only) services:
- `Run Store` (`Run`/`NodeRun` persistence)
- `Event Stream` (NDJSON events)
- `Artifact Store` (blob storage)

Downstream ARP Standard services (optional, enable features):
- `Atomic Executor` (atomic dispatch)
- `Composite Executor` (composite dispatch)
- `Node Registry` (`NodeKind` resolution + schema hydration)
- `PDP` (central policy decisions)

## Notes on enforcement

- The coordinator should **enrich** policy inputs (for example by fetching `NodeType` metadata) but should not “become the PDP”.
- Enforcement happens before dispatch; denied requests fail fast and produce durable policy decision artifacts.
