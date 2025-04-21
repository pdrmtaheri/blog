import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { remarkReadingTime } from "./src/utils/getPostsWithRT";
import { SITE } from "./src/config";
import type { Node } from "unist";
import playformCompress from "@playform/compress";

import tailwindcss from "@tailwindcss/vite";

interface IHeadingNode extends Node {
  type: "heading";
  depth: number;
  children: { value: string }[];
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap(), playformCompress()],
  image: { experimentalLayout: "responsive" },
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
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
  vite: {
    build: { assetsInlineLimit: 65536 },

    optimizeDeps: { exclude: ["@resvg/resvg-js"] },

    plugins: [tailwindcss()],
  },
  experimental: { responsiveImages: true },
  prefetch: { prefetchAll: true, defaultStrategy: "viewport" },
});
