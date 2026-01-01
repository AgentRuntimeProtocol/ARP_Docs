import type { SidebarItems } from "../../sidebar.types";

export const troubleshootingSidebar: SidebarItems = [
  {
    type: "category",
    label: "Troubleshooting",
    link: { type: "doc", id: "how-to/troubleshooting/index" },
    items: [
      "how-to/troubleshooting/auth-401-403-everywhere",
      "how-to/troubleshooting/policy-denies-tool-use",
      "how-to/troubleshooting/candidate-set-empty",
      "how-to/troubleshooting/registry-mismatch-version-not-found",
      "how-to/troubleshooting/composite-loops-or-stalls",
      "how-to/troubleshooting/evaluation-flaky",
      "how-to/troubleshooting/artifacts-missing",
    ],
  },
];
