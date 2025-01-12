import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import { SITE } from "./src/config";
import type { Node } from "unist";

interface IHeadingNode extends Node {
  type: "heading";
  depth: number;
  children: Array<{ value: string }>;
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mdx(),
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
      include: ["react", "react-dom"]
    },
  },
});
