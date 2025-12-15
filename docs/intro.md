---
slug: /
title: Agent Runtime Protocol
sidebar_position: 1
---

:::note 

ARP is still at an early stage, and the contract and implementation details may change without notice. This documentation is kept up-to-date to the latest release of `jarvis-arp` PyPi package.

:::

***ARP (Agent Runtime Protocol)*** is an evolving set of contracts and components for _**running agentic workflows**_ in a consistent way across runtimes, tools, and model providers. 

It is **open-core** and designed to be cloud/[model](./core-concepts/model-integration.md)-agnostic. In case the ready-to-use components don't fully support your specific use cases, ARP is also built to be fully modular. With the open standard and contract, every part of the ecosystem can be swapped out as needed. 

This documentation site describes the current **MVP implementation** and the public interfaces it exposes. Some features are intentionally marked as **WIP** as the ecosystem is still actively being built.

---

# Current Architecture 

ARP is split into a few cooperating components:

- **Model**: The open source standard and contract for components in ARP to talk to each other. 
- [**Jarvis Runtime**](./core-concepts/runtime.md): The open source default agent runtime, which executes a flow using a 3-role loop (`Plan` → `Tool` → `Chat`).
- [**Tool Registry**](./core-concepts/tool-registry.md): The open source tool service that provides tool discovery, schemas, and invocation routing.
- [**Control Plane (WIP)**](./core-concepts/control-plane.md): coordinates the lifecycle of many Runtime/Tool Registry instances (design-only today). Once ready, it will provide capabilities that doesn't naturally fit in the agent runtime, including:
    - Short/Long-term memory,
    - Tool to spin up another subagent runtime,
    - Multi-agent system with cooperation,
    - Cross-environment/cloud runtime lifecycle management, 
    - Trace viewer with full decision record, etc.

---

# What you'll find here

- [**Quickstart**](./quickstart.md): Get an MVP setup running end-to-end.
- [**Core concepts**](./core-concepts/overview.md): Runtime, Tool Registry, and Model Integration.
- [**Guides & examples**](./guides/overview.md): Practical walkthroughs for common workflows.
- [**API reference**](./api-reference/overview.md): Full tech specs for public interfaces.

---

# Start here

If you're new and eager to try ARP out, begin with the [Quickstart Guide](./quickstart.md).
