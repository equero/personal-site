---
title: "Chrome Wrote a Skill So Your AI Agent Stops Coding Like It's 2019"
publishDate: "2026-11-24T10:00:00.000Z"
slug: "chrome-modern-web-guidance-ai-agents"
description: "Coding agents learned the web from years of old tutorials, so they still reach for JavaScript modals and vendor-prefixed CSS. The Chrome team now ships Modern Web Guidance, a set of skills that points them at today's platform. I installed it, read the files, and ran its legacy scanner on this site."
tags: ["ai", "frontend", "web development", "web standards", "css", "javascript", "tools"]
featured: false
draft: false
---

## My agent writes modals like it's 2016

Ask a coding agent for a modal and there's a good chance you get the classic: a `div` with `position: fixed`, another `div` for the backdrop, a `keydown` listener for Escape, a focus trap that almost works, and a `z-index: 9999` just in case.

It works. It also ignores that `<dialog>` has been Baseline since 2022. Call `showModal()` and the browser makes the rest of the page inert, keeps focus inside, closes on Esc, puts the dialog in the top layer and gives you `::backdrop` to style. All the stuff we used to write by hand. Popovers have been native in every major browser since early 2025 too.

I don't really blame the models. They learned from everything people wrote about the web, and most of it was written before these features existed. There are more than ten years of posts about JavaScript modals and only a few about `<dialog>`. Guess which one wins.

I've covered a few new platform features here, like [corner-shape](/posts/css-corner-shape-geometric-shapes-guide/), [grid-lanes masonry](/posts/css-masonry-grid-lanes-native-layout/), [flex-wrap: balance](/posts/css-flex-wrap-balance-last-row-problem/) and the [Temporal API](/posts/temporal-api-javascript-date-handling-solution/). And every time I thought the same thing: cool, so how many years until my agent stops writing the 40-line workaround?

Looks like the Chrome team was thinking the same.

## What Modern Web Guidance is

[Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/get-started) is a set of agent skills from the Chrome team, on GitHub at [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance). Before your agent writes HTML, CSS or client-side JS, it looks up how to do that thing today, with browser support data, instead of going from memory.

It's not only for Claude. The repo has plugin files for Claude Code, Codex, Copilot, Gemini, Cursor and a couple more. License is Apache-2.0.

I use Claude Code, so for me it was two commands:

```bash
claude plugin marketplace add GoogleChrome/modern-web-guidance
claude plugin install modern-web-guidance@googlechrome
```

Chrome's page actually recommends `npx modern-web-guidance@latest install` instead, because that version updates itself. I went with the plugin because I keep my Claude config in my dotfiles and wanted it in the same place.

## What's inside

I read a few news posts about it first, and they couldn't agree on how big it is. The numbers I saw went from about 100 to "200+". So I just opened the folder.

Version 1.0.2 has 211 Markdown guides in 17 folders: `css`, `html`, `js`, `forms`, `accessibility`, `performance`, `security`, `privacy`, `pwa`, `ui-components`, `ui-behaviors`, `ui-atoms`, `visual-design`, `user-experience`, `built-in-ai`, `wasm` and `webmcp`. Some of those files are general ones (there's a `css.md` and a `js.md`), so "211 use cases" would be a stretch. Still, it's a lot.

A few that caught my eye:

- `animate-to-intrinsic-sizes`: animating to `height: auto`, with `interpolate-size` and `calc-size()`. Finally.
- `size-aware-styling`: container queries.
- `scroll-progress-indicator`: a progress bar with `animation-timeline: scroll()`. No scroll listener.
- `style-parent-with-has`: styling a form group when a field inside it is invalid.
- `position-aware-tooltips` and `viewport-aware-dropdowns`: anchor positioning. More on that below, because it's less ready than I thought.
- `agentic-forms`: WebMCP, so other people's agents can use the forms on *your* site.

There's also a second, separate skill just for Chrome extensions.

## How it works

I expected one huge prompt with all 211 guides in it. That would eat a big chunk of your context before you write anything. It's not that.

The `SKILL.md` tells the agent to call a small CLI. First search, then fetch only what matches:

```bash
npx -y modern-web-guidance@latest search "light dismiss dialog"
npx -y modern-web-guidance@latest retrieve "<id>"
```

So it's retrieval, packaged as a skill. The agent loads the guides for the task at hand and that's it.

The search rules are more specific than I expected. Two to five words, describe the capability, no framework names, no names from your app. Their own example is to search for `"light dismiss dialog"` and not `"close React settings modal on outside click"`. And if the user asks for something like "delete with confirmation", the agent should search for `"confirm dialog"`. The guides are about the platform piece, not your product.

The skill description doesn't try to be subtle either:

> MANDATORY: Execute FIRST for all HTML/CSS and clientside JS tasks. Do NOT skip — web APIs evolve rapidly and training weights contain obsolete patterns.

Basically a tool telling the model its own memory is out of date. Which, to be fair, it is.

It also has a list of when *not* to run: SQL, ORMs, Docker, CI, GitHub Actions, Vite config, tests. Makes sense. I don't need a lecture on popovers while I fix a YAML file.

## Baseline decides what's "safe"

The guides include support data from [Baseline](https://web.dev/baseline). By default the agent treats anything **Baseline Widely available** as safe to use without fallbacks. For newer stuff it has to follow the fallback in the guide.

You can change the target per project with one line in `CLAUDE.md` or `AGENTS.md`:

```markdown
This project's Baseline target is Baseline 2024.
```

Then any feature that became Baseline in 2024 or before is fair game. You can also describe your rules in plain words, like "Safari 17.4+" or "never implement polyfills". And if you build for Electron or Tauri, the skill tells the agent to suggest writing a policy down, which makes sense when you know exactly which engine you ship.

For me this is what makes it useful. Anyone can say "use modern CSS". Knowing if a feature is safe for *your* users needs data, and the guides have it.

Anchor positioning is a good example. I would have told you it's ready. The tooltip guide says no: it's still **Limited availability**, with Chrome and Safari 27 listed but no Firefox yet. So the agent has to add a fallback. My guess is that without the skill, an agent would either use it with no fallback or pull in a positioning library. Neither is great.

## It shows its work

After using a guide, the agent has to end its answer with a "Modern Web Guidance" section: which guide it used, and a short quote of the rule it followed. So if it uses `@starting-style` for an entry animation, you see why, and you can check the quote against the guide yourself.

## It has a legacy scanner

`legacy-scan <path>` looks for old patterns in an existing codebase. The skill says up front that it only covers about 20% of the guides, the ones with rules simple enough to detect automatically. Each finding comes with a list of when to keep it and when to drop it, and the agent has to go through that before changing anything.

Of course I ran it on this site.

```bash
npx -y modern-web-guidance@latest legacy-scan src --json
```

71 files checked, 52 rules from 38 guides, **7 findings**. I was expecting worse, honestly.

### The scrollbar (3 findings, fair)

The table of contents on my posts has a thin custom scrollbar:

```css
table-of-contents nav::-webkit-scrollbar {
  width: 2px;
}

table-of-contents nav::-webkit-scrollbar-thumb {
  background: rgba(var(--primary), 0.3);
}
```

`::-webkit-scrollbar` only works in Chromium and Safari. In Firefox you just get the normal scrollbar. I had no idea.

The standard way:

```css
table-of-contents nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--primary), 0.3) transparent;
}
```

Firefox has supported both since 2018 and Chrome since early 2024 (version 121). Safari was the slow one: `scrollbar-width` in 18.2 and `scrollbar-color` only in 26.2, in December 2025. That made `scrollbar-color` Baseline, but only "newly available". My site uses the default target, Widely available, so the guide says to keep the `-webkit-` rules as a fallback for older browsers. But inside `@supports not (scrollbar-color: auto)`, so the two don't clash in browsers that know both.

It also warns about a detail I would have missed: if you set `scrollbar-width: thin`, reset it to `auto` inside that `@supports not` block. Otherwise a browser that knows `scrollbar-width` but not `scrollbar-color` ignores your WebKit styling.

I do lose two things. `thin` is as thin as the standard goes, so no more exact 2px. And there's no standard way to change the color of the thumb itself on hover. I'll survive.

### The JavaScript (4 findings, and here it gets interesting)

The other four:

- Two places where I copy an array with `[...]` only to `.sort()` it. Suggestion: `toSorted()`.
- A `for` loop and a `.reduce()` that group items into an object. Suggestion: `Object.groupBy()`.

They're good suggestions. `toSorted()` exists exactly for the copy-then-sort thing. And the `.reduce()` that groups my notes by year is about ten lines that become one:

```js
Object.groupBy(notes, (note) => new Date(note.publishDate).getFullYear());
```

But. Each finding comes with that keep/drop list, and the drop list for `toSorted()` says to drop it if the project's TypeScript `lib` is older than ES2023. For `Object.groupBy()` it's ES2024. My `tsconfig.json` says `"lib": ["es2022"]`. If I'd applied these blindly, the build would have failed on type errors.

So by its own rules, the scanner would drop all four. It only matches patterns. The agent is supposed to check them against your project, and the skill has a separate "verify" step for exactly this.

The fix is still easy. This code runs in Node, not in some old browser, and every current Node LTS has both methods. My `tsconfig` is just older than my runtime. Bump `lib` to `es2024` and all four suggestions are valid again.

### Result

7 findings. 3 correct, 4 correct once I change one line of config, none wrong. And it found a Firefox styling issue I didn't know about. Not bad for something that only checks a fifth of its own guides.

## What I'm not sure about

- **It runs `npx ... @latest` every time.** That needs network, and it means you trust whatever version is on npm today. If you run your agent with permissions (you should), allow that exact command and not `npx` in general. The skill tells you to do that itself, which I appreciate. Still, it's a supply-chain decision, so make it on purpose.
- **It's the Chrome team's view of the web.** It uses Baseline, which covers Chrome, Edge, Firefox and Safari, so it's not pushing Chrome-only features. But someone picked these 211 guides and decided what they say, and that someone works on Chrome.
- **Agents don't always follow instructions.** The skill only helps if the agent actually calls it. "MANDATORY" in capital letters helps. It's not a guarantee.

## Why I think it matters

New web features have always been slow to catch on. They ship, then developers slowly learn them, then tutorials appear, then codebases change. Years.

Now a lot of the code is written by agents, and agents learn from those same tutorials, so the wait gets even longer. You're not only waiting for people to catch up. You're waiting for the next model to be trained on enough examples.

This skips that part. When the Chrome team publishes a new guide, every agent with the skill can use it the next time it runs. No new model needed.

Browser teams used to write docs for us. Now they're also writing docs for the agents that write our code. And as long as the skill actually runs, the agents read them, which is more than I can say for most of us and MDN.

I'm keeping it.
