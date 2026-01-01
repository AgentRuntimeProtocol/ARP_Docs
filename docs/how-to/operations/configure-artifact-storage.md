---
title: Configure artifact storage
---

:::caution Stub
This How-to is a stub. JARVIS includes an `Artifact Store`, but production hardening (encryption, retention, redaction) is not yet fully documented.
:::

## Goal

You will configure artifact storage settings: retention, redaction, and encryption-at-rest.

## When to use this

- You are preparing for production.
- You want durable, auditable execution artifacts without leaking sensitive data.

## Prerequisites

- A running `Artifact Store`
- A retention/redaction policy
- (Optional) An external backing store (S3/GCS/etc.) if not using local FS/SQLite

## Steps

1. Configure retention policy (time-based and/or size-based).
2. Configure redaction rules (secrets, PII, tokens).
3. Enable encryption-at-rest in your storage backend (where applicable).
4. Ensure services store large payloads as artifacts, not in events.

## Verify

- Artifacts are persisted and retrievable by `artifact_id`.
- Sensitive fields do not appear in stored artifacts.

## Troubleshooting

- Missing artifacts → store URL/config mismatch between services.
- Artifacts too large → enforce max bytes and store references.
- Leakage → rotate secrets and tighten redaction immediately.

## Cleanup / Rollback

- Wipe local artifacts only in dev; do not delete production evidence casually.

## Next steps

- How-to: [Debug using artifacts](./debug-with-artifacts.md)
- Troubleshooting: [Artifacts missing](../troubleshooting/artifacts-missing.md)
