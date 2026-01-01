---
title: Import MCP tools as atomic capabilities
---

:::caution Stub
This How-to is a stub. JARVIS does not yet ship first-class MCP ingestion; the planned posture is “remote-only wrappers, no self-hosted MCP inside the stack”.
:::

## Goal

You will import MCP tools into ARP as atomic capabilities (catalog ingestion pattern) without running untrusted MCP servers inside the JARVIS stack.

## When to use this

- You want to reuse an MCP tool ecosystem safely.
- You want selection-time policy to bound which tools can be used.

## Prerequisites

- A source of MCP tool manifests (external service, curated list)
- A wrapper strategy (HTTP-based proxy nodes)
- `Node Registry` metadata model for external capabilities

## Steps

1. Fetch MCP tool metadata from the external source.
2. Convert each tool into a `NodeType` entry (schemas + description + trust tier `external`).
3. Implement wrapper node handlers that call the MCP tool endpoint remotely.
4. Seed/publish these `NodeType`s into `Node Registry`.

## Verify

- `Selection` can see the imported tools (as `NodeType`s).
- Imported tools are not executed in-process (no RCE).

## Troubleshooting

- Tool schemas unclear → keep schemas minimal and validate strictly at wrapper boundary.
- Too many tools → curate and bound by category.
- Data exfil risk → enforce egress allowlists and redaction.

## Cleanup / Rollback

- Deprecate imported tool node types and revoke credentials.

## Next steps

- How-to: [Invoke MCP tools through ARP as bounded candidates](./invoke-mcp-tools-through-arp.md)
- How-to: [Remote-only external capability posture](../security/remote-only-external-capabilities.md)
