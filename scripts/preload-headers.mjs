/**
 * Appends Link preload headers to dist/_headers for Cloudflare Early Hints.
 * Run after `astro build` so hashed filenames are available.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const headersPath = resolve(root, 'dist/_headers');
const fontsDir = resolve(root, 'dist/_astro/fonts');

const existing = readFileSync(headersPath, 'utf-8');
if (existing.includes('rel=preload; as=font')) {
  console.log('Font preload Link headers already present, skipping');
  process.exit(0);
}

const fonts = readdirSync(fontsDir).filter(f => f.endsWith('.woff2'));
const links = fonts.map(
  f => `  Link: </_astro/fonts/${f}>; rel=preload; as=font; type=font/woff2; crossorigin`
);

writeFileSync(headersPath, existing.trimEnd() + '\n' + links.join('\n') + '\n');
console.log(`Added ${links.length} font preload Link headers to _headers`);
