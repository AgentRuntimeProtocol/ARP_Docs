---
title: Artifacts and Replay
sidebar_position: 4
---

To make agentic systems reliable, you need evidence:
- what happened,
- why it happened,
- and what inputs led to that outcome.

ARP and JARVIS treat these as first-class artifacts.

## Events (NDJSON)

Execution produces **`RunEvent`s** (and sometimes `NodeRun`-scoped events). In the JARVIS stack:
- events are appended durably to an **`Event Stream`** store,
- and served back as **NDJSON** streams for efficient tailing and tooling.

NDJSON is used because it works well for:
- streaming over plain HTTP,
- incremental parsing,
- log-like storage and replay.

## Artifacts (blobs + references)

Some outputs are too large or too structured to inline into `Run`/`NodeRun` payloads.

JARVIS uses an **`Artifact Store`** to:
- store blobs (bytes),
- return stable references (`ArtifactRef`) that can be recorded in `NodeRun` outputs or `RunEvent`s.

## Replay

Replay is the ability to re-run (or “simulate”) execution in a controlled way:
- deterministically re-bind to previously selected candidates,
- compare outputs across runs,
- validate that changes to planners/selectors do not regress capability.

Even before full “replay mode” exists, durable events + artifacts enable:
- debugging,
- incident review,
- evaluation pipelines.

## Where to go next

- How-to: [Stream run events (NDJSON)](../../how-to/running-work/stream-run-events.md)
- Reference: [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md)
- JARVIS internal services: [Event Stream](../../jarvis/internal-services/event-stream.md), [Artifact Store](../../jarvis/internal-services/artifact-store.md)
- JARVIS behavior: [Run Gateway](../../jarvis/component-implementations/run-gateway.md)
