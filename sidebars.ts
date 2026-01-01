import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import { arpStandardSidebar } from "./docs/arp-standard/sidebar";
import { gettingStartedSidebar } from "./docs/getting-started/sidebar";
import { fundamentalsSidebar } from "./docs/fundamentals/sidebar";
import { howToSidebar } from "./docs/how-to/sidebar";
import { integrationsSidebar } from "./docs/integrations/sidebar";
import { jarvisSidebar } from "./docs/jarvis/sidebar";
import { librariesSidebar } from "./docs/libraries/sidebar";
import { resourcesSidebar } from "./docs/resources/sidebar";

const sidebars: SidebarsConfig = {
  defaultSidebar: [
    ...fundamentalsSidebar,
    ...gettingStartedSidebar,
    ...arpStandardSidebar,
    ...jarvisSidebar,
    ...howToSidebar,
    ...librariesSidebar,
    ...integrationsSidebar,
    ...resourcesSidebar,
  ],
};

export default sidebars;
