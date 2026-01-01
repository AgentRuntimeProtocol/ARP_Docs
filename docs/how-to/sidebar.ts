import type { SidebarItems } from "../sidebar.types";

import { atomicNodesSidebar } from "./atomic-nodes/sidebar";
import { compositeNodesSidebar } from "./composite-nodes/sidebar";
import { evaluatorsSidebar } from "./evaluators/sidebar";
import { howToIntegrationsSidebar } from "./integrations/sidebar";
import { localDevSidebar } from "./local-dev/sidebar";
import { nodeRegistrySidebar } from "./node-registry/sidebar";
import { operationsSidebar } from "./operations/sidebar";
import { runningWorkSidebar } from "./running-work/sidebar";
import { securitySidebar } from "./security/sidebar";
import { troubleshootingSidebar } from "./troubleshooting/sidebar";

export const howToSidebar: SidebarItems = [
  {
    type: "category",
    label: "How-to Guides",
    collapsible: true,
    collapsed: true,
    link: { type: "doc", id: "how-to/index" },
    items: [
      ...localDevSidebar,
      ...atomicNodesSidebar,
      ...compositeNodesSidebar,
      ...evaluatorsSidebar,
      ...nodeRegistrySidebar,
      ...runningWorkSidebar,
      ...securitySidebar,
      ...operationsSidebar,
      ...howToIntegrationsSidebar,
      ...troubleshootingSidebar,
    ],
  },
];
