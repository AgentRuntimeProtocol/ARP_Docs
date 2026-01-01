import type { SidebarItems } from "../../sidebar.types";

export const evaluatorsSidebar: SidebarItems = [
  {
    type: "category",
    label: "Evaluators and Quality Gates",
    link: { type: "doc", id: "how-to/evaluators/index" },
    items: [
      "how-to/evaluators/build-deterministic-evaluator",
      "how-to/evaluators/build-rubric-evaluator",
      "how-to/evaluators/run-multi-trial-evaluation",
      "how-to/evaluators/evaluate-policy-adherence",
      "how-to/evaluators/turn-eval-into-scorecard",
      "how-to/evaluators/define-promotion-thresholds",
    ],
  },
];
