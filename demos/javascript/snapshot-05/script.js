// ============================================================
// Snapshot 05 — Arrays + array methods
//
// New ideas:
//   1. Array basics — literal, indexing, .length
//   2. Mutating methods — push, pop, shift, unshift, splice
//   3. .forEach() — like for...of, but using a function
//   4. .map() — transform every item, return a NEW array
//   5. .filter() — keep items that pass a test
//   6. .reduce() — collapse an array into a single value
//   7. .find() and .findIndex()
//   8. .some() and .every()
//   9. .sort() and .reverse()
//  10. Destructuring arrays (the proper introduction)
//  11. Spread syntax for arrays
//
// In this snapshot we ditch the manual for loops from snapshot 04
// and use these array methods instead. Same output, way less code.
// ============================================================


// ------------------------------------------------------------
// 1. Array basics
// ------------------------------------------------------------

const colors = ["red", "green", "blue"];

console.log("colors:        ", colors);
console.log("colors.length: ", colors.length);
console.log("colors[0]:     ", colors[0]);      // first element
console.log("colors[2]:     ", colors[2]);      // last element
console.log("colors[99]:    ", colors[99]);     // undefined (no error)

// Arrays can hold MIXED types in JS (unlike most languages).
const mixed = [1, "two", true, null, [3, 4]];
console.log("mixed[4][1]:   ", mixed[4][1]);    // 4 — array inside an array


// ------------------------------------------------------------
// 2. Mutating methods — these CHANGE the original array.
//
//   push    — add to end
//   pop     — remove from end (and return the removed item)
//   unshift — add to beginning
//   shift   — remove from beginning (and return the removed item)
//   splice  — surgical insert/remove at any index
// ------------------------------------------------------------

console.log("---");

const todos = ["Buy milk", "Reply to email"];

todos.push("Call mom");                  // now: ["Buy milk", "Reply to email", "Call mom"]
console.log("after push:    ", todos);

const removed = todos.pop();             // removes & returns "Call mom"
console.log("popped:        ", removed);
console.log("after pop:     ", todos);

todos.unshift("Read paper");             // adds to front
console.log("after unshift: ", todos);

todos.shift();                           // removes from front
console.log("after shift:   ", todos);

// splice(start, deleteCount, ...itemsToInsert)
todos.splice(1, 0, "Lunch");             // insert "Lunch" at index 1, delete 0
console.log("after splice:  ", todos);


// ------------------------------------------------------------
// 3. forEach — same as for...of, but with a function.
//
// .forEach( (item, index, array) => { ... } )
// Returns nothing. Use it for side effects (logging, etc.).
// ------------------------------------------------------------

console.log("---");

const fruits = ["apple", "banana", "cherry"];

fruits.forEach((fruit, i) => {
  console.log(`${i}: ${fruit}`);
});


// ------------------------------------------------------------
// 4. map — TRANSFORM every item, return a NEW array.
//
// The MVP of array methods. You'll use this every day.
// ------------------------------------------------------------

console.log("---");

const nums = [1, 2, 3, 4, 5];

// Multiply each by 2.
const doubled = nums.map((n) => n * 2);
console.log("original:", nums);          // unchanged
console.log("doubled :", doubled);       // new array

// Map a list of strings to their lengths.
const words = ["javascript", "is", "fun"];
const lengths = words.map((w) => w.length);
console.log("words:   ", words);
console.log("lengths: ", lengths);


// ------------------------------------------------------------
// 5. filter — keep items that pass a test.
//
// Callback returns true/false. True = keep, false = drop.
// ------------------------------------------------------------

console.log("---");

const evens = nums.filter((n) => n % 2 === 0);
console.log("evens: ", evens);   // [2, 4]

const longWords = words.filter((w) => w.length > 2);
console.log("longWords:", longWords);   // ["javascript", "fun"]


// ------------------------------------------------------------
// 6. reduce — collapse an array into a SINGLE value.
//
// .reduce((accumulator, current) => newAccumulator, initialValue)
//
// Most common use: sum, count, max, group by.
// Slightly mind-bending the first time. Read it twice.
// ------------------------------------------------------------

console.log("---");

const sum = nums.reduce((acc, n) => acc + n, 0);
//                       ^^^   ^      ^^^^^^^   ^
//                       so far new   updated   start at 0
//                       total elem   total
console.log("sum:", sum);   // 15

const max = nums.reduce((acc, n) => (n > acc ? n : acc), nums[0]);
console.log("max:", max);   // 5


// ------------------------------------------------------------
// 7. find — return the FIRST item that matches.
//    findIndex — return its index, or -1 if not found.
// ------------------------------------------------------------

console.log("---");

const firstBig = nums.find((n) => n > 3);
console.log("first > 3:", firstBig);   // 4

const indexBig = nums.findIndex((n) => n > 3);
console.log("index of first > 3:", indexBig);   // 3


// ------------------------------------------------------------
// 8. some — does ANY item match? (boolean)
//    every — do ALL items match? (boolean)
// ------------------------------------------------------------

console.log("---");

console.log("some > 4:", nums.some((n) => n > 4));   // true
console.log("every > 0:", nums.every((n) => n > 0)); // true
console.log("every > 4:", nums.every((n) => n > 4)); // false


// ------------------------------------------------------------
// 9. sort and reverse
//
// WARNING: .sort() mutates the array AND sorts as STRINGS by default.
// For numbers, pass a compare function.
// ------------------------------------------------------------

console.log("---");

const messyNums = [10, 2, 33, 4];

// Default sort sorts alphabetically — wrong for numbers!
console.log("default sort:", [...messyNums].sort());   // [10, 2, 33, 4]  → [10, 2, 33, 4] sorted as strings

// Numeric sort ASC:
console.log("ascending:  ", [...messyNums].sort((a, b) => a - b));
console.log("descending: ", [...messyNums].sort((a, b) => b - a));

// (We use [...messyNums] to make a copy before sorting, so the original stays clean.
//  More on the ... spread operator in section 11.)


// ------------------------------------------------------------
// 10. Array destructuring — pull values OUT of an array into variables.
//
// const [a, b, c] = someArray;
//
// You can SKIP items with empty slots: const [, , c] = arr;
// You can capture the REST with ...rest:  const [first, ...rest] = arr;
// ------------------------------------------------------------

console.log("---");

const rgb = [255, 100, 50];
const [r, g, b] = rgb;
console.log("r, g, b:", r, g, b);

// Skip the middle one.
const [first, , third] = rgb;
console.log("first, third:", first, third);

// Capture the rest.
const all = [1, 2, 3, 4, 5];
const [head, ...tail] = all;
console.log("head:", head, " tail:", tail);


// ------------------------------------------------------------
// 11. Spread (...) — UNPACK an array.
//
// In a FUNCTION CALL:  Math.max(...nums)  →  Math.max(1, 2, 3, 4, 5)
// In an ARRAY LITERAL: [0, ...nums, 99]   →  [0, 1, 2, 3, 4, 5, 99]
//
// Spread also gives you a CHEAP COPY of an array:  const copy = [...nums]
// ------------------------------------------------------------

console.log("---");

console.log("max via spread:", Math.max(...nums));

const combined = [0, ...nums, 99];
console.log("combined:", combined);

// Copy + add (immutable add):
const withNew = [...todos, "Water plants"];
console.log("todos (original): ", todos);
console.log("todos with new:   ", withNew);


// ------------------------------------------------------------
// PUTTING IT TOGETHER — todo printer, now with array methods
//
// Same output as snapshot 04, but the manual for loops are GONE.
// Compare the parseTodo / formatTodo / printTodoSummary functions
// with the snapshot 04 versions.
// ------------------------------------------------------------

console.log("---");

const todayTodos = [
  "1|Submit grading|false|45",
  "2|Buy groceries|true|30",
  "3|Reorganize desk|false|15",
  "1|Reply to dean's email|false|10",
];

// Parse one pipe-string into a 4-element array.
const parseTodo = (entry) => {
  const [p, text, doneStr, minsStr] = entry.split("|");
  return [Number(p), text, doneStr === "true", Number(minsStr)];
};

// Map priority number → label.
const priorityLabel = (p) => (p === 1 ? "HIGH" : p === 2 ? "MED " : "LOW ");

// Format ONE parsed todo.
const formatTodo = ([priority, text, done, minutes]) => {
  const tier  = priorityLabel(priority);
  const label = done ? "[✓]" : "[ ]";
  return `${label} (${tier}) ${text.padEnd(30, ".")} ${minutes} min`;
};

// Note: formatTodo uses parameter destructuring directly in the parameter list.
// `(todo) => { const [a,b,c,d] = todo; ... }` is equivalent.


const printTodoSummary = (rawTodos) => {
  console.log("Today's todos:");
  console.log("");

  // .map → array of parsed todos
  // .map → array of formatted lines
  // .forEach → print each line
  rawTodos
    .map(parseTodo)
    .map(formatTodo)
    .forEach((line) => console.log(line));

  // .filter undone todos, then .reduce to sum minutes.
  const remaining = rawTodos
    .map(parseTodo)
    .filter(([, , done]) => !done)              // keep only undone
    .reduce((sum, [, , , mins]) => sum + mins, 0);

  console.log("");
  console.log(`Estimated time remaining: ${remaining} min (${(remaining / 60).toFixed(2)} hours)`);
};


printTodoSummary(todayTodos);


console.log("---");
console.log("End of snapshot 05.");
console.log("Next snapshot: objects — finally drop the pipe-string hack.");
