---
title: The invariants I can't hold without consensus
description: A queue broker promises ordered delivery, deduplication, and exactly-once. Every one of those promises collapses the moment leader election and log replication are wrong — so I wrote the Raft core by hand.
date: 2026-11-15
pillar: consensus
draft: true
---

<!--
  SKELETON — the argument is fixed, the evidence is yours to fill.
  Target: 1 200–1 800 words. Delete every TODO as you go; the post ships when no TODO is left.
  Rule from the design: every claim needs a receipt — a commit, a test, a failing run.
  Nothing from work: no employer name, no internal architecture, no incidents.
-->

The broker in [`raft-broker`](https://github.com/dumiqo/raft-broker) makes three promises. None of
them survive a broken consensus layer — and that is the whole reason the Raft core is hand-written
instead of borrowed.

## What the broker promises

| Promise | What a client assumes | What breaks it |
| --- | --- | --- |
| The journal is the only source of truth | Acknowledged records exist after a crash | A "commit" that was never on a majority |
| Duplicate deliveries are rejected | Redelivery is safe | Two leaders writing the same entry index |
| Exactly-once at the queue level | No double processing | A lost entry that the consumer already saw |

<!-- TODO: one sentence per row, in your own words, saying why the failure mode is *plausible* on
     a single node and *inevitable* in a cluster. That contrast is the hook. -->

## The promises are consensus problems, not storage problems

<!-- TODO: the pivot. Storage gives you durability on one machine. Consensus gives you agreement
     across machines. A queue's guarantees are agreement statements with a durability implementation. -->

## Where Raft carries each promise

<!-- TODO: for each of the three, name the mechanism in Raft terms — commit index on a majority,
     the log-matching rule, leader completeness (§5.4.1) — and point at the file in the repo. -->

1. **Commit on a majority.** TODO: which invariant lives here, and the test that would fail without it.
2. **One leader per term.** TODO.
3. **Leader completeness.** TODO.

## What breaks first when it's wrong

<!-- TODO: the one concrete failure you hit. The commit that fixed it. What you believed before,
     what the logs/TestClock run showed, what the fix was. This section is the reason people read
     the post — keep it specific, keep it embarrassing, keep it short. -->

## What I'd tell someone starting this

<!-- TODO: 3 bullets, no more. What you'd skip, what you'd test first, what you'd read. -->

---

*Next in this series: leader election on a deterministic clock — what "elections don't converge"
actually looks like in a test run.*
