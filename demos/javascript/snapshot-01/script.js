// ============================================================
// Snapshot 01 — Variables, types, output
//
// The goal of this file is to introduce:
//   1. console.log — how JS talks to us
//   2. Comments — // single line, /* multi line */
//   3. Variables — let and const
//   4. Primitive types — string, number, boolean, null, undefined
//   5. typeof — ask JS what type something is
//   6. Basic operators — +, -, *, /, %, **
//   7. The === vs == difference (use === always)
//
// Run: open index.html, then open DevTools Console (F12 → Console).
// ============================================================


// ------------------------------------------------------------
// 1. console.log — your first line of JS
// ------------------------------------------------------------

console.log("Hello, CSCI 39548!");

// You can log multiple things at once, separated by commas.
console.log("This is", "snapshot", 1, "of the JS demo.");


// ------------------------------------------------------------
// 2. Comments
// ------------------------------------------------------------

// This is a SINGLE-LINE comment. The browser ignores it.

/*
  This is a MULTI-LINE comment.
  Useful for longer explanations.
  Ignored by the browser.
*/


// ------------------------------------------------------------
// 3. Variables: let and const
//
//   let   = a variable you can REASSIGN later
//   const = a variable you CANNOT reassign (constant)
//   var   = the old way, DO NOT USE in modern JS
//
// Rule of thumb: prefer `const` by default. Switch to `let` only
// when you actually need to reassign the variable.
// ------------------------------------------------------------

// A const — fixed. Can't be reassigned.
const studentName = "Sourya";

// A let — can be reassigned.
let firstTodo = "Buy groceries";

// We can log them.
console.log("Student name:", studentName);
console.log("First todo:", firstTodo);

// Reassign the let.
firstTodo = "Buy groceries and call mom";
console.log("Updated first todo:", firstTodo);

// If we try to reassign a const, JS throws an error:
//   studentName = "Someone else";   // ❌ TypeError: Assignment to constant variable.
// (Uncomment the line above and reload to see the error in the console.)


// ------------------------------------------------------------
// 4. Primitive types
//
// JavaScript has several PRIMITIVE types:
//   string     - text in quotes ("hello" or 'hello' or `hello`)
//   number     - 42, 3.14, -7   (one type for both integers and floats)
//   boolean    - true or false
//   null       - "this variable intentionally has no value"
//   undefined  - "this variable hasn't been given a value yet"
//   bigint, symbol  - rarely used by beginners; ignore for now
// ------------------------------------------------------------

const todoText      = "Finish HTML/CSS demo";      // string
const todoPriority  = 2;                            // number
const todoIsDone    = false;                        // boolean
const todoNotes     = null;                         // null (deliberately empty)
let   todoAssignee;                                 // undefined (no value yet)

console.log("Text:    ", todoText);
console.log("Priority:", todoPriority);
console.log("Done?    ", todoIsDone);
console.log("Notes:   ", todoNotes);
console.log("Assignee:", todoAssignee);


// ------------------------------------------------------------
// 5. typeof — ask JS what type something is
// ------------------------------------------------------------

console.log("---");
console.log("typeof todoText     =", typeof todoText);      // "string"
console.log("typeof todoPriority =", typeof todoPriority);  // "number"
console.log("typeof todoIsDone   =", typeof todoIsDone);    // "boolean"
console.log("typeof todoNotes    =", typeof todoNotes);     // "object" (a famous JS bug — null reports as "object")
console.log("typeof todoAssignee =", typeof todoAssignee);  // "undefined"


// ------------------------------------------------------------
// 6. Basic operators
// ------------------------------------------------------------

console.log("---");

const a = 10;
const b = 3;

console.log("a + b  =", a + b);   // 13 (addition)
console.log("a - b  =", a - b);   // 7  (subtraction)
console.log("a * b  =", a * b);   // 30 (multiplication)
console.log("a / b  =", a / b);   // 3.3333... (division)
console.log("a % b  =", a % b);   // 1 (modulo — the remainder after division)
console.log("a ** b =", a ** b);  // 1000 (exponentiation, a to the power b)

// `+` also concatenates strings:
console.log("Hello, " + studentName + "!");


// ------------------------------------------------------------
// 7. === vs ==   (use === always)
//
// === is the STRICT EQUALITY operator. It compares value AND type.
// ==  is the LOOSE EQUALITY operator. It tries to convert types first.
//     That's a source of weird bugs. Avoid ==.
// ------------------------------------------------------------

console.log("---");

console.log("5 === 5      :", 5 === 5);        // true
console.log("5 === '5'    :", 5 === "5");      // false (different types)
console.log("5 ==  '5'    :", 5 == "5");       // true (== silently converts "5" to 5 — confusing)
console.log("null === undefined:", null === undefined);  // false
console.log("null ==  undefined:", null == undefined);   // true (loose equality treats them the same — also confusing)

// Take-away: ALWAYS use === and !==. Never == or !=.


// ------------------------------------------------------------
// FINAL MESSAGE
// ------------------------------------------------------------

console.log("---");
console.log("End of snapshot 01.");
console.log("Next snapshot: conditionals (if/else) and loops.");
