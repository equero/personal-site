---
title: "Synkro"
date: "2026-10-10T00:00:00.000Z"
description: "A small CLI that keeps develop and main in sync. One command merges develop into main, bumps the version with semver, tags the release with a changelog and pushes it. No git hooks, no extra bump commits, zero dependencies."
technologies: ["TypeScript", "Node.js", "Git", "npm"]
logo: "/portfolio/logos/synkro.svg"
github: "https://github.com/equero/synkro"
demo: "https://www.npmjs.com/package/@equerodev/synkro"
license: "GPL-3.0"
licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
featured: false
status: "wip"
order: 8
version: "0.2.2"
changelog:
  - version: "0.2.2"
    date: "2026-10-12T00:00:00.000Z"
    changes:
      - "synkro sync pushes main, develop and the tag one at a time, so hosts like Vercel no longer start two deployments of the same commit at once; if a push fails, it lists what was already pushed and how to finish"
  - version: "0.2.1"
    date: "2026-10-10T00:00:00.000Z"
    changes:
      - "Published on npm as @equerodev/synkro"
  - version: "0.2.0"
    date: "2026-10-10T00:00:00.000Z"
    changes:
      - "First release: synkro init creates main and develop if they are missing and pushes them, even right after git init"
      - "synkro sync merges develop into main in a single merge commit that also carries the new version, tags it vX.Y.Z with a changelog, fast-forwards develop and pushes everything"
      - "Patch, minor or major bumps, plus a dry run that shows what would happen without changing anything"
      - "synkro status shows both branches, the current version, the last tag and what the next release would contain"
      - "Works with main or master, reads its settings from package.json or .synkrorc.json, and takes the version from git tags when there is no package.json"
---
