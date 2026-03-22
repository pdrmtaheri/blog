import type { APIRoute } from 'astro';
import { renderOgImage } from '../utils/og-image';
import { SITE, COLORS } from '../config';

export const GET: APIRoute = async () => {
	return renderOgImage({
		type: 'div',
		props: {
			style: {
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: COLORS.surface,
				color: COLORS.onSurface,
				fontFamily: 'Newsreader',
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							fontSize: '72px',
							fontWeight: 600,
							letterSpacing: '-0.03em',
							marginBottom: '16px',
						},
						children: SITE.title,
					},
				},
				{
					type: 'div',
					props: {
						style: { fontSize: '24px', color: COLORS.outline },
						children: SITE.description,
					},
				},
			],
		},
	});
};
