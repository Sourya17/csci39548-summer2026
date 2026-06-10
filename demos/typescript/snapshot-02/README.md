# Snapshot 02 — Why TypeScript?

## The story arc for this snapshot

1. **Show `buggy.js`** in VS Code. Walk through the code. Ask: "Spot the bug?"
2. **Run it.** `node buggy.js` or copy into browser console. Output:
   ```
   Total: $10010
   Fixed total: $110
   ```
   The first total is wrong. JS gave us no warning.
3. **Switch to TypeScript Playground.** Open https://www.typescriptlang.org/play and paste `buggy.ts`.
4. **Point at the red squiggles.** TypeScript caught the bug **without running the code**. The compiler refuses to produce JavaScript until the bug is fixed.

## The one-sentence definition

> **TypeScript is JavaScript with a static type checker bolted on.**

That's it. Same language, same syntax, plus a layer that reads your code and warns you when you use values the wrong way.

## Why this matters

- **Bugs you find at edit time are 100x cheaper than bugs your users find at runtime.**
- A "type" is just a label for what kind of value something is (string, number, list of users, etc.). TS uses those labels to spot inconsistencies.
- Modern editors (VS Code) light up with autocomplete, parameter hints, "rename symbol" — all powered by the TS type checker.
- **You almost never run TypeScript directly.** You compile it to JavaScript, then run the JavaScript. The browser/Node never see your types.

## What we are NOT doing in this class

- Installing TypeScript locally (yet). The Playground does compilation for us in the browser.
- Configuring `tsconfig.json`. Save that for React class when Vite handles it.
- Learning every type-system feature. We're learning **enough TS** to be safe in a React codebase. That's it.

## Files in this snapshot

- `buggy.js` — the same code as JavaScript, runnable today, bug and all
- `buggy.ts` — same code as TypeScript, with one type annotation that catches the bug
