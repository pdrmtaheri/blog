import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getSortedArticles } from '../utils/articles';

export async function GET(context: APIContext) {
	const articles = await getSortedArticles();
	const site = context.site!;

	const lines = [
		`# ${SITE.title}`,
		'',
		`> ${SITE.description}`,
		`> By ${SITE.author}, ${SITE.authorMeta.jobTitle} at ${SITE.authorMeta.worksFor}.`,
		'',
		'## Author',
		`- [About ${SITE.author}](${new URL('/about', site)})`,
		'',
		'## Articles',
		...articles.map(
			(a) => `- [${a.data.title}](${new URL(`/articles/${a.id}`, site)}): ${a.data.description}`,
		),
		'',
		'## Optional',
		`- [RSS Feed](${new URL('/rss.xml', site)})`,
		`- [Sitemap](${new URL('/sitemap-index.xml', site)})`,
		'',
	];

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
