import type { JSXNode } from 'satori/jsx';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

let fontCache: Promise<ArrayBuffer> | null = null;

function getNewsreaderFont(): Promise<ArrayBuffer> {
	if (!fontCache) {
		fontCache = fetch(
			'https://fonts.googleapis.com/css2?family=Newsreader:wght@600&display=swap',
			{ headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }
		)
			.then((r) => r.text())
			.then((css) => {
				const match = css.match(/src:\s*url\(([^)]+)\)/);
				if (!match) throw new Error('Could not find font URL in Google Fonts CSS');
				return fetch(match[1]).then((r) => r.arrayBuffer());
			});
	}
	return fontCache;
}

export async function renderOgImage(node: JSXNode): Promise<Response> {
	const fontBuffer = await getNewsreaderFont();

	const svg = await satori(node, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Newsreader',
				data: fontBuffer,
				weight: 600,
				style: 'normal' as const,
			},
		],
	});

	const png = new Resvg(svg).render().asPng();

	return new Response(png, {
		headers: { 'Content-Type': 'image/png' },
	});
}
