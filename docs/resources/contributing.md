---
title: Contribution Guide
sidebar_position: 4
---

Guidelines for contributing to ARP documentation and related projects.

## How to contribute

### Documentation changes

- Make edits in `arp/ARP_Docs/docs/` (Markdown + Docusaurus front matter).
- Prefer small, focused PRs (one topic per PR).
- Keep docs aligned with the current MVP implementation; if behavior is WIP, label it explicitly.
- Add/adjust links in the sidebar by placing pages under the existing categories (`core-concepts`, `guides`, `api-reference`, `resources`).

### Reporting issues / requesting changes

When filing an issue, include:

- which component you’re using (Runtime vs Tool Registry vs Model),
- the commands you ran,
- relevant config/env vars (redact secrets),
- and, if available, a `trace.jsonl` excerpt (or the full file if it contains no sensitive data).

## Local development

From `arp/ARP_Docs`:

```bash
npm install
npm run start
```

Then open `http://localhost:3000/public_docs/`.

To build the static site:

```bash
npm run build
```
