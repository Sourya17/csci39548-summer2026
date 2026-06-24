# TanStack Query Demo — CSCI 39548, Summer 2026

Replacing the React app's `useEffect` + `fetch` data layer with **TanStack
Query** (`useQuery` / `useMutation`), backed by a real server. Four snapshots:
read → write → cache → dependent query.

This demo is the **server-state** lesson. It builds directly on the Tailwind
demo — same styled components, same dark mode — and swaps *only* how data moves.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5** (same as React/Tailwind demos)
- **Tailwind CSS v4** (carried over from the Tailwind demo, unchanged)
- **TanStack Query v5** (`@tanstack/react-query`)
- **React Query DevTools** (`@tanstack/react-query-devtools`)
- **json-server** — a real REST API from `db.json`, no backend code

## The backend

`json-server` serves `db.json` on **port 3001** with full REST: `GET`, `POST`,
`PATCH`, `DELETE` that actually persist. This is what makes mutations and
`invalidateQueries` *visibly* work (JSONPlaceholder fakes writes — it can't).

`db.json` has two collections: `todos` (each with an `assigneeId`) and `users`
(for the dependent-query snapshot).

## First-time setup

```bash
cd Summer2026/demos/tanstack-query
npm install        # ~20 sec
```

## Running (two terminals)

```bash
npm run server     # terminal 1 — json-server on :3001
npm run dev        # terminal 2 — Vite on :5173
```

Both must be running. If the page shows "Is the server running?", terminal 1
isn't up.

## Resetting the data

Mutations persist to `db.json`, so the demo data drifts as you test. Restore it:

```bash
npm run reset-db   # copies db.seed.json → db.json
```

## Folder layout

```
tanstack-query/
├── package.json, vite.config.ts, tsconfig.json, index.html
├── db.json            ← live data (mutated by the server)
├── db.seed.json       ← pristine seed; `npm run reset-db` restores from it
├── src/               ← LIVE code (mirrors latest snapshot)
├── snapshots/
│   ├── snapshot-01-usequery/
│   ├── snapshot-02-mutations/
│   ├── snapshot-03-devtools/
│   └── snapshot-04-dependent/
├── SLIDES_SOURCE.md
├── TEACHING_NOTES.md
└── README.md
```

Each snapshot has its own `src/` and `README.md`.

## Advancing snapshots

```bash
rm -rf src/*
cp -r snapshots/snapshot-NN-name/src/* src/
```

Vite hot-reloads. (Editing `main.tsx` — snapshots 01/03 — may need a hard
reload, since it's the entry point.)

## Snapshot summary

| # | Topic | Headline lesson |
|---|---|---|
| 01 | `useQuery` (read) | One hook replaces `useEffect` + loading/error/data. Compare to React S08. |
| 02 | mutations + invalidate | `useMutation` writes; `onSuccess` → `invalidateQueries` refetches. Persists across reload. |
| 03 | DevTools + cache | See the cache live. `staleTime` = freshness gate (not a timer). `refetchOnWindowFocus`. |
| 04 | dependent query + polish | `enabled` gates a query on a value you don't have yet. Per-key caching. Retry/error states. |

## Where this sits in the course

Comes after React + Tailwind. It's the bridge from *client* state (`useState`,
localStorage) to *server* state. The next demos (React Router, Zustand) reuse
this same app.

## Design decisions

- **json-server, not JSONPlaceholder** — writes must persist or mutations and
  cache invalidation can't be demonstrated honestly.
- **Builds on the Tailwind app** — students see a familiar UI; only the data
  layer is new. Keeps the focus on Query, not on re-learning the components.
- **4 snapshots** (unlike Tailwind's 3) — Query teaches *incremental behavior*
  (read → write → cache → dependent), so each step adds a genuinely new concept,
  like the React demo.
- **DevTools from snapshot 03 on** — the cache is the whole point; you have to
  be able to *see* it.
```
