---
title: "Verification Is the New Meta"
date: 2026-09-16
tags: ["ai", "testing"]
description: Tests, static analyzers, and linters are more important than ever
---

It is no secret that AI has gotten good. Like, _really_ good. The limitations aren't in the capabilities of the models anymore, but in verifying their output, both for quality and correctness.

You can see evidence of this in the huge rewrites happening in the wild, rewrites that would have been impractical, if not impossible, just a short while ago.

It used to be the case that rewrites were these scary things that would kill companies and freeze projects for years. Recently, however, we saw [Bun move to Rust](https://bun.com/blog/bun-in-rust) in a matter of weeks and Shopify [rebuild its mobile app](https://shopify.engineering/shop-app-migration) and go native.

Note that both of these rewrites had one thing in common: they gave the LLMs an external means of verifying output. Bun had an extensive test suite and a formal definition of the language, and Shopify built Helix, a system that, in their own words,
> builds a loop where an imperfect attempt simply cannot move forward until it becomes a good result.

It is as if having an output verifier is a prerequisite for pulling these off.

This is not new. The old software engineering wisdom has always been to do TDD. To set in stone how the software should behave. A robust test suite is a prerequisite for refactoring large projects successfully.

With the advent of LLMs, there is no excuse to ship low-quality software anymore. Take the time you would have spent coding and invest it in your verification stack. And let LLMs do their thing. Refactoring is not the Herculean effort it used to be.
