// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import { readFileSync, readdirSync } from 'node:fs';

/** Parse article dates from frontmatter (avoids astro:content which isn't available in config) */
const articleDates = new Map(
  readdirSync('./src/content/articles')
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const content = readFileSync(`./src/content/articles/${file}`, 'utf-8');
      const match = content.match(/^date:\s*(.+)$/m);
      const slug = file.replace(/\.md$/, '');
      return [`https://pedram.blog/articles/${slug}/`, match ? new Date(match[1].trim()) : null];
    })
    .filter(([, date]) => date !== null)
);

export default defineConfig({
  site: 'https://pedram.blog',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      serialize(item) {
        const articleDate = articleDates.get(item.url);

        if (articleDate) {
          item.lastmod = articleDate.toISOString();
          item.changefreq = 'monthly';
        } else if (item.url === 'https://pedram.blog/') {
          item.changefreq = 'weekly';
        } else {
          item.changefreq = 'monthly';
        }

        return item;
      },
    }),
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
