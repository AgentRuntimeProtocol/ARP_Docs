---
title: Agent-to-Agent (A2A)
sidebar_position: 2
---

This page describes multi-agent patterns (“agent-to-agent”) in ARP terms.

:::caution WIP

ARP Standard v1 does not define a dedicated A2A protocol, and the first-party JARVIS stack does not ship a multi-agent coordination layer today. The patterns below are future guidance to integrate to either layer.

:::

## Recommended patterns

### Pattern 1: “Agents as tools” (via Tool Registry)

Expose “call another agent” as a Tool Registry tool. The tool handler:

- constructs a `RunRequest`
- submits it to a Runtime (direct) or Daemon (routed)
- returns the `RunResult` (or a filtered subset) as the tool result

This keeps the runtime’s execution model unchanged: the runtime only knows how to call tools; the tool encapsulates the A2A hop.

### Pattern 2: Orchestrator at the application layer

Have your application orchestrate multiple runs explicitly:

- run Agent A → read result
- feed result into Agent B as context/data
- aggregate results in your own “controller” logic

This is often the simplest approach when custom routing or business-specific policies are needed, but may involve ARP Standard Contract change/addition. 

## Related docs

- [ARP Standard: Runtime](../arp-standard/components/runtime.md)
- [ARP Standard: Daemon](../arp-standard/components/daemon.md)
- [Roadmap](../resources/roadmap.md)
