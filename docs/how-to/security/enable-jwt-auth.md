---
title: Enable JWT auth across the JARVIS stack
---

:::caution Stub
This How-to is a stub. JARVIS enforces JWT validation on most services by default, but the fully polished “one-page end-to-end auth enablement” guide is still in progress.
:::

## Goal

You will enable JWT-based auth for inter-component calls (gateway → coordinator → executors → registry) and validate that requests fail closed without a token.

## When to use this

- You are moving beyond dev-insecure mode.
- You want consistent authn semantics across the stack.

## Prerequisites

- A running JARVIS stack (recommended: `JARVIS_Release`)
- An STS / IdP that issues JWTs (Keycloak dev STS or external provider)
- Each service configured with:
  - `issuer` (`iss`) and
  - expected `audience` (`aud`)

## Steps

1. Configure the stack to run with auth enabled (Keycloak dev STS or external STS).
2. Verify each service rejects unauthenticated requests (`401`/`403`).
3. Mint a JWT and call:
   - `Run Gateway` `POST /v1/runs`,
   - downstream internal services (as needed for debugging).

## Verify

- Without `Authorization: Bearer ...`, the request is rejected.
- With a valid JWT, the request succeeds and downstream calls propagate auth correctly.

## Troubleshooting

- `401` everywhere → issuer/audience mismatch → verify `iss`/`aud` configuration on both caller and callee.
- Token exchange fails → see next How-to (token exchange configuration).
- Mixed posture between services → ensure all services share the same auth profile defaults.

## Cleanup / Rollback

- Switch back to a dev profile (dev only) or disable auth explicitly for local testing.

## Next steps

- How-to: [Configure token exchange](./configure-token-exchange.md)
- Troubleshooting: [Fix “401/403 everywhere”](../troubleshooting/auth-401-403-everywhere.md)
