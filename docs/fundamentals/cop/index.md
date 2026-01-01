---
title: Capability Oriented Programming
sidebar_position: 0
---

Capability Oriented Programming is the high-level engineering mindset behind ARP and JARVIS: build systems around **capabilities you can prove**, not around prompts you hope will work.

## What COP changes

Instead of treating “the agent” as one monolithic thing:
- define small, bounded capabilities (represented as **`NodeType`s** in ARP),
- evaluate them with repeatable tests and scorecards,
- publish and reuse the ones that are stable,
- keep orchestration bounded using candidate sets and constraints.

## COP and ARP

ARP is the protocol layer that makes COP operational:
- **`Selection`** produces bounded candidate sets,
- **`Run Coordinator`** enforces constraints and policy checkpoints,
- **`RunEvent`s and `ArtifactRef`s** provide audit and replay surfaces.

## Where to go next

- The COP principles: [COP Manifest](./manifest.md)
- The capability lifecycle: [COP lifecycle](./lifecycle.md)
- Common anti-patterns: [Anti-patterns](./anti-patterns.md)
