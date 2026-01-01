---
title: Run JARVIS locally — dev mode
---

## Goal

You will bring up a full JARVIS stack locally with **inbound JWT validation disabled** (dev-only posture).

## When to use this

- You are iterating on component behavior and want to avoid auth friction.
- You want to validate end-to-end wiring (gateway → coordinator → executors → stores) before hardening.

## Prerequisites

- Docker + Docker Compose
- A local checkout of `JARVIS_Release`
- You understand this is **not** a production posture.

## Steps

1. Create a local env file:

   ```bash
   cd JARVIS_Release
   cp compose/.env.example compose/.env.local
   ```

2. Set the stack profile to `dev-insecure`:

   ```bash
   # edit compose/.env.local
   # STACK_PROFILE=dev-insecure
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
- The JSON body includes `status: "ok"` (or `status: "degraded"` if a downstream dependency is unavailable).

## Troubleshooting

- `docker: Cannot connect to the Docker daemon` → Docker isn’t running → start Docker Desktop / the Docker daemon.
- Run Gateway health shows `degraded` with a `run_coordinator` check → Run Coordinator isn’t healthy yet → `docker compose logs -f run-coordinator`.
- Port already in use (`bind: address already in use`) → another service is using `8080` or `8081` → change `KEYCLOAK_HOST_PORT` / `RUN_GATEWAY_HOST_PORT` in `compose/.env.local`.

## Cleanup / Rollback

- Stop the stack (keeps volumes):

  ```bash
  docker compose --env-file compose/.env.local -f compose/docker-compose.yml down
  ```

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- How-to: [Run JARVIS locally (Keycloak dev auth)](./run-local-keycloak-dev-auth.md)
