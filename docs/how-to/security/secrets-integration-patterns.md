---
title: Secrets integration patterns
---

:::caution Stub
This How-to is a stub. JARVIS currently uses environment variables and `.env` files for local dev; production-grade secret managers are planned.
:::

## Goal

You will manage secrets safely in development and production (env vars, vault-style systems, redaction).

## When to use this

- You are enabling auth, token exchange, or external integrations.
- You want to prevent secrets from leaking into artifacts/logs/LLM prompts.

## Prerequisites

- A secrets source (env vars for dev; secret manager for prod)
- A redaction policy for logs and artifacts
- Clear separation of “config” vs “secret” values

## Steps

1. For local dev, use `.env` files and keep them out of git.
2. For production, mount secrets via your platform (Kubernetes secrets, Vault, etc.).
3. Redact secrets at boundaries:
   - HTTP request logs,
   - artifact contents,
   - LLM prompts and outputs.

## Verify

- Secrets do not appear in logs or artifacts.
- Services start successfully with secrets injected via the expected mechanism.

## Troubleshooting

- Accidental leakage → rotate secrets immediately and purge artifacts/logs if required.
- Confusing env var names → standardize naming per service.
- Too many secret knobs → group by profiles and keep overrides minimal.

## Cleanup / Rollback

- Rotate secrets and restart services.

## Next steps

- How-to: [Enable JWT auth](./enable-jwt-auth.md)
- Troubleshooting: [“401/403 everywhere”](../troubleshooting/auth-401-403-everywhere.md)
