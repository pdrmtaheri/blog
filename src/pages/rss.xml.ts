import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedArticles } from '../utils/articles';
import { SITE } from '../config';

export async function GET(context: APIContext) {
	const articles = await getSortedArticles();

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site!,
		items: articles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.date,
			link: `/articles/${article.id}/`,
		})),
	});
}
