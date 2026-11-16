# The World Still Needs Your Kind of Human

A mobile-first interactive illustrated story for Moupiya, built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

- `src/main.jsx` — story copy, chapter navigation and interactions
- `src/styles.css` — responsive watercolor/scrapbook design system
- `public/art/` — optimised illustration assets
- `.github/workflows/` — build verification and GitHub Pages deployment workflows

## Editing the story

All page copy and interactive states are intentionally easy to revise in `src/main.jsx`. Replace artwork in `public/art/` while retaining the current filenames to preserve layout references.

## Deployment

The project includes a GitHub Pages workflow. Enable Pages in repository settings with **GitHub Actions** as the deployment source. A private source repository does not guarantee a private hosted site; review Pages visibility before enabling deployment.
