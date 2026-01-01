---
title: Fix “policy keeps denying tool use”
---

:::caution Stub
This How-to is a stub. The JARVIS policy surface is stabilizing; checkpoint wiring and policy bundles are still evolving.
:::

## Goal

You will debug repeated policy denials by inspecting policy checkpoints, PDP inputs, and node metadata used for the decision.

## When to use this

- Runs fail early with policy deny decisions.
- Candidate sets are filtered down to nothing by policy.

## Prerequisites

- PDP logs and decision artifacts/events
- Access to the principal context (JWT claims) and node type metadata

## Steps

1. Identify the checkpoint that is denying (`run.start`, `node.run.execute`, selection-time filtering).
2. Inspect the PDP decision payload and the inputs:
   - principal claims,
   - node type ref,
   - node type metadata (trust tier, side effects, tags).
3. Verify the policy profile and its defaults (deny-by-default when no profile).

## Verify

- After fixing policy/profile, the same request proceeds past the checkpoint.

## Troubleshooting

- Missing metadata → have PDP fetch from `Node Registry` (preferred) or enrich requests.
- Wrong principal → token exchange minted the wrong audience/claims.
- Overly strict deny rules → start permissive, then tighten with evaluators.

## Cleanup / Rollback

- Revert to last known-good policy profile.

## Next steps

- How-to: [Configure PDP checkpoints](../security/configure-pdp-checkpoints.md)
- Concept: [Policy checkpoints](../../fundamentals/concepts/policy-checkpoints.md)
