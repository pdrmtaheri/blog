# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog (pedram.blog) built with Astro 7. Dark/light themed editorial design with Newsreader + JetBrains Mono typography. Deployed to Cloudflare Pages.

## Commands

- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview production build
- `pnpm astro` — run Astro CLI (e.g. `pnpm astro add`, `pnpm astro check`)

No lint or test commands configured.

## Architecture

- **Framework**: Astro 7 (static output, ESM, Node >= 22.12.0)
- **Package manager**: pnpm
- **TypeScript**: strict mode (`astro/tsconfigs/strict`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, CSS custom properties for dark/light theming
- **Routing**: file-based under `src/pages/`
- **Fonts**: Astro 7 built-in Fonts API (self-hosted Newsreader + JetBrains Mono)
- **Navigation**: Astro ClientRouter for client-side transitions with view transition animations
- **Deploy**: Cloudflare Pages (auto-deploy on push)

### Key directories

- `src/pages/` — file-based routes (index, about, articles/[...slug], RSS, robots.txt, OG images)
- `src/layouts/` — `Layout.astro` — HTML shell with SEO meta tags, OG/Twitter cards, scroll-responsive header padding script
- `src/components/` — `Header.astro` (nav with activeNav/compact/progressBar props), `Footer.astro`
- `src/content/articles/` — markdown blog posts (content collection with zod schema)
- `src/content/about.md` — about page content
- `src/styles/global.css` — Tailwind config, theme variables (light/dark), prose styles for markdown
- `src/utils/` — `articles.ts` (shared getCollection helpers), `og-image.ts` (satori OG renderer with cached font)
- `src/config.ts` — centralized site constants (title, description, author, brand colors)
- `src/assets/images/` — blog post images (optimized by Sharp at build time)
- `public/` — favicons, web manifest, `_headers` (Cloudflare security headers)

### Content collections

Articles use `src/content.config.ts` with a glob loader. Schema: `title`, `date`, `tags` (string[]), `description`. Add new articles as `.md` files in `src/content/articles/`.

Markdown renders through Sätteri, the Rust pipeline that became Astro 7's default — not remark/rehype. GFM, smart punctuation, heading IDs, container directives, math, and wikilinks are built in and configured via the `features` option. Reach for `@astrojs/markdown-remark` only if a remark/rehype plugin is genuinely needed.

### Theming

Dark/light mode follows system preference via `@media (prefers-color-scheme: dark)` in `global.css`. CSS custom properties define color tokens per mode. Tailwind `@custom-variant` also supports a `.dark` class override. No manual theme toggle or localStorage persistence.

### Config

- `astro.config.mjs` — site URL, Tailwind vite plugin, sitemap integration, @playform/compress, Astro Fonts API config
- `tsconfig.json` — extends `astro/tsconfigs/strict`
- `public/_headers` — Cloudflare security headers (HSTS, CSP, X-Frame-Options, etc.)
- `pnpm-workspace.yaml` — `allowBuilds` allowlist for postinstall scripts. Load-bearing: pnpm 11 gates postinstall scripts and exits 1 on an unlisted one, so removing or emptying this file fails the Cloudflare install before Astro ever runs. Add an entry when a new dependency needs its install script to run.
- `package.json` `packageManager` field — pins pnpm. pnpm is corepack-managed here rather than installed globally.

### Integrations

- `@astrojs/sitemap` — auto-generates sitemap-index.xml at build time
- `@astrojs/rss` — RSS feed at /rss.xml
- `@playform/compress` — build-time HTML/CSS/PNG/SVG compression
- `satori` + `@resvg/resvg-js` — dynamic OG image generation per article
- `sharp` — image optimization for content images
