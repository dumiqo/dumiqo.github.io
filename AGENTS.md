# Rules for this repo

Personal site and writing of Konstantin Kim (`dumiqo`). Public, real name, English and Russian.

## Hard rules

1. **Never publish employer material.** No company name, no internal architecture, no incident
   stories, no customer or project specifics, no internal numbers. Describe *your role and the
   system's shape*, never *the system*. When in doubt, cut it.
2. **Two languages, one schema.** English lives at the site root and is the default; Russian
   mirrors it under `/ru/`. A post is written in the language the thought arrived in and does **not**
   wait for its translation, so a post may exist in one language only — its page says so, and the
   language switcher lands on the other language's index instead of a dead URL. A translation is
   drafted by the agent and does not ship until the owner has read it: the English voice has to stay
   his, not the translator's. Quotes, code, identifiers and commit messages keep their original
   language in both versions — a translation is never a quote.
3. **Every claim needs a receipt.** A commit, a test, a failing run, a measurement, or a citation —
   otherwise it is an opinion, and opinions go in the `path` pillar written as such. A *decision*
   counts as a receipt when it is written down in the vault with a date: "unemployed, so nothing
   changed yet" is allowed to point at the plan that changed instead.
4. **Four lanes; the ratio covers the two craft ones.** `consensus` (build-in-public on `raft-broker`
   and replication) and `design` (practical system design, interview-grade, from the `teach`
   material) are the craft lanes and take roughly 70 % between them. `path` is how the skill was
   acquired — including the job search itself: mock-interview runs, prep plans, what the market
   rejected and why. `ai` is AI in practice: the assistant, the micro-products, and the research
   behind them. Neither `path` nor `ai` publishes on a quota — it publishes on a receipt. Do not
   let either grow past the craft lanes: that is where posts nobody reads come from.
5. **A post is anchored in something that exists on disk — done, or decided.** A digest of a source
   is not a post, whatever the source is: book, paper, video, podcast, talk, article. The same
   source is a post if it changed a decision, an artifact or a plan that is already written down,
   with the change and its date named in the text. "This could change how I work" is not an anchor:
   an intention in the head leaves no receipt. No job right now is a reason to accept a *recorded
   decision* as the anchor — a spec revision, a task, a plan, a backlog ticket — not a reason to
   accept a summary.

## Cadence

One piece a week, **Wednesday evening**: the topic is chosen in that same session, and the edit
pass is the first 15 minutes of the next one — reading last week's draft cold is cheaper than a
second weekly slot. Lanes alternate in practice: `consensus` ⇄ `design` every other week, which is
why the ratio holds at roughly 70 %. `ai` or `path` takes the slot when there is a receipt for it
and nothing worth publishing from the craft lanes — never as a filler. A missed week is fine; a
silently dead series is not — if the project stalls, publish the retrospective, not a promise.

## Copy rules

- The first screen answers "what can this person do" in 30 seconds. Depth lives below it.
- No "I'm passionate about". No listicles. No motivational framing.
- Titles state a claim or a question; they never announce a topic ("Thoughts on Raft" — no).

## Technical

- Astro + Markdown. Posts live in `src/content/blog/NNNN-slug.md`, four-digit prefix, newest wins
  nothing — order comes from `date`.
- **Language comes from the folder, not from frontmatter.** `src/content/blog/` is English,
  `src/content/blog/ru/` is Russian. Two files with the same slug in different folders *are* the
  translation pair — there is no field to keep in sync, and none is added.
- Pages are thin route files in `src/pages/` over shared views in `src/views/` (`Home`, `WritingIndex`,
  `Post`), so `/` and `/ru/` cannot drift apart. All UI copy lives in `src/i18n.ts` — never inline a
  string in a view, or one language silently loses it.
- Feeds are per language: `/rss.xml` (EN) and `/ru/rss.xml` (RU), both from `src/lib/feed.ts`.
- `draft: true` in frontmatter keeps a post out of the build, the index, and the feed — in either
  language, and independently: the English version can be live while the Russian one is not.
- Deploy is `main` → GitHub Pages via `.github/workflows/deploy.yml`. Repo name is
  `dumiqo.github.io` on purpose: no `base` path, so the custom domain drops in later without
  changing URLs.
