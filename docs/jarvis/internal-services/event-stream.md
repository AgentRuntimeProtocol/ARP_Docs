---
title: Event Stream — internal service
sidebar_position: 3
---

`Event Stream` is a JARVIS-only internal service that:
- stores `RunEvent`s durably, and
- serves them back as NDJSON streams.

This is what enables “tail -f” style observability and replay-friendly evidence in a simple HTTP-friendly format.

## Default implementation (v0.3.x)

- Backend: SQLite (file-backed)
- Transport: NDJSON over HTTP

## Where to look

- GitHub: `AgentRuntimeProtocol/JARVIS_EventStream`
- PyPI: `arp-jarvis-eventstream`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-eventstream:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `event-stream`
- Internal URL: `http://event-stream:8093`
