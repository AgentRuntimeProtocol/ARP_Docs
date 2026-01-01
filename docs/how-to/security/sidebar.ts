import type { SidebarItems } from "../../sidebar.types";

export const securitySidebar: SidebarItems = [
  {
    type: "category",
    label: "Policy and Security",
    link: { type: "doc", id: "how-to/security/index" },
    items: [
      "how-to/security/enable-jwt-auth",
      "how-to/security/configure-token-exchange",
      "how-to/security/configure-pdp-checkpoints",
      "how-to/security/downscope-tokens-per-node-run",
      "how-to/security/remote-only-external-capabilities",
      "how-to/security/secrets-integration-patterns",
      {
        type: "category",
        label: "Additional (debug)",
        items: ["how-to/security/decide-policy"],
      },
    ],
  },
];
