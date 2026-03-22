# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog (pedram.blog) built with Astro 6. Fresh starter — single static page, no content collections or integrations yet.

## Commands

- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview production build
- `pnpm astro` — run Astro CLI (e.g. `pnpm astro add`, `pnpm astro check`)

No lint or test commands configured.

## Architecture

- **Framework**: Astro 6 (static output, ESM, Node >= 22.12.0)
- **Package manager**: pnpm
- **TypeScript**: strict mode (`astro/tsconfigs/strict`)
- **Styling**: scoped `<style>` blocks in components, no CSS framework
- **Routing**: file-based under `src/pages/`

### Key directories

- `src/pages/` — file-based routes (currently just `index.astro`)
- `src/layouts/` — HTML shell layouts (`Layout.astro` with `<slot />`)
- `src/components/` — Astro components
- `src/assets/` — imported assets (SVGs, images)
- `public/` — static assets served as-is (favicons)

### Config

- `astro.config.mjs` — empty `defineConfig({})`, no integrations or adapters
- `tsconfig.json` — extends `astro/tsconfigs/strict`
