---
title: Roadmap
sidebar_position: 5
---

Planned future improvements and features (high level).

:::note Source of truth

The most up-to-date roadmap lives in issues/PRs across the repos. This page captures themes reflected in the current codebase and READMEs.

:::

## Active focus areas

- **Node-centric execution fabric**: stabilize v1 service contracts + conformance for `Run Gateway` / `Run Coordinator` / executors / registry / selection / `PDP`.
- **Bounded action spaces**: constraints and candidate-set enforcement (structural limits + allow/deny).
- **Policy checkpoints**: `PDP` integration and clear enforcement patterns in `Run Coordinator` / `Composite Executor`.
- **Better quickstarts**: version-pinned full-stack local bring-up (target: `JARVIS_Release` docker composition).

## Likely next milestones

- **Pinned stack repo (`JARVIS_Release`)**:
  - version-pinned docker compose profiles,
  - shared `.env.example` patterns,
  - “one command” local bring-up.
- **Capability lifecycle surfaces**:
  - richer evaluation artifacts and promotion gates,
  - scorecard-driven selection and policy hints.
- **Integrations as capabilities**:
  - MCP/A2A adapters packaged as atomic nodes (remote-only by default),
  - documentation and templates for safe wrappers.

## Related repos

- `https://github.com/AgentRuntimeProtocol/ARP_Standard`
- `https://github.com/AgentRuntimeProtocol/JARVIS_RunGateway`
- `https://github.com/AgentRuntimeProtocol/JARVIS_RunCoordinator`
- `https://github.com/AgentRuntimeProtocol/JARVIS_CompositeExecutor`
