# Snapshot 01 — Minimal Zustand store

## What's new

- New file: `src/store/todoStore.ts` — defines `useTodoStore` with `create()`. State (`todos`) and actions (`addTodo`, `toggleTodo`, `deleteTodo`, `resetTodos`) all live in one object outside React.
- `src/hooks/useTodos.ts` is **gone**. The custom hook is replaced by a store hook.
- `App.tsx` now pulls slices: `const todos = useTodoStore(s => s.todos)` etc. — one call per slice.
- Components (`TodoList`, `TodoCard`, `TodoForm`, `TodoSummary`, `TodoFilter`) are **unchanged** — they still receive props.
- **No persistence** — refreshing the page resets the list. That's intentional. Snapshot 04 brings localStorage back via middleware.

## What to teach

- `create<T>((set) => ({ ...state, ...actions }))` — that's the whole API.
- `set` is your only mutator. Pass it a partial update (`{ todos: [...] }`) or a function `(state) => partial` when you need the previous value.
- A store is just a hook. `useTodoStore(selector)` reads. The selector function picks the slice — keep it small so renders stay surgical.
- State lives **outside** the React tree. Open two browser tabs of the same page (not refresh) — they still each have their own store; Zustand isn't a server. The store is per-tab module state.
- Prop-drilling is still here (TodoList → TodoCard passes `onToggle`/`onDelete`). Snapshot 02 deletes those props.

## Live demo

In DevTools console, with the page open:

```js
// Read the current state without React:
useTodoStore.getState().todos
// → array of 4 default todos

// Mutate from outside React:
useTodoStore.getState().addTodo("From the console", 5)
// → UI updates immediately
```

(You won't have `useTodoStore` on `window` by default. To make this work live, run `window.useTodoStore = useTodoStore` in the store file temporarily, or just walk through it conceptually.)

## What students should install

- VS Code **Pretty TypeScript Errors** extension — Zustand's generic errors get messy without it.
