# Snapshot 02 — Kill prop drilling

## What's new

- `TodoCard` pulls `toggleTodo` and `deleteTodo` from the store directly. No more `onToggle`/`onDelete` props.
- `TodoList` props shrink from `{ todos, onToggle, onDelete }` to just `{ todos }`. It's now a thin renderer.
- `TodoForm` pulls `addTodo` from the store. No more `onAdd` prop.
- `App.tsx` shrinks — it no longer passes action handlers down. It only reads `todos` (for filtering) and `resetTodos` (for the button).

## What to teach

- **The big win.** Compare `App.tsx` before (snapshot 01) and after. Look at what disappeared from the JSX — every prop that was just relaying a function.
- A component reaches for the action where it's actually called, not three levels up.
- Selectors that return store actions never cause re-renders. Action references are stable (Zustand never recreates them), so `useTodoStore(s => s.toggleTodo)` is cheap.
- Why not just push **everything** into the store? `filter` stays local in `App.tsx` — it's UI state that only one component cares about. Use the store for state multiple components share, not for state that has one owner.

## Live demo

In DevTools console:

```js
// Add a todo from outside the component tree:
useTodoStore.getState().addTodo("From console", 99)

// Toggle the first todo:
const first = useTodoStore.getState().todos[0]
useTodoStore.getState().toggleTodo(first.id)
```

The UI updates because every subscribing component re-renders when its slice changes. No event, no callback chain.

## Compare against snapshot 01

```bash
diff -r snapshot-01-store/src snapshot-02-actions/src
```

Notice: `store/todoStore.ts` is **unchanged**. All the changes are in components and App.
