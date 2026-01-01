import type { SidebarItems } from "../sidebar.types";

import { templatesSidebar } from "./templates/sidebar";

export const arpStandardSidebar: SidebarItems = [
  {
    type: "category",
    label: "ARP Standard Spec",
    link: { type: "doc", id: "arp-standard/index" },
    items: [
      {
        type: "category",
        label: "Services",
        link: { type: "doc", id: "arp-standard/components/index" },
        items: [
          "arp-standard/components/run-gateway",
          "arp-standard/components/run-coordinator",
          "arp-standard/components/atomic-executor",
          "arp-standard/components/composite-executor",
          "arp-standard/components/node-registry",
          "arp-standard/components/selection",
          "arp-standard/components/pdp",
        ],
      },
      "arp-standard/data-schemas",
      "arp-standard/conformance",
      {
        type: "category",
        label: "SDKs",
        link: { type: "doc", id: "arp-standard/sdk/index" },
        items: [
          "arp-standard/sdk/python",
        ],
      },
      ...templatesSidebar,
    ],
  },
];
