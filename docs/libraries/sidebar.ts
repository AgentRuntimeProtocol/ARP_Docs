import type { SidebarItems } from "../sidebar.types";

export const librariesSidebar: SidebarItems = [
  {
    type: "category",
    label: "Helper Libraries",
    link: { type: "doc", id: "libraries/index" },
    items: [
      "libraries/arp-auth",
      "libraries/arp-llm",
      "libraries/arp-policy",
    ],
  },
];
