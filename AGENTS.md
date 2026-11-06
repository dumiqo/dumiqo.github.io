# Rules for this repo

Personal site and writing of Konstantin Kim (`dumiqo`). Public, real name, English only.

## Hard rules

1. **Never publish employer material.** No company name, no internal architecture, no incident
   stories, no customer or project specifics, no internal numbers. Describe *your role and the
   system's shape*, never *the system*. When in doubt, cut it.
2. **English only.** No Russian mirror, no translated duplicates. Quotes, code, identifiers and
   commit messages keep their original language.
3. **Every claim needs a receipt.** A commit, a test, a failing run, a measurement, or a citation —
   otherwise it is an opinion, and opinions go in the `path` pillar written as such.
4. **The ratio is 40 / 30 / 30**: `consensus` (build-in-public on `raft-broker` and replication),
   `design` (practical system design, interview-grade, from the `teach` material), `path` (how the
   skill was acquired — including the mistakes). Do not let `path` grow past its third: it is the
   pillar that produces posts nobody reads.
5. **A post is anchored in something done, not something read.** A book digest is not a post; a
   book that changed one decision in the repo is.

## Cadence

One piece every two weeks, alternating `consensus` ⇄ `design`. Draft Sunday (2 h), edit Sunday
(1 h), publish Monday morning. A missed post is fine; a silently dead series is not — if the
project stalls, publish the retrospective, not a promise.

## Copy rules

- The first screen answers "what can this person do" in 30 seconds. Depth lives below it.
- No "I'm passionate about". No listicles. No motivational framing.
- Titles state a claim or a question; they never announce a topic ("Thoughts on Raft" — no).

## Technical

- Astro + Markdown. Posts live in `src/content/blog/NNNN-slug.md`, four-digit prefix, newest wins
  nothing — order comes from `date`.
- `draft: true` in frontmatter keeps a post out of the build, the index, and the feed.
- Deploy is `main` → GitHub Pages via `.github/workflows/deploy.yml`. Repo name is
  `dumiqo.github.io` on purpose: no `base` path, so the custom domain drops in later without
  changing URLs.
