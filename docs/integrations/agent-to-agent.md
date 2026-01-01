---
title: Agent-to-Agent — A2A
sidebar_position: 2
---

This page describes multi-agent patterns (“agent-to-agent”) in ARP terms.

:::caution WIP

ARP Standard v1 does not define a dedicated A2A protocol, and the first-party JARVIS stack does not ship a multi-agent coordination layer today. The patterns below are guidance for integrating A2A behavior into the node-centric execution fabric.

:::

## Recommended patterns

### Pattern 1: “Agents as capabilities” (atomic `NodeType`s)

Expose “call another agent” as one or more atomic `NodeType`s. The handler:

- sends a request to the remote agent API
- normalizes the response into typed outputs
- returns those outputs as the atomic `NodeRun` outputs

This keeps the execution fabric unchanged: planners/selectors see the remote agent as a capability option, and policy can gate it like any other node type.

### Pattern 2: Orchestrator at the application layer

Have your application orchestrate multiple runs explicitly:

- run Agent A → read result
- feed result into Agent B as context/data
- aggregate results in your own “controller” logic

This is often the simplest approach when custom routing or business-specific policies are needed, but may involve ARP Standard Contract change/addition. 

## Related docs

- [Concept: Candidate Sets](../fundamentals/concepts/candidate-sets.md)
- [ARP Standard: Run Gateway](../arp-standard/components/run-gateway.md)
- [ARP Standard: Run Coordinator](../arp-standard/components/run-coordinator.md)
- [Roadmap](../resources/roadmap.md)
