---
title: Wrap Google ADK agents as nodes
---

:::caution Stub
This How-to is a stub. Google ADK integration is planned as an adapter pattern; no first-class implementation is shipped yet.
:::

## Goal

You will wrap a Google ADK agent as an ARP capability and execute it as a bounded, policy-gated step.

## When to use this

- You have an existing ADK agent you trust and want to integrate.
- You want ARP/JARVIS to remain the outer execution boundary.

## Prerequisites

- A runnable ADK agent
- A wrapper endpoint/service
- Policy rules for external delegation

## Steps

1. Define a `NodeType` that represents “delegate to ADK agent”.
2. Implement the wrapper with strict timeouts and redaction.
3. Register and test selection/execution under policy.

## Verify

- Calls are bounded (timeouts/budgets).
- Outputs are schema-valid and auditable.

## Troubleshooting

- Unreliable output → add evaluators and multi-trial stability checks.
- Too much authority → downscope tokens and enforce external egress policy.
- Debugging hard → store intermediate evidence as artifacts.

## Cleanup / Rollback

- Deprecate the node type and revoke credentials.

## Next steps

- How-to: [Import A2A agents](./import-a2a-agents.md)
- How-to: [Incident response playbook](../operations/incident-response-playbook.md)

