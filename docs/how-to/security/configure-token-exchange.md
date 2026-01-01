---
title: Configure token exchange for delegation
---

:::caution Stub
This How-to is a stub. JARVIS uses token exchange for service-to-service delegation, but the external STS (prod) profile is not yet fully documented.
:::

## Goal

You will configure token exchange so a caller can obtain a service-specific token for downstream calls.

## When to use this

- You want least-privilege delegation chains (gateway → coordinator → executor).
- You want downstream services to validate tokens minted specifically for them.

## Prerequisites

- A working STS / IdP that supports token exchange (Keycloak dev STS or external STS)
- A client identity for each service (client ID/secret or equivalent)
- `arp-auth` client helpers for token exchange (JARVIS uses `arp-auth` semantics)

## Steps

1. Configure STS clients (one per service) and allowed audiences.
2. Configure each service with STS endpoints and client credentials for outgoing token exchange.
3. For each outgoing call, exchange the incoming token (or client credentials in dev mode) into a token for the callee’s `aud`.

## Verify

- Service-to-service requests include a bearer token with the callee’s expected `aud`.
- Callee validates the token via JWKS and enforces `iss`/`aud`.

## Troubleshooting

- STS returns `invalid_client` → client secret mismatch or client not enabled.
- STS returns `unauthorized_client` → token exchange not allowed for that client/audience.
- Downstream rejects token → audience mismatch or issuer mismatch.

## Cleanup / Rollback

- Revoke/rotate client secrets and restart services.

## Next steps

- How-to: [Configure PDP checkpoints](./configure-pdp-checkpoints.md)
- How-to: [Run JARVIS locally with Keycloak dev auth](../local-dev/run-local-keycloak-dev-auth.md)
