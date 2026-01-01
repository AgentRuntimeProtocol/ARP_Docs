---
title: JARVIS Release (pinned stack)
sidebar_position: 1
---

`JARVIS_Release` is the version-pinned stack distribution for JARVIS.
It is the **recommended** way to deploy JARVIS locally and in production-like environments.

## What it is

- GitHub: `AgentRuntimeProtocol/JARVIS_Release`
- Lock file: `stack.lock.json` (stack version, component versions, node pack versions, helper library pins)
- Deployment: `compose/docker-compose.yml` (Docker Compose stack consuming **per-service GHCR images**)
- Profiles: `compose/profiles/*.env` (auth posture + LLM profile defaults)

## Images (GHCR)

Each JARVIS component repo publishes a GHCR image tagged by the stack version (for example `:0.3.3`):

- `ghcr.io/agentruntimeprotocol/arp-jarvis-rungateway:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-run-coordinator:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-atomic-executor:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-composite-executor:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-node-registry:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-selection-service:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-pdp:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-runstore:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-eventstream:0.3.3`
- `ghcr.io/agentruntimeprotocol/arp-jarvis-artifactstore:0.3.3`

The exact refs are pinned in `stack.lock.json`.

## How you use it

- Bring up the stack with Docker Compose (see [Quickstart](../getting-started/quickstart.md)).
- Talk to the stack through the **Run Gateway** API (client entrypoint).
- Use `arp-jarvis` (meta CLI) for advanced local/dev workflows (running services outside Docker, inspecting pins).

## Profiles

Set `STACK_PROFILE` in `compose/.env.local`:

- `dev-secure-keycloak` (default): JWT + token exchange via local Keycloak STS
- `dev-insecure` (dev-only): inbound JWT checks disabled
- `enterprise` (template): placeholders for external issuer and external stores

## LLM defaults

`Selection Service` and `Composite Executor` require an LLM provider.

- Default profile is OpenAI (`ARP_LLM_PROFILE=openai` by default).
- Set `ARP_LLM_API_KEY` and `ARP_LLM_CHAT_MODEL`.
- `dev-mock` exists for offline tests but is **not** the default.

## Next steps

- Reference: [Authentication in JARVIS](./authentication.md)
- How-to: [Run JARVIS locally — Keycloak dev auth](../how-to/local-dev/run-local-keycloak-dev-auth.md)
- How-to: [Pin or upgrade the release bundle](../how-to/local-dev/pin-upgrade-release-bundle.md)
- Reference: [JARVIS component implementations](./component-implementations/index.md)
