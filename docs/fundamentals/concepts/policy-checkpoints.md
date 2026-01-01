---
title: Policy Checkpoints
sidebar_position: 3
---

ARP separates:
- **authn** (“who is this?”) via JWT validation, and
- **authz** (“is this allowed?”) via policy checkpoints.

## Where policy is evaluated

Policy decisions should happen at explicit, stable checkpoints — not scattered throughout business logic.

In the JARVIS stack, key checkpoints include:
- `run.start`: starting a run
- `node.run.execute`: dispatching an atomic/composite node run

The **`Run Coordinator`** is the main enforcement point because it is the system-of-record for `Run`/`NodeRun` state and dispatch.

## PDP vs in-process policy

- **`PDP` (Policy Decision Point)** is an HTTP service that returns allow/deny decisions.
- **`arp-policy`** is a local policy engine (in-process evaluation).

JARVIS uses `arp-policy` as the evaluation core, and can expose it behind the PDP API so that:
- multiple components share one policy source of truth,
- policy decisions are auditable artifacts,
- implementations can later swap the PDP backend (OPA, centralized IAM policy, etc.).

:::note Enrichment matters

Policy often depends on `NodeType` metadata (trust tier, side effects, tags). In JARVIS v0.3.x, `PDP` can fetch `NodeType` metadata from `Node Registry` to avoid forcing callers to embed large metadata blobs in every policy request.

:::

## Example policy: “first-party atomic only”

A useful early-stage policy is:
- allow composite planner nodes (system-owned),
- allow atomic nodes only when the `NodeType` is marked as first-party/trusted.

This keeps the early JARVIS stack focused on a small, auditable action space while the ecosystem stabilizes.

## Where to go next

- How-to: [Decide policy (PDP)](../../how-to/security/decide-policy.md)
- Reference: [ARP Standard: PDP](../../arp-standard/components/pdp.md)
- JARVIS behavior: [PDP](../../jarvis/component-implementations/pdp.md)
- Related concept: [Candidate Sets](./candidate-sets.md)
