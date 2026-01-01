---
title: Fix “401/403 everywhere”
---

:::caution Stub
This How-to is a stub. JARVIS auth defaults are stable, but the full “one checklist to fix auth” guide is still being refined as profiles evolve.
:::

## Goal

You will debug stack-wide `401`/`403` errors by verifying JWT validation (`iss`/`aud`), token exchange, and auth propagation.

## When to use this

- Every service call fails with `401` or `403`.
- Inter-service calls fail even though the gateway request is authenticated.

## Prerequisites

- Access to service logs for the failing component(s)
- The expected `issuer` and `audience` values for the stack profile
- A way to mint tokens (Keycloak dev STS or external STS)

## Steps

1. Confirm which service is returning `401`/`403` (gateway vs downstream).
2. Verify JWT validation settings on the callee:
   - expected `iss`,
   - expected `aud`.
3. Verify the caller is using token exchange correctly:
   - the outgoing token’s `aud` matches the callee.
4. Verify JWKS reachability (the callee can fetch public keys).

## Verify

- A request with a valid JWT succeeds.
- The same request without a token fails closed.

## Troubleshooting

- `aud` mismatch → fix audience configuration and re-mint tokens.
- `iss` mismatch → fix issuer URL and ensure it matches the STS realm.
- JWKS fetch fails → network/DNS problem or wrong issuer URL.

## Cleanup / Rollback

- For dev only: switch to a dev-insecure profile to unblock iteration, then revert.

## Next steps

- How-to: [Enable JWT auth](../security/enable-jwt-auth.md)
- How-to: [Configure token exchange](../security/configure-token-exchange.md)
