# Snapshot 05 — Arrays, objects, interfaces

## The lesson

This is where TypeScript stops being decoration and starts being **architecture**. Interfaces let you say "a Todo has these fields, this is how every part of the code agrees on what a Todo looks like." That alignment is half the value of TS.

## Quick reference

| What | Syntax |
|---|---|
| Array | `number[]` or `Array<number>` |
| Tuple | `[number, string]` |
| Inline object | `{ name: string; age: number }` |
| Optional field | `phone?: string` |
| Readonly | `readonly id: number` |
| Named shape | `interface Todo { ... }` |
| Extend | `interface Big extends Small { extra: string }` |
| Type alias | `type UserId = number;` |

## `interface` vs `type` — the heuristic

| Use `interface` when... | Use `type` when... |
|---|---|
| Naming an object shape that may be extended | Aliasing a union, a primitive, or a function type |
| Building a public-API type for a library | Composing unions and intersections |
| You want it to feel "class-like" | Pretty much everything else |

For day-to-day app code, **`interface` for object shapes, `type` for everything else** is the simplest rule that won't bite you.

## Files in this snapshot

- `shapes.ts` — eight numbered sections plus a "Putting it together" block. Introduces the `Todo` interface that the rest of the snapshots will reuse.

## Quick run

```bash
tsc shapes.ts && node shapes.js
```

All sections print. Uncomment any `// ❌` line to see TS reject the bad shape — these are the most useful demos for class.

## What to land in class

- **The Todo interface is the centerpiece.** Reusable. Self-documenting. Refactor-safe.
- Show what happens when you add a new field to `Todo` — every callsite that creates a Todo lights up red. That's the *refactor superpower*.
- Mention `interface` vs `type` briefly — don't get pulled into the philosophical debate. The rule above is enough.

## What we deliberately skip

- **Intersection types** (`A & B`) — too abstract for first exposure
- **Index signatures** (`{ [key: string]: any }`) — code smell, save for advanced
- **Class implementations of interfaces** — JS demo covered classes; mixing them with interfaces here would crowd the snapshot
