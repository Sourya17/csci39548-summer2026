# Snapshot 03 — Derived selectors + `useShallow`

## What's new

- New file: `src/store/selectors.ts` — two reusable selector hooks built on top of `useTodoStore`.
  - `useVisibleTodos(filter)` — parameterized selector. Filtering runs inside the store subscription.
  - `useTodoCounts()` — returns an object of 4 derived numbers, wrapped in `useShallow` so the component re-renders only when one of those numbers actually changes.
- `TodoSummary` takes **no props**. It calls `useTodoCounts()` and pulls the four numbers it needs.
- `App.tsx` no longer touches the raw `todos` array. It uses `useVisibleTodos(filter)` and renders.

## What to teach

- **Selector = the function you pass to `useTodoStore`.** Zustand re-runs it after every store update and re-renders the component only if the **return value** changed (default: `Object.is` compare).
- Returning a **primitive** is safe: `useTodoStore(s => s.todos.length)` — number equality, only re-renders when the count changes.
- Returning a **fresh object or array** is the trap: `useTodoStore(s => s.todos.filter(...))` or `useTodoStore(s => ({ ... }))` — the reference is new every call, so `Object.is` returns false, so React re-renders → selector reruns → new reference → **infinite loop**. Browser yells `Maximum update depth exceeded`.
- Fix: wrap with `useShallow` — `useTodoStore(useShallow((s) => ...))`. Shallow-compares array entries / object keys.
- **Move filtering inside the selector.** Then App never sees the unfiltered array, so adding a todo that doesn't match the filter doesn't cause App to recompute.

### ⚠ This bug bit us while building the demo

Both `useVisibleTodos` (returns array) and `useTodoCounts` (returns object) need `useShallow`. Drop it from either and the page crashes with `Maximum update depth exceeded`. Show students the actual error in the console so they recognize it on the assignment.

## Live demo — prove the perf claim

Add this `console.log("TodoSummary render")` at the top of `TodoSummary`. Add `console.log("App render")` at the top of `App`. Reload.

- Toggle a todo's done state → both log.
- Type into the form's text input → only the form re-renders (its useState). Neither App nor Summary log.
- Reset → both log once.

Now break it: change `useTodoCounts` to drop `useShallow`:

```ts
return useTodoStore((s) => ({
  activeCount: ...,
  doneCount: ...,
  totalMinutes: ...,
  remainingMinutes: ...,
}));
```

Type in the form → TodoSummary still logs. Form input triggers… nothing in the store. So why? It doesn't — but the StrictMode double-render makes this less obvious in dev. The real proof: add a console click handler that calls `useTodoStore.setState({})` (a no-op). With `useShallow`, no re-render. Without it, TodoSummary re-renders.

## Compare against snapshot 02

```bash
diff -r snapshot-02-actions/src snapshot-03-selectors/src
```
