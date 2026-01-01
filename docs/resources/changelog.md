---
title: Changelog / Release Notes
sidebar_position: 3
---

Where to find authoritative change history for the ARP ecosystem.

## ARP Standard (spec changes)

- Spec v1 changelog: `spec/v1/CHANGELOG.md` in `AgentRuntimeProtocol/ARP_Standard`
- Python package release notes live alongside the packages in:
  - `models/python/`
  - `clients/python/`
  - `kits/python/`

## JARVIS (implementation changes)

JARVIS components expose their running versions via:

- `GET /v1/version` (`service_name`, `service_version`)

If you install the pinned JARVIS stack distribution (`arp-jarvis`), you can also print installed versions locally:

```bash
arp-jarvis versions
```

Each component repo may also maintain its own release notes/CHANGELOG.
