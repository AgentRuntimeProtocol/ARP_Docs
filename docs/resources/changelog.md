---
title: Changelog / Release Notes
sidebar_position: 3
---

Where to find authoritative change history for the ARP ecosystem.

## ARP Standard (spec changes)

- Spec v1 changelog: `ARP_Standard/spec/v1/CHANGELOG.md`
- Python SDK (`arp-standard-py`) release notes live alongside the SDK in `ARP_Standard/sdks/python/`.

## JARVIS (implementation changes)

JARVIS components expose their running versions via:

- `GET /v1/version` (`service_name`, `service_version`)

If you install the pinned JARVIS stack distribution (`arp-jarvis`), you can also print installed versions locally:

```bash
arp-jarvis versions
```

Each component repo may also maintain its own release notes/CHANGELOG.
