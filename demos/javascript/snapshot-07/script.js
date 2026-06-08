// ============================================================
// Snapshot 07 — Scope, closures, classes
//
// New ideas:
//   1. Block scope — `let` and `const` live inside { }
//   2. `var` and hoisting — the old way, just so you recognize it
//   3. Function scope
//   4. Closures — a function "remembers" the variables around it
//   5. Practical closure: a counter factory
//   6. Classes — constructor, methods, `this`
//   7. Class with state — TodoList that owns an array of todos
//
// This is the last console-only snapshot. Snapshot 08 brings
// the DOM in and we'll start RENDERING the todos in the page.
// The TodoList class we build here is the engine that will
// power that — same class, just plugged into the DOM next time.
// ============================================================


// ------------------------------------------------------------
// 1. Block scope — `let` and `const` only exist inside their { }.
//
// A block is anything between { and }: if, for, while, or just a bare { }.
// ------------------------------------------------------------

{
  const secret = "inside the block";
  console.log("secret inside:", secret);
}
// console.log(secret);   // ❌ ReferenceError — secret doesn't exist out here.

if (true) {
  const insideIf = "only visible inside the if";
  console.log(insideIf);
}
// console.log(insideIf);   // ❌ same — gone.


// ------------------------------------------------------------
// 2. `var` and hoisting — the OLD way. Don't use it.
//
// `var` is FUNCTION-scoped, not block-scoped. It also gets "hoisted"
// (declared at the top of its scope, but as undefined until assigned).
//
// You'll see `var` in old tutorials and Stack Overflow answers.
// Just recognize it. Always prefer `const` (default) or `let`.
// ------------------------------------------------------------

function varDemo() {
  if (true) {
    var x = 10;   // declared with var
  }
  console.log("var x is still visible:", x);   // 10 — leaked out of the if!
}
varDemo();

// With let, the same code would throw a ReferenceError.


// ------------------------------------------------------------
// 3. Function scope — variables inside a function are private to it.
// ------------------------------------------------------------

function outer() {
  const message = "I live in outer";
  console.log(message);
}
outer();
// console.log(message);   // ❌ ReferenceError


// ------------------------------------------------------------
// 4. Closures — a function REMEMBERS the variables that existed
//    when it was created, even after the outer function returns.
//
// This is the foundation of: event handlers that "remember" data,
// React hooks, private state, partial application — all closures.
// ------------------------------------------------------------

console.log("---");

function makeGreeter(greeting) {
  // `greeting` is captured by the inner function.
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHi    = makeGreeter("Hi");
const sayHello = makeGreeter("Hello");

console.log(sayHi("Sourya"));     // "Hi, Sourya!"
console.log(sayHello("class"));   // "Hello, class!"
// Two separate functions, each remembering its OWN `greeting`.


// ------------------------------------------------------------
// 5. Practical closure — a counter factory.
//
// Each call to makeCounter() returns a brand new function with
// its OWN private `count`. Nothing outside can read or change it.
// ------------------------------------------------------------

function makeCounter() {
  let count = 0;                  // private state
  return function () {
    count += 1;
    return count;
  };
}

const counterA = makeCounter();
const counterB = makeCounter();

console.log("A:", counterA());    // 1
console.log("A:", counterA());    // 2
console.log("A:", counterA());    // 3
console.log("B:", counterB());    // 1  — totally separate count


// ------------------------------------------------------------
// 6. Classes — a blueprint for making objects with shared behavior.
//
//   constructor(...)  → runs when you call `new`
//   methods           → functions defined on the class
//   this              → the instance currently being acted on
// ------------------------------------------------------------

console.log("---");

class Todo {
  constructor(id, text, priority = 3, minutes = 0) {
    this.id = id;
    this.text = text;
    this.priority = priority;
    this.done = false;
    this.minutes = minutes;
  }

  toggle() {
    this.done = !this.done;
  }

  label() {
    const tier  = this.priority === 1 ? "HIGH" : this.priority === 2 ? "MED " : "LOW ";
    const mark  = this.done ? "[✓]" : "[ ]";
    return `${mark} (${tier}) ${this.text.padEnd(30, ".")} ${this.minutes} min`;
  }
}

const t1 = new Todo(1, "Submit grading", 1, 45);
const t2 = new Todo(2, "Buy groceries", 2, 30);

console.log(t1.label());
t1.toggle();
console.log(t1.label());   // now [✓]
console.log(t2.label());   // t2 unaffected — each instance has its own state


// ------------------------------------------------------------
// 7. PUTTING IT TOGETHER — a TodoList class.
//
// This is the engine. It owns an array of Todo instances and
// exposes methods to add / toggle / remove / summarize them.
//
// In snapshot 08 we'll keep this class EXACTLY AS-IS and just
// wire its methods up to buttons in the DOM. That's the payoff:
// good object design now = trivial UI work later.
// ------------------------------------------------------------

console.log("---");

class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  add(text, priority = 3, minutes = 0) {
    const todo = new Todo(this.nextId, text, priority, minutes);
    this.todos.push(todo);
    this.nextId += 1;
    return todo;
  }

  remove(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  toggle(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.toggle();
  }

  remainingMinutes() {
    return this.todos
      .filter((t) => !t.done)
      .reduce((sum, t) => sum + t.minutes, 0);
  }

  print() {
    console.log("Today's todos:");
    console.log("");
    this.todos.forEach((t) => console.log(t.label()));
    const mins = this.remainingMinutes();
    console.log("");
    console.log(`Estimated time remaining: ${mins} min (${(mins / 60).toFixed(2)} hours)`);
  }
}


// Use it:
const list = new TodoList();
list.add("Submit grading", 1, 45);
list.add("Buy groceries", 2, 30);
list.add("Reorganize desk", 3, 15);
list.add("Reply to dean's email", 1, 10);

list.print();

console.log("");
console.log("→ Marking 'Buy groceries' (id 2) as done...");
list.toggle(2);

console.log("→ Removing 'Reorganize desk' (id 3)...");
list.remove(3);

console.log("");
list.print();


console.log("---");
console.log("End of snapshot 07.");
console.log("Next snapshot: DOM manipulation — the todos finally show up on the page.");
