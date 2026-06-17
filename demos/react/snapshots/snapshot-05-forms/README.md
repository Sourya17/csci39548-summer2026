# Snapshot 05 — Forms (Controlled Inputs)

## What this snapshot does

Real form. Type a todo's text and minutes, click "Add", new card appears with your data. A live preview below the form shows the form state updating on every keystroke.

## What's new

- A `<form>` with `<input>`s.
- **Controlled inputs** — input's value lives in React state, not the DOM.
- `onChange` event handlers.
- `onSubmit` with `preventDefault()`.
- The TypeScript event type: `React.FormEvent<HTMLFormElement>`.

## Run

```bash
cp -r snapshots/snapshot-05-forms/src/* src/
npm run dev
```

Type in the text box — the live preview below updates as you type. Click "Add" — todo appears, form clears.

## Things to point out

### Controlled input pattern

Every text input in React looks like this:

```tsx
<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

Two things make it "controlled":
1. `value={text}` — input always displays React state.
2. `onChange` — every keystroke updates React state.

State is the **source of truth**. The DOM mirrors it.

### Why bother? (uncontrolled inputs work too)

The point of putting input state in React is that you can:
- Validate as the user types
- Disable the submit button when empty
- Format on the fly (uppercasing, masking)
- Reuse the value elsewhere in the UI (like the live preview)

The browser remembers the value either way — but React only "knows" the value if you put it in state.

### `preventDefault()`

```ts
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  // ...
}
```

Without this, submitting the form **reloads the page** — that's the default HTML behavior. You almost always want `preventDefault()` in a React form.

### One input, one piece of state

For a 2-field form: two `useState` calls. For a 10-field form: one `useState` with an object, or a library like react-hook-form. Don't worry about the big-form case yet.

### Number inputs

`<input type="number">` — the value is still a **string**. Use `Number(e.target.value)` to convert.

## Common mistakes

- Forgetting `value={text}` (only `onChange` set). The input "works" but React doesn't actually control it — typing won't trigger re-renders elsewhere.
- Forgetting `preventDefault()` and watching the page reload on submit.
- Using `onClick` on a submit button instead of `onSubmit` on the form. Submit-on-Enter won't work.
- Not clearing the form after submit (`setText("")`).

## What to land

- Controlled input = `value` from state + `onChange` to update state.
- Forms use `onSubmit` + `preventDefault()`.
- This pattern works for every input type — text, number, checkbox, select.
