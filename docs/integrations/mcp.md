---
title: MCP Integration
sidebar_position: 1
---

This page describes where MCP-style tool servers plug into a node-centric ARP deployment.

:::caution WIP

The first-party JARVIS stack does not ship a built-in MCP aggregator yet. This page focuses on the intended *integration shape*.

:::

## Where it fits

In ARP v1, the “action surface” is expressed as **`NodeType`s**.

The recommended integration approach is:
- expose MCP tools as **atomic `NodeType`s**, and
- execute them via the **`Atomic Executor`** (in-process trusted packs) or via a wrapper service (remote-only).

`Selection` can then treat MCP-provided capabilities the same way it treats first-party ones: as catalog entries with schemas, descriptions, and governance metadata.

## Related docs

- [Concept: Candidate Sets](../fundamentals/concepts/candidate-sets.md)
- [ARP Standard: Atomic Executor](../arp-standard/components/atomic-executor.md)
- [JARVIS Atomic Executor](../jarvis/component-implementations/atomic-executor.md)
- [Roadmap](../resources/roadmap.md)
