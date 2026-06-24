# Snapshot 01 — basic routes + `<Link>`

**Headline:** one app, multiple URLs. `<Routes>` picks which page component to
render based on the current path — with no full-page reload.

## What's new vs the TanStack Query demo

The whole todo app moved into `pages/TodosPage.tsx` (unchanged inside — same
`useQuery`/`useMutation`). Around it we added routing.

- `main.tsx` — wrap everything in `<BrowserRouter>` (outside the Query provider).
- `App.tsx` — a nav bar of `<Link>`s + a `<Routes>` block.
- `pages/` — `HomePage`, `TodosPage`, `AboutPage`.

## The pieces

```tsx
// main.tsx
<BrowserRouter>            {/* gives the app access to the URL */}
  <App />
</BrowserRouter>
```

```tsx
// App.tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/todos" element={<TodosPage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

```tsx
<Link to="/todos">Todos</Link>   {/* navigate without reloading */}
```

## Why `<Link>` and not `<a href>`?

A plain `<a>` triggers a full page reload — the whole React app reboots, state
is lost, json-server is hit again. `<Link>` changes the URL via the history API
and React just swaps the matched component. Instant, state preserved.

## Things to demo

- Click the nav links → the page swaps, URL changes, **no reload** (watch the
  Network tab — no new document request).
- Hit the browser **Back** button → it works, because Router uses real history.
- Notice the todo data isn't refetched when you leave and return within 5s —
  TanStack Query's cache is still alive (Router didn't reload the app).

## Run it

```bash
npm install
npm run server   # json-server on :3001
npm run dev      # Vite on :5173
```
