import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getSortedArticles } from '../utils/articles';
import { SITE } from '../config';

export const GET: APIRoute = async ({ site }) => {
	const articles = await getSortedArticles();

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: site!,
		items: articles.map((article) => ({
			title: article.data.title,
			description: article.data.description,
			pubDate: article.data.date,
			link: `/articles/${article.id}/`,
		})),
	});
};
