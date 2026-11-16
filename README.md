# The World Still Needs Your Kind of Human

A mobile-first interactive illustrated story built with React and Vite.

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
- `src/styles.css` — responsive watercolor / keepsake-journal design system
- `public/art/` — illustrated scene artwork
- `.github/workflows/` — build verification and GitHub Pages deployment

## Editing the story

Copy is currently in `src/main.jsx`. Replace artwork in `public/art/` while retaining filenames to preserve layout references.

## Deployment

The repository includes a GitHub Pages workflow. Enable Pages in repository settings with **GitHub Actions** as the build / deployment source.

A private source repository does not automatically make the hosted site private. Confirm the Pages visibility setting before publishing the gift.