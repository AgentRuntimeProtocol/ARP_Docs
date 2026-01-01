---
title: Scaling guidance — what to scale, when
---

:::caution Stub
This How-to is a stub. Production scaling guidance will evolve as JARVIS stabilizes its durability and scheduling model.
:::

## Goal

You will understand when to scale `Run Coordinator` vs executors vs registry.

## When to use this

- You see timeouts/latency under load.
- You want predictable throughput for runs.

## Prerequisites

- Basic metrics (request rate, latency, error rate) per service
- Clear separation of responsibilities (stateless vs stateful services)

## Steps

1. Scale stateless services first (gateway, selection, executors).
2. Scale stateful stores carefully (run store, artifact store, event stream).
3. Treat coordinator scaling as durability-sensitive:
   - ensure idempotency,
   - avoid double-dispatch.

## Verify

- Scaling does not change semantics (no duplicated node runs).
- Throughput improves without regressions.

## Troubleshooting

- Increased duplicates → idempotency keys missing or not enforced.
- Store contention → move from local SQLite to external DB when needed.
- Hot spots → cache inventory snapshots carefully (with invalidation).

## Cleanup / Rollback

- Reduce replicas and return to baseline.

## Next steps

- How-to: [Enable OpenTelemetry tracing](./enable-otel-tracing.md)
- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
