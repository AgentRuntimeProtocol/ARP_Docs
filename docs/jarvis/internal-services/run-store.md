---
title: Run Store — internal service
sidebar_position: 1
---

`Run Store` is a JARVIS-only internal service that persists:
- `Run` records
- `NodeRun` records

It is not part of the ARP Standard; it exists to keep the `Run Coordinator` focused on orchestration and enforcement while delegating persistence to a small, swappable store.

## Default implementation (v0.3.x)

- Backend: SQLite (file-backed)
- Access pattern: owned by the `Run Coordinator` (no direct cross-component DB access)

## Where to look

- GitHub: `AgentRuntimeProtocol/JARVIS_RunStore`
- PyPI: `arp-jarvis-runstore`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-runstore:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `run-store`
- Internal URL: `http://run-store:8091`
