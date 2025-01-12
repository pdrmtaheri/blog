import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { remarkReadingTime } from "./src/utils/getPostsWithRT";

import { SITE } from "./src/config";

import type { Node } from "unist";

interface IHeadingNode extends Node {
  type: "heading";
  depth: number;
  children: { value: string }[];
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    compress(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime,
      [
        remarkCollapse,
        {
          test: (node: Node): boolean =>
            node.type === "heading" &&
            (node as IHeadingNode).depth > 1 &&
            (node as IHeadingNode).depth < 4,
          summary: (node: IHeadingNode): string => node.children[0].value,
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
