---
title: Start a Run via Run Gateway
---

## Goal

You will start a `Run` via the ARP Standard `Run Gateway` `POST /v1/runs`.

## When to use this

- You want to kick off a workflow via the public entrypoint.
- You are validating that `Run Gateway` → `Run Coordinator` forwarding works.

:::note Standard vs. implementation

- Normative contract: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- Reference implementation: [JARVIS Run Gateway](../../jarvis/component-implementations/run-gateway.md)

:::

## Prerequisites

- A Run Gateway URL
  - Example (CLI/dev): `http://127.0.0.1:8080`
  - Example (`JARVIS_Release`): `http://localhost:8081` (default `RUN_GATEWAY_HOST_PORT`)
- A root `NodeTypeRef` to start from
  - Default JARVIS composite planner: `jarvis.composite.planner.general@<stack-version>`
- If auth is enabled, a bearer token that passes gateway JWT validation (`iss` + `aud`).
- If you are using `JARVIS_Release`, the `arp-jarvis` CLI is the preferred entrypoint.

## Steps

1. Preferred (JARVIS_Release): start a run via the CLI:

   ```bash
   arp-jarvis runs start --goal "Generate a UUID, then return it."
   ```

   If auth is enabled, log in once:

   ```bash
   arp-jarvis auth login
   ```

2. Raw HTTP: set your Run Gateway URL:

   ```bash
   # Default `JARVIS_Release` stack port (RUN_GATEWAY_HOST_PORT)
   export RUN_GATEWAY_URL=http://127.0.0.1:8081
   ```

3. Start a run (no auth / dev-insecure):

   ```bash
   curl -sS -X POST "$RUN_GATEWAY_URL/v1/runs" \
     -H 'Content-Type: application/json' \
     -d '{
       "root_node_type_ref": {"node_type_id": "jarvis.composite.planner.general", "version": "0.3.3"},
       "input": {"goal": "Generate a UUID, then return it."}
     }'
   ```

4. (Optional) Start a run with a bearer token:

   If you are using the Keycloak dev STS, mint a token via the CLI:

   ```bash
   TOKEN="$(arp-jarvis auth token --audience arp-run-gateway)"

   curl -sS -X POST "$RUN_GATEWAY_URL/v1/runs" \
     -H 'Content-Type: application/json' \
     -H "Authorization: Bearer $TOKEN" \
     -d '{
       "root_node_type_ref": {"node_type_id": "jarvis.composite.planner.general", "version": "0.3.3"},
       "input": {"goal": "Generate a UUID, then return it."}
     }'
   ```

   If you are a service (client credentials), use your STS client ID/secret and mint a token at the token endpoint.

## Verify

- You get an HTTP `200` response with a JSON `Run` body containing at least:
  - `run_id`
  - `root_node_run_id`

## Troubleshooting

- `401` / `403` → auth is enabled and your token is missing/invalid → set `ARP_AUTH_MODE=disabled` (dev only) or mint a valid JWT and include `Authorization: Bearer ...`.
- `503` with `run_coordinator_missing` → gateway is not configured → set `JARVIS_RUN_COORDINATOR_URL` (and optionally `JARVIS_RUN_COORDINATOR_AUDIENCE`).
- `400` validation errors → payload shape is wrong → confirm you’re sending `root_node_type_ref` and `input` with correct JSON types.

## Cleanup / Rollback

- Not required. (Cancellation is a separate operation via `Run Gateway` / `Run Coordinator`.)

## Next steps

- Concept: [Capabilities and nodes](../../fundamentals/concepts/capabilities-and-nodes.md)
- Reference: [ARP Standard: Run Coordinator](../../arp-standard/components/run-coordinator.md)
- How-to: [Stream run events (NDJSON)](./stream-run-events.md)
