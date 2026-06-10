// ============================================================
// Snapshot 03 — Primitive types + inference
//
// Run:  tsc types.ts && node types.js
//
// New ideas:
//   1. The primitive types: string, number, boolean, null, undefined
//   2. TYPE INFERENCE — the headline feature. TS guesses the type
//      from the value, so you rarely write annotations.
//   3. When to ANNOTATE vs let TS infer.
//   4. `any` — the escape hatch. Avoid.
//   5. `unknown` — the safe escape hatch.
// ============================================================


// ------------------------------------------------------------
// 1. The primitive types — with explicit annotations.
//
// The annotation goes AFTER the variable name, separated by `: `.
// ------------------------------------------------------------

const userName: string  = "Sourya";
const age:      number  = 21;
const isActive: boolean = true;

console.log(userName, age, isActive);


// ------------------------------------------------------------
// 2. TYPE INFERENCE — the headline feature.
//
// You almost never need to write the annotation. TS reads the
// value and figures out the type for itself.
// ------------------------------------------------------------

const city = "New York";   // TS infers: string
const year = 2026;         // TS infers: number
const isOpen = false;      // TS infers: boolean

// Hover over `city` in VS Code — you'll see `const city: string`.
// Same protection, less typing.


// ------------------------------------------------------------
// 3. When to write annotations
//
// Rule of thumb: ANNOTATE WHEN TS CAN'T INFER.
//
//   - Function PARAMETERS — TS doesn't know what callers will pass
//   - Variables declared without a value (declared `let` then assigned later)
//   - When the inferred type is too narrow or too wide for your needs
// ------------------------------------------------------------

// Example: variable declared without a value.
let score: number;
score = 95;
// score = "ninety-five";   // ❌ would be an error

// Example: function parameter — annotate the parameter, infer the return.
function double(n: number) {
  return n * 2;            // TS infers return type: number
}
console.log("double(5):", double(5));


// ------------------------------------------------------------
// 4. `null` and `undefined`
//
// Both exist in TS. Their types are exactly `null` and `undefined`.
// In practice you'll see them inside UNION types (snapshot 06):
//     let maybeName: string | null;
// ------------------------------------------------------------

const nothing: null = null;
const notSet:  undefined = undefined;
console.log(nothing, notSet);


// ------------------------------------------------------------
// 5. `any` — the escape hatch. AVOID.
//
// `any` tells TS to stop checking. Anything goes.
// You lose every benefit of using TS.
//
// You'll see `any` in old code and quick hacks. Treat it as a
// code smell. If you need an escape hatch, use `unknown` instead.
// ------------------------------------------------------------

let anything: any = 5;
anything = "now a string";
anything = { foo: "bar" };
anything.thisMethodDoesNotExist();   // TS allows this. CRASHES at runtime.

console.log("Survived the any block.");


// ------------------------------------------------------------
// 6. `unknown` — the SAFE escape hatch.
//
// Like `any`, but TS REFUSES to let you use the value until you
// prove what type it actually is (via `typeof` checks — covered
// in snapshot 06). Great for values coming from JSON / fetch.
// ------------------------------------------------------------

let mystery: unknown = "hello";

// mystery.toUpperCase();   // ❌ TS error — we haven't proven it's a string.

if (typeof mystery === "string") {
  // Inside this `if`, TS now KNOWS mystery is a string.
  console.log(mystery.toUpperCase());   // ✓ OK — HELLO
}


// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// Inference is the lesson. Annotate function PARAMETERS. Let TS
// infer everything else. Reach for `unknown`, never `any`.
// ------------------------------------------------------------

function greet(person: string, ageYears: number) {
  // `greeting` is inferred as string.
  const greeting = `Hi, ${person}! You are ${ageYears}.`;
  return greeting;
}

console.log(greet("Sourya", 21));
// greet(21, "Sourya");   // ❌ argument order/type wrong — TS catches it.


console.log("---");
console.log("End of snapshot 03.");
console.log("Next snapshot: function types — deeper into typed functions.");
