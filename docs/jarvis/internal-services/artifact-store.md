---
title: Artifact Store — internal service
sidebar_position: 2
---

`Artifact Store` is a JARVIS-only internal service that stores binary artifacts and returns stable artifact references.

It is used when outputs are too large or too blob-like to inline into `NodeRun` payloads.

## Default implementation (v0.3.x)

- Backend: filesystem storage with a small SQLite index
- Access pattern: owned by the `Run Coordinator` + executors (upload blobs, store refs)

## Where to look

- GitHub: `AgentRuntimeProtocol/JARVIS_ArtifactStore`
- PyPI: `arp-jarvis-artifactstore`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-artifactstore:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `artifact-store`
- Internal URL: `http://artifact-store:8092`
