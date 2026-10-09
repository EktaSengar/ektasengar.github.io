---
title: "The B2B SaaS Metrics That Actually Matter"
description: "Beyond vanity metrics: a framework for choosing the indicators that drive real business outcomes."
date: 2025-12-08
tags: ["B2B SaaS", "Analytics"]
featured: false
---

Every B2B SaaS company tracks metrics. Most track too many. The dashboard has 47 charts, the weekly review covers 12 KPIs, and nobody can explain which ones actually predict business outcomes. I've been in these meetings. They're a waste of everyone's time.

Here's what I've learned about metrics after working on several B2B products: the hard part isn't measurement. It's choosing what to measure. And the framework for choosing changes based on where your product is in its lifecycle.

## The problem with vanity metrics

A vanity metric is any number that goes up and to the right but doesn't connect to a business outcome. Total registered users is the classic example. It never goes down, even when your product is dying. But vanity metrics are more subtle than that. Even "good" metrics become vanity metrics when they're disconnected from your current business context.

DAU is a great metric for a consumer social app. For an enterprise B2B tool used weekly by 3 people per account, it's meaningless. NPS is useful for tracking customer sentiment trends, but it's a terrible metric for a feature launch because it moves too slowly and is influenced by too many factors.

## Leading vs. lagging indicators

The most important distinction in B2B SaaS metrics is between leading and lagging indicators:

- **Lagging indicators** tell you what already happened: revenue, churn rate, NPS. They're useful for reporting but useless for decision-making because by the time they move, it's too late to change course.
- **Leading indicators** predict what will happen: feature adoption in week 1, support ticket volume, time-to-value for new accounts. These are the metrics that let you intervene before problems become permanent.

The goal of a good metrics framework is to identify the leading indicators that are most predictive of the lagging outcomes you care about. This is harder than it sounds because the relationship between leading and lagging indicators changes as your product matures.

## Metrics by product stage

The right metrics depend heavily on where your product is. Here's how I think about it:

### Pre-product-market-fit (0 to ~$1M ARR)

At this stage, the only metric that matters is whether a small number of users are getting intense value. Retention is the signal. Specifically:

- **Activation rate:** What percentage of new signups reach the "aha moment"?
- **Week-4 retention:** After the novelty wears off, are users still coming back?
- **Qualitative signal:** Are users saying "I'd be very disappointed if this went away"? (The Sean Ellis test)

At this stage, don't track revenue metrics, conversion funnels, or growth rates. Those metrics will actively mislead you because your sample sizes are too small and your product is changing too fast.

### Post-PMF growth ($1M to ~$10M ARR)

Now efficiency matters. You've proven the product works; the question is whether you can scale the business:

- **Net revenue retention (NRR):** Are existing customers expanding faster than they're churning? 100%+ means your product grows even without new customers.
- **Time to value (TTV):** How quickly do new customers reach first meaningful outcome? This is the #1 lever for reducing early churn.
- **CAC payback period:** How many months does it take to recoup customer acquisition costs? This tells you how aggressively you can invest in growth.

### Scale ($10M+ ARR)

At scale, the metrics become more operational and segmented:

- **Gross margin:** Can you deliver your product efficiently? Infrastructure costs, support costs, and professional services all eat into margin.
- **Logo churn vs. revenue churn:** Are you losing small customers (normal) or large ones (emergency)?
- **Expansion revenue as % of new ARR:** Healthy B2B SaaS companies get 30 to 50% of new ARR from existing customers.

## The north star metric trap

A lot of product writing advocates for a single "north star metric." In theory, it creates focus. In practice, a single metric creates perverse incentives and blind spots.

I prefer a north star metric paired with 2 or 3 guardrail metrics. The north star is what you're optimizing for. Guardrails are what you're protecting. For example: north star = weekly active reports created (measures core value delivery). Guardrails = report load time under 2 seconds (quality), support tickets per 100 users (usability), data accuracy rate (trust).

The north star tells you if you're winning. The guardrails tell you if you're winning sustainably.

## Practical advice

A few principles I come back to when setting up metrics for a product or feature:

- **If you can't explain why a metric matters in one sentence, drop it.** Every metric should have a clear connection to a business outcome.
- **Instrument before you ship.** Deciding what to measure after launch means you'll never have clean baseline data.
- **Review less, but deeper.** A weekly 30-minute deep dive on 3 metrics beats a daily scan of 15 dashboards.
- **Segment everything.** Aggregate metrics hide the story. Break down by customer size, cohort, plan tier, geography. The average is almost never the answer.
- **Set alerts on leading indicators.** If week-1 activation drops 10%, you want to know immediately, not in next month's business review.

## The bottom line

The best metrics frameworks are simple, stage-appropriate, and action-oriented. They tell you what's happening, why it's happening, and what to do about it. If your metrics don't lead to decisions, they're decoration.
