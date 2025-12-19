---
title: Glossary
sidebar_position: 2
---

Definitions of terms used throughout ARP.

- **ARP Standard (Spec)**: The normative, versioned HTTP+JSON contracts (OpenAPI + JSON Schemas + conformance rules) defined in the `ARP_Standard` repository.
- **JARVIS**: The first-party open-source implementation of ARP (Tool Registry + Runtime + Daemon + optional Control Plane).
- **Tool**: A callable capability exposed via Tool Registry. Tools have stable identifiers (`tool_id` and `name`) and JSON Schema-defined inputs (`input_schema`).
- **Tool Registry**: The ARP service responsible for tool discovery and invocation (JARVIS implementation: `arp-jarvis-tool-registry`).
- **Run**: One execution request handled by a Runtime or routed by a Daemon, identified by `run_id`.
- **Runtime**: The ARP service that executes runs (`POST /v1/runs` → `RunStatus`, `RunResult`) (JARVIS implementation: `arp-jarvis-runtime`).
- **Daemon**: The ARP service that manages runtime instances and routes run requests (JARVIS implementation: `arp-jarvis-daemon`).
- **Runtime profile**: A safe-listed runtime configuration used by a daemon to create managed instances (`/v1/admin/runtime-profiles/{runtime_profile}`).
- **Instance**: A runtime endpoint tracked by a daemon (`RuntimeInstance`). Instances can be managed (spawned) or external (registered).
- **Extensions**: A JSON object (`extensions`) available on many ARP payloads for vendor/implementation-specific fields.
- **Trace**: Optional run execution record surfaced via the daemon `GET /v1/runs/{run_id}/trace` (JARVIS derives trace events from the runtime’s `trace.jsonl`).
