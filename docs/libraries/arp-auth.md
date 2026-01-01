---
title: arp-auth
sidebar_position: 1
---

`arp-auth` is a small helper library used for:
- **JWT bearer validation settings** (server-side via `arp-standard-server`)
- **OIDC token exchange** (client-side) for service-to-service calls

In the JARVIS stack:
- `Run Gateway` exchanges inbound user tokens into coordinator-scoped tokens.
- `Run Coordinator` exchanges/mints service tokens for downstream executors and internal services.

## What it does (high level)

- Reads OIDC/STS configuration from `ARP_AUTH_*` environment variables.
- Implements:
  - client credentials flow (service token)
  - RFC 8693 token exchange (subject token → target audience)

## Where to look

- GitHub: `AgentRuntimeProtocol/ARP_Auth`
- PyPI: `arp-auth`
