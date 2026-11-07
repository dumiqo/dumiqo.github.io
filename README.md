# dumiqo — personal site

Astro site for **Konstantin Kim** (`dumiqo`). Two layers on one page: a 30-second "what can this
person do" layer for recruiters, and the writing below it for engineers.

Live target: `https://dumiqo.github.io` → later `https://dumiqo.dev`. Currently live and empty
(no post published yet), which is the intended state: the structure comes first.

## Why this exists

The owner's answer, 2026-11-07: **a post is proof that the work was actually done.** Hiring is
what that proof is *for*, not the goal itself — "HR is not the goal, the goal is a better chance
of being hired and better work". Two consequences that outrank taste:

- A post that cannot be checked against something on disk (a commit, a failing run, a test) does
  not ship. This is the same rule as AGENTS.md #5, but it now has a reason: proof is the point.
- A summary of what someone else wrote proves nothing about this person. A review is a post only if
  it names what the source influenced — book, paper, video, podcast, talk or article — and says what
  it already changed, what it will change and by when, or what it now makes possible — **and where
  that change is recorded** (a task, a spec, a plan, a commit). "Could be useful" with no target and
  no date is a summary with extra words.

Rhythm: **one evening a week, Wednesday.** The topic is chosen in that same evening — deciding
and drafting are one session, not two commitments. The edit pass is the first 15 minutes of the
next Wednesday's session: reading last week's draft cold is cheaper than a second slot.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # astro check: types across .astro and .ts, 0 errors is the bar
```

## Where things live in the URL

| Page | English | Russian | File |
| --- | --- | --- | --- |
| Home (positioning card + latest) | `/` | `/ru/` | `src/pages/index.astro`, `src/pages/ru/index.astro` |
| All writing | `/writing/` | `/ru/writing/` | `src/pages/writing/index.astro`, `…/ru/writing/index.astro` |
| A post | `/writing/<slug>/` | `/ru/writing/<slug>/` | `src/pages/writing/[...slug].astro`, `…/ru/writing/[...slug].astro` |
| Feed | `/rss.xml` | `/ru/rss.xml` | `src/pages/rss.xml.ts`, `src/pages/ru/rss.xml.ts` |

English keeps the root because it is the default audience; Russian mirrors it under `/ru/`, and
`x-default` points at English. Post slugs are the same in both languages — that equality *is* what
makes two files a translation pair.

## Write a post

A post is written in the language the thought arrives in and does not wait for a translation.

English: `src/content/blog/NNNN-slug.md`. Russian: `src/content/blog/ru/NNNN-slug.md`.

```markdown
---
title: A claim, not a topic
description: One sentence a recruiter can read and an engineer will believe.
date: 2026-12-01
pillar: consensus   # consensus | design | path | ai
draft: true         # true = not built, not listed, not in the feed
---

Body in Markdown.
```

Rules that the code enforces or the build checks:

- **Language comes from the folder**, not from frontmatter. `blog/` is English, `blog/ru/` is
  Russian. Two files with the same slug are a pair; there is no field to keep in sync.
- Setting `draft: false` on one file does not publish its twin. Independent, on purpose.
- A post without a translation works fine: its page says so and its language switcher lands on the
  other language's index instead of a dead URL.

Everything user-facing (nav, headings, dates, empty states, feed titles) is in `src/i18n.ts`.
**Never inline a string in a view** — that is how one language silently loses a line.

## Structure

```
src/
  i18n.ts                  all UI copy, EN + RU; href()/prefixOf() define the URL scheme
  lib/posts.ts             language from path, slug, pairing, per-language listing
  lib/feed.ts              one feed builder, two routes
  content.config.ts        schema: title, description, date, pillar, draft
  content/blog/            English posts
  content/blog/ru/         Russian posts
  views/Home.astro         the 30-second layer (card + latest posts)
  views/WritingIndex.astro the full list
  views/Post.astro         one post, translation switching
  pages/…                   thin route files over the views, one per language per page
  layouts/Base.astro       shell, hreflang alternates, language switcher, dark mode
.github/workflows/deploy.yml   main → GitHub Pages
AGENTS.md                      hard rules: disclosure, ratio, cadence, copy, languages
```

## Publish flow

1. Draft lives in the vault, not in this repo. The repo only ever receives publish-ready text.
2. `npm run dev` and read the page (both languages) before committing. `npm run check` must be
   clean too — `astro build` does not type-check, so a broken prop fails at runtime, not at build.
3. Commit + push to `main` → GitHub Actions builds and deploys. No preview builds, no PR flow.
4. Check the live URL. If it is a post, check that its pair (if any) links back.
5. A Russian version drafted by an agent ships only after the owner has read it.

## Deliberately not here

No comments, no analytics, no newsletter, no CMS, no tag pages, no `/about/` page, no
`/projects/` page, no short-notes stream. Each is a commitment and none of them has a reader yet.
Every one of them is added after a post has earned it, not before.

Recorded triggers for the decisions that were postponed:

- `/about/` page and moving the card off the home page — when there are **12–15 posts** and an
  archive worth scrolling. Before that, a cold visitor must see who this is in the first screen.
- `/projects/` page or `src/data/projects.ts` — the **second** project. One project fits in the card.
- Notes / TIL stream — after **3–5 posts**, if receipts pile up that do not deserve a post.
- `reading` pillar (reviews of any source: books, papers, videos, podcasts, talks, articles) — when
  such a review actually appears. The label says `reading`, the rule does not read that narrowly, and
  the name can change before the field exists — it is not in the schema yet. It must name what the
  source influenced *and* where that is recorded; with no job, "it changed one decision in the repo"
  is too narrow, so a changed plan counts too — but only a written one.
- Sitemap + Search Console — together with the **first published post**; there is nothing to
  index before it.
- CV PDF and LinkedIn on the home page — a real trade-off (a public PDF exposes name, phone and
  email to scrapers), not a checklist item.

## Before it goes public

- [ ] `README.md` profile on `github.com/dumiqo` pointing at the site.
- [ ] Review of `raft-broker` before any post claims anything about it — see the vault task.
- [ ] `src/content/blog/0001-invariants-without-consensus.md` — replace the TODOs, then
      `draft: false`. The post is not chosen yet; the file is a skeleton, not a commitment.
- [x] Create the repo `dumiqo.github.io` on GitHub, push `main`. (2026-11-07, live at
      https://dumiqo.github.io)
- [x] Settings → Pages → Source: **GitHub Actions**. (enabled before the first push — otherwise
      `deploy-pages` fails with `Get Pages site failed`, which looks like a code bug and is not)
- [x] Bilingual structure: `/ru/` tree, hreflang + `x-default`, two feeds. (2026-11-07)
