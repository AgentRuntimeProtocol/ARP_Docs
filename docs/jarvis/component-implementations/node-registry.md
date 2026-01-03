---
title: Node Registry
sidebar_position: 14
---

JARVIS Node Registry is the catalog of `NodeType`s available in a deployment.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Node Registry](../../arp-standard/components/node-registry.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_NodeRegistry`
- PyPI: `arp-jarvis-node-registry`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-node-registry:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `node-registry`
- Internal URL: `http://node-registry:8084`
- Exposed host URL: (not exposed by default)

Note: in the current reference stack, `Selection Service` does not attach bearer tokens to its Node Registry client yet, so `JARVIS_Release` runs Node Registry with inbound auth set to `optional`.

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.4"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis node-registry -- --host 127.0.0.1 --port 8084
```

## Startup seeding (v0.x)

On startup, the reference implementation can seed:
- `NodeType`s from installed node packs (first-party atomic packs by default)
- built-in system `NodeType`s (for example `jarvis.composite.planner.general`)

This can be disabled for multi-replica deployments with shared storage.
