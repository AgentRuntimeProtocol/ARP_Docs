---
title: ARP Concepts
sidebar_position: 1
---

In this section, we identify a set of core objects and durable artifacts. They help bridge the gap between COP, an engineering mindset, and ARP, a real protocol that's implementable (and indeed implemented as the JARVIS stack.)

:::note Standard vs. implementation

This section explains the shared mental model, a.k.a. what the objects mean and why they exist. For normative schemas and endpoints, see [ARP Standard](../../arp-standard/index.md).

:::

## Core Concepts

- **[Capabilities and Nodes](./capabilities-and-nodes.md):** what a `NodeType` is, how `NodeRun`s are created, and how `Run`s are structured.
- **[Candidate Sets](./candidate-sets.md):** how `Selection` returns candidate sets, which are bounded action spaces for planners, and how that limits “what the system can do next”.
- **[Policy Checkpoints](./policy-checkpoints.md):** how authn/authz and other access policy checkpoints are enforced.
- **[Artifacts and Replay](./artifacts-and-replay.md):** why events and artifacts exist and how they support replay and evaluation.

## Related sections

- [COP mindset and lifecycle](../cop/index.md): why “capabilities” matter.
- [JARVIS behavior and defaults](../../jarvis/index.md)
- [Copy/paste recipes](../../how-to/index.md)
