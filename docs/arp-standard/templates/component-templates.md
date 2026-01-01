---
title: Component Templates
sidebar_position: 2
---

If you want to build your own ARP services, start from the component templates rather than writing a server from scratch.

Each template:
- uses the generated **model** + **server base** packages (`arp-standard-model`, `arp-standard-server`) for typed request/response envelopes,
- optionally uses the generated **client** package (`arp-standard-client`) when the service needs to call other ARP services,
- sets up health/version endpoints and error envelopes consistently,
- leaves implementation logic (storage, orchestration, ranking) for you to fill in.

Templates live under the `AgentRuntimeProtocol` GitHub org, named `ARP_Template_*`.
