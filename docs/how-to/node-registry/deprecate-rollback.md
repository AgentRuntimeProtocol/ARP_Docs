---
title: Deprecate or roll back a capability version
---

:::caution Stub
This How-to is a stub. The JARVIS rollback story is currently “pin versions in `JARVIS_Release` + metadata changes”; a first-class deprecation API is planned.
:::

## Goal

You will deprecate or roll back a `NodeType` version quickly and safely.

## When to use this

- A capability version is broken, unsafe, or flaky.
- You need to revert fast without a full redeploy.

## Prerequisites

- Multiple versions of the capability are available in `Node Registry`
- A routing mechanism (pinning or channels)
- A decision record practice (who rolled back, why)

## Steps

1. Decide the rollback target (previous stable version).
2. Apply rollback:
   - pin the version in `JARVIS_Release`, and/or
   - demote the bad version’s channel.
3. Record a decision record and link to evidence artifacts.

## Verify

- New runs select the rollback target version.
- The bad version is not selected (or is clearly marked deprecated).

## Troubleshooting

- Cache still selecting bad version → refresh selection inventory caches.
- Downstream clients pin the bad version → update their pins explicitly.
- Rollback doesn’t fix → revert policy/config as well (not just version).

## Cleanup / Rollback

- Remove temporary pins once a fixed version is promoted.

## Next steps

- How-to: [Channels](./channels.md)
- How-to: [Promotion workflow](./promotion-workflow.md)
