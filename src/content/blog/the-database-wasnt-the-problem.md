---
title: "The database wasn't the problem: what 1000x traffic actually means"
description: The load a database sees is a product of four factors, and only one of them is about the database. A mock interview answer that scored 3 out of 10, taken apart.
date: 2026-11-19
pillar: design
series: 1000x-traffic
part: 1
draft: true
---


The question came at the end of a mock interview. A service's database takes 200 requests per second today; what happens when it takes 200,000? I said I would look at the expensive queries and probably move something to a distributed store, maybe Raft, maybe Paxos. The interviewer scored it 3 out of 10. Both of those words are about getting machines to agree with each other. Neither of them adds capacity, and capacity was the question.

Nothing in that answer was wrong about Raft, which is what makes it a useful mistake: the words are correct and the question they answer is not the one that was asked. The load a database sees is a product:

**user requests per second × queries per request × attempts per query × the share of queries that reach the database.**

Four factors, and only the last one is about the database. When someone says traffic grew a thousand times, they are describing one factor, or two of them together. Which one it was decides what you do on Monday.

Put numbers on the same question and it stops being impressive. In the follow-up the interviewer kept the scenario and moved the counters: requests reaching the database up a hundred times, distinct clients up ten percent. Those two numbers cannot both be load. A hundred times the work from almost the same number of people means something is being multiplied: the same person now causing far more queries, or the same query asked again and again. Two more counters settle which. Attempts were up forty times. And ninety-two percent of all of it landed on a single endpoint.

That makes "what do we do about the database" a premature question. Five different things produce this picture, they look almost identical from the database's side, and every one of them is fixed somewhere else.

| Mechanism | What the numbers look like | Where the fix lives | What to ask first |
| --- | --- | --- | --- |
| Retry wave | attempts up, clients flat, one dependency failing | the caller's retry policy, and whatever started failing | Are attempts rising faster than requests? |
| Fan-out and N+1 | queries per request up, one endpoint dominating | the shape of the data access, not the database | How many queries does one request make? |
| Slow dependency | rps flat, connections at the ceiling | pool size, timeouts, query plans | How long does one query take, and how many are in flight right now? |
| Cache miss storm | database sees traffic it never saw before, hit ratio dropped after a deploy | keys, TTLs, and one recompute per key instead of many | Did the hit ratio change, and when? |
| Topology and background | load that does not show up in rps: locks, replica down, nightly report, migration | routing, and the maintenance window | What changed in routing or in the schedule? |

The first three are visible in those numbers. The last two are what I should have checked and did not.

Take the third row, because it is where a database gets blamed for something it did not do. Requests per second can be flat while connections sit at their maximum, and nothing on the rps graph explains the gap. The bridge between the two is time. Two thousand requests per second at ten milliseconds each means twenty requests in flight at any instant: two thousand times a hundredth of a second. Make the query ten times slower and the same traffic needs two hundred, against a Postgres default of a hundred client connections. The pool is gone before the traffic has moved at all.

The same arithmetic is what the original question was really asking. Two hundred thousand requests per second at ten milliseconds is two thousand in flight: the same ten milliseconds, a thousand times the traffic, and twenty times the connections any single node will give you.

Both numbers land in the same place. A pool of a hundred is exhausted, every further request waits for a slot, waiting counts as latency, latency triggers the caller's timeout, and the caller's retry arrives as a new request at a database that was already full. The load did not grow. The time per request did.

The three bars below are the same arithmetic, on a log scale so that twenty and two thousand fit in one picture.

![Three cases of the same arithmetic: 20, 200 and 2,000 connections in flight, against a pool of 100](/figs/in-flight.svg)

*Connections held at one instant = requests per second × seconds per request. The dashed line is the Postgres default of 100 client connections.*

The fourth row is easy to miss because nothing in the application changed. The cache did: a deploy renamed a key, a batch of TTLs expired together, eviction ran under memory pressure, or a hundred processes noticed the same missing value in the same second and all went off to compute it. One counter says whether a cache was answering at all: four milliseconds on a query that takes forty without one. The moment the hit ratio drops, the database starts seeing traffic that used to stop one hop earlier.

The fifth row is not about traffic. A read replica drops out and every read moves to the primary. A migration takes a lock and a queue of writers builds up behind it. A nightly report starts at the same moment as the peak. A CDN is switched off and the images come from your own origin. None of that shows up as requests per second, and all of it shows up as a database that is suddenly too small.

The answer I should have given is an order of questions, short enough to remember under pressure.

1. Is this reads or writes, peak or average, what is the latency budget, and does a read have to see its own write?
2. Is the growth real? Compare requests per second against the number of clients and the number of attempts.
3. Which factor grew: queries per request, attempts, cache misses, time per query, or the topology?
4. Name the limit, then add capacity in order of price. On the peak, the job is to protect the system, not to serve everything.
5. Shard last, and say the price out loud.

Questions four and five are the whole of the next post: what the limit actually is, and what each rung of that ladder costs.

The answer that scored three out of ten was a tool. The answer that would have scored better was five questions.
