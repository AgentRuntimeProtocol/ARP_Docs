---
title: Python SDK
sidebar_position: 1
---

The ARP Standard Python packages are generated from the v1 OpenAPI contracts.

They are intentionally split into three packages:
- **Models**: `arp-standard-model`
- **Server base** (FastAPI base servers): `arp-standard-server`
- **Clients** (typed HTTP clients): `arp-standard-client`

:::note Standard vs. implementation

These packages are generated from the **ARP Standard** spec and can be used with any conformant ARP Standard v1 service.
They are not specific to JARVIS.

:::

## Packages

- Model PyPI distribution: `arp-standard-model` (imports: `arp_standard_model`)
- Server base PyPI distribution: `arp-standard-server` (imports: `arp_standard_server`)
- Client PyPI distribution: `arp-standard-client` (imports: `arp_standard_client`)
- Python requirement: `>=3.11`
- Package READMEs:
  - `ARP_Standard/clients/python/README.md`
  - `ARP_Standard/models/python/README.md`
  - `ARP_Standard/kits/python/README.md` (server base / kit)

## Install

Client + models (calling ARP services):
```bash
python3 -m pip install arp-standard-client
```

Server base + models (implementing ARP services):
```bash
python3 -m pip install arp-standard-server
```

## Clients

One facade client is generated per ARP Standard v1 service:

- `arp_standard_client.run_gateway.RunGatewayClient`
- `arp_standard_client.run_coordinator.RunCoordinatorClient`
- `arp_standard_client.atomic_executor.AtomicExecutorClient`
- `arp_standard_client.composite_executor.CompositeExecutorClient`
- `arp_standard_client.node_registry.NodeRegistryClient`
- `arp_standard_client.selection.SelectionClient`
- `arp_standard_client.pdp.PdpClient`

Each client takes a `base_url` that points at the corresponding service endpoint.

## Basic usage (Run Gateway example)

This example checks health and starts a run:

```python
from arp_standard_client.run_gateway import RunGatewayClient
from arp_standard_model import (
    NodeTypeRef,
    RunGatewayHealthRequest,
    RunGatewayStartRunRequest,
    RunStartRequest,
)

# If you started the pinned stack via `JARVIS_Release` Docker Compose, Run Gateway is exposed on `8081`.
gateway = RunGatewayClient(base_url="http://127.0.0.1:8081")

health = gateway.health(RunGatewayHealthRequest())
print(health.model_dump(exclude_none=True))

run = gateway.start_run(
    RunGatewayStartRunRequest(
        body=RunStartRequest(
            root_node_type_ref=NodeTypeRef(node_type_id="jarvis.composite.planner.general", version="0.3.3"),
            input={"goal": "Generate a UUID, then return it."},
        )
    )
)
print(run.model_dump(exclude_none=True))
```

## Errors

The facade clients raise `arp_standard_client.errors.ArpApiError` when the API returns an `ErrorEnvelope`.

## Server base (FastAPI)

If you’re implementing an ARP Standard service, use `arp-standard-server` so your server:
- stays aligned with the OpenAPI contract (request/response envelopes),
- returns ARP `ErrorEnvelope`s consistently (instead of framework-specific payloads),
- exposes required endpoints (health/version) “conformant-by-construction”.

Each ARP service has a matching base class under `arp_standard_server.<service>`.

## Generate locally

If you want to see the code gen pipeline run locally, run these from the `ARP_Standard` repository root:

```bash
python3 -m pip install -r tools/codegen/python/model/requirements.txt
python3 -m pip install -r tools/codegen/python/client/requirements.txt
python3 -m pip install -r tools/codegen/python/server/requirements.txt
python3 tools/codegen/python/model/generate.py
python3 tools/codegen/python/client/generate.py
python3 tools/codegen/python/server/generate.py
```

See also: `ARP_Standard/tools/codegen/python/README.md`.
