---
title: Model API Reference
sidebar_position: 5
---

JARVIS does not expose a standalone “model service” HTTP API. Model/provider configuration is part of **JARVIS Runtime**.

:::caution WIP

Provider support is intentionally minimal today. The only supported modes are `stub` (default) and `openai` (optional).

Once the development on standardizing LLM provider interface and potentially first-party clients is complete, this will be updated with their usage.

:::

## See also

- [Model Integration](../jarvis/model-integration.md)
- [Runtime API Reference](./runtime.md)
