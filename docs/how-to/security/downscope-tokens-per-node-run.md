---
title: Downscope tokens per NodeRun for least privilege
---

:::caution Stub
This How-to is a stub. JARVIS uses token exchange, but full per-node-run downscoping semantics are planned and not yet enforced end-to-end.
:::

## Goal

You will enforce least-privilege delegation by minting downscoped tokens for each `NodeRun`.

## When to use this

- You want write/irreversible nodes to carry tighter permissions.
- You want robust blast-radius limits for prompt injection failures.

## Prerequisites

- An STS that can issue scoped tokens (audience + optional scopes/claims)
- A policy model that maps node metadata to permissions
- A place to store downscoping evidence (token claims, decision records)

## Steps

1. Define a mapping from `NodeType` metadata → required permissions.
2. Before executing a `NodeRun`, exchange/mint a token with:
   - the callee’s `aud`,
   - the minimal permission claims for that node.
3. Validate the token on the callee side and enforce claims in policy.

## Verify

- Tokens differ per node run (scoped claims are visible).
- A token minted for one node cannot be used to execute a more privileged node.

## Troubleshooting

- Too hard to map permissions → start with coarse “read/write/irreversible” tiers.
- Claims not enforced → ensure PDP uses claims in its principal context.
- Token bloat → keep claims minimal and move details to policy metadata.

## Cleanup / Rollback

- Rotate client secrets and revoke issued tokens if compromised.

## Next steps

- How-to: [Configure token exchange](./configure-token-exchange.md)
- How-to: [Evaluate policy adherence](../evaluators/evaluate-policy-adherence.md)
