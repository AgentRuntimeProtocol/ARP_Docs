---
title: Glossary
sidebar_position: 2
---

Definitions of terms used throughout ARP.

- **Agent**: A workflow that plans and executes actions (tool calls) to satisfy a user request. In the MVP runtime, an “agent run” is a flow made of `plan`, `tool`, and `chat` steps.
- **Runtime**: The execution engine that runs a flow, orchestrates tool calls, and produces a final user-facing response (example implementation: `jarvis-runtime`).
- **Tool**: A callable capability with a stable name, JSON Schema-defined inputs, and a JSON result payload (example: `time_now(tz)`).
- **Tool Registry**: The service that exposes tools for discovery and invocation (example implementation: `jarvis-tool-registry`).
- **Model integration**: The component/adapter that lets Runtime roles call an LLM provider (for example OpenAI in `openai` mode, or deterministic roles in `stub` mode).
- **Control Plane**: A planned management layer for coordinating many runtimes and registries (fleet lifecycle, routing/scheduling, policy, observability).
