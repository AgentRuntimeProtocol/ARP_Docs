---
slug: /
title: Introduction to ARP
---

![ARP Logo](../../media/images/Logos/ARP_Long_Transparent.png)

:::note Potential Breaking Changes

ARP is still at an early stage, and active development is happening with new features every week. This creates the risk of breaking changes.

<details>
<summary>Click to expand</summary>

#### The ARP Standard

The ARP Standard is versioned by API namespace (for example `/v1/...`). When the standard needs to introduce breaking HTTP contract changes, it will do so under a new namespace (for example `/v2/...`).

#### The JARVIS Stack

JARVIS is the first-party OSS implementation stack. Implementation details and CLI UX may evolve as the stack matures.
For deployment and local bring-up, use the version-pinned `JARVIS_Release` stack and the `arp-jarvis` CLI.
</details>

This documentation is kept up-to-date to the latest release of both the *ARP Standard* and the *JARVIS* OSS Stack.
:::

***Agent Runtime Protocol*** (ARP) is an evolving set of contracts and components for running **capability-oriented**, **bounded**, **auditable** agentic workflows across runtimes, tools, model providers, and environments.

ARP is opinionated about one thing: **reliability comes from enforceable bounds + durable artifacts**, not from “better prompts”.

## Capability Oriented Programming

**Capability Oriented Programming** (COP) is the core of everything we are building here. It is the mindset: define capabilities you can evaluate, publish, and reuse with evidence. 

**Agent Runtime Protocol** makes COP operational by defining the node-centric execution fabric: `NodeType`s, `NodeRun`s, candidate sets, policy checkpoints, events, and artifacts.

**JARVIS** is the first-party OSS implementation of the ARP Standard services (plus a few practical internal services for durability/audit).

If you are curious about COP and how this shapes ARP, start here: [Fundamentals](../fundamentals/index.md) (COP + ARP Concepts).

## Standard vs. Implementation

| | ARP Standard  | JARVIS Implementations |
| --- | --- | --- |
| What it is | Versioned HTTP+JSON contracts (OpenAPI + JSON Schema + conformance) | First-party OSS components that implement the contracts (plus non-spec internals) |
| Source of truth | [`ARP_Standard/spec/v1/`](https://github.com/AgentRuntimeProtocol/ARP_Standard/tree/main/spec/v1) | [`JARVIS_Release`](https://github.com/AgentRuntimeProtocol/JARVIS_Release) + component repos |
| Primary audience | Implementers of ARP-compatible services and SDKs | Users running ARP services and extending the stack |
| Docs in this site | [ARP Standard](../arp-standard/index.md) | [JARVIS Implementation](../jarvis/index.md) |
| Python packaging | Packages: [`arp-standard-model`](https://pypi.org/project/arp-standard-model/), [`arp-standard-client`](https://pypi.org/project/arp-standard-client/), [`arp-standard-server`](https://pypi.org/project/arp-standard-server/) | Pinned stack: [`arp-jarvis`](https://pypi.org/project/arp-jarvis/) |

Across this documentation portal, you may see some features are marked as **WIP** while the ecosystem is actively being built.

## Quickstart

See ARP run with the end-to-end Quickstart on the JARVIS first party OSS reference implementation:

- [JARVIS Quickstart](./quickstart.md)

:::note Version pinning

For local bring-up and repeatable builds, prefer the version-pinned stack distribution repo:
- `JARVIS_Release` (Docker Compose baseline + `stack.lock.json`)

Use `arp-jarvis stack` as the default way to bring the stack up and down. Running services outside Docker is supported but is considered an advanced path.

:::

---

## Core services

ARP Standard v1 defines the **node-centric execution fabric** service set:

- **`Run Gateway`** — client entrypoint: start/get/cancel runs (+ optional event streaming)
- **`Run Coordinator`** — run authority: lifecycle, enforcement, scheduling/dispatch, audit history
- **`Atomic Executor`** — executes atomic `NodeRun`s (strict request/response envelopes)
- **`Composite Executor`** — executes composite `NodeRun`s (planner/arg-gen/eval hooks; internals not standardized)
- **`Node Registry`** — catalogs `NodeType`s (metadata; versions; deprecation)
- **`Selection`** — generates bounded candidate sets for mapping subtasks to `NodeType`s
- **`PDP`** (optional) — returns policy decisions (allow/deny/require-approval)

JARVIS also ships **non-spec internal services** (Run Store, Event Stream, Artifact Store) as practical building blocks for durability and audit.

### System Diagram

High-level topology (typical JARVIS deployment):

```text
Client
  │
  ▼
Run Gateway ─────► Run Coordinator ─────► Atomic Executor(s)
                      │   │
                      │   ├─────────────► Composite Executor(s)
                      │   │                  │
                      │   │                  └─────────────► Selection Service
                      │   │                                     │
                      │   │                                     └─────────────► Node Registry
                      │   │
                      │   └─────────────► PDP (optional)
                      │
                      ├─────────────► Run Store (non-spec)
                      ├─────────────► Event Stream (non-spec)
                      └─────────────► Artifact Store (non-spec)
```

---

## What you'll find here

- [**Quickstart (Full stack)**](./quickstart.md): Run a minimal end-to-end JARVIS stack locally.
- [**Fundamentals**](../fundamentals/index.md): COP mindset + ARP concepts.
- [**How-to Guides**](../how-to/index.md): Copy/paste recipes for doing one thing at a time.
- [**ARP Standard (Spec)**](../arp-standard/index.md): Required endpoints, schemas, conformance, SDKs.
- [**JARVIS implementation**](../jarvis/index.md): Reference behavior, defaults, and deployment notes.
- [**Integrations**](../integrations/index.md): How ARP/JARVIS fits with MCP, A2A, and other ecosystems.
- [**Helper Libraries**](../libraries/index.md): Shared packages used across components (`arp-auth`, `arp-llm`, `arp-policy`).
- [**Extra Resources**](../resources/index.md): Roadmap, glossary, changelog, FAQ.

---

## Next steps

If you're new and eager to try ARP out, begin with the [Quickstart Guide](./quickstart.md).
