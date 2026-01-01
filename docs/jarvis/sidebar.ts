import type { SidebarItems } from "../sidebar.types";

export const jarvisSidebar: SidebarItems = [
  {
    type: "category",
    label: "JARVIS OSS Implementation Stack",
    link: { type: "doc", id: "jarvis/index" },
    items: [
      "jarvis/release",
      "jarvis/authentication",
      {
        type: "category",
        label: "Components",
        link: { type: "doc", id: "jarvis/component-implementations/index" },
        items: [
          "jarvis/component-implementations/run-gateway",
          "jarvis/component-implementations/run-coordinator",
          "jarvis/component-implementations/atomic-executor",
          "jarvis/component-implementations/composite-executor",
          "jarvis/component-implementations/node-registry",
          "jarvis/component-implementations/selection-service",
          "jarvis/component-implementations/pdp",
        ],
      },
      {
        type: "category",
        label: "Non-spec Internal Services",
        items: [
          "jarvis/internal-services/run-store",
          "jarvis/internal-services/artifact-store",
          "jarvis/internal-services/event-stream",
        ],
      },
      "jarvis/llm-and-prompts",
    ],
  },
];
