# Personal Site

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Latest release](https://img.shields.io/github/v/tag/equero/personal-site?label=release&color=green)](https://github.com/equero/personal-site/tags)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://equero.dev)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)

A fast, static personal site with a blog, a portfolio, notes and a printable resume. Everything is Markdown, there is no database and no CMS, and every page is plain HTML at build time.

**[Live site: equero.dev](https://equero.dev)**

![Screenshot](./public/screenshot.png)

It's my own site, but it's built to be copied. Change one config file, replace the Markdown in `src/content/`, and you have yours. See [Make it your own](#make-it-your-own).

## Features

**Writing**

- **Blog** with tags, pagination, posts grouped by year, a table of contents and syntax highlighting ([Shiki](https://shiki.style/)).
- **Read time calculated automatically** from the word count (200 words per minute). You can override it per post.
- **Drafts:** set `draft: true` and the post stays out of pages, feeds, search and the sitemap.
- **Notes:** short updates. A starred note shows as a dismissible banner, and once you close it, it stays closed.
- **Full-text RSS** for posts (the whole article, not just a summary) and an RSS feed for notes.

**Sharing and SEO**

- **One Open Graph image per post, generated at build time.** No design tool, nothing to upload. See [Open Graph images](#open-graph-images).
- Open Graph and X/Twitter meta tags, canonical URLs and JSON-LD structured data (`BlogPosting`, `Person`, `WebSite`).
- Sitemap and `robots.txt`.

**Portfolio and resume**

- **Portfolio** of projects with logos, tech stack, version, changelog and an activity chart. Private repos show a notice instead of a broken link.
- **Resume** built from Markdown (experience, skills, honors), with a **print/PDF version** you can download as your CV.

**Everything else**

- **Static search** with [Pagefind](https://pagefind.app/). The index is built after the site, and search runs fully in the browser.
- Link prefetching, a mobile menu, scroll-to-top, and self-hosted JetBrains Mono fonts.
- Security headers (CSP, `X-Frame-Options`, `Permissions-Policy`…) and long-term caching in `vercel.json`.
- Vercel Web Analytics and Speed Insights (optional, see below).
- About 250 unit tests with [Vitest](https://vitest.dev/), linting with [Biome](https://biomejs.dev/), and type checks with `astro check`.

## Tech stack

| Area | Tool |
|---|---|
| Framework | [Astro](https://astro.build/) (static output) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styles | [Tailwind CSS](https://tailwindcss.com/) 4 + Typography |
| Content | Astro content collections (Markdown + Zod schemas) |
| Search | [Pagefind](https://pagefind.app/) |
| OG images | [Satori](https://github.com/vercel/satori) + [sharp](https://sharp.pixelplumbing.com/) |
| Tests / lint | [Vitest](https://vitest.dev/) / [Biome](https://biomejs.dev/) |
| Hosting | [Vercel](https://vercel.com/) |

## Getting started

You need **Node.js 24** (LTS) and **pnpm**. The exact pnpm version is pinned in `package.json` (`packageManager`), so [Corepack](https://nodejs.org/api/corepack.html) or [mise](https://mise.jdx.dev/) will pick it up.

```bash
git clone https://github.com/equero/personal-site.git
cd personal-site
pnpm install
pnpm dev          # http://localhost:4321
```

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with hot reload |
| `pnpm host` | Same, but reachable from other devices on your network |
| `pnpm build` | Type check, build the site, then build the search index |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Vitest in watch mode with its web UI |
| `pnpm test:run` | Run the tests once in the terminal |
| `pnpm coverage` | Tests + coverage report in `coverage/` |
| `pnpm lint` | Biome lint |
| `pnpm search:build` | Rebuild only the Pagefind index (see [`scripts/README.md`](./scripts/README.md)) |

Search only works after `pnpm build`, because the index is created from the built HTML. In `pnpm dev` the search box has no index to read.

## Make it your own

1. **Site details:** edit [`src/site.config.ts`](./src/site.config.ts). It holds your name, job title, URL, locale, social links, location, availability for work and the menu. Most of the site reads from here, including the meta tags, the feeds and the Open Graph images.
2. **Site URL:** set `site` in [`astro.config.mjs`](./astro.config.mjs) and the `Sitemap:` line in [`public/robots.txt`](./public/robots.txt).
3. **Content:** replace the Markdown in `src/content/`. Each folder is a collection, checked by the schemas in [`src/content.config.ts`](./src/content.config.ts), so a typo in frontmatter fails the build with a clear message instead of breaking a page.

   | Folder | What it is |
   |---|---|
   | `posts/` | Blog posts |
   | `notes/` | Short notes (`starred: true` shows a banner) |
   | `portfolio/` | Projects (logos go in `public/portfolio/logos/`) |
   | `resume/` | One file per job |
   | `skills/` | Skill groups for the resume |
   | `honors/` | Awards and recognitions |
   | `tags/` | Optional title and description for a tag page |

4. **Images:** replace `public/logo.png` (default share image), `public/favicon.svg` and `public/screenshot.png`.
5. **Colors and fonts:** the theme lives in [`src/styles/global.css`](./src/styles/global.css) (`--primary`, `--secondary`, `--bg`…). If you change them, update the palette at the top of `src/utils/og-image.ts` too, so the share images match.
6. **Not on Vercel?** Change the adapter in `astro.config.mjs`, remove `<Analytics />` and `<SpeedInsights />` from [`src/layouts/base-layout.astro`](./src/layouts/base-layout.astro), and move the headers in `vercel.json` to your host's format. If you add other third-party scripts, update the Content Security Policy as well.

### Writing a post

Create `src/content/posts/YYYYMMDD-some-slug.md`:

```markdown
---
title: "My first post"
publishDate: "2026-10-29T10:00:00.000Z"
slug: "my-first-post"
description: "One or two sentences. Used in the post list, meta tags and RSS."
tags: ["astro", "opinion"]
featured: false
draft: false
# readTime: 5        # optional, overrides the estimate
# updatedDate: "..." # optional, shows an "Updated" badge
---

## Your first heading

Write in Markdown.
```

The URL is `/posts/<slug>/`, and the post gets its own share image at `/og/<slug>.png` automatically.

## Open Graph images

When someone shares a post on X, LinkedIn, Slack, WhatsApp and so on, the preview shows an image. Every post here gets its own image, **generated automatically during `pnpm build`**. You never draw, export or upload anything.

**How it works**

1. [`src/pages/og/[slug].png.ts`](./src/pages/og/%5Bslug%5D.png.ts) is an Astro endpoint. Its `getStaticPaths()` returns one route per published post, so the build creates one `/og/<slug>.png` file per post, the same way it creates one HTML page per post.
2. For each post, it calls `renderOgImage()` in [`src/utils/og-image.ts`](./src/utils/og-image.ts) with the post's title, date, read time and tags.
3. That function describes the layout with flexbox styles (the green bar, `~/equero.dev_`, the title, the date and read time, the tags and the author). [Satori](https://github.com/vercel/satori) turns that into an SVG, and [sharp](https://sharp.pixelplumbing.com/) converts it into a 1200×630 PNG.
4. The post page passes `/og/<slug>.png` to the SEO component, which writes it into `og:image` and `twitter:image`.

The images are plain files in the build output, so they cost nothing at runtime and work on any static host. Adding a post adds an image. Changing a title changes the image on the next build.

**To change the design**, edit `src/utils/og-image.ts`: the `colors` object at the top and the layout inside `renderOgImage()`. To preview your changes, run `pnpm build` and open the PNGs in `dist/og/`, or run `pnpm preview` and visit `http://localhost:4321/og/<slug>.png`.

A few Satori rules to know (it supports a subset of CSS):

- Every element with more than one child needs `display: "flex"`.
- Fonts must be `.ttf`, `.otf` or `.woff`, **not `.woff2`**. That's why the image uses JetBrains Mono from `@fontsource/jetbrains-mono` instead of the `.woff2` files in `public/fonts/`. If you change the font, change both.
- Padding is added to fixed sizes, so let flex children grow (`flexGrow: 1`) instead of giving them a fixed `width` and `height` along with padding.

Pages that aren't posts use `public/logo.png`.

## Project structure

```text
/
├── public/                 # Static files: fonts, logo, favicon, portfolio logos
├── scripts/                # Build scripts (Pagefind index), see scripts/README.md
├── src/
│   ├── components/         # Astro components (SEO, search, TOC, charts…)
│   ├── content/            # Markdown content collections
│   ├── content.config.ts   # Schemas for every collection
│   ├── icons/              # SVG icons, imported with @/icons/...
│   ├── layouts/            # Base layout and print layout
│   ├── pages/              # Routes, RSS feeds and the /og/ image endpoint
│   ├── scripts/            # Client-side scripts
│   ├── styles/             # Tailwind and component CSS
│   ├── types/              # TypeScript types
│   ├── utils/              # Data helpers (posts, notes, read time, OG images…)
│   └── site.config.ts      # Your name, links and site settings
├── tests/unit/             # Vitest tests, mirroring src/
├── astro.config.mjs
└── vercel.json             # Security headers and caching
```

Imports always use the `@/` alias (`@/utils/post`, `@/components/seo.astro`), never relative `../` paths, so files can move without breaking imports.

## Releases

Work happens on `develop`, and `master` holds releases. Releases are done with [synkro](https://github.com/equero/synkro):

```bash
synkro status                  # what the next release would contain
synkro sync --patch --dry-run  # show what would happen, change nothing
synkro sync --patch            # merge develop into master, bump patch, tag, push
synkro sync --no-tag           # merge and push without a new version
```

Each release is a single merge commit on `master` that also carries the new version, tagged `vX.Y.Z` with a changelog. `develop` is fast-forwarded to it afterwards.

## Contributing

Issues and pull requests are welcome.

1. Fork the repo and branch off `develop`.
2. Make your change, and add tests for new logic.
3. Run `pnpm lint`, `pnpm test:run` and `pnpm build`.
4. Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`…).
5. Open a pull request against `develop`.

For big changes, please open an issue first so we can talk about it.

## License

[GNU General Public License v3.0 only](./LICENSE). You can use, change and share this code, including commercially. If you distribute a modified version, it must also be GPL-3.0 and include its source.

If you reuse the project, please replace my content (posts, resume, portfolio, notes and logo) with your own.

## Acknowledgments

- [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus) by [Chris Williams](https://github.com/chrismwilliams), which inspired the first version of this site.
- The [Astro](https://astro.build/) team and everyone behind the tools listed above.

---

Made by [Enrique Quero](https://equero.dev) · [GitHub](https://github.com/equero) · [LinkedIn](https://www.linkedin.com/in/equerodev/)
