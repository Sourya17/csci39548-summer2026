// ============================================================
// Snapshot 03 — Strings + numbers in depth
//
// New ideas:
//   STRINGS
//     1. Three ways to write a string ('', "", ``)
//     2. Template literals (backticks) with ${expressions}
//     3. String properties: .length
//     4. Common string methods:
//          toUpperCase, toLowerCase, trim,
//          includes, startsWith, endsWith,
//          slice, split, replace, replaceAll
//     5. Strings are IMMUTABLE — methods return a NEW string.
//
//   NUMBERS
//     6. Integers vs floats — one type for both
//     7. Number() and parseInt() / parseFloat()
//     8. The floating-point gotcha: 0.1 + 0.2 !== 0.3
//     9. .toFixed() for display
//    10. The Math object: round, floor, ceil, random, max, min
//    11. NaN and isNaN()
// ============================================================


// ------------------------------------------------------------
// 1. Three ways to write a string
// ------------------------------------------------------------

const single  = 'single quotes';
const double  = "double quotes";
const backtick = `backticks (also called "template literals")`;

console.log(single);
console.log(double);
console.log(backtick);


// ------------------------------------------------------------
// 2. Template literals — backticks let you EMBED expressions.
//
// Inside backticks:
//   ${ expression }   evaluates the expression and inserts the result.
//
// Use these by DEFAULT in modern JS. They handle multi-line and
// interpolation without ugly + + + concatenation.
// ------------------------------------------------------------

const name     = "Sourya";
const todoCount = 4;

// Old way (still works, but verbose):
const oldGreeting = "Hi " + name + ", you have " + todoCount + " todos today.";

// Modern way (preferred):
const greeting = `Hi ${name}, you have ${todoCount} todos today.`;

console.log(oldGreeting);
console.log(greeting);

// Multi-line is built in — line breaks are preserved.
const multiline = `
  Daily summary:
    Name: ${name}
    Todos: ${todoCount}
`;
console.log(multiline);


// ------------------------------------------------------------
// 3. .length — characters in a string
// ------------------------------------------------------------

console.log("---");
const todoText = "Buy groceries and call mom";
console.log("Text:", todoText);
console.log("Length:", todoText.length);


// ------------------------------------------------------------
// 4. Common string methods
//
// IMPORTANT: strings are IMMUTABLE in JS. These methods return a
// new string. They do NOT modify the original.
// ------------------------------------------------------------

console.log("---");

const messy = "  Buy GROCERIES  ";

console.log("Original  :", `"${messy}"`);
console.log("trim()    :", `"${messy.trim()}"`);                // remove whitespace
console.log("lower     :", messy.trim().toLowerCase());        // chain methods
console.log("upper     :", messy.trim().toUpperCase());

// The original is UNCHANGED:
console.log("original still:", `"${messy}"`);


console.log("---");

const text = "Finish the HTML/CSS demo by Monday";

console.log("includes('CSS'):  ", text.includes("CSS"));        // true
console.log("startsWith:       ", text.startsWith("Finish"));   // true
console.log("endsWith:         ", text.endsWith("Friday"));     // false


// slice(start, end) — extract a substring (end is exclusive)
console.log("slice(0, 6):      ", text.slice(0, 6));            // "Finish"
console.log("slice(-6):        ", text.slice(-6));              // "Monday" (from end)


// split(separator) — break a string into an ARRAY
const csv = "buy,milk,bread,eggs";
const parts = csv.split(",");
console.log("split result:    ", parts);                        // ["buy","milk","bread","eggs"]


// replace and replaceAll
console.log("replace once:    ", text.replace("Monday", "Friday"));
console.log("replaceAll demo: ", "a-b-c-d".replaceAll("-", "+"));


// ------------------------------------------------------------
// 5. NUMBERS — one type for integers and floats
// ------------------------------------------------------------

console.log("---");

const intish   = 42;
const floatish = 3.14;
const negative = -7;
const bigOne   = 1_000_000;   // underscores are allowed for readability

console.log("intish:  ", intish);
console.log("floatish:", floatish);
console.log("negative:", negative);
console.log("bigOne:  ", bigOne);

// typeof says number for all of them
console.log("typeof bigOne:", typeof bigOne);   // "number"


// ------------------------------------------------------------
// 6. Converting strings to numbers
//
//   Number("42")     → 42       (strict — fails on "42 todos")
//   parseInt("42")   → 42       (extracts integer from start of string)
//   parseFloat("3.14") → 3.14
// ------------------------------------------------------------

console.log("---");

console.log('Number("42")        :', Number("42"));         // 42
console.log('Number("3.14")      :', Number("3.14"));       // 3.14
console.log('Number("42 todos")  :', Number("42 todos"));   // NaN — strict
console.log('parseInt("42 todos"):', parseInt("42 todos")); // 42 — forgiving
console.log('parseFloat("3.14kg"):', parseFloat("3.14kg")); // 3.14


// ------------------------------------------------------------
// 7. The floating-point gotcha — JS isn't great at decimal math.
//
// You CANNOT trust === to compare decimal floats. Either round to a
// fixed precision or do integer math (e.g., work in cents).
// ------------------------------------------------------------

console.log("---");
console.log("0.1 + 0.2 =", 0.1 + 0.2);
console.log("0.1 + 0.2 === 0.3 ?", 0.1 + 0.2 === 0.3);   // FALSE 😱


// ------------------------------------------------------------
// 8. .toFixed(n) — format a number with n decimal places.
//
// Returns a STRING, not a number. Use for display, not for math.
// ------------------------------------------------------------

console.log("---");

const price = 19.999;
console.log("price.toFixed(2):", price.toFixed(2));   // "20.00"
console.log("typeof above    :", typeof price.toFixed(2));   // "string"


// ------------------------------------------------------------
// 9. The Math object — built-in math utilities
// ------------------------------------------------------------

console.log("---");

console.log("Math.round(4.7):  ", Math.round(4.7));     // 5
console.log("Math.floor(4.7):  ", Math.floor(4.7));     // 4 (down)
console.log("Math.ceil(4.1):   ", Math.ceil(4.1));      // 5 (up)
console.log("Math.max(3,7,1):  ", Math.max(3, 7, 1));   // 7
console.log("Math.min(3,7,1):  ", Math.min(3, 7, 1));   // 1
console.log("Math.abs(-7):     ", Math.abs(-7));        // 7
console.log("Math.sqrt(16):    ", Math.sqrt(16));       // 4

// Math.random() — random float between 0 (inclusive) and 1 (exclusive)
const rand = Math.random();
console.log("Math.random():    ", rand);

// Common pattern: a random integer between min and max (inclusive)
const randInt = Math.floor(Math.random() * 10) + 1;   // 1..10
console.log("random 1..10:     ", randInt);


// ------------------------------------------------------------
// 10. NaN — "Not a Number"
//
// What you get back when a math operation fails.
// Annoyingly, typeof NaN === "number" (yes, really).
// Use Number.isNaN() to detect it.
// ------------------------------------------------------------

console.log("---");

const bad = Number("hello");
console.log("Number('hello'):    ", bad);                  // NaN
console.log("typeof NaN:         ", typeof bad);           // "number" 🙃
console.log("Number.isNaN(bad):  ", Number.isNaN(bad));    // true

// Side note: NaN !== NaN (the only value that is not equal to itself).


// ------------------------------------------------------------
// PUTTING IT TOGETHER — formatted todo printer
//
// We'll keep using pipe-delimited strings for now.
// In snapshot 06 (objects), we'll finally drop this hack.
// ------------------------------------------------------------

console.log("---");
console.log("Today's todos (formatted):");
console.log("");

const todayTodos = [
  "1|Submit grading|false|45",      // priority|text|done|minutes
  "2|Buy groceries|true|30",
  "3|Reorganize desk|false|15",
  "1|Reply to dean's email|false|10",
];

let totalMinutes = 0;

for (const entry of todayTodos) {
  // .split returns an array of pieces
  const [p, todoTextStr, doneStr, minsStr] = entry.split("|");
  //  ↑ this is "destructuring" — pulling 4 values out of the array in one line.
  //  We'll cover destructuring properly in snapshot 05.

  const done = doneStr === "true";
  const mins = Number(minsStr);

  const tier  = p === "1" ? "HIGH" : p === "2" ? "MED " : "LOW ";
  const label = done ? "[✓]" : "[ ]";

  // Template literal for the formatted line
  console.log(`${label} (${tier}) ${todoTextStr.padEnd(30, ".")} ${mins} min`);

  if (!done) totalMinutes += mins;
}

console.log("");
console.log(`Estimated time remaining: ${totalMinutes} min (${(totalMinutes / 60).toFixed(2)} hours)`);


console.log("---");
console.log("End of snapshot 03.");
console.log("Next snapshot: functions.");
