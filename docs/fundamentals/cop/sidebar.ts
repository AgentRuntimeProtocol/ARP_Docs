import type { SidebarItems } from "../../sidebar.types";

export const copSidebar: SidebarItems = [
  {
    type: "category",
    label: "Capability Oriented Programming",
    link: { type: "doc", id: "fundamentals/cop/index" },
    items: [
      "fundamentals/cop/manifest",
      "fundamentals/cop/lifecycle",
      "fundamentals/cop/anti-patterns",
    ],
  },
];
