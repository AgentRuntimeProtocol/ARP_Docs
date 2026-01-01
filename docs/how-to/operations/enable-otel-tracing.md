---
title: Enable OpenTelemetry tracing
---

:::caution Stub
This How-to is a stub. JARVIS does not yet ship full OpenTelemetry instrumentation across all services, but the trace correlation model is planned.
:::

## Goal

You will enable OpenTelemetry (OTel) tracing and correlate traces to `run_id` and `node_run_id`.

## When to use this

- You are operating the stack and need end-to-end visibility.
- You want to debug latency and failures across services.

## Prerequisites

- An OpenTelemetry collector endpoint
- A trace propagation strategy (headers) across HTTP calls
- A place to record correlation IDs (`run_id`, `node_run_id`) as span attributes

## Steps

1. Configure each service with OTel exporter settings (endpoint, service name).
2. Ensure HTTP client/server middleware propagates trace context.
3. Add `run_id` / `node_run_id` as span attributes at request boundaries.

## Verify

- A single run produces a trace with spans across:
  - gateway,
  - coordinator,
  - selection,
  - executors,
  - stores.

## Troubleshooting

- No traces → exporter misconfigured or collector unreachable.
- Broken trace continuity → missing propagation headers between services.
- Too much noise → sample aggressively in dev, tune in prod.

## Cleanup / Rollback

- Disable exporter or point to a local collector.

## Next steps

- How-to: [Connect external OTel collector / SIEM pipeline](../integrations/connect-siem-pipeline.md)
- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
