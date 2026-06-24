# Snapshot 04 — `useSearchParams` (filter in the URL)

**Headline:** UI state that's worth sharing or bookmarking belongs in the URL.
The filter moves from `useState` to the query string: `/todos?filter=active`.

## What's new vs snapshot 03

Only `TodosPage.tsx` changes. `useState` for the filter is replaced by
`useSearchParams`.

## Before / after

```tsx
// before — state trapped in the component
const [filter, setFilter] = useState<Filter>("all");
```

```tsx
// after — state in the URL
const [searchParams, setSearchParams] = useSearchParams();
const raw = searchParams.get("filter");
const filter: Filter = raw === "active" || raw === "done" ? raw : "all";
const setFilter = (next: Filter) =>
  setSearchParams(next === "all" ? {} : { filter: next });
```

`useSearchParams` is `useState` for the query string. `.get("filter")` reads;
`setSearchParams(...)` writes (and pushes a history entry).

## Why bother?

- **Shareable**: send someone `/todos?filter=done` and they see the same view.
- **Bookmarkable / refresh-safe**: reload keeps the filter.
- **Back button works**: switching filters is in history, so Back undoes it.
- **Single source of truth**: the URL, not a hidden `useState`.

## Notes

- Always a **string** — validate/whitelist it (we ignore anything that isn't
  `active`/`done`).
- We drop the param for the default ("all") to keep the URL clean.
- `setSearchParams` accepts an object or a `URLSearchParams`. Pass `{ replace: true }`
  as a second arg if you DON'T want a new history entry.

## Things to demo

- Click the filter pills → the URL updates live (`?filter=active`, then clean
  `/todos` for All).
- **Reload** on `?filter=done` → the filter survives (it wasn't lost like
  `useState` would be).
- Hit **Back** after changing filters → it steps through your filter history.
- Paste `/todos?filter=active` into a new tab → opens pre-filtered.
