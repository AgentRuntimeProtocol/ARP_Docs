import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Docusaurus sidebars accept either:
 * - an array of sidebar items, or
 * - a "shorthand" object.
 *
 * We only use the array form for this site, so we extract that type here to keep
 * the section modules nicely typed (and iterable).
 */
export type SidebarItems = Extract<SidebarsConfig[string], unknown[]>;

