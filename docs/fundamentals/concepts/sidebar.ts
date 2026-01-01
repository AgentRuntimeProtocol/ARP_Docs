import type { SidebarItems } from "../../sidebar.types";

export const conceptsSidebar: SidebarItems = [
  {
    type: "category",
    label: "ARP Concepts",
    link: { type: "doc", id: "fundamentals/concepts/index" },
    items: [
      "fundamentals/concepts/capabilities-and-nodes",
      "fundamentals/concepts/candidate-sets",
      "fundamentals/concepts/policy-checkpoints",
      "fundamentals/concepts/artifacts-and-replay",
    ],
  },
];
