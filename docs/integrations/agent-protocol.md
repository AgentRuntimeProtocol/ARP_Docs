---
title: 3rd Party Agent Protocol Compatibility
sidebar_position: 3
---

This page describes how to build compatibility layers between ARP and other “agent-as-a-service” HTTP APIs, like "Agent Protocol" by LangChain.

:::caution WIP

ARP Standard v1 does not ship an official compatibility layer for other agent protocols. If you need interoperability today, the recommended approach is to build a small façade service that translates requests/responses.

First-party offering of this translation layer is in development.

:::

## Recommended approach

Create a service that:

1. accepts requests in the external protocol
2. translates them into an ARP v1 run start request (root `NodeType` + input)
3. submits the run to **`Run Gateway`** (client entrypoint) or **`Run Coordinator`** (run authority)
4. translates ARP `Run` / `NodeRun` state and events back into the external protocol’s shapes

## Related docs

- [ARP Standard: Run Gateway](../arp-standard/components/run-gateway.md)
- [ARP Standard: Run Coordinator](../arp-standard/components/run-coordinator.md)
- [JARVIS Run Gateway](../jarvis/component-implementations/run-gateway.md)
- [Roadmap](../resources/roadmap.md)
