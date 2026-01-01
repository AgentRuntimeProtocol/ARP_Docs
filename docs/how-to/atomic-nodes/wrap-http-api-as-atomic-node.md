---
title: Wrap an HTTP API as an atomic node
---

## Goal

You will wrap an existing HTTP API as an atomic capability that can be selected and executed as a `NodeType`.

## When to use this

- You already have a reliable service/API and want to make it an ARP capability.
- You want to avoid executing untrusted code in-process (no RCE).

## Prerequisites

- A stable upstream HTTP API to wrap
- A JARVIS `Atomic Executor` (or equivalent) that can host the wrapper handler
- A `Node Registry` to publish/seed the `NodeType` metadata
- An egress posture for outbound HTTP calls (allowlists, timeouts, redaction)

:::note JARVIS v0.x implementation detail
In JARVIS (v0.x), the recommended way to ship wrapper nodes is a Python node pack discovered via the `jarvis.nodepacks` entry point group.

The “full walkthrough” is the Thin Mode tutorial:
- [Thin Mode — Wrap an Existing API](../../getting-started/tutorials/thin-mode.md)
:::

## Steps

1. Define the wrapper `NodeType` input/output schemas (Pydantic models are a convenient source of JSON Schema).
2. Implement the wrapper handler inside a node pack (a typed function decorated with `atomic_node(...)`).
3. Register the pack via a Python entry point (`jarvis.nodepacks`) so it is discoverable.
4. Install the pack into:
   - `Node Registry` (for metadata seeding), and
   - `Atomic Executor` (for handler execution).
5. Restart the services to pick up the new pack (v0.x has no hot reload).

## Verify

- `Selection` can return the wrapper as a candidate for relevant subtasks.
- Execution is bounded (timeouts, max bytes, allowlists) and emits durable artifacts.

## Troubleshooting

- SSRF risk → enforce allowlists and blocklists at the node handler boundary.
- Policy denies outbound egress → update policy profile and/or node metadata (egress tags).
- Response too large → enforce max bytes and store large payloads as artifacts.

## Cleanup / Rollback

- Deprecate/rollback the wrapper `NodeType` version.

## Next steps

- Tutorial: [Thin Mode — Wrap an Existing API](../../getting-started/tutorials/thin-mode.md)
- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Node Registry](../../arp-standard/components/node-registry.md)
- How-to: [Declare side effects and idempotency](./declare-side-effects-and-idempotency.md)
