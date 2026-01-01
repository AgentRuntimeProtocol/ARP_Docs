---
title: "Quickstart: Run JARVIS locally"
---

## Goal

You will bring up a full JARVIS stack locally and start one sample composite `Run`.

## When to use this

- You want to validate the end-to-end JARVIS stack with minimal setup.
- You want a known-good local baseline before developing nodes/policies/evaluators.

## Prerequisites

- Docker + Docker Compose
- A local checkout of `JARVIS_Release`

## Steps

1. Follow the end-to-end Quickstart:

   - [Quickstart](../../getting-started/quickstart.md)

## Verify

- Run Gateway health returns `200`:

  ```bash
  curl -sS http://localhost:8081/v1/health
  ```

- You can start a run:
  - [Start a run (Run Gateway)](../running-work/start-a-run.md)

## Troubleshooting

- The Quickstart uses many terminals / env vars → prefer `JARVIS_Release` to run the full stack with Docker Compose.
- Ports already in use → change host ports in `JARVIS_Release/compose/.env.local`.
- Auth failures (`401`/`403`) → confirm your `STACK_PROFILE` and Keycloak issuer settings.

## Cleanup / Rollback

- Stop the stack (keeps volumes):

  ```bash
  cd JARVIS_Release
  docker compose --env-file compose/.env.local -f compose/docker-compose.yml down
  ```

## Next steps

- Concept: [Capabilities and nodes](../../fundamentals/concepts/capabilities-and-nodes.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- How-to: [Run JARVIS locally (Keycloak dev auth)](./run-local-keycloak-dev-auth.md)
