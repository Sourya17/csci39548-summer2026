# Snapshot 01 — Vite scaffold + Hello, React!

## What this snapshot does

Nothing fancy. A single `<h1>` on the page, rendered by React. The point is to **see the pipeline working**: TypeScript source → Vite dev server → browser.

## Files

```
src/
├── main.tsx   ← entry point: hands the page to React
└── App.tsx    ← your first React component
```

## How to run

From the demo root (`Summer2026/demos/react/`):

```bash
cp -r snapshots/snapshot-01-hello/src/* src/
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## Things to point out in class

- **`main.tsx` is the entry.** `index.html` loads it with `<script type="module" src="/src/main.tsx">`. The HTML is almost empty — React fills in `<div id="root">` at runtime.
- **`App.tsx` is a function that returns JSX.** That's a component. No classes, no boilerplate.
- **JSX looks like HTML but is JavaScript.** `<h1>Hello</h1>` becomes a function call under the hood (`React.createElement("h1", null, "Hello")`).
- **`style={{ ... }}` is two braces** — the outer braces escape into JS, the inner ones make an object. This will trip students up.
- **Hot reload.** Change "Hello, React!" to anything, save, watch the browser update without refresh. That's Vite.

## What to land

- React = a library for building UIs out of small functions that return JSX.
- Vite = the dev server and build tool that makes React fast to work on.
- A component is **just a function that returns JSX**.
