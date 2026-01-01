---
title: Production hardening checklist
---

:::caution Stub
This How-to is a stub. JARVIS has baseline safety levers (budgets, policies), but the full prod checklist is still being finalized.
:::

## Goal

You will apply a production hardening checklist: timeouts, budgets, egress allowlists, and safe failure modes.

## When to use this

- You want to run JARVIS in a real environment.
- You need to reduce the blast radius of unexpected behavior.

## Prerequisites

- Auth enabled (JWT + token exchange)
- PDP integrated and enforced at checkpoints
- Budgets configured (depth, branching, retries, timeouts)

## Steps

1. Enforce budgets (depth/branching/timeouts) and fail closed.
2. Enforce egress allowlists (HTTP, filesystem, external APIs).
3. Enable durable artifacts and redaction.
4. Add monitoring and alerting on:
   - repeated denials,
   - repeated retries/remaps,
   - abnormal latency/cost.

## Verify

- The stack fails safely under misconfigurations (no silent allow).
- Observability is sufficient to explain failures.

## Troubleshooting

- Unexpected denials → adjust policy profile and validate metadata.
- Runaway loops → tighten budgets and enforce recovery limits.
- Data leakage concerns → tighten redaction and egress policies.

## Cleanup / Rollback

- Roll back to a known-good pinned release bundle.

## Next steps

- How-to: [Scaling guidance](./scaling-guidance.md)
- How-to: [Incident response playbook](./incident-response-playbook.md)
