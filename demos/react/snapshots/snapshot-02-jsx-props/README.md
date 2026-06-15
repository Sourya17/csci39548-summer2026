# Snapshot 02 — JSX + Props

## What this snapshot does

Renders three todos using a reusable `TodoCard` component. Each card receives a `todo` object as a **prop**.

## What's new

- A second component (`TodoCard`) in the same file.
- The `Todo` interface — same shape as in the TypeScript demo (snapshot-05 of the TS demo). The connection should feel familiar.
- **Props**: how parents pass data to children.

## Run

```bash
cp -r snapshots/snapshot-02-jsx-props/src/* src/
npm run dev
```

## Things to point out

- **Components are functions.** `TodoCard` takes `props` and returns JSX. That's the whole idea.
- **Props are typed.** `{ todo }: { todo: Todo }` says "this component receives an object with a `todo` field, and the value is a `Todo`." TS catches typos immediately.
- **JSX expressions use `{}`.** Anything between curly braces is JavaScript. `{todo.text}` evaluates the property and inserts it. `{todo.done ? "done" : "todo"}` is a regular ternary.
- **You pass props like HTML attributes.** `<TodoCard todo={todo1} />` — but the value is JS, so it's in `{}` not `""`.
- **The parent doesn't know how `TodoCard` looks.** It just hands data over. This is the React mental model: **data flows down**.

## Common student mistakes

- Forgetting that `class` becomes `className` in JSX (HTML reserved word).
- Forgetting `{}` and writing `todo.text` as literal text inside JSX (will show the string "todo.text" on screen).
- Using `style="color: red"` like in HTML. In React it's `style={{ color: "red" }}` — object, not string.

## What to land

- A component is a function. It takes props (one argument, an object) and returns JSX.
- Props let you reuse the same component with different data.
- TypeScript types catch wrong props at compile time, not runtime.
