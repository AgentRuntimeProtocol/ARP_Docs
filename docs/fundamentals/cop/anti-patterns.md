---
title: Anti-patterns
sidebar_position: 2
---

These anti-patterns show up repeatedly in early-stage agent systems. COP and ARP exist largely to avoid them.

## “Mega-planner-agent with every tool”

Putting every possible tool in the model’s action space:
- makes selection unreliable,
- makes evaluation hard,
- increases blast radius and security risk.

ARP’s answer: **bounded candidate sets** per step.

## “Prompt-as-policy”

Relying on a system prompt to enforce safety or governance is fragile.

ARP’s answer: **explicit policy checkpoints** enforced by the `Run Coordinator` (and optionally delegated to a `PDP`).

## “No durable evidence”

If you can’t answer “what happened and why?” you can’t operate the system.

ARP’s answer: durable **`RunEvent`s** (NDJSON) and **`ArtifactRef`s** (refs + blobs).

## “One model does everything”

When one LLM is responsible for planning, tool choice, and argument generation, failures become opaque and hard to debug.

JARVIS splits this into separate steps/services:
- planning (`Composite Executor`),
- candidate generation (`Selection`),
- binding and argument generation (`Composite Executor`).
