// ============================================================
// Snapshot 04 — Functions
//
// New ideas:
//   1. Function declarations (the classic syntax)
//   2. Function expressions (assigned to a variable)
//   3. Arrow functions (the modern, concise syntax)
//   4. Parameters and return values
//   5. Default parameters
//   6. Rest parameters (...args)
//   7. Early return — exit a function before reaching the end
//   8. Functions as VALUES — pass them around like any other variable
//
// In this snapshot, we REFACTOR the todo printer from snapshot 03
// into small reusable functions. Same output, cleaner code.
// ============================================================


// ------------------------------------------------------------
// 1. Function declaration — the classic syntax.
//
// Reads as: "make a function named greet that takes one parameter."
// ------------------------------------------------------------

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Sourya"));
console.log(greet("class"));


// ------------------------------------------------------------
// 2. Function expression — a function stored in a variable.
//
// Equivalent to the declaration above, just spelled differently.
// ------------------------------------------------------------

const greetExpression = function (name) {
  return `Hello, ${name}!`;
};

console.log(greetExpression("expression style"));


// ------------------------------------------------------------
// 3. Arrow function — the modern, concise syntax.
//
// Three flavors, from longest to shortest:
//   const f = (a, b) => { return a + b; }   // full body
//   const f = (a, b) => a + b;              // single expression → implicit return
//   const f = name => `Hello, ${name}!`     // single param → no parens needed
// ------------------------------------------------------------

const greetArrow = (name) => `Hello, ${name}!`;

console.log(greetArrow("arrow style"));

const add = (a, b) => a + b;
console.log("add(2, 3):", add(2, 3));


// ------------------------------------------------------------
// 4. Parameters and return values
//
// A function can take 0+ parameters and either:
//   - return a value (with `return`)
//   - do something side-effecting (no return, returns undefined)
// ------------------------------------------------------------

// Returns a value:
function double(n) {
  return n * 2;
}

// Side effect only (no return):
function logTwice(msg) {
  console.log(msg);
  console.log(msg);
}

console.log("double(5):", double(5));
logTwice("ping");
console.log("logTwice returns:", logTwice("anything"));   // undefined


// ------------------------------------------------------------
// 5. Default parameters — fall back when no argument is passed.
// ------------------------------------------------------------

function formatTier(priority = 3) {
  if (priority === 1) return "HIGH";
  if (priority === 2) return "MED ";
  return "LOW ";
}

console.log("formatTier(1):  ", formatTier(1));   // "HIGH"
console.log("formatTier():   ", formatTier());    // "LOW " — fell back to default 3


// ------------------------------------------------------------
// 6. Rest parameters — collect "any number of args" into an array.
//
// Use ...names in the parameter list. Inside the function, names is
// a real array — use array methods on it.
// ------------------------------------------------------------

function listFriends(...names) {
  console.log(`You have ${names.length} friends:`);
  for (const n of names) {
    console.log(" -", n);
  }
}

listFriends("Alice");
listFriends("Alice", "Bob", "Cara");


// ------------------------------------------------------------
// 7. Early return — bail out as soon as possible.
//
// Cleaner than nested if/else. The function ends the moment a return runs.
// ------------------------------------------------------------

function priorityLabel(priority) {
  if (priority === 1) return "HIGH";   // early return
  if (priority === 2) return "MED ";   // early return
  return "LOW ";                       // fallback
}

console.log("priorityLabel(2):", priorityLabel(2));


// ------------------------------------------------------------
// 8. Functions are VALUES — pass them as arguments.
//
// This is the foundation of `forEach`, `map`, event handlers, etc.
// ------------------------------------------------------------

function runTwice(fn) {
  fn();
  fn();
}

runTwice(() => console.log("ping"));   // pass an arrow function inline


// ------------------------------------------------------------
// PUTTING IT TOGETHER — refactored todo printer
//
// Compare with snapshot 03's "all in one big loop" version.
// Now each step is its own named function. Easier to read, test,
// and reuse.
// ------------------------------------------------------------

console.log("---");

const todayTodos = [
  "1|Submit grading|false|45",
  "2|Buy groceries|true|30",
  "3|Reorganize desk|false|15",
  "1|Reply to dean's email|false|10",
];

// Parse one pipe-delimited string into a "todo-ish" array.
// (In snapshot 06 this becomes a real object. Stay tuned.)
function parseTodo(entry) {
  const [p, text, doneStr, minsStr] = entry.split("|");
  return [Number(p), text, doneStr === "true", Number(minsStr)];
}

// Format a single todo as a printable line.
function formatTodo(todo) {
  const [priority, text, done, minutes] = todo;
  const tier  = priorityLabel(priority);
  const label = done ? "[✓]" : "[ ]";
  return `${label} (${tier}) ${text.padEnd(30, ".")} ${minutes} min`;
}

// Sum the minutes of all UNDONE todos.
function totalRemainingMinutes(todos) {
  let total = 0;
  for (const t of todos) {
    const [, , done, mins] = t;   // skip first two with empty slots
    if (!done) total += mins;
  }
  return total;
}

// Print everything.
function printTodoSummary(rawTodos) {
  console.log("Today's todos:");
  console.log("");

  // Parse each raw string into a todo array.
  const parsed = [];
  for (const r of rawTodos) {
    parsed.push(parseTodo(r));
  }

  // Print each todo.
  for (const todo of parsed) {
    console.log(formatTodo(todo));
  }

  // Summary line.
  const remaining = totalRemainingMinutes(parsed);
  console.log("");
  console.log(`Estimated time remaining: ${remaining} min (${(remaining / 60).toFixed(2)} hours)`);
}


// Call the main function:
printTodoSummary(todayTodos);


console.log("---");
console.log("End of snapshot 04.");
console.log("Next snapshot: arrays + array methods (map, filter, reduce).");
