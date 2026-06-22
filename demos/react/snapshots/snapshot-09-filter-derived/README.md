# Snapshot 09 — Conditional Rendering + Derived State

## What this snapshot does

- Filter buttons (All / Active / Done) decide which todos show.
- A summary line shows live counts and total/remaining minutes.
- An "empty" message shows when the filter has no matches.

## What's new

- **Derived state** — values computed from existing state, NOT stored separately.
- A literal-union type for the filter: `"all" | "active" | "done"`.
- The ternary-vs-`&&` pattern for conditional JSX.
- Disabled buttons as UI state ("you're already on this filter").

## Run

```bash
cp -r snapshots/snapshot-09-filter-derived/src/* src/
npm run dev
```

Click filter buttons → list narrows. Add/toggle/delete → counts update live.

## Things to point out

### Derived state — the big idea

Look at the variables at the top of `App`:

```ts
const visibleTodos = todos.filter(...);
const doneCount = todos.filter((t) => t.done).length;
const activeCount = todos.length - doneCount;
const totalMinutes = todos.reduce((sum, t) => sum + t.minutes, 0);
```

**None of these are in `useState`.** They're computed on every render from `todos`. That's intentional.

**Rule:** if a value can be calculated from existing state, don't put it in `useState`.

Why? Because if you stored `doneCount` in state, you'd have to remember to update it inside every handler (`toggleTodo`, `deleteTodo`, `addTodo`). Forget once and the count is out of sync. With derived state, it's recomputed automatically — impossible to forget.

This is the **#1 mistake new React developers make**: putting derived values in state.

### When DOES derived state get expensive?

If `visibleTodos.filter(...)` is computing over 10,000 items and slowing things down, then you reach for `useMemo`. **Not before.** Don't optimize what isn't slow. The Todo app stays fast for thousands of items as-is.

### Conditional rendering — two patterns

**Ternary** (when there are exactly two branches):
```tsx
{visibleTodos.length === 0 ? (
  <p>No todos to show.</p>
) : (
  <ul>...</ul>
)}
```

**Short-circuit `&&`** (when there's only one branch):
```tsx
{loading && <p>Loading...</p>}
```

The `&&` form has a gotcha: `{0 && <X/>}` renders `"0"` on screen because `0` is falsy. Always use explicit boolean checks (`count > 0 && ...`) when the value might be `0`.

### Literal-union types as state values

```ts
type Filter = "all" | "active" | "done";
const [filter, setFilter] = useState<Filter>("all");
```

You could use a boolean (showCompleted), but that doesn't scale to three states. Literal unions are the right tool — TS catches typos like `setFilter("done!")` immediately.

### The "disabled" button as UI feedback

```tsx
<button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
```

Disabling the currently-selected filter is a cheap way to show "you're here." Avoids needing a separate "selected" CSS class for now (we'll do real styling in the Tailwind demo).

## Common mistakes

- Adding `useState` for `doneCount` and updating it manually. **Don't.**
- Caching `visibleTodos` in state and forgetting to update it when the filter or todos change.
- Using `&&` with a number that might be 0 → "0" leaks into the JSX.
- Adding `useMemo` everywhere "just in case" → noise, no perf gain.

## What to land

- If you can compute it, don't store it in state.
- Use ternaries for two-branch conditional JSX, `&&` for one-branch.
- Literal-union types are perfect for "small fixed set of options" state.
