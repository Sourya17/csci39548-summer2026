# Snapshot 04 — Lists + Keys

## What this snapshot does

Stores todos as an **array** in state. Renders one `TodoCard` per todo using `.map()`. An "Add a todo" button appends to the array.

## What's new

- An array in state instead of a single object.
- `.map()` over the array to render multiple components.
- The `key` prop — React's identity tracker.
- Updating an array immutably with `[...todos, newTodo]`.

## Run

```bash
cp -r snapshots/snapshot-04-lists-keys/src/* src/
npm run dev
```

Click "Add a todo" a few times. New cards appear.

## Things to point out

### `.map()` in JSX

```tsx
{todos.map((todo) => (
  <TodoCard key={todo.id} todo={todo} />
))}
```

- `todos.map(...)` returns an **array of JSX elements**.
- React knows how to render an array — it puts each element in place.
- This is the standard React pattern for lists. You will write it 1000 times.

### What is `key` and why does it matter?

React uses keys to figure out **which item is which** between renders.

- If you add an item to the end, React only adds one DOM node.
- If you reorder, React reorders DOM nodes instead of rebuilding them.
- Without keys, React falls back to "index-based" matching, which is fine for static lists but breaks for editable ones.

**Live demo — remove the `key` prop and check the console.**
You'll get this warning:

```
Warning: Each child in a list should have a unique "key" prop.
```

### What makes a good key?

- A **stable, unique ID** for that item — usually `todo.id` from a database, or `Date.now()` / `crypto.randomUUID()` for new items.
- **NOT the array index.** This works until items get added/removed/reordered, then state attaches to the wrong row. Index keys are a footgun.
- Keys go on the **outermost element** returned by `.map()`, not inside the component.

### Immutable updates for arrays

| Want to... | Do... | Don't... |
|---|---|---|
| Add to end | `setTodos([...todos, x])` | `todos.push(x)` |
| Add to start | `setTodos([x, ...todos])` | `todos.unshift(x)` |
| Remove by id | `setTodos(todos.filter(t => t.id !== id))` | `todos.splice(...)` |
| Update one item | `setTodos(todos.map(t => t.id === id ? {...t, done: true} : t))` | `todos[i].done = true` |

Same rule as snapshot 03: **never mutate, always create new**.

## Common mistakes

- Using array index as key: `todos.map((todo, i) => <TodoCard key={i} ...>)` — looks fine, breaks subtly.
- Forgetting the key entirely (you'll see the warning, ignore it at your peril).
- Calling `todos.push(...)` and then `setTodos(todos)` — React sees the same array reference and skips the re-render.

## What to land

- `.map()` an array into JSX to render a list.
- Every item in a list needs a unique, stable `key`.
- To change an array in state, make a new array.
