---
title: Incident response playbook
---

:::caution Stub
This How-to is a stub. A full incident response playbook is planned, starting with prompt injection, data leaks, and runaway loops.
:::

## Goal

You will respond to common incidents: prompt injection, data egress, and runaway execution.

## When to use this

- You suspect policy bypass or data leakage.
- A run is looping or causing unexpected cost.

## Prerequisites

- Durable artifacts/events enabled
- Ability to revoke credentials/secrets quickly
- A rollback strategy (`JARVIS_Release` pinning)

## Steps

1. Contain:
   - stop the affected runs,
   - revoke tokens/secrets if needed,
   - tighten policy temporarily (deny more).
2. Triage using artifacts:
   - candidate sets,
   - binding decisions,
   - tool calls / outputs.
3. Remediate:
   - patch the capability,
   - add evaluators/policy gates,
   - roll forward with a pinned release.

## Verify

- The incident scope is understood and contained.
- A postmortem exists with actionable follow-ups.

## Troubleshooting

- Missing evidence → increase artifact coverage before returning to prod.
- Unclear root cause → add tracing and better decision artifacts.
- Repeated incidents → tighten action space (candidate sets, budgets) and add policy gates.

## Cleanup / Rollback

- Rotate secrets and roll back to the last known-good release bundle.

## Next steps

- Troubleshooting: [Composite node loops or stalls](../troubleshooting/composite-loops-or-stalls.md)
- How-to: [Production hardening checklist](./production-hardening-checklist.md)

