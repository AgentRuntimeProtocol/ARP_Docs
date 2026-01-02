---
title: Contribution Guide For This Site
sidebar_position: 4
---

Guidelines for contributing to ARP documentation and related projects.

## How to contribute

### Documentation changes

- Make edits in `docs/` (Markdown + Docusaurus front matter).
- Prefer small, focused PRs (one topic per PR).
- Keep docs aligned with the current state of the **ARP Standard** and the **JARVIS implementation**; if behavior is WIP, label it explicitly.
- Add new pages under the appropriate section (high level):
  - `docs/fundamentals/concepts/`
  - `docs/fundamentals/cop/`
  - `docs/arp-standard/` (spec navigation + summaries)
  - `docs/arp-standard/templates/` (implementation scaffolds; non-normative)
  - `docs/jarvis/` (reference implementation docs)
  - `docs/getting-started/tutorials/` and `docs/how-to/`
  - `docs/libraries/`, `docs/integrations/`
  - `docs/resources/`

The sidebar is curated in `sidebars.ts`.

### Reporting issues / requesting changes

When filing an issue, include:

- which component you’re using (Run Gateway vs Run Coordinator vs executors),
- the commands you ran,
- relevant config/env vars (redact secrets),
- and, if available, NDJSON event excerpts (Run Gateway / Event Stream).

## Local development

From the repo root:

```bash
npm install
npm run start
```

Then open `http://localhost:3000/`.

To build the static site:

```bash
npm run build
```

Typecheck:

```bash
npm run typecheck
```
