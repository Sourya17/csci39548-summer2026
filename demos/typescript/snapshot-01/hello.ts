// ============================================================
// Snapshot 01 — Local TypeScript setup
//
// This is your first .ts file that we'll compile and run locally.
// Steps (also in README.md):
//
//   1. npm install -g typescript        (one time, installs the `tsc` command)
//   2. tsc hello.ts                     (compiles hello.ts → hello.js)
//   3. node hello.js                    (runs the compiled JS)
//
// Then look at hello.js to see what TypeScript turned your code into.
// Spoiler: the types are gone. They were only there to help you.
// ============================================================


// A type annotation — `: string` says "userName is a string".
const userName: string = "Sourya";

// TypeScript can also INFER the type. We didn't write `: number`,
// but TS knows `age` is a number because we assigned a number to it.
const age = 21;

console.log(`Hello, ${userName}! You are ${age} years old.`);

// Note: we used `userName` instead of `name` because `name` is a
// built-in browser global (the window's name). Top-level const
// collides with it. This is the kind of small papercut TS warns
// you about — and a free lesson in avoiding generic globals.


// Try this to see TypeScript catch an error:
//
//   const greeting: string = 42;
//
// Uncomment that line, then run `tsc hello.ts` again. The compiler
// will refuse to produce hello.js until you fix the type.
