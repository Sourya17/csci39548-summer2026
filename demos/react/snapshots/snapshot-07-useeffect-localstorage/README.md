# Snapshot 07 — useEffect + localStorage

## What this snapshot does

Todos persist in `localStorage`. Reload the page — they're still there. Every change writes the updated array to disk.

## What's new

- The second-most important React hook: `useEffect`.
- The **dependency array** — the most commonly misunderstood thing in React.
- The **lazy initializer** pattern for `useState`.

## Run

```bash
cp -r snapshots/snapshot-07-useeffect-localstorage/src/* src/
npm run dev
```

Open DevTools → Console. You'll see "saved N todos" log on every change. Refresh the page — todos persist. Click "Reset to defaults" to clear.

## Things to point out

### What is `useEffect`?

```ts
useEffect(() => {
  // run this AFTER React has updated the DOM
}, [todos]);  // ...whenever any of these values change
```

It's how you say: **"after the component renders, do this side effect."**

Side effects include:
- Talking to localStorage
- Fetching data
- Setting up timers
- Subscribing to events

Anything that touches the world **outside React's rendering**.

### The dependency array — THE KEY IDEA

The second argument controls **how often the effect runs**:

| Dependency array | Effect runs... |
|---|---|
| `[]` (empty) | Once, on mount |
| `[todos]` | On mount AND whenever `todos` changes |
| `[todos, filter]` | On mount AND when either changes |
| *(omitted)* | After EVERY render — almost always a bug |

In this snapshot:
```ts
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}, [todos]);
```
→ Saves on first render, and again every time `todos` updates. Exactly what we want.

### The lazy initializer

```ts
const [todos, setTodos] = useState<Todo[]>(() => {
  const raw = localStorage.getItem(STORAGE_KEY);
  // ...
  return JSON.parse(raw) as Todo[];
});
```

Passing a **function** to `useState` makes it lazy — React only calls it on the first render. If you wrote:

```ts
useState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))  // BAD
```

…it would still work, but `JSON.parse` would run on **every** render (React just ignores the result after the first). Wasted work. Use a function when initial state is expensive to compute.

### Why React.StrictMode runs effects twice (in dev)

If you watch the console you may notice "saved" logs appearing twice on first load. That's StrictMode (in `main.tsx`) intentionally double-invoking effects in development to surface bugs. Production builds run them once. Don't try to "fix" it.

### Reading vs writing localStorage

- **Reading on mount** → in the lazy initializer (one-time).
- **Writing on change** → in `useEffect` with `[todos]` dependency.

You could also write inline in every handler (`addTodo`, `toggleTodo`, etc.) but then you'd repeat the JSON.stringify everywhere. `useEffect` centralizes it.

## Common mistakes

- **Forgetting the dependency array entirely.** Effect runs after every render → infinite loop if the effect itself triggers a re-render.
- **Empty array when you needed dependencies.** Effect runs once, then never updates → stale data on screen.
- **Putting non-serializable things in localStorage** (functions, class instances). Stick to JSON.
- **Trying to use `localStorage` during render** instead of in `useEffect`. Works for *reading* (it's synchronous) but unsafe in environments where `window` doesn't exist (e.g., server-side rendering, which Vite doesn't do by default but Next.js does).

## What to land

- `useEffect(fn, deps)` runs `fn` after render whenever `deps` change.
- The dependency array is how you control when side effects happen.
- Reading initial state from outside React → lazy initializer in `useState`. Writing changes back → `useEffect`.
