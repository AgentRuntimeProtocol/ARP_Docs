---
title: Pin or upgrade the release bundle
---

## Goal

You will understand how to pin (or upgrade) the version-pinned JARVIS stack distribution used for local bring-up.

## When to use this

- You want known-compatible versions across all JARVIS components.
- You are upgrading and want a predictable rollback path.

## Prerequisites

- A local checkout of `JARVIS_Release`

## Steps

1. Inspect the pinned versions:

   - Stack lock: `JARVIS_Release/stack.lock.json`
   - Compose profile: `JARVIS_Release/compose/.env.local` (`STACK_VERSION`)

2. Upgrade by switching the repo ref (recommended):

   ```bash
   cd JARVIS_Release
   git fetch --tags
   git checkout <new-tag>
   ```

3. Restart the stack using the new pin:

   ```bash
   docker compose --env-file compose/.env.local -f compose/docker-compose.yml up -d
   ```

## Verify

- `docker compose ps` shows all services running.
- Run Gateway health is OK:

  ```bash
  curl -sS http://localhost:8081/v1/health
  ```

## Troubleshooting

- New version fails to start → check logs (`docker compose logs -f <service>`), then roll back to the previous tag.
- You changed `STACK_VERSION` but are still running old images → run `docker compose pull` then re-run `docker compose up -d`.
- You see schema mismatches across services → confirm all components are pinned to the same stack version in `stack.lock.json`.

## Cleanup / Rollback

- Roll back by checking out the previous tag and re-running `docker compose up -d`.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [JARVIS_Release](../../jarvis/index.md)
- How-to: [Run JARVIS locally (Keycloak dev auth)](./run-local-keycloak-dev-auth.md)
