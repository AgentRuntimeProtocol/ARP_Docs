import type { SidebarItems } from "../../sidebar.types";

export const howToIntegrationsSidebar: SidebarItems = [
  {
    type: "category",
    label: "Integrations",
    link: { type: "doc", id: "how-to/integrations/index" },
    items: [
      "how-to/integrations/import-mcp-tools",
      "how-to/integrations/invoke-mcp-tools-through-arp",
      "how-to/integrations/import-a2a-agents",
      "how-to/integrations/wrap-langgraph",
      "how-to/integrations/wrap-google-adk",
      "how-to/integrations/deploy-to-kubernetes",
      "how-to/integrations/connect-siem-pipeline",
    ],
  },
];
