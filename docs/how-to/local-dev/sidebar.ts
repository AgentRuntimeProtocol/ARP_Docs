import type { SidebarItems } from "../../sidebar.types";

export const localDevSidebar: SidebarItems = [
  {
    type: "category",
    label: "Local Dev",
    link: { type: "doc", id: "how-to/local-dev/index" },
    items: [
      "how-to/local-dev/quickstart-run-jarvis-stack",
      "how-to/local-dev/run-local-dev-mode",
      "how-to/local-dev/run-local-keycloak-dev-auth",
      "how-to/local-dev/reset-local-state",
      "how-to/local-dev/pin-upgrade-release-bundle",
    ],
  },
];
