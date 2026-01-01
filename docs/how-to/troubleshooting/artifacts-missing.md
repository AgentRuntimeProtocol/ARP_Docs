---
title: Fix “artifacts missing”
---

:::caution Stub
This How-to is a stub. JARVIS has artifact stores, but ensuring every key decision emits durable artifacts is still being expanded.
:::

## Goal

You will debug missing artifacts by checking store configuration, emission points, and retention.

## When to use this

- You expect candidate sets / decisions / outputs but cannot find them.
- Debugging is hard because evidence is missing.

## Prerequisites

- Access to `Artifact Store` and related service logs
- Knowledge of the expected artifact types for the run

## Steps

1. Confirm artifact store is running and reachable by the producer services.
2. Confirm artifact emission is enabled in config/profile.
3. Confirm retention settings didn’t purge artifacts.
4. Add missing emission points (for example: binding decision, arg-gen, evaluation).

## Verify

- Re-running produces the expected artifacts.
- Artifacts can be queried by `run_id` / `node_run_id`.

## Troubleshooting

- Store path mismatch → align configuration across services.
- Permission errors → fix filesystem/DB permissions (or use external store).
- Events contain large payloads instead of artifacts → move payloads to artifact store and link.

## Cleanup / Rollback

- Reset local state in dev if needed.

## Next steps

- How-to: [Configure artifact storage](../operations/configure-artifact-storage.md)
- How-to: [Debug using artifacts](../operations/debug-with-artifacts.md)
