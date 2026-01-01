---
title: Software Development Kits
sidebar_position: 4
---

ARP Standard SDKs are the language-specific packages generated from the ARP Standard v1 contracts.

In practice, the “SDK surface” is split into three parts:

- **Model package**: typed request/response models (shared across clients and servers)
- **Client package**: typed HTTP clients for calling ARP Standard services
- **Server base package**: base server classes (FastAPI routing + request parsing) for implementing ARP Standard services

:::note Standard vs. implementation

SDKs are generated from the ARP Standard spec and can be used with **any conformant service** (not just JARVIS).
If you’re following a CLI-first workflow, start with the [Quickstart](../../getting-started/quickstart.md) and come back to SDKs when you’re building an integration.

:::

## Available SDKs (v1)

- [Python packages (`arp-standard-model`, `arp-standard-server`, `arp-standard-client`)](./python.md)

## Source of truth

SDKs are generated from the OpenAPI contracts in the `ARP_Standard` repo under `spec/v1/openapi/`.

For the Python generator pipeline, see `ARP_Standard/tools/codegen/python/README.md`.

## See also

- [Services](../components/index.md)
- [Data Schemas & Conventions](../data-schemas.md)
