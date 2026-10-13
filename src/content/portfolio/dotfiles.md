---
title: "Dotfiles"
date: "2026-03-13T00:00:00.000Z"
description: "Personal configuration files synced across machines via Git. Includes Claude Code settings, custom commands, and shell configurations."
technologies: ["Bash", "Git", "Lua", "Node.js"]
logo: "/portfolio/logos/dotfiles.svg"
github: "https://github.com/equero/dotfiles"
license: "GPL-3.0"
licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
featured: false
order: 3
version: "0.4.2"
changelog:
  - version: "0.4.2"
    date: "2026-10-13T00:00:00.000Z"
    changes:
      - "Neovim is now the default editor, and the site highlights .bashrc and .gitconfig files"
      - "Claude Code settings add a patch-only release rule and an agent that runs synkro releases"
      - "Rewrote the README with an overview of every config and install notes"
      - "Author name and GitHub links moved to equero"
  - version: "0.4.1"
    date: "2026-10-11T00:00:00.000Z"
    changes:
      - "Added bash, git, kitty and mise configs, one folder per app"
      - "The install script links each config into place and backs up any existing file first; kitty is skipped on Windows"
  - version: "0.4.0"
    date: "2026-10-11T00:00:00.000Z"
    changes:
      - "Neovim config replaced: the Windows-only AstroNvim setup is gone, in its place a kickstart.nvim config built on Neovim's own plugin manager, with plugin versions pinned in a lock file"
      - "The Neovim config adds a file tree sidebar, per-project session restore and rendered Markdown, plus language servers for TypeScript, HTML, CSS, Tailwind and ESLint"
      - "A README for the Neovim folder lists everything a fresh Linux machine needs"
      - "The Claude Code status line now uses the Catppuccin Mocha palette and shows plan usage: the 5-hour limit with the time until it resets, and the 7-day limit"
      - "Fixed the context bar in the status line: it now uses the real context window size instead of a fixed 160k estimate"
      - "Fixed the status line crashing when installed from the repo"
  - version: "0.3.0"
    date: "2026-10-10T00:00:00.000Z"
    changes:
      - "Removed the git-flow template and the git-flow-init CLI: synkro takes over, and nothing is copied into other projects anymore"
  - version: "0.2.0"
    date: "2026-10-10T00:00:00.000Z"
    changes:
      - "The repo's own release script and git hooks were replaced by synkro, a CLI that merges develop into main, bumps the version and tags the release in one step"
  - version: "0.1.5"
    date: "2026-08-05T00:00:00.000Z"
    changes:
      - "Global Claude Code instructions and custom keybindings are now part of the repo and get symlinked on install"
      - "Added a commit-analyzer subagent that reads the diff and writes the conventional commit message"
      - "Synced the Claude settings actually in use: vim editor mode, fullscreen interface, medium effort level and the enabled plugins"
      - "Neovim now soft-wraps long lines at word boundaries and keeps the indentation on wrapped lines"
      - "Refreshed the README with the new files, the extra agent and a section describing the settings"
  - version: "0.1.4"
    date: "2026-06-30T00:00:00.000Z"
    changes:
      - "The sync script now warns instead of failing when main already contains everything from develop"
      - "Fixed develop being left behind after a release: the version bump is now fast-forwarded back automatically"
      - "Applied the same fix to the git-flow template shipped to other projects"
  - version: "0.1.1"
    date: "2026-05-12T00:00:00.000Z"
    changes:
      - "Added a browsable static site that renders the dotfiles tree, so they can be read without cloning the repo"
      - "Added AstroNvim configuration with a cross-platform installer"
      - "Added a set of Claude Code subagents routed to the cheapest capable model instead of running everything on the largest one"
      - "Added a git-flow bootstrap CLI that sets up the main/develop flow, hooks and version bumping in any project"
      - "Rewrote the statusline in Node.js so it works on Windows, macOS and Linux alike"
      - "Split the repo into dotfiles content and website, and published it under GPL-3.0"
  - version: "0.1.0"
    date: "2026-03-13T00:00:00.000Z"
    changes:
      - "Initial setup with Claude Code configuration, custom commands, and install script"
---
