import type { JSXElement } from 'satori/jsx';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

let fontCache: Promise<ArrayBuffer> | null = null;

async function fetchOk(url: string, init?: RequestInit): Promise<Response> {
	const res = await fetch(url, init);
	if (!res.ok) throw new Error(`Font fetch failed: ${res.status} ${url}`);
	return res;
}

function getNewsreaderFont(): Promise<ArrayBuffer> {
	if (!fontCache) {
		// This User-Agent gets a single static TTF (600 weight). A Chrome UA would get woff2
		// split into unicode-range subsets, and the first src may not be the latin one.
		fontCache = fetchOk(
			'https://fonts.googleapis.com/css2?family=Newsreader:wght@600&display=swap',
			{ headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }
		)
			.then((r) => r.text())
			.then((css) => {
				const match = css.match(/src:\s*url\(([^)]+)\)/);
				if (!match) throw new Error('Could not find font URL in Google Fonts CSS');
				return fetchOk(match[1]).then((r) => r.arrayBuffer());
			});
	}
	return fontCache;
}

export async function renderOgImage(node: Omit<JSXElement, 'key'>): Promise<Response> {
	const fontBuffer = await getNewsreaderFont();

	const svg = await satori(node, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Newsreader',
				data: fontBuffer,
				weight: 600,
				style: 'normal',
			},
		],
	});

	const png = new Resvg(svg).render().asPng();

	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png' },
	});
}
