---
title: Roadmap
sidebar_position: 5
---

Planned future improvements and features (high level).

## Near-term

- Stabilize the shared contract layer (`jarvis-model`) and keep Tool Registry/Runtime aligned on `schema_version`.
- Expand the Tool Registry tool catalog beyond the `core` domain (more domains and examples).
- Improve production-readiness gaps called out in the MVP repos (authn/authz, rate limiting, multi-tenancy boundaries, better observability).
- Refine tracing ergonomics (structured events, replay tooling, redaction controls).

## Longer-term

- Control Plane implementation (fleet management, routing/scheduling, policy, and observability across many runtimes).
- Pluggable tool sources (for example MCP aggregation) and remote invocation routing policies.
- Broader model/provider support (beyond the current OpenAI-backed `openai` mode).
