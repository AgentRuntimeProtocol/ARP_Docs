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
- Python `>=3.11` + `pip`
- An OpenAI API key (required for the default JARVIS stack; `Selection Service` + `Composite Executor` are LLM-driven)

Optional:
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

Install the meta CLI:

```bash
python3 -m pip install -e .
arp-jarvis versions
```

Bring up the stack and verify wiring:

```bash
arp-jarvis stack pull
arp-jarvis stack up -d
arp-jarvis doctor
```

:::note Docker Compose VS. CLI
<details>
These cli commands `stack pull` and `stack up -d` seem similar to docker CLI commands, and that's no coincidence. Underneath, these commands are just pulling and composing the docker images of JARVIS components from GitHub Container Registry. They are a thin wrapper to make things easier, using default `docker-compose` and `.env.local` files. 

To see the exact underlying `docker compose` commands, add `--print-command`:

```bash
arp-jarvis stack pull --print-command
arp-jarvis stack up -d --print-command
```
</details>
:::


If you're using the default security stance `dev-secure-keycloak` in the `.env.local`, you need to log in once:

```bash
# username: dev
# passcode: dev
arp-jarvis auth login
```

:::warning Username and password
These credentials are for dev environment ONLY.
<details>
This is an OAuth browser flow (see IETF [Documentation](https://datatracker.ietf.org/doc/html/rfc8628).) The CLI never asks for your password directly. For the default local realm, a dev user is pre-seeded. The credentials above are only for the Keycloak login page during the browser step, which then authenticates the CLI.

There are two main reasons why it is setup this way:

First, OAuth browser/device flow for user authentication is [preferred](https://oauth.net/2/grant-types/password/#:~:text=The%20Password%20grant%20type%20is,be%20used%20at%20all%20anymore.) over directly using resource owner passwords in STS. In fact, the latest OAuth 2.1 removed password grant flow entirely.

Second, this is showcasing a realistic flow of how users may authenticate and authorize themselves with the deployed ARP system.
</details>
:::

You can discover what NodeTypes are available:

```bash
arp-jarvis nodes list
```

:::note Default Endpoints

- Keycloak is exposed on `http://localhost:8080` (realm: `arp-dev`).
- Run Gateway is exposed on `http://127.0.0.1:8081`.
- Run Coordinator is exposed on `http://127.0.0.1:8082`.

:::

---

## Step 2: Start your first composite run

In ARP v1, a run is started by specifying:
- a root node type (what should execute first), and
- an input payload.

For the default “general planner” composite flow, use the built-in NodeType:
- `jarvis.composite.planner.general`

Start a run:

```bash
RUN_ID="$(arp-jarvis --json runs start --goal "Generate a UUID, then return it." | \
  python3 -c 'import json,sys; print(json.load(sys.stdin)["run"]["run_id"])')"

echo "run_id: ${RUN_ID}"
```

The CLI output includes the `run_id` and copy/paste next steps.

---

## Step 3: Watch the run events (NDJSON)

Run Gateway can stream run events as NDJSON. The CLI handles quoted/escaped edge cases automatically:

```bash
arp-jarvis runs events "${RUN_ID}"
```

Each line is a JSON `RunEvent`. You should see events for:
- planning/decomposition (composite executor)
- candidate sets (selection)
- node run execution and completion (atomic executor)

---

## Step 4: Fetch the root NodeRun outputs

The run’s “result” is represented by the outputs of the root `NodeRun` (and its descendants).

Fetch the root `NodeRun` via the CLI:

```bash
arp-jarvis runs inspect "${RUN_ID}" --include-node-runs
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
