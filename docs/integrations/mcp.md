---
title: MCP Integration
sidebar_position: 1
---

This page describes where MCP-style tool servers would plug into an ARP deployment.

:::caution WIP

The first-party JARVIS Tool Registry does **not** ship MCP aggregation yet. This page is intentionally a high-level stub. Work is ongoing.

:::

## Where it fits

MCP integration (when added) belongs behind an **ARP Tool Registry**. The Tool Registry is the only standardized “tool surface” in ARP:

- discovery: `GET /v1/tools` and `GET /v1/tools/{tool_id}`
- invocation: `POST /v1/tool-invocations`

An MCP-aware Tool Registry would:

- expose MCP-provided tools as ARP `ToolDefinition` objects
- route ARP tool invocations to the correct MCP server
- normalize responses into ARP `ToolInvocationResult` (and transport errors into `ErrorEnvelope`)

If you need this today, implement your own Tool Registry that conforms to the ARP Standard v1 contract.

## Related docs

- [ARP Standard: Tool Registry](../arp-standard/components/tool-registry.md)
- [JARVIS Tool Registry implementation](../jarvis/component-implementations/tool-registry.md)
- [Roadmap](../resources/roadmap.md)
