---
title: Stream Run Events — NDJSON
---

## Goal

You will stream a run’s events as NDJSON (one `RunEvent` per line).

## When to use this

- You want to see what happened (and in what order) during a run.
- You are debugging planners/selectors/policy checkpoints and need durable traces.

:::note Standard vs. implementation

The event stream on `Run Gateway` is **optional** in the ARP Standard:
- Normative contract: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- Reference implementation: [JARVIS Run Gateway](../../jarvis/component-implementations/run-gateway.md)

:::

## Prerequisites

- A `run_id` (for example from [Start a run](./start-a-run.md))
- A Run Gateway URL
  - Example (CLI/dev): `http://127.0.0.1:8080`
  - Example (`JARVIS_Release`): `http://localhost:8081`
- If auth is enabled, a bearer token that passes gateway JWT validation.

## Steps

1. Preferred (JARVIS_Release): stream events via the CLI:

   ```bash
   arp-jarvis runs events <run_id>
   ```

   The CLI auto-decodes quoted/escaped NDJSON payloads from the gateway.

2. Raw HTTP: set your Run Gateway URL:

   ```bash
   # Default `JARVIS_Release` stack port (RUN_GATEWAY_HOST_PORT)
   export RUN_GATEWAY_URL=http://127.0.0.1:8081
   ```

3. Stream events:

   ```bash
   curl -sS "$RUN_GATEWAY_URL/v1/runs/<run_id>/events"
   ```

3. If your client supports it, prefer “no-buffer” streaming so you see events as they arrive:

```bash
curl -sS -N "$RUN_GATEWAY_URL/v1/runs/<run_id>/events"
```

## Verify

- You receive a stream of JSON objects, one per line (NDJSON).
- In JARVIS, you should see events for planning/decomposition, candidate sets, policy decisions, and `NodeRun` completion.

## Troubleshooting

- `404` run not found → you used the wrong `run_id` → confirm the run exists via `GET /v1/runs/<run_id>`.
- `401` / `403` → auth is enabled and your token is missing/invalid → include `Authorization: Bearer ...` or use a dev profile with auth disabled.
- The stream ends immediately → the run may have completed quickly → try a longer composite goal or check `Run Coordinator` for run state.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- How-to: [Start a run (Run Gateway)](./start-a-run.md)
