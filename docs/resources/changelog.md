---
title: Changelog / Release Notes
sidebar_position: 3
---

Version history and release notes for ARP docs and public APIs.

## Unreleased

- Filled the MVP docs placeholders and aligned content with the proposed structure (Quickstart → Core Concepts → Guides → API Reference).
- Documented the current Tool Registry HTTP API (`/v1/tools`, `/v1/tools/{name}`, `/v1/tools/{name}:invoke`) and normalized error/result formats.
- Documented the Runtime CLI entry points and trace format (`trace.jsonl`).

## Releases

### 0.1.0a5 (MVP pre-release)

- Runtime: `jarvis-runtime` CLI (`demo`, `run`, `replay`) and Tool Registry integration (`http` / `inproc`).
- Tool Registry: `jarvis-tool-registry` HTTP service with the `/v1` endpoints.
- Shared contract layer: `jarvis-model` schemas with `schema_version: "0.1.0"`.
