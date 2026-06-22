# Tailwind Demo — CSCI 39548, Summer 2026

Restyling the React Todo app (from `react/snapshots/snapshot-12-useref/`) with Tailwind CSS v4. Three snapshots: setup, fully styled, dark mode.

This demo fills the **second half of Class 5** (~90 min). The React fundamentals fill the first half.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (same as React demo)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **No** `tailwind.config.js` — Tailwind v4 uses CSS-based config via `@theme` directive

## Folder layout

```
tailwind/
├── package.json, vite.config.ts, tsconfig.json, index.html
├── src/                          ← LIVE code (mirrors latest snapshot)
├── snapshots/
│   ├── snapshot-01-setup/
│   ├── snapshot-02-styled/
│   └── snapshot-03-dark-mode/
├── SLIDES_SOURCE.md
├── TEACHING_NOTES.md
└── README.md
```

Each snapshot has its own `src/` and `README.md` explaining what's new.

## First-time setup

```bash
cd Summer2026/demos/tailwind
npm install     # ~6 sec
npm run dev
```

## Advancing snapshots

```bash
rm -rf src/*
cp -r snapshots/snapshot-NN-name/src/* src/
```

Vite hot-reloads automatically.

## Snapshot summary

| # | Topic | Headline lesson |
|---|---|---|
| 01 | Setup | Tailwind v4 install: one plugin + one CSS import. No config file. |
| 02 | Fully styled | Replace every inline style with utility classes. Spacing, color, typography, flex, state variants, responsive — all four utility categories. |
| 03 | Dark mode | `dark:` is just another variant. Class-based toggle with a custom hook. |

## Time budget

- **Class 5 second half (~90 min):** All three snapshots.
- Snapshot 02 alone is ~60 min — the bulk of the time.

See `TEACHING_NOTES.md` for per-component timing inside snapshot 02.

## What students should install before Class 5

- **VS Code Tailwind CSS IntelliSense** extension. Without it, autocomplete dies and learning is much harder.
- (Already from React demo) Node 20+, ESLint + Prettier extensions, React DevTools.

## Why no `@apply`?

Modern Tailwind guidance: don't extract utility classes into CSS with `@apply`. Extract them into **React components** instead. A `<Button>` component beats a `.btn` CSS class — same reuse, but it carries props and types with it.

## Design decisions worth noting

- **Single styled snapshot**, not 8 incremental ones — Tailwind teaches utility-class **vocabulary**, not incremental behavior. One side-by-side "before / after" beats a long Lego chain. (Compare to the React demo, where each snapshot adds a NEW concept.)
- **Class-based dark mode**, not media-query — users want to override their system theme. Production-realistic.
- **Custom `useDarkMode` hook** — reinforces the custom-hook pattern students just learned in React S11.
- **Toggle button uses an emoji** (☾ / ☀) — keeps the demo dependency-free. In production, use a real icon component.

## After this demo

Next demos build directly on this one:
- **TanStack Query demo** — replace `useEffect` + `fetch` with `useQuery`, styled with these same Tailwind patterns
- **React Router demo** — multi-page version of this app
- **Zustand demo** — replace `useTodos` with a global store
