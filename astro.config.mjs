// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import compress from '@playform/compress';
import { readFileSync, readdirSync } from 'node:fs';

/**
 * Parse article dates from frontmatter (avoids astro:content which isn't available in config)
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
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url === 'https://pedram.blog/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else {
          item.changefreq = ChangeFreqEnum.MONTHLY;
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
