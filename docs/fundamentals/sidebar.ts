import type { SidebarItems } from "../sidebar.types";

import { conceptsSidebar } from "./concepts/sidebar";
import { copSidebar } from "./cop/sidebar";

export const fundamentalsSidebar: SidebarItems = [
  {
    type: "category",
    label: "Fundamentals",
    collapsible: true,
    collapsed: true,
    link: { type: "doc", id: "fundamentals/index" },
    items: [...copSidebar, ...conceptsSidebar],
  },
];
