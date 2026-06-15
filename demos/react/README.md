# React Demo — CSCI 39548, Summer 2026

In-class build of a Todo app, progressing through 12 snapshots. Each snapshot teaches **one new React concept** on top of the previous one. The same `Todo` data shape carries over from the JavaScript and TypeScript demos, so students see continuity.

## Stack

- **Vite 5** — dev server + build tool
- **React 18** — UI library
- **TypeScript 5** — typed from snapshot 01

No Tailwind, no Router, no TanStack Query, no Zustand yet — those each get their own demos in later classes.

## Folder layout

```
react/
├── package.json, vite.config.ts, tsconfig.json, index.html
├── src/                        ← the LIVE code, currently mirrors the latest snapshot
├── snapshots/
│   ├── snapshot-01-hello/
│   ├── snapshot-02-jsx-props/
│   ├── snapshot-03-usestate/
│   ├── snapshot-04-lists-keys/
│   ├── snapshot-05-forms/
│   ├── snapshot-06-lifting-state/
│   ├── snapshot-07-useeffect-localstorage/
│   ├── snapshot-08-fetch/
│   ├── snapshot-09-filter-derived/
│   ├── snapshot-10-splitting/
│   ├── snapshot-11-custom-hook/
│   └── snapshot-12-useref/
└── README.md                   ← this file
```

Each snapshot folder contains:
- A `src/` directory with the working code at that stage.
- A `README.md` with what's new, how to run, and what to teach.

## First-time setup

```bash
cd Summer2026/demos/react
npm install     # one time only
npm run dev
```

`npm install` takes ~30 seconds and creates `node_modules/`. Don't commit it.

## Advancing to a snapshot

The `src/` folder is the live code. To switch to a different snapshot:

```bash
rm -rf src/*
cp -r snapshots/snapshot-NN-name/src/* src/
```

Vite will hot-reload automatically. Re-running `npm run dev` is only needed if you closed it.

## Snapshot summary

| # | Topic | Headline lesson |
|---|---|---|
| 01 | Vite scaffold + hello | A component is a function returning JSX |
| 02 | JSX + props | Props let one component render many things |
| 03 | `useState` | State updates trigger re-renders; never mutate |
| 04 | Lists + keys | `.map()` JSX, keys identify items across renders |
| 05 | Forms | Controlled inputs: state is the source of truth |
| 06 | Lifting state | State lives in the lowest common parent |
| 07 | `useEffect` + localStorage | The dependency array controls when effects run |
| 08 | `useEffect` + fetch | Loading/error/data three-state pattern |
| 09 | Conditional + derived | Don't store what you can compute |
| 10 | Component splitting | One file = one component, organize by feature |
| 11 | Custom hooks | Reuse stateful logic with `use*` functions |
| 12 | `useRef` + DevTools | Escape hatch to the DOM; tour the dev extension |

## Time budget

- **Class 4 (full ~3 hr):** snapshots 01–08 (intro through async fetch)
- **Class 5 first half (~90 min):** snapshots 09–12 (filters, splitting, hooks, DevTools)


## What students should install before Class 4

- Node 20+ (`node --version`)
- VS Code with the **ESLint** and **Prettier** extensions
- The **React Developer Tools** browser extension (Chrome / Firefox)

## After this demo

Next demos build directly on this one:
- **Tailwind demo** — drop in Tailwind, restyle the same Todo app
- **TanStack Query demo** — replace `useEffect` + `fetch` with `useQuery`
- **React Router demo** — split this into multiple pages
- **Zustand demo** — replace `useTodos` with a global store
