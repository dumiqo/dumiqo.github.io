# dumiqo — personal site

Astro site for **Konstantin Kim** (`dumiqo`). Two layers on one page: a 30-second "what can this
person do" layer for recruiters, and the writing below it for engineers.

Live target: `https://dumiqo.github.io` → later `https://dumiqo.dev`.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Write a post

Create `src/content/blog/NNNN-slug.md`:

```markdown
---
title: A claim, not a topic
description: One sentence a recruiter can read and an engineer will believe.
date: 2026-12-01
pillar: consensus   # consensus | design | path
draft: true         # true = not built, not listed, not in rss
---

Body in Markdown.
```

Set `draft: false` when it ships. The index, `/writing/`, and `/rss.xml` pick it up automatically.

## Structure

```
src/
  content.config.ts        collection schema: title, description, date, pillar, draft
  content/blog/            posts
  layouts/Base.astro       shell, typography, dark mode
  pages/index.astro        the 30-second layer: claim, scope card, links
  pages/writing/           index + post pages
  pages/rss.xml.ts         feed
.github/workflows/deploy.yml   main → GitHub Pages
AGENTS.md                      hard rules: disclosure, ratio, cadence, copy
```

## Before it goes public

- [ ] `src/pages/index.astro` — the two commented-out links: CV PDF and LinkedIn URL.
- [ ] The scope card: read it as a stranger. Every sentence must be true and public-safe.
- [ ] `src/content/blog/0001-invariants-without-consensus.md` — replace the TODOs, then
      `draft: false`.
- [ ] Create the repo `dumiqo.github.io` on GitHub, push `main`.
- [ ] Settings → Pages → Source: **GitHub Actions**.
- [ ] Profile README on `github.com/dumiqo` pointing at the site.
- [ ] Only then: LinkedIn headline + Featured.

## Deliberately not here

No comments, no analytics, no newsletter, no CMS, no RU mirror. Each one is a commitment; add
them only when a post has earned them.
