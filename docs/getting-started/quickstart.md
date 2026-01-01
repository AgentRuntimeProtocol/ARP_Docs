---
slug: /quickstart
title: Quickstart Guide
sidebar_position: 1
---

Run a minimal end-to-end ARP stack locally using **JARVIS**, the first-party implementation of ARP Standard v1 (node-centric execution fabric).

:::note Standard vs. implementation

This Quickstart focuses on running the JARVIS stack. For ARP contracts (OpenAPI/JSON Schema), see [ARP Standard](../arp-standard/index.md).

:::

:::tip Prerequisites

- `curl`
- `git` (recommended)
- Docker + Docker Compose
- An OpenAI API key (required for the default JARVIS stack; `Selection Service` + `Composite Executor` are LLM-driven)

Optional:
- Python `>=3.11` if you want to use the Python SDK locally
- For offline tests, if you don't want to make real LLM calls, you can opt into `dev-mock` via `ARP_LLM_PROFILE=dev-mock`

:::

## What you’ll do

- Bring up the version-pinned JARVIS stack locally
- Start one **composite run** via the `Run Gateway`
- Inspect the run timeline via NDJSON events
- Fetch the root `NodeRun` outputs from the `Run Coordinator`

---

## Step 1: Start the pinned stack

The recommended way to run JARVIS locally is the version-pinned stack distribution repo:

```bash
git clone https://github.com/AgentRuntimeProtocol/JARVIS_Release
cd JARVIS_Release
```

Use the env template: 

```bash
cp compose/.env.example compose/.env.local
```

Edit `compose/.env.local`:
- Keep `STACK_VERSION` pinned (see `stack.lock.json`)
- Configure the LLM provider (default is OpenAI):
  - `ARP_LLM_API_KEY`
  - `ARP_LLM_CHAT_MODEL` (example: `gpt-4.1-mini`)

For trying JARVIS out, you should switch to the `dev-insecure` security profile, it disables inter-service JWT validation to make things easier:
- Set `STACK_PROFILE=dev-insecure`

Bring up the stack:

```bash
docker compose --env-file compose/.env.local -f compose/docker-compose.yml pull
docker compose --env-file compose/.env.local -f compose/docker-compose.yml up -d
```

:::tip
This pulls version-pinned component images from GHCR, published by each repo.
:::


Sanity check:

```bash
curl -sS http://127.0.0.1:8081/v1/health
curl -sS http://127.0.0.1:8082/v1/health
```

:::note

- Keycloak is exposed on `http://localhost:8080` (realm: `arp-dev`).
- Run Gateway is exposed on `http://127.0.0.1:8081`.
- Run Coordinator is exposed on `http://127.0.0.1:8082`.

:::

### Recommended: install the meta CLI `arp-jarvis`:

`arp-jarvis` is a meta CLI tool for simplifying interactions with the deployed JARVIS Stack. 

```bash
STACK_VERSION="$(grep '^STACK_VERSION=' compose/.env.local | cut -d= -f2)"
python3 -m pip install "arp-jarvis==${STACK_VERSION}"
arp-jarvis versions
```

---

## Step 2: Start your first composite run

In ARP v1, a run is started by specifying:
- a root node type (what should execute first), and
- an input payload.

For the default “general planner” composite flow, use the built-in NodeType:
- `jarvis.composite.planner.general`

Start a run:

```bash
STACK_VERSION="$(grep '^STACK_VERSION=' compose/.env.local | cut -d= -f2)"

curl -sS -X POST http://127.0.0.1:8081/v1/runs \
  -H 'Content-Type: application/json' \
  -d '{
    "root_node_type_ref": {"node_type_id": "jarvis.composite.planner.general", "version": "'"${STACK_VERSION}"'"},
    "input": {"goal": "Generate a UUID, then return it."}
  }'
```

The response is a `Run` object. Save:
- `run_id`
- `root_node_run_id`

---

## Step 3: Watch the run events (NDJSON)

Run Gateway can stream run events as NDJSON:

```bash
curl -N -sS http://127.0.0.1:8081/v1/runs/<run_id>/events
```

Each line is a JSON `RunEvent`. You should see events for:
- planning/decomposition (composite executor)
- candidate sets (selection)
- node run execution and completion (atomic executor)

---

## Step 4: Fetch the root NodeRun outputs

The run’s “result” is represented by the outputs of the root `NodeRun` (and its descendants).

Fetch the root `NodeRun` from the `Run Coordinator`:

```bash
curl -sS http://127.0.0.1:8082/v1/node-runs/<root_node_run_id>
```

When the root `NodeRun` reaches a terminal state, look at:
- `state`
- `outputs`
- `output_artifacts` (references to Artifact Store, if used)

---

## Next steps

- Learn the contracts: [ARP Standard](../arp-standard/index.md)
- Learn how JARVIS wires the stack: [JARVIS Implementation](../jarvis/index.md)
- Explore integrations (MCP/A2A as capability sources): [Integrations](../integrations/index.md)
