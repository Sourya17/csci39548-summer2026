# Zustand Demo — CSCI 39548, Summer 2026

Replacing React's `useTodos` custom hook with a Zustand store. Four snapshots: minimal store, kill prop-drilling, derived selectors, persistence middleware.

This demo fills **Class 8** (~90 min). It builds on the React Todo app — start from `react/snapshots/snapshot-12-useref/` and walk through what changes.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (same baseline as React, Tailwind, TanStack Query, React Router demos)
- **Zustand 5** — the only new dependency

## Folder layout

```
zustand/
├── package.json, vite.config.ts, tsconfig.json, index.html
├── src/                          ← LIVE code (mirrors snapshot-04, the final state)
├── snapshots/
│   ├── snapshot-01-store/        ← minimal create() store, prop-drilling intact
│   ├── snapshot-02-actions/      ← components subscribe directly, props gone
│   ├── snapshot-03-selectors/    ← useShallow + parameterized selector hooks
│   └── snapshot-04-persist/      ← persist + devtools middleware (final)
├── SLIDES_SOURCE.md              ← slide text per section
├── TEACHING_NOTES.md             ← live-discovered gotchas, talking points, demo cues
└── README.md                     ← this file
```

## Run it

```bash
cd Summer2026/demos/zustand
npm install
npm run dev
```

Open http://localhost:5173. The live `src/` is snapshot-04 (final).

## Switch between snapshots

```bash
# from the demo root
rm -rf src
cp -r snapshots/snapshot-02-actions/src src
npm run dev
```

## Teaching arc

| Snapshot | Lesson | Files changed from the previous |
|---|---|---|
| 01 | A store is just a hook. `create((set) => state+actions)` | + `store/todoStore.ts`, – `hooks/useTodos.ts`, `App.tsx` reads slices |
| 02 | Components subscribe to actions directly — kill prop drilling | `TodoCard`, `TodoForm`, `TodoList`, `App.tsx` shrinks |
| 03 | Derived selectors + `useShallow` for object returns | + `store/selectors.ts`, `TodoSummary` drops props, `App` uses `useVisibleTodos` |
| 04 | `persist` (localStorage) + `devtools` middleware | `store/todoStore.ts` only |

Each snapshot's `README.md` covers what changed and what to teach.

## Why Zustand

Trade-offs vs alternatives (covered in slides):

- **vs React Context** — Context re-renders every consumer on any value change. Zustand's selector-based subscriptions are surgical.
- **vs Redux Toolkit** — RTK is the industry standard for large apps but ships a lot of boilerplate (slices, reducers, actions). Zustand fits a 1000-line app in 5 lines of setup.
- **vs prop drilling** — fine for 1–2 levels; pain at 3+. The Todo app already shows the pain (TodoList just relays callbacks).

## What's NOT in this demo

- **Slices / nested stores.** One flat store is enough for the Todo app.
- **Immer middleware.** The Todo app has shallow state; immutable spreads stay readable. Mention in slides; demo if asked.
- **Subscribe outside React** (`store.subscribe(...)`) — useful for analytics/logging, but out of scope for class 8.
- **Async actions** — Zustand handles them fine (just `async` your action), but server state should live in TanStack Query. We taught that pattern in Class 7.
