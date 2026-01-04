---
title: PDP
sidebar_position: 16
---

JARVIS `PDP` (Policy Decision Point) is a thin policy service that returns allow/deny decisions at well-defined checkpoints.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: PDP](../../arp-standard/components/pdp.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_PDP`
- PyPI: `arp-jarvis-pdp`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-pdp:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `pdp`
- Internal URL: `http://pdp:8086`
- Exposed host URL: (not exposed by default)

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.8"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis pdp -- --host 127.0.0.1 --port 8086
```

## Default behavior (v0.3.x)

- Deny-by-default unless explicitly configured.
- Can load an `arp-policy` JSON file to evaluate policy.
- Can fetch `NodeType` metadata from `Node Registry` for node-type based policies (so callers don’t need to embed metadata blobs).
