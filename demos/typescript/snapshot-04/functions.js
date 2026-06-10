// ============================================================
// Snapshot 04 — Function types
//
// Run:  tsc functions.ts && node functions.js
//
// New ideas:
//   1. Parameter type annotations (recap from snapshot 03)
//   2. Return type annotations — usually inferred, sometimes explicit
//   3. Optional parameters with `?`
//   4. Default parameters (the type is inferred from the default)
//   5. Rest parameters — `...nums: number[]`
//   6. `void` — for functions that don't return a value
//   7. Function TYPE ALIASES — naming the shape of a function
// ============================================================
// ------------------------------------------------------------
// 1. Annotate parameters. Let TS infer the return type.
// ------------------------------------------------------------
function add(a, b) {
    return a + b; // TS infers return type: number
}
console.log("add(2, 3):", add(2, 3));
// add(2, "3");   // ❌ second arg is a string
// ------------------------------------------------------------
// 2. Explicit return type — useful for documentation OR when
//    you want TS to enforce a specific contract.
//
// The return type goes AFTER the parameter list: `): TYPE {`.
// ------------------------------------------------------------
function multiply(a, b) {
    return a * b;
}
console.log("multiply(4, 5):", multiply(4, 5));
// ------------------------------------------------------------
// 3. Optional parameters — add `?` after the name.
//
// Optional parameters MUST come AFTER required ones.
// Inside the function, the optional param's type is `T | undefined`.
// ------------------------------------------------------------
function greet(firstName, lastName) {
    if (lastName === undefined) {
        return `Hello, ${firstName}!`;
    }
    return `Hello, ${firstName} ${lastName}!`;
}
console.log(greet("Sourya"));
console.log(greet("Sourya", "Saha"));
// ------------------------------------------------------------
// 4. Default parameters
//
// Type is inferred from the default value. You CAN annotate, but
// you usually don't need to.
// ------------------------------------------------------------
function priorityLabel(p = 3) {
    if (p === 1)
        return "HIGH";
    if (p === 2)
        return "MED";
    return "LOW";
}
console.log("priorityLabel():  ", priorityLabel()); // → LOW
console.log("priorityLabel(1): ", priorityLabel(1)); // → HIGH
// priorityLabel("high");   // ❌ string not assignable to number
// ------------------------------------------------------------
// 5. Rest parameters — type as an ARRAY.
//
// `...nums: number[]` means "any number of `number` arguments,
//  collected into an array called nums."
// ------------------------------------------------------------
function sumAll(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
console.log("sumAll(1,2,3,4):", sumAll(1, 2, 3, 4)); // → 10
// sumAll(1, 2, "three");   // ❌ "three" is a string
// ------------------------------------------------------------
// 6. `void` — when a function returns nothing useful.
//
// `void` is what TS infers for functions with no `return`, or
// with a bare `return;`. You write `: void` to make it explicit,
// usually for callbacks where you want to forbid returning a value.
// ------------------------------------------------------------
function logTwice(message) {
    console.log(message);
    console.log(message);
    // No return statement. Return type is void.
}
logTwice("ping");
const double = (n) => n * 2; // matches the shape
const triple = (n) => n * 3;
console.log("double(5):", double(5));
console.log("triple(5):", triple(5));
// Use it as a parameter type, so any function with the right
// shape works.
function applyTo10(fn) {
    return fn(10);
}
console.log("applyTo10(double):", applyTo10(double));
console.log("applyTo10(triple):", applyTo10(triple));
// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// A typed version of one of the helpers from the JS demo.
// Notice how readable the signature is — the types ARE the docs.
// ------------------------------------------------------------
function formatTime(minutes, includeHours = false) {
    if (!includeHours)
        return `${minutes} min`;
    const hours = (minutes / 60).toFixed(2);
    return `${minutes} min (${hours} h)`;
}
console.log(formatTime(45));
console.log(formatTime(45, true));
// formatTime("45");      // ❌ string not assignable to number
// formatTime();          // ❌ missing required argument
console.log("---");
console.log("End of snapshot 04.");
console.log("Next snapshot: arrays, objects, interfaces.");
export {};
