---
title: Overview
sidebar_position: 0
---

This section covers interoperability patterns: how ARP/JARVIS can connect to other ecosystems (MCP, A2A, agent-as-a-service APIs).

:::caution WIP

Most integrations are not shipped end-to-end in the first-party JARVIS stack yet. These pages focus on **where** an integration plugs into the node-centric execution fabric (typically by importing a remote system as one or more `NodeType`s).

:::

## Start here

- For the normative HTTP+JSON contracts: [ARP Standard](../arp-standard/index.md)
- For what’s implemented today: [JARVIS Implementation](../jarvis/index.md)

## In this section

- [MCP Integration](./mcp.md) (import MCP tools as capabilities)
- [Agent-to-Agent (A2A)](./agent-to-agent.md) (treat another agent as a capability source)
- [3rd Party Agent Protocol Compatibility](./agent-protocol.md) (facades over `Run Gateway` / `Run Coordinator`)
