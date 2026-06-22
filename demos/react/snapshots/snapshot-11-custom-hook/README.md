# Snapshot 11 — Custom Hooks

## What this snapshot does

Same behavior as snapshot 10, plus **localStorage persistence** is back (from snapshot 07). The big change is **how the state lives**: it's now bundled inside a custom hook called `useTodos()`.

## What's new

- A `hooks/` folder.
- `useTodos()` — a custom hook that encapsulates the todos array, the localStorage logic, and all the handlers.
- `App.tsx` shrinks again: one line replaces `useState`, `useEffect`, and four handler functions.
- The **functional updater** pattern: `setTodos((prev) => ...)`.

## Run

```bash
rm -rf src/* && cp -r snapshots/snapshot-11-custom-hook/src/* src/
npm run dev
```

The UI is identical. Refresh — todos persist. "Reset to defaults" clears.

## Things to point out

### What is a custom hook?

**A custom hook is just a function whose name starts with `use` and that calls other hooks inside.**

That's the whole definition. There's no special syntax, no decorator, no registration.

```ts
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(...);
  useEffect(...);
  function addTodo(...) {...}
  return { todos, addTodo, toggleTodo, deleteTodo, resetTodos };
}
```

It looks like a regular function. The "magic" is that React tracks `useState` and `useEffect` calls by call order — and a custom hook is just a wrapper that defers to them.

### Why the `use` prefix?

Two reasons:
1. **Convention.** Other developers (and linters) recognize it as a hook.
2. **React's lint rules.** The `eslint-plugin-react-hooks` linter checks that hooks are only called from components or other hooks. It uses the `use` prefix to know what's a hook.

If you don't prefix, you'll get warnings and risk subtle bugs.

### What does this hook encapsulate?

Everything related to "managing a list of todos":
- The state (`todos`)
- The persistence (localStorage read + useEffect write)
- The default data
- The operations (add, toggle, delete, reset)

Any component anywhere in the app can now write `const { todos, addTodo } = useTodos()` and get the full machinery. **That's the win.**

### The functional updater pattern

Notice the change inside the hook:

```ts
// Before (snapshot 10):
setTodos([...todos, newTodo]);

// Now:
setTodos((prev) => [...prev, newTodo]);
```

`setTodos` can take either a new value OR a function `(prev) => next`. The function form receives the most recent state — important for two cases:

1. **Stale closures.** If you batched multiple updates or set state from inside a `setTimeout`, the value of `todos` in scope might be outdated. The functional form always gets the latest.
2. **Hooks.** Inside a custom hook, you can't access the latest `todos` directly because the hook is defined once but called many times. Functional updates are safer.

Drill this: **inside a custom hook, prefer the functional updater form.**

### Two callers, two independent states

Here's the subtle bit: if you wrote `useTodos()` in TWO different components, **each call gets its own independent state**. They are NOT shared.

That's by design — custom hooks share **logic**, not state. To share state across components, you'd:
- Lift it up to a common parent (snapshot 06)
- Or use Context / a state library (the Zustand demo, later)

### Where does this lead?

The next demos build directly on this pattern:
- **TanStack Query** = `useQuery()`, `useMutation()` — custom hooks for server state.
- **React Router** = `useNavigate()`, `useParams()` — custom hooks for routing.
- **Zustand** = `useTodosStore()` — custom hooks for shared state.

If students understand `useTodos()`, those libraries stop being magic and start being "ahh, just another `use*` function."

## Common mistakes

- Naming the hook without `use` (e.g., `todoState()`) — linter complains, bugs creep in.
- Returning a giant array instead of a named object: `return [todos, addTodo, toggleTodo, ...]` — works, but destructuring breaks if you add a field. Named objects are clearer.
- Trying to "share state" by calling the same hook in two components and expecting them to sync. They won't.
- Putting unrelated logic in one hook ("useEverything"). Each hook should have one focus.

## What to land

- A custom hook is a function starting with `use` that calls other hooks.
- It packages state + behavior so any component can reuse it.
- Inside hooks, use the functional updater form: `setX((prev) => ...)`.
- Each call to a custom hook = its own independent state. Hooks share logic, not state.
