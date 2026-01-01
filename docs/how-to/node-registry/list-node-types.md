---
title: List NodeTypes via Node Registry
---

## Goal

You will list available `NodeType` definitions from the ARP Standard `Node Registry`.

## When to use this

- You want to inspect what capabilities exist (and what versions).
- You are debugging selection results (candidate sets) and need to confirm inventory.

:::note Standard vs. implementation

- Normative contract: [ARP Standard: Node Registry](../../arp-standard/components/node-registry.md)
- Reference implementation: [JARVIS Node Registry](../../jarvis/component-implementations/node-registry.md)

:::

## Prerequisites

- A Node Registry URL
  - Example (CLI/dev): `http://127.0.0.1:8084`
  - If you are running via `JARVIS_Release`, you may need to expose the service port to the host (compose default is internal-only).
- If auth is enabled, a bearer token that passes registry JWT validation.

## Steps

1. Set your Node Registry URL:

```bash
export NODE_REGISTRY_URL=http://127.0.0.1:8084
```

2. List all `NodeType`s:

```bash
curl -sS "$NODE_REGISTRY_URL/v1/node-types"
```

3. (Optional) Filter by kind (`atomic` or `composite`):

```bash
curl -sS "$NODE_REGISTRY_URL/v1/node-types?kind=atomic"
```

4. (Optional) Search by query (implementation-defined):

```bash
curl -sS "$NODE_REGISTRY_URL/v1/node-types?q=web"
```

## Verify

- You get an HTTP `200` response containing a JSON list of `NodeType` records.

## Troubleshooting

- `connection refused` → Node Registry isn’t running or not exposed → confirm the URL/port; check your compose port mappings.
- `401` / `403` → auth is enabled and your token is missing/invalid → include `Authorization: Bearer ...` or use a dev profile with auth disabled.
- Empty list → the registry is empty or seeding is disabled → check `JARVIS_NODE_REGISTRY_SEED` (JARVIS) or your registry initialization process.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Node Registry](../../arp-standard/components/node-registry.md)
- How-to: [Implement “discovery as a capability”](../composite-nodes/discovery-as-capability.md)
