---
title: Define a “remote-only external capability” posture
---

:::caution Stub
This How-to is a stub. The v0.x JARVIS stack focuses on first-party atomic nodes; external tool ecosystems (MCP/A2A) are planned as remote wrappers.
:::

## Goal

You will adopt a security posture where external capabilities are exposed only via remote calls (wrappers), avoiding in-process execution of untrusted code (no RCE).

## When to use this

- You want to integrate MCP/A2A without hosting untrusted servers inside the stack.
- You want a clear boundary for data egress and policy enforcement.

## Prerequisites

- A way to represent “external” node types in `Node Registry` metadata
- Policy rules that restrict external nodes (egress, scopes, approvals)
- Wrapper node implementations that call external services over HTTP

## Steps

1. Catalog external tools as `NodeType`s with trust tier `external`.
2. Implement wrappers as first-party code that:
   - validates inputs/outputs,
   - enforces timeouts and allowlists,
   - redacts secrets and sensitive data.
3. Enforce selection-time and pre-invoke policies for external nodes.

## Verify

- No untrusted code runs inside `Atomic Executor` processes.
- External calls are auditable (events/artifacts) and policy-gated.

## Troubleshooting

- Too many wrappers → focus on a small set of high-value integrations.
- Data leak risk → enforce strict egress allowlists and redaction.
- Prompt injection via tool output → treat outputs as untrusted inputs to planners.

## Cleanup / Rollback

- Deprecate external node types and revoke credentials.

## Next steps

- How-to: [Import MCP tools](../integrations/import-mcp-tools.md)
- How-to: [Secrets integration patterns](./secrets-integration-patterns.md)

