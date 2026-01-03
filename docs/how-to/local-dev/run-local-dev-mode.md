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
- Python `>=3.11` + `pip` (for `arp-jarvis`)
- A local checkout of `JARVIS_Release`
- You understand this is **not** a production posture.

## Steps

1. Fast path (recommended): run the dev-insecure bootstrap script (macOS/Linux or WSL):

   ```bash
   cd JARVIS_Release
   bash ./start_dev.sh \
     --llm-api-key "<your_openai_api_key>" \
     --llm-chat-model "gpt-4.1-mini"
   ```

   This script:
   - creates `compose/.env.local` from `compose/.env.example.insecure` if needed
   - installs the CLI from the local checkout
   - pulls images and brings the stack up
   - runs `arp-jarvis doctor`

2. Manual path: create a local env file:

   ```bash
   cd JARVIS_Release
   cp compose/.env.example.insecure compose/.env.local
   ```

3. (Optional) Verify the stack profile:

   ```bash
   # edit compose/.env.local
   # STACK_PROFILE=dev-insecure
   ```

4. Install the CLI:

   ```bash
   python3 -m pip install -e .
   arp-jarvis versions
   ```

5. Start the stack and verify wiring:

   ```bash
   arp-jarvis stack pull
   arp-jarvis stack up -d
   arp-jarvis doctor
   ```

## Verify

- `arp-jarvis doctor` shows Run Gateway and Run Coordinator as healthy.
- If you curl `/v1/health`, the JSON body includes `status: "ok"` (or `status: "degraded"` if a downstream dependency is unavailable).

## Troubleshooting

- `docker: Cannot connect to the Docker daemon` → Docker isn’t running → start Docker Desktop / the Docker daemon.
- Run Gateway health shows `degraded` with a `run_coordinator` check → Run Coordinator isn’t healthy yet → `arp-jarvis stack logs -f run-coordinator`.
- Port already in use (`bind: address already in use`) → another service is using `8080` or `8081` → change `KEYCLOAK_HOST_PORT` / `RUN_GATEWAY_HOST_PORT` in `compose/.env.local`.

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
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- How-to: [Run JARVIS locally (Keycloak dev auth)](./run-local-keycloak-dev-auth.md)
