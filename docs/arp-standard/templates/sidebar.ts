import type { SidebarItems } from "../../sidebar.types";

export const templatesSidebar: SidebarItems = [
  {
    type: "category",
    label: "Templates",
    link: { type: "doc", id: "arp-standard/templates/index" },
    items: [
      "arp-standard/templates/atomic-node",
      "arp-standard/templates/component-templates",
    ],
  },
];
