# Snapshot 12 — useRef + DevTools Tour

## What this snapshot does

Same as snapshot 11, plus: the text input is **auto-focused** when the page loads, and refocused after each "Add" so you can type the next todo immediately without clicking.

## What's new

- The `useRef` hook.
- The `ref={...}` JSX prop for grabbing a real DOM element.
- A small UX improvement that demonstrates the only situation where you "touch the DOM" in React.

## Run

```bash
rm -rf src/* && cp -r snapshots/snapshot-12-useref/src/* src/
npm run dev
```

When the page loads, the cursor blinks inside the text box. Type a todo, hit Enter — cursor jumps back into the box. Notice you never click the input manually.

## Things to point out

### What is `useRef`?

```ts
const inputRef = useRef<HTMLInputElement>(null);
```

`useRef` gives you a small box: `{ current: <whatever> }`. The box itself is **stable across renders** — same reference every time. Only `.current` changes.

There are two common uses:

1. **Holding a DOM element** (what we're doing here). React fills `inputRef.current` with the `<input>` after it mounts.
2. **Holding a value you want to remember without re-rendering.** Like a "previous count" or an interval ID for `clearInterval`.

### `ref` vs `useState` — when to use which?

| `useState` | `useRef` |
|---|---|
| Changing it triggers a re-render | Changing `.current` does NOT trigger a re-render |
| For values the UI shows | For values the UI doesn't show |
| `setX(...)` to change | `ref.current = ...` to change |

**Rule:** if updating it should update the screen, use state. If it's just internal bookkeeping (a DOM node, a timer ID, a flag), use a ref.

Misusing `useRef` for UI state is a common mistake. The screen won't update.

### How does the focus work?

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// ...
<input ref={inputRef} ... />
```

React sees `ref={inputRef}` and assigns the DOM element to `inputRef.current` after the element is created. Then:

```ts
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

After the first render, the effect runs and calls the browser's native `.focus()` method on the input.

The `?.` is for safety — TS doesn't know the ref is non-null on first render. (In practice it is, but the type allows null.)

### Why does this even matter? Isn't this just JavaScript?

Yes — `.focus()` is plain DOM. The point of `useRef` is to give React a **disciplined way** to reach into the DOM without bypassing the rendering system. You can't write `document.querySelector("input").focus()` reliably in React — the DOM might not exist yet, or might belong to a different component on the next render.

`useRef` + `ref={}` is React's "escape hatch" to the real DOM.

### When to reach for refs in real apps

- Focusing inputs (this snapshot).
- Triggering scroll position (`scrollIntoView`).
- Integrating with non-React libraries (charting, video players, maps).
- Storing `setInterval`/`setTimeout` IDs to clear later.

In a typical app, you'll have **far** more `useState` than `useRef`. Refs are a niche tool. But when you need them, you really need them.

## React DevTools tour (10 minutes)

Install the **React Developer Tools** browser extension if you haven't. After installing, two new tabs appear in DevTools: **Components** and **Profiler**.

### Components tab

- Click any component in the tree — see its props, state, and hooks in the right panel.
- Click `App` → you'll see the `todos` array in state. Click an item to expand.
- Find `TodoForm` → you'll see `text` and `minutes` state plus the `inputRef`.
- Click `TodoCard` → see the `todo` prop and the three callbacks.
- The eye icon in the top right highlights the component on the page.

### Profiler tab

- Click the record button, interact with the app, click stop.
- Each "commit" (render cycle) shows up as a bar. Width = render time.
- Click a commit → see which components rendered and why.
- Great for understanding "why is X re-rendering?" in a real app.

### Show students

- Inspect any rendered component.
- Edit state/props live in the right panel and watch the UI update.
- Demonstrate "Highlight updates when components render" (settings icon → General).

## Common mistakes

- Using `useRef` for state that should re-render the UI.
- Forgetting that `ref.current` is `null` before mount — don't call `.current.focus()` during render.
- Trying `ref.current` inside the render JSX itself — by then React hasn't set it yet.
- Skipping the React DevTools extension. It's the single highest-leverage tool for React debugging.

## What to land

- `useRef` is for things React shouldn't re-render on, like DOM nodes or timers.
- `ref={...}` attaches a DOM node to a ref.
- Refs are an escape hatch. Use state by default; reach for refs when you need imperative DOM access.
- React DevTools is non-negotiable for serious React work.
