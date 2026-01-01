import type { SidebarItems } from "../../sidebar.types";

export const runningWorkSidebar: SidebarItems = [
  {
    type: "category",
    label: "Running Work",
    link: { type: "doc", id: "how-to/running-work/index" },
    items: [
      "how-to/running-work/start-a-run",
      "how-to/running-work/invoke-atomic-node-directly",
      "how-to/running-work/execute-composite-end-to-end",
      "how-to/running-work/enforce-candidate-set-bounds",
      "how-to/running-work/apply-runtime-budgets",
      "how-to/running-work/replay-a-run",
      "how-to/running-work/diff-two-runs",
      {
        type: "category",
        label: "Additional (debug)",
        items: ["how-to/running-work/stream-run-events"],
      },
    ],
  },
];
