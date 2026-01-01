import type { SidebarItems } from "../sidebar.types";

export const gettingStartedSidebar: SidebarItems = [
  {
    type: "category",
    label: "Getting Started",
    collapsible: false,
    link: { type: "doc", id: "getting-started/index" },
    items: [
      { type: "doc", id: "getting-started/quickstart", label: "Quickstart on JARVIS Stack" },
      { type: "doc", id: "getting-started/tutorials/thin-mode", label: "Tutorial: wrap an existing service" },
    ],
  },
];
