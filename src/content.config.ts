import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Four lanes. `consensus` (raft-broker, replication) and `design` (practical system design)
// are the craft lanes and carry the ratio; `path` is how the skill was acquired, including the
// job search itself; `ai` is AI in practice - the assistant, the micro-products, the research
// behind them. `tags` is free-form on purpose: cross-cutting words (postgres, interviews) do not
// deserve a schema change every time a new one appears.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    pillar: z.enum(['consensus', 'design', 'path', 'ai']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
