import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Three pillars, 40 / 30 / 30. The ratio is a rule about what gets written,
// not a field to be filled: `consensus` is the lane, `design` is the practical
// system-design material, `path` is how the skill was actually acquired.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    pillar: z.enum(['consensus', 'design', 'path']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
