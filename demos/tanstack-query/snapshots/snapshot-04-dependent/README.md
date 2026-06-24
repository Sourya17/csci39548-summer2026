# Snapshot 04 — dependent query + polish

**Headline:** one query can wait for another. Click a todo → a *second* query
fetches that todo's assignee. Plus proper loading/error/retry states.

## What's new vs snapshot 03

- `api.ts` gains `fetchUser(id)`; `types.ts` gains a `User` type.
- New **`AssigneeDetail.tsx`** — owns a second `useQuery` keyed `["user", id]`.
- `App.tsx` tracks `selectedId`; clicking a todo's text selects it and feeds its
  `assigneeId` into the dependent query.
- The todos error state now has a styled **Retry** button (`refetch`).

## The dependent query

```tsx
useQuery({
  queryKey: ["user", assigneeId],
  queryFn: () => fetchUser(assigneeId!),
  enabled: assigneeId !== null, // ← don't run until we HAVE an id
});
```

`enabled: false` keeps the query idle. The moment a todo is selected,
`assigneeId` becomes a number, `enabled` flips true, and the query fires. This
is the standard pattern for "query B needs a value from query A (or from user
input)."

Note the **dynamic query key** `["user", assigneeId]` — each assignee is cached
separately, so re-selecting a todo you've seen before is instant (cache hit, no
request). Watch this in the DevTools panel.

## Polish added

- **Retry**: the todos error state calls `refetch()` and shows "Retrying…"
  while `isFetching`.
- **Selection highlight**: the selected row gets a blue tint.
- **Per-state UI in `AssigneeDetail`**: idle (no selection) / loading / error /
  loaded — each styled.

## Things to demo

1. Click a todo → assignee panel fetches and shows the name/email.
2. Click a *different* todo with the same assignee → instant (cached).
3. Open DevTools → see `["user", 1]`, `["user", 2]` cached separately.
4. Stop the server, click a never-selected todo → the assignee error state.
5. Stop the server, reload → todos error state with a working **Retry** button
   (restart the server, click Retry → recovers without a page reload).

## Reset the data

```bash
npm run reset-db
```
