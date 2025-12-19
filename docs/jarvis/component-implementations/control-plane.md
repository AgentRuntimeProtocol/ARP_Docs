---
title: Control Plane
sidebar_position: 5
---

JARVIS Control Plane is an **optional** orchestration service that sits above one or multiple **JARVIS Daemon**s.

:::caution WIP

JARVIS Control Plane is still in development. This page is intentionally a stub.

:::

## What it’s for (high level)

- **High-level orchestration:** manage and coordinate workflows across daemon-managed runtimes.
- **Observability:** help you inspect what’s running and what happened during execution.
- **Policy management:** a place to add org-specific policy and guardrails over ARP operations.

## Standard vs. implementation

ARP Standard v1 defines the **Daemon** service for instance management and run routing.
The JARVIS Control Plane is not part of the ARP Standard; it is a JARVIS-specific layer on top of daemons, and will use the Standard SDK to communicate with them.

## See also

- [JARVIS Daemon](./daemon.md)
- [ARP Standard: Daemon](../../arp-standard/components/daemon.md)
