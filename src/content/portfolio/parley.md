---
title: "Parley"
date: "2026-06-29T00:00:00.000Z"
description: "My personal library of reusable components, built with native Web Components so I can drop them into any of my apps. Free software, released under the GNU GPL."
technologies: ["TypeScript", "Web Components", "npm"]
logo: "/portfolio/logos/parley.svg"
github: "https://github.com/equero/parley"
demo: "https://www.npmjs.com/package/@equerodev/parley"
license: "GPL-3.0"
licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
featured: false
order: 5
version: "0.3.0"
changelog:
  - version: "0.3.0"
    date: "2026-11-25T00:00:00.000Z"
    changes:
      - "Built with TypeScript 7, the new native compiler; the published code is unchanged"
  - version: "0.2.5"
    date: "2026-10-13T00:00:00.000Z"
    changes:
      - "Regenerated the Custom Elements Manifest so it matches the new site-footer API"
  - version: "0.2.4"
    date: "2026-10-13T00:00:00.000Z"
    changes:
      - "Moved to the @equerodev/parley package on npm"
      - "site-footer no longer ships any text of its own: the name links only when href is set, the copyright line is a template with a neutral default, and the tagline hides while empty"
      - "The hover reveal is now opt-in with reveal=\"hover\"; CSS parts and a --hover-background property were added"
      - "Importing parley on the server no longer throws"
  - version: "0.2.3"
    date: "2026-07-02T00:00:00.000Z"
    changes:
      - "The site-footer name now links to the external portfolio instead of a relative /about page"
  - version: "0.2.1"
    date: "2026-07-01T00:00:00.000Z"
    changes:
      - "Added an AI-readable documentation layer: Custom Elements Manifest, an llms.txt index, and per-component docs"
      - "Documented site-footer attributes, slots, and CSS custom properties from JSDoc annotations"
      - "Added release scripts for patch, minor, and major publishing"
  - version: "0.1.2"
    date: "2026-06-30T00:00:00.000Z"
    changes:
      - "Added --link and --link-hover CSS custom properties to site-footer"
      - "Removed the default underline from the name link"
  - version: "0.1.0"
    date: "2026-06-29T00:00:00.000Z"
    changes:
      - "First release published to npm"
      - "Added the site-footer element with copyright presets, custom templating, and a hover-reveal tagline"
      - "Encapsulated styling behind a shadow root, themeable through CSS custom properties"
---
