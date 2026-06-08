// ============================================================
// Snapshot 06 — Objects
//
// THE BIG SWITCH:
//   Snapshots 01–05 used PIPE-DELIMITED STRINGS for todos:
//       "1|Submit grading|false|45"
//   That was always a hack. Real apps use OBJECTS:
//       { id: 1, text: "Submit grading", priority: 1, done: false, minutes: 45 }
//   This snapshot makes that switch. Compare parseTodo / formatTodo
//   here with snapshot 05 — same output, but the data is finally
//   shaped like a real todo.
//
// New ideas:
//   1. Object literals — { key: value, ... }
//   2. Dot access vs bracket access
//   3. Shorthand property syntax — { name } instead of { name: name }
//   4. Object destructuring (with rename and defaults)
//   5. Spread for immutable updates — { ...todo, done: true }
//   6. Object.keys / Object.values / Object.entries
//   7. Computed property names — { [dynamicKey]: value }
//   8. Methods on objects (functions stored as properties)
// ============================================================


// ------------------------------------------------------------
// 1. Object literal — a bag of key/value pairs.
//
// Keys are strings (you can omit quotes if the key is a valid identifier).
// Values can be ANY type — strings, numbers, booleans, arrays, even functions.
// ------------------------------------------------------------

const user = {
  name: "Sourya",
  role: "instructor",
  yearsTeaching: 1,
  isActive: true,
};

console.log("user:", user);


// ------------------------------------------------------------
// 2. Accessing properties — dot vs bracket.
//
//   user.name        → "Sourya"   (most common)
//   user["name"]     → "Sourya"   (works the same)
//   user[someVar]    → ...        (bracket lets you use a VARIABLE as the key)
// ------------------------------------------------------------

console.log("user.name:        ", user.name);
console.log('user["role"]:     ', user["role"]);

const keyToRead = "yearsTeaching";
console.log("user[keyToRead]:  ", user[keyToRead]);   // bracket only — dot can't do this


// Missing keys → undefined (no error).
console.log("user.email:       ", user.email);


// You can ADD and CHANGE properties anytime.
user.email = "saha.sourya17@gmail.com";
user.role = "instructor of record";
console.log("after edits:", user);


// ------------------------------------------------------------
// 3. Shorthand property syntax
//
// When the variable name MATCHES the key, just write the name once.
// ------------------------------------------------------------

const id = 1;
const text = "Buy milk";
const done = false;

// Long way:
const todoLong = { id: id, text: text, done: done };

// Short way (same result):
const todoShort = { id, text, done };

console.log("todoLong: ", todoLong);
console.log("todoShort:", todoShort);


// ------------------------------------------------------------
// 4. Object destructuring — pull properties OUT into variables.
//
//   const { name, role } = user;
//
// You can RENAME:        const { name: userName } = user;
// You can give DEFAULTS: const { theme = "dark" } = user;
// You can REST:          const { name, ...rest } = user;
// ------------------------------------------------------------

console.log("---");

const { name, role } = user;
console.log("name:", name, " role:", role);

// Rename while destructuring:
const { name: userName, yearsTeaching: years } = user;
console.log("userName:", userName, " years:", years);

// Default value if missing:
const { theme = "dark" } = user;
console.log("theme:", theme);   // "dark" — user has no `theme` property

// Capture the rest:
const { name: _n, ...userRest } = user;
console.log("userRest:", userRest);


// ------------------------------------------------------------
// 5. Spread (...) on objects — copy + override.
//
// { ...obj, key: newValue }  →  new object with everything from obj,
//                               but `key` replaced.
//
// This is how you do IMMUTABLE updates — don't mutate; make a new copy.
// ------------------------------------------------------------

console.log("---");

const todo = { id: 1, text: "Buy milk", done: false };

// Mark it done WITHOUT mutating the original:
const todoDone = { ...todo, done: true };

console.log("todo:    ", todo);       // unchanged
console.log("todoDone:", todoDone);   // new object, done: true

// Spread two objects together (later keys win):
const defaults = { theme: "light", fontSize: 14 };
const overrides = { fontSize: 18 };
const settings = { ...defaults, ...overrides };
console.log("settings:", settings);   // { theme: "light", fontSize: 18 }


// ------------------------------------------------------------
// 6. Object.keys / values / entries
//
// Turn an object into arrays so you can use array methods on it.
// ------------------------------------------------------------

console.log("---");

console.log("keys:   ", Object.keys(user));      // ["name", "role", ...]
console.log("values: ", Object.values(user));    // ["Sourya", ...]
console.log("entries:", Object.entries(user));   // [["name", "Sourya"], ...]

// Loop pattern — destructure each [key, value] pair:
for (const [k, v] of Object.entries(user)) {
  console.log(`  ${k} = ${v}`);
}


// ------------------------------------------------------------
// 7. Computed property names — use a variable as the key.
//
// Wrap the variable in [ ] inside the object literal.
// ------------------------------------------------------------

console.log("---");

const fieldName = "priority";
const newTodo = {
  id: 2,
  text: "Reply to email",
  [fieldName]: 1,         // key is the VALUE of fieldName, i.e. "priority"
};
console.log("newTodo:", newTodo);


// ------------------------------------------------------------
// 8. Methods — functions stored as properties.
//
// Inside the method, `this` refers to the object itself.
// (We'll cover `this` properly in snapshot 07 with classes.)
// ------------------------------------------------------------

console.log("---");

const counter = {
  count: 0,
  increment() {           // method shorthand — same as: increment: function() {...}
    this.count += 1;
  },
  describe() {
    return `count is ${this.count}`;
  },
};

counter.increment();
counter.increment();
counter.increment();
console.log(counter.describe());   // "count is 3"


// ------------------------------------------------------------
// PUTTING IT TOGETHER — todo printer, NOW WITH REAL OBJECTS
//
// The pipe-string hack is gone. Each todo is a proper object:
//   { id, text, priority, done, minutes }
//
// Compare every function below with the snapshot 05 version.
// formatTodo now destructures BY NAME instead of by position.
// That's the win: code reads like English.
// ------------------------------------------------------------

console.log("---");

// We still START with raw pipe-strings (pretend they came from a file or API),
// so we can SHOW the parsing step turning them into objects.
const rawTodos = [
  "1|Submit grading|false|45",
  "2|Buy groceries|true|30",
  "3|Reorganize desk|false|15",
  "1|Reply to dean's email|false|10",
];

// Parse one pipe-string into a real OBJECT.
// Notice: returns an object now, not an array.
const parseTodo = (entry, index) => {
  const [p, text, doneStr, minsStr] = entry.split("|");
  return {
    id: index + 1,
    text,
    priority: Number(p),
    done: doneStr === "true",
    minutes: Number(minsStr),
  };
};

const priorityLabel = (p) => (p === 1 ? "HIGH" : p === 2 ? "MED " : "LOW ");

// Format ONE todo — destructure by NAME, not position.
// Compare with snapshot 05: `([priority, text, done, minutes]) => ...`
// Now: `({ priority, text, done, minutes }) => ...`  — much clearer.
const formatTodo = ({ priority, text, done, minutes }) => {
  const tier  = priorityLabel(priority);
  const label = done ? "[✓]" : "[ ]";
  return `${label} (${tier}) ${text.padEnd(30, ".")} ${minutes} min`;
};

const printTodoSummary = (raws) => {
  console.log("Today's todos:");
  console.log("");

  // Parse strings → objects, then format, then print.
  const todos = raws.map(parseTodo);

  todos.map(formatTodo).forEach((line) => console.log(line));

  // .filter undone todos by NAME, then sum minutes BY NAME.
  const remaining = todos
    .filter((t) => !t.done)
    .reduce((sum, t) => sum + t.minutes, 0);

  console.log("");
  console.log(`Estimated time remaining: ${remaining} min (${(remaining / 60).toFixed(2)} hours)`);

  // Show the parsed objects so the dramatic shift is visible.
  console.log("");
  console.log("Parsed todos (real objects now!):");
  console.log(todos);
};


printTodoSummary(rawTodos);


// ------------------------------------------------------------
// Bonus: immutable update with spread.
//
// "Mark the first todo as done" — without touching the original list.
// ------------------------------------------------------------

console.log("---");

const todos = rawTodos.map(parseTodo);
const firstDone = { ...todos[0], done: true };

console.log("original todo[0]:", todos[0]);    // unchanged
console.log("firstDone:       ", firstDone);   // new object, done: true


console.log("---");
console.log("End of snapshot 06.");
console.log("Next snapshot: scope, closures, classes.");
