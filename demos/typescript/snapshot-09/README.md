# Snapshot 09 — Async with types

## The lesson

Students already learned `async`/`await` + `fetch` + `try`/`catch` in the JS demo. This snapshot adds the **type layer** — same code, fewer mysteries about what each piece returns.

The three things to land:

1. **`Promise<T>`** — read as "a future T." Any async function returns one.
2. **`fetch().then(r => r.json())` returns `any`** — the boundary where TS can't see what the server sent. You have to **declare the expected shape** and cast.
3. **`catch (err: unknown)`** is the modern safe default. Force a narrow before you trust `err.message`.

## Quick reference

| Concept | Type |
|---|---|
| Function returning a Promise | `Promise<T>` |
| Async function signature | `async function f(): Promise<T>` |
| `await somePromise<T>` | unwraps to `T` |
| `response.json()` | `Promise<any>` (you must narrow!) |
| Caught error | `unknown` (narrow with `instanceof Error`) |

## Files in this snapshot

- `async.ts` — four numbered sections: `Promise<T>`, async return types, typed fetch, `catch (err: unknown)`.

## Quick run

```bash
tsc async.ts && node async.js
```

Output prints out of order because operations are async. You'll see:

- `waited 50ms` after a short delay
- `doubleSlowly(5): 10` and `tripleSlowly(5): 15`
- Three todos fetched from `jsonplaceholder.typicode.com`

If your machine has no internet, the `catch` block fires and prints the network error — also a useful demo of the unknown-narrowing pattern.

## What to land in class

- **Type a fetch from scratch in front of the class.** Open `async.ts`, blank out the `ApiTodo` interface. Watch `todos[0].title` go from "anything goes" to "title is string" the moment you restore the interface. That's the win.
- **Compare with the JS demo's snapshot-10.** Same logic, but here every variable's type is visible to the editor. Bug catching for free.
- **Bridge to React:** "TanStack Query (week 3) does all of this — `useQuery<Todo[]>(...)` returns typed data. You're learning the raw version now so the abstraction makes sense later."

## What we deliberately skip

- **Promise combinators** (`Promise.all`, `Promise.race`) — useful but not core to first exposure
- **Zod / runtime schema validation** — the *correct* answer for `response.json()`, but it's a library, not a TS feature. Mention in slides if you have time.
- **Custom type guards** (`function isApiTodo(x: unknown): x is ApiTodo`) — same as above, advanced
