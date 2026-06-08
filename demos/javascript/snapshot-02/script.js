// ============================================================
// Snapshot 02 — Conditionals + loops
//
// New ideas:
//   1. if / else if / else
//   2. The ternary operator (one-line if/else)
//   3. Truthy / falsy values
//   4. Logical operators (&&, ||, !)
//   5. for loop (the classic 3-part)
//   6. for...of loop (the modern way to iterate arrays)
//   7. while loop
//   8. break and continue
// ============================================================


// ------------------------------------------------------------
// 1. if / else if / else
// ------------------------------------------------------------

const priority = 2;   // 1 = high, 2 = medium, 3 = low

if (priority === 1) {
  console.log("HIGH priority — do it now.");
} else if (priority === 2) {
  console.log("MEDIUM priority — do it today.");
} else if (priority === 3) {
  console.log("LOW priority — do it when you have time.");
} else {
  console.log("Unknown priority.");
}


// ------------------------------------------------------------
// 2. The ternary operator — a one-line if/else.
//
//   condition ? valueIfTrue : valueIfFalse
//
// Great for short, simple branches. Bad for nested logic.
// ------------------------------------------------------------

const isDone = false;

// Equivalent long form:
//   let status;
//   if (isDone) {
//     status = "DONE";
//   } else {
//     status = "TODO";
//   }
const status = isDone ? "DONE" : "TODO";

console.log("Status:", status);


// ------------------------------------------------------------
// 3. Truthy / falsy
//
// Every value in JS is either "truthy" or "falsy" when used in
// an if (...) or with ! .
//
// The FALSY values (memorize these — short list):
//   false, 0, "", null, undefined, NaN
//
// Everything else is truthy. Including:
//   "0" (a string), "false" (a string), [] (empty array), {} (empty object)
// ------------------------------------------------------------

const note = "";   // empty string is FALSY

if (note) {
  console.log("Note:", note);
} else {
  console.log("No note attached.");
}

// Common pattern: provide a default when something is missing.
const display = note || "(no note)";   // || gives us the FIRST truthy value
console.log("Display:", display);


// ------------------------------------------------------------
// 4. Logical operators: &&, ||, !
//
//   &&  AND  — both sides must be truthy
//   ||  OR   — at least one side must be truthy
//   !   NOT  — flip the boolean
// ------------------------------------------------------------

const isUrgent  = true;
const isAtHome  = false;

if (isUrgent && !isAtHome) {
  console.log("Drop everything and go fix it.");
}

if (isUrgent || isAtHome) {
  console.log("Either it's urgent OR you're already home — handle it.");
}


// ------------------------------------------------------------
// 5. The classic `for` loop
//
//   for (initialization; condition; afterEach) { ... }
//
// Reads as: "start with i=0; while i<5; after each iteration, i++"
// ------------------------------------------------------------

console.log("---");
console.log("Counting todos with a for loop:");

for (let i = 1; i <= 5; i++) {
  console.log(`Todo #${i}`);
}


// ------------------------------------------------------------
// 6. for...of — the modern loop for arrays
//
// Much cleaner than the classic `for` when you don't need the index.
// ------------------------------------------------------------

console.log("---");
console.log("Looping through todos with for...of:");

const todos = [
  "Buy groceries",
  "Finish HTML/CSS demo",
  "Reply to emails",
  "Call mom",
];

for (const todo of todos) {
  console.log("- " + todo);
}


// ------------------------------------------------------------
// 7. while loop — keep going while a condition is true
//
// Use when you don't know exactly how many iterations you need.
// Risk: an infinite loop if the condition never becomes false.
// ------------------------------------------------------------

console.log("---");
console.log("Countdown with while:");

let countdown = 3;

while (countdown > 0) {
  console.log(countdown + "...");
  countdown--;   // shorthand for: countdown = countdown - 1
}

console.log("Go!");


// ------------------------------------------------------------
// 8. break and continue
//
//   break    — exit the loop completely
//   continue — skip the rest of THIS iteration, move to the next
// ------------------------------------------------------------

console.log("---");
console.log("break example — stop at first 'STOP' todo:");

const taggedTodos = [
  "Buy groceries",
  "Finish HTML/CSS demo",
  "STOP",
  "Reply to emails",
  "Call mom",
];

for (const todo of taggedTodos) {
  if (todo === "STOP") {
    break;   // exit the loop entirely
  }
  console.log("- " + todo);
}

console.log("");
console.log("continue example — skip empty todos:");

const messyTodos = ["Buy groceries", "", "Reply to emails", "", "Call mom"];

for (const todo of messyTodos) {
  if (todo === "") {
    continue;   // skip to the next iteration
  }
  console.log("- " + todo);
}


// ------------------------------------------------------------
// PUTTING IT TOGETHER — a tiny todo printer
//
// Loops through the todos, decides what to print based on priority,
// uses a ternary for the status label.
// ------------------------------------------------------------

console.log("---");
console.log("Today's todos:");
console.log("");

// An array of "todo" strings — each shaped like "priority|text|done"
// (just to keep things simple before we learn arrays and objects).
const todayTodos = [
  "1|Submit grading|false",
  "2|Buy groceries|true",
  "3|Reorganize desk|false",
  "1|Reply to dean's email|false",
];

for (const entry of todayTodos) {
  // Split a string like "1|Submit grading|false" into 3 pieces.
  const parts = entry.split("|");
  const p     = parts[0];           // priority as a string
  const text  = parts[1];           // todo text
  const done  = parts[2] === "true";  // convert string to boolean

  const label = done ? "[✓]" : "[ ]";
  const tier  = p === "1" ? "HIGH" : p === "2" ? "MED" : "LOW";

  console.log(label + " (" + tier + ") " + text);
}


console.log("---");
console.log("End of snapshot 02.");
console.log("Next snapshot: strings and numbers in depth.");
