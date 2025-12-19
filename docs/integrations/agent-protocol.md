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
2. translates them into an ARP `RunRequest`
3. submits the run to:
   - a **Runtime** (direct), or
   - a **Daemon** (routed / multi-instance)
4. translates ARP `RunStatus` / `RunResult` / trace information back into the external protocol’s shapes

## Related docs

- [ARP Standard: Runtime](../arp-standard/components/runtime.md)
- [ARP Standard: Tool Registry](../arp-standard/components/tool-registry.md)
- [ARP Standard: Daemon](../arp-standard/components/daemon.md)
- [Roadmap](../resources/roadmap.md)
