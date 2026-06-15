# Snapshot 07 — `as` casting + `!` non-null (the React bridge)

## Why this snapshot exists

Every React student hits these two operators in their first hour. Without exposure now, they show up cold:

```ts
const input = document.querySelector("#name-input") as HTMLInputElement;
//                                                  ^^^ what is this?

const ref = useRef<HTMLInputElement>(null);
ref.current!.focus();
//          ^ what is this?
```

This snapshot demystifies both **before React confuses them further**.

## The two operators

| Operator | Meaning | Compiles to | When to use |
|---|---|---|---|
| `value as Type` | "Treat this as Type" | nothing (erased) | Narrowing from general to specific (Element → HTMLInputElement) |
| `value!` | "This isn't null/undefined" | nothing (erased) | When you control the HTML and the element definitely exists |

Both are **escape hatches** — TS believes you without checking. The runtime can still crash if you're wrong. Use them carefully.

## The three approaches to `querySelector`

```ts
// 1. Handle null explicitly — safest, verbose
const h = document.querySelector("#x");
if (h !== null) h.textContent = "hi";

// 2. Non-null assert — "I know it's there"
const h = document.querySelector("#x")!;
h.textContent = "hi";

// 3. Type assert — "and treat it as the specific element type"
const input = document.querySelector("#x") as HTMLInputElement;
input.value = "hi";
```

Approach 1 for unknown contexts, 2+3 for your own HTML where you control the page.

## Run it

```bash
tsc dom.ts
```

Then open `index.html` via Live Server (or `python3 -m http.server`). Type a name in the input, click Go, watch the `<h1>` update.

> Note: the `<script>` tag in `index.html` uses `type="module"`. That's required because `dom.ts` ends with `export {}` (which makes the compiled JS a module). Without `type="module"`, the browser rejects the `export` keyword. This is the same setup React/Vite use.

## What to land in class

- **Show the error first.** Comment out the `!` and `as` lines. Watch TS complain on every line that touches an element. That's the "annoying but safe" default.
- **Demonstrate the `as` cast unlocking input methods.** Before the cast, `input.value` is a red squiggle. After, it works. That's the Element → HTMLInputElement narrowing.
- **Bridge to React.** End with: "In React, `useRef<HTMLInputElement>(null)` plus optional chaining (`ref.current?.focus()`) replaces most of this. But the *concept* — TS doesn't trust the DOM by default — stays the same."

## What we deliberately skip

- **Type guards with `is`** (`function isString(x: unknown): x is string`) — useful but specialist
- **Custom assertion functions** (`asserts x is Foo`) — same
- **Generic constraints** (`<T extends ...>`) — out of scope for this class
- **`satisfies` operator** — modern but esoteric
