# Snapshot 01 — `useQuery` (read)

**Headline:** one hook replaces the entire `useEffect` + manual loading/error/data dance from React snapshot 08.

## What's new vs the Tailwind demo

The app looks identical, but the **data layer changed**:

| Before (Tailwind demo) | Now |
|---|---|
| `useTodos` hook reading `localStorage` | `useQuery` reading a real server |
| data lived in the browser | data lives in `db.json` via json-server |

## The three new pieces

1. **`main.tsx`** — wrap the app in `<QueryClientProvider>` with one `new QueryClient()`.
2. **`api.ts`** — a plain `fetchTodos()` async function. No React inside.
3. **`App.tsx`** — `useQuery({ queryKey: ["todos"], queryFn: fetchTodos })` returns `data`, `isLoading`, `isError`, `error` for free.

## Compare to React snapshot 08

S08 needed three `useState`s, a `useEffect`, a try/catch/finally, and a manual `loading` flag. Here:

```tsx
const { data: todos, isLoading, isError, error } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});
```

That's the whole thing.

## Still read-only

Checkboxes show state but don't change it; there's no add/delete yet. Writing to the server is snapshot 02 (mutations).

## Run it

```bash
npm install
npm run server   # terminal 1 — json-server on :3001
npm run dev      # terminal 2 — Vite on :5173
```
