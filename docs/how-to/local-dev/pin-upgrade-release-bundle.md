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
   python3 -m pip install -e .
   arp-jarvis stack pull
   arp-jarvis stack up -d
   arp-jarvis doctor
   ```

## Verify

- `arp-jarvis doctor` shows all core services healthy.
- Run Gateway health is OK:

  ```bash
  curl -sS http://localhost:8081/v1/health
  ```

## Troubleshooting

- New version fails to start → check logs (`arp-jarvis stack logs -f <service>`), then roll back to the previous tag.
- You changed `STACK_VERSION` but are still running old images → run `arp-jarvis stack pull` then re-run `arp-jarvis stack up -d`.
- You see schema mismatches across services → confirm all components are pinned to the same stack version in `stack.lock.json`.

## Cleanup / Rollback

- Roll back by checking out the previous tag and re-running `arp-jarvis stack up -d`.

## Next steps

- Concept: [Artifacts and replay](../../fundamentals/concepts/artifacts-and-replay.md)
- Reference: [JARVIS_Release](../../jarvis/index.md)
- How-to: [Run JARVIS locally (Keycloak dev auth)](./run-local-keycloak-dev-auth.md)
