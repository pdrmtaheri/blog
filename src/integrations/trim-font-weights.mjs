// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
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
        /** @type {Map<string, string>} */
        const renamed = new Map();

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
            const hash = createHash('sha256').update(after).digest('hex').slice(0, 16);
            const newUrl = join(dirname(url), `${hash}.woff2`);
            writeFileSync(join(root, newUrl), after);
            rmSync(path);
            renamed.set(url, newUrl);
            logger.info(`${newUrl} ${before.length >> 10} KB -> ${after.length >> 10} KB (wght ${min}-${max})`);
          }
        }

        for (const file of readdirSync(root, { recursive: true, encoding: 'utf-8' })) {
          if (!file.endsWith('.html')) continue;
          const path = join(root, file);
          let page = readFileSync(path, 'utf-8');
          for (const [from, to] of renamed) page = page.replaceAll(from, to);
          writeFileSync(path, page);
        }
      },
    },
  };
}
