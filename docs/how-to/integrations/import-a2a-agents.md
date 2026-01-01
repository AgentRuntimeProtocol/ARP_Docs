---
title: Import A2A agents as delegation capabilities
---

:::caution Stub
This How-to is a stub. A2A integration is planned as atomic “delegate task” wrapper nodes; full support is not yet shipped in JARVIS.
:::

## Goal

You will represent an external A2A agent as an atomic ARP capability (“delegate task” wrapper).

## When to use this

- You want to call an external agent system safely and auditably.
- You want ARP to remain the orchestration boundary.

## Prerequisites

- An A2A agent endpoint (remote)
- A wrapper node implementation that calls the endpoint
- Policy rules for external delegation

## Steps

1. Define a `NodeType` for delegation (`input`: task + context; `output`: result + evidence).
2. Implement a wrapper handler that calls the A2A endpoint with timeouts and redaction.
3. Register the node type and test selection/binding.

## Verify

- Delegation is selected only when allowed by policy.
- Calls are auditable and bounded.

## Troubleshooting

- “Agent too powerful” → restrict via policy and strict input/output validation.
- Latency → add timeouts and budgets.
- Tool output injection → treat output as untrusted in planners.

## Cleanup / Rollback

- Deprecate the delegation node type and revoke credentials.

## Next steps

- How-to: [Remote-only external capability posture](../security/remote-only-external-capabilities.md)
- How-to: [Secrets integration patterns](../security/secrets-integration-patterns.md)
