/**
 * Appends Link preload headers to dist/_headers for Cloudflare Early Hints.
 * Run after `astro build` so hashed filenames are available.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const headersPath = 'dist/_headers';
const fontsDir = 'dist/_astro/fonts';

const fonts = readdirSync(fontsDir).filter(f => f.endsWith('.woff2'));
const links = fonts.map(
  f => `  Link: </_astro/fonts/${f}>; rel=preload; as=font; type=font/woff2; crossorigin`
);

const existing = readFileSync(headersPath, 'utf-8');
writeFileSync(headersPath, existing.trimEnd() + '\n' + links.join('\n') + '\n');

console.log(`Added ${links.length} font preload Link headers to _headers`);
