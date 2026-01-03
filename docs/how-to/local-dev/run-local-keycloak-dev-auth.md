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
- Python `>=3.11` + `pip` (for `arp-jarvis`)
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

3. Install the CLI:

   ```bash
   python3 -m pip install -e .
   arp-jarvis versions
   ```

4. Start the stack and verify wiring:

   ```bash
   arp-jarvis stack pull
   arp-jarvis stack up -d
   arp-jarvis doctor
   ```

5. Log in once (device/browser flow) and start a run:

   ```bash
   arp-jarvis auth login
   arp-jarvis runs start --goal "Generate a UUID, then return it."
   ```

   Default dev user in the local realm (for the browser step):
   - username: `dev`
   - password: `dev`

## Verify

- `arp-jarvis doctor` shows Run Gateway, Run Coordinator, and Keycloak as healthy.
- Keycloak is reachable on `http://localhost:8080` (default).

## Troubleshooting

- Health is `degraded` because Keycloak isn’t ready yet → wait 10–30 seconds, then retry; check `arp-jarvis stack logs -f keycloak`.
- You changed `KEYCLOAK_HOST_PORT` but did not update `ARP_AUTH_ISSUER` → update `ARP_AUTH_ISSUER` in `compose/profiles/dev-secure-keycloak.env`.
- You see auth errors between services → confirm the `ARP_*_CLIENT_SECRET` values in `compose/.env.local` match `compose/keycloak/realm-arp-dev.json`.

## Cleanup / Rollback

- Stop the stack (keeps volumes):

  ```bash
  arp-jarvis stack down
  ```

## Docker Compose fallback (no CLI)

```bash
docker compose --env-file compose/.env.local -f compose/docker-compose.yml up -d
curl -sS http://localhost:8081/v1/health
```

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Reference: [Authentication in JARVIS](../../jarvis/authentication.md)
- How-to: [Start a run (Run Gateway)](../running-work/start-a-run.md)
