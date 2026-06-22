# Snapshot 10 — Component Splitting

## What this snapshot does

**Same behavior as snapshot 09.** Zero new features. The whole point is to take the monolith `App.tsx` and break it into focused files. The UI is identical — but the code is now organized like a real React app.

## What's new

- A `components/` folder.
- A shared `types.ts` for `Todo` and `Filter`.
- Five components: `App`, `TodoSummary`, `TodoFilter`, `TodoList`, `TodoCard`, `TodoForm`.
- Each component has **one responsibility**.

## Run

```bash
cp -r snapshots/snapshot-10-splitting/src/* src/
rm -rf src/components   # safety: remove leftovers if any
cp -r snapshots/snapshot-10-splitting/src/components src/
npm run dev
```

(Or just delete `src/` first, then copy. The point is: this snapshot adds a folder.)

## File map

```
src/
├── main.tsx
├── App.tsx                  ← state + handlers + composition
├── types.ts                 ← Todo, Filter
└── components/
    ├── TodoSummary.tsx      ← shows counts/minutes
    ├── TodoFilter.tsx       ← all/active/done buttons
    ├── TodoList.tsx         ← renders the array
    ├── TodoCard.tsx         ← one todo row
    └── TodoForm.tsx         ← the add form
```

## Things to point out

### Why split?

When `App.tsx` reached ~140 lines, several problems started:
- Hard to find any one piece of UI.
- The form's two `useState` calls (text, minutes) were polluting the parent's scope.
- You couldn't reuse `TodoCard` anywhere else without copy-pasting.

After splitting:
- Each file does one thing.
- `App.tsx` is now ~40 lines and reads as **structure**, not UI.
- Each child component has a clear "API" — its props.

### State stays in App

Notice: **all state still lives in `App.tsx`.** Children just receive data and callbacks. Splitting components doesn't mean splitting state.

There's ONE exception: `TodoForm` keeps its own `text` and `minutes` state. Why?

> If state is **only used by one component**, it can live in that component. The parent doesn't care about the typing-in-progress text — only the final submitted values.

`TodoForm` "encapsulates" the form's local state and exposes only what the parent needs: `onAdd(text, minutes)`. This is good design.

### Import patterns

- `import type { Todo } from "../types"` — the `type` keyword tells the compiler "this is types-only," safe to erase at build time.
- `import TodoCard from "./TodoCard"` — default import. The file does `export default function TodoCard(...)`.
- `import { useState } from "react"` — named import.
- Relative paths use `./` and `../`. `./TodoCard` finds `TodoCard.tsx` in the same folder.

### When to make a new component?

A loose rule of thumb:
- More than ~100 lines in one file → think about splitting.
- A piece of JSX repeated 2+ times → extract.
- A chunk of UI with its own state/logic → extract.
- A chunk you might want to reuse elsewhere → definitely extract.

There's no hard rule. Erring on the side of MORE components is fine; erring on the side of "tiny components" (3-line wrappers everywhere) is annoying.

### Naming

- Components: **PascalCase** files and exports (`TodoCard.tsx`, not `todoCard.tsx`).
- Hooks: **camelCase** starting with `use` (`useTodos`, not `UseTodos`).
- Types/interfaces: PascalCase (`Todo`, `Filter`).

These are conventions, not enforced by the compiler. Follow them.

## Common mistakes

- Moving a component to its own file but forgetting to `export default` it.
- Forgetting to update the import path after moving a file.
- Lifting state down (giving each `TodoCard` its own `useState` for `done`). Same issue as snapshot 06 — children duplicate parent data.
- Over-splitting: extracting 3-line components that aren't reused. Adds files without clarity.

## What to land

- Splitting components is about **readability and reuse**, not behavior.
- State usually lives in the parent; local-only state can live in the child.
- Each file = one component (mostly). Use a `components/` folder.
