---
title: Atomic Executor
sidebar_position: 12
---

JARVIS Atomic Executor executes **atomic `NodeRun`s** (leaf work).

It is intentionally stateless: it does not persist `Run`/`NodeRun` state. The `Run Coordinator` is the system-of-record.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Atomic Executor](../../arp-standard/components/atomic-executor.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_AtomicExecutor`
- PyPI: `arp-jarvis-atomic-executor`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-atomic-executor:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `atomic-executor`
- Internal URL: `http://atomic-executor:8082`
- Exposed host URL: (not exposed by default)

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.8"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis atomic-executor -- --host 127.0.0.1 --port 8082
```

## Node packs

In JARVIS v0.x, atomic handlers are loaded in-process from installed **node packs** via Python entry points:
- entry point group: `jarvis.nodepacks`

The first-party pack is:
- GitHub: `AgentRuntimeProtocol/JARVIS_AtomicNodes`
- PyPI: `arp-jarvis-atomic-nodes`
