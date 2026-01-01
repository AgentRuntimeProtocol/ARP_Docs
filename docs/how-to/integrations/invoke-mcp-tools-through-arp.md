---
title: Invoke MCP tools through ARP as bounded candidates
---

:::caution Stub
This How-to is a stub. End-to-end MCP invocation is planned as “wrapper node types + selection-time policy”; the full implementation is not yet shipped.
:::

## Goal

You will invoke an imported MCP tool via ARP in a bounded way: `Selection` produces a candidate set and policy filters what is allowed.

## When to use this

- You want MCP tools, but with bounded action space and audit artifacts.
- You want policy to control which tools can be used for which tasks.

## Prerequisites

- MCP tools imported into `Node Registry` as `NodeType`s
- `Selection Service` configured and able to rank/filter
- `PDP` configured for selection-time candidate filtering

## Steps

1. Ensure MCP tools appear as `NodeType`s in `Node Registry`.
2. Call `Selection` with a subtask and get a bounded `CandidateSet`.
3. Bind to one candidate and generate the tool input args.
4. Execute via `Atomic Executor` wrapper node.

## Verify

- Candidate sets include only allowed MCP tools (policy-filtered).
- Tool calls produce durable artifacts and do not leak secrets.

## Troubleshooting

- Candidate set empty → tools filtered by policy or missing inventory → inspect registry + PDP logs.
- Tool invocation fails → debug the wrapper node directly.
- Output is unsafe → treat outputs as untrusted; add evaluators/policy gates.

## Cleanup / Rollback

- Deprecate the MCP tool node types.

## Next steps

- How-to: [Configure PDP checkpoints](../security/configure-pdp-checkpoints.md)
- Troubleshooting: [Candidate set is empty](../troubleshooting/candidate-set-empty.md)

