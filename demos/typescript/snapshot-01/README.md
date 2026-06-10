# Snapshot 01 — Local TypeScript setup

Before we learn what TypeScript *does*, let's get it running on every student's machine.

## Why local, not Playground?

The Playground (`typescriptlang.org/play`) is great for quick experiments, but every real TS project runs the compiler locally. Students need to feel the loop:

```
write .ts  →  compile to .js  →  run the .js
```

That's the whole pipeline. Once they see it once, everything else makes sense.

## One-time install

```bash
npm install -g typescript
```

This gives them a global `tsc` command. Verify with:

```bash
tsc --version
```

> Today's version on Sourya's machine: **6.0.3**. Anything 5.x or 6.x is fine.

## The compile-and-run flow

In this folder:

```bash
tsc hello.ts          # produces hello.js
node hello.js         # runs it → "Hello, Sourya! You are 21 years old."
```

Open `hello.js` after compiling. **The type annotations are gone.** TypeScript stripped them out. They were only there to help the developer — the browser/Node never see them.

That's the mental model:

> **TypeScript is a development tool.** It runs at compile time, catches bugs, then disappears.

## Watch mode (the productive workflow)

```bash
tsc --watch hello.ts
```

Now `tsc` stays running. Every time you save `hello.ts`, it auto-rebuilds `hello.js`. Open a second terminal for `node hello.js`. This is how you'll actually work in a project.

Stop with **Ctrl+C**.

## See the compiler refuse

`broken.ts` has a deliberate type error:

```ts
const score: number = "ninety";   // ❌ string assigned to number
```

Run:

```bash
tsc broken.ts
```

The compiler prints a clear error:

```
broken.ts:11:7 - error TS2322: Type 'string' is not assignable to type 'number'.

11 const score: number = "ninety";
         ~~~~~
```

⚠️ **Gotcha to call out:** by default, `tsc` *still emits* `broken.js` even when there are errors. The errors print, but the file is produced. In a real project (with `tsconfig.json`) you turn on `noEmitOnError: true` to refuse output on error. We'll skip `tsconfig.json` in this class — Vite + React will handle that for us later.

## VS Code gives you all of this for free

If students have VS Code and the file is `.ts`, they see red squiggles **as they type** — no need to run `tsc` to know there's an error. The `tsc` CLI is what runs in CI/build pipelines. The editor uses the same engine for the squiggles.

## Files in this snapshot

- `hello.ts` — first TS file with a type annotation and inference
- `broken.ts` — same idea but with a deliberate type error to show the compiler reaction

## What students walk away with

- `tsc` installed globally
- They've compiled their first `.ts` to `.js`
- They've seen the compiled output (types stripped)
- They've seen a type error in the terminal
- They understand TS is a *build-time* helper, not a runtime layer
