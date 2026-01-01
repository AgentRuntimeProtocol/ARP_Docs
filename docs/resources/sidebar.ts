import type { SidebarItems } from "../sidebar.types";

export const resourcesSidebar: SidebarItems = [
  {
    type: "category",
    label: "Extra Resources",
    link: { type: "doc", id: "resources/index" },
    items: [
      "resources/roadmap",
      "resources/faq",
      "resources/glossary",
      "resources/changelog",
      "resources/contributing",
    ],
  },
];
