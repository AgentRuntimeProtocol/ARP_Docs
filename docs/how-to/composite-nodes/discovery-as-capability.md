---
title: Implement “discovery as a capability”
---

:::caution Stub
This How-to is a stub. JARVIS has a `Selection Service` and uses `CandidateSet` artifacts, but the “discovery node” authoring surface (treat candidate-set generation as a reusable `NodeType`) is not yet stabilized.
:::

## Goal

You will implement “discovery as a capability”: a reusable workflow that generates a bounded `CandidateSet` for a subtask and records it as a durable artifact.

## When to use this

- You want a reusable “find viable tools” capability you can call from composites.
- You want candidate-set generation to be auditable and replayable (durable artifacts).

:::note Standard vs. implementation

- Normative contract: [ARP Standard: Selection](../../arp-standard/components/selection.md)
- Reference implementation: [JARVIS Selection Service](../../jarvis/component-implementations/selection-service.md)

:::

## Prerequisites

- A running `Selection` service
- A `Node Registry` with inventory seeded (at least one `NodeType`)
- A decision on where the discovery logic lives:
  - as a composite “discovery node” executed by `Composite Executor`, or
  - as a dedicated “discovery service” (not planned for v0.x).

## Steps

1. Define a “discovery node” input schema (subtask goal + optional context/constraints).
2. Implement discovery logic that calls `Selection` with:
   - subtask spec,
   - the current constraint envelope (depth/branch/budget),
   - the current policy posture (candidate filtering).
3. Emit a durable `CandidateSet` artifact (and/or `candidate_set_generated` event).
4. Return a reference to the candidate set (`candidate_set_id`) to the caller.

## Verify

- The discovery node produces a durable `CandidateSet` artifact that contains:
  - `candidate_set_id`
  - `subtask_id`
  - `candidates[]` (each candidate contains at least a `node_type_ref`)

## Troubleshooting

- Empty candidate set → inventory/policy/constraints filtered everything → validate `Node Registry` seeding and policy profile.
- `5xx` errors mentioning LLM → LLM provider misconfigured → verify `ARP_LLM_API_KEY` + `ARP_LLM_CHAT_MODEL` (default `openai` profile). For offline testing, opt into `dev-mock` with `ARP_LLM_PROFILE=dev-mock` + fixtures.
- Candidate sets too large → enforce strict bounds at `Selection` and fail closed on violations.

## Cleanup / Rollback

- None.

## Next steps

- Concept: [Candidate sets](../../fundamentals/concepts/candidate-sets.md)
- Reference: [ARP Standard: Selection](../../arp-standard/components/selection.md)
- How-to: [Implement the mapper](./implement-mapper.md)
