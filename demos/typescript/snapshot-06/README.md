# Snapshot 06 — Unions, literal types, narrowing

## The lesson

This is the snapshot where TypeScript starts feeling **smart**. The compiler can read your `if` statements and figure out what type a variable has inside each branch. That's called **narrowing**, and it's one of the most "wait, that actually works?" moments for new TS learners.

The other half: **literal types** turn plain primitives into a finite set of allowed values. Goodbye to typo bugs like `priority: 4` slipping through.

## Quick reference

| Concept | Syntax |
|---|---|
| Union | `string \| number` |
| String literal union | `"high" \| "med" \| "low"` |
| Numeric literal union | `1 \| 2 \| 3` |
| Narrow via `typeof` | `if (typeof x === "string") {...}` |
| Narrow via equality | `if (user !== null) {...}` |
| Narrow via `in` | `if ("meow" in pet) {...}` |
| Narrow via `instanceof` | `if (e instanceof Error) {...}` |

## Files in this snapshot

- `unions.ts` — seven numbered sections + "Putting it together" upgrading the `Todo` interface so `priority` is `1 | 2 | 3` (not just `number`).

## Quick run

```bash
tsc unions.ts && node unions.js
```

Output prints all sections cleanly. The most useful demo for class is uncommenting `priorityLabel(4)` — TS rejects it with a precise error saying "4 is not assignable to type '1 | 2 | 3'."

## What to land in class

- **Narrowing is the headline.** Show the same `x: string | number` inside vs outside an `if (typeof x === "string")`. Hover x in VS Code: outside it's `string | number`, inside it's just `string`. That's the magic.
- **Literal unions are bug repellent.** Compare `priority: number` (anything goes — including 4, 5, 0, -1) vs `priority: 1 | 2 | 3` (compiler enforces the set). Same field, dramatically different safety.
- **`null` in unions is the hand-off to optional values.** Foreshadow `Element | null` from `document.querySelector` — exactly what snapshot 07 builds on.

## What we deliberately skip

- **Discriminated unions** — incredibly useful in React reducers, but too abstract for this pass. Cover when teaching state management.
- **`never` type** — only appears in exhaustive-switch patterns; not needed yet.
- **Type guards (`x is T`)** — custom narrowing functions. Save for when students hit a use case.
