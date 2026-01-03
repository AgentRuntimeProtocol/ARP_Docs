---
title: Run Gateway
sidebar_position: 10
---

JARVIS Run Gateway is the client-facing entrypoint for starting and querying runs. It is intentionally **stateless** and forwards run lifecycle calls to the `Run Coordinator`.

:::note Spec vs implementation

For the normative API contract, see [ARP Standard: Run Gateway](../../arp-standard/components/run-gateway.md).

:::

## Reference implementation

- GitHub: `AgentRuntimeProtocol/JARVIS_RunGateway`
- PyPI: `arp-jarvis-rungateway`
- GHCR: `ghcr.io/agentruntimeprotocol/arp-jarvis-rungateway:0.3.3`

## Recommended deployment (Docker Compose)

In the recommended `JARVIS_Release` Docker Compose stack:
- Compose service: `run-gateway`
- Internal URL: `http://run-gateway:8080`
- Exposed host URL: `http://127.0.0.1:8081`

## Running outside Docker (advanced)

Use the single meta CLI `arp-jarvis` (preferred over component CLIs):

```bash
STACK_VERSION="0.3.3" # match `JARVIS_Release/stack.lock.json`
CLI_VERSION="0.3.4"   # meta CLI release
python3 -m pip install "arp-jarvis==${CLI_VERSION}"
arp-jarvis run-gateway -- --host 127.0.0.1 --port 8081
```

## Behavior highlights

- Requires a configured `Run Coordinator` URL at startup.
- Validates inbound JWTs (unless in dev-insecure mode).
- Exchanges inbound tokens for coordinator-scoped tokens before forwarding (STS/RFC 8693).
- Proxies NDJSON event streams as opaque bytes (no rewrite).
