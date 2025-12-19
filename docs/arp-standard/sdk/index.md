---
title: Software Development Kits
sidebar_position: 4
---

ARP Standard SDKs are generated clients for the ARP Standard OpenAPI contracts.
Use them when you want typed request/response models and a small wrapper over raw HTTP.

:::note Standard vs. implementation

SDKs are generated from the ARP Standard spec and can be used with **any conformant service** (not just JARVIS).
If you’re following a CLI-first workflow, start with the [Quickstart](../../quickstart.md) and come back to SDKs when you’re building an integration.

:::

## Available SDKs (v1)

- [Python SDK (`arp-standard-py` / `arp_sdk`)](./python.md)

## Source of truth

SDKs are generated from the OpenAPI contracts under `ARP_Standard/spec/v1/openapi/`.

For the Python generator pipeline, see `ARP_Standard/tools/codegen/python/README.md`.

## See also

- [Services](../components/index.md)
- [Data Schemas & Conventions](../data-schemas.md)
