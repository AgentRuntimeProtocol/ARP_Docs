---
title: Wrap LangGraph graphs as nodes
---

:::caution Stub
This How-to is a stub. A “wrap a graph as a node” adapter pattern is planned; full implementation is not yet shipped.
:::

## Goal

You will wrap a LangGraph graph as an ARP capability (atomic or composite) and emit ARP artifacts externally.

## When to use this

- You have existing LangGraph workflows and want ARP’s bounded execution + policy.
- You want to integrate without rewriting everything.

## Prerequisites

- A runnable LangGraph graph
- A wrapper service/process that can execute it and expose a stable endpoint
- A mapping from graph events → ARP artifacts/events

## Steps

1. Define an ARP `NodeType` that represents the graph (“invoke graph”).
2. Implement a wrapper that:
   - executes the graph,
   - emits ARP-like artifacts (candidate sets, decisions, evaluations) where possible.
3. Register and test selection/execution.

## Verify

- Graph execution is bounded and auditable from ARP’s perspective.
- Outputs are schema-valid.

## Troubleshooting

- Too opaque → emit more intermediate artifacts as evidence.
- Unbounded graph behavior → add budgets and strict tool allowlists inside the wrapper.
- Version drift → pin graph version and expose it in metadata.

## Cleanup / Rollback

- Deprecate the wrapped graph node type.

## Next steps

- How-to: [Deploy to Kubernetes](./deploy-to-kubernetes.md)
- How-to: [Production hardening checklist](../operations/production-hardening-checklist.md)

