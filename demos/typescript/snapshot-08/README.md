# Snapshot 08 — Modules (`export` / `import`)

## Why this matters

Every file in a React project starts with imports:

```ts
import { useState, useEffect } from "react";
import { Todo } from "./types";
import TodoCard from "./TodoCard";
```

If students don't understand exports/imports, they're staring at gibberish on day one of React. This snapshot fixes that.

## The two kinds of exports

| | Named export | Default export |
|---|---|---|
| **How many per file?** | As many as you want | At most one |
| **Import syntax** | `import { foo } from "./x"` | `import foo from "./x"` |
| **Renaming on import** | `{ foo as bar }` | Just pick any name |
| **Best for** | Most things | The "main" thing in a file |

## File structure of this snapshot

```
snapshot-08/
├── todo-types.ts   ← exports the Todo interface + Priority type
├── todo-utils.ts   ← imports types, exports helper functions (named + default)
└── main.ts         ← imports everything, runs the demo
```

## Quick run

```bash
tsc main.ts && node main.js
```

`tsc` follows the imports and compiles all three files automatically. You'll get `todo-types.js`, `todo-utils.js`, `main.js` side by side.

## Things to point out

- **Import paths use `.js`, NOT `.ts`.** Even though you're writing TypeScript, the path should be `from "./todo-types.js"`. TS leaves the path untouched during compilation; Node's ESM loader needs the actual runtime filename. This trips up everyone the first time — call it out in class.
- **Relative paths use `./` and `../`.** Bare names like `"react"` mean a node_modules package.
- **Types-only exports** are common: `export interface Todo { ... }`. Same syntax as exporting a value.
- **The `export {}` we used at the bottom of earlier snapshots** wasn't useless — it turned those files into modules so top-level names didn't collide with browser globals (`name`, `open`, `top`, etc.). Now we're doing real exports, so that hack is unnecessary.

## What to land in class

- **Show all three files open at once.** Watch the import graph: `main` → `todo-utils` → `todo-types`.
- **Demonstrate the autocomplete.** Inside `main.ts`, type `import { ` — VS Code suggests what's available across the project. That's the typed-modules superpower.
- **Bridge to React:** "Every React component lives in its own file with named or default exports. The patterns you just saw work identically there."

## What we deliberately skip

- **`import * as foo from "..."`** (namespace imports) — rare in app code
- **CommonJS vs ESM** — historical baggage; Vite handles it
- **Re-exports** (`export { foo } from "./bar"`) — useful in libs, not learners
- **Module declaration files** (`*.d.ts`) — toolchain stuff
