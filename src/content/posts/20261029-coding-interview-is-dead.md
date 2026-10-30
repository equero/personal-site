---
title: "The Coding Interview Is Dead, and a Model Killed It"
publishDate: "2026-10-29T10:00:00.000Z"
slug: "coding-interview-is-dead"
description: "Two months ago I called the LeetCode loop a toll booth that measures stress. This week an engineer at Anthropic removed the coding interview from their team's loops because it 'no longer provides signal'. Thirteen years of research didn't kill the format. Free puzzles did."
tags: ["opinion", "industry", "hiring", "interviews", "leetcode", "careers", "ai", "anthropic"]
featured: true
draft: false
---

## I said one meeting. Somebody had the meeting.

Back in August I wrote [A Year of LeetCode for a Job You Will Never Use It In](/posts/tech-interviews-leetcode-theater/). Long post, lots of angry footnotes. In short: we make people grind algorithm puzzles for months, the research says the format mostly measures how you handle being watched, and in 2026 those puzzles are the one part of the job a model does perfectly.

I ended it saying the whole thing was "one meeting away from changing at any given company". Somebody just had to say it out loud.

Well. Somebody said it out loud.

## The tweet

On October 27, [Felix Rieseberg](https://x.com/felixrieseberg) posted this:

> "The coding interview is dead, at least for my team at Anthropic. I've seen enough to know that it no longer provides signal. I removed it from loops this month.
>
> I have a spicy, optimistic take - I think there's an opportunity for junior engineers"

If you don't know the name: Felix is one of the maintainers of [Electron](https://www.electronjs.org/), the thing half the desktop apps on your machine are secretly built on, and is now building things at Anthropic. Not an influencer selling a course. Someone who hires engineers and has to live with who they hire.

Read the wording again, because it's very careful:

- **"at least for my team"**. Not Anthropic as a company. One team.
- **"I've seen enough"**. Not a theory. They ran the interviews and watched them stop working.
- **"no longer provides signal"**. That's the important part. More on it in a second.
- **"this month"**. Not a five-year plan. Done.

This isn't a press release or an HR initiative with a slide deck. It's one person who runs a loop deciding the loop is broken and fixing it. Which is exactly how I said this would change. Nobody waits for a mandate. A team lead just stops doing the stupid thing.

## "No signal" is a different argument

Here's what I think matters most, and why this tweet hits different from the hundred blog posts (mine included) complaining about LeetCode.

My August post was mostly a fairness argument. It's stressful. It's a tax on people with kids and no free evenings. It filters on memorisation. The [Behroozi study](https://dl.acm.org/doi/10.1145/3368089.3409712) showed people perform about twice as well when nobody is watching. All true, all ignored for years. Fairness arguments are easy to ignore when the process feels objective and nobody gets fired for rejecting a good candidate.

"No signal" is not a fairness argument. It's a measurement argument. And companies care a lot more about measurement than fairness, sadly.

Think about what a test is for. A test is useful when different people get different results and those results tell you something. If every candidate has a model that solves Two Sum in three seconds, then everybody passes. A test that everybody passes doesn't measure anything. Or worse, it measures who is better at hiding the second monitor.

That's the proctoring arms race I complained about last time: eye tracking, second camera on your desk, "focus loss" detection, and on the other side a whole startup genre selling invisible AI help during interviews. That whole war was about protecting a signal. Now someone at one of the labs that *makes* the models is saying there's no signal left to protect. Kind of hard to keep selling eye-tracking software after that.

And honestly there's something funny about who said it. The company whose product broke the coding interview is the first one to stop pretending it isn't broken. Of course it is. They know better than anyone what the model can do in a 45 minute window.

## So what does the interview turn into?

This is the paradigm shift, and it's bigger than "no more LeetCode".

For decades the technical interview tested one thing: **can you produce code?** Write the function, make it pass, explain your Big O. That made some sense when producing code was the expensive part of the job.

It isn't anymore. Producing code is cheap now. I have three agents doing it in other tabs while I write this. What's expensive is everything around the code:

- Knowing if the code is actually right, or just looks right.
- Noticing the subtle bug the model wrote with total confidence.
- Knowing what to build in the first place, and what not to build.
- Reading a codebase you didn't write and understanding why it's weird.
- Saying "no, this is a bad idea" to a person, or to a model.

So the interview has to move from *producing* to *judging*. In practice that looks like stuff I listed back in August:

**Review a real PR.** Here's a diff with two problems in it. Find them. Use whatever tools you want. If the model finds them for you, great, now tell me if it's right.

**Go deep on something you built.** Forty-five minutes on a project you actually shipped. Why this database? Why not the other way? What broke? You can't fake that with a second monitor.

**Work with the tools, out loud.** This is the new one. Let the candidate use AI openly and watch *how*. Do they accept the first answer? Do they read what it generated? Do they test it? Do they notice when it's confidently wrong? That tells you more about how someone will work on Monday than any whiteboard ever did.

The funny thing is none of this is new. Work samples have been the best predictor in the selection research since the 90s. We just had a cheaper option that felt objective, so we kept it. The cheap option stopped working, so now we have to do the good one. I'll take it.

## The junior part

Felix says there's a "spicy, optimistic take" in this for junior engineers, and links a post called [Hunger beats tenure: Advice for junior engineers](https://felixrieseberg.com/hunger-beats-tenure-advice-for-junior-engineers/). Go read it, it's their argument and they should make it. I'll just give you mine.

My first reaction was actually worry. In August I said new grads are *better* at LeetCode than people with ten years of experience, because they did it last semester. The coding interview was weirdly the one place where being junior was an advantage. Now that's gone, and if the new interview is about judgment, well, judgment is the thing juniors have the least of. By definition. The scary version of this future is companies just not hiring juniors at all and asking the agents to do the junior work.

But the title gets at why I don't think it has to go that way. Tenure used to be how you got judgment. You saw enough things break over enough years and you learned. That was slow because trying things was slow. Every experiment cost you a week.

It doesn't cost a week anymore. A hungry junior today can build five weird side projects with an agent in a month, watch them break in ten different ways, and actually understand why. That's not the same as ten years of production pager duty, I'm not going to pretend it is. But it's a lot more than a junior could get in a month in 2015. And it's exactly the kind of thing you can talk about for forty-five minutes in an interview without a second monitor.

The grind rewarded people with free time to memorise. What comes next rewards people who build things and are curious about why they break. I know which one I'd rather compete in if I was 22.

## Don't delete your NeetCode list yet

Let's be realistic. This is one team. "At least for my team" is right there in the tweet.

Everything I said about why the format survives is still true. It's cheap. It produces a number. A number makes a decision defensible. Big companies with hiring committees and standardised rubrics move very slowly, and they're going to keep running the old loop for a while, probably with more proctoring, not less.

So the next couple of years will be a mess. Some companies will let you use AI and watch how. Some will drag you onsite so you *can't* use it. Some will keep the exact same loop and pretend nothing happened. You'll need to ask the recruiter which one you're walking into.

If you're job hunting right now, my honest advice: do some of the grind, because rent is still due and plenty of loops still use it. But put more of your time into things you can go deep on. One project you really understand beats 150 problems you memorised. That was already true. Now it's starting to also be true in the interview.

## What I actually think

I'm happy about this. I'm also a bit annoyed.

Laszlo Bock said brainteasers were useless back in 2013. Max Howell got rejected by Google over a binary tree in 2015. The stress research came out in 2020. None of that moved anything. We didn't fix the coding interview because it was unfair, or because the research said so, or because it pushed good people out. We fixed it, a little, in one team, because a machine made the puzzles free and the test stopped working.

That's kind of embarrassing for us as an industry. But fine. I'll take the win however it shows up.

If you run hiring, here's a small experiment. Next loop, drop the coding round. Put a code review in its place. See if you miss it.

My bet is you won't.

---

## References

- [Felix Rieseberg on removing the coding interview, October 27, 2026](https://x.com/felixrieseberg/status/2115200995546566910)
- [Hunger beats tenure: Advice for junior engineers - Felix Rieseberg](https://felixrieseberg.com/hunger-beats-tenure-advice-for-junior-engineers/)
- [A Year of LeetCode for a Job You Will Never Use It In - my previous post](/posts/tech-interviews-leetcode-theater/)
- [Does Stress Impact Technical Interview Performance? - Behroozi et al., ESEC/FSE 2020](https://dl.acm.org/doi/10.1145/3368089.3409712)
- [The Validity and Utility of Selection Methods in Personnel Psychology - Schmidt & Hunter, 1998](https://psycnet.apa.org/record/1998-10661-006)
- [In Head-Hunting, Big Data May Not Be Such a Big Deal - Laszlo Bock, New York Times, 2013](https://www.nytimes.com/2013/06/20/business/in-head-hunting-big-data-may-not-be-such-a-big-deal.html)
- [Max Howell on being rejected by Google, June 2015](https://x.com/mxcl/status/608682016205344768)
