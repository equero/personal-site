# Scripts

This directory contains utility scripts for automating various tasks in the project lifecycle, such as the search index build. Releases are handled by [synkro](https://github.com/equero/synkro), see the [project README](../README.md#releases).

## Available Scripts

### `build-search.mjs`

Generates the search index for the static site using Pagefind.

**Purpose:**

- Scans HTML files in the build output
- Creates a searchable index for fast client-side search
- Automatically detects Vercel or dist build directories

**Usage:**

```bash
pnpm search:build
```

**When it runs:**

- Automatically after the build process
- Can be run manually for debugging

**Output:**

- Creates search index in the build directory
- Enables instant search functionality on the site

---

## Development

All scripts are written in ES modules (`.mjs`) and use Node.js built-in modules for maximum compatibility.

**Testing scripts:**

```bash
# Test individual scripts
node scripts/build-search.mjs
```

**Debugging:**

- Scripts output colored emoji indicators for status
- Check script exit codes for automation integration
- Review console output for detailed progress

## Contributing

When adding new scripts:

1. Use `.mjs` extension for ES modules
2. Add proper error handling
3. Include descriptive console output with emojis
4. Document in this README
5. Add corresponding npm script in `package.json`

---

**See also:**

- [Project README](../README.md) - Main project documentation
