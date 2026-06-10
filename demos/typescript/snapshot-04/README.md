# Snapshot 04 — Function types

## The lesson

Functions are where most of your type annotations live. The two big rules:

1. **Annotate parameters.** TS can't read the minds of callers.
2. **Let TS infer the return type** — unless you want to lock the contract or you're writing API-level code.

Everything else in this snapshot (optional, default, rest, void, type aliases) is variations on those two rules.

## Quick reference

| Feature | Syntax |
|---|---|
| Typed parameter | `function f(x: number)` |
| Explicit return | `function f(x: number): string` |
| Optional param | `function f(x: number, y?: string)` |
| Default param | `function f(x = 0)` (type inferred from default) |
| Rest param | `function f(...args: number[])` |
| No return | `function f(): void` |
| Function alias | `type Fn = (n: number) => number;` |

## Files in this snapshot

- `functions.ts` — one file, seven numbered sections plus a "Putting it together" block.

## Quick run

```bash
tsc functions.ts && node functions.js
```

Output shows the typed function calls running cleanly. The interesting parts are the commented-out lines — uncomment any of them to see TS reject the bad call.

## The `export {}` at the bottom

You'll spot this line at the end of the file. It makes `functions.ts` a **module**, which gives every top-level name (like `add`, `greet`, `double`) its own scope — no more collisions with browser globals like `name` or `open`. Real projects organize code as modules; we'll lean on this pattern from here on.

## What to land in class

- Show **one** annotated parameter. Hover the function call in VS Code to see the signature.
- Uncomment a wrong call (`add(2, "3")`). Watch the red squiggle.
- Walk through `NumberTransformer` — this is how you start typing callbacks in real codebases. Foreshadows React's event handler types.
