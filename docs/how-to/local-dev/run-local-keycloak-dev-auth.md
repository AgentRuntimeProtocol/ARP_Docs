---
title: Run JARVIS locally — Keycloak dev auth
---

## Goal

You will bring up a full JARVIS stack locally with the **Keycloak dev STS** profile (JWT + token exchange).

## When to use this

- You want a local environment closer to production auth flows.
- You want to validate service-to-service token exchange.

## Prerequisites

- Docker + Docker Compose
- A local checkout of `JARVIS_Release`

## Steps

1. Create a local env file:

   ```bash
   cd JARVIS_Release
   cp compose/.env.example compose/.env.local
   ```

2. Keep the default profile:

   ```bash
   # in compose/.env.local
   # STACK_PROFILE=dev-secure-keycloak
   ```

3. Start the stack:

   ```bash
   docker compose --env-file compose/.env.local -f compose/docker-compose.yml up -d
   ```

4. Check Run Gateway health:

   ```bash
   curl -sS http://localhost:8081/v1/health
   ```

## Verify

- `curl` returns HTTP `200`.
- Keycloak is reachable on `http://localhost:8080` (default).

## Troubleshooting

- Health is `degraded` because Keycloak isn’t ready yet → wait 10–30 seconds, then retry; check `docker compose logs -f keycloak`.
- You changed `KEYCLOAK_HOST_PORT` but did not update `ARP_AUTH_ISSUER` → update `ARP_AUTH_ISSUER` in `compose/profiles/dev-secure-keycloak.env`.
- You see auth errors between services → confirm the `ARP_*_CLIENT_SECRET` values in `compose/.env.local` match `compose/keycloak/realm-arp-dev.json`.

## Cleanup / Rollback

- Stop the stack (keeps volumes):

  ```bash
  docker compose --env-file compose/.env.local -f compose/docker-compose.yml down
  ```

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [Authentication in JARVIS](../../jarvis/authentication.md)
- How-to: [Start a run (Run Gateway)](../running-work/start-a-run.md)
