---
title: COP Manifest
sidebar_position: 1
---

Capability Oriented Programming (COP) is a programming mindset and system design discipline that treats **capability reliability** as the primary unit of engineering.

In COP, you don’t only decompose work by “what the user asked.” You also decompose work by **what a system can reliably do**, prove it with evaluation, and reuse it once it is known-good.

## Key definitions

- **Capability (COP)**: a named operation with explicit I/O schema, semantics, and an operational envelope.
- **`NodeType` (ARP)**: the versioned capability definition (schemas + metadata). Implementations can be services or trusted in-process handlers.
- **`NodeRun` (ARP)**: an execution instance of a `NodeType` within a `Run`.
- **Atomic capability**: executes the operation directly (service, pipeline, structured transform, remote tool call).
- **Composite capability**: builds outcomes by decomposing, mapping, executing, evaluating, and recovering — under constraints.

For the ARP terms, see: [Capabilities and Nodes](../concepts/capabilities-and-nodes.md).

## COP principles

### 1) Contracts over prompts

Natural language is not an interface contract.

- Prefer typed schemas and explicit semantics.
- Place NL at the edges only where proven valuable, and convert it to structured intent quickly.

### 2) Reliability boundaries over “agent autonomy”

A capability’s responsibility is defined by:
- what it can do correctly and consistently,
- what it must refuse,
- and what it must escalate.

Autonomy without boundaries is not capability — it’s unbounded failure.

### 3) Evaluation before reuse

A capability is not “real” until it is measured.

- Define test suites and/or outcome-based evaluation.
- Measure stability across runs (not only one success).
- Store results as durable artifacts that can inform routing and promotion.

### 4) Hierarchy and bounded action spaces

COP assumes a single planner cannot reliably micromanage hundreds of tools.

So we engineer systems where:
- composites only see bounded candidate menus per step (top‑K + allow/deny + budgets),
- subtasks are mapped to known-good atomic capabilities (or recurse into a planner),
- and recovery is structured, not improvisational.

See: [Candidate Sets (Bounded Action Spaces)](../concepts/candidate-sets.md).

### 5) Governance and operations are first-class

Production systems require:
- identity propagation and authorization gates,
- policy checkpoints (selection-time, pre-invoke, pre-irreversible),
- budgeting, rate limits, and auditability.

If this is bolted on later, you don’t know what you shipped.

See: [Policy Checkpoints](../concepts/policy-checkpoints.md).

### 6) Interop by composition, not replacement

COP doesn’t require inventing new rails.

- MCP can become capability import/export for tools (schemas + invocation).
- A2A can become capability import/export for delegation.

ARP is additive: it composes rails and frameworks into a unified capability fabric.

### 7) Incremental adoption over rewrites

COP is designed for:
- enthusiasts building personal automation,
- internal teams adding reliability to workflows,
- multi-team organizations composing capability catalogs.

You can wrap existing services and agent frameworks as capability providers, then evolve system structure as reliability improves.

## COP in practice: the capability engineering loop

This describes the target COP loop. The current JARVIS reference stack implements a minimal subset (contracts + bounded selection + execution + durable events), with scorecards/promotion as explicit roadmap items.

1) **Define** a capability contract (schema, semantics, envelope, side-effect class)
2) **Implement** it as an atomic node (or import it via MCP/A2A)
3) **Evaluate** (offline suites + replay + multi-trial stability checks)
4) **Publish** to the `Node Registry` (versioned, with scorecards)
5) **Promote** through channels (experimental → candidate → stable, policy-gated)
6) **Compose** into composite workflows (bounded candidate menus + budgets + explicit recovery)
7) **Observe + audit** (durable events + artifacts for every decision)

## Why ARP exists

COP is a mindset; ARP is the protocol layer that makes it operational. The non-negotiable primitives are:

- **Capability contracts** (schemas + semantics + envelopes)
- **Candidate menus** (bounded K; enforceable constraints)
- **Policy checkpoints** + identity lineage
- **Durable evidence** (events + artifacts)

JARVIS is the first-party implementation of those primitives and is where COP becomes a running system.
