# Snapshot 03 — DevTools + cache behavior

**Headline:** stop guessing from the Network tab. The React Query DevTools *show* you the cache, and `staleTime` controls how often you hit the server at all.

## What's new vs snapshot 02

Only `main.tsx` changes — the rest of the app is untouched.

1. **`<ReactQueryDevtools />`** added inside the provider. A floating panel that lists every query, its state (fresh / stale / fetching / inactive), its data, and lets you refetch/invalidate by hand.
2. **`staleTime: 5_000`** on the client's default options. For 5 seconds after a fetch, data is "fresh" and served from cache with **no** network request.
3. **`refetchOnWindowFocus: true`** (explicit; it's the default). When you tab away and back, stale queries refetch.

## The mental model

```
fetch ──→ FRESH ──(staleTime elapses)──→ STALE
            │                              │
   served from cache,            refetched on: remount,
   no network                    window focus, invalidate
```

- `staleTime` (default `0`) → how long data stays fresh.
- `gcTime` (default 5 min) → how long unused data lingers in cache before garbage collection.

## Things to demo

1. **Open the panel** (logo, bottom corner). Toggle a todo → watch the `["todos"]` row flip to **fetching** then back, and the data update live.
2. **staleTime in action:** the filter pills re-render the component but fire **no** request — data is fresh from cache.
3. **refetch on focus:** click into another browser tab, wait >5s, come back → DevTools shows a refetch fire. (Within 5s it won't — still fresh.)
4. **Manual controls:** in the panel, hit "Invalidate" on `["todos"]` → it refetches, same as a mutation's `onSuccess` does.

## Why this matters for class

The Network tab shows requests *after the fact*. The DevTools show the **cache state in real time** — the thing that makes TanStack Query different from `useEffect`. This is the snapshot where "it caches for you" becomes visible.
