---
pubDatetime: 2024-12-29T18:53:01+03:30
title: "Why We Ditched QA and How It’s Impacted Our Development Process"
slug: ditching-qa
draft: false
tags: ["testing", "quality assurance"]
description: Why you don't need QAs to produce good software.
---

## Table of Contents

Up until a year ago, I was used to having dedicated QAs in the organizations I worked for. We developed a feature, sent it to QA, and merged it to production only after we had approval from QA. We couldn't imagine a world in which we didn't have QAs. However, that all started to change.

## The Case for Having Dedicated QAs

There's an article on [Joel Spolsky's blog](https://www.joelonsoftware.com/) titled: [Top Five (Wrong) Reasons You Don't Have Testers](https://www.joelonsoftware.com/2000/04/30/top-five-wrong-reasons-you-dont-have-testers/). I wanted to ensure you that, except for one, none of my reasons for foregoing QAs are listed in Joel's article. We'll go over the exception later in the article.

I believe the 10th item of [The Joel Test](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/) is a good summary of the argument for dedicated QAs:

> If your team doesn’t have dedicated testers, at least one for every two or three programmers, you are either shipping buggy products, or you’re wasting money by having $100/hour programmers do work that can be done by $30/hour testers. Skimping on testers is such an outrageous false economy that I’m simply blown away that more people don’t recognize it.

If you haven't read these articles, I suggest you go ahead and read them. Twenty years later, they still have a ton of wisdom to offer.

**Important note**: All of my arguments are made within the context of a small- to medium-sized tech company that's focused on growing its product and delivering features. If your organization doesn't fit this description, things are going to be different. As with many things, the decision to hire QAs or not is a tradeoff and doesn't have a universal answer.

## Faster Feedback Loops

The larger the delay in bug-smashing, the higher the cost of said bug-smashing.
![The Cost of Fixing Bugs](@assets/images/sketchplanations-fixing-bugs.png)
Image: Jono Hey, [Sketchplanations](https://sketchplanations.com/fixing-bugs)

While fixing a bug in testing is much less costly than fixing it in production, it still takes more time than fixing it in development. By the time the QA files a bug report, the developer has already moved on to work on another task. To fix this bug, they have to change their context. This context switch isn't free.

Then there's the issue of lead time. It's not unusual to have many devs for each QA in the organization. This is done to prevent QA under-utilization. This means that when a new feature is ready to test, it's often placed in a queue. This increases lead time significantly. I don't know about you, but I like moving fast.

## Ownership and Accountability

I'm of the opinion that software people, like all craftsmen, are responsible for the quality of their craft. In an organization with testers, the blame for bugs in production is placed on the testers. After all, their sole purpose is to prevent production bugs. This shifts the responsibility away from the developers and leads to degraded code quality, reduced accountability, and even higher lead time. Bonus points: This makes your organization more dependent on QA.

## Communication Must Be Minimized

We've seen the benefits of full-stack devs who can do it all. They can design the API, migrate the database schema, implement the API, call the API, change the UI, and get the feature out the door. Work gets done amazingly fast this way. That's because people who take responsibility for the entirety of a feature have the full context of what needs to be done, so there's no communication overhead. They also don't need to stand in line and thus have quicker feedback loops.

In my ideal world, all devs have complete control over the feature they're implementing. They don't need to wait for approvals or dependencies. QA is another dependency in the chain. It's another line you have to stand in. It's another part of the organization that needs to understand the feature you're working on so that they're able to test it effectively.

## Great QAs Don't Want to Be QAs

Finding good testers is hard, and retaining them is harder. This is #4 on Joel's list of the wrong reasons for not having testers:

> Unfortunately, most people who are that smart will tend to get bored with day-to-day testing, so the best testers tend to last for about 3 or 4 months and then move on.

## How's Life Without QA?

The change wasn't painless. At first, our devs weren't happy. We took the time to explain the rationale to everyone on the team, and I got everyone on the same page. After that, we fully embraced the change and good things started happening. Our devs felt more in control, we decreased our lead time and didn't produce any more bugs than we were producing before.

## Wrapping Up

I started my leadership journey with the mindset of a [servant leader](https://en.wikipedia.org/wiki/Servant_leadership). My purpose was to remove roadblocks and get the organization and its bureaucracy out of my team's way. QA is another piece of process that gets in the way. One that has failed to justify its existence.
