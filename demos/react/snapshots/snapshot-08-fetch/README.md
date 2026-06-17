# Snapshot 08 — useEffect + fetch

## What this snapshot does

On page load, fetches 5 todos from the JSONPlaceholder API and displays them. Shows three UI states: **loading**, **error**, **success**.

## What's new

- Fetching data from an API inside a React component.
- The **three-state pattern**: `loading`, `error`, `data`.
- Empty dependency array `[]` — run once on mount.
- TypeScript shape for the API response vs the app's shape.

## Run

```bash
cp -r snapshots/snapshot-08-fetch/src/* src/
npm run dev
```

You'll see "Loading..." for a fraction of a second, then 5 todos appear.

## Things to point out

### Where does data fetching go?

Not in render. Render is supposed to be **pure** — given the same state, it returns the same JSX. Fetching is a side effect, so it belongs in `useEffect`.

```ts
useEffect(() => {
  async function loadTodos() { ... }
  loadTodos();
}, []);
```

Why the inner async function? Because `useEffect`'s callback **cannot itself be async** (it would return a Promise, which React doesn't know what to do with). Define an async function inside and call it.

### The three-state pattern

Almost every fetch in React UI has three possible states:

| State | Show |
|---|---|
| `loading=true` | A spinner or "Loading..." |
| `error !== null` | An error message |
| neither | The actual data |

Three `useState` calls cover this. Later (in the TanStack Query demo) we'll see a library that handles all three for you.

### Mapping API shape to app shape

The API returns `{ userId, id, title, completed }`. Our app uses `{ id, text, done, minutes }`. So inside the effect we **map** one shape to the other:

```ts
const mapped: Todo[] = data.map((t) => ({
  id: t.id,
  text: t.title,
  done: t.completed,
  minutes: 15,
}));
```

This is a real-world habit: **your UI's data shape is yours to define**. Don't let an API dictate your component types.

### `[]` vs `[todos]` revisited

In snapshot 07 we used `[todos]` to write to localStorage. Here we use `[]` because:
- We want to fetch ONCE, on mount, not every time `todos` changes.
- (If you used `[todos]`, every fetch would update `todos`, which would trigger another fetch → infinite loop.)

This rule of thumb is critical: **the dependency array choice determines whether your effect is "run once" or "run when X changes."**

### Why is the checkbox `readOnly`?

We're displaying remote data. There's no "save" mechanism for the API. Marking it `readOnly` shows the value without claiming we can change it. In a real app you'd POST changes back.

## Common mistakes

- Making the `useEffect` callback itself `async` → React warns, weird bugs.
- Forgetting to await the second `.json()` call.
- Forgetting `[]` and getting an infinite loop of fetches.
- Trying to render `todos` before checking `loading` (will briefly show "0 todos").
- Trusting the API response without a type — TS can't help you if you treat `data` as `any`.

## What to land

- API calls go in `useEffect` with an inner `async` function.
- Always handle three states: loading, error, success.
- Map the API's data shape into your app's data shape.
- `[]` = run once. `[x, y]` = run when x or y changes.
