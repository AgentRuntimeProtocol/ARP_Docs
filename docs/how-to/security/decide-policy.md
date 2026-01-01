---
title: Decide Policy via PDP
---

## Goal

You will ask the ARP Standard `PDP` for a policy decision at a checkpoint (for example `run.start` or `node.run.execute`).

## When to use this

- You are debugging a policy rule and want to see the raw decision.
- You are building tooling around policy evaluation.

:::note Standard vs. implementation

- Normative contract: [ARP Standard: PDP](../../arp-standard/components/pdp.md)
- Reference implementation: [JARVIS PDP](../../jarvis/component-implementations/pdp.md)

:::

## Prerequisites

- A PDP URL
  - Example (CLI/dev): `http://127.0.0.1:8086`
- If auth is enabled, a bearer token that passes PDP JWT validation.

Most clients should **not** call `PDP` directly: enforcement points (for example `Run Coordinator`) call `PDP` and enforce the result.

## Steps

1. Set your PDP URL:

   ```bash
   export PDP_URL=http://127.0.0.1:8086
   ```

2. Request a decision:

```bash
curl -sS -X POST "$PDP_URL/v1/policy:decide" \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "node.run.execute",
    "node_type_ref": {"node_type_id": "jarvis.core.echo", "version": "0.3.3"},
    "context": {"reason": "debug policy decision"}
  }'
```

## Verify

- You get an HTTP `200` response with a `PolicyDecision` containing at least:
  - `decision` (`allow` | `deny` | `require_approval`)

## Troubleshooting

- `404` node type not found → the PDP (or its backing policy layer) needs `NodeType` metadata → confirm the `node_type_ref` exists in the Node Registry.
- `401` / `403` → auth is enabled and your token is missing/invalid → include `Authorization: Bearer ...` or use a dev profile with auth disabled.
- Unexpected `deny` → policy profile/config is more restrictive than you expect → confirm the active profile (JARVIS: `JARVIS_POLICY_PROFILE`) and inspect policy rules.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [ARP Standard: PDP](../../arp-standard/components/pdp.md)
- How-to: [Start a run (Run Gateway)](../running-work/start-a-run.md)
