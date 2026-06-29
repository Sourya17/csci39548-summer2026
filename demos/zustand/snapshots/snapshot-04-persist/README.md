# Snapshot 04 — `persist` + `devtools` middleware

## What's new

- `src/store/todoStore.ts` wraps the store factory in **two middleware** functions: `devtools(persist((set) => ({...}), { ... }))`.
- `persist` config:
  - `name: "zustand-demo.todos"` — the localStorage key.
  - `partialize: (state) => ({ todos: state.todos })` — only persist `todos`; skip actions and anything transient.
  - `version: 1` — bumping this invalidates old saved data (useful when the shape changes).
- `devtools` config: `{ name: "TodoStore" }` — labels the store in the Redux DevTools panel.
- Everything else (components, selectors, App) is **unchanged**.

## What to teach

- **`persist` replaces the `useEffect(saveToLocalStorage)` pattern** from the React `useTodos` hook. The middleware listens to every `set()` and writes; on startup it rehydrates before React renders.
- Middleware **composition** reads inside-out: the innermost wrapper sees state first. `devtools(persist(storeFn))` means `persist` runs the store logic, and `devtools` records the resulting `set()` calls.
- **Why `partialize`?** Without it, Zustand would try to JSON-stringify the whole store — including action functions, which serialize to `undefined` and get lost on rehydrate. `partialize` is the contract: "this is what I want saved."
- **Why `version`?** Today the saved JSON looks like `{ todos: [...] }`. If next term you add a `priority` field, the old saved data won't have it. Bump `version` and existing users get a fresh store instead of a broken merge. (Or write a `migrate` function — see Zustand docs.)
- **Redux DevTools extension** — install in Chrome/Firefox. Open DevTools → Redux tab. Every `addTodo`/`toggleTodo`/`deleteTodo` shows up labeled. Time-travel through them with the slider.

## Live demo

1. Open the page. Add two todos. Refresh. They're still there.
2. DevTools → Application → Local Storage → `http://localhost:5173` → see `zustand-demo.todos`. Its value is `{"state":{"todos":[...]},"version":1}`.
3. Edit it in DevTools → `state.todos = []` → save → refresh. Page loads empty.
4. Install Redux DevTools extension. Reload. New tab in DevTools: "Redux". Pick `TodoStore`. Add a todo → action appears as `anonymous`. Toggle → another. Hit the time-travel slider — UI rewinds.

## Wipe the saved data

```js
// In console:
localStorage.removeItem("zustand-demo.todos")
location.reload()
```

Or use `useTodoStore.persist.clearStorage()` — the middleware exposes a small API on the hook itself.

## Compare against snapshot 03

```bash
diff -r snapshot-03-selectors/src snapshot-04-persist/src
```

Only `store/todoStore.ts` changes. That's the point of middleware — feature swap-in without touching components.
