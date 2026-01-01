---
title: Register a NodeType in Node Registry
---

:::caution Stub
This How-to is a stub. JARVIS `Node Registry` is currently seeded on startup from installed node packs; the full “register via API” workflow is not yet stabilized.
:::

## Goal

You will register a `NodeType` (capability definition) in `Node Registry` with the minimal required metadata and schemas.

## When to use this

- You created a new atomic capability and want it discoverable by `Selection`.
- You want a catalog of what the stack can do (by version).

## Prerequisites

- A running `Node Registry` service
- A `NodeType` definition (ID, version, kind, description, input/output schema)
- A decision on the registration path:
  - startup seeding from installed packs (current JARVIS default), or
  - API-driven CRUD (planned).

## Steps

1. Define the `node_type_id` and `version` (use stable, namespaced IDs).
2. Define input/output schemas (strict JSON schema where possible).
3. Provide enough metadata for selection and policy:
   - description,
   - side-effect class,
   - trust tier (first-party vs external),
   - tags (egress, data classes).
4. Register the `NodeType`:
   - for JARVIS today: install the node pack and restart `Node Registry` (startup seeding),
   - future: `POST /v1/node-types` (API).

## Verify

- The `NodeType` shows up when listing inventory:
  - How-to: [List NodeTypes](./list-node-types.md)
- `Selection` can include it in candidate sets for relevant tasks.

## Troubleshooting

- Not visible → registry seeding disabled or pack not installed → confirm registry startup logs.
- Wrong version → pin the stack version and re-seed.
- Policy denies selection/execution → ensure metadata aligns with policy rules.

## Cleanup / Rollback

- Deprecate or roll back the version (see next pages).

## Next steps

- How-to: [Versioning model](./versioning-model.md)
- How-to: [Channels](./channels.md)
