---
title: Build an atomic node in Python
---

:::caution Stub
This How-to is a stub. The JARVIS stack is still stabilizing the “author a new atomic node” developer workflow.
:::

## Goal

You will create a new atomic capability in Python and make it executable via the ARP Standard `Atomic Executor` flow.

## When to use this

- You want to add a new first-party capability to a JARVIS stack.
- You want a bounded, testable “do one thing” unit you can evaluate and promote.

## Prerequisites

- Python `>=3.11`
- A running JARVIS stack (local dev is fine)
- A clear decision on *how* new atomic nodes are delivered:
  - installed node pack (trusted in-process), vs
  - remote-only wrapper nodes.

## Steps

1. Decide which authoring mode you want:
   - **First-party pack**: add a new node to `arp-jarvis-atomic-nodes` and install it alongside `arp-jarvis-atomic-executor`.
   - **Remote-only wrapper**: implement an atomic node whose handler makes a bounded outbound call (no RCE).

2. Implement the node (code + metadata as one unit).

3. Register the `NodeType` in `Node Registry`.

## Verify

- `Node Registry` lists your new `NodeType`.
- A composite run can select and execute your new node without violating constraints/policy.

## Troubleshooting

- Node does not show up in registry → the registry seed/sync process is missing or disabled.
- Execution fails at `node.run.execute` → policy or constraints are denying the node type.
- Handler runs but outputs are missing → verify `NodeRun.outputs`/artifacts are emitted correctly.

## Cleanup / Rollback

- Remove the node from the pack and re-seed the registry, or roll back the `NodeType` version.

## Next steps

- Concept: [Capabilities and nodes](../../fundamentals/concepts/capabilities-and-nodes.md)
- Reference: [ARP Standard: Atomic Executor](../../arp-standard/components/atomic-executor.md)
- How-to: [Register a `NodeType` in Node Registry](../node-registry/register-node-type.md)
