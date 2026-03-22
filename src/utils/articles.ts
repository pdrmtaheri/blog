import { getCollection } from 'astro:content';

export async function getSortedArticles() {
	const articles = await getCollection('articles');
	return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getArticleStaticPaths() {
	const articles = await getCollection('articles');
	return articles.map((article) => ({
		params: { slug: article.id },
		props: { article },
	}));
}
