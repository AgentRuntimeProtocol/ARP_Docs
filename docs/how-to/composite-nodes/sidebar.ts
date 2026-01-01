import type { SidebarItems } from "../../sidebar.types";

export const compositeNodesSidebar: SidebarItems = [
  {
    type: "category",
    label: "Author Composite Nodes",
    link: { type: "doc", id: "how-to/composite-nodes/index" },
    items: [
      "how-to/composite-nodes/create-composite-node-skeleton",
      "how-to/composite-nodes/implement-decomposer",
      "how-to/composite-nodes/implement-mapper",
      "how-to/composite-nodes/implement-recovery-actions",
      "how-to/composite-nodes/discovery-as-capability",
      "how-to/composite-nodes/add-budgets",
    ],
  },
];
