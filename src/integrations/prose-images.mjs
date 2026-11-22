// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PROSE_COLUMN } from '../config.ts';

const SOURCE_DIR = 'src/assets/images';

/**
 * Markdown images render as a plain WebP `<img sizes="100vw">`: no `sizes` hint and no
 * AVIF. This sets `sizes` to the prose column and wraps each image in a `<picture>` with
 * an AVIF source encoded from the original file.
 * @returns {import('astro').AstroIntegration}
 */
export function proseImages() {
  const { maxWidth, gutter } = PROSE_COLUMN;
  const sizes = `(min-width: ${maxWidth}px) ${maxWidth - 2 * gutter}px, calc(100vw - ${2 * gutter}px)`;

  return {
    name: 'prose-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const sources = new Map(readdirSync(SOURCE_DIR).map((f) => [parse(f).name, join(SOURCE_DIR, f)]));
        /** @type {Map<string, Promise<string>>} */
        const encoded = new Map();

        /** @param {string} name @param {number} width */
        const avif = (name, width) => {
          const key = `${name}@${width}`;
          let url = encoded.get(key);
          if (!url) {
            const source = sources.get(name);
            if (!source) throw new Error(`prose-images: no source for "${name}" in ${SOURCE_DIR}`);
            url = sharp(source)
              .resize({ width, withoutEnlargement: true })
              .avif()
              .toBuffer()
              .then((buf) => {
                const file = `${name}.${createHash('sha256').update(buf).digest('hex').slice(0, 16)}.avif`;
                writeFileSync(join(root, '_astro', file), buf);
                return `/_astro/${file}`;
              });
            encoded.set(key, url);
          }
          return url;
        };

        for (const file of readdirSync(root, { recursive: true, encoding: 'utf-8' })) {
          if (!file.endsWith('.html')) continue;
          const path = join(root, file);
          const html = readFileSync(path, 'utf-8');
          const imgs = [...html.matchAll(/<img [^>]*data-astro-image="full-width"[^>]*>/g)].map((m) => m[0]);
          if (imgs.length === 0) continue;

          const replacements = await Promise.all(
            imgs.map(async (img) => {
              const srcset = img.match(/srcset="([^"]+)"/)?.[1];
              if (!srcset) throw new Error(`prose-images: no srcset on ${img}`);
              const entries = srcset.split(', ').map((entry) => {
                const [url, w] = entry.split(' ');
                return { name: parse(url).name.split('.')[0], width: Number.parseInt(w, 10) };
              });
              const avifSrcset = (
                await Promise.all(entries.map(async ({ name, width }) => `${await avif(name, width)} ${width}w`))
              ).join(', ');
              const sized = img.replace('sizes="100vw"', `sizes="${sizes}"`);
              return `<picture><source type="image/avif" srcset="${avifSrcset}" sizes="${sizes}">${sized}</picture>`;
            })
          );

          let out = html;
          imgs.forEach((img, i) => {
            out = out.replace(img, () => replacements[i]);
          });
          writeFileSync(path, out);
        }

        logger.info(`encoded ${encoded.size} AVIF images`);
      },
    },
  };
}
