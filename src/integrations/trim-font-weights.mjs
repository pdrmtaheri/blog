// @ts-check
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

/**
 * Google serves variable fonts with the full weight axis (Newsreader: 200-800) even when
 * fewer weights are requested.
 * @param {{ name: string; weights?: (number | string)[] }[]} fonts
 * @returns {import('astro').AstroIntegration}
 */
export function trimFontWeights(fonts) {
  return {
    name: 'trim-font-weights',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const html = readFileSync(join(root, 'index.html'), 'utf-8');
        const faces = [...html.matchAll(/font-family:\s*"?([^;"]+)"?;\s*src:\s*url\("?([^)"]+)"?\)/g)];

        for (const { name, weights = [] } of fonts) {
          const values = weights.flatMap((w) => String(w).split(/\s+/).map(Number));
          const min = Math.min(...values);
          const max = Math.max(...values);
          if (!(min < max)) continue;

          const urls = new Set(faces.filter(([, family]) => family.startsWith(`${name}-`)).map(([, , url]) => url));
          if (urls.size === 0) throw new Error(`trim-font-weights: no @font-face found for ${name}`);

          for (const url of urls) {
            const path = join(root, url);
            const before = readFileSync(path);
            const after = await subsetFont(before, null, {
              targetFormat: 'woff2',
              keepAllGlyphs: true,
              variationAxes: { wght: { min, max } },
            });
            writeFileSync(path, after);
            logger.info(`${url} ${before.length >> 10} KB -> ${after.length >> 10} KB (wght ${min}-${max})`);
          }
        }
      },
    },
  };
}
