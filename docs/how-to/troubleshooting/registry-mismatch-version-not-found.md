---
title: Fix “registry mismatch / version not found”
---

:::caution Stub
This How-to is a stub. The JARVIS version pinning story is still being finalized via `JARVIS_Release` and registry seeding.
:::

## Goal

You will debug `NodeType` “version not found” errors caused by pinning, missing inventory, or stale caches.

## When to use this

- `Selection` or `Run Coordinator` errors with `node_type_not_found`.
- A pinned version exists in code but not in the running registry.

## Prerequisites

- Ability to list node types from `Node Registry`
- Knowledge of the pinned stack version and node pack versions

## Steps

1. List registry inventory and confirm the version exists.
2. Confirm the service that executes the node has the same node pack installed.
3. If using cached inventory snapshots, refresh/invalidate caches.
4. If using `JARVIS_Release`, confirm all image tags are pinned consistently.

## Verify

- The desired `NodeTypeRef` is present in registry and executable by the executor.

## Troubleshooting

- Mixed versions across services → re-pin and redeploy.
- Registry seeded but executor missing → install the pack in executor image.
- Cache stale → restart selection or implement inventory refresh.

## Cleanup / Rollback

- Roll back to the previous pinned release bundle.

## Next steps

- How-to: [Pin/upgrade the release bundle](../local-dev/pin-upgrade-release-bundle.md)
- How-to: [Versioning model](../node-registry/versioning-model.md)
