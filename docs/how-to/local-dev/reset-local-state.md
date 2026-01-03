---
title: Reset local state — wipe stores
---

## Goal

You will wipe local durable state for a JARVIS dev stack (Run Store, Event Stream, Artifact Store, Node Registry DB).

## When to use this

- You want a clean slate for testing.
- You are debugging a “works on my machine” issue caused by old DB files or artifacts.

## Prerequisites

- Docker + Docker Compose
- You are running the stack via `JARVIS_Release` (typically with `arp-jarvis stack`)
- You understand this is **destructive** (it deletes local volumes).

## Steps

1. Stop the stack and delete volumes:

   ```bash
   cd JARVIS_Release
   arp-jarvis stack down --volumes
   ```

2. (Optional) Remove any dangling images built locally:

   ```bash
   docker image prune -f
   ```

## Verify

- `docker volume ls` no longer shows the JARVIS volumes (or they have been recreated after the next `up`).

## Troubleshooting

- `compose/.env.local` not found → you didn’t create it yet → `cp compose/.env.example compose/.env.local`.
- “volume is in use” → containers are still running → `arp-jarvis stack ps` then stop them, or `docker ps` and stop manually.
- You only want to wipe one store (not all) → don’t use `-v`; remove the specific volume by name with `docker volume rm <name>`.

## Cleanup / Rollback

- None. This is the rollback.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [JARVIS internal services](../../jarvis/index.md)
- How-to: [Run JARVIS locally (dev mode)](./run-local-dev-mode.md)
