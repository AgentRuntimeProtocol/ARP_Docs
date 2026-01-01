import type { SidebarItems } from "../../sidebar.types";

export const operationsSidebar: SidebarItems = [
  {
    type: "category",
    label: "Observability and Operations",
    link: { type: "doc", id: "how-to/operations/index" },
    items: [
      "how-to/operations/enable-otel-tracing",
      "how-to/operations/configure-artifact-storage",
      "how-to/operations/debug-with-artifacts",
      "how-to/operations/production-hardening-checklist",
      "how-to/operations/scaling-guidance",
      "how-to/operations/incident-response-playbook",
    ],
  },
];
