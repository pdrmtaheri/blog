// @ts-check
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROSE_COLUMN } from '../config.ts';

/**
 * Markdown images can't set `sizes`, so Astro emits 100vw and wide screens fetch the
 * largest file.
 * @returns {import('astro').AstroIntegration}
 */
export function proseImageSizes() {
  const { maxWidth, gutter } = PROSE_COLUMN;
  const sizes = `(min-width: ${maxWidth}px) ${maxWidth - 2 * gutter}px, calc(100vw - ${2 * gutter}px)`;
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
