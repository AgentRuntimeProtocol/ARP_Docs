---
title: Connect an OTel collector / SIEM pipeline
---

:::caution Stub
This How-to is a stub. JARVIS does not yet ship a full audit pipeline, but the integration pattern is planned via OTel exporters + external collectors.
:::

## Goal

You will connect JARVIS audit-relevant signals (events, traces, policy decisions) to an external OTel collector / SIEM pipeline.

## When to use this

- You need centralized audit logging and incident response support.
- You are running in production and need compliance visibility.

## Prerequisites

- An OTel collector endpoint and SIEM destination
- A redaction policy (avoid leaking secrets/PII)
- Stable correlation IDs (`run_id`, `node_run_id`)

## Steps

1. Export traces to the collector (OTel tracing).
2. Export events/audit logs to the collector (or a log pipeline) with correlation IDs.
3. Index policy decisions and denials as high-signal audit events.

## Verify

- You can query by `run_id` and see:
  - traces,
  - policy decisions,
  - key events.

## Troubleshooting

- Missing correlation IDs → add them as attributes/fields everywhere.
- Too much noise → sample and filter; keep policy denials high priority.
- Sensitive data in logs → tighten redaction at source.

## Cleanup / Rollback

- Disable exporters or rotate credentials to the collector.

## Next steps

- How-to: [Enable OpenTelemetry tracing](../operations/enable-otel-tracing.md)
- How-to: [Incident response playbook](../operations/incident-response-playbook.md)
