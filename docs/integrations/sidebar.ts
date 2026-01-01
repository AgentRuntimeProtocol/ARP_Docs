import type { SidebarItems } from "../sidebar.types";

export const integrationsSidebar: SidebarItems = [
  {
    type: "category",
    label: "Integrations",
    link: { type: "doc", id: "integrations/index" },
    items: [
      "integrations/mcp",
      "integrations/agent-to-agent",
      "integrations/agent-protocol",
    ],
  },
];
