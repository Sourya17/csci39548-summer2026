# Snapshot 03 — Primitive types + inference

## The headline lesson

> **You barely have to write types. TypeScript figures them out.**

That's the single most important takeaway from this snapshot. Students arrive expecting to annotate every variable. Show them that idiomatic TS code looks almost identical to JS — just with annotations on **function parameters** and the occasional explicit declaration.

## The five primitives

| Type | Example |
|---|---|
| `string` | `"Sourya"` |
| `number` | `21`, `3.14`, `-5` (one numeric type, no int/float split) |
| `boolean` | `true`, `false` |
| `null` | `null` |
| `undefined` | `undefined` |

That's almost all of them. There's also `bigint` and `symbol` — students will not hit these for a long time.

## When to annotate (the heuristic to teach)

- **Always:** function parameters.
- **Sometimes:** variables declared without an initial value (`let x: number;`).
- **Rarely:** variables initialized at the same line (`const age = 21;` — inference covers it).
- **Almost never:** return types (let TS infer unless you want to lock the contract).

## `any` vs `unknown`

| | `any` | `unknown` |
|---|---|---|
| **TS checks anything?** | No — anything goes | No — you can't use it yet |
| **Safe?** | No | Yes |
| **When to use** | Never, ideally | Values from JSON / fetch / 3rd-party where you must narrow before use |

Show the `any.thisMethodDoesNotExist()` line in `types.ts` — TS lets it through, JS crashes at runtime. Then show that swapping `any` for `unknown` forces you to check first.

## Files in this snapshot

- `types.ts` — one file walking through all five primitives, inference, `any`, `unknown`, with mini "putting it together" at the end.

## Quick run

```bash
tsc types.ts && node types.js
```

You'll see the program crash on the `anything.thisMethodDoesNotExist()` line. That's the lesson: `any` is a runtime landmine. Keep the call there during the demo — students should *see* the crash.
