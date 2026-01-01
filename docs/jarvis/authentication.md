---
title: Authentication in JARVIS
sidebar_position: 2
---

JARVIS uses **JWT bearer tokens** for inbound authn on most HTTP endpoints and an **OIDC STS** for service-to-service tokens (client credentials + token exchange).

## Two layers

### 1) Inbound JWT validation (per service)

Each service validates the incoming `Authorization: Bearer <jwt>` and enforces:
- signature (via JWKS)
- `iss` (issuer)
- `aud` (audience, typically the service ID)

Most services exempt `/v1/health` and `/v1/version` from auth so you can do liveness checks without a token.

Inbound auth is configured via `ARP_AUTH_*` (see “Env var cheat sheet” below).

### 2) Outbound STS tokens (service → service)

When one JARVIS service calls another, it obtains a token scoped to the callee, so the callee can validate `aud` properly.

JARVIS uses `arp-auth` for:
- `client_credentials` (mint a service token)
- RFC 8693 `token-exchange` (exchange an incoming token into a token for a downstream audience)

## Profiles in `JARVIS_Release`

`JARVIS_Release` drives auth posture via `STACK_PROFILE` (see `compose/profiles/*.env`):

- `dev-secure-keycloak` (default): JWT validation enabled + token exchange via local Keycloak STS
- `dev-insecure`: inbound JWT validation disabled (dev only); Keycloak still runs for service-to-service tokens
- `enterprise`: template placeholders for an external issuer/STS and external stores

## Local Keycloak dev STS (how it’s “set up”)

In the pinned `JARVIS_Release` Docker Compose stack, Keycloak is the dev STS:
- Compose runs Keycloak with `--import-realm`.
- The realm import (`compose/keycloak/realm-arp-dev.json`) defines:
  - realm: `arp-dev`
  - one confidential client per service (client secret auth, service accounts enabled)
  - an audience mapper so minted tokens include the client ID in the access token `aud` claim

## Where client secrets come from (in the release bundle)

For local dev, secrets are intentionally “known strings” so the stack boots without manual Keycloak setup:

1. You copy `compose/.env.example` → `compose/.env.local`.
2. `.env.local` contains `ARP_*_CLIENT_SECRET` values that must match the Keycloak realm import.
3. `compose/docker-compose.yml` maps those values into each container as `ARP_AUTH_CLIENT_SECRET` (the variable `arp-auth` reads).

For real deployments, generate unique client secrets and inject them via your platform’s secret manager (do not commit them).

## Calling Run Gateway in `dev-secure-keycloak` (mint a token)

In `dev-secure-keycloak`, `/v1/health` and `/v1/version` are unauthenticated, but API calls like `POST /v1/runs` require `Authorization: Bearer <token>`.

The simplest dev token is a **client-credentials** token minted from the local Keycloak realm using the `arp-run-gateway` client secret:

```bash
curl -sS \
  -X POST \
  http://localhost:8080/realms/arp-dev/protocol/openid-connect/token \
  -d 'grant_type=client_credentials' \
  -d 'client_id=arp-run-gateway' \
  -d 'client_secret=arp-run-gateway-secret'
```

Use the returned `access_token` as the bearer token when calling Run Gateway.

## Which components need a client secret?

Only services that mint/exchange tokens for outbound calls need `ARP_AUTH_CLIENT_ID` + `ARP_AUTH_CLIENT_SECRET`.

In the default JARVIS topology:
- `Run Gateway` exchanges the inbound token into a coordinator-scoped token before forwarding.
- `Run Coordinator` mints service tokens to call downstream executors and internal services.
- `Composite Executor` and `PDP` may mint tokens for their downstream dependencies.

Leaf services that don’t call anything downstream typically only need `ARP_AUTH_SERVICE_ID` (inbound audience).

:::note Current dev-stack caveat
In `JARVIS_Release`, `Node Registry` runs with `ARP_AUTH_MODE=optional` to allow Selection Service calls (the current Selection client does not attach bearer tokens).
:::

## Env var cheat sheet

Inbound JWT validation (per service):
- `ARP_AUTH_PROFILE` (`dev-secure-keycloak`, `dev-insecure`, `enterprise`)
- `ARP_AUTH_MODE` (`required`, `optional`, `disabled`)
- `ARP_AUTH_ISSUER` (expected `iss`)
- `ARP_AUTH_AUDIENCE` or `ARP_AUTH_SERVICE_ID` (expected `aud`)
- `ARP_AUTH_OIDC_DISCOVERY_URL` or `ARP_AUTH_JWKS_URI` (where to fetch JWKS)

Outbound STS token requests (per *caller* service):
- `ARP_AUTH_CLIENT_ID`
- `ARP_AUTH_CLIENT_SECRET`
- `ARP_AUTH_TOKEN_ENDPOINT` (or `ARP_AUTH_ISSUER` + `/protocol/openid-connect/token`)

Downstream audience selection (examples):
- `JARVIS_RUN_COORDINATOR_AUDIENCE`
- `JARVIS_*_AUDIENCE`

## Related docs

- How-to: [Run JARVIS locally — Keycloak dev auth](../how-to/local-dev/run-local-keycloak-dev-auth.md)
- How-to: [Enable JWT auth across the JARVIS stack](../how-to/security/enable-jwt-auth.md)
- How-to: [Configure token exchange for delegation](../how-to/security/configure-token-exchange.md)
- Library: [`arp-auth`](../libraries/arp-auth.md)
