---
slug: /
title: Introduction to ARP
---

![ARP Logo](../media/images/Logos/ARP_Long_Transparent.png)

:::note Potential Breaking Changes

ARP is still at an early stage, and active development is happening with new features every week. This creates the risk of breaking changes.

<details>
    <summary> Click To Expand </summary>
    #### The ARP Standard
    The ARP Standard is versioned by API namespace (for example `/v1/...`). When the standard absolutely needs to introduce breaking HTTP contract changes, it is expected to do so under a new namespace (for example `/v2/...`).

    #### The JARVIS Stack
    JARVIS is the first-party OSS implementation stack. Implementation details and CLI UX may evolve as the stack matures. For local development, install the pinned meta-package (`arp-jarvis`) to get known-compatible component versions.
</details>

This documentation is kept up-to-date to the latest release of both the *ARP Standard* and the *JARVIS* OSS Stack.
:::

***ARP (Agent Runtime Protocol)*** is an evolving set of contracts and components for _**running agentic workflows**_ in a consistent way across runtimes, tools, model providers, and environments.

## Standard vs. Implementation

| | ARP Standard  | JARVIS Implementations |
| --- | --- | --- |
| What it is | API contracts (OpenAPI + JSON Schema) | First-party OSS components that implement the contracts |
| Source of truth | [`ARP_Standard/spec/v1/`](https://github.com/AgentRuntimeProtocol/ARP_Standard/tree/main/spec/v1) | [JARVIS repos](https://github.com/AgentRuntimeProtocol/JARVIS_Release) |
| Primary audience | Implementers of ARP-compatible services and SDKs | Users running ARP services and extending the stack |
| Docs in this site | [ARP Standard](./arp-standard/index.md) | [JARVIS Implementation](./jarvis/index.md) + [Guides](./guides/index.md) |
| Python packaging | SDK: [`arp-standard-py`](https://pypi.org/project/arp-standard-py/) | Pinned stack: [`arp-jarvis`](https://pypi.org/project/arp-jarvis/) |

Across this documentation portal, you may see some features are marked as **WIP** while the ecosystem is actively being built.

## Start here

Install the pinned JARVIS stack and confirm your environment is set up:

```bash
python3 -m venv .venv
source .venv/bin/activate

python3 -m pip install arp-jarvis
arp-jarvis versions
```

---

## Core services

ARP Standard v1 defines three primary HTTP services.

- [**Tool Registry:**](./arp-standard/components/tool-registry.md) tool discovery and invocation. 
- [**Runtime:**](./arp-standard/components/runtime.md) agentic runtimes that execute runs. 
- [**Daemon:**](./arp-standard/components/daemon.md) manage runtime instances and route runs to them. 

The JARVIS ecosystem also includes a **Control Plane** (WIP). This is not part of ARP Standard v1. See [JARVIS Control Plane](./jarvis/component-implementations/control-plane.md).

:::note "Instance"
You may encounter terms like "a *Runtime Instance*". As the term suggests, an **instance** is a running process of a specific component implementation. For example, a runtime instance is a running service process based on a runtime package. These terms may be used interchangeably when there's no risk of confusion.
:::

### System Diagram

Here's a diagram of a common configuration of an ARP system:

![A basic configuration of an ARP System](../media/images/Diagrams/ARP_Ecosystem_Diagram_Basic.png)

---

## What you'll find here

- [**Quickstart**](./quickstart.md): Get an MVP setup running end-to-end.
- [**ARP Standard (Spec)**](./arp-standard/index.md): Required endpoints, schemas, conformance, SDKs.
- [**JARVIS implementation**](./jarvis/index.md): Core concepts, guides, and implementation notes.
- [**Guides & examples**](./guides/index.md): Practical walkthroughs for common workflows.
- [**Integrations**](./integrations/index.md): How ARP/JARVIS fits with other ecosystems (MCP, A2A, Agent Protocol).
- [**API reference**](./api-reference/index.md): Public interfaces (implementation-level) and conventions.
- [**Resources**](./resources/index.md): Roadmap, glossary, changelog, FAQ.

---

## Next steps

If you're new and eager to try ARP out, begin with the [Quickstart Guide](./quickstart.md).
