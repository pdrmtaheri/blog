---
date: 2024-12-21T23:01:03+03:30
draft: false
title: How Not to Start a Blog
tags: ["blog", "writing", "imposter syndrome"]
categories: ["General"]
summary: How I spent days optimizing a blank blog. Don't do that.
cover:
  image: lighthouse.webp
  alt: A screenshot of this blog's perfect lighthouse metrics.
  caption: This isn't important.
  relative: true
---

# How Not to Start a Blog

I recently set up my blog. You’d think the first step would be writing content, but no—naturally, I spent hours doing everything _but_ writing. By the time I finally sat down to type something, I had spent more time optimizing a blank blog than most people spend planning for a month-long vacation overseas.

Here’s how it went.

---

## The Pre-Blog Era: Years of Procrastination

Before I even touched a line of code or bought a domain, I spent years with the intention of starting a blog. I wanted to write, but I never did. Why? Imposter syndrome.

I thought I didn’t have anything valuable to say. “What do _you_ have to contribute?” a little voice kept asking. “Everything worth saying has already been said.”

That belief held me back. I convinced myself that if my writing wasn’t groundbreaking or insightful enough to go viral, it wasn’t worth sharing. So, I stayed silent, waiting for some magical moment when I’d finally feel “qualified.” Spoiler: that moment never came.

---

## Day 1: The Setup Spiral

Eventually, I decided to stop overthinking and start blogging. Or so I thought. That’s where the distractions began:

- I spent hours hunting for the perfect domain name. (This one might’ve been worth it. Time will tell.)
- I compared blogging platforms for hours—WordPress, static site generators, you name it. Then I dove even deeper, comparing every static site generator I could find.
- I spent a lot of time searching for a good theme before I ended up on [PaperMod](https://github.com/adityatelange/hugo-PaperMod?tab=readme-ov-file).
- I obsessed over hosting solutions, debating every tiny detail.
- Finally, I set up a [Git repository](https://github.com/pdrmtaheri/blog) and connected it to [Cloudflare Pages](https://pages.cloudflare.com/).

At this point, you’d think I was ready to start blogging. But no, the real waste came next.

---

## Day 2: The Rabbit Hole of Perfectionism

This is where I truly lost myself:

- I started optimizing [Lighthouse metrics](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) and obsessing over SEO scores.
- I linked my Google Analytics account with my Google Search Console, which, except for my own tests, were both completely empty.
- I benchmarked my site with and without Cloudflare cache, running tests across three platforms: [PageSpeed Insights](https://pagespeed.web.dev/), [Lighthouse Metrics](https://lighthouse-metrics.com/), and Chrome’s performance tab.
- I spent hours curating the perfect `_headers` for Cloudflare. (This took forever thanks to a conflict with a cache rule I’d enabled earlier. Irony? Absolutely.)
- I enabled Cloudflare’s Rocket Loader, which promptly caused my theme to flicker during the initial switch from light mode to dark mode.
- Instead of disabling Rocket Loader (because _obviously_ that would be too easy), I spent more hours hunting down the problematic script, finding a way to exempt it, and fixing the issue.

While trying to improve my Lighthouse scores, I also got curious about how [Hugo](https://gohugo.io/) handles image optimization. That led to another detour: learning about Hugo's image processing pipeline. I spent hours fiddling with it, tweaking sizes and formats, just for the sake of understanding it. Did this make a huge difference? Not really, but at least I learned something.

---

## Day 3: Analytics Overkill

By now, you might think I’d stop tinkering. Nope. I decided my blank blog needed _all_ the analytics:

- [Google Analytics](https://analytics.google.com/)? Sure.
- [PostHog](https://posthog.com/)? Yes! I had to know what all the fuss is about.
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)? Why not.
- [Microsoft Clarity](https://clarity.microsoft.com/)? Of course.

It didn’t take long to realize all these tools were hogging bandwidth (Yes I was still benchmarking the EMPTY BLOG). So, after testing and playing around with each, I removed them all except for Google Analytics. A simpler solution that would've taken much less time to implement.

---

## Mid-Article Detour: The Cover Must be Absolutely Perfect

Even while writing this article, I got distracted. I wanted to optimize the featured image for this post. Naturally, I decided to convert it to WebP. But it didn’t look good, so I tried different WebP quality levels. Still not great. I switched back to PNG. That wasn’t much better either. After half an hour of back-and-forth tinkering, I finally landed back on WebP.

At this point, I was basically recreating the entire blog optimization journey _while writing about it._ The irony wasn’t lost on me.

---

## What I Learned (and Why It Was Still a Waste)

Here’s the twist: I actually learned a lot.

- I picked up Hugo and explored the quirks of static site generators.
- I discovered the caveats of Cloudflare Rocket Loader and fiddled with netlify-style `_headers` files until they worked.
- I played with PostHog and got a crash course in Lighthouse metrics.
- I even learned a thing or two about HTTP headers.
- And yes, I learned way more about Hugo’s image pipeline than I ever planned to.

But here’s the thing: that wasn’t the goal. A waste is still a waste, even if it’s an _educational_ one. My goal was to start writing, not to become a web optimization guru.

---

## The Real Lesson

If you’re starting a blog, don’t do what I did. Forget the metrics, the hosting debates, and the endless optimizations. Start with content. Write something. Anything. It doesn’t need to be perfect—it just needs to exist.

The truth is, no one comes to your blog to admire your perfect PageSpeed score. They come to read your ideas. So, focus on those first. The rest? Save it for later.

Oh, and if you hear that little voice of doubt—the one that says, “You’re not good enough” or “What do you have to contribute?”—ignore it. Just write. Trust me, the world doesn’t need another perfectly optimized blank blog.
