import type { SidebarItems } from "../../sidebar.types";

export const nodeRegistrySidebar: SidebarItems = [
  {
    type: "category",
    label: "Node Registry",
    link: { type: "doc", id: "how-to/node-registry/index" },
    items: [
      "how-to/node-registry/register-node-type",
      "how-to/node-registry/versioning-model",
      "how-to/node-registry/channels",
      "how-to/node-registry/attach-scorecards",
      "how-to/node-registry/promotion-workflow",
      "how-to/node-registry/deprecate-rollback",
      {
        type: "category",
        label: "Additional (debug)",
        items: ["how-to/node-registry/list-node-types"],
      },
    ],
  },
];
