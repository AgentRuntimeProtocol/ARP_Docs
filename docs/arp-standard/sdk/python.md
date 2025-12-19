---
title: Python SDK
sidebar_position: 1
---

The ARP Standard Python SDK is a generated client for the v1 OpenAPI contracts.

:::note Standard vs. implementation

This SDK is generated from the **ARP Standard** spec and can be used with any conformant Tool Registry / Runtime / Daemon.
It is not specific to JARVIS.

:::

## Package

- PyPI distribution: `arp-standard-py`
- Import package: `arp_sdk`
- Python requirement: `>=3.10`
- Package README: `ARP_Standard/sdks/python/README.md`

## Install

```bash
python3 -m pip install arp-standard-py
```

## Clients

- `arp_sdk.tool_registry.ToolRegistryClient` (Tool Registry API)
- `arp_sdk.runtime.RuntimeClient` (Runtime API)
- `arp_sdk.daemon.DaemonClient` (Daemon API)

Each client takes a `base_url` that points at the corresponding service endpoint.

## Basic usage (Daemon example)

This example checks health and creates a runtime instance (if your daemon supports managed instances):

```python
from arp_sdk.daemon import DaemonClient
from arp_sdk.models import InstanceCreateRequest

daemon = DaemonClient(base_url="http://<daemon-host>:<port>")

health = daemon.health()
print(health.to_dict())

created = daemon.create_instances(InstanceCreateRequest(runtime_profile="default", count=1))
print(created.to_dict())
```

Submitting a run via the Daemon:

```python
import time

from arp_sdk.daemon import DaemonClient
from arp_sdk.models import RunRequest

daemon = DaemonClient(base_url="http://<daemon-host>:<port>")
status = daemon.submit_run(RunRequest.from_dict({"input": {"goal": "hello"}}))

# Poll until the run reaches a terminal state, then fetch the result.
while status.state.value not in {"succeeded", "failed", "canceled"}:
    time.sleep(0.2)
    status = daemon.get_run_status(status.run_id)

result = daemon.get_run_result(status.run_id)
print(result.to_dict())
```

## Errors

The facade clients raise `arp_sdk.errors.ArpApiError` when the API returns an `ErrorEnvelope`.

## Generate locally

If you want to see the code gen pipeline run locally, run these from the `ARP_Standard` repository root:

```bash
python3 -m pip install -r tools/codegen/python/requirements.txt
python3 tools/codegen/python/generate.py --version v1
```

See also: `ARP_Standard/tools/codegen/python/README.md`.
