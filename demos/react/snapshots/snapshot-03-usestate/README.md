# Snapshot 03 — useState

## What this snapshot does

Adds **interactivity**. The todo can be toggled done/not-done. A separate click counter shows `useState` works with any type, not just objects.

## What's new

- `useState` — the first React hook.
- The mental shift: **you don't update the DOM, you update state and React updates the DOM**.

## Run

```bash
cp -r snapshots/snapshot-03-usestate/src/* src/
npm run dev
```

Click "Mark as done" → text flips. Click "Click me" → counter goes up.

## Things to point out

### The shape of `useState`

```ts
const [value, setValue] = useState(initial);
```

It returns an array with **two things**, and we destructure them:
- `value` — the current state
- `setValue` — a function to change it

This pattern (array destructuring) is exactly like:

```ts
const [a, b] = [1, 2];
```

### Updating state vs mutating state

**Wrong:**
```ts
todo.done = !todo.done;   // React doesn't notice. UI won't update.
setTodo(todo);            // Same reference, still no re-render.
```

**Right:**
```ts
setTodo({ ...todo, done: !todo.done });  // New object, React re-renders.
```

React compares the OLD and NEW values. If they're the same reference, it skips the re-render. So you must **make a new object** with the spread operator.

This is the #1 thing students get wrong with `useState`. Drill it.

### Where does state live?

State is stored **per component instance**. If you rendered three `<App />`s, each would have its own `clicks` counter. That's why state hooks are "magic" — React tracks which component is calling them in which order.

### Hook rules

- Hooks (functions starting with `use`) must be called **at the top level of a component**.
- Never inside `if`, `for`, or after an early `return`.
- Why? React tracks them by call order. If the order changes between renders, it breaks.

## Common mistakes

- Mutating state (`todo.done = ...`) instead of replacing it.
- Calling `useState` inside an `if`.
- Forgetting that the initial value is only used on the **first** render. `useState(0)` doesn't reset to 0 on every render — only once.

## What to land

- State = data the component remembers across renders.
- Updating state triggers a re-render automatically.
- Always create a new object/array when updating; never mutate.
