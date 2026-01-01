---
title: Versioning model for NodeTypes
---

:::caution Stub
This How-to is a stub. JARVIS is still converging on a stable versioning + compatibility story for `NodeType` evolution.
:::

## Goal

You will publish `v1` → `v2` changes safely, with clear compatibility expectations for `NodeType` inputs/outputs and behavior.

## When to use this

- You need to fix bugs or improve a capability without breaking consumers.
- You want deterministic replay against pinned versions.

## Prerequisites

- A versioning scheme (SemVer recommended for `NodeTypeRef.version`)
- A clear “breaking change” definition (schema shape changes, semantics changes, policy changes)

## Steps

1. Treat input/output schema changes as contract changes:
   - additive optional fields can be backward compatible,
   - removals/renames are breaking.
2. Treat semantics changes as potentially breaking (document them explicitly).
3. Publish a new version and keep the old version available for rollback.
4. Pin versions in `JARVIS_Release` (stack pinning) to avoid drift.

## Verify

- Old clients still work against the old version.
- New version is discoverable and can be selected intentionally.

## Troubleshooting

- “Compatible but different behavior” surprises → add explicit release notes + evaluators.
- Registry contains mixed versions → use channels to route safely.
- Rollback required → keep old versions live and fast to re-pin.

## Cleanup / Rollback

- Roll back by pinning to the previous version and/or demoting the newer one.

## Next steps

- How-to: [Channels](./channels.md)
- How-to: [Deprecate / rollback](./deprecate-rollback.md)
