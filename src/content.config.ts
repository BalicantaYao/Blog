import { defineCollection, z } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const blogDirectory = fileURLToPath(new URL('./content/blog/', import.meta.url));
const blogFiles = glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' });

// The stock glob loader returns early when nothing matches, and leaves cached
// entries in place. A restored Netlify/CI cache then renders deleted posts
// whose heroImage is still the raw filepath, and <Image> rejects that string.
const blogLoader: Loader = {
	name: 'blog-glob',
	load: async (context) => {
		await blogFiles.load(context);
		if ((await countMarkdown(blogDirectory)) > 0) return;
		for (const id of context.store.keys()) context.store.delete(id);
	},
};

async function countMarkdown(directory: string): Promise<number> {
	let names: string[];
	try {
		names = await readdir(directory, { recursive: true });
	} catch {
		return 0;
	}
	return names.filter((name) => name.endsWith('.md') || name.endsWith('.mdx')).length;
}

const blog = defineCollection({
	loader: blogLoader,
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
