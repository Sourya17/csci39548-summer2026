# React Router Demo — CSCI 39548, Summer 2026

Turning the single-page Todo app into a **multi-page** app with client-side
routing — **React Router v7** (declarative `<Routes>` API). Four snapshots:
basic routes → shared layout → dynamic route + 404 → URL search params.

Built on the TanStack Query demo. **Router handles navigation; TanStack Query
keeps owning data** — we deliberately do *not* use Router's loaders/actions,
because Query already does that job. That separation is the real-world norm.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **React Router v7** (`react-router-dom`), declarative component API
- **TanStack Query v5** + **Tailwind v4** (carried over, unchanged)
- **json-server** — REST API from `db.json` on port 3001

> Note: the course's target is React 19; this series is on React 18 for
> consistency with the earlier demos. Bumping to 19 is a separate, all-demos
> pass — not done here on purpose.

## First-time setup

```bash
cd Summer2026/demos/react-router
npm install        # ~20 sec
```

## Running (two terminals)

```bash
npm run server     # terminal 1 — json-server on :3001
npm run dev        # terminal 2 — Vite on :5173
```

`npm run reset-db` restores `db.json` from `db.seed.json` after testing.

## Folder layout

```
react-router/
├── package.json, vite.config.ts, tsconfig.json, index.html
├── db.json, db.seed.json
├── src/                       ← LIVE code (mirrors latest snapshot)
├── snapshots/
│   ├── snapshot-01-routes/
│   ├── snapshot-02-layout/
│   ├── snapshot-03-detail/
│   └── snapshot-04-searchparams/
├── SLIDES_SOURCE.md
├── TEACHING_NOTES.md
└── README.md
```

## Advancing snapshots

```bash
rm -rf src/*
cp -r snapshots/snapshot-NN-name/src/* src/
```

(Snapshot 01 edits `main.tsx`, the entry point — a hard reload may be needed
when stepping back to it.)

## Snapshot summary

| # | Topic | Headline lesson |
|---|---|---|
| 01 | basic routes + `<Link>` | `BrowserRouter` + `<Routes>/<Route>`. `<Link>` navigates without a reload. |
| 02 | layout + `<NavLink>` | Layout route + `<Outlet>` for shared chrome; `<NavLink>` active styling; the `end` gotcha. |
| 03 | dynamic route + 404 | `/todos/:id` with `useParams`; `useNavigate`; `*` catch-all. |
| 04 | `useSearchParams` | Filter state in the URL (`?filter=active`) — shareable, reload-safe. |

## The SPA-fallback gotcha (deployment)

Typing `/todos/2` directly works in dev because Vite serves `index.html` for any
path. On a static host (Vercel/Netlify) you must configure a **catch-all rewrite
to `index.html`**, or deep links 404 at the server before React Router ever
runs. Vercel does this automatically for SPAs; some hosts need a `_redirects` or
rewrite rule. Covered in the deployment demo.

## Design decisions

- **Declarative `<Routes>`, not the data router** — easiest to read/teach, and
  it keeps data in TanStack Query instead of Router loaders. We mention
  `createBrowserRouter` + loaders as the alternative we skip.
- **Builds on the TanStack app** — students see routing layered onto code they
  already know; only navigation is new.
- **4 snapshots** — routing is incremental (routes → layout → params → search
  params), each step a distinct concept.
```
