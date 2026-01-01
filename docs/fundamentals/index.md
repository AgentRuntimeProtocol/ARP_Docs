---
title: Fundamentals
sidebar_position: 0
---

“Fundamentals” covers the two layers that underpin the ARP ecosystem:

- **COP (Capability Oriented Programming)** defines what we mean by a *capability*: a bounded unit of work you can evaluate, publish, and reuse with evidence.
- **ARP Standard** turns that COP idea into concrete, versioned objects and APIs:
  - capabilities become **`NodeType`** records (catalog entries with schemas and metadata),
  - executions become **`NodeRun`** records (instances with inputs/outputs/events),
  - `Run`s, candidate sets, policy decisions, events, and artifacts make the lifecycle operational.

The **JARVIS** stack is the first-party OSS implementation of the ARP Standard services and the default place where these concepts become running code.

## How to use this section

- Start with **COP** if you want the mindset/lifecycle.
- Use **ARP Concepts** to learn the concrete objects (`NodeType`s, `NodeRun`s, candidate sets, policy checkpoints, artifacts).
- Use [**How-to Guides**](../how-to/index.md) for copy/paste recipes.
