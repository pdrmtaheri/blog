import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
	schema: z.object({
		title: z.string().min(1),
		date: z.coerce.date(),
		tags: z.array(z.string().min(1)),
		description: z.string().min(1),
	}),
});

export const collections = { articles };
