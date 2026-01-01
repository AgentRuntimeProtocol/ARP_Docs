---
title: Deploy JARVIS to Kubernetes
---

:::caution Stub
This How-to is a stub. JARVIS ships a Docker Compose baseline (`JARVIS_Release`); a Kubernetes baseline topology is planned.
:::

## Goal

You will deploy the JARVIS stack to Kubernetes with a minimal, version-pinned topology.

## When to use this

- You are moving from local dev to a shared environment.
- You need scaling and better operational primitives than Compose.

## Prerequisites

- A Kubernetes cluster
- Container images for all JARVIS components (pinned versions)
- A secrets/config strategy (K8s secrets, vault, etc.)

## Steps

1. Choose a baseline topology (namespaces, services, ingress).
2. Deploy stateful stores with persistence (run store, artifact store, event stream).
3. Deploy stateless services (gateway, coordinator, executors, selection, registry, PDP).
4. Configure auth, PDP, and budgets.

## Verify

- A sample run completes end-to-end.
- Logs/traces/artifacts are available for debugging.

## Troubleshooting

- Startup order/auth dependency issues → ensure STS is available early and services retry.
- Persistent volume issues → validate storage class and permissions.
- Service discovery issues → validate internal DNS names and ports.

## Cleanup / Rollback

- Roll back by re-pinning to the last known-good release bundle.

## Next steps

- How-to: [Connect external OTel collector / SIEM pipeline](./connect-siem-pipeline.md)
- How-to: [Production hardening checklist](../operations/production-hardening-checklist.md)
