---
title: arp-policy
sidebar_position: 3
---

`arp-policy` is an in-process policy evaluation engine.

In JARVIS:
- it is used as the evaluation core behind the `PDP` interface,
- and its decisions are enforced by `Run Coordinator` and other decision points.

## Why a local engine?

A local policy engine is valuable even when you later add a “real” governance system:
- it’s easy to test,
- it runs without external dependencies,
- it provides a clear policy model early in the ecosystem.

## Where to look

- GitHub: `AgentRuntimeProtocol/ARP_Policy`
- PyPI: `arp-policy`
