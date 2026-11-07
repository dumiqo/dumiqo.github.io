import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Four lanes. `consensus` (raft-broker, replication) and `design` (practical system design)
// are the craft lanes and carry the ratio; `path` is how the skill was acquired, including the
// job search itself; `ai` is AI in practice - the assistant, the micro-products, the research
// behind them. There is deliberately no `tags` field: it existed, rendered nowhere, and an open
// set of free-form strings costs a translation per string in a two-language site.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    pillar: z.enum(['consensus', 'design', 'path', 'ai']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
