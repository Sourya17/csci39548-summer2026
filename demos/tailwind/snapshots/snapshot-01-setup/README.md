# Snapshot 01 — Tailwind setup

## What's new

- `package.json` has `tailwindcss` and `@tailwindcss/vite` in devDependencies.
- `vite.config.ts` adds the `tailwindcss()` plugin.
- New file: `src/index.css` with one line — `@import "tailwindcss";`.
- `main.tsx` imports `./index.css`.
- `App.tsx` adds Tailwind classes to ONE element (the `<h1>`) — `text-4xl font-bold text-blue-600`. Everything else is still the unstyled / inline-styled version from React snapshot 12.

## What to teach

- **Tailwind v4 setup is dead simple now** — no `tailwind.config.js`, no PostCSS config. Just the Vite plugin + one CSS import.
- Open browser. The `<h1>` is huge, bold, and blue. The rest of the page is the unstyled Todo app.
- That's the "before." Snapshot 02 is the "after."

## What students should install

- VS Code **Tailwind CSS IntelliSense** extension. Without it, class names are a guessing game.
