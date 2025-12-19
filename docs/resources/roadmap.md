---
title: Roadmap
sidebar_position: 5
---

Planned future improvements and features (high level).

:::note Source of truth

The most up-to-date roadmap lives in issues/PRs across the repos. This page captures themes reflected in the current codebase and READMEs.

:::

## Active focus areas

- **Interop adapters**: MCP aggregation behind Tool Registry, Agent Protocol façades, and A2A-style patterns.
- **Daemon hardening**: runtime profile safety, lifecycle management, and isolation for managed instances.
- **Docs + examples**: end-to-end demos and clearer deployment patterns.
- **Observability**: better trace access and ergonomics across components.

## Likely next milestones

- **Tool Registry**: pluggable tool sources (beyond in-repo “domains”).
- **Runtime**: richer run lifecycle (events/streaming) and additional provider support beyond OpenAI-backed `openai` mode.
- **Control Plane**: expand UI/API capabilities for managing instances and runs via a daemon.

## Related repos

- `https://github.com/AgentRuntimeProtocol/ARP_Standard`
- `https://github.com/AgentRuntimeProtocol/JARVIS_Runtime`
- `https://github.com/AgentRuntimeProtocol/JARVIS_Tool_Registry`
- `https://github.com/AgentRuntimeProtocol/JARVIS_Daemon`
