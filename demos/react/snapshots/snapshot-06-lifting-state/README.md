# Snapshot 06 — Lifting State Up

## What this snapshot does

Each todo card now has a **checkbox** (toggle done) and a **delete button**. The cards don't own any state — they call back to `App`, which owns the array.

## What's new

- A pattern called **lifting state up**.
- Callback props (`onToggle`, `onDelete`).
- Immutably updating ONE item in an array with `.map(...)`.
- Removing an item with `.filter(...)`.

## Run

```bash
cp -r snapshots/snapshot-06-lifting-state/src/* src/
npm run dev
```

Check a box → text gets struck through. Click delete → row disappears. Add a new todo → appears at the bottom.

## Things to point out

### The mental model

In React, **state should live as high up the tree as the components that need it**.

- Only `App` needs to know the full todo array → `App` owns the array.
- `TodoCard` just displays one todo and reports clicks back up via props.
- The parent decides what those clicks mean.

This is called **"lifting state up."** It's the most important pattern in React.

### Why not let TodoCard own its own `done` state?

You could try:
```tsx
function TodoCard({ todo }) {
  const [done, setDone] = useState(todo.done);  // BAD
  // ...
}
```

Two problems:
1. **The parent can't see the value.** Now `App` has no idea if a todo is done. It can't show "3 of 5 done" anywhere.
2. **The data is duplicated.** `todo.done` vs `done` — which is the truth? They will drift apart.

**Rule:** if more than one component needs the value, lift it to their nearest common parent.

### Callback props

```tsx
interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
```

The child says: "I don't know how to toggle a todo. When the user clicks me, I'll call this function you gave me."

The naming convention is `onSomething` (props) and `handleSomething` or `somethingTodo` (the actual handlers in the parent). React itself uses this: `onClick`, `onChange`, `onSubmit`.

### Updating one item in an array

```ts
setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
```

Read it as: "for every todo, if its id matches, return a NEW object with done flipped, otherwise return the original." Note `{ ...t }` again — never mutate `t` directly.

### Removing one item

```ts
setTodos(todos.filter((t) => t.id !== id));
```

`.filter` returns a new array with the matching item left out.

## Common mistakes

- Trying to mutate inside `.map`: `t.done = !t.done; return t;` — same object reference, React won't see the change.
- Forgetting to use the spread: `setTodos(todos.map(t => t.id === id ? {done: !t.done} : t))` — this replaces the whole object with just `{done: true}`, losing `text`, `minutes`, etc.
- Passing the callback wrong: `onClick={onDelete(todo.id)}` — this CALLS the function during render. You want `onClick={() => onDelete(todo.id)}`.

## What to land

- Lift state up to the component that needs it most.
- Children get **data via props** and **change requests via callback props**.
- Updates are immutable: `.map` to update one, `.filter` to remove one.
