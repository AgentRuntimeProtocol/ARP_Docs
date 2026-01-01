---
title: Glossary
sidebar_position: 2
---

Definitions of terms used throughout ARP.

- **ARP Standard (Spec)**: The normative, versioned HTTP+JSON contracts (OpenAPI + JSON Schemas + conformance rules) defined in the `AgentRuntimeProtocol/ARP_Standard` repository.
- **JARVIS**: The first-party open-source reference implementation of ARP Standard v1 (node-centric execution fabric).
- **`Run`**: One top-level execution request, identified by `run_id`.
- **`NodeType`**: A catalog entry describing something executable (atomic or composite), identified by (`node_type_id`, `version`).
- **`NodeTypeRef`**: A reference to a `NodeType`: (`node_type_id`, `version`).
- **`NodeRun`**: One execution instance of a `NodeType`, identified by `node_run_id`.
- **Atomic**: Leaf execution (“do one thing”), executed by an `Atomic Executor`.
- **Composite**: Orchestration/planning execution (“turn a goal into more `NodeRun`s”), executed by a `Composite Executor`.
- **`CandidateSet`**: A bounded, ranked list of `NodeTypeRef`s that are plausible ways to fulfill a subtask.
- **Binding decision**: The choice of one `NodeTypeRef` from a `CandidateSet` (plus optional rationale).
- **Constraints**: Structural and selection bounds that limit action space (for example max depth, max candidates per step).
- **Policy checkpoint**: A well-defined decision point that can be allowed/denied (for example `run.start`, `node.run.execute`).
- **Extensions**: A JSON object (`extensions`) available on many ARP payloads for implementation-specific fields.
- **Event stream (NDJSON)**: A durable log of `RunEvent`s served as NDJSON.
- **Artifact store**: A blob store that returns stable artifact references (`ArtifactRef`) for large outputs.
