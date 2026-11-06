import { defineConfig } from 'astro/config';

// Repo is named dumiqo.github.io, so Pages serves from the domain root: no `base` needed.
// When the custom domain lands, change `site` to https://dumiqo.dev and nothing else moves.
export default defineConfig({
  site: 'https://dumiqo.github.io',
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
