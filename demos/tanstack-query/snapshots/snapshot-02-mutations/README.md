# Snapshot 02 — mutations + `invalidateQueries`

**Headline:** `useQuery` reads; `useMutation` writes. After a write succeeds, you don't patch the data by hand — you **invalidate** the cache and `useQuery` refetches.

## What's new vs snapshot 01

- `api.ts` gains `addTodo` (POST), `toggleTodo` (PATCH), `deleteTodo` (DELETE).
- `App.tsx` gets three `useMutation`s, each with `onSuccess: invalidateQueries({ queryKey: ["todos"] })`.
- The UI is interactive again: checkboxes toggle, delete works, the add form posts.

## The pattern

```tsx
const queryClient = useQueryClient();

const addMutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
});

// fire it:
addMutation.mutate({ text, minutes });
```

The chain: **mutate → server write → onSuccess → invalidate `["todos"]` → that query is now stale → useQuery refetches → screen updates.** One source of truth (the server), never duplicated in component state.

## Why not just edit local state?

Because then the browser and the server drift apart. Invalidate-and-refetch keeps them in sync for free, and it's the same one line no matter how many components show that data.

## Things to demo

- Add a todo → it appears (after the refetch). **Refresh the page → it's still there** (it's on the server now, not localStorage).
- Toggle / delete → persist across refresh too.
- `isPending`: the Add button shows "Adding…" and disables while the POST is in flight.
- Network tab: each action fires the write request **then** an automatic `GET /todos` (the invalidation refetch).

## Reset the data

```bash
npm run reset-db   # restores db.json from db.seed.json
```
