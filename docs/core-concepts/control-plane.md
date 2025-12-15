---
title: Control Plane
sidebar_position: 5
---

The Control Plane is planned as a future component to coordinate multiple runtimes
and manage deployments.

## Scope (high level)

- **Fleet lifecycle**: start/stop/upgrade a pool of Runtime instances (the “data plane”).
- **Configuration management**: manage which Tool Registry instances/domains a Runtime can use.
- **Scheduling and routing**: choose which Runtime executes a request; apply policy constraints.
- **Policy and governance**: authn/authz, rate limiting, tenancy boundaries (planned).
- **Observability**: trace/metrics/log aggregation and a UI/API to inspect runs (planned).

## MVP status

The Control Plane is **design-only** in the current MVP:

- The shipped Runtime and Tool Registry run as standalone components (CLI + HTTP service).
- There is no centralized orchestration, UI, scheduler, or policy layer yet.
