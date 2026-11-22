// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import compress from '@playform/compress';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * astro:content isn't available in config.
 * @type {Map<string, Date>}
 */
const articleDates = new Map();
for (const file of readdirSync('./src/content/articles').filter((f) => f.endsWith('.md'))) {
  const content = readFileSync(`./src/content/articles/${file}`, 'utf-8');
  const match = content.match(/^date:\s*(.+)$/m);
  if (!match) continue;
  const slug = file.replace(/\.md$/, '');
  articleDates.set(`https://pedram.blog/articles/${slug}/`, new Date(match[1].trim()));
}

/**
 * Markdown images can't set `sizes`, so Astro emits 100vw and wide screens fetch the
 * largest file. Prose column: main max-w-3xl (768px) minus px-6 (48px).
 * @returns {import('astro').AstroIntegration}
 */
function proseImageSizes() {
  const sizes = '(min-width: 768px) 720px, calc(100vw - 48px)';
  return {
    name: 'prose-image-sizes',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        for (const file of readdirSync(root, { recursive: true, encoding: 'utf-8' })) {
          if (!file.endsWith('.html')) continue;
          const path = join(root, file);
          const html = readFileSync(path, 'utf-8');
          const out = html.replace(/<img [^>]*data-astro-image="full-width"[^>]*>/g, (img) =>
            img.replace('sizes="100vw"', `sizes="${sizes}"`)
          );
          if (out !== html) writeFileSync(path, out);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://pedram.blog',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    layout: 'full-width',
    breakpoints: [640, 750, 828, 1080, 1280, 1440, 1920, 2160],
  },
  integrations: [
    sitemap({
      serialize(item) {
        const articleDate = articleDates.get(item.url);

        if (articleDate) {
          item.lastmod = articleDate.toISOString();
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url === 'https://pedram.blog/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else {
          item.changefreq = ChangeFreqEnum.MONTHLY;
        }

        return item;
      },
    }),
    proseImageSizes(),
    compress(),
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
});
