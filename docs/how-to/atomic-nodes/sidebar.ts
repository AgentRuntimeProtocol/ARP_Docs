import type { SidebarItems } from "../../sidebar.types";

export const atomicNodesSidebar: SidebarItems = [
  {
    type: "category",
    label: "Author Atomic Nodes",
    link: { type: "doc", id: "how-to/atomic-nodes/index" },
    items: [
      "how-to/atomic-nodes/build-atomic-node-python",
      "how-to/atomic-nodes/wrap-http-api-as-atomic-node",
      "how-to/atomic-nodes/wrap-llm-call-as-atomic-node",
      "how-to/atomic-nodes/streaming-atomic-outputs",
      "how-to/atomic-nodes/declare-side-effects-and-idempotency",
      "how-to/atomic-nodes/validate-io-and-error-model",
    ],
  },
];
