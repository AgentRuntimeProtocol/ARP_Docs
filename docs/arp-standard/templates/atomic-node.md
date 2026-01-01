---
title: Atomic Node Authoring
sidebar_position: 1
---

Atomic nodes are how you expose capabilities into the ARP/JARVIS stack.

In JARVIS v0.x, atomic nodes are packaged as Python **node packs**:
- `Node Registry` consumes the `NodeType` metadata.
- `Atomic Executor` consumes the handler implementations.

See the first-party pack for the current authoring UX:
- GitHub: `AgentRuntimeProtocol/JARVIS_AtomicNodes`
- PyPI: `arp-jarvis-atomic-nodes`

For end-to-end guidance, see:
- [Tutorial: Thin Mode (wrap an API)](../../getting-started/tutorials/thin-mode.md)
