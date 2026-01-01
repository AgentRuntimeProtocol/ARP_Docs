---
title: Configure PDP integration and policy checkpoints
---

:::caution Stub
This How-to is a stub. The JARVIS stack has a working `PDP` component, but the full checkpoint matrix and default policy pack are still stabilizing.
:::

## Goal

You will integrate a `PDP` and configure explicit policy checkpoints:
- request-time,
- selection-time (candidate filtering),
- pre-invoke,
- pre-irreversible action.

## When to use this

- You want “policy as execution semantics” (allow/deny decisions at explicit points).
- You want auditable policy decisions (durable artifacts/events).

## Prerequisites

- A running `PDP` service
- A policy profile (deny-by-default when no profile is set)
- Each decision point configured to call PDP and enforce the decision

## Steps

1. Configure `Run Coordinator` to call PDP for:
   - `run.start`,
   - `node.run.execute`.
2. Configure `Selection Service` to call PDP for candidate filtering (selection-time).
3. Configure `Atomic Executor` to call PDP before irreversible actions (where applicable).
4. Ensure every PDP decision is recorded (event/artifact).

## Verify

- Denied actions are blocked deterministically.
- Allowed actions proceed and emit a corresponding decision record.

## Troubleshooting

- Policy seems ignored → checkpoint not wired → verify service logs and PDP URL.
- PDP denies unexpectedly → inspect principal claims + node metadata used for the decision.
- Missing node metadata → have PDP fetch node metadata from `Node Registry` (or enrich requests).

## Cleanup / Rollback

- Switch to a permissive dev profile (dev only) to debug quickly.

## Next steps

- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
- Troubleshooting: [“Policy keeps denying tool use”](../troubleshooting/policy-denies-tool-use.md)
