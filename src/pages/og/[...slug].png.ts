import type { APIRoute } from 'astro';
import { renderOgImage } from '../../utils/og-image';
import { getArticleStaticPaths } from '../../utils/articles';
import { COLORS } from '../../config';

export const getStaticPaths = getArticleStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const { article } = props;
	const { title, tags } = article.data;

	return renderOgImage({
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				padding: '80px',
				backgroundColor: COLORS.surface,
				color: COLORS.onSurface,
				fontFamily: 'Newsreader',
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: '24px',
							color: COLORS.accent,
							textTransform: 'uppercase',
							letterSpacing: '0.15em',
							marginBottom: '24px',
						},
						children: tags.join(' / '),
					},
				},
				{
					type: 'div',
					props: {
						style: {
							fontSize: '64px',
							fontWeight: 600,
							lineHeight: 1.1,
							letterSpacing: '-0.02em',
							marginBottom: '48px',
						},
						children: title,
					},
				},
				{
					type: 'div',
					props: {
						style: { fontSize: '20px', color: COLORS.outline },
						children: 'pedram.blog',
					},
				},
			],
		},
	});
};
