export const SITE = {
	title: "Pedram's Blog",
	description: 'Thoughts on building software, leading teams, and the human side of engineering.',
	author: 'Pedram Taheri',
	social: {
		linkedin: 'https://www.linkedin.com/in/pdrmtaheri',
		github: 'https://github.com/pdrmtaheri',
	},
	authorMeta: {
		jobTitle: 'Director of Engineering',
		worksFor: 'Offerland',
	},
} as const;

export const COLORS = {
	surface: '#131313',
	onSurface: '#e5e2e1',
	accent: '#ff6b00',
	outline: '#52525b',
} as const satisfies Record<string, `#${string}`>;
