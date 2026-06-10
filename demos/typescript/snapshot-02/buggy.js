"use strict";
// ============================================================
// Snapshot 02 — Why TypeScript? Part 2: the catch
//
// Same code as buggy.js — but in TypeScript.
// Paste this into https://www.typescriptlang.org/play to see
// the red squiggles WITHOUT running anything.
//
// TypeScript reads the code, figures out what types you have,
// and tells you the bug exists BEFORE you ever click "Run".
// ============================================================
// We DECLARE that the function expects two NUMBERS.
// (The `: number` parts are type annotations. More on these in snapshot 02.)
function calculateTotal(bill, tip) {
    return bill + tip;
}
const billText = "100"; // a string
const tipText = "10"; // a string
// Try to call the function with strings. TypeScript STOPS you here.
//
//   Argument of type 'string' is not assignable to parameter of type 'number'.
//
// Red squiggle. The compiler refuses to produce JS until you fix it.
// You learn about the bug BEFORE the user does.
const total = calculateTotal(billText, tipText);
//                            ^^^^^^^^ ❌ TS error
//                                      ^^^^^^^ ❌ TS error
console.log("Total: $" + total);
// The fix — convert at the boundary where strings become numbers.
const totalFixed = calculateTotal(Number(billText), Number(tipText));
console.log("Fixed total: $" + totalFixed);
// ✓ No errors. Compiles cleanly. Output: "Fixed total: $110"
